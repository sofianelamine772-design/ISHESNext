import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

const backup = JSON.parse(fs.readFileSync('db_backup.json', 'utf8'));
const backupClasses = backup.classes;

const restoredNames = [
    'Session Tajwid Enfant (Distance)',
    'Session Formation Enseignant Tajwid',
    'Session Civilisation (2026-2027)',
    'Session Arabe Enfant (Distance)',
    'Session Cours Particuliers (2026-2027)',
    'Session Tajwid Intensif (2026-2027)',
    'Session Fiqh Mâlikite (2026-2027)',
    'Session Tilawa (2026-2027)',
    'Session Sciences du Coran (2026-2027)',
    'Session Correction al Fatiha (2026-2027)',
    'Session Spiritualité Musulmane (2026-2027)',
    'Session Sîrah An-Nabawiyya (2026-2027)',
    'Session Al-Aqîda (2026-2027)',
    'Session Arabe Littéraire (Adulte) (2026-2027)',
    'Session Tajwid (Standard) (2026-2027)',
    'Session Scolarité Enfants (2026-2027)',
    'Session Formation Enseignant Tarbya',
    'Session Mémorisation du Coran (2026-2027)',
    'Session Sciences du Hadith (2026-2027)',
    'Session Sciences Islamiques (2026-2027)',
    'Session Arabe & Coran Junior (2026-2027)',
    "Session Cours d'arabe enfant (2026-2027)",
    'Session Tarbiya Islamiya (2026-2027)'
];

async function run() {
  const cRes = await fetch(url + '/rest/v1/classes?select=*', { headers });
  const liveClasses = await cRes.json();
  
  for (const name of restoredNames) {
    const backupCls = backupClasses.find(c => c.name === name);
    const liveCls = liveClasses.find(c => c.name === name);
    
    if (backupCls && liveCls) {
       const payload = {
         whatsapp_link: backupCls.whatsapp_link,
         teacher_name: backupCls.teacher_name,
         day_of_week: backupCls.day_of_week,
         start_time: backupCls.start_time,
         end_time: backupCls.end_time,
         capacity_limit: backupCls.capacity_limit,
         niveau: backupCls.niveau,
         age_condition: backupCls.age_condition,
         periode: backupCls.periode,
         audience: backupCls.audience,
         classe_type: backupCls.classe_type,
         niveau_key: backupCls.niveau_key
       };
       
       const res = await fetch(url + `/rest/v1/classes?id=eq.${liveCls.id}`, {
         method: 'PATCH',
         headers,
         body: JSON.stringify(payload)
       });
       
       if (res.ok) {
          console.log(`Restored metadata for ${name}`);
       } else {
          console.log(`Failed to restore metadata for ${name}: ${await res.text()}`);
       }
    } else {
       console.log(`Could not find class in backup or live: ${name}`);
    }
  }
}
run();
