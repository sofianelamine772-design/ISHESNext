require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const oldId = 'temp_1782479830492';
  const newId = 'user_dummy_123';
  
  const { data: oldStudent } = await supabaseAdmin.from('etudiants').select('*').eq('id', oldId).single();
  if (!oldStudent) return console.log("Not found");
  
  const payload = {
      id: newId,
      email: oldStudent.email,
      first_name: oldStudent.first_name,
      last_name: oldStudent.last_name,
      phone: oldStudent.phone,
      parent_first_name: oldStudent.parent_first_name,
      parent_last_name: oldStudent.parent_last_name,
      role: oldStudent.role,
      status: oldStudent.status,
      created_at: oldStudent.created_at,
      parent_id: oldStudent.parent_id
  };
  console.log("Payload:", payload);
  const { error: insertError } = await supabaseAdmin.from('etudiants').insert(payload);
  console.log("Insert error:", insertError ? insertError.message : "Success");
}
check();
