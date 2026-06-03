import { supabaseAdmin } from "../src/lib/supabaseAdmin";

async function inspectPayments() {
  console.log("=== INSPECTING PAYMENTS AND INSCRIPTIONS ===");

  // 1. Fetch all inscriptions
  const { data: inscriptions, error: insError } = await supabaseAdmin
    .from('inscriptions')
    .select(`
      id,
      etudiant_id,
      status,
      paid_status,
      created_at,
      etudiants (email, first_name, last_name)
    `);

  if (insError) {
    console.error("Error fetching inscriptions:", insError);
  } else {
    console.log(`Found ${inscriptions?.length || 0} inscriptions:`, JSON.stringify(inscriptions, null, 2));
  }

  // 2. Fetch all payments
  const { data: payments, error: payError } = await supabaseAdmin
    .from('paiements')
    .select(`
      id,
      inscription_id,
      etudiant_id,
      amount,
      status,
      created_at,
      etudiants (email)
    `);

  if (payError) {
    console.error("Error fetching payments:", payError);
  } else {
    console.log(`Found ${payments?.length || 0} payments:`, JSON.stringify(payments, null, 2));
  }

  console.log("=== END INSPECTION ===");
}

inspectPayments();
