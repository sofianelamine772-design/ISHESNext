require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data: etudiants } = await supabaseAdmin.from('etudiants').select('id, email, first_name, last_name, parent_id');
  console.log(etudiants);
}

main();
