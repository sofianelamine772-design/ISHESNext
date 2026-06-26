require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function patch() {
  const { error } = await supabase
    .from('inscriptions')
    .update({
      status: 'valide',
      paid_status: 'paye'
    })
    .eq('etudiant_id', 'temp_1782479830492');
    
  if (error) console.error("Error:", error);
  else console.log("Lenny Jaja is now validated!");
}
patch();
