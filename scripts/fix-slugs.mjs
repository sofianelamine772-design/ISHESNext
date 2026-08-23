import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import ws from 'ws';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: ws }
});

async function fixDbIntegrity() {
  console.log("Mise à jour des slugs pour remettre les TIRETS (utilisés par le frontend)...");
  await supabase.from('formations').update({ slug: 'femme-debutante-presentiel' }).eq('slug', 'femme_debutante_presentiel');
  await supabase.from('formations').update({ slug: 'femme-intermediaire-presentiel' }).eq('slug', 'femme_intermediaire_presentiel');

  console.log("✅ Terminé. Les slugs utilisent bien les tirets désormais.");
}

fixDbIntegrity();
