export const GOOGLE_ADS_ID = "AW-18510499480";
/** Libellé de la conversion « Envoi de formulaire de lead », compte 965-481-0994. */
export const GOOGLE_ADS_LEAD_LABEL = "4wI2CKaE_50dEJidv_pE";
export const GOOGLE_ADS_LEAD_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`;

type GtagFn = (...args: unknown[]) => void;

const sentLeadIds = new Set<string>();

/**
 * Une seule conversion, après confirmation serveur.
 * Valeur 0 : une demande n'a pas le prix d'une formation.
 * Un clic WhatsApp, un formulaire invalide ou un rechargement ne passent pas ici.
 */
export function trackLeadFormSent(
  transactionId: string,
  user?: { email?: string; phone?: string },
) {
  if (typeof window === "undefined" || !transactionId || sentLeadIds.has(transactionId)) return;
  sentLeadIds.add(transactionId);

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

  gtag("event", "conversion", {
    send_to: GOOGLE_ADS_LEAD_SEND_TO,
    transaction_id: transactionId,
    value: 0,
    currency: "EUR",
  });
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
