import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe-accounts";

/** Client Stripe Distance (compte actuel / défaut). Préférer getStripeClient(account). */
export const stripe = getStripeClient("distanciel");

export { getStripeClient, resolveStripeAccount, type StripeAccountId } from "@/lib/stripe-accounts";

// Réexport type pour compat
export type { Stripe };
