const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(p) {
  const res = await fetch(`${url}/rest/v1/${p}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  return res.json();
}

(async () => {
  const pays = await q(`paiements?select=id,amount,created_at,inscription_id,stripe_session_id&etudiant_id=eq.89bbf89e-37f5-44e1-8d5e-421cd1bb4ce8`);
  console.log("Paiements Sidi:", JSON.stringify(pays, null, 2));
})();
