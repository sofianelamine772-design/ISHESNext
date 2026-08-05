import os
import shutil
import unicodedata
import re

source = "/Users/elamine/Desktop/ISHES/ImageSite 26-27"
dest = "/Users/elamine/Desktop/ISHES/public/images/formations"

def slugify(value):
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    return re.sub(r'[-\s]+', '-', value)

for filename in os.listdir(source):
    if filename.startswith('.') or filename in ['1.jpg', '2.jpg', '3.jpg', '4.jpg']:
        continue
    name, ext = os.path.splitext(filename)
    new_name = slugify(name) + ext.lower()
    
    src_path = os.path.join(source, filename)
    dst_path = os.path.join(dest, new_name)
    
    if os.path.isfile(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied {filename} to {new_name}")

