require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function createClass() {
  // 1. Trouver la formation
  const { data: formation, error: fErr } = await supabase
    .from('formations')
    .select('id')
    .eq('title', 'Scolarité Enfants (Présentiel)')
    .single();

  if (fErr || !formation) {
    console.error("Impossible de trouver la formation:", fErr);
    return;
  }

  // 2. Créer la classe
  const { error: cErr } = await supabase
    .from('classes')
    .insert({
      formation_id: formation.id,
      name: 'Session Scolarité Enfants (2026-2027)',
      type: 'presentiel',
      academic_year: '2026-2027',
      is_active: true
    });

  if (cErr) {
    console.error("Erreur lors de la création de la classe:", cErr);
  } else {
    console.log("✅ Classe créée avec succès pour Scolarité Enfants (Présentiel) !");
  }
}

createClass();
