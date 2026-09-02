import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const slugsToUpdate = [
    'femme-debutante-presentiel',
    'femme-intermediaire-presentiel',
    'tajwid_standard',
    'tajwid_intensif',
    'as_sirah',
    'arabe_adulte'
  ];

  for (const slug of slugsToUpdate) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/formations?slug=eq.${slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ price: 649 })
    });
    
    if (!res.ok) {
      console.error(`Error updating ${slug}:`, await res.text());
    } else {
      console.log(`Successfully updated ${slug} to 649`);
    }
  }
}

main();
