"use client";

import { Cookie } from "lucide-react";
import { openCookieSettings } from "@/lib/cookie-consent";

/** Lien « Gérer mes cookies » : rouvre le panneau de consentement. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={
        className ||
        "inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors"
      }
    >
      <Cookie className="h-3.5 w-3.5" /> Gérer mes cookies
    </button>
  );
}
