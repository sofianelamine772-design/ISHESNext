const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: paiement, error } = await supabase
    .from('paiements')
    .select('*, etudiant_id')
    .eq('stripe_session_id', 'cs_live_a1DNPJpoXXvDA6f1lpuC2wiHFBGMWe3E0LTX3TcKIjJIRlAoLWstwuc6d')
    .single();

  if (error || !paiement) {
    console.log("Paiement not found", error);
    process.exit(1);
  }
  
  console.log("Paiement found:", paiement);

  const { data: etudiant } = await supabase
    .from('etudiants')
    .select('email, first_name, last_name, id')
    .eq('id', paiement.etudiant_id)
    .single();
    
  console.log("Etudiant:", etudiant);

  // Check all paiements for this etudiant
  const { data: allPaiements } = await supabase
    .from('paiements')
    .select('*')
    .eq('etudiant_id', paiement.etudiant_id)
    .order('created_at', { ascending: true });
    
  console.log("All paiements:", allPaiements);
  process.exit(0);
}
run();
