import type { ImageLoaderProps } from 'next/image';

// Prebuilt variants keep responsive images compatible with the static export.
export function staticImageLoader({ src, width }: ImageLoaderProps) {
  const size = width <= 320 ? 320 : width <= 480 ? 480 : width <= 640 && !src.includes('/screen-') ? 640 : null;
  return size ? src.replace(/\.webp$/, `-${size}.webp`) : `${src}?w=${src.includes('/screen-') ? 640 : 820}`;
}
