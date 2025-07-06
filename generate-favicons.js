const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to create favicon from tiara image
async function generateFavicons() {
  try {
    const tiaraPath = path.join(__dirname, 'public', 'tiara.png');
    const outputDir = path.join(__dirname, 'public');

    // Create 16x16 favicon
    await sharp(tiaraPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));

    // Create 32x32 favicon
    await sharp(tiaraPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));

    // Create 180x180 apple touch icon
    await sharp(tiaraPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    // Create ICO file (16x16, 32x32, 48x48)
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map(size => 
        sharp(tiaraPath)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // For now, we'll just copy the 32x32 as favicon.ico
    // In a real implementation, you'd use a library like 'to-ico' to create proper ICO files
    fs.copyFileSync(
      path.join(outputDir, 'favicon-32x32.png'),
      path.join(outputDir, 'favicon.ico')
    );

    console.log('✅ Favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

// Run the script
generateFavicons(); 