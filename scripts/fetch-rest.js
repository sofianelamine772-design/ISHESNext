const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function run() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/classes?select=id,external_id,name,is_active`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  const data = await res.json();
  const womenClasses = data.filter(c => c.name.toLowerCase().includes('femme'));
  console.log(JSON.stringify(womenClasses, null, 2));
}
run();
