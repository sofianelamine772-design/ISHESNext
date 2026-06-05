require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: paiements } = await supabaseAdmin
    .from('paiements')
    .select('*, inscriptions(*)')
    .order('created_at', { ascending: false })
    .limit(10);
    
  console.log(JSON.stringify(paiements, null, 2));
}

main();
