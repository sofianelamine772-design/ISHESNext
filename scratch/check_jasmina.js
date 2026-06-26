require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: users } = await supabaseAdmin.from('etudiants').select('*').ilike('email', 'HOUDIFAMOSNI982@OUTLOOK.FR');
  console.log("Users:", users);
}
check();
