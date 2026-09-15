import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };
const res = await fetch(`${url}/rest/v1/classes?name=ilike.*tarb*&select=id,name,external_id,type`, { headers });
console.log(await res.json());
