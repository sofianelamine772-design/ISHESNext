const fs = require('fs');

const path = '/Users/elamine/Desktop/ISHES/src/components/vitrine/ProgramContent.tsx';
let content = fs.readFileSync(path, 'utf8');

const imageMap = {
  "femme-debutante-presentiel": "https://images.unsplash.com/photo-1616422285623-13fb0162ce6c?auto=format&fit=crop&w=600&q=80",
  "femme-intermediaire-presentiel": "https://images.unsplash.com/photo-1596767554901-d0076a4ba2de?auto=format&fit=crop&w=600&q=80",
  "enfant-mercredi-presentiel": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  "enfant-samedi-presentiel": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
  "enfant-dimanche-presentiel": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
  "tajwid_standard": "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=600&q=80",
  "tajwid_intensif": "https://images.unsplash.com/photo-1609599006353-e629aaab315d?auto=format&fit=crop&w=600&q=80",
  "fiqh_malikite": "https://images.unsplash.com/photo-1565552643952-b40dc59dbed9?auto=format&fit=crop&w=600&q=80",
  "sciences_du_coran": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
  "memoriser_coran": "https://images.unsplash.com/photo-1579893962657-3f3be1267425?auto=format&fit=crop&w=600&q=80",
  "al_aqida": "https://images.unsplash.com/photo-1519818169123-d345511059f8?auto=format&fit=crop&w=600&q=80",
  "as_sirah": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80",
  "spiritualite_islam": "https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=600&q=80",
  "correction_fatiha": "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=600&q=80",
  "cours_particuliers": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "arabe_enfant_distance": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=600&q=80",
  "tajwid_enfant_distance": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  "formation_enseignante_tajwid": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  "formation_enseignante_tarbya": "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80",
  "tarbiya_islamiya": "https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=600&q=80",
  "arabe_adulte": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80",
  "pack_accompagnement": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
};

// Use a regex to find each object and replace/add imageUrl
for (const [id, url] of Object.entries(imageMap)) {
  const regex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?)(imageUrl:\\s*"[^"]*",\\s*)?(title:\\s*".*?",)`, 'g');
  content = content.replace(regex, `$1imageUrl: "${url}",\n    $3`);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Updated ALL PROGRAMS imageUrls.");
