import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

import ws from 'ws';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: ws }
});

async function fixDbIntegrity() {
  console.log("Suppression des doublons (femme avec underscores)...");
  await supabase.from('formations').delete().in('slug', ['femme_debutante_presentiel', 'femme_intermediaire_presentiel']);

  console.log("Mise à jour des anciens slugs (tirets vers underscores) et prix à 480...");
  await supabase.from('formations').update({ slug: 'femme_debutante_presentiel', price: 480 }).eq('slug', 'femme-debutante-presentiel');
  await supabase.from('formations').update({ slug: 'femme_intermediaire_presentiel', price: 480 }).eq('slug', 'femme-intermediaire-presentiel');

  console.log("✅ Terminé.");
}

fixDbIntegrity();
