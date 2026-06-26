require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const email = "yaniseldaya@outlook.fr";
  const { data: users } = await supabase.from('etudiants').select('id, email, status').ilike('email', email);
  console.log("Users:", users);

  const { data: ins } = await supabase.from('inscriptions').select('id, etudiant_id, status').in('etudiant_id', users.map(u => u.id));
  console.log("Inscriptions:", ins);
}
check();
