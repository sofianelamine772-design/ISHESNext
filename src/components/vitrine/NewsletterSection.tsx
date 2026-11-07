import Link from "next/link";
import { Mail } from "lucide-react";
import { NewsletterEmbed } from "@/components/vitrine/NewsletterEmbed";

/** Bandeau d'inscription à la newsletter (accueil). */
export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="py-16 px-6 bg-[#fcfaf7] border-t border-gray-100 relative z-10"
    >
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-ishes-gold/10 text-ishes-gold rounded-full border border-ishes-gold/20">
            <Mail className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Newsletter</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight">
            Recevez nos lettres spirituelles
          </h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            Rappels, réflexions et actualités de l&apos;Institut ISHES, directement dans votre boîte
            mail. Le prénom est facultatif ; l&apos;inscription est confirmée par un lien reçu par
            email, et vous pouvez vous désabonner à tout moment.
          </p>
          <p className="text-xs text-gray-400 font-medium">
            Vos données sont traitées conformément à notre{" "}
            <Link href="/politique-de-confidentialite" className="underline hover:text-ishes-blue">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <NewsletterEmbed />
        </div>
      </div>
    </section>
  );
}
