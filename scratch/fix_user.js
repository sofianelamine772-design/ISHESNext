require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function main() {
  const email = 'sofianelamine31@icloud.com';
  
  const { data: users, error: clerkError } = await fetch(`https://api.clerk.com/v1/users?email_address=${encodeURIComponent(email)}`, {
    headers: { 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}` }
  }).then(r => r.json());
  
  if (!users || users.length === 0) {
    console.log('User not found in Clerk');
    return;
  }
  
  const clerkUserId = users[0].id;
  console.log('Clerk User ID:', clerkUserId);
  
  // Find the exact match temp student
  const { data: tempEtudiants } = await supabaseAdmin.from('etudiants').select('*').eq('email', email);
  const exactMatch = tempEtudiants.find(s => s.id.startsWith('temp_'));
  
  if (exactMatch) {
    console.log('Found exact match temp student:', exactMatch.id);
    
    // 1. Rename email to avoid unique constraint
    await supabaseAdmin.from('etudiants').update({ email: email + '+migrated' }).eq('id', exactMatch.id);
    
    // 2. Insert new clerkUserId
    const { error: insertError } = await supabaseAdmin.from('etudiants').insert({
      id: clerkUserId,
      email: email,
      first_name: exactMatch.first_name,
      last_name: exactMatch.last_name,
      phone: exactMatch.phone,
      role: exactMatch.role,
      status: exactMatch.status,
      parent_first_name: exactMatch.parent_first_name,
      parent_last_name: exactMatch.parent_last_name
    });
    
    if (insertError) {
      console.error('Insert error:', insertError);
      return;
    }
    
    // 3. Migrate references
    await supabaseAdmin.from('inscriptions').update({ etudiant_id: clerkUserId }).eq('etudiant_id', exactMatch.id);
    await supabaseAdmin.from('paiements').update({ etudiant_id: clerkUserId }).eq('etudiant_id', exactMatch.id);
    await supabaseAdmin.from('etudiants').update({ parent_id: clerkUserId }).eq('parent_id', exactMatch.id);
    
    // 4. Delete temp
    await supabaseAdmin.from('etudiants').delete().eq('id', exactMatch.id);
    console.log('Migrated successfully!');
  } else {
    console.log('No exact match temp student found.');
  }
}

main();
