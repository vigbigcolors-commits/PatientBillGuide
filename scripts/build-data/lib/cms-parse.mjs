/**
 * Parse CMS PPRRVU, GPCI, and ZIP→locality fixed-width files.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describeHcpcs } from './code-descriptions.mjs';

const PAYABLE_STATUS = new Set(['A', 'C', 'R', 'T']);

function round2(n) {
  return Math.round(n * 100) / 100;
}

function parseCsvLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function toNum(raw) {
  if (!raw || raw === 'NA') return 0;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

/** @param {string} mac @param {string} locNum */
export function makeLocalityId(mac, locNum) {
  const macClean = mac.trim().padStart(5, '0');
  const locClean = locNum.trim().padStart(2, '0');
  return `${macClean}${locClean}`;
}

/**
 * @param {string} csvPath
 * @returns {{ conversionFactor: number, codes: Record<string, object> }}
 */
export function parsePprrvu(csvPath) {
  const text = readFileSync(csvPath, 'utf8');
  const lines = text.split(/\r?\n/);
  const headerIdx = lines.findIndex((l) => l.startsWith('HCPCS,'));
  if (headerIdx < 0) throw new Error(`PPRRVU header not found in ${csvPath}`);

  let conversionFactor = 33.4009;
  /** @type {Record<string, object>} */
  const codes = {};

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const row = parseCsvLine(line);
    const hcpcs = row[0]?.trim();
    const mod = row[1]?.trim() ?? '';
    const status = row[3]?.trim() ?? '';
    if (!hcpcs || mod) continue;
    if (!PAYABLE_STATUS.has(status)) continue;

    const work = toNum(row[5]);
    const pe = toNum(row[6]);
    const mp = toNum(row[10]);
    const total = toNum(row[11]);
    const cf = toNum(row[25]);
    if (cf > 0) conversionFactor = cf;

    const national = round2(total * conversionFactor);
    if (national <= 0 && work <= 0) continue;

    codes[hcpcs] = {
      description_short: describeHcpcs(hcpcs, row[2]),
      rvu: { work: round2(work), pe: round2(pe), mp: round2(mp) },
      national_median: national,
      status,
    };
  }

  return { conversionFactor, codes };
}

/**
 * @param {string} csvPath
 * @returns {Record<string, { label: string, gpci: { work: number, pe: number, mp: number } }>}
 */
export function parseGpci(csvPath) {
  const text = readFileSync(csvPath, 'utf8');
  const lines = text.split(/\r?\n/);
  const headerIdx = lines.findIndex((l) => l.includes('Medicare Administrative Contractor'));
  if (headerIdx < 0) throw new Error(`GPCI header not found in ${csvPath}`);

  /** @type {Record<string, object>} */
  const localities = {};

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const row = parseCsvLine(line);
    const mac = row[0]?.trim();
    const state = row[1]?.trim();
    const locNum = row[2]?.trim();
    const name = row[3]?.trim();
    if (!mac || !locNum || !name) continue;

    const id = makeLocalityId(mac, locNum);
    const label = state && !name.toUpperCase().includes(state)
      ? `${name}, ${state}`
      : name;

    localities[id] = {
      label,
      gpci: {
        work: round2(toNum(row[4])),
        pe: round2(toNum(row[5])),
        mp: round2(toNum(row[6])),
      },
    };
  }

  return localities;
}

/**
 * @param {string} txtPath
 * @returns {Record<string, string>}
 */
export function parseZipLocality(txtPath) {
  const text = readFileSync(txtPath, 'utf8');
  /** @type {Record<string, string>} */
  const map = {};

  for (const line of text.split(/\r?\n/)) {
    if (line.length < 14) continue;
    const zip = line.slice(2, 7);
    if (!/^\d{5}$/.test(zip)) continue;
    const carrier = line.slice(7, 12).trim();
    const locNum = line.slice(12, 14).trim();
    if (!carrier || !locNum) continue;
    map[zip] = makeLocalityId(carrier, locNum);
  }

  return map;
}

export function cachePaths(cacheDir) {
  return {
    pprrvu: join(cacheDir, 'rvu26b', 'PPRRVU2026_Apr_nonQPP.csv'),
    gpci: join(cacheDir, 'rvu26b', 'GPCI2026.csv'),
    zip: join(cacheDir, 'zip-locality', 'ZIP5_JUL2026.txt'),
  };
}
