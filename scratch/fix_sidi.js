const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(method, path) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers: { apikey: key, Authorization: `Bearer ${key}` }
  });
  return res.status;
}

(async () => {
  // Delete the two 56€ payments for Sidi
  const toDelete = ['6055ebc8-e733-4384-999f-156d878365c4', '9260edc8-e169-4c76-95bf-a2e1cabd8ee3'];
  console.log('Deleted payments:', await q('DELETE', `paiements?id=in.(${toDelete.join(',')})`));
})();
