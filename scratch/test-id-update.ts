import { supabaseAdmin as dbAdmin } from "../src/lib/supabaseAdmin";

async function testIdUpdate() {
  console.log("=== TESTING ID UPDATE IN ETUDIANTS ===");
  const targetEmail = "ishestesteclients@outlook.fr";
  const newClerkId = `user_clerk_test_${Date.now()}`;

  // Find current student
  const { data: student } = await dbAdmin
    .from('etudiants')
    .select('id')
    .eq('email', targetEmail)
    .single();
  
  if (!student) {
    console.error("Student not found!");
    return;
  }
  const oldId = student.id;
  console.log(`Current ID: ${oldId}, attempting to change to: ${newClerkId}`);

  // Attempt upsert (same as Clerk webhook)
  const { data, error } = await dbAdmin
    .from('etudiants')
    .upsert({
      id: newClerkId,
      email: targetEmail,
      status: 'actif'
    }, { onConflict: 'email' })
    .select();

  if (error) {
    console.error("Upsert failed with error:", error);
  } else {
    console.log("Upsert succeeded! Returned data:", data);
  }
}

testIdUpdate();
