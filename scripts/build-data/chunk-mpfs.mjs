/**
 * Split existing MPFS JSON into browser-friendly prefix chunks + meta file.
 * Run: node scripts/build-data/chunk-mpfs.mjs
 */

import { createGzip } from 'node:zlib';
import { existsSync, mkdirSync, readFileSync, writeFileSync, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '../../public/data');

async function writeGzipJson(dest, data) {
  await pipeline(
    Readable.from(JSON.stringify(data)),
    createGzip({ level: 9 }),
    createWriteStream(dest),
  );
}

async function main() {
  const mpfsPath = join(dataDir, 'mpfs-2026.json');
  if (!existsSync(mpfsPath)) {
    console.error('Missing mpfs-2026.json — run npm run data:generate first');
    process.exit(1);
  }

  const mpfs = JSON.parse(readFileSync(mpfsPath, 'utf8'));
  const chunksDir = join(dataDir, 'mpfs-chunks');
  mkdirSync(chunksDir, { recursive: true });

  const meta = {
    version: mpfs.version,
    source: mpfs.source,
    conversion_factor: mpfs.conversion_factor,
    localities: mpfs.localities,
  };

  await writeGzipJson(join(dataDir, 'mpfs-meta.json.gz'), meta);

  const byPrefix = {};
  for (const [code, record] of Object.entries(mpfs.codes)) {
    const prefix = code[0] ?? '0';
    if (!byPrefix[prefix]) byPrefix[prefix] = {};
    byPrefix[prefix][code] = record;
  }

  for (const [prefix, codes] of Object.entries(byPrefix)) {
    await writeGzipJson(join(chunksDir, `${prefix}.json.gz`), {
      version: mpfs.version,
      prefix,
      codes,
    });
  }

  const manifestPath = join(dataDir, 'manifest.json');
  const manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : { updatedAt: new Date().toISOString().slice(0, 10) };

  manifest.mpfs = {
    ...manifest.mpfs,
    version: mpfs.version,
    mode: 'chunked',
    metaUrl: '/data/mpfs-meta.json.gz',
    chunkUrl: '/data/mpfs-chunks/{prefix}.json.gz',
    url: '/data/mpfs-2026.json.gz',
    codeCount: Object.keys(mpfs.codes).length,
  };

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `MPFS chunked: ${Object.keys(byPrefix).length} prefix files, ${Object.keys(mpfs.codes).length} codes`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
