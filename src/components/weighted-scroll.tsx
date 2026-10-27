'use client';

import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';

type ScrollToPosition = (top: number) => void;
const ScrollNavigation = createContext<ScrollToPosition>(top => window.scrollTo({ top, behavior: 'instant' }));

export function useWeightedNavigation() {
  return useContext(ScrollNavigation);
}

export function WeightedScroll({ enabled, nativeSmooth = enabled, children }: { enabled: boolean; nativeSmooth?: boolean; children: ReactNode }) {
  const instance = useRef<Lenis | null>(null);
  const requestTick = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const tick = (time: number) => {
      frame = 0;
      lenis.raf(time);
      if (lenis.isScrolling === 'smooth') frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame && !document.hidden) {
        lenis.time = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    // Native touch needs no animation loop. Wheel/anchor motion wakes one on demand.
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: .065,
      wheelMultiplier: .8,
      syncTouch: false,
      anchors: { offset: -24, duration: 1.4, lerp: 0, onStart: wake },
      prevent: node => node.hasAttribute('data-lenis-prevent'),
    });
    instance.current = lenis;
    requestTick.current = wake;
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else if (lenis.isScrolling === 'smooth') wake();
    };
    window.addEventListener('wheel', wake, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', wake);
      document.removeEventListener('visibilitychange', visibility);
      requestTick.current = () => {};
      instance.current = null;
      lenis.destroy();
    };
  }, [enabled]);

  const scrollTo = useCallback((top: number) => {
    if (instance.current) {
      instance.current.scrollTo(top, { duration: 1.4, lerp: 0 });
      requestTick.current();
    }
    else window.scrollTo({ top, behavior: nativeSmooth ? 'smooth' : 'instant' });
  }, [nativeSmooth]);

  return <ScrollNavigation.Provider value={scrollTo}>{children}</ScrollNavigation.Provider>;
}
