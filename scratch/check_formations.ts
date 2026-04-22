
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function check() {
  const { data: formations, error: fError } = await supabase.from('formations').select('*');
  const { data: classes, error: cError } = await supabase.from('classes').select('*');
  console.log('Formations:', formations);
  console.log('Classes:', classes);
}

check();
