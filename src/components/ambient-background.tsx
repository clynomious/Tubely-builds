'use client';

import { useScroll, useTransform } from 'motion/react';
import * as motion from 'motion/react-m';
import { useEffect, useState } from 'react';
import { useCompactMotion } from './motion-profile';

function AnimatedBackground({ paused }: { paused: boolean }) {
  const [hidden, setHidden] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [40, -160]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 12]);
  const pathLength = useTransform(scrollYProgress, [0, .5, 1], [.12, .65, 1]);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return <div className="ambient-background" data-running={!paused && !hidden} aria-hidden="true">
    <div className="ambient-cloud cloud-pink" /><div className="ambient-cloud cloud-mint" />
    <motion.div className="ambient-world" style={paused ? undefined : { y, rotate }}>
    <svg viewBox="0 0 1600 1100" fill="none" preserveAspectRatio="xMidYMid slice">
      <motion.path d="M-100 260C270-120 350 790 790 530S1190-40 1710 340" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: paused ? 1 : pathLength }} />
    </svg>
    <svg className="ambient-dashes" viewBox="0 0 1600 1100" fill="none" preserveAspectRatio="xMidYMid slice">
      <path className="ambient-trace" d="M-80 940C300 1110 220 180 690 420S1280 1130 1690 650" stroke="currentColor" strokeWidth="2" strokeDasharray="5 24" />
    </svg>
    <svg viewBox="0 0 1600 1100" fill="none" preserveAspectRatio="xMidYMid slice">
      <circle className="ambient-satellite satellite-one" cx="250" cy="310" r="13" fill="currentColor" />
      <circle className="ambient-satellite satellite-two" cx="1370" cy="800" r="8" fill="currentColor" />
    </svg>
    </motion.div>
  </div>;
}

export function AmbientBackground({ paused }: { paused: boolean }) {
  const compact = useCompactMotion();
  if (compact) return <div className="ambient-background ambient-lite" aria-hidden="true"><div className="ambient-cloud cloud-pink" /><div className="ambient-cloud cloud-mint" /></div>;
  return <AnimatedBackground paused={paused} />;
}
