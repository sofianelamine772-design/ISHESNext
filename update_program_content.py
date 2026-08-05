import re

filepath = "/Users/elamine/Desktop/ISHES/src/components/vitrine/ProgramContent.tsx"

mapping = {
    "FEMME DEBUTANTE": "/images/formations/femme-presentiel-1.jpg",
    "FEMME INTERMEDIAIRE": "/images/formations/presentiel-femme-interlediare-1.png",
    "enfant-mercredi-presentiel": "/images/formations/presentiel-enfants-1.png",
    "enfant-samedi-presentiel": "/images/formations/presentiel-enfants-1.png",
    "enfant-dimanche-presentiel": "/images/formations/presentiel-enfants-1.png",
    "Tajwid Standard": "/images/formations/tajwid-standar-1.jpg",
    "Tajwid Intensif": "/images/formations/tajwid-intensif-1.jpg",
    "Fiqh Mâlikite": "/images/formations/fiqh-distance-1.png",
    "Sciences du Coran": "/images/formations/sc-du-coran-dsita-1.png",
    "Mémorisation du Coran": "/images/formations/memorisation-tilawa-1.jpg",
    "Al-'Aqîda": "/images/formations/aqida-distance-1.jpeg",
    "Sîrah An-Nabawiyya": "/images/formations/sirah-distance-1.png",
    "Spiritualité Musulmane": "/images/formations/spiritualite-distance.png",
    "Cours Particuliers": "/images/formations/cours-particulier-1.png",
    "ARABE (Enfant)": "/images/formations/arabe-enfant-distance-1.jpg",
    "Tajwid (Enfant)": "/images/formations/tajwid-enfant-distance-1.jpg",
    "Formation Enseignant Tajwid": "/images/formations/enseignant-tajwid-1.jpg",
    "Formation Enseignant Tarbya": "/images/formations/enseignant-tarbya-islamya-1.jpg",
    "Tarbiya Islamiya": "/images/formations/tarbya-islamya-distance-1.jpg",
    "Arabe Littéraire (Adulte)": "/images/formations/arabe-ditanvce-1.png",
    "Pack Accompagnement": "/images/formations/pack-acc-1.png",
}

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Using regex to find block of each program
blocks = content.split('{')
new_blocks = []
for block in blocks:
    for key, val in mapping.items():
        if key in block and 'imageUrl:' in block:
            block = re.sub(r'imageUrl:\s*".*?"', f'imageUrl: "{val}"', block)
            break
    new_blocks.append(block)

content = '{'.join(new_blocks)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("ProgramContent.tsx updated.")
