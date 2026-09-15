import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  const { data: classes } = await supabase.from('classes').select('id, name, type, day_of_week, periode, external_id').eq('type', 'presentiel');
  
  const { data: inscriptions } = await supabase.from('inscriptions').select('class_id').eq('status', 'active');
  
  const counts = inscriptions?.reduce((acc: any, ins: any) => {
    acc[ins.class_id] = (acc[ins.class_id] || 0) + 1;
    return acc;
  }, {});

  classes?.forEach((c: any) => {
    console.log(`${c.name} (${c.day_of_week} ${c.periode}) -> ${counts?.[c.id] || 0} élèves`);
  });
}
run();
