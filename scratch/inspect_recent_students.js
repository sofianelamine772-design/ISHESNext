require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectRecent() {
  console.log("=== RECENT SUPABASE STUDENTS ===");
  const { data: students } = await supabase
    .from('etudiants')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(15);
    
  console.log(JSON.stringify(students, null, 2));
}

inspectRecent();
