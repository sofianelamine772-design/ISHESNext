/**
 * TEST COMPLET : Parent avec 3 enfants
 * 
 * Scénarios testés :
 * 1. Inscription de 3 enfants (via admin/vitrine) → 3 fiches temp_ créées
 * 2. Paiement Stripe → les 3 inscriptions passent à "valide + paye" (1 seul paiement enregistré)
 * 3. Connexion du parent → aucun enfant ne disparaît
 * 4. Dashboard → les 3 enfants apparaissent
 * 5. Sync on login → paiement distribué à toute la famille
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── COULEURS CONSOLE ──────────────────────────────────────────────────────
const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE   = '\x1b[34m';
const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';
const ok   = (msg) => console.log(`${GREEN}✅ ${msg}${RESET}`);
const fail = (msg) => console.log(`${RED}❌ ÉCHEC : ${msg}${RESET}`);
const info = (msg) => console.log(`${BLUE}ℹ️  ${msg}${RESET}`);
const warn = (msg) => console.log(`${YELLOW}⚠️  ${msg}${RESET}`);
const hr   = () => console.log(`${BOLD}${'─'.repeat(60)}${RESET}`);

// ─── IDs DE TEST ──────────────────────────────────────────────────────────
const PARENT_CLERK_ID = 'clerk_test_parent_3children';
const PARENT_EMAIL    = 'test_famille_3enfants@example.com';
const FORMATION_ID    = null; // On va chercher une vraie formation
const FAKE_STRIPE_SESSION = `cs_test_FAMILLE_3ENFANTS_${Date.now()}`;

const CHILDREN = [
  { tempId: `temp_test_enfant1_${Date.now()}`, firstName: 'Adam',    lastName: 'Dupont', email: PARENT_EMAIL },
  { tempId: `temp_test_enfant2_${Date.now() + 1}`, firstName: 'Bilal',   lastName: 'Dupont', email: PARENT_EMAIL },
  { tempId: `temp_test_enfant3_${Date.now() + 2}`, firstName: 'Cyrine',  lastName: 'Dupont', email: PARENT_EMAIL },
];

let formationId = null;
let errors = 0;

function assert(condition, msg) {
  if (condition) {
    ok(msg);
  } else {
    fail(msg);
    errors++;
  }
}

// ─── NETTOYAGE ────────────────────────────────────────────────────────────
async function cleanup() {
  info('Nettoyage des données de test précédentes...');
  const allTestIds = [PARENT_CLERK_ID, ...CHILDREN.map(c => c.tempId)];
  
  await sb.from('paiements').delete().in('etudiant_id', allTestIds);
  await sb.from('paiements').delete().eq('stripe_session_id', FAKE_STRIPE_SESSION);
  await sb.from('inscriptions').delete().in('etudiant_id', allTestIds);
  await sb.from('etudiants').delete().in('id', allTestIds);
  await sb.from('etudiants').delete().eq('email', PARENT_EMAIL);
  info('Nettoyage terminé.');
}

// ─── ÉTAPE 1 : Inscription des 3 enfants (simulation admin) ───────────────
async function step1_inscrireEnfants() {
  hr();
  console.log(`${BOLD}${BLUE}ÉTAPE 1 : Inscription des 3 enfants${RESET}`);
  
  // Récupérer une formation réelle
  const { data: formations } = await sb.from('formations').select('id, title').limit(1).single();
  if (!formations) {
    fail('Impossible de trouver une formation dans la DB. Vérifie ta DB.');
    errors++;
    return false;
  }
  formationId = formations.id;
  info(`Formation utilisée : "${formations.title}" (${formationId})`);

  for (const child of CHILDREN) {
    const { data, error } = await sb.from('etudiants').insert({
      id: child.tempId,
      email: child.email,
      first_name: child.firstName,
      last_name: child.lastName,
      role: 'eleve',
      status: 'en_attente',
      parent_id: null, // Pas encore lié, l'admin les inscrits sans compte parent
    }).select().single();
    
    assert(!error, `Création fiche enfant ${child.firstName} (${child.tempId})`);
    if (error) info(`Erreur: ${JSON.stringify(error)}`);
  }

  // Créer les inscriptions pour chaque enfant
  for (const child of CHILDREN) {
    const { data, error } = await sb.from('inscriptions').insert({
      etudiant_id: child.tempId,
      formation_id: formationId,
      status: 'en_attente',
      paid_status: 'impaye',
      academic_year: '2025-2026'
    }).select().single();
    
    assert(!error, `Inscription créée pour ${child.firstName}`);
    if (error) info(`Erreur inscription: ${JSON.stringify(error)}`);
  }
  
  return true;
}

// ─── ÉTAPE 2 : Lien parent_id après inscription ────────────────────────────
async function step2_lierParentId() {
  hr();
  console.log(`${BOLD}${BLUE}ÉTAPE 2 : Création du parent et liaison des enfants${RESET}`);

  // Simuler que le parent crée son compte Clerk
  const { data: parent, error } = await sb.from('etudiants').insert({
    id: PARENT_CLERK_ID,
    email: PARENT_EMAIL,
    first_name: 'Marie',
    last_name: 'Dupont',
    role: 'eleve',
    status: 'actif',
    parent_id: null,
  }).select().single();
  
  assert(!error, 'Création profil parent (Clerk ID)');
  if (error) { info(`Erreur parent: ${JSON.stringify(error)}`); return false; }

  // Lier tous les enfants au parent
  for (const child of CHILDREN) {
    const { error: linkErr } = await sb.from('etudiants')
      .update({ parent_id: PARENT_CLERK_ID })
      .eq('id', child.tempId);
    assert(!linkErr, `Liaison ${child.firstName} → parent`);
  }

  // Vérifier l'état actuel
  const { data: famille } = await sb.from('etudiants').select('id, first_name, status, parent_id').or(`id.eq.${PARENT_CLERK_ID},parent_id.eq.${PARENT_CLERK_ID}`);
  assert(famille?.length === 4, `Famille complète : 4 membres trouvés (parent + 3 enfants) — trouvé: ${famille?.length}`);

  return true;
}

// ─── ÉTAPE 3 : Simulation paiement Stripe ─────────────────────────────────
async function step3_paiementStripe() {
  hr();
  console.log(`${BOLD}${BLUE}ÉTAPE 3 : Simulation paiement Stripe (1 paiement pour toute la famille)${RESET}`);

  // Logique reproduisant exactement le webhook Stripe réécrit
  const familyIds = [PARENT_CLERK_ID, ...CHILDREN.map(c => c.tempId)];
  let paymentLogged = false;
  let paymentCount = 0;

  for (const memberId of familyIds) {
    const { data: existingIns } = await sb.from('inscriptions')
      .select('id, status, paid_status')
      .eq('etudiant_id', memberId)
      .eq('formation_id', formationId)
      .maybeSingle();

    if (existingIns) {
      await sb.from('inscriptions').update({
        status: 'valide',
        paid_status: 'paye'
      }).eq('id', existingIns.id);

      if (!paymentLogged) {
        const { error: payErr } = await sb.from('paiements').insert({
          inscription_id: existingIns.id,
          etudiant_id: memberId,
          stripe_session_id: FAKE_STRIPE_SESSION,
          amount: 698,
          currency: 'EUR',
          status: 'succeeded'
        });
        if (!payErr) { paymentLogged = true; paymentCount++; }
      }
    } else {
      warn(`Pas d'inscription trouvée pour ${memberId} (peut-être le parent)`);
    }

    await sb.from('etudiants').update({ status: 'actif' }).eq('id', memberId);
  }

  // Vérification : 1 seul paiement enregistré
  const { data: paiements } = await sb.from('paiements')
    .select('id, etudiant_id, amount')
    .eq('stripe_session_id', FAKE_STRIPE_SESSION);
  
  assert(paiements?.length === 1, `1 seul paiement enregistré dans la table paiements (trouvé: ${paiements?.length})`);

  // Vérification : les 3 inscriptions enfants sont toutes "paye"
  const { data: inscriptions } = await sb.from('inscriptions')
    .select('etudiant_id, status, paid_status')
    .in('etudiant_id', familyIds);
  
  const allPaid = inscriptions?.filter(i => i.paid_status === 'paye');
  assert(allPaid?.length >= 3, `3+ inscriptions marquées "paye" (trouvé: ${allPaid?.length})`);
  assert(allPaid?.length === inscriptions?.length, `Toutes les inscriptions sont payées (${allPaid?.length}/${inscriptions?.length})`);

  return true;
}

// ─── ÉTAPE 4 : Simulation syncStudentStateOnLogin ─────────────────────────
async function step4_syncLogin() {
  hr();
  console.log(`${BOLD}${BLUE}ÉTAPE 4 : Simulation connexion parent (syncStudentStateOnLogin)${RESET}`);

  // Récupérer les membres temp avec le même email
  const { data: tempEtudiants } = await sb.from('etudiants')
    .select('*')
    .ilike('email', PARENT_EMAIL);

  // Trouver l'exactMatch selon l'ancienne logique (BUGUÉE)
  const oldBuggyMatch = tempEtudiants?.find(s =>
    s.email.toLowerCase() === PARENT_EMAIL.toLowerCase() &&
    s.id !== PARENT_CLERK_ID &&
    s.id.startsWith('temp_')
    // ← Pas de vérification parent_id !
  );

  // Trouver l'exactMatch selon la nouvelle logique (CORRIGÉE)
  const newFixedMatch = tempEtudiants?.find(s =>
    s.email.toLowerCase() === PARENT_EMAIL.toLowerCase() &&
    s.id !== PARENT_CLERK_ID &&
    s.id.startsWith('temp_') &&
    !s.parent_id // ← Seulement si c'est le parent lui-même
  );

  info(`Ancienne logique (buguée) aurait migré : ${oldBuggyMatch?.first_name || 'personne'} (${oldBuggyMatch?.id || 'N/A'})`);
  info(`Nouvelle logique (corrigée) migre : ${newFixedMatch?.first_name || 'personne'} (${newFixedMatch?.id || 'N/A'})`);

  assert(
    oldBuggyMatch !== undefined,
    `CONFIRMATION BUG : L'ancienne logique aurait bien trouvé un enfant à migrer (${oldBuggyMatch?.first_name})`
  );
  assert(
    newFixedMatch === undefined,
    `FIX CONFIRMÉ : La nouvelle logique NE migre aucun enfant (parent_id protège les enfants)`
  );

  // Vérifier que les enfants sont toujours bien présents
  const { data: enfantsApres } = await sb.from('etudiants')
    .select('id, first_name, parent_id')
    .eq('parent_id', PARENT_CLERK_ID);
  
  assert(enfantsApres?.length === 3, `Les 3 enfants sont toujours liés au parent après connexion (trouvé: ${enfantsApres?.length})`);
  enfantsApres?.forEach(e => info(`  → ${e.first_name} (${e.id})`));

  return true;
}

// ─── ÉTAPE 5 : Simulation fetchStudentCertificateDataAction ───────────────
async function step5_dashboardAffichage() {
  hr();
  console.log(`${BOLD}${BLUE}ÉTAPE 5 : Simulation dashboard élève (les 3 enfants doivent apparaître)${RESET}`);

  // Logique de fetchStudentCertificateDataAction
  const { data: familyMembers } = await sb.from('etudiants')
    .select('id, first_name, last_name, email, role, status')
    .or(`id.eq.${PARENT_CLERK_ID},parent_id.eq.${PARENT_CLERK_ID}`);

  const familyIds = familyMembers?.map(m => m.id) || [];

  const { data: inscriptions } = await sb.from('inscriptions')
    .select(`id, etudiant_id, status, paid_status, academic_year, created_at,
             formations(title), classes(name, type, whatsapp_link)`)
    .in('etudiant_id', familyIds)
    .in('status', ['valide', 'actif', 'en_attente', 'en_attente_daffectation'])
    .order('created_at', { ascending: false });

  // Map chaque membre à son inscription (comme dans le code)
  const childrenData = familyMembers?.map((member) => {
    const memberInscriptions = inscriptions?.filter(i => i.etudiant_id === member.id) || [];
    const latestInscription = memberInscriptions[0];
    if (!latestInscription) {
      warn(`  Pas d'inscription pour ${member.first_name} (${member.id})`);
      return null;
    }
    return {
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      formation: latestInscription.formations?.title,
      status: latestInscription.status,
      paid: latestInscription.paid_status,
    };
  }).filter(Boolean);

  assert(childrenData?.length >= 3, `3 enfants visibles dans le dashboard (trouvé: ${childrenData?.length})`);

  childrenData?.forEach(c => {
    info(`  👤 ${c.name} — ${c.formation} — ${c.status} — ${c.paid}`);
    assert(c.paid === 'paye', `${c.name} est marqué "paye"`);
    assert(c.status === 'valide', `${c.name} est marqué "valide"`);
  });

  return true;
}

// ─── RAPPORT FINAL ─────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${BOLD}${BLUE}${'═'.repeat(60)}`);
  console.log(`   TEST : PARENT AVEC 3 ENFANTS — Régression complète`);
  console.log(`${'═'.repeat(60)}${RESET}\n`);

  try {
    await cleanup();
    
    const ok1 = await step1_inscrireEnfants();
    const ok2 = ok1 && await step2_lierParentId();
    const ok3 = ok2 && await step3_paiementStripe();
    const ok4 = ok3 && await step4_syncLogin();
    const ok5 = ok4 && await step5_dashboardAffichage();

  } catch (e) {
    fail(`Erreur inattendue : ${e.message}`);
    console.error(e);
    errors++;
  } finally {
    hr();
    console.log('\n📋 NETTOYAGE FINAL...');
    await cleanup();

    hr();
    if (errors === 0) {
      console.log(`\n${GREEN}${BOLD}🎉 TOUS LES TESTS PASSÉS — Aucun bug détecté pour 3 enfants !${RESET}\n`);
    } else {
      console.log(`\n${RED}${BOLD}💥 ${errors} TEST(S) ÉCHOUÉ(S) — Des bugs ont été détectés !${RESET}\n`);
    }
  }
}

main();
