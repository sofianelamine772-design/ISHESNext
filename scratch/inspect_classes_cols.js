require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function inspectClasses() {
  try {
    const { data: cols, error } = await supabase.from('classes').select('*').limit(1);
    if (error) {
      console.error("Error fetching class record:", error);
    } else {
      console.log("Class columns and sample data:", cols?.[0]);
    }
  } catch (err) {
    console.error("Caught error:", err);
  }
}

inspectClasses();
