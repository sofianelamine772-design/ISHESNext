require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function patch() {
  const { error } = await supabase
    .from('inscriptions')
    .update({
      formation_id: 'f7355f4c-14a7-4696-ac4b-42a34c0bebb7',
      status: 'valide',
      paid_status: 'paye'
    })
    .eq('id', 'bc27f301-5f66-4f56-bbaf-6ec936737a7a');
    
  if (error) console.error("Error:", error);
  else console.log("Lenny's inscription is now completely fixed and valid!");
}
patch();
