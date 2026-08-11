import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  const { data } = await supabase.from('classes').select('name, is_active, external_id');
  console.log(data?.filter(c => c.name.toLowerCase().includes('femme')));
}
run();
