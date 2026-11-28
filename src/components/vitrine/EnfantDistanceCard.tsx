"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, CheckCircle2, CreditCard, MonitorPlay, Play, Users } from "lucide-react";
import { SIBLING_DISCOUNT_EUR } from "@/lib/pricing";
import {
  DISTANCIEL_OFFER,
  applyDistancielOffer,
  formatEuros,
  isPackOfferActive,
  parsePriceEuros,
} from "@/lib/distanciel-offer";

/** Formations enfant à distance présentées avec la carte « visuel » (même carte, titre différent). */
export const ENFANT_DISTANCE_CARD_IDS = new Set([
  "arabe_enfant_distance",
  "tajwid_enfant_distance",
  "tarbiya_islamiya",
]);

const CARD_TEXTS: Record<string, { title: string; subtitle: string; highlight: string }> = {
  arabe_enfant_distance: {
    title: "ARABE (Enfant)",
    subtitle: "Apprendre à lire, écrire et comprendre l’arabe avec une",
    highlight: "pédagogie interactive et vivante.",
  },
  tajwid_enfant_distance: {
    title: "TAJWID (Enfant)",
    subtitle: "Apprendre à lire et réciter le Coran correctement avec une",
    highlight: "pédagogie interactive et vivante.",
  },
  tarbiya_islamiya: {
    title: "TARBIYA ISLAMIYA (Enfant)",
    subtitle: "Éveiller le cœur de votre enfant et préserver sa Fitra avec une",
    highlight: "pédagogie interactive et vivante.",
  },
};

const FEATURES = [
  { icon: MonitorPlay, label: "Cours en direct\net interactifs" },
  { icon: Play, label: "Replays\ninclus" },
  { icon: BookOpen, label: "Supports\npédagogiques" },
  { icon: CalendarDays, label: "1h / semaine" },
];

const CHECKS = [
  { title: "8 élèves par classe", detail: "Un suivi personnalisé et une meilleure progression" },
  { title: "Satisfait ou remboursé", detail: "Inscription en toute sérénité" },
  { title: "Garantie de progression", detail: "Un suivi régulier des acquis" },
  { title: "Un enseignement de qualité", detail: "Par des enseignants qualifiés et expérimentés (+ de 15 ans d’expérience)" },
];

type Props = {
  id: string;
  imageUrl?: string;
  price: string;
  infoUrl: string;
  inscriptionUrl: string;
  index: number;
  onOpen: () => void;
};

/**
 * Carte catalogue des cours enfant à distance (Arabe, Tajwid, Tarbiya),
 * reprise du visuel fourni par l'institut. Le tarif et la réduction fratrie
 * affichés sont ceux réellement appliqués au paiement.
 */
export function EnfantDistanceCard({ id, imageUrl, price, infoUrl, inscriptionUrl, index, onOpen }: Props) {
  const texts = CARD_TEXTS[id] ?? CARD_TEXTS.arabe_enfant_distance;
  const offer = applyDistancielOffer(parsePriceEuros(price), { slug: id, type: "distanciel" });
  const packOffered = isPackOfferActive();

  return (
    <div onClick={onOpen} className="block w-full cursor-pointer">
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: [1, 1.04, 1] }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5, delay: (index % 3) * 0.3 }}
        className="flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
      >
        {/* Visuel + bandeau bleu */}
        <div className="relative h-32 shrink-0 overflow-hidden bg-gray-100 sm:h-44">
          <Image
            src={imageUrl || "/images/formations/arabe-enfant-distance-1.jpg"}
            alt={`${texts.title} — cours à distance, Institut ISHES`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f2b4c] to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest text-ishes-blue shadow-sm sm:text-[10px]">
            Enfant
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-black text-ishes-blue shadow-sm sm:text-[10px]">
            <Users className="h-3 w-3" /> 8 élèves <span className="font-medium">max. / classe</span>
          </span>
        </div>

        <div className="bg-[#0f2b4c] px-3 pb-3 pt-2 text-white sm:px-5 sm:pb-4 sm:pt-3">
          <h2 className="text-base font-black tracking-tight sm:text-xl">{texts.title}</h2>
          <p className="mt-1 text-[10px] font-medium leading-snug text-white/85 sm:text-xs">
            {texts.subtitle}{" "}
            <span className="rounded-md bg-ishes-gold px-1.5 py-0.5 font-bold text-[#0f2b4c]">{texts.highlight}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-1.5 border-t border-white/15 pt-2.5 sm:grid-cols-4 sm:gap-1">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon className="h-4 w-4 text-ishes-gold sm:h-5 sm:w-5" />
                <span className="mt-1 whitespace-pre-line text-[8px] font-bold leading-tight sm:text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Garanties + avantages famille */}
        <div className="flex flex-1 flex-col p-3 sm:p-5">
          <ul className="space-y-1.5 sm:space-y-2">
            {CHECKS.map((c) => (
              <li key={c.title} className="flex items-start gap-1.5 sm:gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 sm:h-4 sm:w-4" />
                <span>
                  <span className="block text-[10px] font-bold leading-tight text-[#101828] sm:text-xs">{c.title}</span>
                  <span className="block text-[8px] font-medium leading-tight text-gray-500 sm:text-[10px]">{c.detail}</span>
                </span>
              </li>
            ))}
            {packOffered && (
              <li className="flex items-start gap-1.5 sm:gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 sm:h-4 sm:w-4" />
                <span>
                  <span className="block text-[10px] font-bold leading-tight text-[#101828] sm:text-xs">
                    Pack Accompagnement{" "}
                    <span className="rounded bg-ishes-gold px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#0f2b4c] sm:text-[9px]">Offert</span>
                  </span>
                  <span className="block text-[8px] font-medium leading-tight text-gray-500 sm:text-[10px]">
                    Communauté, séances de spiritualité, lives mensuels et accompagnement personnalisé (valeur {DISTANCIEL_OFFER.packValueEuros} €)
                  </span>
                </span>
              </li>
            )}
          </ul>

          <div className="mt-3 rounded-2xl border border-ishes-gold/40 bg-[#fbf6ea] p-2.5 sm:mt-4 sm:p-3">
            <p className="text-center text-[9px] font-black uppercase tracking-widest text-[#8a6a32] sm:text-[10px]">Avantages famille</p>
            <p className="mt-1 text-center text-[10px] font-bold text-[#0f2b4c] sm:text-xs">
              <span className="whitespace-nowrap rounded-full bg-[#0f2b4c] px-2 py-0.5 text-ishes-gold">−{SIBLING_DISCOUNT_EUR} €</span>{" "}
              par enfant supplémentaire inscrit en même temps
            </p>
          </div>

          {/* Prix + CTA */}
          <div className="mt-3 flex flex-col items-start gap-2 border-t border-gray-100 pt-3 sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:pt-4">
            <div>
              {offer.discount > 0 && (
                <div className="mb-0.5 flex items-center gap-1.5">
                  <s className="whitespace-nowrap text-xs font-bold text-red-500 decoration-red-500 decoration-2 sm:text-base">{formatEuros(offer.original)}</s>
                  <span className="whitespace-nowrap rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white sm:text-[10px]">−{offer.discount} €</span>
                </div>
              )}
              <div className="whitespace-nowrap text-lg font-black leading-none tracking-tight text-[#101828] sm:text-3xl">
                {formatEuros(offer.current)} <span className="text-[10px] font-bold text-gray-500 sm:text-sm">/ an</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[8px] font-bold leading-tight text-gray-600 sm:text-[10px]">
              <CreditCard className="h-4 w-4 shrink-0 text-ishes-blue sm:h-5 sm:w-5" />
              <span>Paiement en 1x, 3x<br />ou 5x sans frais</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 text-[9px] font-black uppercase tracking-widest sm:grid-cols-2 sm:gap-3 sm:text-[10px]">
            <Link
              href={infoUrl}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-2.5 text-gray-600 shadow-sm transition-all hover:bg-gray-50 sm:py-3.5"
            >
              Info
            </Link>
            <Link
              href={inscriptionUrl}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center rounded-xl bg-ishes-gold py-2.5 text-[#0f2b4c] shadow-md transition-all hover:bg-[#b0935b] sm:py-3.5"
            >
              S’inscrire →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
