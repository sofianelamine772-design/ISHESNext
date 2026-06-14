import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!);

async function run() {
  const { data: ins, error: insErr } = await supabase.from('inscriptions').select('*').limit(1);
  console.log("Inscription record:", ins);
  
  const { data: push, error: pushErr } = await supabase.from('push_subscriptions').select('*').limit(1);
  console.log("Push subscription record:", push);
}

run().catch(console.error);
