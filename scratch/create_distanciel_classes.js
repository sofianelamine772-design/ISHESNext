require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function preCreateDistancielClasses() {
  console.log("Fetching distanciel formations...");
  const { data: formations } = await supabaseAdmin
    .from('formations')
    .select('id, title')
    .eq('type', 'distanciel')
    .eq('is_active', true);

  if (!formations) return;

  const academic_year = '2026-2027';
  
  for (const f of formations) {
    const className = `Session ${f.title} (${academic_year})`;
    
    // Check if class already exists
    const { data: existing } = await supabaseAdmin
      .from('classes')
      .select('id')
      .eq('formation_id', f.id)
      .eq('academic_year', academic_year)
      .single();

    if (!existing) {
      await supabaseAdmin.from('classes').insert({
        formation_id: f.id,
        name: className,
        type: 'distanciel',
        academic_year: academic_year,
        is_active: true,
        capacity_limit: 100 // Distanciel generally has a higher or unlimited capacity
      });
      console.log(`Created: ${className}`);
    } else {
      console.log(`Already exists: ${className}`);
    }
  }
  console.log("Done pre-creating distanciel classes.");
}

preCreateDistancielClasses();
