require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function createTestStudent() {
  const studentId = `test_impaye_${Date.now()}`;
  
  console.log("1. Creating student...");
  const { data: etudiant, error: eErr } = await supabase.from('etudiants').insert({
    id: studentId,
    email: 'test.impaye@example.com',
    first_name: 'Test',
    last_name: 'Impayé',
    phone: '0600000000',
    status: 'actif'
  }).select().single();
  if (eErr) throw eErr;

  console.log("2. Fetching formation...");
  const { data: formation } = await supabase.from('formations').select('id, title').limit(1).single();

  console.log("3. Creating inscription...");
  const { data: inscription, error: iErr } = await supabase.from('inscriptions').insert({
    etudiant_id: studentId,
    formation_id: formation.id,
    status: 'valide',
    paid_status: 'impaye' // ou partiel
  }).select().single();
  if (iErr) throw iErr;

  console.log("4. Creating payments...");
  
  // Mois 1 - Succès (il y a 2 mois)
  let date1 = new Date();
  date1.setMonth(date1.getMonth() - 2);
  
  // Mois 2 - Succès (il y a 1 mois)
  let date2 = new Date();
  date2.setMonth(date2.getMonth() - 1);
  
  // Mois 3 - Échec (aujourd'hui)
  let date3 = new Date();

  const { error: pErr } = await supabase.from('paiements').insert([
    {
      etudiant_id: studentId,
      inscription_id: inscription.id,
      stripe_session_id: `sub_test_1_${Date.now()}`,
      amount: 50,
      currency: 'EUR',
      status: 'succeeded',
      created_at: date1.toISOString()
    },
    {
      etudiant_id: studentId,
      inscription_id: inscription.id,
      stripe_session_id: `sub_test_2_${Date.now()}`,
      amount: 50,
      currency: 'EUR',
      status: 'succeeded',
      created_at: date2.toISOString()
    },
    {
      etudiant_id: studentId,
      inscription_id: inscription.id,
      stripe_session_id: `sub_test_3_${Date.now()}`,
      amount: 50,
      currency: 'EUR',
      status: 'failed',
      error_message: 'Fonds insuffisants / Carte refusée',
      created_at: date3.toISOString()
    }
  ]);
  
  if (pErr) throw pErr;

  console.log("Done! Student ID:", studentId);
}

createTestStudent().catch(console.error);
