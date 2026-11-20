"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSENT_CHANGED_EVENT, readConsent, type CookieConsent } from "@/lib/cookie-consent";

export const GA_MEASUREMENT_ID = "G-WS8XG0WKXZ";
export const GOOGLE_ADS_ID = "AW-18510499480";

/**
 * Charge Google Analytics et Google Ads UNIQUEMENT après consentement.
 * Sans consentement, aucun script Google n'est injecté et aucun cookie
 * _ga / _gcl n'est déposé.
 */
export function ConsentScripts() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<CookieConsent>).detail ?? readConsent());
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  if (!consent) return null;

  return (
    <>
      {consent.analytics && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      {consent.ads && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
          <Script id="google-ads-aw" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
