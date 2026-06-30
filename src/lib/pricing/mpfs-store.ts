import { fetchJson } from './fetch-json';
import { cacheKey, idbGet, idbSet } from '../storage/idb-cache';
import type { DataManifest, MpfsCodeRecord, MpfsDataset, MpfsLocality, ZipLocalityMap } from './types';

export interface MpfsMeta {
  version: string;
  source: string;
  conversion_factor: number;
  localities: Record<string, MpfsLocality>;
}

export interface MpfsChunk {
  version: string;
  prefix: string;
  codes: Record<string, MpfsCodeRecord>;
}

const chunkMemory = new Map<string, Record<string, MpfsCodeRecord>>();
let metaMemory: MpfsMeta | null = null;
let zipMemory: ZipLocalityMap | null = null;

export function mpfsCodePrefix(code: string): string {
  const digit = code.trim()[0];
  return digit && /\d/.test(digit) ? digit : '0';
}

export function prefixesForCodes(codes: string[]): string[] {
  return [...new Set(codes.map(mpfsCodePrefix))];
}

function isChunkedManifest(manifest: DataManifest): boolean {
  return manifest.mpfs.mode === 'chunked' && Boolean(manifest.mpfs.metaUrl && manifest.mpfs.chunkUrl);
}

async function loadMeta(base: string, manifest: DataManifest): Promise<MpfsMeta> {
  if (metaMemory?.version === manifest.mpfs.version) return metaMemory;

  const key = cacheKey('mpfs-meta', manifest.updatedAt, manifest.mpfs.version);
  const cached = await idbGet<MpfsMeta>(key);
  if (cached?.version === manifest.mpfs.version) {
    metaMemory = cached;
    return cached;
  }

  const meta = await fetchJson<MpfsMeta>(manifest.mpfs.metaUrl!);
  metaMemory = meta;
  void idbSet(key, meta);
  return meta;
}

async function loadChunk(
  base: string,
  manifest: DataManifest,
  prefix: string,
): Promise<Record<string, MpfsCodeRecord>> {
  const memKey = `${manifest.mpfs.version}:${prefix}`;
  const inMem = chunkMemory.get(memKey);
  if (inMem) return inMem;

  const idbKey = cacheKey('mpfs-chunk', manifest.updatedAt, `${manifest.mpfs.version}:${prefix}`);
  const cached = await idbGet<MpfsChunk>(idbKey);
  if (cached?.version === manifest.mpfs.version && cached.codes) {
    chunkMemory.set(memKey, cached.codes);
    return cached.codes;
  }

  const url = manifest.mpfs.chunkUrl!.replace('{prefix}', prefix);
  const chunk = await fetchJson<MpfsChunk>(url);
  chunkMemory.set(memKey, chunk.codes);
  void idbSet(idbKey, chunk);
  return chunk.codes;
}

export async function loadZipMapCached(
  base: string,
  manifest: DataManifest,
): Promise<ZipLocalityMap> {
  if (zipMemory) return zipMemory;

  const key = cacheKey('zip-map', manifest.updatedAt, manifest.zipLocality.version);
  const cached = await idbGet<ZipLocalityMap>(key);
  if (cached) {
    zipMemory = cached;
    return cached;
  }

  const map = await fetchJson<ZipLocalityMap>(manifest.zipLocality.url);
  zipMemory = map;
  void idbSet(key, map);
  return map;
}

/** Load only MPFS rows needed for the given CPT/HCPCS codes (chunked + IndexedDB). */
export async function loadMpfsForCodes(
  codes: string[],
  manifest: DataManifest,
  base = '/data',
): Promise<MpfsDataset> {
  if (!isChunkedManifest(manifest)) {
    throw new Error('loadMpfsForCodes requires chunked MPFS manifest');
  }

  const meta = await loadMeta(base, manifest);
  const prefixes = prefixesForCodes(codes);
  const merged: Record<string, MpfsCodeRecord> = {};

  for (const prefix of prefixes) {
    const slice = await loadChunk(base, manifest, prefix);
    Object.assign(merged, slice);
  }

  return {
    version: meta.version,
    source: meta.source,
    conversion_factor: meta.conversion_factor,
    localities: meta.localities,
    codes: merged,
  };
}

export async function loadFullMpfsFallback(
  base: string,
  manifest: DataManifest,
): Promise<MpfsDataset> {
  const key = cacheKey('mpfs-full', manifest.updatedAt, manifest.mpfs.version);
  const cached = await idbGet<MpfsDataset>(key);
  if (cached?.version === manifest.mpfs.version) return cached;

  const mpfs = await fetchJson<MpfsDataset>(manifest.mpfs.url);
  void idbSet(key, mpfs);
  return mpfs;
}

export function clearMpfsStoreMemory(): void {
  chunkMemory.clear();
  metaMemory = null;
  zipMemory = null;
}

export { isChunkedManifest };
