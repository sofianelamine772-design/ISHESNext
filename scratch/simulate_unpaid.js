require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function simulate() {
  const email = 'houdifamosni982@outlook.fr';
  const { data: user } = await supabaseAdmin.from('etudiants').select('id').ilike('email', email).limit(1).single();
  
  if (!user) {
    console.error("User not found for email:", email);
    return;
  }

  // Insert a failed payment
  const { data: payment, error } = await supabaseAdmin.from('paiements').insert({
    etudiant_id: user.id,
    amount: 150.00,
    currency: 'EUR',
    status: 'failed',
    stripe_session_id: 'sim_failed_' + Date.now(),
    error_message: 'Fonds insuffisants'
  }).select('*').single();

  if (error) {
    console.error("Failed to insert payment:", error);
  } else {
    console.log("Successfully simulated unpaid payment:", payment.id);
  }
}
simulate();
