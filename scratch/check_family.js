require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const clerkUserId = 'user_3EiWs9Z2osU9QR6IzvKT5h00RAw';

  const { data: etudiants } = await supabaseAdmin
    .from('etudiants')
    .select('*')
    .or(`id.eq.${clerkUserId},parent_id.eq.${clerkUserId}`);
    
  console.log("Family Members:", etudiants?.map(e => ({ id: e.id, email: e.email })));
  
  const familyIds = etudiants?.map(e => e.id) || [];
  
  const { data: inscriptions } = await supabaseAdmin
    .from('inscriptions')
    .select('*')
    .in('etudiant_id', familyIds);
    
  console.log("Inscriptions:", inscriptions?.map(i => ({ id: i.id, etudiant_id: i.etudiant_id, status: i.status })));
}

main();
