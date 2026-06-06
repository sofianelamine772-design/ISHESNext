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
  console.log("Attempting to update Zakaria's inscription (ID: 44b3bbf3-d960-4c3e-a893-864ce0f73333) to valide...");
  const { data, error } = await supabase
    .from('inscriptions')
    .update({
      status: 'valide',
      paid_status: 'paye'
    })
    .eq('id', '44b3bbf3-d960-4c3e-a893-864ce0f73333')
    .select();

  if (error) {
    console.error("Update failed with error:", error);
  } else {
    console.log("Update succeeded:", data);
  }
}

main();
