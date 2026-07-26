/**
 * Fail if CPT page bodies share long identical paragraphs (scaled template abuse).
 * Source of truth: src/data/cpt-*.ts page objects.
 *
 * DECISIONS #46 + #48 — every page must be unique on-site; prose must be original
 * (never AMA/AAPC verbatim; never republish the same copy elsewhere as SEO spam).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/data');
const FILES = [
  'cpt-codes.ts',
  'cpt-extra.ts',
  'cpt-batch-2.ts',
  'cpt-batch-100.ts',
  'cpt-batch-scale-35.ts',
  'cpt-batch-scale-35b.ts',
].map((f) => path.join(ROOT, f));

/** Paragraphs shorter than this are often boilerplate CTAs — still tracked but soft. */
const HARD_MIN_LEN = 120;
/** Exact duplicate of a hard paragraph on this many+ codes = FAIL. */
const HARD_DUP_CODES = 3;
/** Soft warning threshold (same paragraph on 2 codes). */
const SOFT_DUP_CODES = 2;

/** Known shared legal/disclaimer lines allowed once sitewide (exact match). */
const ALLOWLIST = new Set([
  // keep empty — prefer fixing data over allowlisting template sludge
]);

function extractQuotedBlocks(src) {
  /** Pull single-quoted TS string literals (handles \'). */
  const out = [];
  let i = 0;
  while (i < src.length) {
    if (src[i] === "'") {
      let j = i + 1;
      let s = '';
      while (j < src.length) {
        if (src[j] === '\\' && j + 1 < src.length) {
          s += src[j + 1];
          j += 2;
          continue;
        }
        if (src[j] === "'") break;
        s += src[j];
        j += 1;
      }
      if (j < src.length) out.push(s.trim());
      i = j + 1;
      continue;
    }
    i += 1;
  }
  return out;
}

function codeForOffset(src, idx) {
  const before = src.slice(Math.max(0, idx - 800), idx);
  const m = before.match(/['"](\d{5})['"]\s*:\s*\{[^}]*$/s) || before.match(/code:\s*'(\d{5})'/);
  if (m) return m[1];
  const codes = [...before.matchAll(/(?:^|\n)\s*'(\d{5})'\s*:\s*\{/g)];
  return codes.length ? codes[codes.length - 1][1] : '?';
}

/** Map normalized paragraph → Set of CPT codes that contain it. */
const paraCodes = new Map();
let pagesSampled = 0;

for (const file of FILES) {
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, 'utf8');
  // Split by page keys roughly
  const pageStarts = [...src.matchAll(/(?:^|\n)\s*'(\d{5})'\s*:\s*\{/g)];
  pagesSampled += pageStarts.length;

  for (let p = 0; p < pageStarts.length; p++) {
    const code = pageStarts[p][1];
    const start = pageStarts[p].index;
    const end = p + 1 < pageStarts.length ? pageStarts[p + 1].index : src.length;
    const block = src.slice(start, end);
    const strings = extractQuotedBlocks(block).filter(
      (s) =>
        s.length >= HARD_MIN_LEN &&
        !s.startsWith('CPT Code ') &&
        !/^https?:\/\//i.test(s) &&
        !ALLOWLIST.has(s),
    );
    for (const s of strings) {
      const key = s.replace(/\s+/g, ' ').trim();
      if (!paraCodes.has(key)) paraCodes.set(key, new Set());
      paraCodes.get(key).add(code);
    }
  }
}

const hard = [];
const soft = [];
for (const [para, codes] of paraCodes.entries()) {
  if (codes.size >= HARD_DUP_CODES) hard.push({ n: codes.size, codes: [...codes].sort(), para });
  else if (codes.size >= SOFT_DUP_CODES) soft.push({ n: codes.size, codes: [...codes].sort(), para });
}

hard.sort((a, b) => b.n - a.n || a.codes[0].localeCompare(b.codes[0]));
soft.sort((a, b) => b.n - a.n);

console.log(
  JSON.stringify(
    {
      pagesSampled,
      uniqueLongParas: paraCodes.size,
      hardDupGroups: hard.length,
      softDupGroups: soft.length,
      hardMinLen: HARD_MIN_LEN,
      hardDupCodes: HARD_DUP_CODES,
    },
    null,
    2,
  ),
);

for (const h of hard.slice(0, 40)) {
  console.error(
    'DUP_BODY',
    `x${h.n}`,
    h.codes.slice(0, 12).join(','),
    h.codes.length > 12 ? `…+${h.codes.length - 12}` : '',
    JSON.stringify(h.para.slice(0, 140)),
  );
}

if (hard.length) {
  console.error(
    `\nFAIL: ${hard.length} paragraph group(s) shared by ≥${HARD_DUP_CODES} CPT pages — violates unique original content (DECISIONS #48).`,
  );
  console.error('Rehab those batches (or raise uniqueness in generator) before shipping more CPT.');
  process.exit(1);
}

console.log('OK: no long body paragraph shared by ≥' + HARD_DUP_CODES + ' CPT pages');
if (soft.length) {
  console.log('WARN: soft pairs (same para on 2 codes):', soft.length);
  for (const s of soft.slice(0, 15)) {
    console.log('SOFT_DUP', s.codes.join(','), JSON.stringify(s.para.slice(0, 100)));
  }
}
