import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function checkTable() {
  const { data, error } = await supabase.rpc('get_table_info', { table_name: 'messages' });
  if (error) {
    // Si RPC n'existe pas, on tente une requête simple
    const { data: cols, error: err } = await supabase.from('messages').select('*').limit(1);
    console.log("Cols:", cols, "Err:", err);
  } else {
    console.log("Table info:", data);
  }
}

checkTable();
