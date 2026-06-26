require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.from('inscriptions').select('id').is('formation_id', null);
  console.log("Inscriptions with null formation_id:", data ? data.length : error);
}
check();
