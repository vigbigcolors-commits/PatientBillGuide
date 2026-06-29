/**
 * Parse CMS Practitioner NCCI PTP edit files (tab-separated TXT).
 * Stores compact tuples — no AMA/CMS rationale text copied verbatim.
 */

import { createReadStream, existsSync, readdirSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';

/** Edits active for this CMS release quarter (Q3 2026 effective July 1). */
export const NCCI_QUARTER_EFFECTIVE = '20260701';

function isActiveEdit(effective, deletion) {
  if (effective && /^\d{8}$/.test(effective) && effective > NCCI_QUARTER_EFFECTIVE) return false;
  if (!deletion || deletion === '*' || !/^\d{8}$/.test(deletion)) return true;
  return deletion >= NCCI_QUARTER_EFFECTIVE;
}

/** @param {string} cmsRationale */
export function genericNcciRationale(cmsRationale = '') {
  const t = cmsRationale.toLowerCase();
  if (t.includes('anesthesia')) return 'Anesthesia service bundling rule under CMS NCCI';
  if (t.includes('preparation') || t.includes('monitoring')) {
    return 'Standard preparation or monitoring bundled with primary procedure';
  }
  if (t.includes('manual')) return 'CMS coding manual procedure-to-procedure bundling rule';
  if (t.includes('mutually exclusive')) return 'Mutually exclusive procedures for same date of service';
  return 'CMS NCCI procedure-to-procedure edit — verify with billing if both lines appear';
}

/**
 * @param {string} txtPath
 * @param {Set<string>} seen
 * @param {Map<string, { column2: string; modifier: 0 | 1; rationale: string }[]>} index
 */
async function parsePtpFile(txtPath, seen, index) {
  const rl = createInterface({ input: createReadStream(txtPath, 'utf8'), crlfDelay: Infinity });
  let lineNo = 0;

  for await (const line of rl) {
    lineNo++;
    if (lineNo <= 6 || !line.trim()) continue;

    const row = line.split('\t');
    const column1 = row[0]?.trim();
    const column2 = row[1]?.trim();
    const effective = row[3]?.trim() ?? '';
    const deletion = row[4]?.trim() ?? '';
    const modRaw = row[5]?.trim() ?? '';
    const cmsRationale = row[6]?.trim() ?? '';

    if (!column1 || !column2) continue;
    if (modRaw !== '0' && modRaw !== '1') continue;
    if (!isActiveEdit(effective, deletion)) continue;

    const modifier = /** @type {0 | 1} */ (Number.parseInt(modRaw, 10));
    const key = `${column1}\t${column2}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const rationale = genericNcciRationale(cmsRationale);
    const list = index.get(column1) ?? [];
    list.push({ column2, modifier, rationale });
    index.set(column1, list);
  }
}

/**
 * @param {string} cacheDir
 * @returns {Promise<{ version: string; source: string; pairs: [string, string, 0 | 1][]; index: Record<string, { column2: string; modifier: 0 | 1; rationale: string }[]> }>}
 */
export async function parsePractitionerNcci(cacheDir) {
  const ncciDir = join(cacheDir, 'ncci-practitioner');
  if (!existsSync(ncciDir)) {
    throw new Error(`NCCI cache missing at ${ncciDir} — run npm run data:fetch`);
  }

  const txtFiles = readdirSync(ncciDir)
    .filter((f) => /^ccipra.*\.txt$/i.test(f))
    .sort()
    .map((f) => join(ncciDir, f));

  if (txtFiles.length === 0) {
    throw new Error(`No ccipra*.TXT files in ${ncciDir}`);
  }

  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {Map<string, { column2: string; modifier: 0 | 1; rationale: string }[]>} */
  const index = new Map();

  for (const file of txtFiles) {
    await parsePtpFile(file, seen, index);
  }

  /** @type {[string, string, 0 | 1][]} */
  const pairs = [];
  for (const [column1, edits] of index) {
    for (const { column2, modifier } of edits) {
      pairs.push([column1, column2, modifier]);
    }
  }

  pairs.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));

  const indexObj = Object.fromEntries(index);

  return {
    version: '2026Q3',
    source: `CMS Practitioner PTP Edits v322r0 (${txtFiles.length} files, effective July 1, 2026)`,
    pairs,
    index: indexObj,
  };
}

export function ncciCacheDir(cacheDir) {
  return join(cacheDir, 'ncci-practitioner');
}
