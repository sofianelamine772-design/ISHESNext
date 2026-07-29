import os
import re

TARGET_DIR = "src"

replacements = {
    # Greens
    r'text-\[\#008953\]': 'text-ishes-green',
    r'bg-\[\#008953\]': 'bg-ishes-green',
    r'border-\[\#008953\]': 'border-ishes-green',
    r'shadow-\[\#008953\]': 'shadow-ishes-green',
    r'fill-\[\#008953\]': 'fill-ishes-green',
    r'from-\[\#008953\]': 'from-ishes-green',
    r'to-\[\#008953\]': 'to-ishes-green',
    
    # Golds
    r'text-\[\#c8a96e\]': 'text-ishes-gold',
    r'bg-\[\#c8a96e\]': 'bg-ishes-gold',
    r'border-\[\#c8a96e\]': 'border-ishes-gold',
    r'shadow-\[\#c8a96e\]': 'shadow-ishes-gold',
    r'fill-\[\#c8a96e\]': 'fill-ishes-gold',
    r'from-\[\#c8a96e\]': 'from-ishes-gold',
    r'to-\[\#c8a96e\]': 'to-ishes-gold',

    r'text-\[\#8b7355\]': 'text-ishes-gold',
    r'bg-\[\#8b7355\]': 'bg-ishes-gold',
    r'border-\[\#8b7355\]': 'border-ishes-gold',
    r'shadow-\[\#8b7355\]': 'shadow-ishes-gold',
    
    # Darks
    r'text-\[\#152233\]': 'text-ishes-dark',
    r'bg-\[\#152233\]': 'bg-ishes-dark',
    r'text-\[\#1a202c\]': 'text-ishes-dark',
    r'bg-\[\#1a202c\]': 'bg-ishes-dark',
}

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in replacements.items():
        # Case insensitive replacement for hex
        new_content = re.sub(pattern, replacement, new_content, flags=re.IGNORECASE)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.md')):
            replace_in_file(os.path.join(root, file))
