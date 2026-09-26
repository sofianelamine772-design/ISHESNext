"use client";

import { useEffect, useState } from "react";
import { SignUp, useAuth, useUser, useClerk } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Après un paiement Stripe, on arrive ici avec ?email_address=...
 * Si une autre session Clerk est déjà ouverte, Clerk redirige SignUp → /app/eleve
 * et l'utilisateur tombe sur « Accès non autorisé ».
 * On force donc la déconnexion quand l'email connecté ≠ email du paiement.
 */
export function PostPaymentSignUp({ paymentEmail }: { paymentEmail?: string }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Préparation de votre compte…");

  const expected = (paymentEmail || "").trim().toLowerCase();

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    const run = async () => {
      if (!isSignedIn) {
        if (!cancelled) setReady(true);
        return;
      }

      const current =
        user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase() || "";

      // Déjà connecté avec le bon email → espace élève
      if (expected && current === expected) {
        setStatus("Compte trouvé — redirection…");
        router.replace("/app/eleve");
        return;
      }

      // Connecté avec un autre compte (ou sans email paiement) → déconnexion
      if (expected && current && current !== expected) {
        setStatus(
          `Déconnexion de ${current} pour créer le compte ${expected}…`,
        );
        await signOut({ redirectUrl: `/sign-up?email_address=${encodeURIComponent(expected)}` });
        return;
      }

      // Connecté sans email de paiement → laisser SignUp gérer (souvent redirect)
      if (!expected) {
        router.replace("/app/eleve");
        return;
      }

      if (!cancelled) setReady(true);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, user, expected, router, signOut]);

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white shadow-xl border-t-4 border-ishes-gold border-x border-b border-gray-100 rounded-[2.5rem]">
        <Loader2 className="w-10 h-10 text-ishes-gold animate-spin mb-4" />
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-center px-4">
          {status}
        </p>
      </div>
    );
  }

  return (
    <SignUp
      forceRedirectUrl="/app/eleve"
      fallbackRedirectUrl="/app/eleve"
      initialValues={expected ? { emailAddress: expected } : undefined}
      appearance={{
        elements: {
          rootBox: "mx-auto w-full",
          card: "shadow-2xl border-t-4 border-ishes-gold border-x border-b border-gray-100/80 rounded-[2.5rem] p-8 bg-white/95 backdrop-blur-sm",
          headerTitle: "hidden",
          headerSubtitle: "hidden",
          socialButtonsBlockButton:
            "rounded-xl border-gray-200 hover:bg-gray-50 transition-all font-bold",
          formButtonPrimary:
            "bg-ishes-gold hover:bg-[#b0935b] text-white font-bold py-3 rounded-xl shadow-lg shadow-ishes-gold/10 transition-all h-12 uppercase tracking-widest text-xs",
          formFieldInput:
            "bg-gray-50 border-gray-200 rounded-xl focus:ring-ishes-gold/20 focus:border-ishes-gold transition-all",
          footerActionLink: "text-ishes-gold font-bold hover:text-[#b0935b]",
          identityPreviewEditButton: "text-ishes-gold",
          formFieldLabel:
            "font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide",
        },
      }}
    />
  );
}
