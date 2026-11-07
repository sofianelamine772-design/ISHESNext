import Link from "next/link";
import { Mail } from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";
import { NewsletterEmbed } from "@/components/vitrine/NewsletterEmbed";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = buildPageMetadata({
  title: "Newsletter : lettres spirituelles",
  description:
    "Inscrivez-vous aux lettres spirituelles de l'Institut ISHES : rappels, réflexions et actualités par email, avec double confirmation.",
  path: "/newsletter",
  keywords: ["newsletter ISHES", "lettres spirituelles", "newsletter islam", "institut ishes"],
});

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans pb-24">
      <section className="relative pt-32 pb-10 md:pt-44 md:pb-14 overflow-hidden bg-white">
        <ArabicBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-ishes-blue/[0.03] to-transparent -z-10" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-ishes-gold/10 text-ishes-gold rounded-full mb-6 border border-ishes-gold/20">
            <Mail className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Newsletter</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-ishes-dark leading-[1.05] tracking-tight mb-6">
            Les <span className="text-ishes-blue">lettres spirituelles</span> de l&apos;Institut ISHES
          </h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            Rappels, réflexions et actualités de l&apos;Institut, directement dans votre boîte mail.
            Le prénom est facultatif, l&apos;email obligatoire. Après votre inscription, cliquez sur
            le lien de confirmation reçu par email pour rejoindre la liste.
          </p>
        </div>
      </section>

      <section className="px-6 -mt-2">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <NewsletterEmbed />
        </div>
        <p className="max-w-xl mx-auto mt-6 text-center text-xs text-gray-400 font-medium">
          Désabonnement possible à tout moment depuis chaque email. Vos données sont traitées
          conformément à notre{" "}
          <Link href="/politique-de-confidentialite" className="underline hover:text-ishes-blue">
            politique de confidentialité
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
