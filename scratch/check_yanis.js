require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: students } = await supabase.from('etudiants').select('id, first_name, last_name, email, status').ilike('email', 'YANISELDAYA@OUTLOOK.FR');
  console.log("Students:", JSON.stringify(students, null, 2));

  for (let s of students || []) {
    const { data: ins } = await supabase.from('inscriptions').select('*').eq('etudiant_id', s.id);
    console.log(`Inscriptions for ${s.id}:`, JSON.stringify(ins, null, 2));
  }
}
check();
