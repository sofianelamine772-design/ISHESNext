require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function checkClasses() {
  try {
    const { data: classes, error } = await supabase
      .from('classes')
      .select('id, name, type, day_of_week')
      .order('type');
    
    if (error) {
      console.error("Error fetching classes:", error);
    } else {
      console.log("All classes in DB:", classes);
    }
  } catch (err) {
    console.error("Caught error:", err);
  }
}

checkClasses();
