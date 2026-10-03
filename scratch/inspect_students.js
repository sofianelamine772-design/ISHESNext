const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(p) {
  const res = await fetch(`${url}/rest/v1/${p}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  return res.json();
}

(async () => {
  console.log("=== VIORNEY ===");
  const viorney = await q(`etudiants?select=id,first_name,last_name&last_name=ilike.*viorney*`);
  console.log(viorney);
  if (viorney.length > 0) {
    const vIds = viorney.map(v => v.id).join(',');
    const vIns = await q(`inscriptions?select=id,etudiant_id,status,created_at,expected_amount,formations(title),classes(name)&etudiant_id=in.(${vIds})`);
    console.log(JSON.stringify(vIns, null, 2));
    const vPay = await q(`paiements?select=id,etudiant_id,amount,status,inscription_id,created_at&etudiant_id=in.(${vIds})`);
    console.log("Paiements:", vPay);
  }

  console.log("\n=== CHETOUANI ===");
  const chetouani = await q(`etudiants?select=id,first_name,last_name&last_name=ilike.*chetouani*`);
  console.log(chetouani);
  if (chetouani.length > 0) {
    const cIds = chetouani.map(c => c.id).join(',');
    const cIns = await q(`inscriptions?select=id,etudiant_id,status,created_at,expected_amount,formations(title),classes(name)&etudiant_id=in.(${cIds})`);
    console.log(JSON.stringify(cIns, null, 2));
    const cPay = await q(`paiements?select=id,etudiant_id,amount,status,inscription_id,created_at&etudiant_id=in.(${cIds})`);
    console.log("Paiements:", cPay);
  }
})();
