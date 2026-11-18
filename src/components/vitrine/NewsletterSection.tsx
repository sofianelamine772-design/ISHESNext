import Link from "next/link";
import { Mail } from "lucide-react";
import { NewsletterEmbed } from "@/components/vitrine/NewsletterEmbed";

/** Bandeau compact d'inscription à la newsletter (accueil). */
export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="py-12 md:py-14 px-5 sm:px-6 bg-[#fcfaf7] border-t border-gray-100 relative z-10"
    >
      <div className="max-w-4xl mx-auto grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-10 items-center">
        <div className="text-center lg:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-ishes-gold/10 text-ishes-gold rounded-full border border-ishes-gold/20">
            <Mail className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Newsletter</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue leading-tight">
            Recevez nos lettres spirituelles
          </h2>
          <p className="text-sm md:text-[15px] text-gray-600 font-medium leading-relaxed">
            Deux rappels par semaine pour nourrir le cœur, directement dans votre boîte mail.
            Inscription gratuite, confirmée par email, désabonnement en un clic.
          </p>
          <p className="text-[11px] text-gray-400 font-medium">
            Données traitées selon notre{" "}
            <Link href="/politique-de-confidentialite" className="underline hover:text-ishes-blue">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Le formulaire Brevo mesure ~785 px sur mobile et ~620 px sur desktop. */}
          <NewsletterEmbed height={640} className="h-[800px] lg:h-[640px]" />
        </div>
      </div>
    </section>
  );
}
