const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      sender_id: 'user_test',
      receiver_id: 'admin_system',
      content: 'test',
      type: 'private'
    })
    .select();
  console.log(JSON.stringify(data, null, 2));
}
main();
