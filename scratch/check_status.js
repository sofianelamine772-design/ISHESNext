require('dotenv').config({ path: '.env.local' });
async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const res = await fetch(`${supabaseUrl}/rest/v1/etudiants?select=id,first_name,last_name,status&first_name=ilike.%25teste%25`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
  });
  const data = await res.json();
  console.log("Etudiants:", data);
  if (data && data.length > 0) {
    const ids = data.map(d => d.id).join(',');
    const resIns = await fetch(`${supabaseUrl}/rest/v1/inscriptions?select=id,status,paid_status,etudiant_id&etudiant_id=in.(${ids})`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const ins = await resIns.json();
    console.log("Inscriptions:", ins);
  }
}
main();
