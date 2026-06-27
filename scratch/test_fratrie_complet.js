require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runTest() {
  console.log("=========================================");
  console.log("🧪 DÉBUT DU TEST ULTIME : PAIEMENT FRATRIE");
  console.log("=========================================\n");

  const parentEmail = `test_parent_${Date.now()}@ishes.com`;
  
  // 1. SIMULATION DU FRONTEND (Step 3 : L'utilisateur remplit le formulaire)
  console.log("▶️ ÉTAPE 1 : Création des enfants via le formulaire (Frontend)...");
  
  // On crée deux enfants fantômes (paniers abandonnés dans un premier temps)
  const child1Id = `temp_child1_${Date.now()}`;
  const child2Id = `temp_child2_${Date.now()}`;
  
  // Enfant 1 (Class 36 : Samedi Matin Niveau 1)
  await supabase.from('etudiants').insert({
    id: child1Id,
    email: parentEmail,
    first_name: "Enfant1",
    last_name: "Test",
    parent_first_name: "Parent",
    parent_last_name: "Test",
    status: "en_attente" // Fantôme
  });
  
  // Enfant 2 (Class 37 : Samedi Matin Niveau 2)
  await supabase.from('etudiants').insert({
    id: child2Id,
    email: parentEmail,
    first_name: "Enfant2",
    last_name: "Test",
    parent_first_name: "Parent",
    parent_last_name: "Test",
    status: "en_attente" // Fantôme
  });

  // On crée leurs inscriptions fantômes
  const { data: form } = await supabase.from('formations').select('id').eq('slug', 'presentiel-global').single();
  const { data: classes } = await supabase.from('classes').select('id').eq('formation_id', form.id).limit(2);
  
  const class1 = classes[0];
  const class2 = classes[1] || classes[0]; // Sécurité si 1 seule classe existe

  await supabase.from('inscriptions').insert([
    { etudiant_id: child1Id, formation_id: form.id, class_id: class1.id, status: 'en_attente_daffectation', academic_year: '2024-2025' },
    { etudiant_id: child2Id, formation_id: form.id, class_id: class2.id, status: 'en_attente_daffectation', academic_year: '2024-2025' }
  ]);
  
  console.log(`✅ Enfants créés en base en statut 'fantôme'. (Emails: ${parentEmail})\n`);
  
  // 2. SIMULATION DU WEBHOOK STRIPE (Le parent vient de payer)
  console.log("▶️ ÉTAPE 2 : Le parent vient de payer (Simulation Stripe)...");
  
  // Le webhook cherche les enfants rattachés à cet email par ordre de création
  const { data: students } = await supabase
    .from('etudiants')
    .select('id, email, parent_id')
    .eq('email', parentEmail)
    .order('created_at', { ascending: true });
    
  console.log(`🔍 Webhook a trouvé ${students.length} enfants rattachés à cet email.`);
  
  // Le webhook met à jour les inscriptions
  let successCount = 0;
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    
    // Simule la classe envoyée dans les metadatas de Stripe (classId_0 et classId_1)
    const targetClassId = i === 0 ? class1.id : class2.id;
    
    const { data: existingIns } = await supabase
        .from('inscriptions')
        .select('id')
        .eq('etudiant_id', student.id)
        .eq('formation_id', form.id)
        .single();
        
    if (existingIns) {
       await supabase.from('inscriptions').update({
         class_id: targetClassId,
         status: 'valide', // Validé car payé
         paid_status: 'paye'
       }).eq('id', existingIns.id);
       
       await supabase.from('etudiants').update({ status: 'actif' }).eq('id', student.id);
       successCount++;
    }
  }
  
  console.log(`✅ Webhook a activé et assigné ${successCount} enfants dans leurs classes !\n`);

  // 3. VÉRIFICATION FINALE (Ce que voit l'Admin)
  console.log("▶️ ÉTAPE 3 : Vérification stricte des données...");
  
  const { data: child1Data } = await supabase.from('etudiants').select('status, inscriptions(status, paid_status, class_id)').eq('id', child1Id).single();
  const { data: child2Data } = await supabase.from('etudiants').select('status, inscriptions(status, paid_status, class_id)').eq('id', child2Id).single();
  
  let errors = 0;
  
  if (child1Data.status !== 'actif') { console.error("❌ ERREUR: Enfant 1 n'est pas actif !"); errors++; }
  if (child1Data.inscriptions[0].status !== 'valide') { console.error("❌ ERREUR: Inscription Enfant 1 n'est pas valide !"); errors++; }
  if (child1Data.inscriptions[0].class_id !== class1.id) { console.error("❌ ERREUR: Enfant 1 n'est pas dans la bonne classe !"); errors++; }
  
  if (child2Data.status !== 'actif') { console.error("❌ ERREUR: Enfant 2 n'est pas actif !"); errors++; }
  if (child2Data.inscriptions[0].status !== 'valide') { console.error("❌ ERREUR: Inscription Enfant 2 n'est pas valide !"); errors++; }
  if (child2Data.inscriptions[0].class_id !== class2.id) { console.error("❌ ERREUR: Enfant 2 n'est pas dans la bonne classe !"); errors++; }
  
  if (errors === 0) {
    console.log("🎉 SUCCÈS TOTAL : Les données sont parfaitement liées. Les deux enfants sont dans leurs bonnes classes respectives et sont visibles par l'admin !");
  }
  
  // 4. NETTOYAGE
  await supabase.from('inscriptions').delete().in('etudiant_id', [child1Id, child2Id]);
  await supabase.from('etudiants').delete().in('id', [child1Id, child2Id]);
  
  console.log("\n🧹 Test terminé, données de test effacées.");
}

runTest();
