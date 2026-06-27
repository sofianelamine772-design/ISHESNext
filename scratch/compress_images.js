const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const sharp = require('sharp');
    const imagesToCompress = [
      { name: 'institut-ishes-accueil-hero.png', format: 'png', quality: 80 },
      { name: 'livre_ramadan.png', format: 'png', quality: 75 },
      { name: 'livre_invocation.jpg', format: 'jpeg', quality: 80 },
      { name: 'formation-enseignement-arabe-tajwid.jpg', format: 'jpeg', quality: 80 },
      { name: 'campus.png', format: 'png', quality: 75 },
      { name: 'tutoriel-installation-application-ishes.png', format: 'png', quality: 75 }
    ];

    const imagesDir = path.join(__dirname, '../public/images');

    for (const img of imagesToCompress) {
      const srcPath = path.join(imagesDir, img.name);
      if (!fs.existsSync(srcPath)) {
        console.log(`File not found: ${img.name}`);
        continue;
      }

      const tempPath = path.join(imagesDir, `temp_${img.name}`);
      const statsBefore = fs.statSync(srcPath);
      const sizeBeforeKB = (statsBefore.size / 1024).toFixed(2);

      console.log(`Compressing ${img.name} (${sizeBeforeKB} KB)...`);

      if (img.format === 'png') {
        await sharp(srcPath)
          .png({ quality: img.quality, compressionLevel: 9, palette: true })
          .toFile(tempPath);
      } else {
        await sharp(srcPath)
          .jpeg({ quality: img.quality, progressive: true })
          .toFile(tempPath);
      }

      const statsAfter = fs.statSync(tempPath);
      const sizeAfterKB = (statsAfter.size / 1024).toFixed(2);
      const savingsPercent = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);

      if (statsAfter.size < statsBefore.size) {
        fs.renameSync(tempPath, srcPath);
        console.log(`✓ Saved ${savingsPercent}%: ${sizeBeforeKB} KB -> ${sizeAfterKB} KB`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`✗ Compression did not reduce size for ${img.name}, kept original.`);
      }
    }
  } catch (err) {
    console.error("Error compressing images. Make sure 'sharp' is installed:", err.message);
  }
}

run();
