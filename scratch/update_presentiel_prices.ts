import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ ERREUR : supabaseUrl ou supabaseServiceRoleKey est manquant dans .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function run() {
  console.log("⚡ Mise à jour des tarifs des formations en présentiel...");

  // Mettre à jour 'presentiel-enfant'
  const { data: up1, error: err1 } = await supabase
    .from('formations')
    .update({ price: 480 })
    .eq('slug', 'presentiel-enfant')
    .select();

  if (err1) {
    console.error("❌ Erreur lors de la mise à jour de presentiel-enfant :", err1.message);
  } else {
    console.log("✅ presentiel-enfant mis à jour :", up1);
  }

  // Mettre à jour 'arabe_coran_junior'
  const { data: up2, error: err2 } = await supabase
    .from('formations')
    .update({ price: 480 })
    .eq('slug', 'arabe_coran_junior')
    .select();

  if (err2) {
    console.error("❌ Erreur lors de la mise à jour de arabe_coran_junior :", err2.message);
  } else {
    console.log("✅ arabe_coran_junior mis à jour :", up2);
  }

  // Mettre à jour 'arabe-coran-junior'
  const { data: up3, error: err3 } = await supabase
    .from('formations')
    .update({ price: 480 })
    .eq('slug', 'arabe-coran-junior')
    .select();

  if (err3) {
    console.error("❌ Erreur lors de la mise à jour de arabe-coran-junior :", err3.message);
  } else {
    console.log("✅ arabe-coran-junior mis à jour :", up3);
  }

  // Vérifier le statut final
  const { data: formations } = await supabase
    .from('formations')
    .select('title, slug, price');
  console.log("\n📊 Statut final des formations :");
  console.table(formations);
}

run().catch(console.error);
