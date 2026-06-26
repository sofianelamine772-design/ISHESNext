require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const ids = ['f7355f4c-14a7-4696-ac4b-42a34c0bebb7', '2bd2442f-f886-4698-a4fc-fdf359e9b064'];
  const { data: c, error } = await supabase.from('classes').select('id, name, formation_id').in('formation_id', ids);
  if (error) console.error("Error fetching classes:", error);
  else {
    console.log("Classes for Tajwid Intensif:");
    console.log(JSON.stringify(c, null, 2));
  }
}
check();
