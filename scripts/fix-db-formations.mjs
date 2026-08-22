import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: ws,
  }
});

async function fixDb() {
  console.log("Fixing prices...");
  await supabase.from('formations').update({ price: 399 }).in('slug', ['tajwid_enfant_distance', 'arabe_enfant_distance']);
  await supabase.from('formations').update({ price: 480 }).in('slug', ['femme_debutante_presentiel', 'femme_intermediaire_presentiel']);

  console.log("Inserting missing formations...");
  
  const toInsert = [
    { slug: 'tilawa', title: 'Tilawa — Lecture & Récitation', type: 'distanciel', price: 399 },
    { slug: 'femme_debutante_presentiel', title: 'Femme Débutante – Présentiel', type: 'presentiel', price: 480 },
    { slug: 'femme_intermediaire_presentiel', title: 'Femme Intermédiaire – Présentiel', type: 'presentiel', price: 480 }
  ];

  for (const f of toInsert) {
    const { data: existing } = await supabase.from('formations').select('id').eq('slug', f.slug).maybeSingle();
    if (!existing) {
      await supabase.from('formations').insert(f);
      console.log(`Inserted ${f.slug}`);
    } else {
      console.log(`${f.slug} already exists`);
    }
  }
  console.log("Done");
}

fixDb();
