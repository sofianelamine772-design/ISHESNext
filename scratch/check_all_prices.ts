import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const expectedPrices = {
  "femme-debutante-presentiel": 649,
  "femme-intermediaire-presentiel": 649,
  "enfant-mercredi-presentiel": 480,
  "enfant-samedi-presentiel": 480,
  "enfant-dimanche-presentiel": 480,
  "pack_accompagnement": 49,
  "correction_fatiha": 0,
  "tajwid_standard": 649,
  "tajwid_intensif": 799,
  "fiqh_malikite": 399,
  "sciences_du_coran": 399,
  "sciences_hadith": 349,
  "memoriser_coran": 399,
  "al_aqida": 399,
  "as_sirah": 649,
  "spiritualite_islam": 399,
  "cours_particuliers": 0,
  "arabe_enfant_distance": 399,
  "tajwid_enfant_distance": 399,
  "tarbiya_islamiya": 399,
  "arabe_adulte": 649
};

async function checkAll() {
  const slugs = Object.keys(expectedPrices).join(',');
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/formations?slug=in.(${slug})&select=slug,price`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    }
  });
  
  const data = await res.json();
  const dbMap = {};
  for (const row of data) {
    dbMap[row.slug] = row.price;
  }
  
  for (const [slug, expected] of Object.entries(expectedPrices)) {
    const dbPrice = dbMap[slug] !== undefined ? dbMap[slug] : 'MANQUANT';
    const ok = dbPrice === expected ? '✅' : '❌';
    console.log(`${ok} ${slug}: Carte = ${expected} € | Base de données = ${dbPrice} €`);
  }
}
checkAll();
