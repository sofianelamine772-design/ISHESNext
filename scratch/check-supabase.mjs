import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERREUR: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Get all plan IDs from programs-data.ts
const fileContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/programs-data.ts'), 'utf-8');
const keys = new Set();
const regex = /^\s+"([^"]+)":\s*\{/gm;
let match;
while ((match = regex.exec(fileContent)) !== null) {
  keys.add(match[1]);
}

// Add known hardcoded plan IDs from checkout
keys.add('presentiel-global');
keys.add('formation_generale');

const allPlanIds = Array.from(keys);
console.log(`🔍 Vérification de ${allPlanIds.length} formations dans Supabase...`);

async function checkFormations() {
  let hasErrors = false;

  for (const slug of allPlanIds) {
    const { data, error } = await supabase
      .from('formations')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error(`Erreur lors de la vérification de ${slug}:`, error.message);
      continue;
    }

    if (!data) {
      console.log(`❌ ERREUR: Formation introuvable en base de données pour le slug: "${slug}"`);
      hasErrors = true;
    } else {
      // console.log(`✅ OK: ${slug}`);
    }
  }

  if (!hasErrors) {
    console.log("✅ Succès: Toutes les formations sont bien présentes dans la base de données !");
  } else {
    console.log("⚠️ Attention: Certaines formations sont manquantes. Les paiements pour celles-ci échoueront.");
  }
}

checkFormations();
