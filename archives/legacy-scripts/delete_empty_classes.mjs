import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

async function run() {
  const cRes = await fetch(url + '/rest/v1/classes?select=id,name,external_id,is_active', { headers });
  const classes = await cRes.json();
  
  const iRes = await fetch(url + '/rest/v1/inscriptions?select=class_id,status', { headers });
  const inscriptions = await iRes.json();
  
  let deletedCount = 0;
  for (const c of classes) {
    if (!c.is_active) continue;
    
    const count = inscriptions.filter(i => i.class_id === c.id && i.status === 'valide').length;
    const isLinkedToVitrine = c.external_id !== null;
    
    if (!isLinkedToVitrine && count === 0) {
       console.log(`Deleting empty manual class: ${c.name}`);
       const res = await fetch(url + `/rest/v1/classes?id=eq.${c.id}`, {
         method: 'DELETE',
         headers
       });
       if (res.ok) deletedCount++;
    }
  }
  console.log(`Deleted ${deletedCount} empty classes.`);
}
run();
