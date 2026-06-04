require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  const { data, error } = await supabase
    .from('etudiants')
    .insert({
      id: 'test_student_123',
      first_name: 'Test',
      last_name: 'Test',
      email: 'test@test.com',
      address: '123 Test St'
    });
  console.log('Error:', error);
}
test();
