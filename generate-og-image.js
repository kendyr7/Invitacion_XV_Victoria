const sharp = require('sharp');
const path = require('path');

const width = 1200;
const height = 630;

async function createOGImage() {
  // Paths to your assets
  const bg = path.join(__dirname, 'public/flowers_deco/paper-texture1.jpg');
  const flower = path.join(__dirname, 'public/flowers_deco/flowers.png');
  const tiara = path.join(__dirname, 'public/tiara.png');

  // Compose the image
  const base = sharp(bg)
    .resize(width, height)
    .composite([
      { input: flower, top: 0, left: 0 },
      { input: tiara, top: 60, left: 900, blend: 'over' }
    ])
    .png();

  // Add text overlay (SVG)
  const svgText = `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill: #b76e79; font-size: 70px; font-family: serif; font-weight: bold; }
        .subtitle { fill: #333; font-size: 40px; font-family: serif; }
        .date { fill: #b76e79; font-size: 36px; font-family: serif; }
      </style>
      <text x="50%" y="45%" text-anchor="middle" class="title">Invitación XV Valentina</text>
      <text x="50%" y="58%" text-anchor="middle" class="subtitle">Domingo 27 de Julio, 2025</text>
      <text x="50%" y="70%" text-anchor="middle" class="date">Hotel Holiday Inn, Managua</text>
    </svg>
  `;

  const svgBuffer = Buffer.from(svgText);

  await base
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .toFile(path.join(__dirname, 'public/og-image.png'));

  console.log('OG image generated at public/og-image.png');
}

createOGImage(); 