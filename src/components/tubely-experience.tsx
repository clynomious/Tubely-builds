'use client';

import Image from 'next/image';
import { AnimatePresence, MotionConfig, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, ArrowsOut, Broadcast, Check, Coffee, Flower, GithubLogo, Heart, InstagramLogo, LinkSimple, Microphone, MoonStars, Pause, Play, Plus, Sparkle, Star, TiktokLogo, X } from '@phosphor-icons/react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { WeightedScroll, useWeightedNavigation } from './weighted-scroll';
import { LatestReleaseProvider, DownloadLink, ReleaseCaption } from './latest-release';
import { DemoMotion } from './demo-motion';
import { AmbientBackground } from './ambient-background';
import { useSceneScroll } from './use-scene-scroll';
import { staticImageLoader } from '@/lib/static-image-loader';

const MotionPreference = createContext(false);

function SkipLink() {
  const navigate = useWeightedNavigation();
  return <a href="#main" className="skip-link" onClick={event => {
    event.preventDefault();
    event.stopPropagation();
    const main = document.getElementById('main');
    if (!main) return;
    navigate(main.getBoundingClientRect().top + window.scrollY);
    main.focus({ preventScroll: true });
  }}>Skip to content</a>;
}
const screens = [
  { key: 'home', label: 'Home' }, { key: 'avatars', label: 'Avatar' },
  { key: 'expressions', label: 'Expressions' }, { key: 'voice', label: 'Voice' },
  { key: 'motion', label: 'Motion' }, { key: 'studio', label: 'Studio Live' },
  { key: 'settings', label: 'Settings' },
];

function BrandImage({ name, alt = '', className = '', eager = false, width = 640, height = 640, sizes = '(max-width: 700px) 80vw, 520px' }: {
  name: string; alt?: string; className?: string; eager?: boolean; width?: number; height?: number; sizes?: string;
}) {
  return <Image src={`/images/${name}.webp`} alt={alt} width={width} height={height} className={className}
    loader={name.startsWith('letter-') ? undefined : staticImageLoader} unoptimized={name.startsWith('letter-')}
    loading={eager || name === 'mascot' ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} sizes={sizes} draggable={false} />;
}

function Phone({ screen, eager = false }: { screen: string; eager?: boolean }) {
  return <div className="phone"><Image src={`/images/screen-${screen}.webp`}
    alt={`Tubely ${screens.find(s => s.key === screen)?.label ?? screen} screen`} width={640} height={1423}
    loader={staticImageLoader} unoptimized={false} sizes="(max-width: 640px) 178px, (max-width: 800px) 190px, 228px" loading={eager || screen === 'studio' || screen === 'home' ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} draggable={false} />
    <span className="phone-camera" aria-hidden="true" /></div>;
}

function OverlayLoop() {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useInView(ref, { margin: '80px' });
  const paused = useContext(MotionPreference);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (visible && !paused && !document.hidden) void el.play().catch(() => {});
      else el.pause();
    };
    update();
    document.addEventListener('visibilitychange', update);
    return () => { el.pause(); document.removeEventListener('visibilitychange', update); };
  }, [visible, paused]);
  return <video ref={ref} loop muted playsInline preload="none" poster="/images/overlay-poster.webp" aria-label="Animated Tubely overlay"><source src="/media/tubely-overlay.webm" type="video/webm" /></video>;
}

// Geometric signal traces carry the voice-to-broadcast narrative.
function SignalOrbit({ progress }: { progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const length = useTransform(progress, [0, .65, 1], [.1, .9, 1]);
  const turn = useTransform(progress, [0, 1], [-35, 40]);
  return <motion.svg className="signal-orbit" viewBox="0 0 600 600" fill="none" aria-hidden="true" style={paused ? undefined : { rotate: turn }}>
    <circle cx="300" cy="300" r="245" stroke="currentColor" strokeOpacity=".18" />
    <motion.ellipse cx="300" cy="300" rx="275" ry="150" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ pathLength: paused ? 1 : length }} transform="rotate(-28 300 300)" />
    <motion.ellipse cx="300" cy="300" rx="275" ry="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" style={{ pathLength: paused ? 1 : length }} transform="rotate(32 300 300)" />
    <circle cx="70" cy="215" r="9" fill="currentColor" /><circle cx="522" cy="390" r="5" fill="currentColor" />
  </motion.svg>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const paused = useContext(MotionPreference);
  const p = useSceneScroll(ref, 'exit', !paused);
  const headlineY = useTransform(p, [0, 1], [0, -150]);
  const headlineX = useTransform(p, [0, 1], [0, -90]);
  const catY = useTransform(p, [0, 1], [0, 180]);
  const catTurn = useTransform(p, [0, 1], [-8, 20]);
  const phoneY = useTransform(p, [0, 1], [0, -230]);
  const phoneRotate = useTransform(p, [0, 1], [20, -18]);
  const bloom = useTransform(p, [0, 1], [1, 1.5]);
  const px = useMotionValue(0), py = useMotionValue(0);
  const tiltX = useSpring(py, { stiffness: 90, damping: 20 }), tiltY = useSpring(px, { stiffness: 90, damping: 20 });
  const [pets, setPets] = useState(0);
  return <section className="hero-scene" id="home" ref={ref}><div className="hero-grid wrap">
    <motion.div className="hero-planet" style={paused ? undefined : { scale: bloom }} aria-hidden="true" />
    <motion.div className="hero-heading" style={paused ? undefined : { y: headlineY, x: headlineX }}>
      <h1><span className="hero-line"><span>Your character.</span></span><span className="hero-line hero-line-purple"><span>Your kind of live.</span></span></h1><p className="hero-copy-entry">PNGTuber & live streaming for Android.<br className="desktop-break" /> Bring your little world to life.</p>
      <div className="hero-actions hero-actions-entry"><DownloadLink /><a className="text-link" href="#story">Take a look <ArrowDown /></a></div>
    </motion.div>
    <div className="hero-space" onPointerMove={e => {
      if (paused || e.pointerType !== 'mouse') return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width - .5) * 20); py.set(-((e.clientY - r.top) / r.height - .5) * 14);
    }} onPointerLeave={() => { px.set(0); py.set(0); }}>
      <SignalOrbit progress={p} />
      <motion.div className="hero-device" style={paused ? undefined : { y: phoneY, rotate: phoneRotate, rotateY: -24 }}><div className="hero-device-entry"><Phone screen="studio" eager /></div></motion.div>
      <motion.div className="hero-mascot-travel" style={paused ? undefined : { y: catY, rotate: catTurn }}>
        <motion.button className="hero-mascot" aria-label="Pet the Tubely mascot" onClick={() => setPets(n => n + 1)} style={paused ? undefined : { rotateX: tiltX, rotateY: tiltY }} whileTap={paused ? undefined : { scale: .92 }}>
          <div className="hero-mascot-entry"><BrandImage name="mascot" eager sizes="(max-width: 700px) 68vw, 440px" /></div>
          <AnimatePresence>{pets > 0 && <motion.span key={pets} className="pet-heart" initial={paused ? false : { scale: .4, y: 0, opacity: 1 }} animate={{ scale: 1.5, y: paused ? 0 : -150, opacity: 0 }} transition={{ duration: paused ? .15 : 1.2 }}><Heart weight="fill" /></motion.span>}</AnimatePresence>
        </motion.button>
      </motion.div>
      <motion.span className="hero-flower" style={paused ? undefined : { rotate: phoneRotate }} aria-hidden="true"><Flower weight="fill" /></motion.span><Star className="hero-star" weight="fill" aria-hidden="true" />
    </div><span className="hero-live-seal"><Broadcast weight="bold" /> PNGTuber + Live</span>
  </div></section>;
}

type MoveLetter = (dx: number, dy: number, reset?: boolean) => void;
function JellyLetter({ letter, index, progress, ready }: {
  letter: string; index: number; progress: MotionValue<number>; ready: boolean;
}) {
  const paused = useContext(MotionPreference);
  const x = useTransform(progress, [0, .45], [(index - 2.5) * 105, 0]);
  const y = useTransform(progress, [0, .45], [index % 2 ? 120 : -120, 0]);
  const rotate = useTransform(progress, [0, .45], [index % 2 ? 50 : -50, (index - 2.5) * -3]);
  const dragX = useMotionValue(0), dragY = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const move = useCallback<MoveLetter>((dx, dy, reset = false) => {
    if (reset) { dragX.set(0); dragY.set(0); return; }
    dragX.set(Math.max(-100, Math.min(100, dragX.get() + dx)));
    dragY.set(Math.max(-80, Math.min(80, dragY.get() + dy)));
  }, [dragX, dragY]);
  return <motion.div className="jelly-letter" style={{ ...(paused ? {} : ready ? { x: 0, y: 0, rotate: (index - 2.5) * -3 } : { x, y, rotate }), zIndex: dragging ? 30 : 1 }}>
    <motion.button className="jelly-toy" disabled={!ready} data-ready={ready} data-lenis-prevent
      aria-label={`Move letter ${letter.toUpperCase()}. Use arrow keys to move or Home to reset.`}
      drag={ready} dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }} dragMomentum={false} dragElastic={paused ? 0 : .06}
      style={{ x: dragX, y: dragY }} onDragStart={() => setDragging(true)} onDragEnd={() => setDragging(false)}
      onDoubleClick={() => move(0, 0, true)} onKeyDown={event => {
        const dx = event.key === 'ArrowLeft' ? -16 : event.key === 'ArrowRight' ? 16 : 0;
        const dy = event.key === 'ArrowUp' ? -16 : event.key === 'ArrowDown' ? 16 : 0;
        if (dx || dy || event.key === 'Home') {
          event.preventDefault();
          move(dx, dy, event.key === 'Home');
        }
      }} whileHover={paused || !ready ? undefined : { scale: 1.1, rotate: index % 2 ? 8 : -8 }}
      whileDrag={paused ? undefined : { scale: 1.06 }} transition={{ type: 'spring', stiffness: 260, damping: 19 }}>
      <BrandImage name={`letter-${letter}`} sizes="(max-width: 700px) 16vw, 190px" />
    </motion.button>
  </motion.div>;
}

function BrandAssembly() {
  const ref = useRef<HTMLElement>(null);
  const paused = useContext(MotionPreference);
  const unlocked = useRef(false);
  const [entered, setEntered] = useState(false);
  const scrollYProgress = useSceneScroll(ref, 'through', !paused && !entered);
  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (value >= .5 && !unlocked.current) { unlocked.current = true; setEntered(true); }
  });
  useEffect(() => {
    if (scrollYProgress.get() >= .5) { unlocked.current = true; setEntered(true); }
  }, [scrollYProgress]);
  return <section className="brand-assembly" ref={ref} aria-label="Play with the Tubely letters"><div className="jelly-word wrap">{['t', 'u', 'b', 'e', 'l', 'y'].map((letter, index) => <JellyLetter key={letter} letter={letter} index={index} progress={scrollYProgress} ready={paused || entered} />)}</div></section>;
}

const storySteps = [
  { title: <>Meet your<br /><em>other you.</em></>, description: 'Two pictures. That’s all you need to start.', label: 'Character' },
  { title: <>You talk.<br /><em>They come alive.</em></>, description: 'Just start talking. Your avatar follows along.', label: 'Voice' },
  { title: <>Make room<br /><em>for your world.</em></>, description: 'Mix your avatar, screen, images, and text.', label: 'Studio' },
  { title: <>You’re on.<br /><em>Say hello!</em></>, description: 'Go live from Android with Studio Live.', label: 'Live' },
];

function StoryWave({ progress }: { progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const length = useTransform(progress, [.15, .45], [0, 1]);
  return <svg className="story-wave" viewBox="0 0 620 180" fill="none" aria-hidden="true"><path d="M0 90H620" stroke="currentColor" strokeOpacity=".15" strokeDasharray="3 9" /><motion.path d="M0 90H50L70 70L90 110L115 40L140 140L165 15L190 165L215 60L240 120L265 30L290 150L315 10L340 170L365 40L390 140L415 65L440 115L465 30L490 150L515 55L540 120L565 75L590 90H620" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: paused ? 1 : length }} /></svg>;
}

function CharacterScene({ progress }: { progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const leftX = useTransform(progress, [0, .2], [-65, -155]);
  const rightX = useTransform(progress, [0, .2], [65, 155]);
  const turn = useTransform(progress, [0, .2], [-22, -5]);
  return <div className="character-scene scene-visual"><SignalOrbit progress={progress} />
    <motion.div className="pose-sheet sheet-idle" style={paused ? undefined : { x: leftX, rotateY: turn, rotate: -12 }}><BrandImage name="mascot" sizes="(max-width: 800px) 140px, 196px" /><span>Idle</span></motion.div>
    <motion.div className="pose-sheet sheet-speaking" style={paused ? undefined : { x: rightX, rotateY: turn, rotate: 12 }}><BrandImage name="mascot" sizes="(max-width: 800px) 140px, 196px" /><span>Speaking</span></motion.div><span className="scene-plus" aria-hidden="true"><Plus weight="bold" /></span>
  </div>;
}

function VoiceScene({ progress }: { progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const y = useTransform(progress, [.18, .28, .34, .40, .48], [20, -30, 12, -28, 15]);
  const scaleY = useTransform(progress, [.18, .28, .34, .40, .48], [1, 1.06, .95, 1.05, 1]);
  return <div className="voice-scene scene-visual"><SignalOrbit progress={progress} /><StoryWave progress={progress} /><motion.div className="voice-avatar" style={paused ? undefined : { y, scaleY }}><BrandImage name="mascot" sizes="(max-width: 640px) 220px, 310px" /></motion.div><span className="voice-mic"><Microphone weight="fill" /></span></div>;
}

function SceneLayer({ type, index, progress }: { type: 'avatar' | 'image' | 'text'; index: number; progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const y = useTransform(progress, [.43, .57, .72], [120 + index * 65, index * -40, index * -8]);
  const z = useTransform(progress, [.43, .57, .72], [index * 100, index * 75, index * 10]);
  const rotateX = useTransform(progress, [.43, .62, .73], [58, 35, 0]);
  return <motion.div className={`scene-layer layer-${type}`} style={paused ? undefined : { y, z, rotateX, rotateZ: -12 }}>
    {type === 'avatar' ? <BrandImage name="mascot" sizes="(max-width: 640px) 150px, 210px" /> : type === 'image' ? <><MoonStars weight="duotone" /><span className="landscape-shape" /></> : <span className="layer-copy">Hello,<br />everyone!</span>}
  </motion.div>;
}

function StudioScene({ progress }: { progress: MotionValue<number> }) {
  return <div className="studio-scene scene-visual"><div className="layer-stack"><SceneLayer type="image" index={0} progress={progress} /><SceneLayer type="text" index={1} progress={progress} /><SceneLayer type="avatar" index={2} progress={progress} /></div></div>;
}

function LiveScene({ progress }: { progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const rotateY = useTransform(progress, [.68, .86, 1], [-42, -8, 12]);
  const rotateZ = useTransform(progress, [.68, 1], [-12, 8]);
  const scale = useTransform(progress, [.68, .85, 1], [.65, 1, 1.05]);
  const ring1 = useTransform(progress, [.7, .9], [.1, 1]);
  const ring2 = useTransform(progress, [.8, 1], [.1, 1]);
  return <div className="live-scene scene-visual"><svg className="broadcast-svg" viewBox="0 0 640 640" fill="none" aria-hidden="true"><motion.circle cx="320" cy="320" r="195" stroke="currentColor" strokeWidth="2" strokeDasharray="5 12" style={{ pathLength: paused ? 1 : ring1 }} /><motion.circle cx="320" cy="320" r="265" stroke="currentColor" strokeWidth="2" style={{ pathLength: paused ? 1 : ring2 }} /><motion.circle cx="320" cy="320" r="300" stroke="currentColor" strokeOpacity=".2" style={{ scale: paused ? 1 : scale }} /></svg>
    <motion.div className="live-device" style={paused ? undefined : { rotateY, rotateZ, scale }}><Phone screen="studio" /></motion.div><span className="on-air"><Broadcast weight="fill" /> LIVE</span>
  </div>;
}

function StoryAct({ index, progress, active }: { index: number; progress: MotionValue<number>; active: number }) {
  const paused = useContext(MotionPreference);
  const start = index / 4, end = (index + 1) / 4;
  const input = index === 0 ? [0, end - .06, end + .035] : index === 3 ? [start - .06, start + .035, 1] : [start - .06, start + .035, end - .06, end + .035];
  const opacity = useTransform(progress, input, index === 0 ? [1, 1, 0] : index === 3 ? [0, 1, 1] : [0, 1, 1, 0]);
  const visibility = useTransform(opacity, value => value === 0 ? 'hidden' : 'visible');
  // Freeze descendants only while this act is completely transparent; keep both
  // sides of each crossfade live, including when the visitor scrolls backward.
  const sceneProgress = useTransform(progress, value => Math.max(input[0], Math.min(input[input.length - 1], value)));
  sceneProgress.accelerate = progress.accelerate;
  const y = useTransform(sceneProgress, [Math.max(0, start - .06), start + .04, end], [index === 0 ? 0 : 65, 0, -45]);
  const rotateY = useTransform(sceneProgress, [Math.max(0, start - .06), start + .08, end], [index === 0 ? 0 : -15, 0, 12]);
  const Visual = [CharacterScene, VoiceScene, StudioScene, LiveScene][index];
  return <motion.article id={`story-${index}`} className={`story-act act-${index}`} aria-hidden={paused ? undefined : active !== index} style={paused ? undefined : { opacity, visibility, pointerEvents: active === index ? 'auto' : 'none' }}>
    <motion.div className="story-copy" style={paused ? undefined : { y }}><h2>{storySteps[index].title}</h2><p>{storySteps[index].description}</p></motion.div><motion.div className="story-visual" style={paused ? undefined : { rotateY }}><Visual progress={sceneProgress} /></motion.div>
  </motion.article>;
}

function StoryTint({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const stops = [0, .3, .6, 1];
  const colors = ['#eee0fb', '#f9dfea', '#e3efea', '#e7d8fa'];
  const opacity = useTransform(progress, [stops[index - 1], stops[index]], [0, 1]);
  const visibility = useTransform(progress, value => value <= stops[index - 1] || (index < 3 && value >= stops[index + 1]) ? 'hidden' : 'visible');
  return <motion.div className="story-tint" style={{ backgroundColor: colors[index], opacity, visibility }} />;
}

function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useWeightedNavigation();
  const paused = useContext(MotionPreference);
  const p = useSceneScroll(ref, 'pinned', !paused);
  const [active, setActive] = useState(0);
  const currentStep = useRef(0);
  const threadLength = useTransform(p, [0, 1], [.04, 1]);
  useMotionValueEvent(p, 'change', value => {
    const next = Math.min(3, Math.floor(Math.max(0, value) * 4));
    if (next !== currentStep.current) { currentStep.current = next; setActive(next); }
  });
  function goTo(index: number) {
    if (paused) { document.getElementById(`story-${index}`)?.scrollIntoView({ behavior: 'instant', block: 'center' }); return; }
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    navigate(top + Math.max(0, el.offsetHeight - window.innerHeight) * ((index + .45) / 4));
  }
  return <section className="story-scroll" id="story" ref={ref} aria-label="From character to live stream"><div className="story-sticky">
    {!paused && <div className="story-atmosphere" aria-hidden="true">{[1, 2, 3].map(index => <StoryTint key={index} index={index} progress={p} />)}</div>}
    <svg className="story-thread" viewBox="0 0 1400 800" fill="none" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M-30 700C160 700 110 170 350 180S500 720 750 650S850 50 1120 100S1230 600 1450 400" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ pathLength: paused ? 1 : threadLength }} /></svg>
    {!paused && <div className="sr-only"><h2>From avatar to live stream</h2>{storySteps.map(step => <div key={step.label}><h3>{step.title}</h3><p>{step.description}</p></div>)}</div>}
    <div className="story-stage wrap" aria-hidden={paused ? undefined : true}>{storySteps.map((_, index) => <StoryAct key={index} index={index} progress={p} active={active} />)}</div>
    <div className="story-chapters" role="group" aria-label="Choose a scene">{storySteps.map((step, index) => <button key={step.label} onClick={() => goTo(index)} aria-pressed={active === index}><span>{step.label}</span><i aria-hidden="true" /></button>)}</div>
    {!paused && <p className="sr-only" role="status" aria-atomic="true">{storySteps[active].label}. {storySteps[active].description}</p>}
  </div></section>;
}

function Playground() {
  const ref = useRef<HTMLElement>(null), bounds = useRef<HTMLDivElement>(null), actor = useRef<HTMLDivElement>(null);
  const paused = useContext(MotionPreference);
  const visible = useInView(ref, { margin: '100px' });
  const p = useSceneScroll(ref, 'through', !paused);
  const turn = useTransform(p, [0, .45, 1], [18, 0, -8]);
  const catScale = useTransform(p, [0, .45, 1], [.8, 1, 1.07]);
  const [mode, setMode] = useState<'float' | 'bounce' | 'wiggle'>('bounce');
  const [speed, setSpeed] = useState(1), [color, setColor] = useState('lilac');
  const x = useMotionValue(0), y = useMotionValue(0);
  function move(dx: number, dy: number) {
    const maxX = Math.max(0, ((bounds.current?.clientWidth ?? 250) - (actor.current?.clientWidth ?? 250)) / 2);
    const maxY = Math.max(0, ((bounds.current?.clientHeight ?? 250) - (actor.current?.clientHeight ?? 250)) / 2);
    x.set(Math.max(-maxX, Math.min(maxX, x.get() + dx))); y.set(Math.max(-maxY, Math.min(maxY, y.get() + dy)));
  }
  return <section className="playground-section" ref={ref} id="playground"><div className="wrap"><div className="section-heading"><h2>A little bounce.<br /><em>A lot of you.</em></h2><p>Go on. Play a little.</p></div>
    <div className="playground-layout"><motion.div className={`play-stage stage-${color}`} ref={bounds} style={paused ? undefined : { rotateX: turn }}><SignalOrbit progress={p} />
      <motion.div className="draggable-mascot" ref={actor} drag dragConstraints={bounds} dragElastic={.08} dragMomentum={false} style={{ x, y }} tabIndex={0} role="group" aria-label="Drag your avatar or use the arrow keys. Press Home to reset." onKeyDown={e => {
        const dx = e.key === 'ArrowLeft' ? -16 : e.key === 'ArrowRight' ? 16 : 0, dy = e.key === 'ArrowUp' ? -16 : e.key === 'ArrowDown' ? 16 : 0;
        if (dx || dy || e.key === 'Home') { e.preventDefault(); if (e.key === 'Home') { x.set(0); y.set(0); } else move(dx, dy); }
      }}><motion.div style={paused ? undefined : { scale: catScale }}><DemoMotion mode={mode} speed={speed} active={!paused && visible}><BrandImage name="mascot" sizes="(max-width: 640px) 205px, 270px" /></DemoMotion></motion.div></motion.div>
      <span className="stage-shadow" aria-hidden="true" /><button className="stage-reset" onClick={() => { x.set(0); y.set(0); }}><ArrowsOut /> Reset position</button>
    </motion.div><div className="play-controls"><div className="motion-choices" role="group" aria-label="Avatar motion">{[
      { id: 'float' as const, label: 'Float', icon: MoonStars }, { id: 'bounce' as const, label: 'Bounce', icon: ArrowUpRight }, { id: 'wiggle' as const, label: 'Wiggle', icon: Sparkle },
    ].map(item => <button key={item.id} aria-pressed={mode === item.id} onClick={() => setMode(item.id)}><item.icon weight="bold" />{item.label}<span>{mode === item.id && <Check weight="bold" />}</span></button>)}</div>
    <label htmlFor="speed" className="speed-label">Speed <output>{speed.toFixed(1)}×</output></label><input id="speed" data-lenis-prevent type="range" min=".5" max="2" step=".1" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
    <div className="background-controls"><span>Stage</span><div role="group" aria-label="Stage color">{['lilac', 'peach', 'mint'].map(c => <button key={c} className={`swatch swatch-${c}`} aria-label={`${c} stage`} aria-pressed={color === c} onClick={() => setColor(c)}>{color === c && <Check weight="bold" />}</button>)}</div></div>
    <details className="position-controls"><summary>Move your little buddy <Plus /></summary><div role="group" aria-label="Move the avatar without dragging">{[
      { label: 'left', dx: -20, dy: 0, angle: 180 }, { label: 'up', dx: 0, dy: -20, angle: 270 }, { label: 'down', dx: 0, dy: 20, angle: 90 }, { label: 'right', dx: 20, dy: 0, angle: 0 },
    ].map(d => <button key={d.label} aria-label={`Move ${d.label}`} onClick={() => move(d.dx, d.dy)}><ArrowRight style={{ rotate: `${d.angle}deg` }} /></button>)}</div></details><p className="demo-note">Just a motion demo. Your mic stays off.</p></div></div>
  </div></section>;
}

function GalleryPhone({ screen, index, progress }: { screen: string; index: number; progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference), slot = index - 2;
  const x = useTransform(progress, [0, .48, 1], [slot * 25, slot * 195, slot * 220]);
  const y = useTransform(progress, [0, .48, 1], [Math.abs(slot) * 85, Math.abs(slot) * 35, Math.abs(slot) * -50]);
  const rotate = useTransform(progress, [0, .48, 1], [slot * 22, slot * 9, slot * -5]);
  const rotateY = useTransform(progress, [0, .48, 1], [slot * -25, slot * -8, slot * 12]);
  return <motion.div className={`fan-phone fan-${index}`} style={paused ? undefined : { x, y, rotate, rotateY, zIndex: 5 - Math.abs(slot) }}><Phone screen={screen} /></motion.div>;
}

function AppGallery() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState('home');
  const paused = useContext(MotionPreference);
  const p = useSceneScroll(ref, 'through', !paused);
  const headlineX = useTransform(p, [0, 1], [70, -70]);
  const activeIndex = screens.findIndex(screen => screen.key === active);
  function changeScreen(direction: number) {
    setActive(current => screens[(screens.findIndex(screen => screen.key === current) + direction + screens.length) % screens.length].key);
  }
  return <section className="gallery-section" id="inside" ref={ref}><motion.div className="gallery-title wrap" style={paused ? undefined : { x: headlineX }}><h2>Your whole setup.<br /><em>Right here.</em></h2></motion.div>
    <motion.div className="phone-fan" aria-hidden="true" onPanEnd={(_, info) => {
      if (!window.matchMedia('(max-width: 640px)').matches) return;
      if (Math.abs(info.offset.x) >= 45 && Math.abs(info.offset.x) > Math.abs(info.offset.y) * 1.2) changeScreen(info.offset.x < 0 ? 1 : -1);
    }}>{['avatars', 'expressions', active, 'motion', 'studio'].map((screen, index) => <GalleryPhone key={index} screen={screen} index={index} progress={p} />)}</motion.div>
    <div className="gallery-controls wrap"><div className="gallery-tabs" role="group" aria-label="App screens">{screens.map(screen => <button key={screen.key} aria-pressed={active === screen.key} onClick={() => setActive(screen.key)}>{screen.label}</button>)}</div>
      <div className="gallery-navigation" role="group" aria-label="Screenshot navigation"><button onClick={() => changeScreen(-1)} aria-label="Previous screenshot"><ArrowRight style={{ rotate: '180deg' }} /></button><span aria-hidden="true">{activeIndex + 1} / {screens.length}</span><button onClick={() => changeScreen(1)} aria-label="Next screenshot"><ArrowRight /></button></div>
      <span className="sr-only" role="status">Selected screen: {screens.find(s => s.key === active)?.label}</span></div>
  </section>;
}

function OutputDemo({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const rotate = useTransform(progress, [0, .5, 1], [index === 0 ? -22 : 22, index === 0 ? -5 : 5, index === 0 ? 8 : -8]);
  const y = useTransform(progress, [0, .5, 1], [90, 0, -50]);
  return <motion.article className={`output-panel output-${index}`} style={paused ? undefined : { rotate, y }}>
    {index === 0 ? <div className="floating-demo"><div className="floating-phone"><div /><div /><MoonStars weight="duotone" /><div /></div><BrandImage name="mascot" sizes="175px" /></div> : <div className="url-demo"><div className="url-address"><LinkSimple /> Overlay URL</div><OverlayLoop /></div>}
    <h3>{index === 0 ? 'Your little plus-one.' : 'Small buddy. Bigger screen.'}</h3><p>{index === 0 ? 'A floating avatar that hangs out above your other apps.' : 'Use your overlay URL on your phone or a PC on the same network.'}</p>
  </motion.article>;
}

function Outputs() {
  const ref = useRef<HTMLElement>(null);
  const paused = useContext(MotionPreference);
  const scrollYProgress = useSceneScroll(ref, 'through', !paused);
  return <section className="outputs-section" ref={ref}><div className="wrap"><h2>Take your character.<br /><em>Find your stage.</em></h2><div className="outputs-grid"><OutputDemo index={0} progress={scrollYProgress} /><OutputDemo index={1} progress={scrollYProgress} /></div></div></section>;
}

const faqs = [
  ['So… what’s Tubely?', 'A PNGTuber and live streaming app for Android. You talk, your avatar comes alive. Pick Studio Live, a floating window, or an overlay URL to share it with the world.'],
  ['Do I need a 3D model or a camera?', 'Nope. Start with two pictures: idle and speaking. Add blink and muted poses if you like. No camera needed for your avatar to react to your voice.'],
  ['Can I go live straight from my phone?', 'Yep, with Studio Live. Build your scene, then use the URL and stream key from your streaming platform. Live access depends on your platform and account. Check the release notes for available features.'],
  ['Will it work on my phone?', 'You’ll need Android 8.0 or newer. Mic and overlay permissions are requested when you use the features that need them.'],
  ['Can I use it with OBS?', 'You can. Add your overlay URL as a browser source. Keep your phone and PC on the same reachable network, with the Tubely overlay running.'],
];

function FAQ() {
  return <section className="faq-section wrap" id="faq"><h2>Curious?<br /><em>Good.</em></h2><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<Plus weight="bold" /></summary><p>{a}</p></details>)}</div></section>;
}

function SupportHeart({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const paused = useContext(MotionPreference);
  const y = useTransform(progress, [0, .5, 1], [100 + index * 25, -20 - index * 30, -155 - index * 20]);
  const x = useTransform(progress, [0, 1], [(index - 1) * 25, (index - 1) * 80]);
  const rotate = useTransform(progress, [0, 1], [-25 + index * 20, 30 - index * 15]);
  return <motion.span className={`support-heart heart-${index}`} style={paused ? undefined : { x, y, rotate }} aria-hidden="true"><Heart weight="fill" /></motion.span>;
}

function CreatorCorner() {
  const ref = useRef<HTMLElement>(null);
  const paused = useContext(MotionPreference);
  const p = useSceneScroll(ref, 'through', !paused);
  const lift = useTransform(p, [0, .4, 1], [90, 0, -30]);
  const rotate = useTransform(p, [0, .4, 1], [-5, 0, 2]);
  const peek = useTransform(p, [0, .5, 1], [75, 0, -20]);
  const clipPath = useTransform(p, [0, .4], ['inset(8% 4% 8% 4% round 45px)', 'inset(0% 0% 0% 0% round 28px)']);
  const px = useMotionValue(0), py = useMotionValue(0);
  const tiltX = useSpring(py, { stiffness: 100, damping: 22 }), tiltY = useSpring(px, { stiffness: 100, damping: 22 });
  const socials = [
    { label: 'GitHub', href: site.socials.github, icon: GithubLogo },
    { label: 'Instagram', href: site.socials.instagram, icon: InstagramLogo },
    { label: 'TikTok', href: site.socials.tiktok, icon: TiktokLogo },
  ];
  return <section className="creator-section wrap" id="support" ref={ref}>
    <motion.div className="support-frame" style={paused ? undefined : { y: lift, rotate, clipPath }}>
      <motion.div className="support-card" style={paused ? undefined : { rotateX: tiltX, rotateY: tiltY }} onPointerMove={e => {
        if (paused || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width - .5) * 7); py.set(-((e.clientY - r.top) / r.height - .5) * 6);
      }} onPointerLeave={() => { px.set(0); py.set(0); }}>
        <div className="support-copy"><h2>More love.<br /><em>More Tubely.</em></h2>
          <p>Enjoying your little world? A little support gives me more time to build Tubely and bring the next update closer.</p>
          <motion.a className="button support-button" href={site.support} target="_blank" rel="noopener noreferrer" whileHover={paused ? undefined : { y: -4, rotate: -2 }} whileTap={paused ? undefined : { scale: .97 }}>
            <Coffee weight="fill" /> Support on Trakteer <ArrowUpRight weight="bold" />
          </motion.a>
        </div>
        <div className="support-art" aria-hidden="true"><div className="support-blob" />
          {[0, 1, 2].map(index => <SupportHeart key={index} index={index} progress={p} />)}
          <motion.div className="support-mascot" style={paused ? undefined : { y: peek }}><BrandImage name="mascot" sizes="260px" /></motion.div>
          <Coffee className="support-cup" weight="duotone" /><Flower className="support-flower" weight="fill" />
        </div>
      </motion.div>
    </motion.div>
    <div className="creator-socials"><p>Find me around. <span>{site.username}</span></p><div className="social-links">{socials.map(social =>
      <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} ${site.username}`} whileHover={paused ? undefined : { y: -5, rotate: -2 }} whileTap={paused ? undefined : { scale: .95 }}>
        <social.icon weight={social.label === 'Instagram' ? 'bold' : 'fill'} /><span>{social.label}</span><ArrowUpRight />
      </motion.a>)}</div></div>
  </section>;
}

function Download() {
  const ref = useRef<HTMLElement>(null);
  const paused = useContext(MotionPreference);
  const p = useSceneScroll(ref, 'enter', !paused);
  const scale = useTransform(p, [0, 1], [.6, 1]), rotate = useTransform(p, [0, 1], [-24, 3]), y = useTransform(p, [0, 1], [150, 0]);
  const pathLength = useTransform(p, [0, .9], [0, 1]);
  return <section className="download-section" id="download" ref={ref}><svg className="download-ribbon" viewBox="0 0 1400 600" fill="none" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M-50 450C220 650 220 0 500 160S800 700 1050 380S1220 30 1460 180" stroke="currentColor" strokeWidth="70" strokeLinecap="round" style={{ pathLength: paused ? 1 : pathLength }} /></svg>
    <div className="download-layout wrap"><motion.div className="download-art" style={paused ? undefined : { scale, rotate, y }}><BrandImage name="logo-stacked" alt="Tubely" sizes="(max-width: 640px) 235px, 370px" /></motion.div><div className="download-copy"><h2>Your story.<br /><em>Let’s go live.</em></h2><div className="download-action"><DownloadLink /><ReleaseCaption /></div></div></div>
  </section>;
}

export function TubelyExperience() {
  const systemReduced = useReducedMotion();
  const [manualPause, setManualPause] = useState(false), [menu, setMenu] = useState(false);
  const paused = Boolean(systemReduced || manualPause);
  useEffect(() => {
    if (!menu) return;
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [menu]);
  return <MotionPreference.Provider value={paused}><MotionConfig reducedMotion={paused ? 'always' : 'user'}><LatestReleaseProvider><WeightedScroll enabled={!paused}><div className="experience" data-motion={paused ? 'off' : 'on'}><AmbientBackground paused={paused} /><SkipLink />
    <header className="site-header wrap"><a href="#home" className="brand" aria-label="Tubely, back to top"><BrandImage name="logo" alt="Tubely" eager width={820} height={273} sizes="170px" /></a>
      <nav className={menu ? 'nav-open' : ''} aria-label="Main navigation"><a href="#story" onClick={() => setMenu(false)}>The story</a><a href="#playground" onClick={() => setMenu(false)}>Let’s play</a><a href="#support" onClick={() => setMenu(false)}>Support Tubely</a></nav>
      <div className="header-actions"><button className="motion-toggle" aria-pressed={paused} onClick={() => setManualPause(v => !v)} disabled={Boolean(systemReduced)} aria-label={systemReduced ? 'Animation follows your device settings' : paused ? 'Resume animation and smooth scrolling' : 'Pause animation and smooth scrolling'}>{paused ? <Play weight="fill" /> : <Pause weight="fill" />}</button><DownloadLink className="nav-download">Get Tubely <ArrowUpRight weight="bold" /></DownloadLink><button className="menu-toggle" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>{menu ? <X /> : <Plus />}</button></div>
    </header><main id="main" tabIndex={-1}><Hero /><BrandAssembly /><ScrollStory /><Playground /><AppGallery /><Outputs /><FAQ /><CreatorCorner /><Download /></main>
    <footer className="site-footer wrap"><a className="footer-wordmark" href="#home">Tubely</a><p className="creator-credit">Built with <Heart weight="fill" aria-hidden="true" /><span className="sr-only">love</span> by <a href={site.socials.github} target="_blank" rel="noopener noreferrer">{site.creator}</a></p><a className="footer-releases" href={site.releases} target="_blank" rel="noopener noreferrer">What’s new <ArrowUpRight /></a></footer>
  </div></WeightedScroll></LatestReleaseProvider></MotionConfig></MotionPreference.Provider>;
}
