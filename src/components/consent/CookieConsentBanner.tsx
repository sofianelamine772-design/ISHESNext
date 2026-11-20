"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Lock, ShieldCheck, X } from "lucide-react";
import {
  COOKIE_CATEGORIES,
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  saveConsent,
  type CookieCategoryId,
} from "@/lib/cookie-consent";

type Choice = { analytics: boolean; ads: boolean };

/**
 * Bandeau de consentement cookies (RGPD / CNIL) :
 * - affiché tant qu'aucun choix valide n'est enregistré ;
 * - « Tout refuser » et « Tout accepter » au même niveau ;
 * - « Personnaliser » pour choisir par finalité ;
 * - rouvrable à tout moment via l'événement OPEN_COOKIE_SETTINGS_EVENT.
 */
export function CookieConsentBanner() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [choice, setChoice] = useState<Choice>({ analytics: false, ads: false });
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Premier affichage : seulement si aucun choix valide n'est stocké.
  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setChoice({ analytics: existing.analytics, ads: existing.ads });
    }
  }, []);

  // Réouverture depuis « Gérer mes cookies ».
  useEffect(() => {
    const onOpen = () => {
      const existing = readConsent();
      if (existing) setChoice({ analytics: existing.analytics, ads: existing.ads });
      setCustomize(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) firstButtonRef.current?.focus({ preventScroll: true });
  }, [open, customize]);

  const finish = useCallback((c: Choice) => {
    saveConsent(c);
    setChoice(c);
    setOpen(false);
    setCustomize(false);
  }, []);

  const toggle = (id: CookieCategoryId) => {
    if (id === "necessary") return;
    setChoice((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const alreadyDecided = typeof window !== "undefined" && readConsent() !== null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          className="fixed inset-x-0 bottom-0 z-[120] p-3 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:p-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <div className="w-full sm:w-[420px] rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/15 overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ishes-gold/15 text-ishes-gold">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 id="cookie-banner-title" className="text-base font-black text-ishes-blue leading-tight">
                    {customize ? "Gérer mes cookies" : "Vos cookies, votre choix"}
                  </h2>
                  <p id="cookie-banner-desc" className="mt-1.5 text-[13px] leading-relaxed text-gray-600 font-medium">
                    {customize
                      ? "Choisissez les finalités que vous acceptez. Les cookies nécessaires restent actifs pour que le site fonctionne."
                      : "Nous utilisons des cookies pour faire fonctionner le site et, si vous l’acceptez, pour mesurer l’audience et nos campagnes. Vous pouvez refuser aussi simplement qu’accepter, et changer d’avis à tout moment."}{" "}
                    <Link href="/politique-de-confidentialite" className="font-bold text-ishes-blue underline underline-offset-2 hover:text-ishes-gold">
                      En savoir plus
                    </Link>
                  </p>
                </div>
                {alreadyDecided && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setCustomize(false);
                    }}
                    aria-label="Fermer sans modifier mes choix"
                    className="-mr-1 -mt-1 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {customize && (
                <ul className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-[#fafafa]">
                  {COOKIE_CATEGORIES.map((cat) => {
                    const checked = cat.locked ? true : choice[cat.id as "analytics" | "ads"];
                    return (
                      <li key={cat.id} className="flex items-start gap-3 p-3.5">
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-1.5 text-sm font-bold text-ishes-dark">
                            {cat.locked ? <Lock className="h-3.5 w-3.5 text-gray-400" /> : null}
                            {cat.label}
                            {cat.locked && (
                              <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-gray-600">
                                Toujours actifs
                              </span>
                            )}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-gray-500 font-medium">{cat.description}</p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={checked}
                          aria-label={`${cat.label} : ${checked ? "activé" : "désactivé"}`}
                          disabled={cat.locked}
                          onClick={() => toggle(cat.id)}
                          className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed ${
                            checked ? "bg-ishes-blue" : "bg-gray-300"
                          } ${cat.locked ? "opacity-60" : ""}`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                              checked ? "translate-x-[22px]" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  ref={firstButtonRef}
                  type="button"
                  onClick={() => finish({ analytics: false, ads: false })}
                  className="rounded-xl border-2 border-ishes-blue/30 bg-white px-3 py-2.5 text-[13px] font-black uppercase tracking-wider text-ishes-blue transition-colors hover:border-ishes-blue hover:bg-ishes-blue/5"
                >
                  Tout refuser
                </button>
                <button
                  type="button"
                  onClick={() => finish({ analytics: true, ads: true })}
                  className="rounded-xl bg-ishes-blue px-3 py-2.5 text-[13px] font-black uppercase tracking-wider text-white transition-colors hover:bg-ishes-blue-hover"
                >
                  Tout accepter
                </button>
                {customize ? (
                  <button
                    type="button"
                    onClick={() => finish(choice)}
                    className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-ishes-gold px-3 py-2.5 text-[13px] font-black uppercase tracking-wider text-ishes-dark transition-colors hover:bg-[#d4b67c]"
                  >
                    <ShieldCheck className="h-4 w-4" /> Enregistrer mes choix
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCustomize(true)}
                    className="col-span-2 py-1 text-xs font-bold text-gray-500 underline underline-offset-2 hover:text-ishes-blue"
                  >
                    Personnaliser mes choix
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
