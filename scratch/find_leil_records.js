require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findRecords() {
  const queryEmail = 'leil71606';
  console.log(`=== SEARCHING FOR ALL STUDENTS WITH EMAIL CONTAINING ${queryEmail} ===`);
  const { data: students, error } = await supabase
    .from('etudiants')
    .select('*')
    .ilike('email', `%${queryEmail}%`);
    
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(JSON.stringify(students, null, 2));
}

findRecords();
