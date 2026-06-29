import { CPT_RE, DATE_RE, MONEY_RE } from '../money';
import type { EobLine } from '../types';

/** Generic line-by-line parser — dates, CPT codes, dollar columns. */
export function parseGenericEob(raw: string): EobLine[] {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 8);
  const results: EobLine[] = [];

  for (const line of lines) {
    const dateMatch = line.match(DATE_RE);
    const codeMatch = line.match(CPT_RE);
    const amounts = [...line.matchAll(MONEY_RE)].map((m) =>
      Number.parseFloat(m[1].replace(/,/g, '')),
    );

    if (!codeMatch && amounts.length < 2) continue;

    const entry: EobLine = {
      description: line.replace(DATE_RE, '').replace(CPT_RE, '').replace(MONEY_RE, '').trim() || line,
      raw: line,
    };

    if (dateMatch) entry.serviceDate = dateMatch[1];
    if (codeMatch) entry.code = codeMatch[1];

    assignAmounts(entry, amounts);
    results.push(entry);
  }

  return results;
}

function assignAmounts(entry: EobLine, amounts: number[]) {
  if (amounts.length >= 4) {
    [entry.billed, entry.allowed, entry.planPaid, entry.patientOwes] = amounts;
  } else if (amounts.length === 3) {
    [entry.billed, entry.allowed, entry.patientOwes] = amounts;
  } else if (amounts.length === 2) {
    [entry.allowed, entry.patientOwes] = amounts;
  } else if (amounts.length === 1) {
    entry.patientOwes = amounts[0];
  }
}
