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
  console.log("Updating presentiel adult classes in database...");

  // Update Femme Débutante (external_id: 26)
  const { data: d1, error: e1 } = await supabase
    .from('classes')
    .update({
      name: "Femme Débutante – Arabe + Tajwid",
      day_of_week: "Samedi",
      periode: "matin",
      is_active: true
    })
    .eq('external_id', 26)
    .select();

  if (e1) {
    console.error("Error updating class 26:", e1);
  } else {
    console.log("Class 26 updated:", d1);
  }

  // Update Femme Intermédiaire (external_id: 29)
  const { data: d2, error: e2 } = await supabase
    .from('classes')
    .update({
      name: "Femme Intermédiaire – Arabe + Taj.",
      niveau: "Femme intermédiaire ARABE + TAJWID",
      day_of_week: "Dimanche",
      periode: "matin",
      is_active: true
    })
    .eq('external_id', 29)
    .select();

  if (e2) {
    console.error("Error updating class 29:", e2);
  } else {
    console.log("Class 29 updated:", d2);
  }

  // Deactivate classes 27, 28, 30, 31
  const { data: d3, error: e3 } = await supabase
    .from('classes')
    .update({
      is_active: false
    })
    .in('external_id', [27, 28, 30, 31])
    .select();

  if (e3) {
    console.error("Error deactivating other classes:", e3);
  } else {
    console.log("Classes 27, 28, 30, 31 deactivated:", d3);
  }
}

main();
