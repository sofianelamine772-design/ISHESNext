const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();
const stripeKey = env.match(/STRIPE_SECRET_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);
const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

async function run() {
  const sessionId = 'cs_live_a1DNPJpoXXvDA6f1lpuC2wiHFBGMWe3E0LTX3TcKIjJIRlAoLWstwuc6d';
  console.log("Fetching session:", sessionId);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  
  if (!session.subscription) {
    console.log("Session has no subscription.");
    process.exit(1);
  }
  
  console.log("Subscription ID:", session.subscription);
  
  // Find the etudiant_id from the original payment
  const { data: initialPaiement } = await supabase
    .from('paiements')
    .select('etudiant_id, stripe_account')
    .eq('stripe_session_id', sessionId)
    .single();
    
  if (!initialPaiement) {
    console.log("Could not find initial paiement in DB to get etudiant_id.");
    process.exit(1);
  }
  
  const etudiantId = initialPaiement.etudiant_id;
  const stripeAccount = initialPaiement.stripe_account;
  console.log("Found etudiant_id:", etudiantId);
  
  // Fetch invoices for this subscription
  const invoices = await stripe.invoices.list({
    subscription: session.subscription,
    status: 'paid',
    limit: 100
  });
  
  console.log(`Found ${invoices.data.length} paid invoices for this subscription.`);
  
  for (const inv of invoices.data) {
    if (inv.billing_reason === 'subscription_create') {
      console.log(`Skipping initial invoice ${inv.id} (handled by checkout session)`);
      continue;
    }
    
    // Check if it already exists in DB
    const { data: existing } = await supabase
      .from('paiements')
      .select('id')
      .eq('stripe_session_id', inv.id)
      .single();
      
    if (existing) {
      console.log(`Invoice ${inv.id} already exists in DB.`);
    } else {
      console.log(`Inserting missing invoice ${inv.id}...`);
      const amount = (inv.amount_paid > 0 ? inv.amount_paid : inv.amount_due) / 100;
      
      const { error } = await supabase.from('paiements').insert({
        etudiant_id: etudiantId,
        stripe_session_id: inv.id,
        amount: amount,
        currency: (inv.currency || 'eur').toUpperCase(),
        status: 'succeeded',
        stripe_account: stripeAccount
      });
      
      if (error) {
        console.error("Failed to insert:", error);
      } else {
        console.log(`Successfully inserted payment for invoice ${inv.id}`);
      }
    }
  }
  
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
