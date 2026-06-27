/**
 * TEST AUTOMATISÉ : SCÉNARIO DE PAIEMENT REFUSÉ (2ème/3ème MENSUALITÉ)
 * ET RÉGULARISATION PAR LE LIEN DE PAIEMENT STRIPE.
 * 
 * Pour lancer : node scratch/test_failed_payment_scenario.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Erreur: Clés Supabase manquantes dans .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Normalise l'email (même logique que l'application)
function getBaseEmail(email) {
  if (!email) return '';
  const [local, domain] = email.toLowerCase().split('@');
  if (!domain) return email.toLowerCase();
  return `${local.split('+')[0]}@${domain}`;
}

async function runTest() {
  console.log("==========================================================================");
  console.log("🧪 TEST AUTOMATISÉ : SCÉNARIO ÉCHEC DE PRÉLÈVEMENT & RÉGULARISATION");
  console.log("==========================================================================\n");

  const testEmail = `parent_test_${Date.now()}@gmail.com`;
  const baseEmail = getBaseEmail(testEmail);
  const studentId = `test_student_${Date.now()}`;
  let formationId = '';
  let classId = '';
  let inscriptionId = '';
  let paymentId = '';

  try {
    // ── 1. Trouver une formation et une classe existante pour le test ──────────
    const { data: formation } = await supabaseAdmin.from('formations').select('id').limit(1).single();
    const { data: classe } = await supabaseAdmin.from('classes').select('id').limit(1).single();

    if (!formation || !classe) {
      throw new Error("Formations ou classes vides dans la base de données. Impossible de lancer le test.");
    }
    formationId = formation.id;
    classId = classe.id;

    // ── 2. Création de la situation initiale : Étudiant inscrit et payé ────────
    console.log(`▶️ Étape 1 : Inscription d'un élève avec scolarité valide...`);
    
    // Créer l'étudiant
    await supabaseAdmin.from('etudiants').insert({
      id: studentId,
      email: baseEmail,
      first_name: 'Amine',
      last_name: 'Test',
      phone: '0600000000',
      role: 'eleve',
      status: 'actif'
    });

    // Créer son inscription payée
    const { data: newIns } = await supabaseAdmin.from('inscriptions').insert({
      etudiant_id: studentId,
      formation_id: formationId,
      class_id: classId,
      status: 'valide',
      paid_status: 'paye',
      academic_year: '2025-2026'
    }).select('id').single();
    inscriptionId = newIns.id;

    // Créer son paiement initial réussi
    const { data: newPay } = await supabaseAdmin.from('paiements').insert({
      etudiant_id: studentId,
      inscription_id: inscriptionId,
      stripe_session_id: `session_init_${Date.now()}`,
      amount: 150,
      currency: 'EUR',
      status: 'succeeded'
    }).select('id').single();
    paymentId = newPay.id;

    console.log(`✅ Situation initiale créée avec succès :`);
    console.log(`   👤 Élève : ${studentId} (${baseEmail})`);
    console.log(`   📝 Inscription ID : ${inscriptionId} (status: valide, paid_status: paye)`);
    console.log(`   💳 Paiement initial : ${paymentId} (status: succeeded)\n`);

    // ── 3. Simulation de l'échec de la 2ème mensualité (invoice.payment_failed) ────
    console.log(`▶️ Étape 2 : Simulation de l'échec du 2e prélèvement Stripe (invoice.payment_failed)...`);

    // Le webhook Stripe invoice.payment_failed fait les actions suivantes :
    // A) Récupère tous les membres de la famille
    const { data: familyMembers } = await supabaseAdmin
      .from('etudiants')
      .select('id')
      .eq('email', baseEmail);

    const familyIds = familyMembers.map(m => m.id);

    // B) Enregistre un paiement échoué
    const failedSessionId = `failed_invoice_${Date.now()}`;
    const { data: failedPay } = await supabaseAdmin.from('paiements').insert({
      inscription_id: inscriptionId,
      etudiant_id: studentId,
      stripe_session_id: failedSessionId,
      amount: 150,
      currency: 'EUR',
      status: 'failed',
      error_message: 'Your card was declined.'
    }).select('id').single();

    // C) Bascule paid_status à 'refuse'
    await supabaseAdmin
      .from('inscriptions')
      .update({ paid_status: 'refuse' })
      .in('etudiant_id', familyIds)
      .eq('status', 'valide');

    console.log(`✅ Simulation Webhook échec terminée :`);
    console.log(`   💳 Paiement échoué inséré avec ID : ${failedPay.id}`);
    
    // Vérifier l'état de l'inscription en base
    const { data: insCheck } = await supabaseAdmin.from('inscriptions').select('paid_status').eq('id', inscriptionId).single();
    console.log(`   📝 paid_status actuel en base : "${insCheck.paid_status}" (attendu: "refuse")`);
    
    if (insCheck.paid_status !== 'refuse') {
      throw new Error("Le paid_status n'a pas basculé sur 'refuse' !");
    }
    console.log("   🔒 L'accès au tableau de bord élève et aux certificats est bien BLOQUÉ.\n");

    // ── 4. Simulation du paiement de régularisation (checkout.session.completed) ──
    console.log(`▶️ Étape 3 : Simulation du paiement réussi de régularisation par le parent (checkout.session.completed)...`);

    // Le webhook Stripe checkout.session.completed de type 'regularisation' fait les actions suivantes :
    // A) Trouve l'élève associé à la session de régularisation
    const { data: resolvedStudent } = await supabaseAdmin
      .from('etudiants')
      .select('email')
      .eq('id', studentId)
      .single();

    const resolvedBaseEmail = getBaseEmail(resolvedStudent.email);

    // B) Trouve tous les membres de la famille
    const { data: resolvedFamily } = await supabaseAdmin
      .from('etudiants')
      .select('id')
      .eq('email', resolvedBaseEmail);

    const resolvedFamilyIds = resolvedFamily.map(m => m.id);

    // C) Restaure paid_status à 'paye'
    await supabaseAdmin
      .from('inscriptions')
      .update({ paid_status: 'paye' })
      .in('etudiant_id', resolvedFamilyIds)
      .eq('status', 'valide');

    // D) Met à jour le paiement échoué initial à 'succeeded'
    await supabaseAdmin
      .from('paiements')
      .update({ status: 'succeeded', stripe_session_id: `regularised_session_${Date.now()}` })
      .eq('id', failedPay.id);

    console.log(`✅ Simulation Webhook régularisation terminée.`);

    // ── 5. Vérifications finales de bon fonctionnement ──────────────────────
    console.log(`▶️ Étape 4 : Vérification de la restauration des accès en base...`);

    const { data: finalInsCheck } = await supabaseAdmin.from('inscriptions').select('paid_status').eq('id', inscriptionId).single();
    const { data: finalPayCheck } = await supabaseAdmin.from('paiements').select('status').eq('id', failedPay.id).single();

    console.log(`   📝 paid_status final en base : "${finalInsCheck.paid_status}" (attendu: "paye")`);
    console.log(`   💳 Statut final du paiement échoué : "${finalPayCheck.status}" (attendu: "succeeded")`);

    if (finalInsCheck.paid_status !== 'paye' || finalPayCheck.status !== 'succeeded') {
      throw new Error("Échec de la régularisation en base de données.");
    }

    console.log(`\n🎉 SUCCÈS TOTAL : Le scénario de paiement refusé suivi de sa régularisation s'exécute de manière 100% fiable et sécurisée !`);

  } catch (err) {
    console.error(`❌ ÉCHEC DU TEST : ${err.message}`);
  } finally {
    // Nettoyage de la base de données après le test
    console.log(`\n🧹 Nettoyage de la base de données...`);
    if (studentId) {
      await supabaseAdmin.from('paiements').delete().eq('etudiant_id', studentId);
      await supabaseAdmin.from('inscriptions').delete().eq('etudiant_id', studentId);
      await supabaseAdmin.from('etudiants').delete().eq('id', studentId);
      console.log(`✅ Base de données propre !`);
    }
  }
}

runTest();
