import { isManualBillingPayment, isTestStripePayment } from "@/lib/pricing";

type Props = {
  /** `stripe_session_id` du paiement (cs_… / in_… = Stripe, manual_… = saisie manuelle). */
  sessionId?: string | null;
  /** Compte Stripe (`distanciel` | `presentiel`), si connu. */
  stripeAccount?: string | null;
  className?: string;
};

/** Logo Stripe (wordmark) en SVG, couleur de marque. */
function StripeWordmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 25" aria-hidden className={className} fill="currentColor">
      <path d="M59.6 12.9c0-4.2-2-7.6-6-7.6-3.9 0-6.3 3.3-6.3 7.5 0 5 2.8 7.5 6.8 7.5 2 0 3.5-.5 4.6-1.1v-3.3c-1.1.6-2.4 1-4.1 1-1.6 0-3-.6-3.2-2.5h8.1c0-.2.1-1.1.1-1.5zm-8.2-1.6c0-1.9 1.1-2.6 2.2-2.6 1 0 2 .8 2 2.6h-4.2zM40.9 5.3c-1.6 0-2.7.8-3.2 1.3l-.2-1h-3.6v19.1l4.1-.9v-4.6c.6.4 1.5 1 2.9 1 2.9 0 5.6-2.4 5.6-7.5 0-4.7-2.7-7.4-5.6-7.4zm-1 11.3c-1 0-1.6-.3-2-.8V9.8c.4-.5 1-.8 2-.8 1.5 0 2.6 1.7 2.6 3.8 0 2.2-1.1 3.8-2.6 3.8zM28.4 4.3l4.1-.9V0l-4.1.9v3.4zm0 1.3h4.1v14.4h-4.1V5.6zm-4.4 1.2l-.3-1.2H20v14.4h4.1v-9.8c1-1.3 2.6-1 3.1-.9V5.6c-.5-.2-2.3-.5-3.2 1.2zM15.8 2l-4 .9v3.3L10.4 6.5v3.3h1.4v5.7c0 4.1 3 4.5 5 4.5 1 0 1.9-.2 2.6-.5v-3.3c-.6.2-1.5.5-2.1.5-1 0-1.5-.4-1.5-1.6V9.8h3.3V6.5h-3.3V2zM4.2 9.9c0-.6.5-.9 1.4-.9 1.2 0 2.8.4 4 1V6.2c-1.3-.5-2.7-.8-4-.8C2.3 5.4 0 7.1 0 10c0 4.5 6.1 3.8 6.1 5.7 0 .8-.7 1-1.6 1-1.3 0-3-.6-4.4-1.3v3.9c1.5.6 3 .9 4.4.9 3.4 0 5.7-1.7 5.7-4.6 0-4.9-6-4-6-5.7z" />
    </svg>
  );
}

/**
 * Pastille « source » d'un paiement dans l'admin : Stripe (logo, + compte),
 * saisie manuelle, ou test Stripe. Aide la secrétaire à voir d'un coup d'œil
 * ce qui est géré automatiquement par Stripe et ce qui a été saisi à la main.
 */
export function PaymentSourceBadge({ sessionId, stripeAccount, className = "" }: Props) {
  const id = String(sessionId || "");
  if (!id) return null;
  const payment = { stripe_session_id: id };

  if (isManualBillingPayment(payment)) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-700 ${className}`}>
        ✍️ Saisie manuelle
      </span>
    );
  }
  if (isTestStripePayment(payment)) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-gray-500 ${className}`}>
        <StripeWordmark className="h-2.5 w-auto" /> test
      </span>
    );
  }
  const account = stripeAccount === "presentiel" ? "présentiel" : stripeAccount === "distanciel" ? "distanciel" : "";
  return (
    <span
      title={`Paiement géré par Stripe${account ? ` (compte ${account})` : ""} : prélèvement, relances et factures automatiques`}
      className={`inline-flex items-center gap-1.5 rounded-md bg-[#635BFF] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white ${className}`}
    >
      <StripeWordmark className="h-2.5 w-auto" />
      {account && <span className="border-l border-white/40 pl-1.5 normal-case tracking-normal">{account}</span>}
    </span>
  );
}
