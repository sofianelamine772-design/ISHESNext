require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function runTest() {
  console.log("Starting DB linking test...");
  
  // 1. Simulate finding database UUID for classId '1' (mercredi)
  const staticClassId = '1';
  console.log(`Resolving static class ID '${staticClassId}'...`);
  
  const { PRESENTIEL_CLASSES } = require('../src/lib/presentiel-data');
  const staticClass = PRESENTIEL_CLASSES.find(c => c.id === parseInt(staticClassId));
  
  if (!staticClass) {
    console.error("Static class not found!");
    return;
  }
  console.log("Static class info:", staticClass.niveau, "Day:", staticClass.jour);
  
  const { data: dbClass, error: classError } = await supabase
    .from('classes')
    .select('id, name')
    .ilike('day_of_week', staticClass.jour)
    .maybeSingle();
    
  if (classError) {
    console.error("Error fetching class from DB:", classError);
    return;
  }
  
  if (!dbClass) {
    console.error("No class found in DB matching day of week:", staticClass.jour);
    return;
  }
  console.log(`Resolved UUID successfully! Class name: "${dbClass.name}", UUID: "${dbClass.id}"`);
  
  // 2. Create a test student
  const testEmail = `test_${Date.now()}@ishes-test.fr`;
  const studentId = `test_student_${Date.now()}`;
  console.log(`Creating test student with email ${testEmail}...`);
  
  const { error: studentError } = await supabase
    .from('etudiants')
    .insert({
      id: studentId,
      email: testEmail,
      first_name: 'TestPrenom',
      last_name: 'TestNom',
      phone: '0600000000',
      status: 'en_attente'
    });
    
  if (studentError) {
    console.error("Error creating student:", studentError);
    return;
  }
  console.log("Test student created successfully!");
  
  // 3. Create test inscription linked to the resolved class UUID
  console.log("Creating inscription record...");
  const { error: insError } = await supabase
    .from('inscriptions')
    .insert({
      etudiant_id: studentId,
      class_id: dbClass.id,
      status: 'en_attente_daffectation'
    });
    
  if (insError) {
    console.error("Error creating inscription linked to class UUID:", insError);
  } else {
    console.log("SUCCESS! Inscription linked perfectly to the class UUID without any error!");
  }
  
  // 4. Cleanup
  console.log("Cleaning up test data...");
  const { error: delInsError } = await supabase
    .from('inscriptions')
    .delete()
    .eq('etudiant_id', studentId);
  if (delInsError) console.error("Error deleting test inscription:", delInsError);
  
  const { error: delStudentError } = await supabase
    .from('etudiants')
    .delete()
    .eq('id', studentId);
  if (delStudentError) console.error("Error deleting test student:", delStudentError);
  
  console.log("Cleanup complete. Test finished!");
}

runTest();
