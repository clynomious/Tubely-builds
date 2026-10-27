# Tubely website

Next.js App Router website for Tubely, a PNGTuber and live streaming app for Android. English copy, kawaii pastels, original brand assets, Motion, Phosphor icons, and Lenis scrolling. Kept separate from the Android app.

## Local development

```powershell
cd website
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 20.9 or newer. Dependencies and local assets have already been prepared.

## Live release downloads

All download buttons share `LatestReleaseProvider`. It reads the public GitHub releases API configured in `src/lib/site.ts`, without credentials or a token. The page checks on mount, when it becomes visible, and every five minutes while visible. A five-minute session cache and a shared in-flight request limit duplicate calls. Requests time out after ten seconds; failures back off for five minutes and offer the releases page instead.

The resolver accepts published, non-draft releases with an uploaded, non-empty `Tubely-<version>.apk` asset. Beta releases are included because Tubely currently distributes previews. It selects the most recently published eligible release, validates the exact repository download path, and uses `browser_download_url` directly. The page does not download audit reports or source archives. New releases appear without rebuilding the website. The selected version and preview status appear beside the main download button.

An ordinary click waits for any necessary lookup and goes straight to the APK. Modified clicks retain normal browser link behavior. Without JavaScript, or when GitHub is unavailable, the links still lead to GitHub releases. The website does not install APKs or update the Android application itself.

## Motion and interaction

- Hero opening: masked headline, staggered copy, a phone arriving in 3D, and a mascot pop. Entry effects live on separate elements from scroll and pointer transforms.
- Background: decorative SVG traces, scroll-linked drawing, drifting pastel clouds, and moving satellites. No interaction blocking or audio.
- Jelly word: letters assemble once, then unlock for bounded dragging. Hover, entry, and drag use separate transform layers. Arrow keys move each focused letter; Home or double-click resets it. Extra captions and positioning controls are omitted.
- Scroll story: four acts share a sticky stage, moving from character pictures through a voice trace and 3D layers into Studio Live.
- Playground: Float, Bounce, and Wiggle sit in one row, with Bounce active in the center by default. Native Web Animations `updatePlaybackRate` applies speed changes immediately without restarting the animation. Animation stops offscreen, while paused, or in a hidden tab.
- Gallery: the original perspective fan layout and animation are preserved. Seven screens can be selected using the existing buttons, previous/next arrows, or horizontal swipes on mobile; vertical scrolling and pinch zoom remain available.
- Creator corner: brand-specific GitHub, Instagram and TikTok icons for @clynomious, plus the Trakteer support card.
- Footer: Built with a heart icon by Cly.

Pause and reduced motion disable decorative movement and weighted scrolling. The sticky narrative unfolds into ordinary reading flow, and a static transcript keeps every act available to screen readers during animation. Explicit user dragging remains available. Ambient loops pause in hidden tabs; the video stays muted.

Lenis uses the native document scroll position with `lerp: 0.065`, `wheelMultiplier: 0.8`, and native touch behavior. Anchors and chapter buttons share its controller. Skip navigation transfers focus to the main content. The page is not wrapped in a transformed scroll container.

## Configuration and assets

`src/lib/site.ts` stores API, release, creator and support URLs. Trakteer uses `https://trakteer.id/clynomious`, without trailing punctuation. The support copy invites contributions toward development time, without promising a release schedule.

Social metadata uses `NEXT_PUBLIC_SITE_URL` as its base URL. Copy `.env.example` to `.env.local` if needed and set the production domain before building. If unset, the Vercel production domain is used when available; development falls back to localhost. Hero assets and the gallery's initial Home screenshot use eager loading, and only the hero instances request high fetch priority. Other instances of the same eager resource also use eager loading to avoid Next.js's development LCP registry being overwritten by a lazy instance.

`/health/` returns static website availability, not backend health. Local image, video, icon and social-sharing assets are in `public/` and `src/app/`. They do not require the original input files at runtime. Re-running `npm run assets` requires FFmpeg and the original clipboard-named images in `TUBELY_ASSET_SOURCE` (defaults to the system temporary directory). Set `TUBELY_OVERLAY_SOURCE` to the original WebM; its fallback is `../web-assets/tubely_overlay_loop.webm`. Asset preparation is optional because ready-to-use assets are committed. Supplied app screenshots are preserved as product imagery.

The motion demo does not request microphone access. There are no website accounts, analytics, or payment forms; support is handled on the creator's external Trakteer page.

## Production preparation

```powershell
npm run typecheck
npm run build
```

These commands are provided for a future testing or release request; they were not run for this revision, following workspace AGENTS.md. Static export is configured. After a successful build, deploy `out/` to static hosting or deploy the Next.js project to Vercel. `next start` is not used for static exports.

Browser behavior, visual layout, download clicks, and production export remain unverified. Before publication, confirm the domain and public privacy information, then perform the requested checks and desktop/mobile/reduced-motion review. Nothing has been deployed or released by this revision.
