require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function merge() {
  const email = "yaniseldaya@outlook.fr";
  const { data: users } = await supabase.from('etudiants').select('id, email, status, created_at').ilike('email', email);
  console.log("All users with this email:", users);

  const clerkUser = users.find(u => u.id.startsWith('user_'));
  const tempUsers = users.filter(u => u.id.startsWith('temp_'));

  if (!clerkUser) {
    console.log("No clerk user found!");
    return;
  }

  for (const temp of tempUsers) {
    console.log("Merging temp user", temp.id, "into", clerkUser.id);
    await supabase.from('inscriptions').update({ etudiant_id: clerkUser.id }).eq('etudiant_id', temp.id);
    await supabase.from('paiements').update({ etudiant_id: clerkUser.id }).eq('etudiant_id', temp.id);
    await supabase.from('etudiants').delete().eq('id', temp.id);
  }
  
  console.log("Merge completed!");
}
merge();
