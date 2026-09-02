import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const slugsToUpdate = [
    'femme-debutante-presentiel',
    'femme-intermediaire-presentiel',
    'tajwid_standard',
    'tajwid_intensif',
    'as_sirah',
    'arabe_adulte'
  ];

  for (const slug of slugsToUpdate) {
    const { error } = await supabase
      .from('formations')
      .update({ price: 649 })
      .eq('slug', slug);
      
    if (error) {
      console.error(`Error updating ${slug}:`, error);
    } else {
      console.log(`Successfully updated ${slug} to 649`);
    }
  }
}

main();
