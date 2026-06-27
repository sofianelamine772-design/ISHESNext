require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function deleteGhosts() {
  console.log("Recherche des doublons fantômes (Tajwid Standard avec class_id = null)...");
  
  const { data: ghosts } = await supabase
    .from('inscriptions')
    .select('id, etudiant_id')
    .eq('formation_id', 'fd9a3a1c-6c18-4f62-a919-b4f5311ca096')
    .is('class_id', null);
    
  if (!ghosts || ghosts.length === 0) {
    console.log("Aucun fantôme trouvé.");
    return;
  }
  
  for (const ghost of ghosts) {
    // Check if the student also has a valid presentiel inscription
    const { data: valid } = await supabase
      .from('inscriptions')
      .select('id')
      .eq('etudiant_id', ghost.etudiant_id)
      .eq('formation_id', '00000000-0000-0000-0000-000000000001')
      .not('class_id', 'is', null);
      
    if (valid && valid.length > 0) {
      console.log(`Suppression du fantôme ${ghost.id} pour l'étudiant ${ghost.etudiant_id}...`);
      await supabase.from('inscriptions').delete().eq('id', ghost.id);
    }
  }
  console.log("Nettoyage terminé !");
}

deleteGhosts();
