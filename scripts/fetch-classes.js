const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.from('classes').select('external_id, name, is_active, formation_id');
  if (error) console.error(error);
  else {
    const womenClasses = data.filter(c => c.name.toLowerCase().includes('femme'));
    console.log(JSON.stringify(womenClasses, null, 2));
  }
}
run();
