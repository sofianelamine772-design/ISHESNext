import { MessageCircle } from "lucide-react";
import {
  WHATSAPP_DISTANCE,
  WHATSAPP_DISTANCE_2,
  WHATSAPP_PRESENTIEL,
} from "@/lib/institut-contact";

export function ContactGratuitCta() {
  return (
    <section
      className="relative overflow-hidden bg-ishes-blue text-white"
      aria-labelledby="contact-gratuit-title"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(198,156,109,0.35),transparent_45%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <p className="text-ishes-gold font-black uppercase tracking-[0.28em] text-xs mb-4">
          Contact WhatsApp · gratuit · sans engagement
        </p>
        <h2
          id="contact-gratuit-title"
          className="text-3xl md:text-4xl font-black leading-tight max-w-3xl"
        >
          Contactez l&apos;Institut ISHES sur WhatsApp : cours d&apos;arabe, Tajwid et sciences islamiques
        </h2>
        <p className="mt-5 max-w-3xl text-white/85 font-medium leading-relaxed text-base md:text-[17px]">
          Un conseiller répond à vos questions sur l&apos;<strong className="text-white">Institut ISHES</strong> :
          inscription, niveau, horaires, <strong className="text-white">cours en présentiel à Toulouse</strong>{" "}
          (41 boulevard de Thibaud) ou <strong className="text-white">cours d&apos;arabe et de Coran à distance</strong>.
          Idéal pour les parents qui veulent inscrire un enfant, et pour les adultes débutants en Tajwid, Fiqh
          mâlikite ou langue arabe. L&apos;échange est gratuit.
        </p>

        <div className="mt-8 space-y-3 max-w-3xl text-sm md:text-[15px] text-white/80 font-medium leading-relaxed">
          <p>
            WhatsApp distanciel : orientation vers les formations en ligne (Tajwid, arabe adulte et enfant,
            mémorisation du Coran, sciences islamiques), replays et suivi pédagogique.
          </p>
          <p>
            WhatsApp présentiel Toulouse : classes femmes, enfants (mercredi, samedi, dimanche) et visite de
            l&apos;institut avant inscription.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href={WHATSAPP_DISTANCE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-start justify-center gap-0.5 bg-[#25D366] hover:bg-[#1fad55] text-white font-black px-6 py-4 rounded-2xl transition-all min-w-[220px]"
          >
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wide">
              <MessageCircle className="w-5 h-5" />
              WhatsApp distanciel
            </span>
            <span className="text-white/90 font-bold text-sm">+33 6 66 03 35 19</span>
          </a>
          <a
            href={WHATSAPP_DISTANCE_2}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-start justify-center gap-0.5 bg-[#25D366] hover:bg-[#1fad55] text-white font-black px-6 py-4 rounded-2xl transition-all min-w-[220px]"
          >
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wide">
              <MessageCircle className="w-5 h-5" />
              WhatsApp distanciel
            </span>
            <span className="text-white/90 font-bold text-sm">+33 6 86 91 13 01</span>
          </a>
          <a
            href={WHATSAPP_PRESENTIEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-start justify-center gap-0.5 bg-white text-ishes-blue font-black px-6 py-4 rounded-2xl hover:bg-white/90 transition-all min-w-[220px]"
          >
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wide">
              <MessageCircle className="w-5 h-5" />
              WhatsApp présentiel
            </span>
            <span className="font-bold text-sm">Toulouse · +33 7 68 65 20 91</span>
          </a>
        </div>
      </div>
    </section>
  );
}
