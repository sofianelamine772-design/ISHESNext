require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fix() {
  await supabaseAdmin.from('etudiants').update({ first_name: 'Jasmina', last_name: 'Senaya' }).eq('id', 'user_3FfzQr5xLFJ7q0gLTimtRyPeDvL');
  console.log("Fixed Jasmina");
}
fix();
