require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function check() {
  const sessions = await stripe.checkout.sessions.list({ limit: 3 });
  for (const s of sessions.data) {
    console.log("Session:", s.id, "Status:", s.payment_status);
    console.log("Metadata:", s.metadata);
  }
}
check().catch(console.error);
