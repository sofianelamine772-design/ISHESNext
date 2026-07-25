import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const classMapping = [
  { match: /Correction al Fatiha/i, url: "https://chat.whatsapp.com/E36saAQa72D6LY4vg1gXLh" },
  { match: /Spiritualité/i, url: "https://chat.whatsapp.com/CzOeqIcA2VL6IfSYXFZE3j" },
  { match: /Aqîda/i, url: "https://chat.whatsapp.com/GDQSE3TjiLlIkxMpiddqwu" },
  { match: /Fiqh/i, url: "https://chat.whatsapp.com/IW1IuGJVoiQEUQYRempS58" },
  { match: /Sîrah/i, url: "https://chat.whatsapp.com/GA6eBvQDvr69Zby2bF1DwF" },
  { match: /Sciences du Coran/i, url: "https://chat.whatsapp.com/INr0x4F7VEk7f8zFz41wJA" },
  { match: /Sciences Islamiques/i, url: "https://chat.whatsapp.com/KK1UtBfzctFG2XPvTlYM82" },
  { match: /Tajwid.*Standard/i, url: "https://chat.whatsapp.com/JZ166cBukxT7tsPVNaSOtv" },
  { match: /Tajwid Intensif/i, url: "https://chat.whatsapp.com/E61T9986wqQ7TPUqyvuZ8Z" },
  { match: /Arabe Littéraire/i, url: "https://chat.whatsapp.com/J70Mnmo324w3REuHubWKqX" },
  { match: /Tarbiya Islamiya/i, url: "https://chat.whatsapp.com/GOH28lWfCzy52wYXKtcOjo" },
  
  // PRESENTIEL MERCREDI
  { match: /Prépa 1.*Mercredi/i, url: "https://chat.whatsapp.com/L5H0g875CbWIQB25xWlQkU" },
  { match: /Prépa 2.*Mercredi/i, url: "https://chat.whatsapp.com/GYPpiQKeB88JVxrNUPJf1I" },
  { match: /Élémentaire Déb.*Mercredi/i, url: "https://chat.whatsapp.com/L5H0g875CbWIQB25xWlQkU" }, // Guessing
  { match: /Élémentaire 1\+.*Mercredi/i, url: "https://chat.whatsapp.com/B8bN6IjCjdvKun4GpBIcD7" },
  { match: /Élémentaire 2.*Mercredi/i, url: "https://chat.whatsapp.com/LXQ63D82VIoGpFw8qvxMcw" },
  { match: /Élémentaire 2\+.*Mercredi/i, url: "https://chat.whatsapp.com/KhHC2nMoALwGnEDjSFoEn3" },
  { match: /Élémentaire 3.*Mercredi/i, url: "https://chat.whatsapp.com/LXQ63D82VIoGpFw8qvxMcw" }, // Guessing
  { match: /Élémentaire 4.*Mercredi/i, url: "https://chat.whatsapp.com/IzKwWjDZeZJBhxMb2Al8wG" },

  // PRESENTIEL SAMEDI MATIN
  { match: /Prépa 1.*Samedi Matin/i, url: "https://chat.whatsapp.com/KunLH3vmkF9D6Ltyawm2Yc" },
  { match: /Prépa 2.*Samedi Matin/i, url: "https://chat.whatsapp.com/JVrUOK1mJA8IOcDvrmpEEf" },
  { match: /Élémentaire Déb.*Samedi Matin/i, url: "https://chat.whatsapp.com/BC7vTYLJS58A6QTgdjAKIE" },
  { match: /Élémentaire 1\+.*Samedi Matin/i, url: "https://chat.whatsapp.com/DYIpSCahvpv9S82WqAgicJ" },
  { match: /Élémentaire 2.*Samedi Matin/i, url: "https://chat.whatsapp.com/EwAzZD6qOP93h03rw6dASE" },
  
  // FEMMES SAMEDI MATIN
  { match: /Femme Intermédiaire/i, url: "https://chat.whatsapp.com/LEOe0jC5u819CepQvxh7jT" },

  // PRESENTIEL SAMEDI APRES MIDI
  { match: /Prépa 1.*Samedi A-M/i, url: "https://chat.whatsapp.com/BlLwswh10A7HMv9eqbyBRi" },
  { match: /Élémentaire Déb.*Samedi A-M/i, url: "https://chat.whatsapp.com/Byo1gSFg7gx74J7eBBWiyb" },
  { match: /Élémentaire 1\+.*Samedi A-M/i, url: "https://chat.whatsapp.com/GSDhWJqHQRVG845MfGObeQ" },

  // FEMMES DIMANCHE MATIN
  { match: /Femme Débutante/i, url: "https://chat.whatsapp.com/HAx9R3QEL10F9z5IFkiFL5" },

  // PRESENTIEL DIMANCHE MATIN
  { match: /Prépa 1.*Dimanche Matin/i, url: "https://chat.whatsapp.com/Bl0R3FG3KBcAdcEaSRjJU2" },
  { match: /Prépa 2.*Dimanche Matin/i, url: "https://chat.whatsapp.com/HRP9CHFJSQJFp0eRdaOCjH" },
  { match: /Élémentaire Déb.*Dimanche Matin/i, url: "https://chat.whatsapp.com/FZCDysNhI6U9l98vrJpbh0" },
  { match: /Élémentaire 1\+.*Dimanche Matin/i, url: "https://chat.whatsapp.com/DkZWTMKmiiGJjSdNHqCaV7" },
  { match: /Élémentaire 2.*Dimanche Matin/i, url: "https://chat.whatsapp.com/FZCDysNhI6U9l98vrJpbh0" }, // Guessing

  // PRESENTIEL DIMANCHE APRES MIDI
  { match: /Élémentaire Déb.*Dimanche A-M/i, url: "https://chat.whatsapp.com/LrWeaP0uLlZHvDQgacLv8H" },
  { match: /Élémentaire 1\+.*Dimanche A-M/i, url: "https://chat.whatsapp.com/C5UAprAOQ7gAKJyv4gZ9ej" },
  { match: /Élémentaire 2.*Dimanche A-M/i, url: "https://chat.whatsapp.com/Fzpf73TBhZW7E5xESPAwF3" },
  { match: /Élémentaire 2\+.*Dimanche A-M/i, url: "https://chat.whatsapp.com/EUPderlymP9G5dPg6xoWTC" },
  { match: /Élémentaire 3.*Dimanche A-M/i, url: "https://chat.whatsapp.com/Bb1NK10u3J14zTxSw1vcLq" },
  { match: /Élémentaire 4.*Dimanche A-M/i, url: "https://chat.whatsapp.com/Bb1NK10u3J14zTxSw1vcLq" }, // Guessing
  { match: /Élémentaire 5.*Dimanche A-M/i, url: "https://chat.whatsapp.com/Bb1NK10u3J14zTxSw1vcLq" }, // Guessing
];

async function main() {
  const { data: classes, error } = await supabase.from('classes').select('id, name');
  if (error) {
    console.error("Error fetching classes:", error);
    return;
  }

  for (const cls of classes) {
    let matched = false;
    for (const mapping of classMapping) {
      if (mapping.match.test(cls.name)) {
        console.log(`Matched: ${cls.name} -> ${mapping.url}`);
        await supabase.from('classes').update({ whatsapp_link: mapping.url }).eq('id', cls.id);
        matched = true;
        break;
      }
    }
    if (!matched) {
      console.log(`NO MATCH: ${cls.name}`);
    }
  }
}

main();
