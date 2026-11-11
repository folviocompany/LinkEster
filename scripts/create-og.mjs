import sharp from 'sharp';

const backdrop = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fbc4db"/>
  <rect x="25" y="25" width="1150" height="580" rx="22" fill="#fffafc" fill-opacity=".4" stroke="#c5a06a"/>
  <path d="M520 165h80" stroke="#c5a06a"/>
  <text x="520" y="235" font-family="Georgia,serif" font-size="66" fill="#4d353d">BeautyByEsterr</text>
  <text x="525" y="278" font-family="Arial,sans-serif" font-size="17" letter-spacing="5" fill="#74535f">LASH DESIGNER</text>
  <text x="520" y="365" font-family="Georgia,serif" font-size="35" fill="#4d353d">Realçando sua beleza,</text>
  <text x="520" y="411" font-family="Georgia,serif" font-size="35" font-style="italic" fill="#90556c">um olhar de cada vez.</text>
  <path d="M520 459h80" stroke="#c5a06a"/>
</svg>`);
const portrait = await sharp('public/images/esterr.webp').resize(340, 460, { fit: 'cover', position: 'bottom' }).toBuffer();
const mask = Buffer.from('<svg width="340" height="460"><path d="M0 170a170 170 0 0 1 340 0v274q0 16-16 16H16q-16 0-16-16Z" fill="white"/></svg>');
const rounded = await sharp(portrait).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
await sharp(backdrop).composite([{ input: rounded, left: 100, top: 85 }]).png().toFile('public/og-image.png');
console.log('Created public/og-image.png (1200 × 630)');
