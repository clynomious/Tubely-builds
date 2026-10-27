# Tubely website

Next.js App Router website for Tubely, a PNGTuber and live streaming app for Android. English copy, kawaii pastels, original brand assets, Motion, Phosphor icons, and Lenis scrolling. Kept separate from the Android app.

## Local development

```powershell
npm install
npm run dev
```

Run these commands from the repository root, then open http://localhost:3000. Requires Node.js 20.9 or newer. Ready-to-use local assets are committed.

## Live release downloads

All download buttons share `LatestReleaseProvider`. It reads the public GitHub releases API configured in `src/lib/site.ts`, without credentials or a token. Automatic lookup waits for the initial page load so it does not compete with the opening images; a download click starts any needed lookup immediately. The page also checks when it becomes visible and every five minutes while visible. A five-minute session cache and a shared in-flight request limit duplicate calls. Requests time out after ten seconds; failures back off for five minutes and offer the releases page instead.

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

## Mobile rendering

All choreography, timing, SVG drawing, 3D scenes, gallery geometry, and interactions are retained. Scene scroll subscribers attach within a 320px viewport margin and disconnect outside it or while the tab is hidden. Native ViewTimeline acceleration remains available on supporting browsers. Story acts keep both sides of each crossfade active; fully transparent acts hide their paint and clamp their JavaScript progress until needed again. The story's original four background colors crossfade as constant-color layers instead of repainting the viewport background on every scroll frame.

Lenis requests animation frames only during wheel or anchor smoothing, with the same easing and native touch behavior. Its clock resets when waking after an idle period so the next transition does not jump. Pause and hidden-tab cleanup cancel scheduled work.

Brand images, letters, and screenshots use native `<picture>` elements with AVIF sources and responsive WebP fallbacks. Width descriptors match the generated files, and size hints follow the actual scene widths, including the letters' contained aspect ratios. Image dimensions come from the source metadata. This works with static export without an image server or client-side image runtime. The former global `unoptimized: true` setting overrode the custom loader and prevented source sets from reaching the published HTML; that path has been replaced. Only the opening assets load eagerly. The mascot alone gets high fetch priority and a matching responsive AVIF preload in the document head.

The original video loop is unchanged. Its resized WebP poster is assigned within a 600px viewport margin, keeping it out of the opening request queue. Motion uses `m` components with an asynchronously loaded `domMax` feature bundle; drag, pan, hover, springs, presence and layout features remain available. The support clip animation attaches near its section, and the continuously flowing SVG trace has a separate paint layer while retaining its path, dash pattern, 28-second duration and stacking order.

Regenerate assets with `npm run assets:responsive`; importing the original supplied assets also runs this step. Ready-to-serve image URLs contain content hashes and receive an immutable browser cache policy on Vercel. Unhashed originals remain available, including the README assets, and do not receive immutable headers.

These are source-level optimizations. No mobile benchmark, browser/device exercise, typecheck, or build was run for this revision; no measured frame-rate or Web Vitals improvement is claimed.

## Configuration and assets

`src/lib/site.ts` stores API, release, creator and support URLs. Trakteer uses `https://trakteer.id/clynomious`, without trailing punctuation. The support copy invites contributions toward development time, without promising a release schedule.

Social metadata uses `NEXT_PUBLIC_SITE_URL` as its base URL. Copy `.env.example` to `.env.local` if needed and set the production domain before building. If unset, the Vercel production domain is used when available; development falls back to localhost. The opening mascot is preloaded at its responsive display size with high fetch priority. Header and hero phone images are eager at normal priority; gallery and other below-fold images are lazy. Native picture elements avoid the old shared Next.js development-image registry issue.

`/health/` returns static website availability, not backend health. Local image, video, icon and social-sharing assets are in `public/` and `src/app/`. They do not require the original input files at runtime. Re-running `npm run assets` requires FFmpeg and the original clipboard-named images in `TUBELY_ASSET_SOURCE` (defaults to the system temporary directory). Set `TUBELY_OVERLAY_SOURCE` to the original WebM; its fallback is `../web-assets/tubely_overlay_loop.webm`. Asset preparation is optional because ready-to-use assets are committed. Supplied app screenshots are preserved as product imagery.

The motion demo does not request microphone access. There are no website accounts, analytics, or payment forms; support is handled on the creator's external Trakteer page.

## Production preparation

For Vercel, import this repository with the **Next.js** framework preset and **Root Directory** set to `./`. Keep the build and output defaults. The source, package manifest, lockfile, and public assets all live at the repository root. Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS domain if you use a custom domain; otherwise the Vercel production-domain fallback applies. An existing project configured with `website` as its root must be updated to `./`.

```powershell
npm run typecheck
npm run build
```

These commands are provided for a future testing or release request; they were not run for this revision, following workspace AGENTS.md. Static export is configured. After a successful build, deploy `out/` to static hosting or deploy the Next.js project to Vercel. `next start` is not used for static exports.

Browser behavior, visual layout, download clicks, and production export remain unverified. Before publication, confirm the domain and public privacy information, then perform the requested checks and desktop/mobile/reduced-motion review. Nothing has been deployed or released by this revision.
