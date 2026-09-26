import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ArabicBackground } from "@/components/ArabicBackground";
import { Metadata } from "next";
import { PostPaymentSignUp } from "@/components/auth/PostPaymentSignUp";

export const metadata: Metadata = {
  title: "Inscription | Espace Membre ISHES",
  description: "Créez votre compte étudiant pour rejoindre l'Institut ISHES et débuter vos formations.",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ email_address?: string }>;
}) {
  const params = await searchParams;
  const email = params.email_address;

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#FAFAFA] p-6 pt-20 overflow-hidden">
      <ArabicBackground />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-ishes-gold/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto mb-6 bg-white p-3 rounded-2xl border border-gray-200/50 shadow-sm flex items-center justify-center h-16 w-48">
            <Image
              src="/logo.png"
              alt="ISHES Logo"
              width={192}
              height={64}
              priority
              className="object-contain max-h-full max-w-full"
            />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Créer un compte</h1>
          <p className="text-gray-500 font-medium text-sm">
            {email
              ? `Utilisez l'adresse du paiement : ${email}`
              : "Rejoignez l'institut ISHES dès aujourd'hui"}
          </p>
        </div>

        <ClerkLoading>
          <div className="flex flex-col items-center justify-center p-12 bg-white shadow-xl border-t-4 border-ishes-gold border-x border-b border-gray-100 rounded-[2.5rem]">
            <Loader2 className="w-10 h-10 text-ishes-gold animate-spin mb-4" />
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Initialisation...</p>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          <PostPaymentSignUp paymentEmail={email} />
        </ClerkLoaded>
      </div>
    </div>
  );
}
