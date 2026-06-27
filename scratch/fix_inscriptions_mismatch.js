require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixInscriptions() {
  console.log("Recherche d'inscriptions avec une classe assignée...");
  const { data: inscriptions, error } = await supabase
    .from('inscriptions')
    .select('id, formation_id, class_id, etudiant_id')
    .not('class_id', 'is', null);

  if (error) {
    console.error("Erreur de lecture :", error);
    return;
  }

  let fixesCount = 0;

  for (const ins of inscriptions) {
    // Récupérer la formation de la classe
    const { data: classData } = await supabase
      .from('classes')
      .select('formation_id')
      .eq('id', ins.class_id)
      .single();

    if (classData && classData.formation_id && classData.formation_id !== ins.formation_id) {
      console.log(`Incohérence trouvée pour l'inscription ${ins.id} de l'étudiant ${ins.etudiant_id}.`);
      console.log(` -> Actuelle formation: ${ins.formation_id}`);
      console.log(` -> Nouvelle formation (corrigée): ${classData.formation_id}`);

      const { error: updateError } = await supabase
        .from('inscriptions')
        .update({ formation_id: classData.formation_id })
        .eq('id', ins.id);

      if (updateError) {
        console.error("Erreur lors de la mise à jour :", updateError);
      } else {
        fixesCount++;
        console.log(" -> Correction appliquée !");
      }
    }
  }

  console.log(`Terminé. ${fixesCount} inscriptions réparées.`);
}

fixInscriptions();
