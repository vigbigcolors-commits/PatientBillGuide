import type { NcciDataset, NcciCompactEdit } from './ncci-types';
import type { DataManifest } from '../pricing/types';

const chunkCache = new Map<string, Record<string, NcciCompactEdit[]>>();
let manifestCache: DataManifest | null = null;
let seedCache: NcciDataset | null = null;

async function readResponseJson(res: Response): Promise<unknown> {
  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);

  if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('Browser cannot decompress NCCI data (DecompressionStream unavailable)');
    }
    const text = await new Response(
      new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip')),
    ).text();
    return JSON.parse(text);
  }

  const text = new TextDecoder().decode(bytes);
  return JSON.parse(text);
}

async function getManifest(base: string): Promise<DataManifest | null> {
  if (manifestCache) return manifestCache;
  try {
    const res = await fetch(`${base}/manifest.json`);
    if (!res.ok) return null;
    manifestCache = (await res.json()) as DataManifest;
    return manifestCache;
  } catch {
    return null;
  }
}

function ncciPrefixes(codes: string[]): string[] {
  const prefixes = new Set<string>();
  for (const code of codes) {
    const c = code.trim().toUpperCase();
    if (c.length >= 1) prefixes.add(c[0]!);
  }
  return [...prefixes].sort();
}

function chunkUrl(base: string, manifest: DataManifest | null, prefix: string): string {
  const pattern = manifest?.ncci?.chunkUrl ?? `${base}/ncci-chunks/{prefix}.json.gz`;
  return pattern.replace('{prefix}', encodeURIComponent(prefix));
}

interface NcciChunkFile {
  version: string;
  prefix: string;
  format?: string;
  index: Record<string, NcciCompactEdit[]>;
}

async function loadNcciChunk(
  base: string,
  manifest: DataManifest | null,
  prefix: string,
): Promise<Record<string, NcciCompactEdit[]>> {
  const cached = chunkCache.get(prefix);
  if (cached) return cached;

  const url = chunkUrl(base, manifest, prefix);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load NCCI chunk ${prefix} (${url}): ${res.status}`);
  }

  const chunk = (await readResponseJson(res)) as NcciChunkFile;
  const index = chunk.index ?? {};
  chunkCache.set(prefix, index);
  return index;
}

async function loadNcciSeed(base: string): Promise<NcciDataset> {
  if (seedCache) return seedCache;
  const res = await fetch(`${base}/ncci-seed.json`);
  if (!res.ok) throw new Error(`Failed to load NCCI seed (${res.status})`);
  seedCache = (await readResponseJson(res)) as NcciDataset;
  return seedCache;
}

function mergeIndex(
  target: Record<string, NcciCompactEdit[]>,
  source: Record<string, NcciCompactEdit[]>,
): void {
  for (const [key, edits] of Object.entries(source)) {
    target[key] = edits;
  }
}

/**
 * Load NCCI index slices for CPT prefixes on the bill (~50–150 KB gzip).
 * Falls back to bundled seed pairs if chunks are missing (dev without data:generate).
 */
export async function loadNcciForCodes(codes: string[], base = '/data'): Promise<NcciDataset> {
  const prefixes = ncciPrefixes(codes);
  if (prefixes.length === 0) {
    return { version: 'none', source: 'No CPT codes for NCCI lookup' };
  }

  const manifest = await getManifest(base);
  const merged: Record<string, NcciCompactEdit[]> = {};
  const failed: string[] = [];

  await Promise.all(
    prefixes.map(async (prefix) => {
      try {
        mergeIndex(merged, await loadNcciChunk(base, manifest, prefix));
      } catch {
        failed.push(prefix);
      }
    }),
  );

  if (failed.length > 0 || Object.keys(merged).length === 0) {
    try {
      const seed = await loadNcciSeed(base);
      if (seed.index) mergeIndex(merged, seed.index);
    } catch (seedErr) {
      if (Object.keys(merged).length === 0) {
        throw new Error(
          `NCCI data unavailable. Run "npm run data:generate" and restart the dev server. (${failed.join(', ') || 'no chunks'})`,
        );
      }
      console.warn('NCCI seed fallback failed', seedErr);
    }
  }

  return {
    version: manifest?.ncci?.version ?? '2026Q3',
    source:
      failed.length > 0
        ? 'CMS NCCI (partial chunks + seed fallback)'
        : 'CMS Practitioner PTP Edits (chunked, compact-v1)',
    pairCount: manifest?.ncci?.pairCount,
    format: 'compact-v1',
    index: merged,
  };
}

/** @deprecated Use loadNcciForCodes — full bundle is too large for browsers. */
export async function loadNcciData(base = '/data'): Promise<NcciDataset> {
  return loadNcciForCodes(['80053', '99213'], base);
}

export function clearNcciCache(): void {
  chunkCache.clear();
  manifestCache = null;
  seedCache = null;
}
