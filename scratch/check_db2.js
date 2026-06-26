require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: f, error } = await supabase.from('formations').select('id, slug, name');
  if (error) console.error("Error fetching formations:", error);
  else {
    const tajwids = f.filter(x => x.slug && x.slug.includes('tajwid'));
    console.log("Formations with tajwid:", tajwids);
  }
}
check();
