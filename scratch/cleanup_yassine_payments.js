require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const email = 'sofianelamine31+yassine@icloud.com';
  
  // Find Yassine
  const { data: yassine } = await supabaseAdmin.from('etudiants').select('id').ilike('email', email).maybeSingle();
  if (!yassine) return console.log('Yassine not found');
  
  // Find all payments for Yassine
  const { data: paiements } = await supabaseAdmin.from('paiements').select('*').eq('etudiant_id', yassine.id).order('created_at', { ascending: false });
  console.log(`Found ${paiements?.length} payments for Yassine`);
  
  if (paiements && paiements.length > 1) {
    // Keep the first one, delete the rest
    for (let i = 1; i < paiements.length; i++) {
      console.log(`Deleting extra payment: ${paiements[i].id}`);
      await supabaseAdmin.from('paiements').delete().eq('id', paiements[i].id);
    }
  }
}

main();
