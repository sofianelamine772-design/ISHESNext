const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const stripeSecretKey = env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY in .env.local");
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);
const sessionId = 'cs_test_a1ndxAVhdhfFNDvhYqxufdSPCEmcfbky1Av6E6K7d3iskQBKNmjj6D87CC';

async function main() {
  try {
    console.log("Retrieving checkout session...");
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session details:");
    console.log(`- ID: ${session.id}`);
    console.log(`- Amount: ${session.amount_total / 100} ${session.currency}`);
    console.log(`- Customer Email: ${session.customer_details?.email}`);
    console.log("- Metadata:", session.metadata);
  } catch (error) {
    console.error("Stripe Error:", error);
  }
}

main();
