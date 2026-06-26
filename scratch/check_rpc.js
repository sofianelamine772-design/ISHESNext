require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.rpc('migrate_student_id', { old_id: 'temp_1782479830492', new_id: 'user_dummy_123' });
  console.log("RPC Error:", error ? error.message : "Success");
}
check();
