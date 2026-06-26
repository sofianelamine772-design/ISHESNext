require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function patchStudent() {
  const email = 'yaniseldaya@outlook.fr'; // Using lowercase as Supabase might store it lowercase
  
  // 1. Find the student
  const { data: student, error: errSt } = await supabase
    .from('etudiants')
    .select('id')
    .ilike('email', email)
    .single();

  const { data: formation } = await supabase.from('formations').select('id').eq('slug', 'tajwid_intensif').single();
  const { data: cls } = await supabase.from('classes').select('id').eq('formation_id', formation.id).single();

  const { error: errIns } = await supabase
    .from('inscriptions')
    .insert({
      etudiant_id: student.id,
      formation_id: formation.id,
      class_id: cls.id,
      status: 'valide',
      paid_status: 'paye',
    });
  if (errIns) console.error("Insert error:", errIns);
  else console.log("Success!");
}

patchStudent();
