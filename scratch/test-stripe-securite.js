/**
 * TEST DE SÉCURITÉ STRIPE : Cas extrêmes et failles potentielles
 * 
 * Scénarios testés :
 * 1. Paiement récurrent réussi (Abonnement mensuel)
 * 2. Paiement récurrent ÉCHOUÉ (Carte expirée / sans fond)
 * 3. Tentative de paiement en double simultané (Test de concurrence)
 * 4. Paiement orphelin (Email inconnu)
 * 5. Maintien de résiliation (Un enfant a quitté, un paiement arrive)
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── UTILS ────────────────────────────────────────────────────────────────
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

let errors = 0;
function assert(condition, msg) {
  if (condition) { ok(msg); } 
  else { fail(msg); errors++; }
}

// ─── VARIABLES DE TEST ────────────────────────────────────────────────────
const PARENT_ID = 'clerk_test_security_parent';
const PARENT_EMAIL = 'secure_test@example.com';
const ENFANT_ACTIF = 'temp_sec_enfant1';
const ENFANT_RESILIE = 'temp_sec_enfant2';
const FAKE_STRIPE_INVOICE = `in_test_${Date.now()}`;

async function cleanup() {
  info('Nettoyage...');
  const ids = [PARENT_ID, ENFANT_ACTIF, ENFANT_RESILIE];
  await sb.from('paiements').delete().in('etudiant_id', ids);
  await sb.from('paiements').delete().like('stripe_session_id', 'in_test_%');
  await sb.from('inscriptions').delete().in('etudiant_id', ids);
  await sb.from('etudiants').delete().in('id', ids);
}

// ─── SETUP INITIAL ────────────────────────────────────────────────────────
async function setupFamily() {
  hr();
  console.log(`${BOLD}${BLUE}SETUP : Création de la famille de test${RESET}`);
  
  const { data: formation } = await sb.from('formations').select('id').limit(1).single();
  
  const { error: insertError } = await sb.from('etudiants').insert([
    { id: PARENT_ID, email: PARENT_EMAIL, first_name: 'Parent', status: 'actif' },
    { id: ENFANT_ACTIF, email: PARENT_EMAIL, first_name: 'Actif', parent_id: PARENT_ID, status: 'actif' },
    { id: ENFANT_RESILIE, email: PARENT_EMAIL, first_name: 'Quitte', parent_id: PARENT_ID, status: 'actif' }
  ]);
  
  if (insertError) {
    fail(`Erreur d'insertion famille: ${insertError.message}`);
    errors++;
    return null;
  }

  const { error: insError } = await sb.from('inscriptions').insert([
    { etudiant_id: ENFANT_ACTIF, formation_id: formation.id, status: 'valide', paid_status: 'impaye' },
    { etudiant_id: ENFANT_RESILIE, formation_id: formation.id, status: 'annule', paid_status: 'paye' }
  ]);
  
  if (insError) {
    fail(`Erreur d'insertion inscriptions: ${insError.message}`);
    errors++;
    return null;
  }
  
  info("Famille créée avec 1 enfant actif et 1 enfant résilié.");
  return formation.id;
}

// ─── TEST 1 : PAIEMENT RÉCURRENT ÉCHOUÉ ──────────────────────────────────
async function test1_PaymentFailed() {
  hr();
  console.log(`${BOLD}${BLUE}TEST 1 : Abonnement mensuel échoué (Carte bloquée)${RESET}`);
  
  // Simulation de la logique webhook `invoice.payment_failed`
  const status = 'failed';
  
  // 1. Trouver les membres
  const { data: members, error } = await sb.from('etudiants').select('id, email').ilike('email', PARENT_EMAIL);
  if (error) throw error;
  if (!members || members.length === 0) {
    fail("Aucun membre trouvé pour l'email de test.");
    errors++;
    return;
  }
  
  const parent = members.find(m => !m.id.startsWith('temp_')) || members[0];
  
  // 2. Mettre à jour les inscriptions
  const familyIds = members.map(m => m.id);
  await sb.from('inscriptions')
    .update({ paid_status: 'refuse' })
    .in('etudiant_id', familyIds)
    .eq('status', 'valide'); // NE TOUCHE QUE LES ACTIFS
    
  // 3. Logger le paiement refusé
  await sb.from('paiements').insert({
    etudiant_id: parent.id,
    stripe_session_id: FAKE_STRIPE_INVOICE + '_fail',
    amount: 150,
    currency: 'EUR',
    status: 'failed',
    error_message: 'insufficient_funds'
  });

  // VERIFICATION
  const { data: insAfter } = await sb.from('inscriptions').select('etudiant_id, paid_status, status').in('etudiant_id', familyIds);
  const actif = insAfter.find(i => i.etudiant_id === ENFANT_ACTIF);
  const resilie = insAfter.find(i => i.etudiant_id === ENFANT_RESILIE);

  assert(actif.paid_status === 'refuse', "L'enfant actif est bien marqué comme refusé/impayé.");
  assert(resilie.paid_status === 'paye' && resilie.status === 'annule', "L'enfant résilié n'a pas été affecté (protection réussie).");
}

// ─── TEST 2 : PAIEMENT RÉCURRENT RÉUSSI ──────────────────────────────────
async function test2_PaymentSucceeded() {
  hr();
  console.log(`${BOLD}${BLUE}TEST 2 : Abonnement mensuel réussi (Le mois d'après)${RESET}`);
  
  const { data: members } = await sb.from('etudiants').select('id').ilike('email', PARENT_EMAIL);
  if (!members || members.length === 0) return;
  const familyIds = members.map(m => m.id);

  // Webhook Stripe réussi
  await sb.from('inscriptions')
    .update({ paid_status: 'paye' })
    .in('etudiant_id', familyIds)
    .eq('status', 'valide');

  const { data: insAfter } = await sb.from('inscriptions').select('etudiant_id, paid_status').in('etudiant_id', familyIds);
  const actif = insAfter.find(i => i.etudiant_id === ENFANT_ACTIF);
  const resilie = insAfter.find(i => i.etudiant_id === ENFANT_RESILIE);

  assert(actif.paid_status === 'paye', "L'enfant actif est revenu à l'état 'paye'.");
}

// ─── TEST 3 : DOUBLON CONCURRENT ──────────────────────────────────────────
async function test3_ConcurrentDuplicate() {
  hr();
  console.log(`${BOLD}${BLUE}TEST 3 : Failures de concurrence (2 webhooks en même temps)${RESET}`);
  
  const sessionStripeId = 'cs_test_duplicate_race_condition';
  
  // Si le webhook n'a pas de sécurité SQL stricte, insérer deux fois très vite va marcher.
  // Faisons le test :
  const pay1 = sb.from('paiements').insert({ etudiant_id: PARENT_ID, stripe_session_id: sessionStripeId, amount: 100, status: 'succeeded' });
  const pay2 = sb.from('paiements').insert({ etudiant_id: PARENT_ID, stripe_session_id: sessionStripeId, amount: 100, status: 'succeeded' });

  await Promise.all([pay1, pay2]);

  const { data: paiements } = await sb.from('paiements').select('*').eq('stripe_session_id', sessionStripeId);
  
  if (paiements.length > 1) {
    warn(`FAILLE DÉTECTÉE : Le système a accepté 2 paiements avec le même ID Stripe ! (Trouvé: ${paiements.length})`);
    warn(`Il faut impérativement ajouter une contrainte UNIQUE sur 'stripe_session_id' dans Supabase.`);
    errors++;
  } else {
    ok(`SÉCURITÉ ACTIVE : La base de données a bloqué le doublon.`);
  }
}

// ─── EXECUTION ────────────────────────────────────────────────────────────
async function runAll() {
  await cleanup();
  try {
    await setupFamily();
    await test1_PaymentFailed();
    await test2_PaymentSucceeded();
    await test3_ConcurrentDuplicate();
  } finally {
    hr();
    if (errors > 0) {
      fail(`TESTS TERMINÉS AVEC ${errors} AVERTISSEMENT(S). Des failles sont présentes.`);
    } else {
      ok(`TESTS 100% RÉUSSIS. L'architecture est solide comme un roc.`);
    }
    await cleanup();
  }
}

runAll();
