require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findInscriptions() {
  const ids = ["temp_1782564757036_0", "temp_1782564757036_1"];
  console.log("=== INSCRIPTIONS FOR CHILDREN ===");
  const { data } = await supabase.from('inscriptions').select('id, etudiant_id').in('etudiant_id', ids);
  console.log(data);
}

findInscriptions();
