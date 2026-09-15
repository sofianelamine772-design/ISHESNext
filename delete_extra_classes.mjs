import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 
  'apikey': key, 
  'Authorization': `Bearer ${key}`,
  'Content-Type': 'application/json'
};

const classesToDelete = [
  'Session Sciences du Hadith (2026-2027)',
  'Session Sciences Islamiques (2026-2027)',
  'Session Arabe & Coran Junior (2026-2027)',
  "Session Cours d'arabe enfant (2026-2027)",
  'Session Tarbiya Islamiya (2026-2027)'
];

async function run() {
  for (const name of classesToDelete) {
    const res = await fetch(`${url}/rest/v1/classes?name=eq.${encodeURIComponent(name)}&select=id`, { headers });
    const data = await res.json();
    if (data && data.length > 0) {
      const cls = data[0];
      const delRes = await fetch(`${url}/rest/v1/classes?id=eq.${cls.id}`, { 
        method: 'DELETE',
        headers 
      });
      if (delRes.ok) {
        console.log(`Deleted ${name}`);
      } else {
        console.error(`Failed to delete ${name}`, await delRes.text());
      }
    } else {
      console.log(`${name} not found.`);
    }
  }
}

run();
