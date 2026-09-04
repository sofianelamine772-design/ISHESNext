require('dotenv').config({ path: '.env.local' });
async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const res = await fetch(`${supabaseUrl}/rest/v1/formations?select=id,slug,title,type`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
  });
  const data = await res.json();
  console.log("Formations in DB:");
  data.forEach(d => console.log(`- ${d.title} (${d.slug}) [${d.type}]`));
}
main();
