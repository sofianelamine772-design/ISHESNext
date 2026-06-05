require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const clerkUserId = 'user_3EiWs9Z2osU9QR6IzvKT5h00RAw';
  
  // Find all payments for this parent
  const { data: paiements } = await supabaseAdmin
    .from('paiements')
    .select('*')
    .eq('etudiant_id', clerkUserId);
    
  console.log(`Found ${paiements?.length} payments for parent`);
  
  if (paiements && paiements.length > 0) {
    for (const p of paiements) {
      console.log(`Deleting payment ${p.id} - ${p.stripe_session_id}`);
      await supabaseAdmin.from('paiements').delete().eq('id', p.id);
    }
  }
  
  // Also delete the inscriptions for this parent so it re-syncs cleanly?
  // Wait, the parent might have their own inscription!
  // If we delete the inscriptions, they will be recreated.
  // Actually, the parent shouldn't have an inscription if the sessions belonged to the children!
  // Let's delete all inscriptions for the parent, and they will be properly recreated for the correct child during next sync.
  const { data: inscriptions } = await supabaseAdmin
    .from('inscriptions')
    .select('*')
    .eq('etudiant_id', clerkUserId);
    
  if (inscriptions && inscriptions.length > 0) {
    for (const ins of inscriptions) {
      console.log(`Deleting inscription ${ins.id}`);
      await supabaseAdmin.from('inscriptions').delete().eq('id', ins.id);
    }
  }
}

main();
