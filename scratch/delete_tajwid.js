require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function deleteFormation() {
  const { error } = await supabase
    .from('formations')
    .delete()
    .eq('id', '2bd2442f-f886-4698-a4fc-fdf359e9b064');
  
  if (error) {
    console.error("Error deleting:", error);
  } else {
    console.log("Successfully deleted the duplicate formation!");
  }
}
deleteFormation();
