require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function search() {
  console.log("=== SEARCHING FOR HAJAJUJU ===");
  const { data } = await supabase
    .from('etudiants')
    .select('*, inscriptions(*)')
    .or('first_name.ilike.%hajajuju%,last_name.ilike.%jaujauja%,first_name.ilike.%malikhuhuh%');
  console.log('Result:', JSON.stringify(data, null, 2));
}

search();
