/**
 * Download CMS MPFS, ZIP-locality, and NCCI PTP source files.
 * Run: npm run data:fetch
 */

import { copyFileSync, createWriteStream, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { CMS_SOURCES, CACHE_DIR } from './cms-sources.mjs';

async function download(url, dest) {
  console.log(`Fetching ${url}`);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'PatientBillGuide-data-pipeline/1.0' },
  });
  if (!res.ok) throw new Error(`Download failed ${url}: ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log(`  → ${dest}`);
}

async function unzip(zipPath, destDir) {
  const { execFileSync } = await import('node:child_process');
  mkdirSync(destDir, { recursive: true });
  if (process.platform === 'win32') {
    execFileSync('powershell', [
      '-NoProfile',
      '-Command',
      `Expand-Archive -Path '${zipPath.replace(/'/g, "''")}' -DestinationPath '${destDir.replace(/'/g, "''")}' -Force`,
    ]);
  } else {
    execFileSync('unzip', ['-o', '-q', zipPath, '-d', destDir], { stdio: 'inherit' });
  }
}

async function ensureSource(sourceKey) {
  const source = CMS_SOURCES[sourceKey];
  const zipPath = join(CACHE_DIR, source.zipName);
  const extractDir = join(CACHE_DIR, source.extractDir);

  mkdirSync(CACHE_DIR, { recursive: true });

  if (!existsSync(zipPath)) {
    await download(source.url, zipPath);
  } else {
    console.log(`Cache hit: ${zipPath}`);
  }

  const markerFile = join(extractDir, source.pprrvuFile ?? source.dataFile);
  if (!existsSync(markerFile)) {
    console.log(`Extracting ${zipPath}`);
    await unzip(zipPath, extractDir);
  } else {
    console.log(`Extract cache hit: ${extractDir}`);
  }
}

async function ensureNcciPractitioner() {
  const { ncciPractitioner } = CMS_SOURCES;
  const mergeDir = join(CACHE_DIR, ncciPractitioner.mergeDir);
  mkdirSync(mergeDir, { recursive: true });

  for (const file of ncciPractitioner.files) {
    const zipPath = join(CACHE_DIR, file.zipName);
    const extractDir = join(CACHE_DIR, file.extractDir);
    const marker = join(extractDir, file.marker);
    const merged = join(mergeDir, file.marker);

    if (!existsSync(zipPath)) {
      await download(file.url, zipPath);
    } else {
      console.log(`Cache hit: ${zipPath}`);
    }

    if (!existsSync(marker)) {
      console.log(`Extracting ${zipPath}`);
      await unzip(zipPath, extractDir);
    }

    if (!existsSync(merged) && existsSync(marker)) {
      copyFileSync(marker, merged);
    }
  }

  const count = readdirSync(mergeDir).filter((f) => /\.txt$/i.test(f)).length;
  console.log(`NCCI practitioner cache: ${count} TXT files in ${mergeDir}`);
}

export async function fetchCmsSources() {
  await ensureSource('rvu');
  await ensureSource('zipLocality');
  await ensureNcciPractitioner();
}

const isMain =
  process.argv[1]?.replace(/\\/g, '/').endsWith('fetch-cms.mjs');

if (isMain) {
  fetchCmsSources().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
