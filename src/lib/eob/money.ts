export const DATE_RE = /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/;
export const CPT_RE = /\b(\d{5})\b/;
export const MONEY_RE = /\$?\s*([\d,]+\.\d{2})/g;

export function parseMoney(raw: string): number | undefined {
  const cleaned = raw.replace(/[$,\s]/g, '');
  if (!cleaned) return undefined;
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : undefined;
}

export function extractAmounts(line: string): number[] {
  return [...line.matchAll(MONEY_RE)].map((m) => parseMoney(m[1])!).filter(Number.isFinite);
}

export function cleanDescription(line: string): string {
  return (
    line
      .replace(DATE_RE, '')
      .replace(CPT_RE, '')
      .replace(MONEY_RE, '')
      .replace(/\|/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || line.trim()
  );
}
