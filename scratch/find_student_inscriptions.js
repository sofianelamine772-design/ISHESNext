require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkStudent() {
  const nom = 'fouad'.toLowerCase();
  
  // Find all etudiants with last_name like 'fouad'
  const { data: etudiants, error } = await supabase.from('etudiants').select('id, first_name, last_name, email, parent_id').ilike('last_name', `%${nom}%`);
  if (error) console.error("Erreur de requête:", error);
  console.log("Étudiants trouvés:", etudiants);
  
  if (!etudiants || etudiants.length === 0) return;
  
  const allIds = etudiants.map(e => e.id);
  
  // Find inscriptions
  const { data: inscriptions } = await supabase
    .from('inscriptions')
    .select('id, etudiant_id, formation_id, class_id, status')
    .in('etudiant_id', allIds);
    
  console.log("Inscriptions:");
  console.log(JSON.stringify(inscriptions, null, 2));
}

checkStudent();
