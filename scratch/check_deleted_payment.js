require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const stripeSessionId = 'cs_test_a187hiHDujxO05lM5goJObTxcxs9sIDj2CSbLHHyP9aBu9HVnB0MHas14X';
  console.log(`=== CHECKING FOR PAYMENT WITH SESSION ${stripeSessionId} ===`);
  const { data: p } = await supabase.from('paiements').select('*').eq('stripe_session_id', stripeSessionId).maybeSingle();
  console.log('Result:', p);
}

check();
