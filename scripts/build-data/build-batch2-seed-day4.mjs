#!/usr/bin/env node
/** Build cpt-seed-batch2-35b.mjs from MPFS for Day 4 batch (+35 → 200 CPT). */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const mpfs = JSON.parse(readFileSync(join(ROOT, 'public/data/mpfs-2026.json'), 'utf8'));

const CODES =
  '97530,97535,92567,90472,96374,36591,96413,92004,11102,17110,90832,90836,90838,90839,90847,90853,96365,96369,69200,69420,69421,51700,51701,57452,57454,11400,11104,17004,93017,93308,94726,94729,99406,99407,99490'.split(
    ',',
  );

const entries = CODES.map((code) => {
  const row = mpfs.codes[code];
  if (!row) throw new Error(`Missing MPFS row for ${code}`);
  const desc = row.description_short.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `  ['${code}', '${desc}', ${row.national_median}],`;
});

const file = `/**
 * Batch 2 scale — Day 4: 35 CPT codes from CMS MPFS (part 2 → 200 total).
 * Regenerate seed: node scripts/build-data/build-batch2-seed-day4.mjs
 */

/** @type {Record<string, { description_short: string; national_median: number }>} */
export const CPT_CODES_BATCH2_35B = {};

function add(code, description_short, national_median) {
  CPT_CODES_BATCH2_35B[code] = {
    description_short,
    national_median: Math.round(national_median * 100) / 100,
  };
}

[
${entries.join('\n')}
].forEach(([c, d, m]) => add(c, d, m));

export const CPT_BATCH2_35B_LIST = ${JSON.stringify(CODES, null, 2)};
`;

writeFileSync(join(ROOT, 'scripts/build-data/cpt-seed-batch2-35b.mjs'), file, 'utf8');
console.log(`Wrote cpt-seed-batch2-35b.mjs (${CODES.length} codes)`);
