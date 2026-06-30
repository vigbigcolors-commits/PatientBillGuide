/**
 * Normalize pasted bill / EOB text from PDFs, scans, and insurer portals.
 * Handles broken columns, soft hyphens, page headers, and glued cells.
 */

const SOFT_HYPHEN = /\u00ad/g;
const ZERO_WIDTH = /[\u200b-\u200d\ufeff]/g;
const PAGE_BREAK = /\f/g;
const MULTI_SPACE = /[ \t]{2,}/g;

/** Common PDF line-break artifacts mid-word */
const BROKEN_WORD = /([a-z])-\s*\n\s*([a-z])/gi;

/** Split when two money columns got pasted without separator: $185.00$28.00 */
const GLUED_MONEY = /(\$\d[\d,]*\.\d{2})(?=\$)/g;

/** Tab or multiple spaces often separate columns in PDF paste */
const COLUMN_GAP = /\t+|\s{3,}/g;

export interface NormalizePastedOptions {
  /** Join short wrapped lines (default true) */
  reflow?: boolean;
}

export function normalizePastedHealthcareText(
  raw: string,
  options: NormalizePastedOptions = {},
): string {
  const reflow = options.reflow !== false;
  let text = raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(SOFT_HYPHEN, '')
    .replace(ZERO_WIDTH, '')
    .replace(PAGE_BREAK, '\n')
    .replace(BROKEN_WORD, '$1$2')
    .replace(GLUED_MONEY, '$1 ');

  if (reflow) {
    text = reflowWrappedLines(text);
  }

  return text
    .split('\n')
    .map((line) => line.replace(COLUMN_GAP, ' | ').replace(MULTI_SPACE, ' ').trim())
    .filter((line) => !isLikelyPageHeader(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function isLikelyPageHeader(line: string): boolean {
  if (line.length < 4 || line.length > 80) return false;
  if (/^page\s+\d+\s+of\s+\d+$/i.test(line)) return true;
  if (/^\d+\s+of\s+\d+$/i.test(line)) return true;
  if (/^continued\s+on\s+next\s+page/i.test(line)) return true;
  return false;
}

/**
 * Rejoin lines broken mid-sentence (PDF wrap) while keeping true row breaks.
 * A line that doesn't end with punctuation/digit and next starts lowercase → merge.
 */
function reflowWrappedLines(text: string): string {
  const lines = text.split('\n');
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i] ?? '';
    while (i + 1 < lines.length && shouldMergeWithNext(line, lines[i + 1] ?? '')) {
      i += 1;
      line = `${line} ${(lines[i] ?? '').trim()}`;
    }
    out.push(line);
  }

  return out.join('\n');
}

function shouldMergeWithNext(current: string, next: string): boolean {
  const a = current.trim();
  const b = next.trim();
  if (!a || !b) return false;
  if (/\|\s*$/.test(a)) return false;
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(b)) return false;
  if (/^\$[\d,]+\.\d{2}/.test(b)) return false;
  if (/^\d{5}\b/.test(b)) return false;
  if (/^[A-Z][A-Z\s]{4,}$/.test(b)) return false;
  if (/[.!?:;]$/.test(a)) return false;
  if (/^\d+$/.test(a) && /^\d+$/.test(b)) return false;
  return /^[a-z(]/.test(b) || (!/\$/.test(a) && b.length < 40);
}

/** Split normalized text into candidate service lines for parsers. */
export function splitHealthcareLines(text: string): string[] {
  const normalized = normalizePastedHealthcareText(text);
  const rows: string[] = [];

  for (const line of normalized.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.length < 6) continue;
    if (/\|/.test(trimmed)) {
      for (const cell of trimmed.split(/\s*\|\s*/)) {
        const part = cell.trim();
        if (part.length >= 6) rows.push(part);
      }
      rows.push(trimmed);
    } else {
      rows.push(trimmed);
    }
  }

  return rows;
}
