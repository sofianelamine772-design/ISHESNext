const fs = require('fs');

const path = '/Users/elamine/Desktop/ISHES/src/components/vitrine/ProgramContent.tsx';
let content = fs.readFileSync(path, 'utf8');

const aiImageMap = {
  "femme-debutante-presentiel": "/images/ai_femmes.png",
  "femme-intermediaire-presentiel": "/images/ai_femmes.png",
  "enfant-mercredi-presentiel": "/images/ai_enfants.png",
  "enfant-samedi-presentiel": "/images/ai_enfants.png",
  "enfant-dimanche-presentiel": "/images/ai_enfants.png",
  "tajwid_standard": "/images/ai_quran.png",
  "tajwid_intensif": "/images/ai_quran.png",
  "fiqh_malikite": "/images/ai_kaaba.png",
  "sciences_du_coran": "/images/ai_arabe.png",
  "memoriser_coran": "/images/ai_quran.png",
  "al_aqida": "/images/ai_mosque.png",
  "as_sirah": "/images/ai_medina.png",
  "spiritualite_islam": "/images/ai_spirit.png",
  "correction_fatiha": "/images/ai_quran.png",
  "cours_particuliers": "/images/ai_pro.png",
  "arabe_enfant_distance": "/images/ai_enfants.png",
  "tajwid_enfant_distance": "/images/ai_enfants.png",
  "formation_enseignante_tajwid": "/images/ai_pro.png",
  "formation_enseignante_tarbya": "/images/ai_pro.png",
  "tarbiya_islamiya": "/images/ai_spirit.png",
  "arabe_adulte": "/images/ai_arabe.png",
  "pack_accompagnement": "/images/ai_pro.png"
};

// Use a regex to find each object and replace imageUrl
for (const [id, url] of Object.entries(aiImageMap)) {
  const regex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?)(imageUrl:\\s*"[^"]*",\\s*)?(title:\\s*".*?",)`, 'g');
  content = content.replace(regex, `$1imageUrl: "${url}",\n    $3`);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Updated ALL PROGRAMS with generated AI image URLs.");
