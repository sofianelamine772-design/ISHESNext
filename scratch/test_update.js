require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const email = "yaniseldaya@outlook.fr";
  const { data: users } = await supabase.from('etudiants').select('id, email').ilike('email', email);
  console.log("Users before:", users);
  
  // Try to update one
  if (users.length > 0) {
    const { error } = await supabase
      .from('etudiants')
      .update({ id: 'user_test_123', status: 'actif' })
      .eq('id', users[0].id); // Just update one instead of ilike
    console.log("Update one error:", error ? error.message : "Success");
  }
}
check();
