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
  console.log("Running query with double quotes...");
  const { data: dataQuotes, error: errQuotes } = await supabase
    .from('etudiants')
    .select('id, email')
    .or(`email.eq."benilias757@gmail.com",email.ilike."benilias757+%@gmail.com"`);

  console.log("With quotes result:", dataQuotes, "Error:", errQuotes);

  console.log("\nRunning query WITHOUT double quotes...");
  const { data: dataNoQuotes, error: errNoQuotes } = await supabase
    .from('etudiants')
    .select('id, email')
    .or(`email.eq.benilias757@gmail.com,email.ilike.benilias757+%@gmail.com`);

  console.log("Without quotes result:", dataNoQuotes, "Error:", errNoQuotes);
}

main();
