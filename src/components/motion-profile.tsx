'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';

export const COMPACT_MOTION_QUERY = '(max-width: 800px), (max-width: 1100px) and (pointer: coarse)';
export const CompactMotion = createContext(true);

function subscribe(callback: () => void) {
  const query = window.matchMedia(COMPACT_MOTION_QUERY);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

export function useCompactMotionProfile() {
  // Hydrate with the conservative profile so mobile never boots the full scene.
  return useSyncExternalStore(subscribe, () => window.matchMedia(COMPACT_MOTION_QUERY).matches, () => true);
}

export function useCompactMotion() {
  return useContext(CompactMotion);
}
