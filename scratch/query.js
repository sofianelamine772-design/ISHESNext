const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function main() {
  console.log("Fetching payments...");
  const { data: paiements, error } = await supabase
    .from('paiements')
    .select('*');

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log(`Found ${paiements.length} payments:`);
  paiements.forEach(p => {
    console.log(`- ID: ${p.id}, StudentID: ${p.etudiant_id}, InscriptionID: ${p.inscription_id}, Amount: ${p.amount}, Status: ${p.status}, Session: ${p.stripe_session_id}`);
  });
}

main();
