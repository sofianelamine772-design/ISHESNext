require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: etudiants, error } = await supabaseAdmin
    .from('etudiants')
    .select('*')
    .ilike('email', 'sofianelamine31%');

  console.log('Etudiants:', JSON.stringify(etudiants, null, 2));
  console.log('Error:', error);
}

main();
