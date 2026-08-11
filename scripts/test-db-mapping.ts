/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import ws from 'ws';

(global as any).WebSocket = ws;
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Key is missing from .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
  console.log('🔄 Test d\'intégrité de la base de données en cours...');

  try {
    // 1. Fetch all formations
    const { data: formations, error: formationsError } = await supabase
      .from('formations')
      .select('id, title, slug, type');

    if (formationsError) throw formationsError;

    // 2. Fetch all active classes
    const { data: classes, error: classesError } = await supabase
      .from('classes')
      .select('id, formation_id, name, external_id')
      .eq('is_active', true);

    if (classesError) throw classesError;

    console.log(`\n🔍 DEBUG: Total active classes found in DB: ${classes?.length || 0}`);
    classes?.forEach((c: any) => console.log(` - [ID ${c.external_id}] ${c.name} (formation: ${c.formation_id})`));

    console.log(`\n🔍 DEBUG: Total formations found in DB: ${formations?.length || 0}`);
    formations?.forEach((f: any) => console.log(` - [${f.type}] ${f.slug} (ID: ${f.id})`));

    // 3. Verify each formation has at least one linked class
    const orphanFormations: string[] = [];

    for (const formation of formations || []) {
      const linkedClasses = classes?.filter((c: any) => c.formation_id === formation.id) || [];
      if (linkedClasses.length === 0) {
        orphanFormations.push(`- Formation [${formation.type}] "${formation.title}" (slug: ${formation.slug})`);
      }
    }

    // Fail the test clearly with explanations if any orphans are found
    if (orphanFormations.length > 0) {
      console.error('\n❌ ERREUR CRITIQUE D\'INTÉGRITÉ DE BASE DE DONNÉES ❌');
      console.error('Des élèves risquent d\'être assignés "En attente" car les formations suivantes n\'ont AUCUNE classe active associée :\n');
      console.error(orphanFormations.join('\n'));
      console.error('\n👉 Veuillez créer et relier des classes à ces formations avant de déployer.\n');
      process.exit(1);
    }

    console.log('\n✅ Succès : TOUTES les formations (présentiel et distanciel) sont correctement reliées à au moins une classe active.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur lors du test :', error);
    process.exit(1);
  }
}

runTest();
