const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcPath = path.resolve(__dirname, 'public/tmf-assets/WhatsApp Image 2026-08-26 at 12.43.18 PM.jpeg');
const outDir = path.resolve(__dirname, 'public/tmf-assets/minati-badges');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const metadata = await sharp(srcPath).metadata();
  console.log(`Source Image: ${metadata.width} x ${metadata.height}`);

  const width = metadata.width;
  const height = metadata.height;

  // 1. Crop M-I-N-A-T-I individual rows
  const boxLeft = Math.round(width * 0.105);
  const boxWidth = Math.round(width * 0.180);

  const letters = [
    { name: 'badge-M', top: 0.470, height: 0.060 },
    { name: 'badge-I-illiterate', top: 0.536, height: 0.060 },
    { name: 'badge-N-needy', top: 0.602, height: 0.060 },
    { name: 'badge-A-abused', top: 0.668, height: 0.060 },
    { name: 'badge-T-tribal', top: 0.734, height: 0.060 },
    { name: 'badge-I-indians', top: 0.800, height: 0.060 },
  ];

  for (const item of letters) {
    const top = Math.round(height * item.top);
    const itemHeight = Math.round(height * item.height);
    const dest = path.join(outDir, `${item.name}.png`);

    await sharp(srcPath)
      .extract({ left: boxLeft, top: top, width: boxWidth, height: itemHeight })
      .png()
      .toFile(dest);

    console.log(`Extracted: ${dest}`);
  }

  // 2. Crop circular logo emblem
  const logoLeft = Math.round(width * 0.015);
  const logoTop = Math.round(height * 0.020);
  const logoSize = Math.round(width * 0.275);

  const logoDest = path.join(outDir, 'tmf-circular-emblem.png');
  await sharp(srcPath)
    .extract({ left: logoLeft, top: logoTop, width: logoSize, height: logoSize })
    .png()
    .toFile(logoDest);

  console.log(`Extracted logo emblem: ${logoDest}`);
}

run().catch(console.error);
