import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERREUR: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Extraire tous les identifiants (slugs) depuis programs-data.ts
const fileContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/programs-data.ts'), 'utf-8');
const keys = new Set();
const regex = /^\s+"([^"]+)":\s*\{/gm;
let match;
while ((match = regex.exec(fileContent)) !== null) {
  keys.add(match[1]);
}

// Ajouter les identifiants utilisés en dur dans le code
keys.add('presentiel-global');
keys.add('formation_generale');

// Extraire les slugs des cours présentiels (enfants) depuis presentiel-data.ts
try {
  const presentielContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/presentiel-data.ts'), 'utf-8');
  const niveauRegex = /niveauKey:\s*"([^"]+)"/gm;
  let nMatch;
  while ((nMatch = niveauRegex.exec(presentielContent)) !== null) {
    keys.add(nMatch[1]);
  }
} catch (e) {
  console.log("Info: presentiel-data.ts non trouvé ou impossible à lire");
}

const allPlanIds = Array.from(keys);
console.log(`\n🔍 Vérification de ${allPlanIds.length} formations potentielles dans Supabase...\n`);

async function checkFormations() {
  let missingFormations = [];
  let foundCount = 0;

  for (const slug of allPlanIds) {
    const { data, error } = await supabase
      .from('formations')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error(`Erreur réseau lors de la vérification de ${slug}:`, error.message);
      continue;
    }

    if (!data) {
      missingFormations.push(slug);
    } else {
      foundCount++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 RÉSULTAT DU TEST`);
  console.log(`======================================================`);
  console.log(`✅ ${foundCount} formations trouvées et opérationnelles pour le paiement.`);
  
  if (missingFormations.length > 0) {
    console.log(`\n❌ ${missingFormations.length} formations INTROUVABLES en base de données :`);
    missingFormations.forEach(slug => {
      console.log(`   - ${slug}`);
    });
    console.log(`\n⚠️ Attention : Tout paiement lié à l'un de ces slugs échouera avec l'erreur "Formation introuvable en base de données".`);
    console.log(`👉 Action requise : Ajoutez ces identifiants EXACTS dans la colonne 'slug' de la table 'formations' sur Supabase.`);
  } else {
    console.log(`\n🎉 Succès total : Toutes les formations sont bien présentes dans la base de données !`);
    console.log(`Le paiement fonctionnera pour tous ces cours.`);
  }
  console.log(`======================================================\n`);
}

checkFormations();
