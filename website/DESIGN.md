---
name: Tubely website
description: PNGTuber and live streaming for Android, told through a playful pastel scroll story.
colors:
  paper: "#fff9fd"
  lavender: "#eee0fb"
  lilac: "#d9c5fa"
  purple: "#7041bc"
  ink: "#49346a"
  muted: "#756286"
  pink: "#f9dfea"
  mint: "#e3efea"
  line: "#dacde8"
  stage-lilac: "#e7d8f8"
  stage-peach: "#f9dce8"
  stage-mint: "#dceee4"
  support-rose: "#a43c64"
  support-pink: "#f6deeb"
typography:
  display:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(62px, 7.1vw, 102px)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(42px, 5.4vw, 78px)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Nunito, sans-serif"
    fontSize: "20px"
    lineHeight: 1.6
  label:
    fontFamily: "Nunito, sans-serif"
    fontSize: "15px"
    fontWeight: 800
rounded:
  direction-control: "10px"
  motion-choice: "13px"
  pose-sheet: "20px"
  device: "30px"
  pill: "50px"
  circle: "50%"
spacing:
  choice-gap: "8px"
  action-gap: "30px"
  stage-gap: "65px"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "white"
    rounded: "{rounded.pill}"
    padding: "17px 27px"
  button-nav-download:
    backgroundColor: "{colors.ink}"
    textColor: "white"
    rounded: "40px"
    padding: "13px 22px"
  motion-choice:
    backgroundColor: "#f0e8f7"
    rounded: "{rounded.motion-choice}"
    padding: "14px 8px"
  motion-choice-selected:
    backgroundColor: "{colors.purple}"
    textColor: "white"
    rounded: "{rounded.motion-choice}"
  gallery-choice-selected:
    backgroundColor: "{colors.ink}"
    textColor: "white"
    rounded: "40px"
    padding: "13px 20px"
  button-support:
    backgroundColor: "{colors.support-rose}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "17px 27px"
  support-card:
    backgroundColor: "{colors.support-pink}"
    rounded: "28px"
    padding: "64px 70px"
---

# Design System: Tubely website

## Overview

**Creative North Star: "Your little streaming world"**

Tubely is a PNGTuber **and live streaming** Android app. Mode: Persuade. Its supplied kawaii mascot, jelly letters, wordmarks, pastel palette, and rounded Nunito typography remain the visual authority. This record applies only to `website/`.

The current composition uses large, concise copy and a continuous character-to-broadcast story. Oversized type, a mascot, and a 3D device share the opening plane; SVG traces, assembling letters, layered scenes, and fanning screenshots carry the explanation. The previous small-copy stage-and-card composition is superseded.

**Key Characteristics:**
- Clear PNGTuber and live streaming identity from the hero through the footer.
- Supplied kawaii assets against warm paper, lavender, pink, and mint.
- Scroll controls scene geometry, signal drawing, depth, and screenshot arrangement.
- Directly playable mascot controls with keyboard and single-click alternatives.
- Pausing unfolds the story into ordinary document flow.

Source basis: `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/releases.ts`, and the experience, weighted-scroll, demo-motion, ambient-background, and latest-release components. This is a source record only: no renders, screenshots, tests, builds, typechecks, browser/device exercises, or deployment are claimed. The sidecar contains only source-backed extensions and minimal previews, with no invented tonal ramps.

## Colors

### Primary
**Playful Purple** (`purple`) fills primary actions, selected motion choices, focus outlines, and heading emphasis. Primary hover uses the source literal `#6133ac`.

### Secondary
**Lavender Cream** (`lavender`) grounds the sticky story; **Soft Lilac** (`lilac`) remains a declared brand primitive. The story interpolates lavender through pink and mint to the local endpoint `#e7d8fa`.

### Tertiary
**Candy Pink** (`pink`) and **Quiet Mint** (`mint`) provide story atmospheres. The three stage tokens pair selectable playground backdrops with matching swatches. The gallery has its own pale pink surface (`#f8e9f2`).

**Support Rose** (`support-rose`) is reserved for the Trakteer action on **Support Pink** (`support-pink`), with hover `#8b2d52`. The main app download action stays purple.

### Neutral
**Warm Paper** (`paper`) is the page foundation; **Purple Ink** (`ink`) carries primary text, header download, and selected gallery choices; **Muted Grape** (`muted`) supports explanation; **Lilac Line** (`line`) outlines swatches.

**The Faithful Asset Rule.** Keep supplied screenshots and brand artwork faithful; dark app screens remain dark within the light world.

## Typography

Nunito is loaded through `next/font`, with a Latin subset, swap display, and sans-serif fallback. Frontmatter describes the desktop hero, general headings, hero lead, and control labels. Headlines use heavy weight, tight tracking, balanced wrapping, and brief statements.

The hero reads “Your character. Your kind of live.” with an explicit PNGTuber/live-streaming Android description. All website, metadata, status, and accessibility copy is casual English; document language is `en`, Open Graph locale `en_US`. Story headings are larger than general headings (`clamp(48px, 5.8vw, 82px)`); their support copy is (19px), usually one short sentence. At mobile widths the hero uses `clamp(40px, 10.2vw, 64px)`, general headings `clamp(38px, 10vw, 53px)`, and story headings `clamp(43px, 11.2vw, 62px)`. Narrow and short viewports add further source overrides.

**The Clear Identity Rule.** Keep the product category explicit and supporting copy short; let the scene explain the transformation.

## Layout

The centered wrapper is `min(1280px, calc(100% - 112px))`. Total gutters become (72px), (48px), (40px), and (32px) at maximum widths (1100px), (800px), (640px), and (360px). A wide-screen override starts at (1500px); short-story overrides apply at maximum height (650px).

The hero overlaps its text plane with a pastel planet, SVG orbit, supplied mascot, and actual Studio screenshot in a perspective device. Six supplied jelly letters then assemble through scroll. The four-act narrative occupies (420svh), or (365svh) on mobile, with a sticky (100svh) stage: character images → voice waveform → 3D scene layers → Studio device and broadcast rings. Chapter buttons jump directly to an act.

The playground splits an organic stage and controls (1.65fr 1fr, 65px gap), stacking at (640px). Five screenshots fan from a central pile; seven ordinary pressed-state buttons choose the central image. Two output panels follow: floating avatar and local/LAN overlay URL. A short native-disclosure FAQ leads to CreatorCorner, the wordmark/download scene, and compact footer. Output, FAQ, support, and download columns stack on mobile. CreatorCorner uses a pink support card followed by a personal social row; its three social links remain a three-column grid on mobile.

## Elevation & Depth

Perspective is structural: hero (1100px), story scenes (1000px), playground (1200px), and screenshot fan (1400px). Scroll changes translation, rotation, scale, and layer depth; SVG orbits and traces connect scenes.

Source shadows include primary action `0 14px 28px -15px #7041bc60`, device `10px 25px 42px -20px #4a275861, inset 0 0 0 1px #86748e`, scene layers `0 28px 35px -20px #6b458455`, and URL panel `0 25px 45px -25px #7041bc44`. Use them on tangible illustrated objects, keeping reading surfaces quiet.

## Shapes

Large circles, elliptical SVG orbits, rounded pose sheets, pills, and organic pastel stages define the world. The playground silhouette is `50% 50% 45% 45% / 45% 45% 50% 50%`; the floating demo uses `42% 42% 30% 30%`. Desktop device frames pair (30px) outside with (23px) inside; mobile uses (24px)/(19px). Avoid restoring the superseded browser-window playground chrome or generic repeated card grids.

## Components

**Actions and navigation.** Primary actions have (58px) minimum height; hover translates (-4px), rotates (-2deg), and darkens over (.25s). Header links underline and become purple on hover. Focus-visible controls use a purple (3px) outline offset (5px). Mobile menu supports expanded state and Escape dismissal.

**Hero opening and ambient world.** One-shot CSS wrappers reveal masked headline lines (1.05s, second line delayed .13s), ease in copy/actions, rotate the device into 3D (1.3s), and pop the mascot into place (1.25s). Keep opening transforms separate from scroll and pointer wrappers. A fixed, clipped, pointer-transparent ambient layer sits behind content: SVG signal paths draw with scroll/parallax, dashed traces flow (28s), pastel circles drift (20s/26s), and satellites drift (12s). Pause/reduced motion removes optional effects; document-hidden state pauses ambient CSS loops. Preserve existing source tints rather than adding a palette.

**Jelly letter toys.** Entrance reaches its resting geometry by progress (.45), then permanently unlocks at (.5); completed transforms stay fixed when scrolling back. Keep entrance transforms on the outer wrapper and user drag/hover on the nested button so assembly does not fight interaction. Ready letters drag within (±100px, ±80px), without momentum; hover uses scale (1.1), alternating rotation (±8deg), spring stiffness (260), damping (19). Arrow keys move (16px), Home/double-click resets. The word has no caption or positioning disclosure. Pause makes the resting letters available immediately. Do not re-lock or re-run assembly after play begins.

**Weighted scrolling.** Lenis uses the native document so sticky scenes and Motion share one scroll position. Wheel settings are `lerp: .065`, `wheelMultiplier: .8`, and `syncTouch: false`; anchors and chapter navigation share a (1.4s) destination transition, with anchors offset (-24px). The skip link uses the shared navigator and focuses main content without a second scroll. Pause/reduced motion destroys the Lenis instance; effect cleanup also destroys it. Preserve native touch behavior and instant navigation while paused.

**Scroll story and SVGs.** Four acts use concise copy and custom visuals. Voice wave, orbital ellipses, linking thread, broadcast rings, and download ribbon draw with scroll-linked path length. Studio layers separate in 3D and assemble into a scene. Studio availability and supported sources remain qualified by release notes in the FAQ.

**Playground.** Float/Bounce/Wiggle choices form a three-column row at every size, with Bounce initially active in the middle. Desktop choices use (86px) minimum height, vertically arranged icon/label, and a selected lift (-4px). The range spans (.5–2×), step (.1). Native Web Animations supplies the loop: Bounce (1800ms), Float/Wiggle (3800ms); speed changes call `updatePlaybackRate` without recreating the animation or changing Motion transition duration. Mode/active changes cancel and replace the loop, and document-hidden state pauses playback. Dragging has bounded movement, elastic resistance (.08), and no momentum. Arrow keys move (16px); Home resets. The “Move your little buddy” disclosure provides single-click directions (20px); reset remains visible. The demo explicitly requests no microphone access. Automatic pose loops stop while paused or outside the visibility margin.

**Gallery and outputs.** Preserve the current five-device gallery geometry, phone sizes, and scroll-fan animation. The center defaults to Home and changes through pressed-state choices, previous/next buttons, or horizontal mobile swipe; a position count and announced selection accompany it. These controls only choose the central screenshot: do not convert the composition into a separate carousel layout. Mobile swipe retains vertical scrolling and pinch zoom. The two output panels have independent scroll rotation and translation. The overlay panel uses the actual supplied WebM loop, muted/inline, poster-backed, and `preload="none"`; it pauses outside its (80px) visibility margin, when the document is hidden, or when motion is paused.

**Motion fallback.** Manual pause or operating-system reduced motion disables optional transforms, animations, transitions, and smooth scrolling. Every story act becomes a relative element in normal flow; chapter controls and connecting thread disappear, and static offsets retain readable layered imagery and the screenshot fan. Preserve this flow change rather than freezing stacked acts in place.

**CreatorCorner.** “More love. More Tubely.” introduces a Trakteer support action linking to `https://trakteer.id/clynomious`. A supplied mascot peeks over a cup, with three scroll-traveling hearts, a clipped reveal, and mouse-only pointer tilt (spring stiffness 100, damping 22). The frame opens from `inset(8% 4% 8% 4% round 45px)` to an unclipped (28px) corner composition. Focus-within removes clipping immediately; pause removes frame clipping/transforms and card/mascot transforms. The support card uses a (1.15fr 1fr) split, (35px) gap, and (460px) minimum height, stacking on mobile with (25px) corners. Rose is the support action only.

**Creator links and credit.** GitHub, Instagram, and TikTok use the matching Phosphor brand icons, visible names, and accessible labels for `@clynomious`; destination URLs live in `src/lib/site.ts`. Social links lift (-5px) and rotate (-2deg) on enabled hover. The footer reads “Built with [heart] by Cly”; the heart includes screen-reader “love,” and Cly links to the creator's GitHub. Preserve brand-correct icons and the personal credit.

**FAQ and download.** Native details/summary rows rotate the plus (45deg) on open. Header, hero, and final download actions share a live GitHub release provider: choose the newest published valid APK by publish time, including beta/preview releases. Cache successful lookup for (5 minutes), refresh when visible, and deduplicate requests. A normal click refreshes within that cache policy and navigates directly to the APK; checking state announces “Checking…”, and unavailable lookup offers the release list. Modified clicks retain native anchor behavior. The final CTA and release caption share an inline-flex column capped at (290px), with a (12px) gap and centered metadata; Android 8.0+ and resolved version occupy one line, with “Preview release” on its own line when applicable. Preserve checking/unavailable fallbacks. Never hard-code a version or assume stable-only selection. Keep the wordmark, SVG ribbon, and English status copy. Source fetching behavior is documented without claiming a successful live lookup.

## Do's and Don'ts

### Do:
- **Do** state PNGTuber and live streaming clearly while retaining Tubely's kawaii Android identity.
- **Do** preserve source-backed SVG storytelling, real screenshots, and concise large-type copy.
- **Do** unfold every story act when paused or reduced motion is requested.
- **Do** preserve direct dragging, keyboard movement, single-click directions, focus, and video visibility handling.
- **Do** keep all visible, metadata, and accessibility copy English; preserve live-release fallbacks and completion-locked jelly assembly.
- **Do** qualify Studio features by release notes; use Android 8.0+, local/LAN overlay wording, and `.tbly` for profile backups.

### Don't:
- **Don't** restore obsolete three-phone galleries, selectable three-output cards, browser-window playground chrome, or filler captions.
- **Don't** invent product claims, metrics, testimonials, platform partnerships, or tonal ramps.
- **Don't** describe video recording, actual website microphone capture, or a tested/released website without the corresponding authorized action.
- **Don't** change avatar opacity automatically when toggling click-through; keep the app setting separate and explain Android's cross-app restriction.
