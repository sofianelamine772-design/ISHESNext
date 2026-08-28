const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
global.WebSocket = require('ws');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('inscriptions').select('*').eq('etudiant_id', '72c5b4a3-050c-4dca-9f5c-1b8614910f9b');
  console.log(JSON.stringify(data, null, 2));
}
run();
