import { supabaseAdmin as dbAdmin } from "../src/lib/supabaseAdmin";

async function inspectSync() {
  console.log("=== INSPECTING SYNC STATS ===");

  // 1. Fetch all students
  const { data: etudiants, error: err } = await dbAdmin
    .from('etudiants')
    .select('*')
    .order('created_at', { ascending: false });

  if (err) {
    console.error("Error fetching students:", err);
    return;
  }

  console.log(`Found ${etudiants.length} students in total:`);
  console.table(etudiants.map(e => ({
    id: e.id,
    email: e.email,
    name: `${e.first_name || ''} ${e.last_name || ''}`,
    status: e.status,
    role: e.role
  })));

  // Let's inspect the inscriptions again
  const { data: inscriptions } = await dbAdmin
    .from('inscriptions')
    .select('id, etudiant_id, status, paid_status');
  console.log("Inscriptions in DB:", inscriptions);

  // Let's inspect payments again
  const { data: payments } = await dbAdmin
    .from('paiements')
    .select('id, etudiant_id, stripe_session_id');
  console.log("Payments in DB:", payments);
}

inspectSync();
