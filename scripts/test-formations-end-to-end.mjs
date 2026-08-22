import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERREUR: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: ws,
  }
});

// 1. Charger les données du frontend
const programsContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/programs-data.ts'), 'utf-8');
const presentielContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/presentiel-data.ts'), 'utf-8');

// Extraction simple des prix depuis programs-data.ts
// Format attendu: "slug": { ... price: "199 €", ... }
const frontendPrices = {};

const regexPrograms = /"([^"]+)":\s*\{[^}]*?price:\s*"([^"]+)"/gs;
let match;
while ((match = regexPrograms.exec(programsContent)) !== null) {
  let slug = match[1];
  let priceStr = match[2].replace(/[^\d]/g, ''); // Extract numbers
  if (priceStr) {
    frontendPrices[slug] = parseInt(priceStr, 10);
  }
}

// Check class mappings
let classMappingsStr = presentielContent.match(/export const CLASS_ID_TO_UUID: Record<number, string> = {([^}]+)}/s);
let classMappings = {};
if (classMappingsStr) {
  const lines = classMappingsStr[1].split('\n');
  for (const line of lines) {
    const match = line.match(/(\d+):\s*'([^']+)'/);
    if (match) {
      classMappings[match[1]] = match[2];
    }
  }
}

async function runTests() {
  console.log(`🔍 DÉMARRAGE DES TESTS END-TO-END...`);
  
  const { data: dbFormations, error: dbError } = await supabase.from('formations').select('slug, price, title');
  if (dbError) {
    console.error("Erreur de récupération des formations :", dbError);
    return;
  }
  
  let errorsFound = 0;
  
  console.log(`\n--- VÉRIFICATION DES PRIX (Frontend vs Base de Données) ---`);
  for (const [slug, frontendPrice] of Object.entries(frontendPrices)) {
    const dbRow = dbFormations.find(f => f.slug === slug);
    if (!dbRow) {
      console.log(`❌ [ERREUR] Slug introuvable en DB : ${slug}`);
      errorsFound++;
    } else {
      if (dbRow.price !== frontendPrice) {
        console.log(`❌ [ERREUR PRIX] ${slug}: Frontend affiche ${frontendPrice}€ mais la DB a ${dbRow.price}€`);
        errorsFound++;
      } else {
        console.log(`✅ [OK] ${slug}: ${dbRow.price}€`);
      }
    }
  }

  console.log(`\n--- VÉRIFICATION DES CLASSES (CLASS_ID_TO_UUID) ---`);
  for (const [classId, uuid] of Object.entries(classMappings)) {
    const { data: classRow, error: classError } = await supabase.from('classes').select('id, name, formation_id').eq('id', uuid).maybeSingle();
    if (classError || !classRow) {
      console.log(`❌ [ERREUR CLASSE] ID frontend ${classId} pointe vers UUID invalide/inexistant : ${uuid}`);
      errorsFound++;
    } else {
      console.log(`✅ [OK] Classe ID ${classId} valide -> ${classRow.name}`);
    }
  }

  console.log(`\n======================================================`);
  if (errorsFound > 0) {
    console.log(`🚨 BILAN : ${errorsFound} erreur(s) détectée(s). Veuillez les corriger.`);
  } else {
    console.log(`🎉 BILAN : Parfait ! Tous les prix et toutes les classes sont correctement mappés.`);
  }
}

runTests();
