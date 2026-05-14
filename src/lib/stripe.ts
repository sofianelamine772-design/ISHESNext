import Stripe from "stripe";

// On utilise une clé factice pendant le build si la vraie est absente pour éviter de faire planter Vercel
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});
