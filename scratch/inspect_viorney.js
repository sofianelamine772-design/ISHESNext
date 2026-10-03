const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(p) {
  const res = await fetch(`${url}/rest/v1/${p}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  return res.json();
}

(async () => {
  const viorney = await q(`etudiants?select=id,first_name,last_name,email,status&last_name=ilike.*viorney*`);
  console.log("ETUDIANTS", JSON.stringify(viorney, null, 2));
  if (viorney.length > 0) {
    const vIds = viorney.map(v => v.id).join(',');
    const vIns = await q(`inscriptions?select=id,etudiant_id,status,created_at,expected_amount,academic_year,formations(title,price),classes(name)&etudiant_id=in.(${vIds})`);
    console.log("INSCRIPTIONS", JSON.stringify(vIns, null, 2));
  }
})();
