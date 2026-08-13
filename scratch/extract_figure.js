const sharp = require('sharp');
const path = require('path');

async function process() {
  const inputPath = path.join(__dirname, '../public/footer-experiencetheperformance.jpg');
  const outputPath = path.join(__dirname, '../public/figure-woman.png');

  const image = sharp(inputPath);
  const meta = await image.metadata();
  const { width, height } = meta;
  
  const rawBuffer = await image.ensureAlpha().raw().toBuffer();
  const outputBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = rawBuffer[i * 4];
    const g = rawBuffer[i * 4 + 1];
    const b = rawBuffer[i * 4 + 2];

    const x = i % width;
    const y = Math.floor(i / width);
    const nx = x / width;
    const ny = y / height;

    const blueChromaR = b - r;
    const blueChromaG = b - g;

    let alpha = 255;

    // Clean top-left region artifact removal
    if (nx < 0.4 && ny < 0.4) {
      alpha = 0;
    } else if (blueChromaR > 35 && blueChromaG > 15 && b > 90 && r < 145) {
      const bgFactor = Math.min((blueChromaR - 35) / 30, (blueChromaG - 15) / 20);
      alpha = Math.max(0, Math.round(255 * (1 - Math.min(Math.max(bgFactor, 0), 1))));
    }

    outputBuffer[i * 4] = r;
    outputBuffer[i * 4 + 1] = g;
    outputBuffer[i * 4 + 2] = b;
    outputBuffer[i * 4 + 3] = alpha;
  }

  await sharp(outputBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);

  console.log('Cleaned figure-woman.png successfully!');
}

process().catch(console.error);
