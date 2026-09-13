import dotenv from 'dotenv';
import ws from 'ws';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { realtime: { transport: ws } },
);

function capacityFor(externalId) {
  if (externalId >= 1 && externalId <= 7) return 15;
  if (externalId >= 8 && externalId <= 23) return 18;
  if (externalId >= 24 && externalId <= 25) return 20;
  return null;
}

const { data: classes, error } = await supabase
  .from('classes')
  .select('id, name, external_id, capacity_limit, academic_year, is_active')
  .eq('type', 'presentiel')
  .gte('external_id', 1)
  .lte('external_id', 25);

if (error) {
  console.error(error);
  process.exit(1);
}

let updated = 0;
for (const row of classes || []) {
  const next = capacityFor(row.external_id);
  if (!next || row.capacity_limit === next) continue;
  const { error: upError } = await supabase
    .from('classes')
    .update({ capacity_limit: next })
    .eq('id', row.id);
  if (upError) {
    console.error(row.external_id, upError.message);
    continue;
  }
  updated += 1;
  console.log(`${row.external_id} ${row.academic_year || ''} ${row.capacity_limit} → ${next} | ${row.name}`);
}

console.log(`Mis à jour : ${updated} classe(s).`);
