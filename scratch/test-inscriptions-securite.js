/**
 * TEST DE SÉCURITÉ INSCRIPTIONS : Failles et doublons
 * 
 * Scénarios testés :
 * 1. Création d'une inscription standard
 * 2. Attaque de Concurrence : Tentative de créer 2 fois l'inscription (Double clic / Double Webhook)
 * 3. Tentative d'inscription à une formation inexistante
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
const TEST_USER = 'test_sec_inscription_user';
const TEST_EMAIL = 'sec_inscrip@example.com';
let FORMATION_ID = null;

async function cleanup() {
  info('Nettoyage...');
  await sb.from('inscriptions').delete().eq('etudiant_id', TEST_USER);
  await sb.from('etudiants').delete().eq('id', TEST_USER);
}

// ─── SETUP INITIAL ────────────────────────────────────────────────────────
async function setup() {
  hr();
  console.log(`${BOLD}${BLUE}SETUP : Création de l'étudiant de test${RESET}`);
  
  const { data: formation } = await sb.from('formations').select('id').limit(1).single();
  FORMATION_ID = formation.id;

  const { error } = await sb.from('etudiants').insert([
    { id: TEST_USER, email: TEST_EMAIL, first_name: 'Test', status: 'actif' }
  ]);
  
  if (error) {
    fail(`Erreur d'insertion étudiant: ${error.message}`);
    errors++;
  } else {
    info("Étudiant de test créé.");
  }
}

// ─── TEST 1 : INSCRIPTION STANDARD ───────────────────────────────────────
async function test1_StandardInscription() {
  hr();
  console.log(`${BOLD}${BLUE}TEST 1 : Création d'une inscription valide${RESET}`);
  
  const { error } = await sb.from('inscriptions').insert({
    etudiant_id: TEST_USER,
    formation_id: FORMATION_ID,
    status: 'en_attente',
    paid_status: 'impaye'
  });

  assert(!error, "L'inscription initiale a réussi sans erreur.");
}

// ─── TEST 2 : DOUBLON CONCURRENT (RACE CONDITION) ────────────────────────
async function test2_ConcurrentDuplicate() {
  hr();
  console.log(`${BOLD}${BLUE}TEST 2 : Tentative de doublon (Double Clic / Bug Webhook)${RESET}`);
  
  // L'étudiant est déjà inscrit via le Test 1.
  // Tentons de l'inscrire UNE DEUXIÈME FOIS à la MÊME FORMATION en même temps.
  const ins1 = sb.from('inscriptions').insert({ etudiant_id: TEST_USER, formation_id: FORMATION_ID, status: 'en_attente', paid_status: 'impaye' });
  const ins2 = sb.from('inscriptions').insert({ etudiant_id: TEST_USER, formation_id: FORMATION_ID, status: 'en_attente', paid_status: 'impaye' });

  await Promise.all([ins1, ins2]);

  const { data: allIns } = await sb.from('inscriptions').select('id').eq('etudiant_id', TEST_USER).eq('formation_id', FORMATION_ID);
  
  if (allIns.length > 1) {
    warn(`FAILLE DÉTECTÉE : Le système permet à un élève de s'inscrire ${allIns.length} fois à la même formation !`);
    warn(`Il faut ajouter une contrainte UNIQUE sur (etudiant_id, formation_id) dans la table inscriptions.`);
    errors++;
  } else {
    ok(`SÉCURITÉ ACTIVE : La base de données a bloqué le doublon.`);
  }
}

// ─── TEST 3 : FORMATION INEXISTANTE (HACKING) ────────────────────────────
async function test3_InvalidFormation() {
  hr();
  console.log(`${BOLD}${BLUE}TEST 3 : Tentative d'inscription avec un UUID bidon${RESET}`);
  
  const fakeUUID = '11111111-2222-3333-4444-555555555555';
  
  const { error } = await sb.from('inscriptions').insert({
    etudiant_id: TEST_USER,
    formation_id: fakeUUID,
    status: 'en_attente',
    paid_status: 'impaye'
  });

  assert(error !== null, "La base de données a bien REJETÉ l'inscription à une formation inexistante (Clé Étrangère).");
}

// ─── EXECUTION ────────────────────────────────────────────────────────────
async function runAll() {
  await cleanup();
  try {
    await setup();
    if (errors === 0) {
      await test1_StandardInscription();
      await test2_ConcurrentDuplicate();
      await test3_InvalidFormation();
    }
  } finally {
    hr();
    if (errors > 0) {
      fail(`TESTS TERMINÉS AVEC ${errors} AVERTISSEMENT(S). Des failles sont présentes.`);
    } else {
      ok(`TESTS 100% RÉUSSIS. Les inscriptions sont ultra-solides.`);
    }
    await cleanup();
  }
}

runAll();
