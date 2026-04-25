from PIL import Image, ImageDraw

def remove_background(image_path, output_path):
    # Open the image
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size

    # The background is usually white, we will flood fill from the 4 corners
    # with a transparent color (0, 0, 0, 0)
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    
    # We first find the white background color. Usually it's around (255, 255, 255)
    # We will use flood fill to change white to transparent.
    for x, y in corners:
        pixel = img.getpixel((x, y))
        # If the corner is already transparent, skip
        if pixel[3] == 0:
            continue
        # Flood fill from this corner
        ImageDraw.floodfill(img, (x, y), (0, 0, 0, 0), thresh=30)

    # Save the result
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_background(
        "/Users/elamine/Desktop/ISHES/public/images/clean_manga_bubble.png",
        "/Users/elamine/Desktop/ISHES/public/images/clean_manga_bubble.png"
    )
    print("Background removed successfully!")
