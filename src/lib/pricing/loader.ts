import { fetchJson } from './fetch-json';
import {
  clearMpfsStoreMemory,
  isChunkedManifest,
  loadFullMpfsFallback,
  loadMpfsForCodes,
  loadZipMapCached,
} from './mpfs-store';
import type { CptIndex, DataManifest, MpfsDataset, ZipLocalityMap } from './types';

export interface LoadPricingOptions {
  /** When set, load only MPFS chunks for these CPT/HCPCS codes (memory-safe). */
  codes?: string[];
}

let manifestCache: DataManifest | null = null;
let fullMpfsCache: MpfsDataset | null = null;
let loadPromise: Promise<{
  manifest: DataManifest;
  mpfs: MpfsDataset;
  zipMap: ZipLocalityMap;
}> | null = null;

let cptIndexCache: CptIndex | null = null;
let cptIndexPromise: Promise<CptIndex> | null = null;

async function loadManifest(base: string): Promise<DataManifest> {
  if (manifestCache) return manifestCache;
  manifestCache = await fetchJson<DataManifest>(`${base}/manifest.json`);
  return manifestCache;
}

export async function loadPricingData(
  base = '/data',
  options: LoadPricingOptions = {},
): Promise<{
  manifest: DataManifest;
  mpfs: MpfsDataset;
  zipMap: ZipLocalityMap;
}> {
  const codes = options.codes?.filter(Boolean);
  const manifest = await loadManifest(base);
  const zipMap = await loadZipMapCached(base, manifest);

  if (codes && codes.length > 0 && isChunkedManifest(manifest)) {
    const mpfs = await loadMpfsForCodes(codes, manifest, base);
    return { manifest, mpfs, zipMap };
  }

  if (fullMpfsCache) {
    return { manifest, mpfs: fullMpfsCache, zipMap };
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const mpfs = isChunkedManifest(manifest)
      ? await loadFullMpfsFallback(base, manifest)
      : await fetchJson<MpfsDataset>(manifest.mpfs.url);
    fullMpfsCache = mpfs;
    return { manifest, mpfs, zipMap };
  })();

  try {
    return await loadPromise;
  } catch (err) {
    loadPromise = null;
    throw err;
  }
}

/** Lightweight CPT list for autocomplete — separate from full MPFS payload. */
export async function loadCptIndex(base = '/data'): Promise<CptIndex> {
  if (cptIndexCache) return cptIndexCache;
  if (cptIndexPromise) return cptIndexPromise;

  cptIndexPromise = (async () => {
    const manifest = manifestCache ?? (await loadManifest(base));
    if (!manifest.cptIndex?.url) {
      throw new Error('CPT index not available in manifest');
    }
    cptIndexCache = await fetchJson<CptIndex>(manifest.cptIndex.url);
    return cptIndexCache;
  })();

  return cptIndexPromise;
}

/** Warm lightweight CPT index during idle time — avoids loading full MPFS on mobile. */
export function prefetchPricingData(base = '/data'): void {
  if (typeof window === 'undefined') return;
  const run = () => {
    void loadCptIndex(base).catch(() => undefined);
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 3000 });
  } else {
    setTimeout(run, 1500);
  }
}

export function clearPricingCache(): void {
  manifestCache = null;
  fullMpfsCache = null;
  loadPromise = null;
  cptIndexCache = null;
  cptIndexPromise = null;
  clearMpfsStoreMemory();
}
