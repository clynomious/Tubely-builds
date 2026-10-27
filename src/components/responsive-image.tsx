import images from '@/lib/image-manifest.json';

export type ImageName = keyof typeof images;

export const HERO_MASCOT_SIZES = '(max-width: 360px) 240px, (max-width: 640px) 275px, (max-width: 800px) 300px, (max-width: 1100px) 330px, (min-width: 1500px) 435px, 395px';

export function letterImageSizes(name: ImageName) {
  const ratio = images[name].width / images[name].height;
  const rules = [
    ['(max-width: 360px)', 32, 70], ['(max-width: 640px)', 40, 85],
    ['(max-width: 800px)', 48, 120], ['(max-width: 1100px)', 72, 145], ['', 112, 175],
  ] as const;
  return rules.map(([condition, gutter, height]) => `${condition} min(180px, calc((100vw - ${gutter}px) / 6), ${(height * ratio).toFixed(2)}px)`.trim()).join(', ');
}

export function ResponsiveImage({ name, alt = '', className, sizes, eager = false, priority = false }: {
  name: ImageName; alt?: string; className?: string; sizes: string; eager?: boolean; priority?: boolean;
}) {
  const asset = images[name];
  return <picture className="asset-picture">
    <source type="image/avif" srcSet={asset.avif} sizes={sizes} />
    <img src={asset.src} srcSet={asset.webp} sizes={sizes} width={asset.width} height={asset.height}
      alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" draggable={false} />
  </picture>;
}
