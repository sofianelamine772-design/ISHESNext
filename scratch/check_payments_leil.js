require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkPayments() {
  const ids = ["temp_1782564191486_0", "user_3FiiKv3JOAQdfIgb4vEaO4Lrsme"];
  console.log("=== CHECKING PAYMENTS FOR IDS ===", ids);
  const { data: paiements } = await supabase.from('paiements').select('*').in('etudiant_id', ids);
  console.log('Paiements:', paiements);
}

checkPayments();
