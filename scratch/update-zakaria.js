require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Updating Zakaria's email...");
  const { data: updateRes, error: updateErr } = await supabaseAdmin
    .from('etudiants')
    .update({ email: 'benilias757@gmail.com' })
    .ilike('email', 'benilias757+zakaria@gmail.com');

  if (updateErr) {
    console.error("Update Error:", updateErr);
  } else {
    console.log("Update executed.");
  }

  console.log("Fetching students under benilias757@gmail.com...");
  const { data: students, error: fetchErr } = await supabaseAdmin
    .from('etudiants')
    .select('*')
    .ilike('email', 'benilias757@gmail.com');

  if (fetchErr) {
    console.error("Fetch Error:", fetchErr);
  } else {
    console.log("Students found:", JSON.stringify(students, null, 2));
  }
}

main();
