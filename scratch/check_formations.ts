import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Charger les variables depuis le fichier .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validation pour TypeScript et pour le runtime
if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ ERREUR : supabaseUrl ou supabaseServiceRoleKey est manquant.");
  console.error("Vérifiez que votre fichier .env.local contient NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

// Maintenant TypeScript sait que ce sont des chaînes de caractères (string)
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function check() {
  console.log("🔍 Vérification de la base de données ISHES...");
  
  const { data: formations, error: fError } = await supabase.from('formations').select('*');
  const { data: classes, error: cError } = await supabase.from('classes').select('*');

  if (fError) {
    console.error('❌ Erreur lors du fetch des formations:', fError.message);
  } else {
    console.log('✅ Formations trouvées :', formations?.length || 0);
    console.table(formations?.map(f => ({ titre: f.title, slug: f.slug, prix: f.price })));
  }

  if (cError) {
    console.error('❌ Erreur lors du fetch des classes:', cError.message);
  } else {
    console.log('✅ Classes trouvées :', classes?.length || 0);
  }
}

check().catch(err => {
  console.error("💥 Erreur fatale :", err);
});
