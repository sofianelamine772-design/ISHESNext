import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };
const res = await fetch(`${url}/rest/v1/paiements?select=amount,created_at,status,etudiants(inscriptions(classes(type)))&status=eq.succeeded&limit=5`, { headers });
console.log(await res.json());
