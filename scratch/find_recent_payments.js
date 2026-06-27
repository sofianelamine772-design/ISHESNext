require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findRecentPayments() {
  console.log("=== RECENT PAYMENTS ===");
  const { data, error } = await supabase
    .from('paiements')
    .select('*, etudiants(*)')
    .order('created_at', { ascending: false })
    .limit(10);
    
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(JSON.stringify(data, null, 2));
}

findRecentPayments();
