require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspect() {
  const email = 'leil71606@gmail.com';
  const clerkId = 'user_3Fihkq1Fb6LtdlUsnw2MDrtmKJ6';
  
  console.log(`=== INSPECTING ${email} ===`);
  
  const { data: students } = await supabase
    .from('etudiants')
    .select('*')
    .or(`email.ilike.%leil71606%,id.eq.${clerkId},parent_id.eq.${clerkId}`);
    
  console.log('Students:', JSON.stringify(students, null, 2));

  if (students.length > 0) {
    const ids = students.map(s => s.id);
    const { data: inscriptions } = await supabase
      .from('inscriptions')
      .select('*, formations(title)')
      .in('etudiant_id', ids);
    console.log('Inscriptions:', JSON.stringify(inscriptions, null, 2));
  }
}

inspect();
