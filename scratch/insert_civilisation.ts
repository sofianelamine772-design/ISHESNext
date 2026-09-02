import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('formations')
    .upsert({
      slug: 'civilisation_arabo_musulmane',
      title: 'Civilisation Arabo-Musulmane',
      price: 199,
      is_active: true,
      type: 'distanciel'
    }, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error("Error inserting formation:", error);
  } else {
    console.log("Success! Formation inserted/updated:", data);
  }
}

run();
