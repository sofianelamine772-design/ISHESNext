import os
import re

MAPPING = {
    "src/app/fr/cours-al-aqida/page.tsx": ["/images/formations/aqida-distance-1.jpeg", "/images/formations/aqida-2.png"],
    "src/app/fr/cours-arabe-adulte/page.tsx": ["/images/formations/arabe-ditanvce-1.png", "/images/formations/arabe-distance-2.png"],
    "src/app/fr/cours-arabe-enfant/page.tsx": ["/images/formations/arabe-enfant-distance-1.jpg", "/images/formations/arabe-enfant-distance-2.jpg"],
    "src/app/fr/civilisation-arabo-musulmane/page.tsx": ["/images/formations/civ-mus-dist-1.png", "/images/formations/civ-isla-2.png"],
    "src/app/fr/cours-particuliers/page.tsx": ["/images/formations/cours-particulier-1.png", "/images/formations/cours-particulier-2.png"],
    "src/app/fr/formation-enseignant-tajwid/page.tsx": ["/images/formations/enseignant-tajwid-1.jpg", "/images/formations/enseignant-tajwid-2.png"],
    "src/app/fr/formation-enseignant-tarbya/page.tsx": ["/images/formations/enseignant-tarbya-islamya-1.jpg", "/images/formations/enseignant-tarbya-2.jpg"],
    "src/app/fr/cours-presentiel-femme-debutante/page.tsx": ["/images/formations/femme-presentiel-1.jpg", "/images/formations/femme-presentiel-2.jpg"],
    "src/app/fr/cours-presentiel-femme-intermediaire/page.tsx": ["/images/formations/presentiel-femme-interlediare-1.png", "/images/formations/femme-presentiel-inter-2.jpg"],
    "src/app/fr/cours-fiqh-malikite/page.tsx": ["/images/formations/fiqh-distance-1.png", "/images/formations/fiqh-distance-2.png"],
    "src/app/fr/cours-memoriser-coran/page.tsx": ["/images/formations/memorisation-tilawa-1.jpg", "/images/formations/memoristion-tilawa-1-ou-2.jpg"],
    "src/app/fr/cours-presentiel-enfant/page.tsx": ["/images/formations/presentiel-enfants-1.png", "/images/formations/cours-enfants-presentiel-3.jpg"],
    "src/app/fr/cours-sciences-coran/page.tsx": ["/images/formations/sc-du-coran-dsita-1.png", "/images/formations/sc-du-coran-distance-2.jpg"],
    "src/app/fr/cours-as-sirah/page.tsx": ["/images/formations/sirah-distance-1.png", "/images/formations/sirah-dist-2.png"],
    "src/app/fr/spiritualite-islam/page.tsx": ["/images/formations/spiritualite-distance.png", "/images/formations/spiritualite-distance-2.jpg"],
    "src/app/fr/cours-tajwid-enfant/page.tsx": ["/images/formations/tajwid-enfant-distance-1.jpg", "/images/formations/tajwid-enfant-distance-2.jpg"],
    "src/app/fr/cours-tajwid-intensif/page.tsx": ["/images/formations/tajwid-intensif-1.jpg", "/images/formations/taj-int-2.png"],
    "src/app/fr/formation-nour-al-bayane/page.tsx": ["/images/formations/tajwid-standar-1.jpg", "/images/formations/tajwid-standard-2.jpg"],
    "src/app/fr/formation-tarbya-islamya/page.tsx": ["/images/formations/tarbya-islamya-distance-1.jpg", "/images/formations/tarbya-islamya-distance-2.jpg"]
}

base_dir = "/Users/elamine/Desktop/ISHES"

def replace_images_in_file(filepath, new_images):
    full_path = os.path.join(base_dir, filepath)
    if not os.path.exists(full_path):
        print(f"File not found: {filepath}")
        return

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find all occurrences of src="/images/..."
    matches = re.finditer(r'src="/images/[^"]+"', content)
    
    new_content = content
    offset = 0
    img_idx = 0
    
    for match in matches:
        if img_idx >= len(new_images):
            break
            
        start = match.start() + offset
        end = match.end() + offset
        
        replacement = f'src="{new_images[img_idx]}"'
        
        new_content = new_content[:start] + replacement + new_content[end:]
        offset += len(replacement) - (end - start)
        
        img_idx += 1

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"Updated {filepath} with {img_idx} images")

for filepath, new_images in MAPPING.items():
    replace_images_in_file(filepath, new_images)
