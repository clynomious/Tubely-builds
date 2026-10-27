import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { site } from '@/lib/site';
import images from '@/lib/image-manifest.json';
import { HERO_MASCOT_SIZES } from '@/components/responsive-image';
import 'lenis/dist/lenis.css';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')),
  title: 'Tubely — PNGTuber & Live Streaming for Android',
  description: site.description,
  openGraph: {
    title: 'Tubely — PNGTuber & Live Streaming for Android',
    description: site.description,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/social.png', width: 1200, height: 630, alt: 'Tubely, a PNGTuber and live streaming app for Android' }],
  },
  twitter: { card: 'summary_large_image', title: 'Tubely', description: site.description, images: ['/images/social.png'] },
};

export const viewport: Viewport = { themeColor: '#f7f0ff', colorScheme: 'light' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={nunito.variable}><head>
    <link rel="preload" as="image" type="image/avif" imageSrcSet={images.mascot.avif} imageSizes={HERO_MASCOT_SIZES} fetchPriority="high" />
  </head><body>{children}</body></html>;
}
