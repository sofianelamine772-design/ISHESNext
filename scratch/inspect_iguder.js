const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(p) {
  const res = await fetch(`${url}/rest/v1/${p}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  return res.json();
}

(async () => {
  const allHicho = await q(`etudiants?select=id,first_name,last_name,email&email=eq.hicho08@hotmail.com`);
  console.log("All Hicho:", allHicho);
  
  for (const s of allHicho) {
    const ins = await q(`inscriptions?select=id,status,expected_amount,formations(title)&etudiant_id=eq.${s.id}`);
    const pays = await q(`paiements?select=id,amount,status,stripe_session_id&etudiant_id=eq.${s.id}`);
    console.log(`\n--- ${s.first_name} ${s.last_name} (${s.email}) ---`);
    console.log("Inscriptions:", JSON.stringify(ins));
    console.log("Paiements:", pays);
  }
})();
