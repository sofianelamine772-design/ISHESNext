require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: f } = await supabase.from('formations').select('id, slug, name');
  console.log("Formations:", f.filter(x => x.slug && x.slug.includes('tajwid')));
  
  const { data: c } = await supabase.from('classes').select('id, formation_id, name, mode');
  console.log("Classes:", c);
}
check();
