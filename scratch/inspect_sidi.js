const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(p) {
  const res = await fetch(`${url}/rest/v1/${p}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  return res.json();
}

(async () => {
  const allSidi = await q(`etudiants?select=id,first_name,last_name,email&email=eq.zainoudine.sidi@gmail.com`);
  console.log("All Sidi:", allSidi);
  
  for (const s of allSidi) {
    const ins = await q(`inscriptions?select=id,status,expected_amount,created_at,academic_year,formations(title)&etudiant_id=eq.${s.id}`);
    const pays = await q(`paiements?select=id,amount,status,stripe_session_id,created_at&etudiant_id=eq.${s.id}`);
    console.log(`\n--- ${s.first_name} ${s.last_name} (${s.email}) ---`);
    console.log("Inscriptions:", JSON.stringify(ins, null, 2));
    console.log("Paiements:", JSON.stringify(pays, null, 2));
  }
})();
