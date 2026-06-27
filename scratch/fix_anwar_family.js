require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixAnwarFamily() {
  const ids = {
    parent: 'user_3FiZABkjeZJReTwpvhe0dqRW0o8',
    hamid: 'temp_1782559589646',
    zakaria: 'temp_1782559650012'
  };

  const formations = {
    presentielGlobal: '00000000-0000-0000-0000-000000000001' // ID for Scolarité Présentiel
  };

  const classes = {
    elementaire1: '049c6f2d-b1f5-4d00-9e59-3ccf952082a1', // Élémentaire 1 Mercredi
    elementaire3: 'fc020c9d-c1f7-40b2-8e9e-9011c9be6a98'  // Élémentaire 3 Dimanche A-M
  };

  console.log("Mise à jour des inscriptions de Hamid (Élémentaire 1)...");
  await supabase.from('inscriptions')
    .update({ formation_id: formations.presentielGlobal, class_id: classes.elementaire1 })
    .eq('etudiant_id', ids.hamid)
    .eq('formation_id', 'fd9a3a1c-6c18-4f62-a919-b4f5311ca096'); // Only update the wrong Tajwid ones

  console.log("Mise à jour des inscriptions de Zakaria (Élémentaire 3)...");
  await supabase.from('inscriptions')
    .update({ formation_id: formations.presentielGlobal, class_id: classes.elementaire3 })
    .eq('etudiant_id', ids.zakaria)
    .eq('formation_id', 'fd9a3a1c-6c18-4f62-a919-b4f5311ca096');

  console.log("Inscriptions mises à jour !");
}

fixAnwarFamily();
