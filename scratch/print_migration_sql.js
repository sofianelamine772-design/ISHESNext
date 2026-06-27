require('dotenv').config({ path: '.env.local' });
const https = require('https');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Extract project ref from URL
const projectRef = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '');

const sql = `
ALTER TABLE etudiants ADD COLUMN IF NOT EXISTS clerk_user_id text;
UPDATE etudiants SET clerk_user_id = id WHERE id LIKE 'user_%';
ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_id;
ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_first_name;
ALTER TABLE etudiants DROP COLUMN IF EXISTS parent_last_name;
ALTER TABLE etudiants DROP COLUMN IF EXISTS photo_url;
`;

async function runSQL() {
  // Try Supabase Management API
  console.log('Project ref:', projectRef);
  console.log('SQL to run:\n', sql);
  console.log('\n=== MANUAL STEP REQUIRED ===');
  console.log('Go to: https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
  console.log('And run the SQL above manually.');
  console.log('\nAlternatively, if you have the Supabase CLI:');
  console.log('supabase db execute --project-ref ' + projectRef + ' -c "..."');
}

runSQL();
