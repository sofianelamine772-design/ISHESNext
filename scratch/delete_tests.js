const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanTestData() {
  console.log("Starting test data cleanup...");

  // 1. Delete all inscriptions that are not 2026-2027
  const { data: insDel, error: e1 } = await supabase
    .from('inscriptions')
    .delete()
    .neq('academic_year', '2026-2027');
  console.log("Inscriptions deleted:", e1 ? e1.message : "Success");

  // 2. Delete all classes that are not 2026-2027
  const { data: clsDel, error: e2 } = await supabase
    .from('classes')
    .delete()
    .neq('academic_year', '2026-2027');
  console.log("Classes deleted:", e2 ? e2.message : "Success");

  // 3. Optional: Delete all students who are not admins and have no inscriptions
  // It's safer to just delete all non-admin students to start fresh, but let's check
  // Since they cascade, if we delete all non-admin students, their inscriptions and payments also drop.
  const { data: etudiants, error: e3 } = await supabase
    .from('etudiants')
    .delete()
    .neq('role', 'admin');
  console.log("Students (non-admin) deleted:", e3 ? e3.message : "Success");

  console.log("Cleanup complete!");
}

cleanTestData();
