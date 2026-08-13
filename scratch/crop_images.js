const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const files = [
  'image 2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image9.jpg'
];

async function processImages() {
  for (const file of files) {
    const filePath = path.join(publicDir, file);
    if (!fs.existsSync(filePath)) continue;

    console.log(`Processing ${file}...`);
    const tempPath = path.join(publicDir, `temp_${file}`);

    try {
      // Load image metadata
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Trim white borders automatically with sharp threshold
      const trimmed = sharp(filePath).trim({
        background: '#ffffff',
        threshold: 15
      });

      await trimmed.toFile(tempPath);

      // Overwrite original file with trimmed version
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      const newMeta = await sharp(filePath).metadata();
      console.log(`Successfully cropped ${file}: ${metadata.width}x${metadata.height} -> ${newMeta.width}x${newMeta.height}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages();
