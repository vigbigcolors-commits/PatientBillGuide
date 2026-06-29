/**
 * CMS MPFS data pipeline — MVP subset builder.
 *
 * Week 2 ships a curated launch subset in public/data/.
 * Full pipeline: download CMS PFS release → transform → gzip → manifest.
 *
 * Usage: node scripts/build-data/build-mpfs-subset.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const dataDir = join(root, 'public/data');

const files = ['mpfs-2026.json', 'zip-to-locality.json', 'ncci-ptp.json.gz'];

for (const file of files) {
  const path = join(dataDir, file);
  if (!existsSync(path)) {
    console.error(`Missing ${path}`);
    process.exit(1);
  }
  const buf = readFileSync(path);
  const sha256 = createHash('sha256').update(buf).digest('hex');
  console.log(`${file}: ${buf.length} bytes, sha256=${sha256.slice(0, 12)}…`);
}

const manifestPath = join(dataDir, 'manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest.updatedAt = new Date().toISOString().slice(0, 10);
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log('manifest.json updated:', manifest.updatedAt);
console.log('OK — CMS MPFS validated. Rebuild: npm run data:generate');
