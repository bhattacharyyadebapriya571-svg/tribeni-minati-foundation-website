const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcPath = path.resolve(__dirname, 'public/tmf-assets/Flex.png');
const outDir = path.resolve(__dirname, 'public/tmf-assets/minati-badges');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const metadata = await sharp(srcPath).metadata();
  console.log(`Flex.png dimensions: ${metadata.width} x ${metadata.height}`);
  const { width, height } = metadata;

  // 1. Circular logo emblem
  const logoBox = {
    left: Math.round(width * 0.02),
    top: Math.round(height * 0.015),
    width: Math.round(width * 0.25),
    height: Math.round(height * 0.19)
  };
  await sharp(srcPath).extract(logoBox).png().toFile(path.join(outDir, 'tmf-circular-emblem.png'));
  console.log('Saved tmf-circular-emblem.png');

  // 2. Exact crop for each letter (Icons and Row cards)
  const rows = [
    { name: 'badge-M', top: 0.330, height: 0.088, iconLeft: 0.355, iconWidth: 0.145, rowLeft: 0.350, rowWidth: 0.62 },
    { name: 'badge-I-illiterate', top: 0.418, height: 0.100, iconLeft: 0.380, iconWidth: 0.115, rowLeft: 0.370, rowWidth: 0.60 },
    { name: 'badge-N-needy', top: 0.520, height: 0.102, iconLeft: 0.368, iconWidth: 0.125, rowLeft: 0.362, rowWidth: 0.60 },
    { name: 'badge-A-abused', top: 0.633, height: 0.086, iconLeft: 0.342, iconWidth: 0.160, rowLeft: 0.340, rowWidth: 0.63 },
    { name: 'badge-T-tribal', top: 0.723, height: 0.094, iconLeft: 0.365, iconWidth: 0.125, rowLeft: 0.360, rowWidth: 0.61 },
    { name: 'badge-I-indians', top: 0.826, height: 0.090, iconLeft: 0.375, iconWidth: 0.105, rowLeft: 0.370, rowWidth: 0.60 },
  ];

  for (const r of rows) {
    // Full row crop (Icon + Word)
    const rowCrop = {
      left: Math.round(width * r.rowLeft),
      top: Math.round(height * r.top),
      width: Math.round(width * r.rowWidth),
      height: Math.round(height * r.height)
    };
    await sharp(srcPath)
      .extract(rowCrop)
      .png()
      .toFile(path.join(outDir, `${r.name}.png`));

    // Icon only crop
    const iconCrop = {
      left: Math.round(width * r.iconLeft),
      top: Math.round(height * r.top),
      width: Math.round(width * r.iconWidth),
      height: Math.round(height * r.height)
    };
    await sharp(srcPath)
      .extract(iconCrop)
      .png()
      .toFile(path.join(outDir, `icon-${r.name}.png`));
    console.log(`Saved: icon-${r.name}.png`);
  }
}

run().catch(console.error);
