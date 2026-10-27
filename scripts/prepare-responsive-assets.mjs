import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const directory = path.resolve('public/images');
const output = path.join(directory, 'optimized');
await mkdir(output, { recursive: true });
const files = (await readdir(directory)).filter(name => /^(mascot|logo|logo-stacked|letter-[tubely]|screen-[a-z]+)\.webp$/.test(name)).sort();
const manifest = {};
for (const name of files) {
  const source = path.join(directory, name);
  const { width, height } = await sharp(source).metadata();
  const key = name.replace(/\.webp$/, '');
  const candidates = key.startsWith('letter-') ? [64, 96, 160, 240] : key === 'logo' ? [160, 240, 320, 480, 640] : [240, 320, 480, 640];
  const sizes = [...new Set([...candidates.filter(size => size < width), width])];
  const sets = { avif: [], webp: [] };
  let fallback;
  for (const size of sizes) {
    for (const format of ['avif', 'webp']) {
      const image = sharp(source).resize({ width: size });
      const buffer = await (format === 'avif' ? image.avif({ quality: 68, effort: 5, chromaSubsampling: '4:4:4' }) : image.webp({ quality: 86, effort: 5 })).toBuffer();
      const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 10);
      const filename = `${key}-${size}-${hash}.${format}`;
      await writeFile(path.join(output, filename), buffer);
      const url = `/images/optimized/${filename}`;
      sets[format].push(`${url} ${size}w`);
      if (format === 'webp' && (!fallback || size <= 480)) fallback = url;
    }
  }
  manifest[key] = { width, height, src: fallback, avif: sets.avif.join(', '), webp: sets.webp.join(', ') };
}
await writeFile(path.resolve('src/lib/image-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await sharp(path.join(directory, 'overlay-poster.png')).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 86, effort: 5 })
  .toFile(path.join(directory, 'overlay-poster.webp'));
console.log('Prepared AVIF/WebP source sets, content-hashed image manifest and video poster.');
