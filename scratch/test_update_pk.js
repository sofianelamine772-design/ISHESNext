require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const clerkUserId = 'user_dummy_123';
  // Try to update the temp_ ID to clerkUserId
  const { data, error } = await supabaseAdmin
    .from('etudiants')
    .update({ id: clerkUserId })
    .eq('id', 'temp_1780661217276');
    
  console.log('Update Data:', data);
  console.log('Update Error:', error);
}

main();
