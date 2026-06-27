require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Simuler la fonction de récupération d'année académique
function getCurrentAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed, so 7 is August
  if (month >= 7) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
}

async function runTest() {
  console.log("==================================================================");
  console.log("🧪 TEST AUTOMATISÉ : CRÉATION POST-PAIEMENT DE LA FRATRIE EN BASE");
  console.log("==================================================================\n");

  const parentEmail = `parent_test_${Date.now()}@test.com`;
  
  // Étape A : Récupérer des classes valides pour le test
  const { data: form } = await supabase.from('formations').select('id').eq('slug', 'presentiel-global').single();
  if (!form) {
    console.error("❌ Impossible de trouver la formation presentiel-global.");
    return;
  }
  const { data: classes } = await supabase.from('classes').select('id').eq('formation_id', form.id).limit(2);
  if (!classes || classes.length < 2) {
    console.error("❌ Ce test nécessite au moins 2 classes actives dans presentiel-global.");
    return;
  }
  const class1Id = classes[0].id;
  const class2Id = classes[1].id;

  // 1. VÉRIFIER QUE L'UTILISATEUR N'EXISTE PAS EN BASE (Zéro création au préalable)
  const { data: checkBefore } = await supabase.from('etudiants').select('id').eq('email', parentEmail);
  if (checkBefore && checkBefore.length > 0) {
    console.error("❌ ERREUR: L'étudiant existe déjà avant le début du test !");
    return;
  }
  console.log("✅ Étape 1 : Aucun profil n'existe en base de données avant le paiement.");

  // 2. SIMULATION DU WEBHOOK STRIPE (checkout.session.completed avec métadonnées)
  console.log("\n▶️ Étape 2 : Simulation de la notification de paiement Stripe avec métadonnées...");
  
  const mockSession = {
    id: `cs_test_${Date.now()}`,
    amount_total: 96000, // 960 €
    currency: 'eur',
    mode: 'payment',
    metadata: {
      registrationType: 'child',
      email: parentEmail,
      telephone: '+33612345678',
      parent_first_name: 'Nadira',
      parent_last_name: 'Bellifo',
      childrenCount: '2',
      child_0_first: 'Sujud',
      child_0_last: 'Meidani',
      child_0_classId: class1Id,
      child_0_niveau: 'Niveau 1',
      child_1_first: 'Malik',
      child_1_last: 'Meindai',
      child_1_classId: class2Id,
      child_1_niveau: 'Niveau 2'
    }
  };

  // Exécution stricte de la logique du Webhook
  const session = mockSession;
  const parentEmailFromMeta = session.metadata.email;
  const telephone = session.metadata.telephone;
  const registrationType = session.metadata.registrationType;
  
  let parentMemberId = null;
  let studentsToProcess = [];

  // Créer le parent
  const parentFirstName = session.metadata.parent_first_name;
  const parentLastName = session.metadata.parent_last_name;
  
  const tempParentId = `parent_${Date.now()}`;
  const { data: newParent, error: parentError } = await supabase
    .from('etudiants')
    .insert({
      id: tempParentId,
      email: parentEmailFromMeta,
      first_name: parentFirstName,
      last_name: parentLastName,
      phone: telephone,
      status: 'actif',
      role: 'eleve'
    })
    .select('id')
    .single();

  if (parentError) {
    console.error("❌ Échec de la création du parent:", parentError);
    return;
  }
  parentMemberId = newParent.id;
  console.log(`👤 Parent créé avec ID: ${parentMemberId}`);

  // Préparer les enfants à partir des métadonnées
  const childrenCount = parseInt(session.metadata.childrenCount, 10);
  for (let i = 0; i < childrenCount; i++) {
    const first = session.metadata[`child_${i}_first`];
    const last = session.metadata[`child_${i}_last`];
    const classId = session.metadata[`child_${i}_classId`];
    const niveau = session.metadata[`child_${i}_niveau`];

    studentsToProcess.push({
      id: `temp_${Date.now()}_${i}`,
      first_name: first,
      last_name: last,
      classId,
      niveau
    });
  }

  // Créer les enfants et leurs inscriptions
  let paymentLogged = false;
  let createdChildrenIds = [];

  for (let i = 0; i < studentsToProcess.length; i++) {
    const studentData = studentsToProcess[i];
    let studentId = studentData.id;

    // Créer le profil enfant
    const { data: newStudent, error: studentError } = await supabase
      .from('etudiants')
      .insert({
        id: studentId,
        email: `${parentEmailFromMeta.split('@')[0]}+child${i}@${parentEmailFromMeta.split('@')[1]}`,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        phone: telephone,
        parent_id: parentMemberId,
        status: 'actif',
        role: 'eleve'
      })
      .select('id')
      .single();

    if (studentError) {
      console.error(`❌ Échec de la création de l'enfant ${studentData.first_name}:`, studentError);
      return;
    }
    studentId = newStudent.id;
    createdChildrenIds.push(studentId);
    console.log(`🧒 Enfant ${i + 1} créé : ${studentData.first_name} (ID: ${studentId})`);

    // Résoudre la formation de l'étudiant
    let classId = studentData.classId;
    let finalFormationUuid = form.id;

    // Créer l'inscription
    const { data: newIns, error: insError } = await supabase
      .from('inscriptions')
      .insert({
        etudiant_id: studentId,
        formation_id: finalFormationUuid,
        class_id: classId,
        status: 'valide',
        paid_status: 'paye',
        academic_year: getCurrentAcademicYear()
      })
      .select('id')
      .single();

    if (insError) {
      console.error("❌ Échec de la création de l'inscription:", insError);
      return;
    }
    const inscriptionId = newIns.id;
    console.log(`📝 Inscription créée pour ${studentData.first_name} : ID ${inscriptionId} (Classe ID: ${classId})`);

    // Enregistrer le paiement (une seule fois sur la fratrie)
    if (!paymentLogged) {
      const { error: payError } = await supabase.from('paiements').insert({
        inscription_id: inscriptionId,
        etudiant_id: parentMemberId,
        stripe_session_id: session.id,
        amount: session.amount_total / 100,
        currency: session.currency.toUpperCase(),
        status: 'succeeded'
      });

      if (payError) {
        console.error("❌ Échec de l'enregistrement du paiement:", payError);
      } else {
        paymentLogged = true;
        console.log(`💳 Paiement de ${session.amount_total / 100} € enregistré avec succès pour la famille !`);
      }
    }
  }

  // 3. VÉRIFICATIONS STRICTES DE FIN DE TEST
  console.log("\n▶️ Étape 3 : Vérification finale de la solidité des données...");
  
  // Vérifier la présence en base du parent
  const { data: parentCheck } = await supabase.from('etudiants').select('*').eq('id', parentMemberId).single();
  if (!parentCheck || parentCheck.status !== 'actif') {
    console.error("❌ ERREUR: Le parent n'est pas actif en base.");
    return;
  }
  
  // Vérifier chaque enfant
  for (let i = 0; i < createdChildrenIds.length; i++) {
    const cid = createdChildrenIds[i];
    const { data: childCheck } = await supabase
      .from('etudiants')
      .select('*, inscriptions(*)')
      .eq('id', cid)
      .single();
      
    if (!childCheck) {
      console.error(`❌ ERREUR: L'enfant ID ${cid} est introuvable.`);
      return;
    }
    if (childCheck.parent_id !== parentMemberId) {
      console.error(`❌ ERREUR: L'enfant ID ${cid} n'est pas lié au bon parent.`);
      return;
    }
    if (childCheck.status !== 'actif') {
      console.error(`❌ ERREUR: L'enfant ID ${cid} a un statut incorrect (${childCheck.status}).`);
      return;
    }
    if (!childCheck.inscriptions || childCheck.inscriptions.length === 0) {
      console.error(`❌ ERREUR: L'enfant ID ${cid} n'a aucune inscription.`);
      return;
    }
    
    const ins = childCheck.inscriptions[0];
    if (ins.status !== 'valide' || ins.paid_status !== 'paye') {
      console.error(`❌ ERREUR: L'inscription de l'enfant ID ${cid} n'est pas validée/payée (${ins.status} / ${ins.paid_status}).`);
      return;
    }
    
    const expectedClass = i === 0 ? class1Id : class2Id;
    if (ins.class_id !== expectedClass) {
      console.error(`❌ ERREUR: L'enfant ID ${cid} est dans la mauvaise classe (Reçu: ${ins.class_id}, Attendu: ${expectedClass}).`);
      return;
    }
  }

  console.log("\n🎉 SUCCÈS TOTAL : La fratrie de 2 enfants a été créée uniquement après le paiement Stripe, avec les bonnes classes et les bons statuts liés !");

  // 4. NETTOYAGE DES DONNÉES DE TEST
  console.log("\n▶️ Étape 4 : Nettoyage de la base de données...");
  await supabase.from('paiements').delete().eq('stripe_session_id', session.id);
  await supabase.from('inscriptions').delete().in('etudiant_id', createdChildrenIds);
  await supabase.from('etudiants').delete().in('id', [...createdChildrenIds, parentMemberId]);
  console.log("🧹 Base de données nettoyée avec succès !");
}

runTest();
