import { supabaseAdmin as dbAdmin } from "../src/lib/supabaseAdmin";

async function testMigration() {
  console.log("=== TESTING MANUAL ID MIGRATION WITH EMAIL RENAME ===");
  const targetEmail = "ishestesteclients@outlook.fr";
  const newClerkId = `user_clerk_test_${Date.now()}`;

  // 1. Find existing student
  const { data: student, error: fetchError } = await dbAdmin
    .from('etudiants')
    .select('*')
    .eq('email', targetEmail)
    .maybeSingle();

  if (fetchError || !student) {
    console.error("Student not found or error:", fetchError);
    return;
  }
  const oldId = student.id;
  console.log(`Found student. Old ID: ${oldId}, New Clerk ID to migrate to: ${newClerkId}`);

  if (oldId === newClerkId) {
    console.log("IDs are already the same. No migration needed.");
    return;
  }

  // 2. Temporarily change the email of the old student record to free the unique constraint
  console.log("Renaming old student email temporarily...");
  const tempEmail = `migrating_${Date.now()}_${student.email}`;
  const { error: renameError } = await dbAdmin
    .from('etudiants')
    .update({ email: tempEmail })
    .eq('id', oldId);

  if (renameError) {
    console.error("Failed to rename old student email:", renameError);
    return;
  }

  // 3. Insert new student record with Clerk ID
  console.log("Inserting new student record...");
  const { error: insertError } = await dbAdmin
    .from('etudiants')
    .insert({
      id: newClerkId,
      email: student.email, // using original email
      first_name: student.first_name || '',
      last_name: student.last_name || '',
      phone: student.phone || '',
      photo_url: student.photo_url || null,
      role: student.role || 'eleve',
      status: student.status || 'actif'
    });

  if (insertError) {
    console.error("Failed to insert new student:", insertError);
    // Rollback email rename
    await dbAdmin
      .from('etudiants')
      .update({ email: student.email })
      .eq('id', oldId);
    return;
  }
  console.log("New student inserted successfully.");

  // 4. Update inscriptions
  console.log("Updating inscriptions to point to new ID...");
  const { error: insError } = await dbAdmin
    .from('inscriptions')
    .update({ etudiant_id: newClerkId })
    .eq('etudiant_id', oldId);

  if (insError) {
    console.error("Failed to update inscriptions:", insError);
    return;
  }

  // 5. Update payments
  console.log("Updating payments to point to new ID...");
  const { error: payError } = await dbAdmin
    .from('paiements')
    .update({ etudiant_id: newClerkId })
    .eq('etudiant_id', oldId);

  if (payError) {
    console.error("Failed to update payments:", payError);
    return;
  }

  // 6. Update messages (sender and receiver)
  console.log("Updating messages to point to new ID...");
  await dbAdmin
    .from('messages')
    .update({ sender_id: newClerkId })
    .eq('sender_id', oldId);
  
  await dbAdmin
    .from('messages')
    .update({ receiver_id: newClerkId })
    .eq('receiver_id', oldId);

  // 7. Delete old student record
  console.log("Deleting old student record...");
  const { error: deleteError } = await dbAdmin
    .from('etudiants')
    .delete()
    .eq('id', oldId);

  if (deleteError) {
    console.error("Failed to delete old student record:", deleteError);
    return;
  }

  console.log("=== MIGRATION COMPLETED SUCCESSFULLY ===");

  // Verify
  const { data: finalStudent } = await dbAdmin
    .from('etudiants')
    .select('*')
    .eq('id', newClerkId)
    .single();
  console.log("Final Student in DB:", finalStudent);

  const { data: finalInscriptions } = await dbAdmin
    .from('inscriptions')
    .select('*')
    .eq('etudiant_id', newClerkId);
  console.log("Final Inscriptions in DB:", finalInscriptions);

  const { data: finalPayments } = await dbAdmin
    .from('paiements')
    .select('*')
    .eq('etudiant_id', newClerkId);
  console.log("Final Payments in DB:", finalPayments);
}

testMigration();
