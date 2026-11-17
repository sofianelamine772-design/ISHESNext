"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, Gift, X } from "lucide-react";
import {
  PROMO_POPUP_STORAGE_KEY,
  getActivePromoCampaign,
  shouldShowPromoPopupOnPath,
} from "@/lib/promo-campaign";

const SHOW_DELAY_MS = 1500;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Pop-up promo plein écran (fond transparent) : une fois par jour et par
 * navigateur, uniquement pendant la période de la campagne.
 */
export function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const campaign = getActivePromoCampaign();

  useEffect(() => {
    if (!campaign || !shouldShowPromoPopupOnPath(pathname)) return;
    try {
      if (localStorage.getItem(PROMO_POPUP_STORAGE_KEY) === todayKey()) return;
    } catch {
      /* stockage indisponible : on affiche quand même */
    }
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, [campaign, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(PROMO_POPUP_STORAGE_KEY, todayKey());
    } catch {
      /* ignore */
    }
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
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-popup-title"
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 text-center"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-3 top-3 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ishes-gold/15 text-ishes-gold">
              <Gift className="w-7 h-7" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-ishes-gold">Offre spéciale</p>
            <h2 id="promo-popup-title" className="mt-2 text-2xl font-black text-ishes-blue leading-tight">
              {campaign.headline}
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-medium leading-relaxed">{campaign.note}</p>

            <button
              type="button"
              onClick={copyCode}
              className="mt-5 w-full flex items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-ishes-blue/40 bg-ishes-blue/5 px-5 py-4 hover:bg-ishes-blue/10 transition-colors"
              aria-label={`Copier le code ${campaign.code}`}
            >
              <span className="text-left">
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Code promo</span>
                <span className="block text-2xl font-black tracking-[0.15em] text-ishes-blue">{campaign.code}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ishes-blue">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copié !" : "Copier"}
              </span>
            </button>

            <Link
              href="/program"
              onClick={close}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ishes-blue py-3.5 text-sm font-black uppercase tracking-wider text-white hover:bg-[#007044] transition-colors"
            >
              Choisir ma formation <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={close}
              className="mt-3 text-xs font-bold text-gray-400 hover:text-gray-600 underline"
            >
              Non merci
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
