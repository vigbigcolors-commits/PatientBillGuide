import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join } from 'node:path';

const dataDir = join(import.meta.dirname, '../../public/data');

/** Load merged NCCI chunks for test CPT codes (mirrors browser loadNcciForCodes). */
export function loadNcciForTestCodes(codes: string[]) {
  const prefixes = [...new Set(codes.map((c) => c[0].toUpperCase()))];
  const chunksDir = join(dataDir, 'ncci-chunks');
  const merged: Record<string, unknown> = {};
  let version = '2026Q3';

  for (const prefix of prefixes) {
    const gzPath = join(chunksDir, `${prefix}.json.gz`);
    const legacyBrowser = join(dataDir, 'ncci-ptp-browser.json.gz');
    if (existsSync(gzPath)) {
      const chunk = JSON.parse(gunzipSync(readFileSync(gzPath)).toString('utf8'));
      version = chunk.version ?? version;
      Object.assign(merged, chunk.index);
    } else if (existsSync(legacyBrowser)) {
      const full = JSON.parse(gunzipSync(readFileSync(legacyBrowser)).toString('utf8'));
      version = full.version ?? version;
      for (const [k, v] of Object.entries(full.index ?? {})) {
        if (prefixes.includes(k[0].toUpperCase())) merged[k] = v;
      }
    }
  }

  if (Object.keys(merged).length === 0) {
    const jsonPath = join(dataDir, 'ncci-ptp.json');
    if (existsSync(jsonPath)) {
      return JSON.parse(readFileSync(jsonPath, 'utf8'));
    }
    throw new Error('No NCCI test data — run npm run data:generate');
  }

  return {
    version,
    source: 'test chunks',
    format: 'compact-v1',
    index: merged,
  };
}

export function ncciChunksPresent(): boolean {
  const chunksDir = join(dataDir, 'ncci-chunks');
  return existsSync(chunksDir) && readdirSync(chunksDir).some((f) => f.endsWith('.json.gz'));
}
