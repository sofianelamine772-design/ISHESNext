require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function inspectInscriptions() {
  try {
    const { data: cols, error } = await supabase.from('inscriptions').select('*').limit(1);
    if (error) {
      console.error("Error fetching inscriptions record:", error);
    } else {
      console.log("Inscriptions columns and sample data:", cols?.[0]);
    }
  } catch (err) {
    console.error("Caught error:", err);
  }
}

inspectInscriptions();
