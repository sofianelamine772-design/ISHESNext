require('dotenv').config({ path: '.env.local' });
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function clearLogs() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/messages?sender_id=eq.system_logger`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    }
  });
  
  if (response.ok) {
    console.log('Logs system_logger effacés avec succès !');
  } else {
    const error = await response.text();
    console.error('Erreur Supabase:', error);
  }
}

clearLogs();
