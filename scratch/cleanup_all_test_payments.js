require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: paiements } = await supabaseAdmin
    .from('paiements')
    .select('*, etudiants(email, first_name)')
    .ilike('stripe_session_id', 'cs_test_%')
    .order('created_at', { ascending: false });
    
  console.log(`Found ${paiements?.length} test payments`);
  
  if (paiements && paiements.length > 0) {
    const keptPayments = new Set();
    
    for (const p of paiements) {
      if (!keptPayments.has(p.etudiant_id)) {
        // Keep the first one for this student
        keptPayments.add(p.etudiant_id);
      } else {
        // Delete the extra ones
        console.log(`Deleting extra payment ${p.id} for ${p.etudiants?.email}`);
        await supabaseAdmin.from('paiements').delete().eq('id', p.id);
      }
    }
  }
}

main();
