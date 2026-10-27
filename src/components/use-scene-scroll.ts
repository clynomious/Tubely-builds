'use client';

import { scroll, useMotionValue } from 'motion/react';
import { useEffect, type RefObject } from 'react';

type Offset = NonNullable<NonNullable<Parameters<typeof scroll>[1]>['offset']>;
const ranges: Record<'through' | 'exit' | 'pinned' | 'enter', Offset> = {
  through: ['start end', 'end start'],
  exit: ['start start', 'end start'],
  pinned: ['start start', 'end end'],
  enter: ['start end', 'end end'],
};

// Keep Motion's exact offsets, but only measure scenes near the viewport.
export function useSceneScroll(target: RefObject<HTMLElement | null>, range: keyof typeof ranges = 'through', enabled = true) {
  const progress = useMotionValue(0);

  // Preserve Motion's native ViewTimeline path on supporting mobile browsers.
  // The observer below only gates the JS subscribers (SVG drawing and fallback).
  if (enabled && typeof window !== 'undefined' && 'ViewTimeline' in window) {
    progress.accelerate = {
      factory: animation => {
        let cancelled = false;
        let detach: (() => void) | undefined;
        queueMicrotask(() => {
          if (!cancelled && target.current) {
            detach = scroll(animation, { target: target.current, offset: ranges[range] });
          }
        });
        return () => { cancelled = true; detach?.(); };
      },
      times: [0, 1], keyframes: [0, 1], ease: value => value, duration: 1,
    };
  } else {
    progress.accelerate = undefined;
  }

  useEffect(() => {
    const element = target.current;
    if (!element || !enabled) return;
    let stop: (() => void) | undefined;
    let nearby = false;
    const sync = () => {
      if (nearby && !document.hidden) {
        stop ??= scroll(value => progress.set(value), { target: element, offset: ranges[range] });
      } else {
        stop?.();
        stop = undefined;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      sync();
      if (!nearby) progress.set(entry.boundingClientRect.bottom < 0 ? 1 : 0);
    }, { rootMargin: '320px 0px' });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      stop?.();
    };
  }, [target, range, enabled, progress]);

  return progress;
}
