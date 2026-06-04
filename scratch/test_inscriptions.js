import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  const { data, error } = await supabaseAdmin
    .from('inscriptions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  console.log("Last 5 inscriptions:", data);
}

test();
