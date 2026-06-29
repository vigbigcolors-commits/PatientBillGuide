import type { DataManifest, MpfsDataset, ZipLocalityMap } from './types';

let cache: {
  manifest: DataManifest;
  mpfs: MpfsDataset;
  zipMap: ZipLocalityMap;
} | null = null;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.json() as Promise<T>;
}

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

export function clearPricingCache(): void {
  cache = null;
}
