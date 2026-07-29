import os
import re

TARGET_DIR = "src"
CSS_FILE = "src/app/globals.css"

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace the text 'ishes-green' with 'ishes-blue' globally
    new_content = re.sub(r'ishes-green', 'ishes-blue', content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated classes in {filepath}")

for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.md')):
            replace_in_file(os.path.join(root, file))
