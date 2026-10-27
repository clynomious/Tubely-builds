import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve('public/images');
const files = (await readdir(directory)).filter(name => /^(mascot|logo|logo-stacked|icon|screen-[a-z]+)\.webp$/.test(name));
for (const name of files) {
  const source = path.join(directory, name);
  const { width } = await sharp(source).metadata();
  for (const size of [320, 480, 640]) {
    if (size >= width) continue;
    await sharp(source).resize({ width: size }).webp({ quality: 90, effort: 5 })
      .toFile(path.join(directory, name.replace(/\.webp$/, `-${size}.webp`)));
  }
}
await sharp(path.join(directory, 'overlay-poster.png')).webp({ quality: 90, effort: 5 })
  .toFile(path.join(directory, 'overlay-poster.webp'));
console.log('Prepared responsive still images and WebP video poster.');
