import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { CLASS_ID_TO_UUID } from './src/lib/presentiel-data';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function run() {
  const res = await fetch(url + '/rest/v1/classes?type=eq.presentiel&select=id,external_id', {
    headers: { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' }
  });
  const dbClasses = await res.json();
  
  let mismatches = 0;
  for (const db of dbClasses) {
    if (!db.external_id) continue;
    const hardcodedUuid = CLASS_ID_TO_UUID[db.external_id];
    if (db.id !== hardcodedUuid) {
      console.log(`Mismatch for external_id ${db.external_id}: DB=${db.id}, Code=${hardcodedUuid}`);
      mismatches++;
    }
  }
  console.log('Total mismatches:', mismatches);
}
run();
