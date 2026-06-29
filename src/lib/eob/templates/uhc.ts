import { CPT_RE, DATE_RE, cleanDescription, extractAmounts, parseMoney } from '../money';
import type { EobLine } from '../types';
import { parseGenericEob } from './generic';

const LABEL_AMOUNT: [RegExp, keyof Pick<EobLine, 'billed' | 'allowed' | 'planPaid' | 'patientOwes'>][] = [
  [/\b(?:amount\s+)?billed\b/i, 'billed'],
  [/\ballowed\s+amount\b/i, 'allowed'],
  [/\bplan\s+paid\b/i, 'planPaid'],
  [/\b(?:your\s+share|member\s+responsibility|you\s+owe|patient\s+responsibility)\b/i, 'patientOwes'],
];

/** Parse UHC-style block labels (Date of Service / Procedure Code / Amount lines). */
function parseUhcBlocks(raw: string): EobLine[] {
  const chunks = raw.split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean);
  const results: EobLine[] = [];

  for (const chunk of chunks) {
    const rowLines = chunk.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (rowLines.length < 2) continue;

    const entry: EobLine = { description: '', raw: chunk };
    let hasSignal = false;

    for (const line of rowLines) {
      const dateMatch = line.match(/(?:date\s+of\s+service|service\s+date)\s*[:\-]?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i);
      if (dateMatch) {
        entry.serviceDate = dateMatch[1];
        hasSignal = true;
      } else if (DATE_RE.test(line) && !entry.serviceDate) {
        entry.serviceDate = line.match(DATE_RE)?.[1];
        hasSignal = true;
      }

      const codeMatch = line.match(/(?:procedure\s+code|proc(?:edure)?\.?\s*code|hcpcs|cpt)\s*[:\-]?\s*(\d{5})/i);
      if (codeMatch) {
        entry.code = codeMatch[1];
        hasSignal = true;
      } else if (CPT_RE.test(line) && !entry.code) {
        const m = line.match(CPT_RE);
        if (m && !/^\d{5}$/.test(line.replace(/\D/g, '').slice(0, 8))) {
          entry.code = m[1];
          hasSignal = true;
        }
      }

      const serviceMatch = line.match(/(?:service|description)\s*[:\-]\s*(.+)/i);
      if (serviceMatch) entry.description = serviceMatch[1].trim();

      for (const [re, field] of LABEL_AMOUNT) {
        if (re.test(line)) {
          const amt = extractAmounts(line)[0] ?? parseMoney(line.split(/[:\-]/).pop() ?? '');
          if (amt != null) {
            entry[field] = amt;
            hasSignal = true;
          }
        }
      }
    }

    if (!entry.description) entry.description = cleanDescription(rowLines.join(' '));
    if (hasSignal && (entry.code || (entry.patientOwes != null && entry.allowed != null))) {
      results.push(entry);
    }
  }

  return results;
}

/** Parse pipe/tab table rows after UHC-style headers. */
function parseUhcTable(raw: string): EobLine[] {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const headerIdx = lines.findIndex((l) =>
    /date\s+of\s+service|procedure|billed|allowed|plan\s+paid|your\s+share/i.test(l),
  );
  if (headerIdx < 0) return [];

  const header = lines[headerIdx].toLowerCase();
  const delim = header.includes('|') ? '|' : header.includes('\t') ? '\t' : null;
  if (!delim) return [];

  const col = (name: string) => header.split(delim).findIndex((c) => c.includes(name));
  const dateCol = col('date');
  const codeCol = Math.max(col('procedure'), col('code'), col('proc'));
  const billedCol = col('billed');
  const allowedCol = col('allowed');
  const paidCol = Math.max(col('plan paid'), col('paid'));
  const oweCol = Math.max(col('your share'), col('you owe'), col('member'));

  const results: EobLine[] = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    if (!lines[i].includes(delim)) continue;
    const cells = lines[i].split(delim).map((c) => c.trim());
    const entry: EobLine = { description: '', raw: lines[i] };
    if (dateCol >= 0) entry.serviceDate = cells[dateCol]?.match(DATE_RE)?.[1];
    if (codeCol >= 0) entry.code = cells[codeCol]?.match(CPT_RE)?.[1];
    if (billedCol >= 0) entry.billed = parseMoney(cells[billedCol] ?? '');
    if (allowedCol >= 0) entry.allowed = parseMoney(cells[allowedCol] ?? '');
    if (paidCol >= 0) entry.planPaid = parseMoney(cells[paidCol] ?? '');
    if (oweCol >= 0) entry.patientOwes = parseMoney(cells[oweCol] ?? '');
    entry.description = cleanDescription(cells.filter(Boolean).join(' '));
    if (entry.code || entry.patientOwes != null) results.push(entry);
  }

  return results;
}

export function parseUhcEob(raw: string): EobLine[] {
  const block = parseUhcBlocks(raw);
  if (block.length > 0) return block;
  const table = parseUhcTable(raw);
  if (table.length > 0) return table;
  return parseGenericEob(raw);
}
