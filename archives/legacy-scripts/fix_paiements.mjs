import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

async function run() {
  const pRes = await fetch(url + '/rest/v1/paiements?select=id,etudiant_id,inscription_id', { headers });
  const paiements = await pRes.json();
  const nullInscriptions = paiements.filter(p => p.inscription_id === null);
  
  const iRes = await fetch(url + '/rest/v1/inscriptions?select=id,etudiant_id', { headers });
  const inscriptions = await iRes.json();
  
  for (const paiement of nullInscriptions) {
    // Find if this student has an inscription now
    const studentInscriptions = inscriptions.filter(i => i.etudiant_id === paiement.etudiant_id);
    
    // If they have exactly one inscription, or we just take the first one (since most have only one class)
    if (studentInscriptions.length > 0) {
      const inscription_id = studentInscriptions[0].id;
      
      const res = await fetch(url + `/rest/v1/paiements?id=eq.${paiement.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ inscription_id })
      });
      
      if (res.ok) {
        console.log(`Linked paiement ${paiement.id} to inscription ${inscription_id} for student ${paiement.etudiant_id}`);
      } else {
        console.log(`Failed to link paiement ${paiement.id}:`, await res.text());
      }
    }
  }
}
run();
