import { site } from './site';

export const RELEASE_CACHE_MS = 5 * 60 * 1000;
export type LatestRelease = { tag: string; downloadUrl: string; publishedAt: string; prerelease: boolean };

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validRelease(value: unknown): value is LatestRelease {
  if (!record(value) || typeof value.tag !== 'string' || typeof value.downloadUrl !== 'string' ||
      typeof value.publishedAt !== 'string' || typeof value.prerelease !== 'boolean') return false;
  if (!/^v?\d+\.\d+\.\d+(?:-(?:alpha|beta|rc)\.\d+)?$/.test(value.tag) || !Number.isFinite(Date.parse(value.publishedAt))) return false;
  try {
    const url = new URL(value.downloadUrl);
    const expected = `/clynomious/Tubely-builds/releases/download/${value.tag}/Tubely-${value.tag.replace(/^v/, '')}.apk`;
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.port && !url.username && !url.password &&
      decodeURIComponent(url.pathname) === expected && !url.search && !url.hash;
  } catch { return false; }
}

export function selectLatestRelease(data: unknown): LatestRelease | null {
  if (!Array.isArray(data)) return null;
  const releases: LatestRelease[] = [];
  for (const item of data) {
    if (!record(item) || item.draft !== false || typeof item.tag_name !== 'string' ||
        typeof item.published_at !== 'string' || !Array.isArray(item.assets)) continue;
    const name = `Tubely-${item.tag_name.replace(/^v/, '')}.apk`;
    const asset = item.assets.find(value => record(value) && value.name === name && value.state === 'uploaded' &&
      typeof value.size === 'number' && value.size > 0);
    if (!record(asset)) continue;
    const release = { tag: item.tag_name, downloadUrl: asset.browser_download_url,
      publishedAt: item.published_at, prerelease: item.prerelease === true };
    if (validRelease(release)) releases.push(release);
  }
  // GitHub's list order follows creation dates; publish time is the download channel's recency.
  return releases.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))[0] ?? null;
}

export async function fetchLatestRelease(signal: AbortSignal): Promise<LatestRelease> {
  const response = await fetch(site.releaseApi, {
    signal, credentials: 'omit', cache: 'no-cache',
    headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  });
  if (!response.ok) throw new Error(`Release lookup failed (${response.status})`);
  const release = selectLatestRelease(await response.json());
  if (!release) throw new Error('No published APK found');
  return release;
}
