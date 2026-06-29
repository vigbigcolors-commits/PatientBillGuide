import { CPT_RE, DATE_RE, cleanDescription, extractAmounts, parseMoney } from '../money';
import type { EobLine } from '../types';
import { parseGenericEob } from './generic';

const LABEL_AMOUNT: [RegExp, keyof Pick<EobLine, 'billed' | 'allowed' | 'planPaid' | 'patientOwes'>][] = [
  [/\b(?:amount\s+)?billed\b/i, 'billed'],
  [/\b(?:allowed\s+amount|member\s+rate|contracted\s+rate)\b/i, 'allowed'],
  [/\b(?:plan\s+paid|your\s+plan\s+paid|cigna\s+paid|insurance\s+paid)\b/i, 'planPaid'],
  [/\b(?:remaining\s+responsibility|your\s+remaining|member\s+responsibility|amount\s+you\s+owe)\b/i, 'patientOwes'],
];

function parseCignaBlocks(raw: string): EobLine[] {
  const chunks = raw.split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean);
  const results: EobLine[] = [];

  for (const chunk of chunks) {
    const rowLines = chunk.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (rowLines.length < 2) continue;

    const entry: EobLine = { description: '', raw: chunk };
    let hasSignal = false;

    for (const line of rowLines) {
      const dateMatch = line.match(/(?:date\s+of\s+service|service\s+date|dos)\s*[:\-]?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i);
      if (dateMatch) {
        entry.serviceDate = dateMatch[1];
        hasSignal = true;
      } else if (DATE_RE.test(line) && !entry.serviceDate && line.length < 24) {
        entry.serviceDate = line.match(DATE_RE)?.[1];
        hasSignal = true;
      }

      const codeMatch = line.match(/(?:procedure\s+code|proc(?:edure)?\.?\s*code|hcpcs|cpt)\s*[:\-#]?\s*(\d{5})/i);
      if (codeMatch) {
        entry.code = codeMatch[1];
        hasSignal = true;
      }

      const descMatch = line.match(/(?:service|description)\s*[:\-]\s*(.+)/i);
      if (descMatch) entry.description = descMatch[1].trim();

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

function parseCignaTable(raw: string): EobLine[] {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const headerIdx = lines.findIndex((l) =>
    /\bmember\s+rate\b|\bremaining\s+responsibility\b|\byour\s+plan\s+paid\b|\bdate\s+of\s+service\b/i.test(l),
  );
  if (headerIdx < 0) return [];

  const header = lines[headerIdx];
  const delim = header.includes('|') ? '|' : header.includes('\t') ? '\t' : /\s{2,}/;
  const split = (row: string) =>
    typeof delim === 'string' ? row.split(delim).map((c) => c.trim()) : row.split(/\s{2,}/);

  const headerCells = split(header.toLowerCase());
  const findCol = (...names: string[]) =>
    headerCells.findIndex((c) => names.some((n) => c.includes(n)));

  const dateCol = findCol('date', 'dos', 'service');
  const codeCol = findCol('proc', 'code', 'cpt');
  const billedCol = findCol('billed', 'charge');
  const allowedCol = findCol('member rate', 'allowed', 'contracted');
  const paidCol = findCol('plan paid', 'your plan');
  const oweCol = findCol('remaining', 'you owe', 'member resp');

  const results: EobLine[] = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const row = lines[i];
    if (!DATE_RE.test(row) && !CPT_RE.test(row)) continue;
    const cells = split(row);
    const entry: EobLine = { description: '', raw: row };
    if (dateCol >= 0) entry.serviceDate = cells[dateCol]?.match(DATE_RE)?.[1];
    if (codeCol >= 0) entry.code = cells[codeCol]?.match(CPT_RE)?.[1];
    if (!entry.code) entry.code = row.match(CPT_RE)?.[1];
    if (!entry.serviceDate) entry.serviceDate = row.match(DATE_RE)?.[1];
    if (billedCol >= 0) entry.billed = parseMoney(cells[billedCol] ?? '');
    if (allowedCol >= 0) entry.allowed = parseMoney(cells[allowedCol] ?? '');
    if (paidCol >= 0) entry.planPaid = parseMoney(cells[paidCol] ?? '');
    if (oweCol >= 0) entry.patientOwes = parseMoney(cells[oweCol] ?? '');
    if (entry.billed == null) {
      const amts = extractAmounts(row);
      if (amts.length >= 4) {
        [entry.billed, entry.allowed, entry.planPaid, entry.patientOwes] = amts;
      }
    }
    entry.description = cleanDescription(
      cells.slice(codeCol + 1, billedCol >= 0 ? billedCol : undefined).join(' ') || row,
    );
    if (entry.code || entry.patientOwes != null) results.push(entry);
  }

  return results;
}

export function parseCignaEob(raw: string): EobLine[] {
  const block = parseCignaBlocks(raw);
  if (block.length > 0) return block;
  const table = parseCignaTable(raw);
  if (table.length > 0) return table;
  return parseGenericEob(raw);
}
