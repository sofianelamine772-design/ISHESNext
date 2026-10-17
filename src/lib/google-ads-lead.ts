export const GOOGLE_ADS_ID = "AW-18510499480";

type GtagFn = (...args: unknown[]) => void;

/**
 * Événement attendu par la balise AW-18510499480 :
 * la config publique du tag envoie `form_submit` vers ce compte.
 * À appeler seulement après un envoi de formulaire confirmé par le serveur.
 * Un clic WhatsApp, téléphone ou e-mail ne doit pas passer ici.
 */
export function trackLeadFormSent(
  transactionId: string,
  user?: { email?: string; phone?: string },
) {
  if (typeof window === "undefined" || !transactionId) return;

  const w = window as Window & { gtag?: GtagFn; dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  const gtag: GtagFn =
    typeof w.gtag === "function"
      ? w.gtag.bind(w)
      : (...args: unknown[]) => {
          w.dataLayer!.push(args);
        };

  const email = user?.email?.trim();
  const phone = user?.phone?.trim();
  if (email || phone) {
    gtag("set", "user_data", {
      ...(email ? { email } : {}),
      ...(phone ? { phone_number: phone } : {}),
    });
  }

  gtag("event", "form_submit", {
    send_to: GOOGLE_ADS_ID,
    transaction_id: transactionId,
  });

  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL?.trim();
  if (label) {
    gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
      transaction_id: transactionId,
      value: 0,
      currency: "EUR",
    });
  }
}

/** 06… → +33… pour le format attendu par Google (E.164). */
export function toE164Phone(raw: string): string | undefined {
  const compact = raw.replace(/[^\d+]/g, "");
  if (compact.length < 8) return undefined;
  if (compact.startsWith("+")) return compact;
  if (compact.startsWith("00")) return `+${compact.slice(2)}`;
  if (compact.startsWith("0")) return `+33${compact.slice(1)}`;
  return `+${compact}`;
}
