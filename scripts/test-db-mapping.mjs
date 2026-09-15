import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import ws from 'ws';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Key is missing from .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: ws },
});

const { data: classes, error } = await supabase
  .from('classes')
  .select('id, name, type, external_id, is_active')
  .eq('is_active', true);

if (error) {
  console.error('❌ Impossible de lire les classes :', error.message);
  process.exit(1);
}

const presentiel = (classes || []).filter(
  (c) => c.type === 'presentiel' && c.external_id >= 1 && c.external_id <= 25,
);
const distance = (classes || []).filter(
  (c) => c.type === 'distanciel'
);

const presentielIds = new Set(presentiel.map((c) => c.external_id));
const missingPresentiel = [];
for (let i = 1; i <= 25; i++) {
  if (!presentielIds.has(i)) missingPresentiel.push(i);
}

if (missingPresentiel.length) {
  console.error('❌ Classes présentiel officielles manquantes :', missingPresentiel.join(', '));
  process.exit(1);
}

if (distance.length === 0) {
  console.error('❌ Aucune classe distanciel active trouvée !');
  process.exit(1);
}

console.log(`✅ Catalogue OK : présentiel 1–25 et ${distance.length} classes distanciel actives.`);
process.exit(0);
