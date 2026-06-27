require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function cleanup() {
  console.log("=== CLEANUP DUPLICATE PARENT ACCOUNT ===");
  
  const duplicateId = 'user_3FiiKv3JOAQdfIgb4vEaO4Lrsme';
  
  // 1. Double check duplicate has no active inscriptions
  const { data: ins } = await supabase.from('inscriptions').select('id').eq('etudiant_id', duplicateId);
  console.log(`Inscriptions for duplicate ${duplicateId}:`, ins);
  
  if (!ins || ins.length === 0) {
    console.log(`Deleting duplicate parent record ${duplicateId} with no inscriptions...`);
    const { error: delErr } = await supabase.from('etudiants').delete().eq('id', duplicateId);
    if (delErr) {
      console.error("Delete Error:", delErr);
    } else {
      console.log("Successfully deleted duplicate parent record!");
    }
  } else {
    console.log("Duplicate has inscriptions, unlinking parent_id instead...");
    await supabase.from('etudiants').update({ parent_id: null }).eq('id', duplicateId);
  }
}

cleanup();
