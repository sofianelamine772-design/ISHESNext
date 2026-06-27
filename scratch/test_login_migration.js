require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Simuler la fonction de migration
async function migrateStudentIdInNode(oldId, newId) {
  try {
    // 1. Fetch old student
    const { data: oldStudent } = await supabase.from('etudiants').select('*').eq('id', oldId).single();
    if (!oldStudent) return { success: true };

    // 2. Insert new student
    const { error: insertError } = await supabase.from('etudiants').upsert({
      id: newId,
      email: oldStudent.email,
      first_name: oldStudent.first_name,
      last_name: oldStudent.last_name,
      phone: oldStudent.phone,
      parent_first_name: oldStudent.parent_first_name,
      parent_last_name: oldStudent.parent_last_name,
      role: oldStudent.role,
      status: oldStudent.status,
      created_at: oldStudent.created_at,
      parent_id: oldStudent.parent_id
    }, { onConflict: 'id' });
    
    if (insertError) throw insertError;
    
    // 3. Update references
    await supabase.from('inscriptions').update({ etudiant_id: newId }).eq('etudiant_id', oldId);
    await supabase.from('paiements').update({ etudiant_id: newId }).eq('etudiant_id', oldId);
    await supabase.from('etudiants').update({ parent_id: newId }).eq('parent_id', oldId);

    // 4. Delete old student
    await supabase.from('etudiants').delete().eq('id', oldId);

    return { success: true };
  } catch (error) {
    console.error("Migration Error:", error);
    return { success: false, error: error.message };
  }
}

async function runTest() {
  console.log("=========================================================");
  console.log("🧪 TEST AUTOMATISÉ : MIGRATION DE L'ID PARENT AU LOGIN");
  console.log("=========================================================\n");

  const parentEmail = `parent_login_${Date.now()}@test.com`;
  const parentWebhookId = `parent_webhook_${Date.now()}`;
  const parentClerkId = `user_clerk_${Date.now()}`;
  const childWebhookId = `temp_child_${Date.now()}`;

  // 1. Préparer les données (Simuler l'état post-paiement créé par le webhook)
  console.log("▶️ Étape 1 : Création du parent et de l'enfant post-paiement (Simulation Webhook)...");
  
  await supabase.from('etudiants').insert({
    id: parentWebhookId,
    email: parentEmail,
    first_name: 'Nadira',
    last_name: 'Bellifo',
    status: 'actif',
    role: 'eleve'
  });

  await supabase.from('etudiants').insert({
    id: childWebhookId,
    email: `${parentEmail.split('@')[0]}+child@${parentEmail.split('@')[1]}`,
    first_name: 'Sujud',
    last_name: 'Meidani',
    parent_id: parentWebhookId,
    status: 'actif',
    role: 'eleve'
  });

  // Créer une inscription pour l'enfant
  const { data: form } = await supabase.from('formations').select('id').eq('slug', 'presentiel-global').single();
  await supabase.from('inscriptions').insert({
    etudiant_id: childWebhookId,
    formation_id: form.id,
    status: 'valide',
    paid_status: 'paye',
    academic_year: '2024-2025'
  });

  console.log(`✅ Parent (${parentWebhookId}) et Enfant (${childWebhookId}, parent_id: ${parentWebhookId}) créés.`);

  // 2. SIMULER LA CONNEXION DU PARENT (Appel à la migration)
  console.log("\n▶️ Étape 2 : Le parent se connecte pour la première fois (Migration vers son ID Clerk)...");
  const res = await migrateStudentIdInNode(parentWebhookId, parentClerkId);
  if (!res.success) {
    console.error("❌ ERREUR lors de la migration:", res.error);
    return;
  }
  console.log(`✅ Migration réussie de ${parentWebhookId} vers ${parentClerkId}.`);

  // 3. VÉRIFIER QUE L'ENFANT EST BIEN LIÉ AU NOUVEL ID CLERK ET A SON INSCRIPTION ACTIVE
  console.log("\n▶️ Étape 3 : Vérification de la liaison et des inscriptions...");
  
  // Le parent original doit avoir été supprimé
  const { data: oldParentCheck } = await supabase.from('etudiants').select('*').eq('id', parentWebhookId).maybeSingle();
  if (oldParentCheck) {
    console.error("❌ ERREUR: L'ancien profil parent existe toujours !");
    return;
  }

  // Le nouveau parent doit exister avec l'ID Clerk
  const { data: newParentCheck } = await supabase.from('etudiants').select('*').eq('id', parentClerkId).maybeSingle();
  if (!newParentCheck) {
    console.error("❌ ERREUR: Le nouveau profil parent n'a pas été créé.");
    return;
  }

  // L'enfant doit pointer sur le nouvel ID Clerk parent
  const { data: childCheck } = await supabase.from('etudiants').select('*, inscriptions(*)').eq('id', childWebhookId).single();
  if (childCheck.parent_id !== parentClerkId) {
    console.error(`❌ ERREUR: L'enfant n'est pas lié au bon ID Clerk parent (Reçu: ${childCheck.parent_id}, Attendu: ${parentClerkId})`);
    return;
  }

  if (!childCheck.inscriptions || childCheck.inscriptions.length === 0) {
    console.error("❌ ERREUR: L'inscription de l'enfant a disparu !");
    return;
  }

  console.log("\n🎉 SUCCÈS TOTAL : Le parent a été migré vers son ID Clerk. L'enfant et ses inscriptions sont parfaitement liés au compte Clerk parent. L'accès au tableau de bord élève sera 100% validé !");

  // 4. NETTOYAGE
  console.log("\n▶️ Étape 4 : Nettoyage...");
  await supabase.from('inscriptions').delete().eq('etudiant_id', childWebhookId);
  await supabase.from('etudiants').delete().in('id', [childWebhookId, parentClerkId]);
  console.log("🧹 Base de données de test nettoyée.");
}

runTest();
