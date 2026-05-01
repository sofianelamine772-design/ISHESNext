require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function test() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Test' },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    console.log("Stripe Session Created! URL:", session.url);
  } catch (err) {
    console.error("Stripe Error:", err.message);
  }
}

test();
