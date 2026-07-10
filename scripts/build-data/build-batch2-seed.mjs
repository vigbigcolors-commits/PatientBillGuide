#!/usr/bin/env node
/** One-off helper: build cpt-seed-batch2-35.mjs from MPFS for Day 3 batch. */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const mpfs = JSON.parse(readFileSync(join(ROOT, 'public/data/mpfs-2026.json'), 'utf8'));

const CODES =
  '99234,99235,99236,99304,99305,99306,99307,99308,99309,99310,76705,90471,29880,47563,59400,52000,51702,97112,97140,90837,92507,64483,93307,45381,66982,27448,92014,92012,69210,11750,17000,99341,99342,99350,76770'.split(
    ',',
  );

const entries = CODES.map((code) => {
  const row = mpfs.codes[code];
  if (!row) throw new Error(`Missing MPFS row for ${code}`);
  const desc = row.description_short.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `  ['${code}', '${desc}', ${row.national_median}],`;
});

const file = `/**
 * Batch 2 scale — 35 CPT codes from CMS MPFS (Day 3).
 * Regenerate seed: node scripts/build-data/build-batch2-seed.mjs
 */

/** @type {Record<string, { description_short: string; national_median: number }>} */
export const CPT_CODES_BATCH2_35 = {};

function add(code, description_short, national_median) {
  CPT_CODES_BATCH2_35[code] = {
    description_short,
    national_median: Math.round(national_median * 100) / 100,
  };
}

[
${entries.join('\n')}
].forEach(([c, d, m]) => add(c, d, m));

export const CPT_BATCH2_35_LIST = ${JSON.stringify(CODES, null, 2)};
`;

writeFileSync(join(ROOT, 'scripts/build-data/cpt-seed-batch2-35.mjs'), file, 'utf8');
console.log(`Wrote cpt-seed-batch2-35.mjs (${CODES.length} codes)`);
