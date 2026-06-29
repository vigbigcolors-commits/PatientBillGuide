import type { NcciDataset } from './ncci-types';

let ncciCache: NcciDataset | null = null;

async function parseNcciResponse(res: Response): Promise<NcciDataset> {
  const url = res.url;
  if (url.endsWith('.gz') || res.headers.get('content-type')?.includes('gzip')) {
    if (!res.body) throw new Error('Empty NCCI response');
    const ds = res.body.pipeThrough(new DecompressionStream('gzip'));
    const text = await new Response(ds).text();
    return JSON.parse(text) as NcciDataset;
  }
  return res.json() as Promise<NcciDataset>;
}

export async function loadNcciData(base = '/data'): Promise<NcciDataset> {
  if (ncciCache) return ncciCache;

  let manifest: DataManifest | null = null;
  try {
    const manifestRes = await fetch(`${base}/manifest.json`);
    if (manifestRes.ok) {
      manifest = (await manifestRes.json()) as DataManifest;
    }
  } catch {
    /* fallback below */
  }

  const url = manifest?.ncci?.url ?? `${base}/ncci-ptp.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  ncciCache = await parseNcciResponse(res);
  return ncciCache;
}

export function clearNcciCache(): void {
  ncciCache = null;
}
