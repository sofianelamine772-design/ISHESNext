import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

const file = fs.readFileSync('ishes_etudiants_distance_15_09_2026_03_26_51 copie.csv', 'utf8');
const lines = file.trim().split('\n').slice(1);

const classMap = {
  "Correction al Fatiha": "Session Correction al Fatiha (2026-2027)",
  "Tarbiya Islamiya": "Session Tarbiya Islamiya (2026-2027)",
  "Arabe Enfant (Distanciel)": "Session Arabe Enfant (Distance)",
  "Fiqh Mâlikite": "Session Fiqh Mâlikite (2026-2027)",
  "Cours Particuliers": "Session Cours Particuliers (2026-2027)",
  "Tajwid (Standard)": "Session Tajwid (Standard) (2026-2027)"
};

async function run() {
  const cRes = await fetch(url + '/rest/v1/classes?select=id,name', { headers });
  const classes = await cRes.json();
  
  for (const line of lines) {
    const row = line.split(',').map(s => s.replace(/(^"|"$)/g, ''));
    if (row.length < 10) continue;
    
    const id = row[0];
    const formation = row[5];
    const expected = parseFloat(row[7]);
    const encaisse = parseFloat(row[8]);
    
    if (formation === 'Aucune formation') continue;
    
    const dbClassName = classMap[formation];
    if (!dbClassName) {
       console.log('Skipping unknown formation:', formation);
       continue;
    }
    
    const cls = classes.find(c => c.name === dbClassName);
    if (!cls) continue;
    
    let paid_status = 'impaye';
    if (encaisse >= expected && expected >= 0) paid_status = 'paye';
    else if (encaisse > 0) paid_status = 'partiel';
    if (expected === 0 && encaisse === 0) paid_status = 'paye';

    const payload = {
      etudiant_id: id,
      class_id: cls.id,
      status: 'valide',
      academic_year: '2026-2027',
      expected_amount: expected,
      paid_status: paid_status
    };
    
    const res = await fetch(url + '/rest/v1/inscriptions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
       console.log(`Success: ${row[2]} -> ${dbClassName}`);
    } else {
       const err = await res.text();
       if (err.includes('23505')) {
          console.log(`Already enrolled: ${row[2]}`);
       } else {
          console.log(`Error for ${row[2]}:`, err);
       }
    }
  }
}
run();
