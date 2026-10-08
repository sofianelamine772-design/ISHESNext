import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

async function run() {
  const cRes = await fetch(url + '/rest/v1/classes?select=id,name,type,external_id,is_active', { headers });
  const classes = await cRes.json();
  
  const iRes = await fetch(url + '/rest/v1/inscriptions?select=id,class_id,status', { headers });
  const inscriptions = await iRes.json();
  
  // Distanciel vitrine (based on test script and previous knowledge) are 101-108?
  // Let's actually just look at external_id. If external_id is null, it's not strictly tied to the static catalog script
  
  const audit = [];
  
  for (const c of classes) {
    if (!c.is_active) continue;
    
    const count = inscriptions.filter(i => i.class_id === c.id && i.status === 'valide').length;
    
    // Check if it's missing from vitrine (e.g. no external_id)
    const isLinkedToVitrine = c.external_id !== null;
    
    if (!isLinkedToVitrine) {
       audit.push({
         name: c.name,
         type: c.type,
         students: count
       });
    }
  }
  
  console.log(JSON.stringify(audit, null, 2));
}
run();
