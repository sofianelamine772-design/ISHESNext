require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function getCurrentAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  if (month >= 7) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
}

async function forceActivate() {
  console.log("=========================================");
  console.log("⚡ FORCE ACTIVATION: eliguzelsaid87@outlook.fr");
  console.log("=========================================\n");

  const parentEmail = 'eliguzelsaid87@outlook.fr';
  const parentId = `parent_eliguzel_${Date.now()}`;
  const child1Id = `temp_malik_${Date.now()}`;
  const child2Id = `temp_sujud_${Date.now()}`;
  
  // UUIDs des classes de la précédente inscription
  const class1Id = '5444b9ce-8ca4-43c0-ad4c-d8bbf5d30c2b'; // Classe de Malikko
  const class2Id = '8b09c982-d20d-4ef6-94ff-d56162c190a4'; // Classe de Sujudddo
  const formationId = '00000000-0000-0000-0000-000000000001'; // Scolarité Présentiel
  
  // 1. Créer le profil Parent
  console.log("1. Création du profil parent...");
  const { error: pErr } = await supabase.from('etudiants').insert({
    id: parentId,
    email: parentEmail,
    first_name: 'nadirooo',
    last_name: 'bellifo',
    status: 'actif',
    role: 'eleve'
  });
  if (pErr) {
    console.error("Erreur création parent:", pErr);
    return;
  }
  
  // 2. Créer les enfants
  console.log("2. Création des enfants...");
  const { error: cErr } = await supabase.from('etudiants').insert([
    {
      id: child1Id,
      email: `${parentEmail.split('@')[0]}+child0@${parentEmail.split('@')[1]}`,
      first_name: 'malikko',
      last_name: 'meindai',
      phone: '+33 787887889',
      parent_id: parentId,
      status: 'actif',
      role: 'eleve'
    },
    {
      id: child2Id,
      email: `${parentEmail.split('@')[0]}+child1@${parentEmail.split('@')[1]}`,
      first_name: 'sujudddo',
      last_name: 'meidani',
      phone: '+33 787887889',
      parent_id: parentId,
      status: 'actif',
      role: 'eleve'
    }
  ]);
  if (cErr) {
    console.error("Erreur création enfants:", cErr);
    return;
  }
  
  // 3. Créer les inscriptions payées
  console.log("3. Création des inscriptions...");
  const { error: iErr } = await supabase.from('inscriptions').insert([
    {
      etudiant_id: child1Id,
      formation_id: formationId,
      class_id: class1Id,
      status: 'valide',
      paid_status: 'paye',
      academic_year: getCurrentAcademicYear()
    },
    {
      etudiant_id: child2Id,
      formation_id: formationId,
      class_id: class2Id,
      status: 'valide',
      paid_status: 'paye',
      academic_year: getCurrentAcademicYear()
    }
  ]);
  if (iErr) {
    console.error("Erreur création inscriptions:", iErr);
    return;
  }

  // 4. Créer un paiement
  console.log("4. Création du paiement de test...");
  await supabase.from('paiements').insert({
    etudiant_id: parentId,
    amount: 960,
    status: 'succeeded',
    currency: 'EUR',
    stripe_session_id: `manual_force_${Date.now()}`
  });
  
  console.log("\n🎉 SUCCÈS : Compte parent et enfants activés en base !");
  console.log("Veuillez demander à l'utilisateur de se déconnecter et de se reconnecter.");
}

forceActivate();
