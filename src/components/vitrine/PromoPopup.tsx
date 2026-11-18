"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, Sparkles, X } from "lucide-react";
import {
  PROMO_POPUP_STORAGE_KEY,
  getActivePromoCampaign,
  shouldShowPromoPopupOnPath,
} from "@/lib/promo-campaign";

const SHOW_DELAY_MS = 1200;

function alreadySeenThisVisit(): boolean {
  try {
    return sessionStorage.getItem(PROMO_POPUP_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(PROMO_POPUP_STORAGE_KEY, "1");
  } catch {
    /* stockage indisponible : on ne bloque rien */
  }
}

/**
 * Pop-up promo « Rentrée 2026 » : s'affiche sur presque toutes les pages
 * (accueil compris), une fois par visite, uniquement pendant la campagne.
 * Jamais dans le tunnel d'inscription ni sur les fiches formation.
 */
export function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const campaign = getActivePromoCampaign();

  useEffect(() => {
    if (!campaign || !shouldShowPromoPopupOnPath(pathname)) return;
    if (alreadySeenThisVisit()) return;
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, [campaign, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    markSeen();
  };

  const copyCode = async () => {
    if (!campaign) return;
    try {
      await navigator.clipboard.writeText(campaign.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible : le code reste lisible */
    }
  };

  if (!campaign) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-ishes-dark/60 backdrop-blur-sm p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-popup-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bandeau haut */}
            <div className="relative bg-ishes-blue px-6 pt-7 pb-8 text-center text-white sm:px-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ishes-gold/20 blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10 blur-2xl"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="absolute right-3 top-3 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="inline-flex items-center gap-1.5 rounded-full bg-ishes-gold px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-ishes-dark">
                <Sparkles className="h-3.5 w-3.5" /> {campaign.badge}
              </p>
              <p className="mt-4 text-6xl font-black leading-none tracking-tight text-ishes-gold sm:text-7xl">
                −{campaign.discountEuros}&nbsp;€
              </p>
              <h2 id="promo-popup-title" className="mt-3 text-lg font-black leading-snug sm:text-xl">
                sur toutes les formations à distance
              </h2>
            </div>

            {/* Corps */}
            <div className="px-6 pb-6 pt-5 text-center sm:px-8 sm:pb-8">
              <p className="text-sm font-medium leading-relaxed text-gray-600">{campaign.note}</p>

              <button
                type="button"
                onClick={copyCode}
                className="mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-ishes-blue/40 bg-ishes-blue/5 px-5 py-3.5 transition-colors hover:bg-ishes-blue/10"
                aria-label={`Copier le code ${campaign.code}`}
              >
                <span className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Votre code promo
                  </span>
                  <span className="block text-2xl font-black tracking-[0.15em] text-ishes-blue">
                    {campaign.code}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ishes-blue">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copié !" : "Copier"}
                </span>
              </button>

              <Link
                href={campaign.ctaHref}
                onClick={close}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ishes-gold py-4 text-sm font-black uppercase tracking-wider text-ishes-dark shadow-lg shadow-ishes-gold/30 transition-transform hover:scale-[1.02] hover:bg-[#d4b67c]"
              >
                {campaign.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-[11px] font-semibold text-gray-500">
                Code à saisir à l’étape paiement · Places limitées
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-2 text-xs font-bold text-gray-400 underline hover:text-gray-600"
              >
                Plus tard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
