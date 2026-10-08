import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

async function run() {
  const cRes = await fetch(url + '/rest/v1/classes?select=id,name,external_id,type', { headers });
  const classes = await cRes.json();
  
  const iRes = await fetch(url + '/rest/v1/inscriptions?select=id,class_id,status', { headers });
  const inscriptions = await iRes.json();
  
  const tarbiya = classes.filter(c => c.name.toLowerCase().includes('tarbiya') || c.name.toLowerCase().includes('tarbya'));
  
  console.log('Tarbiya classes:');
  for (const c of tarbiya) {
    const count = inscriptions.filter(i => i.class_id === c.id).length;
    console.log(`- ${c.name} (ext_id: ${c.external_id}) -> Students: ${count}`);
  }
}
run();
