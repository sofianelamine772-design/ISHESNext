require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function restore() {
  console.log("=== RESTORING PAYMENT FOR LEIL ===");
  const { data, error } = await supabase.from('paiements').insert({
    inscription_id: 'd045e548-96f1-4904-ac4a-3c5cb9f64fbe',
    etudiant_id: 'user_3FijhGmcI61S2i8hZhqqamPQOEe',
    stripe_session_id: 'cs_test_a187hiHDujxO05lM5goJObTxcxs9sIDj2CSbLHHyP9aBu9HVnB0MHas14X',
    amount: 960,
    currency: 'EUR',
    status: 'succeeded'
  }).select('*').single();
  
  if (error) {
    console.error(error);
  } else {
    console.log("Restored payment successfully:", data);
  }
}

restore();
