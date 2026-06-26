require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: ins } = await supabase.from('inscriptions').select('*, etudiants(email, first_name)').order('created_at', { ascending: false }).limit(3);
  console.log("Latest inscriptions:", JSON.stringify(ins, null, 2));
}
check();
