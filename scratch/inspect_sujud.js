require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspect() {
  const email = 'eliguzelsaid87@outlook.fr';
  console.log(`=== INSPECTION DE ${email} ===`);
  
  const { data: students, error: err1 } = await supabase
    .from('etudiants')
    .select('*')
    .ilike('email', email);
    
  console.log('Students:', JSON.stringify(students, null, 2));
  
  if (students && students.length > 0) {
    const ids = students.map(s => s.id);
    const { data: inscriptions, error: err2 } = await supabase
      .from('inscriptions')
      .select('*, formations(title)')
      .in('etudiant_id', ids);
    console.log('Inscriptions:', JSON.stringify(inscriptions, null, 2));

    const { data: paiements, error: err3 } = await supabase
      .from('paiements')
      .select('*')
      .in('etudiant_id', ids);
    console.log('Paiements:', JSON.stringify(paiements, null, 2));
  }
}

inspect();
