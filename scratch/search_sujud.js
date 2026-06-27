require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function search() {
  console.log("=== SEARCHING FOR SUJUD OR MALIK ===");
  const { data, error } = await supabase
    .from('etudiants')
    .select('*')
    .or('first_name.ilike.%sujud%,first_name.ilike.%malik%,last_name.ilike.%meindai%,last_name.ilike.%meidani%');
  console.log('Results:', data);
}

search();
