const fs = require('fs');

const path = '/Users/elamine/Desktop/ISHES/src/components/vitrine/ProgramContent.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add imageUrl?: string; to Program type
content = content.replace('slotId?: string;', 'slotId?: string;\n  imageUrl?: string;');

// Replace specific programs to include imageUrl
content = content.replace(/id: "tajwid_standard",[\s\S]*?title: "Tajwid Standard",/, `id: "tajwid_standard",\n    imageUrl: "/images/quran-coffee.png",\n    title: "Tajwid Standard",`);
content = content.replace(/id: "tajwid_intensif",[\s\S]*?title: "Tajwid Intensif",/, `id: "tajwid_intensif",\n    imageUrl: "/images/livre_invocation.jpg",\n    title: "Tajwid Intensif",`);
content = content.replace(/id: "fiqh_malikite",[\s\S]*?title: "Fiqh Mâlikite",/, `id: "fiqh_malikite",\n    imageUrl: "/images/kaaba.jpg",\n    title: "Fiqh Mâlikite",`);
content = content.replace(/id: "sciences_du_coran",[\s\S]*?title: "Sciences du Coran",/, `id: "sciences_du_coran",\n    imageUrl: "/images/flyer-sciences-du-coran.jpeg",\n    title: "Sciences du Coran",`);
content = content.replace(/id: "spiritualite_islam",[\s\S]*?title: "Spiritualité Musulmane",/, `id: "spiritualite_islam",\n    imageUrl: "/images/spiritualite-musulmane-flyer.jpeg",\n    title: "Spiritualité Musulmane",`);
content = content.replace(/id: "formation_enseignante_tajwid",[\s\S]*?title: "Formation Enseignant Tajwid",/, `id: "formation_enseignante_tajwid",\n    imageUrl: "/images/formation-enseignement-arabe-tajwid.jpg",\n    title: "Formation Enseignant Tajwid",`);
content = content.replace(/id: "tarbiya_islamiya",[\s\S]*?title: "Tarbiya Islamiya",/, `id: "tarbiya_islamiya",\n    imageUrl: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=600&q=80",\n    title: "Tarbiya Islamiya",`);
content = content.replace(/id: "arabe_adulte",[\s\S]*?title: "Arabe Littéraire \(Adulte\)",/, `id: "arabe_adulte",\n    imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=600&q=80",\n    title: "Arabe Littéraire (Adulte)",`);
content = content.replace(/id: "al_aqida",[\s\S]*?title: "Al-'Aqîda",/, `id: "al_aqida",\n    imageUrl: "/images/livre_chahada.jpg",\n    title: "Al-'Aqîda",`);
content = content.replace(/id: "as_sirah",[\s\S]*?title: "Sîrah An-Nabawiyya",/, `id: "as_sirah",\n    imageUrl: "/images/livre_sirah.png",\n    title: "Sîrah An-Nabawiyya",`);
content = content.replace(/id: "femme-debutante-presentiel",[\s\S]*?title: "🧕 FEMME DEBUTANTE : Arabe \+ Tajwid",/, `id: "femme-debutante-presentiel",\n    formationId: "presentiel-global",\n    imageUrl: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=600&q=80",\n    title: "🧕 FEMME DEBUTANTE : Arabe + Tajwid",`);
content = content.replace(/id: "enfant-mercredi-presentiel",[\s\S]*?title: "Scolarité Enfants",/, `id: "enfant-mercredi-presentiel",\n    formationId: "presentiel-global",\n    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",\n    title: "Scolarité Enfants",`);
content = content.replace(/id: "enfant-samedi-presentiel",[\s\S]*?title: "Scolarité Enfants",/, `id: "enfant-samedi-presentiel",\n    formationId: "presentiel-global",\n    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",\n    title: "Scolarité Enfants",`);
content = content.replace(/id: "enfant-dimanche-presentiel",[\s\S]*?title: "Scolarité Enfants",/, `id: "enfant-dimanche-presentiel",\n    formationId: "presentiel-global",\n    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",\n    title: "Scolarité Enfants",`);


fs.writeFileSync(path, content, 'utf8');
console.log("Updated PROGRAMS imageUrls.");
