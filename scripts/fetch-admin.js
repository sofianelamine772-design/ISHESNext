const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const WebSocket = require('ws');

// Polyfill WebSocket for Node 20
global.WebSocket = WebSocket;

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('classes').select('id, name, is_active, external_id, formation_id');
  if (error) console.error(error);
  else {
    console.log(`Total classes: ${data.length}`);
    data.forEach(c => console.log(`- [${c.external_id}] ${c.name} (active: ${c.is_active}, formation_id: ${c.formation_id})`));
  }
  process.exit(0);
}
run();
