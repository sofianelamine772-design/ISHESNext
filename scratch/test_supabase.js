require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Testing Supabase connection...");
console.log("URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function test() {
  try {
    const { data, error } = await supabase.from('etudiants').select('count', { count: 'exact', head: true });
    if (error) {
      console.error("Connection Error:", error);
    } else {
      console.log("Connection Successful! Student count:", data);
    }
  } catch (err) {
    console.error("Fetch failed error caught:", err);
  }
}

test();
