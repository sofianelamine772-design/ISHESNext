require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: users } = await supabaseAdmin.from('etudiants').select('id, email, status, created_at').ilike('email', 'yaniseldaya@outlook.fr');
  console.log("Users:", users);
  
  if (users.length > 0) {
    const ids = users.map(u => u.id);
    const { data: ins } = await supabaseAdmin.from('inscriptions').select('*').in('etudiant_id', ids);
    console.log("Inscriptions:", ins);
  }
}
check();
