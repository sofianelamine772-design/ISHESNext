require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectHajar() {
  const id = 'temp_1782563795633';
  console.log("=== INSPECING HAJAR ===");
  const { data: student } = await supabase.from('etudiants').select('*').eq('id', id).single();
  const { data: inscriptions } = await supabase.from('inscriptions').select('*, formations(title), classes(name)').eq('etudiant_id', id);
  console.log('Student:', student);
  console.log('Inscriptions:', inscriptions);
}

inspectHajar();
