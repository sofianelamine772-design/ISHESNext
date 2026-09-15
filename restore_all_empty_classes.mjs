import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

const deletedNames = [
  "Session Sciences du Hadith (2026-2027)",
  "Session Sciences Islamiques (2026-2027)",
  "Session Arabe & Coran Junior (2026-2027)",
  "Session Cours d'arabe enfant (2026-2027)",
  "Session Tajwid Enfant (Distance)",
  "Session Formation Enseignant Tajwid",
  "Session Civilisation (2026-2027)",
  "Session Tajwid Intensif (2026-2027)",
  "Session Tilawa (2026-2027)",
  "Session Sciences du Coran (2026-2027)",
  "Session Spiritualité Musulmane (2026-2027)",
  "Session Sîrah An-Nabawiyya (2026-2027)",
  "Session Al-Aqîda (2026-2027)",
  "Session Arabe Littéraire (Adulte) (2026-2027)",
  "Session Scolarité Enfants (2026-2027)",
  "Session Formation Enseignant Tarbya",
  "Session Mémorisation du Coran (2026-2027)"
];

const backup = JSON.parse(fs.readFileSync('db_backup.json', 'utf8'));
const classes = backup.classes;

async function run() {
  for (const name of deletedNames) {
    const c = classes.find(cls => cls.name === name);
    if (c) {
      // Create it again with all the exact fields from backup
      const payload = { ...c };
      // we might want to let the db generate id, or reuse old id? 
      // if we reuse old id, they will be 100% restored.
      const res = await fetch(url + '/rest/v1/classes', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        console.log("Restored:", name);
      } else {
        const err = await res.text();
        if (err.includes('duplicate key')) {
          console.log("Already exists:", name);
        } else {
          console.error("Failed to restore", name, err);
        }
      }
    }
  }
}
run();
