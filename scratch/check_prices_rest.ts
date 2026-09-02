import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkPrices() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/formations?select=id,slug,title,price`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  const data = await res.json();
  console.table(data);
}
checkPrices();
