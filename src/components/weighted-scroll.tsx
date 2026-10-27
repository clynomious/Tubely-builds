'use client';

import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';

type ScrollToPosition = (top: number) => void;
const ScrollNavigation = createContext<ScrollToPosition>(top => window.scrollTo({ top, behavior: 'instant' }));

export function useWeightedNavigation() {
  return useContext(ScrollNavigation);
}

export function WeightedScroll({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const instance = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // Keep native document scrolling so sticky scenes and Motion share one position.
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: .065,
      wheelMultiplier: .8,
      syncTouch: false,
      anchors: { offset: -24, duration: 1.4, lerp: 0 },
      prevent: node => node.hasAttribute('data-lenis-prevent'),
    });
    instance.current = lenis;
    return () => { instance.current = null; lenis.destroy(); };
  }, [enabled]);

  const scrollTo = useCallback((top: number) => {
    if (instance.current) instance.current.scrollTo(top, { duration: 1.4, lerp: 0 });
    else window.scrollTo({ top, behavior: enabled ? 'smooth' : 'instant' });
  }, [enabled]);

  return <ScrollNavigation.Provider value={scrollTo}>{children}</ScrollNavigation.Provider>;
}
