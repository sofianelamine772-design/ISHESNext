require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspect() {
  const clerkId = 'user_3DZtAbWnVNvqbfMHyzvgaYrPPtm';
  console.log(`=== CHECKING FOR CLERK ID ${clerkId} IN SUPABASE ===`);
  const { data: student } = await supabase.from('etudiants').select('*').eq('id', clerkId).maybeSingle();
  console.log('Result:', student);
}

inspect();
