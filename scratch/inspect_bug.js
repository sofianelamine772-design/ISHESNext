const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(p) {
  const res = await fetch(`${url}/rest/v1/${p}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  return res.json();
}

(async () => {
  const allPays = await q(`paiements?select=id,etudiant_id,amount,status,stripe_session_id,created_at&amount=eq.91&status=eq.succeeded`);
  console.log("Payments de 91:", allPays.slice(-5));
  
  // Let's check Barhoumi and Iguder specifically
  const search = await q(`etudiants?select=id,first_name,last_name,email&last_name=in.(Barhoumi,Iguder)`);
  console.log("Students:", search);

  for (const s of search) {
    const ins = await q(`inscriptions?select=id,status,expected_amount,formations(title)&etudiant_id=eq.${s.id}`);
    const pays = await q(`paiements?select=id,amount,status,stripe_session_id&etudiant_id=eq.${s.id}`);
    console.log(`\n--- ${s.first_name} ${s.last_name} (${s.email}) ---`);
    console.log("Inscriptions:", JSON.stringify(ins));
    console.log("Paiements:", pays);
  }
})();
