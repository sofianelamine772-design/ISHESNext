require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: p } = await supabase.from('paiements').select('*').eq('etudiant_id', 'temp_1782479371070');
  console.log("Payments for new student:", JSON.stringify(p, null, 2));
}
check();
