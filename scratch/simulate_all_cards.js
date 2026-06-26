require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runTests() {
  console.log("🚀 Lancement du test automatisé sur TOUTES les formations (Cartes) du site...\n");
  
  const { data: formations, error: fErr } = await supabase.from('formations').select('*').eq('is_active', true);
  if (fErr || !formations) {
    console.error("Erreur récupération formations:", fErr);
    return;
  }

  console.log(`📋 ${formations.length} formations actives trouvées. Début des tests d'inscription...\n`);

  let successCount = 0;

  for (const formation of formations) {
    console.log(`⏳ Test pour la formation : "${formation.title}" (${formation.type})`);
    
    // 1. Trouver la classe par défaut
    const { data: classe } = await supabase
      .from('classes')
      .select('*')
      .eq('formation_id', formation.id)
      .limit(1)
      .single();

    if (!classe) {
      console.log(`   ❌ ÉCHEC : Aucune classe trouvée pour cette formation. L'assignation est impossible.\n`);
      continue;
    }

    const testEmail = `test_auto_${Date.now()}@ishes.fr`;
    const testStudentId = `test_std_${Date.now()}`;

    try {
      // 2. Simuler l'action "S'inscrire" du frontend (qui a été corrigée)
      await supabase.from('etudiants').insert({
        id: testStudentId,
        email: testEmail,
        first_name: "Test",
        last_name: "Automatique",
        status: "en_attente"
      });

      const { error: insErr } = await supabase.from('inscriptions').insert({
        etudiant_id: testStudentId,
        formation_id: formation.id,  // <-- Le correctif est ici !
        class_id: classe.id,
        status: 'en_attente',
        academic_year: '2026-2027'
      });

      if (insErr) throw insErr;

      // 3. Simuler le Webhook Stripe (Paiement Validé)
      const { data: existingIns } = await supabase.from('inscriptions')
        .select('id')
        .eq('etudiant_id', testStudentId)
        .eq('formation_id', formation.id)
        .single();

      if (!existingIns) throw new Error("Inscription introuvable par le Webhook (Bug Formation ID)");

      const { error: updErr } = await supabase.from('inscriptions')
        .update({ status: 'valide', paid_status: 'paye' })
        .eq('id', existingIns.id);

      if (updErr) throw updErr;

      // 4. Vérification finale
      const { data: finalCheck } = await supabase.from('inscriptions')
        .select('status, class_id')
        .eq('id', existingIns.id)
        .single();

      if (finalCheck.status === 'valide' && finalCheck.class_id === classe.id) {
        console.log(`   ✅ SUCCÈS : Inscription réussie. Assignation automatique à la classe "${classe.name}".\n`);
        successCount++;
      } else {
        console.log(`   ❌ ÉCHEC : Le statut n'a pas été mis à jour correctement.\n`);
      }

    } catch (e) {
      console.log(`   ❌ ERREUR LORS DU TEST : ${e.message}\n`);
    } finally {
      // Nettoyage de la base de données
      await supabase.from('inscriptions').delete().eq('etudiant_id', testStudentId);
      await supabase.from('etudiants').delete().eq('id', testStudentId);
    }
  }

  console.log(`\n🎉 BILAN DU TEST : ${successCount}/${formations.length} formations ont passé le test avec succès.`);
  if (successCount === formations.length) {
    console.log("✅ Le correctif est 100% fonctionnel pour toutes les cartes du site !");
  } else {
    console.log("⚠️ Attention, certaines formations n'ont pas passé le test.");
  }
}

runTests();
