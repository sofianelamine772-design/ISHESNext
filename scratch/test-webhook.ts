import { supabaseAdmin as dbAdmin } from "../src/lib/supabaseAdmin";

async function simulateWebhook() {
  console.log("=== SIMULATING STRIPE WEBHOOK EVENT ===");
  const testEmail = "test-stripe-success@ishes.fr";
  const testSessionId = `test_session_${Date.now()}`;
  const testSlot = "lundi";
  const testFormationId = "presentiel-global"; // This is present in database according to CATALOGUE insertions in SCHEMA.sql

  console.log(`Step 1: Check if student exists for email ${testEmail}`);
  let etudiantsToValidate: { id: string }[] = [];
  
  const { data: etudiants } = await dbAdmin
    .from('etudiants')
    .select('id')
    .eq('email', testEmail);
  
  if (etudiants && etudiants.length > 0) {
    console.log("Found existing student:", etudiants);
    etudiantsToValidate = etudiants;
  } else {
    console.log("No student found. Simulating insertion of temporary student...");
    const tempId = `temp_test_${Date.now()}`;
    const { data: newEtudiant, error: insertError } = await dbAdmin
      .from('etudiants')
      .insert({
        id: tempId,
        email: testEmail,
        status: 'actif'
      })
      .select('id')
      .single();

    if (newEtudiant) {
      console.log("Successfully created temporary student:", newEtudiant);
      etudiantsToValidate.push(newEtudiant);
    } else {
      console.error("Failed to insert temporary student:", insertError);
      return;
    }
  }

  console.log("Step 2: Simulating inscription and payment logs for all etudiants...");
  for (const etudiant of etudiantsToValidate) {
    let classId = null;

    // Get class for slot
    const { data: classe } = await dbAdmin
      .from('classes')
      .select('id')
      .ilike('day_of_week', testSlot)
      .maybeSingle();

    if (classe) {
      console.log(`Found matching class for slot '${testSlot}':`, classe.id);
      classId = classe.id;
    }

    // Fetch formation UUID by slug
    console.log(`Fetching formation UUID for slug '${testFormationId}'...`);
    const { data: formation } = await dbAdmin
      .from('formations')
      .select('id')
      .eq('slug', testFormationId)
      .maybeSingle();

    if (!formation) {
      console.error(`Formation not found in DB for slug '${testFormationId}'`);
      return;
    }
    const formationUuid = formation.id;
    console.log(`Found formation UUID: ${formationUuid}`);

    // Check if inscription already exists
    console.log("Checking if inscription already exists...");
    const { data: existingIns } = await dbAdmin
      .from('inscriptions')
      .select('id')
      .eq('etudiant_id', etudiant.id)
      .eq('formation_id', formationUuid)
      .maybeSingle();

    let inscriptionId = existingIns?.id;

    if (!inscriptionId) {
      console.log("Inscription does not exist, inserting new...");
      const { data: newIns, error: insError } = await dbAdmin
        .from('inscriptions')
        .insert({
          etudiant_id: etudiant.id,
          formation_id: formationUuid,
          class_id: classId,
          status: 'valide'
        })
        .select('id')
        .single();

      if (insError) {
        console.error("Inscription insert error:", insError);
        return;
      }
      console.log("Successfully inserted inscription:", newIns.id);
      inscriptionId = newIns.id;
    } else {
      console.log("Inscription already exists, updating status to valide:", inscriptionId);
      await dbAdmin
        .from('inscriptions')
        .update({ status: 'valide' })
        .eq('id', inscriptionId);
    }

    // Update status to active
    await dbAdmin
      .from('etudiants')
      .update({ status: 'actif' })
      .eq('id', etudiant.id);

    // Insert payment log
    console.log("Inserting payment log...");
    const { data: payment, error: payError } = await dbAdmin
      .from('paiements')
      .insert({
        inscription_id: inscriptionId,
        etudiant_id: etudiant.id,
        stripe_session_id: testSessionId,
        amount: 150.00,
        currency: 'EUR',
        status: 'succeeded'
      })
      .select('id')
      .single();

    if (payError) {
      console.error("Payment insert error:", payError);
      return;
    }
    console.log("Successfully logged payment:", payment.id);
  }

  console.log("Step 3: Verifying final records in DB...");
  const { data: finalPayment } = await dbAdmin
    .from('paiements')
    .select(`
      id,
      amount,
      status,
      etudiants (email, id)
    `)
    .eq('stripe_session_id', testSessionId)
    .single();

  console.log("Verified Payment log in DB:", finalPayment);
  console.log("=== SIMULATION SUCCESSFUL ===");

  // Cleanup testing records to keep the DB clean
  console.log("Cleaning up test records...");
  for (const etudiant of etudiantsToValidate) {
    await dbAdmin.from('paiements').delete().eq('etudiant_id', etudiant.id);
    await dbAdmin.from('inscriptions').delete().eq('etudiant_id', etudiant.id);
    await dbAdmin.from('etudiants').delete().eq('id', etudiant.id);
  }
  console.log("Cleanup completed.");
}

simulateWebhook();
