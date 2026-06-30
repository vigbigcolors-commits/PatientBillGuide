import { fetchJson } from './fetch-json';
import type { CptIndex, DataManifest, MpfsDataset, ZipLocalityMap } from './types';

let cache: {
  manifest: DataManifest;
  mpfs: MpfsDataset;
  zipMap: ZipLocalityMap;
} | null = null;

let cptIndexCache: CptIndex | null = null;
let cptIndexPromise: Promise<CptIndex> | null = null;

export async function loadPricingData(base = '/data'): Promise<{
  manifest: DataManifest;
  mpfs: MpfsDataset;
  zipMap: ZipLocalityMap;
}> {
  if (cache) return cache;

  const manifest = await fetchJson<DataManifest>(`${base}/manifest.json`);
  const [mpfs, zipMap] = await Promise.all([
    fetchJson<MpfsDataset>(manifest.mpfs.url),
    fetchJson<ZipLocalityMap>(manifest.zipLocality.url),
  ]);

  cache = { manifest, mpfs, zipMap };
  return cache;
}

/** Lightweight CPT list for autocomplete — separate from full MPFS payload. */
export async function loadCptIndex(base = '/data'): Promise<CptIndex> {
  if (cptIndexCache) return cptIndexCache;
  if (cptIndexPromise) return cptIndexPromise;

  cptIndexPromise = (async () => {
    const manifest = cache?.manifest ?? (await fetchJson<DataManifest>(`${base}/manifest.json`));
    if (!manifest.cptIndex?.url) {
      throw new Error('CPT index not available in manifest');
    }
    cptIndexCache = await fetchJson<CptIndex>(manifest.cptIndex.url);
    return cptIndexCache;
  })();

  return cptIndexPromise;
}

/** Warm pricing cache during browser idle time. */
export function prefetchPricingData(base = '/data'): void {
  if (typeof window === 'undefined') return;
  const run = () => {
    void loadPricingData(base);
    void loadCptIndex(base).catch(() => undefined);
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 3000 });
  } else {
    setTimeout(run, 1500);
  }
}

export function clearPricingCache(): void {
  cache = null;
  cptIndexCache = null;
  cptIndexPromise = null;
}
