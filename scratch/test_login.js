require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const email = "yaniseldaya@outlook.fr";
  const { data: users, error } = await supabase.from('etudiants').select('id, email, status').ilike('email', email);
  console.log("Users in DB:", users);
  if (error) console.log("Error:", error);
}
check();
