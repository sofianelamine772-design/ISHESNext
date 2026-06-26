require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function cleanup() {
  const email = "yaniseldaya@outlook.fr";
  const { data: users } = await supabaseAdmin.from('etudiants').select('id, email').ilike('email', email);
  
  for (const user of users) {
    // If it starts with user_ or anything other than temp_1782479830492
    if (user.id !== 'temp_1782479830492') {
      console.log("Deleting duplicate user:", user.id);
      await supabaseAdmin.from('etudiants').delete().eq('id', user.id);
    }
  }
}
cleanup();
