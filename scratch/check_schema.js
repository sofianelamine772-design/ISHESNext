require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
  // Get a sample row to see all columns
  const { data, error } = await supabaseAdmin.from('etudiants').select('*').limit(1);
  if (data && data.length > 0) {
    console.log('Columns in etudiants:', Object.keys(data[0]));
    console.log('Sample row:', data[0]);
  }
  
  const { data: ins } = await supabaseAdmin.from('inscriptions').select('*').limit(1);
  if (ins && ins.length > 0) {
    console.log('\nColumns in inscriptions:', Object.keys(ins[0]));
  }
  
  const { data: pay } = await supabaseAdmin.from('paiements').select('*').limit(1);
  if (pay && pay.length > 0) {
    console.log('\nColumns in paiements:', Object.keys(pay[0]));
  }
}

checkSchema();
