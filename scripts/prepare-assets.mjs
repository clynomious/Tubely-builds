import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const temp = process.env.TUBELY_ASSET_SOURCE || process.env.TEMP;
if (!temp) throw new Error('Set TUBELY_ASSET_SOURCE to the original image directory.');
const images = path.resolve('public/images');
await mkdir(images, { recursive: true });
const sources = {
  'letter-t': '635fca27-b46a-4a32-871a-858d6ca056d2',
  'letter-u': '1503a6d0-78cf-4f76-8fda-ff6d35d0a02e',
  'letter-b': 'a6943592-ed53-4252-bd08-237b992b28ce',
  'letter-e': '98e9d35a-6ca5-4356-a7b2-91e5e28a5f51',
  'letter-l': 'a1e1b1f3-9faa-48ce-8c9a-496580468d26',
  'letter-y': '65461f86-c0aa-4341-878f-476035631db3',
  'logo-stacked': '20b1d17c-f04f-4a8f-a1cc-7756118078ab',
  'logo': 'b25c6f2a-3c75-4572-ba43-0b4d1fc7ac30',
  'icon': 'b4cb6587-4752-4a84-91b5-304930a14578',
  'mascot': 'f3424084-e76b-43ee-8af3-a755199336a7',
};
for (const [name, id] of Object.entries(sources)) {
  await sharp(path.join(temp, `codex-clipboard-${id}.png`))
    .trim({ threshold: 30 }).resize({ width: name.startsWith('letter') ? 300 : 820, withoutEnlargement: true })
    .webp({ quality: 88 }).toFile(path.join(images, `${name}.webp`));
}
const screens = {
  home: '1eff7f90-4b00-4bcd-b6fd-6531aba243de',
  avatars: '9029e545-9b47-40eb-8c8a-2e8c9ca75f99',
  expressions: '1014b1a4-b020-48c3-9099-f131432a6770',
  voice: 'd72c902d-a1af-427a-995f-e32aeb425d72',
  motion: 'd5eb0a3c-47e7-49ed-b0f1-4b6bce769d46',
  settings: '176513dc-fb22-4ad0-9942-e02f5f13e3cc',
  studio: '8136bb16-28ce-4e4b-8d5e-2c961ac8ad27',
};
for (const [name, id] of Object.entries(screens)) {
  await sharp(path.join(temp, `codex-clipboard-${id}.png`)).resize({ width: 640 })
    .webp({ quality: 84 }).toFile(path.join(images, `screen-${name}.webp`));
}
await sharp(path.join(temp, 'codex-clipboard-b4cb6587-4752-4a84-91b5-304930a14578.png'))
  .trim({ threshold: 30 }).resize(96, 96).png().toFile('src/app/icon.png');
await mkdir('public/media', { recursive: true });
const overlaySource = process.env.TUBELY_OVERLAY_SOURCE || path.resolve('../web-assets/tubely_overlay_loop.webm');
await copyFile(overlaySource, 'public/media/tubely-overlay.webm');
execFileSync('ffmpeg', ['-v', 'error', '-y', '-c:v', 'libvpx-vp9', '-i', 'public/media/tubely-overlay.webm', '-frames:v', '1', '-update', '1', 'public/images/overlay-poster.png']);
const socialLogo = await sharp(path.join(images, 'logo-stacked.webp')).resize({ width: 500, height: 500, fit: 'inside' }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#f1e6ff' } })
  .composite([{ input: socialLogo, gravity: 'center' }]).png().toFile(path.join(images, 'social.png'));
console.log('Prepared Tubely brand assets, seven screenshots and overlay loop.');
await import('./prepare-responsive-assets.mjs');
