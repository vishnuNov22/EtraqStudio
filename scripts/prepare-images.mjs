// Converts originals in /assets-src to optimised WebP in /public/images and
// writes src/data/image-meta.json (dimensions + tiny blur placeholders).
// Run: node scripts/prepare-images.mjs   (requires `sharp`, installed with the project)
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const src = path.resolve('assets-src');
const out = path.resolve('public/images');
await mkdir(out, { recursive: true });

const meta = {};
for (const file of (await readdir(src)).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const key = path.parse(file).name;
  const img = sharp(path.join(src, file));
  const { width, height } = await img.metadata();
  await img.clone().webp({ quality: 86, effort: 5 }).toFile(path.join(out, `${key}.webp`));
  const blur = await img.clone().resize(14).jpeg({ quality: 55 }).toBuffer();
  meta[key] = { width, height, blur: `data:image/jpeg;base64,${blur.toString('base64')}` };
  console.log(key, width, height);
}

// 1200x630 social-sharing image (landscape crop of the coffee-bar photograph)
await sharp(path.join(src, 'bunaBar.png'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 84 })
  .toFile(path.join(out, 'og.jpg'));

await writeFile(path.resolve('src/data/image-meta.json'), JSON.stringify(meta, null, 2));
