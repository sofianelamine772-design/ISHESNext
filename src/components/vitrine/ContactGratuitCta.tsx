import { MessageCircle } from "lucide-react";
import {
  WHATSAPP_DISTANCE,
  WHATSAPP_DISTANCE_2,
  WHATSAPP_PRESENTIEL,
} from "@/lib/institut-contact";

const buttonClass =
  "inline-flex flex-col items-start justify-center gap-0.5 font-black px-5 py-3 rounded-full transition-colors min-w-[200px]";

export function ContactGratuitCta() {
  return (
    <section
      className="w-full bg-[#f7f3ec] border-y border-[#e4dccb]"
      aria-labelledby="contact-gratuit-title"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6e5730]">
          Contact WhatsApp · gratuit · sans engagement
        </p>
        <h2
          id="contact-gratuit-title"
          className="mt-3 text-3xl md:text-4xl font-black text-[#101828] leading-tight max-w-4xl"
        >
          Contactez l&apos;Institut ISHES sur WhatsApp : cours d&apos;arabe, Tajwid et sciences islamiques
        </h2>
        <div className="mt-6 max-w-4xl space-y-4 text-base text-[#344054] leading-relaxed">
          <p>
            Un conseiller répond à vos questions sur l&apos;<strong className="font-bold text-[#101828]">Institut ISHES</strong> :
            inscription, niveau, horaires, <strong className="font-bold text-[#101828]">cours en présentiel à Toulouse</strong>{" "}
            (41 boulevard de Thibaud) ou <strong className="font-bold text-[#101828]">cours d&apos;arabe et de Coran à distance</strong>.
            Idéal pour les parents qui veulent inscrire un enfant, et pour les adultes débutants en Tajwid, Fiqh
            mâlikite ou langue arabe. L&apos;échange est gratuit.
          </p>
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
            className={`${buttonClass} bg-[#1f8f4e] hover:bg-[#187a42] text-white`}
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest">
              <MessageCircle className="w-4 h-4" />
              WhatsApp distanciel
            </span>
            <span className="text-sm font-bold">+33 6 66 03 35 19</span>
          </a>
          <a
            href={WHATSAPP_DISTANCE_2}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass} bg-[#1f8f4e] hover:bg-[#187a42] text-white`}
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest">
              <MessageCircle className="w-4 h-4" />
              WhatsApp distanciel
            </span>
            <span className="text-sm font-bold">+33 6 86 91 13 01</span>
          </a>
          <a
            href={WHATSAPP_PRESENTIEL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass} bg-[#152233] hover:bg-[#101828] text-white border border-[#c8a96e]`}
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest">
              <MessageCircle className="w-4 h-4" />
              WhatsApp présentiel
            </span>
            <span className="text-sm font-bold">Toulouse · +33 7 68 65 20 91</span>
          </a>
        </div>
      </div>
    </section>
  );
}
