import { supabaseAdmin as dbAdmin } from "../src/lib/supabaseAdmin";

async function simulateRealWebhookRun() {
  console.log("=== SIMULATING REAL STRIPE WEBHOOK EVENT ===");
  const testEmail = "ishestesteclients@outlook.fr";
  const testSessionId = `test_real_session_${Date.now()}`;
  const testSlot = "samedi"; // Let's try samedi slot
  const testFormationId = "presentiel-global"; 

  console.log(`Step 1: Check if student exists for email ${testEmail}`);
  let etudiantsToValidate: { id: string }[] = [];
  
  const { data: etudiants, error: fetchError } = await dbAdmin
    .from('etudiants')
    .select('id')
    .eq('email', testEmail);
  
  if (fetchError) {
    console.error("Error fetching student:", fetchError);
    return;
  }

  if (etudiants && etudiants.length > 0) {
    console.log("Found existing student:", etudiants);
    etudiantsToValidate = etudiants;
  } else {
    console.log(`No student found for ${testEmail}. Creating one...`);
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

  console.log("Step 2: Resolving formation UUID and creating/updating inscriptions and payments...");
  
  // Resolve formation UUID
  let formationUuid = null;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(testFormationId);
  if (isUuid) {
    formationUuid = testFormationId;
  } else {
    const { data: formation } = await dbAdmin
      .from('formations')
      .select('id')
      .eq('slug', testFormationId)
      .maybeSingle();
    if (formation) {
      formationUuid = formation.id;
    }
  }

  if (!formationUuid) {
    console.error(`Formation not found in DB for slug/id '${testFormationId}'`);
    return;
  }
  console.log(`Resolved formation UUID: ${formationUuid}`);

  for (const etudiant of etudiantsToValidate) {
    let classId = null;

    // Get class for slot if specified
    if (testSlot) {
      const { data: classe } = await dbAdmin
        .from('classes')
        .select('id')
        .ilike('day_of_week', testSlot)
        .maybeSingle();

      if (classe) {
        console.log(`Found matching class for slot '${testSlot}':`, classe.id);
        classId = classe.id;
      }
    }

    let inscriptionId = null;

    // Check if inscription already exists
    console.log("Checking if inscription already exists...");
    const { data: existingIns } = await dbAdmin
      .from('inscriptions')
      .select('id')
      .eq('etudiant_id', etudiant.id)
      .eq('formation_id', formationUuid)
      .maybeSingle();

    if (existingIns) {
      inscriptionId = existingIns.id;
      console.log("Inscription already exists, updating status to valide and paid_status to paye:", inscriptionId);
      const { error: updateError } = await dbAdmin
        .from('inscriptions')
        .update({ 
          class_id: classId || undefined,
          status: 'valide',
          paid_status: 'paye'
        })
        .eq('id', inscriptionId);
      if (updateError) {
        console.error("Failed to update inscription:", updateError);
        return;
      }
    } else {
      console.log("Inscription does not exist, inserting new...");
      const { data: newIns, error: insError } = await dbAdmin
        .from('inscriptions')
        .insert({
          etudiant_id: etudiant.id,
          formation_id: formationUuid,
          class_id: classId,
          status: 'valide',
          paid_status: 'paye'
        })
        .select('id')
        .single();

      if (insError) {
        console.error("Inscription insert error:", insError);
        return;
      }
      console.log("Successfully inserted inscription:", newIns.id);
      inscriptionId = newIns.id;
    }

    // Update student status to active
    console.log("Updating student status to active...");
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

  console.log("=== SIMULATION AND DATABASE WRITES SUCCESSFUL ===");
}

simulateRealWebhookRun();
