import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data, error } = await supabaseAdmin.rpc('get_foreign_keys', { table_name: 'messages' });
  if (error) {
    console.log("RPC Error, let's just create admin_system anyway.");
    await supabaseAdmin.from('etudiants').upsert({ id: 'admin_system', email: 'admin@ishes.com', first_name: 'Admin', last_name: 'ISHES', role: 'admin' });
  } else {
    console.log(data);
  }
}
main();
