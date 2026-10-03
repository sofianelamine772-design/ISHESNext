const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim().replace(/^["']|["']$/g,'');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim().replace(/^["']|["']$/g,'');

async function q(method, path, body) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: body ? JSON.stringify(body) : undefined
  });
  if (method !== 'DELETE') return res.json();
  return res.status;
}

(async () => {
  // Chetouani: Supprimer inscriptions 'Scolarité Présentiel' créées le 25/09, on garde celles du 26/09 
  const chetouaniToDelete = ['ec061d55-4b96-4ff3-9cbe-eec92ae66261', 'f10ecc32-48f0-47b4-a2bb-2f9a27f8a405'];
  
  // Re-attach payment to the correct inscription for Emma
  const paymentToUpdate = 'd9422bbc-adfd-49e0-b735-d6c4d3775ed9';
  const newInscriptionId = 'eff3982c-f68f-427f-a2b5-ef3fddd6e41c';
  console.log('Chetouani payment update:', await q('PATCH', `paiements?id=eq.${paymentToUpdate}`, { inscription_id: newInscriptionId }));

  console.log('Chetouani delete:', await q('DELETE', `inscriptions?id=in.(${chetouaniToDelete.join(',')})`));
})();
