require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspect() {
  const email = 'eliguzelsaid87@outlook.fr';
  console.log(`=== STATE INSPECTION FOR ${email} ===`);
  
  // 1. Get all students with this email
  const { data: students } = await supabase
    .from('etudiants')
    .select('*')
    .or(`email.ilike.${email},parent_id.not.is.null`); // select potential related ones too
    
  // Filter for students whose email contains the target email or parent email
  const relatedStudents = students.filter(s => 
    s.email.toLowerCase().includes(email.toLowerCase()) || 
    (s.parent_id && students.some(p => p.id === s.parent_id && p.email.toLowerCase().includes(email.toLowerCase())))
  );

  console.log('Students:', JSON.stringify(relatedStudents, null, 2));

  if (relatedStudents.length > 0) {
    const ids = relatedStudents.map(s => s.id);
    const { data: inscriptions } = await supabase
      .from('inscriptions')
      .select('*, formations(title)')
      .in('etudiant_id', ids);
    console.log('Inscriptions:', JSON.stringify(inscriptions, null, 2));

    const { data: paiements } = await supabase
      .from('paiements')
      .select('*')
      .in('etudiant_id', ids);
    console.log('Paiements:', JSON.stringify(paiements, null, 2));
  }
}

inspect();
