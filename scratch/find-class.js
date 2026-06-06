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
  const { data: classes, error } = await supabase
    .from('classes')
    .select('id, name, external_id, whatsapp_link');
  
  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("Classes with external_id:");
  classes.forEach(c => {
    console.log(`- Class: ${c.name}, ID: ${c.id}, ExternalID: ${c.external_id}, Link: ${c.whatsapp_link}`);
  });
}

main();
