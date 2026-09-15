import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

const data = [
  { "email": "benjeddi.ali26@gmail.com", "name": "Safa Benjeddi", "class": "Session Tarbiya Islamiya (2026-2027)", "expected": 399, "encaisse": 0 },
  { "email": "lennysenayadeeee43@gmail.com", "name": "dezd ezdezadaz", "class": "Session Tarbiya Islamiya (2026-2027)", "expected": 399, "encaisse": 399 },
  { "email": "dzaedazdez87@gmail.com", "name": "edaz dezadzeadzea", "class": "Session Tarbiya Islamiya (2026-2027)", "expected": 399, "encaisse": 399 },
  { "email": "benjeddi.ali26@gmail.com", "name": "Leila Benjeddi", "class": "Session Tarbiya Islamiya (2026-2027)", "expected": 399, "encaisse": 159.6 }
];

async function run() {
  const cRes = await fetch(url + '/rest/v1/classes?select=id,name', { headers });
  const classes = await cRes.json();
  
  const eRes = await fetch(url + '/rest/v1/etudiants?select=id,first_name,last_name,email', { headers });
  const etudiants = await eRes.json();
  
  for (const item of data) {
    const cls = classes.find(c => c.name === item.class);
    // strict match by email if it's unique, or name if shared
    const matches = etudiants.filter(e => e.email.trim().toLowerCase() === item.email.trim().toLowerCase() || (e.first_name + ' ' + e.last_name).toLowerCase().replace(/\s+/g, '') === item.name.toLowerCase().replace(/\s+/g, ''));
    
    // get best match
    const stu = matches.find(e => (e.first_name + ' ' + e.last_name).toLowerCase().replace(/\s+/g, '') === item.name.toLowerCase().replace(/\s+/g, '')) || matches[0];
    
    if (cls && stu) {
       let paid_status = 'impaye';
       if (item.encaisse >= item.expected && item.expected >= 0) paid_status = 'paye';
       else if (item.encaisse > 0) paid_status = 'partiel';
       if (item.expected === 0 && item.encaisse === 0) paid_status = 'paye';

       const payload = {
         etudiant_id: stu.id,
         class_id: cls.id,
         status: 'valide',
         academic_year: '2026-2027',
         expected_amount: item.expected,
         paid_status: paid_status
       };
       
       const res = await fetch(url + '/rest/v1/inscriptions', {
         method: 'POST',
         headers,
         body: JSON.stringify(payload)
       });
       
       if (!res.ok) {
          console.log(`Failed for ${stu.first_name}: ${await res.text()}`);
       } else {
          console.log(`Success for ${stu.first_name} -> ${cls.name} (${paid_status})`);
       }
    } else {
       console.log(`Could not find student: ${item.name} OR class: ${item.class}`);
    }
  }
}
run();
