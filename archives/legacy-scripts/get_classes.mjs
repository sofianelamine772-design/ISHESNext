import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function run() {
  const headers = {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json'
  };

  const classesRes = await fetch(`${url}/rest/v1/classes?type=eq.presentiel&select=id,name,type,day_of_week,periode,external_id`, { headers });
  const classes = await classesRes.json();

  const insRes = await fetch(`${url}/rest/v1/inscriptions?status=eq.active&select=class_id`, { headers });
  const inscriptions = await insRes.json();
  
  const counts = inscriptions.reduce((acc, ins) => {
    acc[ins.class_id] = (acc[ins.class_id] || 0) + 1;
    return acc;
  }, {});

  classes.forEach(c => {
    console.log(`[${c.day_of_week} ${c.periode}] ${c.name} -> ${counts?.[c.id] || 0} élèves`);
  });
}
run();
