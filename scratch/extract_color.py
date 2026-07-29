import sys
try:
    from PIL import Image
    from collections import Counter
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image
    from collections import Counter

img = Image.open("/Users/elamine/Desktop/ISHES/logo.png").convert("RGBA")
width, height = img.size
colors = img.getcolors(width*height)

# Find the most common non-transparent, non-white, non-black color
best_color = None
max_count = 0

for count, color in colors:
    r, g, b, a = color
    if a < 200: continue # ignore transparent
    if r > 240 and g > 240 and b > 240: continue # ignore white
    if r < 15 and g < 15 and b < 15: continue # ignore black
    
    # We want a blue, so b should probably be higher or just get the most common remaining color
    if count > max_count:
        max_count = count
        best_color = (r, g, b)

if best_color:
    hex_color = "#{:02x}{:02x}{:02x}".format(*best_color)
    print("Found color:", hex_color)
else:
    print("Could not find a prominent color.")
