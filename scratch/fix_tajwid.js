require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fix() {
  // 1. Rename the unused one (2bd2442f-f886-4698-a4fc-fdf359e9b064)
  const { error: e1 } = await supabase
    .from('formations')
    .update({ 
      slug: 'tajwid_intensif_old', 
      title: 'Tajwid Intensif (A SUPPRIMER)' 
    })
    .eq('id', '2bd2442f-f886-4698-a4fc-fdf359e9b064');
  
  if (e1) {
    console.error("Error renaming old:", e1);
    return;
  }

  // 2. Rename the good one (f7355f4c-14a7-4696-ac4b-42a34c0bebb7) to match the website
  const { error: e2 } = await supabase
    .from('formations')
    .update({ 
      slug: 'tajwid_intensif' 
    })
    .eq('id', 'f7355f4c-14a7-4696-ac4b-42a34c0bebb7');
    
  if (e2) {
    console.error("Error renaming new:", e2);
    return;
  }
  
  console.log("Successfully fixed the duplicate Tajwid Intensif formations in the database!");
}
fix();
