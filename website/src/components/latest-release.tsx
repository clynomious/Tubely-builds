'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';
import { fetchLatestRelease, RELEASE_CACHE_MS, validRelease, type LatestRelease } from '@/lib/releases';
import { site } from '@/lib/site';

type ReleaseState = { release: LatestRelease | null; status: 'checking' | 'ready' | 'unavailable' };
const ReleaseContext = createContext<ReleaseState & { refresh: () => Promise<LatestRelease | null> }>({
  release: null, status: 'checking', refresh: async () => null,
});
const CACHE_KEY = 'tubely:latest-apk:v1';

export function LatestReleaseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReleaseState>({ release: null, status: 'checking' });
  const cached = useRef<{ release: LatestRelease; checkedAt: number } | null>(null);
  const request = useRef<Promise<LatestRelease | null> | null>(null);
  const controller = useRef<AbortController | null>(null);
  const retryAfter = useRef(0);
  const mounted = useRef(false);

  const refresh = useCallback((): Promise<LatestRelease | null> => {
    if (request.current) return request.current;
    if (cached.current && Date.now() - cached.current.checkedAt < RELEASE_CACHE_MS) return Promise.resolve(cached.current.release);
    if (Date.now() < retryAfter.current) return Promise.resolve(null);
    const abort = new AbortController();
    controller.current = abort;
    if (mounted.current) setState(current => ({ ...current, status: 'checking' }));
    const timeout = window.setTimeout(() => abort.abort(), 10000);
    const pending: Promise<LatestRelease | null> = fetchLatestRelease(abort.signal).then(release => {
      if (controller.current !== abort) return null;
      const entry = { release, checkedAt: Date.now() };
      cached.current = entry;
      retryAfter.current = 0;
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry)); } catch { /* Storage is optional. */ }
      if (mounted.current) setState({ release, status: 'ready' });
      return release;
    }).catch(() => {
      if (controller.current !== abort) return null;
      retryAfter.current = Date.now() + RELEASE_CACHE_MS;
      if (mounted.current) setState({ release: null, status: 'unavailable' });
      return null;
    }).finally(() => {
      window.clearTimeout(timeout);
      if (request.current === pending) request.current = null;
    });
    request.current = pending;
    return pending;
  }, []);

  useEffect(() => {
    mounted.current = true;
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
      if (saved && typeof saved === 'object' && 'release' in saved && 'checkedAt' in saved &&
          validRelease(saved.release) && typeof saved.checkedAt === 'number' &&
          Date.now() >= saved.checkedAt && Date.now() - saved.checkedAt < RELEASE_CACHE_MS) {
        cached.current = { release: saved.release, checkedAt: saved.checkedAt };
        setState({ release: saved.release, status: 'ready' });
      }
    } catch { /* A restricted or old cache never prevents API lookup. */ }
    void refresh();
    const recheck = () => { if (!document.hidden) void refresh(); };
    const timer = window.setInterval(recheck, RELEASE_CACHE_MS);
    document.addEventListener('visibilitychange', recheck);
    return () => {
      mounted.current = false;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', recheck);
      const aborted = controller.current;
      controller.current = null;
      request.current = null;
      aborted?.abort();
    };
  }, [refresh]);

  return <ReleaseContext.Provider value={{ ...state, refresh }}>{children}</ReleaseContext.Provider>;
}

export function DownloadLink({ className = 'button primary', children = <>Download Tubely <DownloadSimple weight="bold" /></> }: {
  className?: string; children?: ReactNode;
}) {
  const { release, status, refresh } = useContext(ReleaseContext);
  const [busy, setBusy] = useState(false);
  return <a className={className} href={release?.downloadUrl ?? site.releases}
    aria-busy={busy} aria-disabled={busy || undefined} onClick={async event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      if (busy) return;
      setBusy(true);
      const latest = await refresh();
      window.location.assign(latest?.downloadUrl ?? site.releases);
      setBusy(false);
    }}>
    {busy ? 'Checking…' : status === 'unavailable' && !release ? <>{className === 'nav-download' ? 'Releases' : 'View releases'} <DownloadSimple weight="bold" /></> : children}
  </a>;
}

export function ReleaseCaption() {
  const { release, status } = useContext(ReleaseContext);
  return <p className="release-caption" role="status">{release
    ? <><span>Android 8.0+ · {release.tag.replace(/^v/, '')}</span>{release.prerelease && <span className="release-channel">Preview release</span>}</>
    : status === 'unavailable' ? 'GitHub is unavailable right now. Browse releases to get the APK.'
    : 'Android 8.0+ · Checking the latest release…'}</p>;
}
