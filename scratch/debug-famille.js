require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const parentId = 'user_3ElfcuPrcJ5p6X2x1bC6UqxrCy1'; // Anwar

  console.log('=== FAMILLE ===');
  const { data: famille } = await supabaseAdmin
    .from('etudiants')
    .select('id, first_name, last_name, email, status, parent_id, role')
    .or(`id.eq.${parentId},parent_id.eq.${parentId}`);
  console.log(JSON.stringify(famille, null, 2));

  const familyIds = famille.map(m => m.id);
  console.log('\n=== INSCRIPTIONS ===');
  const { data: inscriptions } = await supabaseAdmin
    .from('inscriptions')
    .select(`id, etudiant_id, status, paid_status, created_at, formations(title), classes(name)`)
    .in('etudiant_id', familyIds);
  console.log(JSON.stringify(inscriptions, null, 2));

  console.log('\n=== PAIEMENTS ===');
  const { data: paiements } = await supabaseAdmin
    .from('paiements')
    .select('id, etudiant_id, amount, status, stripe_session_id, created_at')
    .in('etudiant_id', familyIds);
  console.log(JSON.stringify(paiements, null, 2));
}

main();
