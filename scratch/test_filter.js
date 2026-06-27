require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function testFilter() {
  const { data, error } = await supabase
    .from('etudiants')
    .select(`
      *,
      inscriptions (
        status,
        paid_status,
        formation_id,
        class_id,
        academic_year,
        formations (title)
      )
    `);
    
  if (error) {
    console.error(error);
    return;
  }
  
  const filtered = data.filter((student) => {
    if (student.id && String(student.id).startsWith('manual_')) return true;
    if (student.status !== 'en_attente') return true;
    const hasPaidInscription = student.inscriptions?.some((ins) => 
      ins.paid_status === 'paye'
    );
    return hasPaidInscription;
  });
  
  const sujud = filtered.find(s => s.first_name === 'sujudddo');
  const malik = filtered.find(s => s.first_name === 'malikko');
  
  console.log('Sujudddo visible ?', !!sujud);
  console.log('Malikko visible ?', !!malik);
  
  if (!sujud && !malik) {
    console.log('🎉 SUCCESS: Non-paid students are now completely hidden from the list!');
  } else {
    console.log('❌ FAIL: Non-paid students are still visible.');
  }
}

testFilter();
