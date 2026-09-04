require('dotenv').config({ path: '.env.local' });
async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const res = await fetch(`${supabaseUrl}/rest/v1/classes?select=id,name,type&type=eq.presentiel`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
  });
  const data = await res.json();
  data.sort((a,b) => a.id - b.id);
  data.forEach(c => console.log(`[ID ${c.id}] ${c.name}`));
}
main();
