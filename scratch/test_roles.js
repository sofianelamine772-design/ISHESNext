require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkConstraint() {
  const { data, error } = await supabase.rpc('get_constraints'); // If we have an RPC
  if (error) {
    // Let's run a raw query using postgrest if possible, or just query pg_constraint
    // Since we are using supabase client, we can't run raw SQL easily without an RPC.
    // But we can try to insert a student with different roles to see what fails.
    const roles = ['eleve', 'parent', 'admin', 'professeur', 'etudiant'];
    for (const role of roles) {
      const id = `test_role_${Date.now()}`;
      const { error: insError } = await supabase.from('etudiants').insert({
        id,
        email: `test_role_${role}@test.com`,
        first_name: 'Test',
        last_name: 'Role',
        role
      });
      if (insError) {
        console.log(`Role '${role}' failed:`, insError.message);
      } else {
        console.log(`Role '${role}' succeeded!`);
        // Clean up
        await supabase.from('etudiants').delete().eq('id', id);
      }
    }
  }
}

checkConstraint();
