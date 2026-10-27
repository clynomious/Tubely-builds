'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const frames = {
  float: ['translateY(0) scaleY(1)', 'translateY(-22px) scaleY(1.03)', 'translateY(0) scaleY(1)'],
  bounce: ['translateY(0) scaleY(1)', 'translateY(-48px) scaleY(1.09) rotate(-4deg)', 'translateY(0) scaleY(.91) rotate(4deg)', 'translateY(-16px) scaleY(1.04) rotate(-2deg)', 'translateY(0) scaleY(1)'],
  wiggle: ['translateY(0) rotate(-10deg)', 'translateY(-8px) rotate(10deg)', 'translateY(0) rotate(-10deg)'],
};

export function DemoMotion({ mode, speed, active, children }: {
  mode: keyof typeof frames; speed: number; active: boolean; children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const loop = el.animate(frames[mode].map(transform => ({ transform })), {
      duration: mode === 'bounce' ? 1800 : 3800, iterations: Infinity, easing: 'ease-in-out',
    });
    animation.current = loop;
    loop.updatePlaybackRate(speedRef.current);
    const visibility = () => { if (document.hidden) loop.pause(); else loop.play(); };
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => { document.removeEventListener('visibilitychange', visibility); loop.cancel(); animation.current = null; };
  }, [mode, active]);

  useEffect(() => { animation.current?.updatePlaybackRate(speed); }, [speed]);
  return <div ref={ref}>{children}</div>;
}
