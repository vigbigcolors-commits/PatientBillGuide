import type { BillLineItem, BillAuditFlag, NcciCheckStatus } from './types';
import type { NcciColumn2Edit, NcciCompactEdit, NcciColumn2Edit as Edit, NcciDataset } from './ncci-types';

export type { NcciDataset, NcciPtpEdit, NcciColumn2Edit } from './ncci-types';

export interface NcciEffectiveWindow {
  start: string;
  end: string;
}

/** CMS publishes NCCI PTP edit files quarterly; never apply a known quarterly file outside its quarter. */
export function getNcciEffectiveWindow(version: string): NcciEffectiveWindow | null {
  const match = /^(\d{4})Q([1-4])$/i.exec(version);
  if (!match) return null;
  const year = Number(match[1]);
  const quarter = Number(match[2]);
  const startMonth = (quarter - 1) * 3 + 1;
  const endMonth = startMonth + 2;
  const pad = (value: number) => String(value).padStart(2, '0');
  const lastDay = new Date(Date.UTC(year, endMonth, 0)).getUTCDate();
  return {
    start: `${year}-${pad(startMonth)}-01`,
    end: `${year}-${pad(endMonth)}-${pad(lastDay)}`,
  };
}

function normalizeServiceDate(serviceDate: string | undefined): string | null {
  if (!serviceDate) return null;
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(serviceDate);
  if (!match) return null;
  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function appliesToServiceDate(serviceDate: string | undefined, version: string): boolean {
  const window = getNcciEffectiveWindow(version);
  if (!window) return true;
  const date = normalizeServiceDate(serviceDate);
  return Boolean(date && date >= window.start && date <= window.end);
}

export function getNcciCheckStatus(items: BillLineItem[], dataset: NcciDataset): NcciCheckStatus {
  if (!getNcciEffectiveWindow(dataset.version)) return 'evaluated';
  const covered = items.filter((item) => appliesToServiceDate(item.serviceDate, dataset.version)).length;
  if (covered === 0) return 'not_evaluated';
  return covered === items.length ? 'evaluated' : 'partially_evaluated';
}

function genericNcciRationale(modifier: 0 | 1): string {
  return modifier === 0
    ? 'CMS NCCI procedure-to-procedure edit — verify with billing if both lines appear'
    : 'CMS NCCI edit — separate billing may require an appropriate modifier';
}

function normalizeEdits(raw: NcciColumn2Edit[] | NcciCompactEdit[]): Edit[] {
  if (raw.length === 0) return [];
  const first = raw[0];
  if (Array.isArray(first)) {
    return (raw as NcciCompactEdit[]).map(([column2, modifier]) => ({
      column2,
      modifier,
      rationale: genericNcciRationale(modifier),
    }));
  }
  return raw as NcciColumn2Edit[];
}

function buildPairIndex(
  dataset: NcciDataset,
): Map<string, Edit[]> {
  if (dataset.index) {
    const map = new Map<string, Edit[]>();
    for (const [column1, edits] of Object.entries(dataset.index)) {
      map.set(column1, normalizeEdits(edits));
    }
    return map;
  }

  const index = new Map<string, Edit[]>();
  for (const pair of dataset.pairs ?? []) {
    const list = index.get(pair.column1) ?? [];
    list.push({ column2: pair.column2, modifier: pair.modifier, rationale: pair.rationale });
    index.set(pair.column1, list);
  }
  return index;
}

/**
 * Detect CMS NCCI PTP pairs billed on the same date of service.
 * Directional: column1 is comprehensive; column2 is the bundled component.
 */
export function findNcciUnbundlingFlags(
  items: BillLineItem[],
  dataset: NcciDataset,
): Omit<BillAuditFlag, 'id'>[] {
  const index = buildPairIndex(dataset);
  const flags: Omit<BillAuditFlag, 'id'>[] = [];
  const reported = new Set<string>();

  const byDate = new Map<string, BillLineItem[]>();
  for (const item of items) {
    const date = item.serviceDate ?? 'nodate';
    if (!appliesToServiceDate(item.serviceDate, dataset.version)) continue;
    const list = byDate.get(date) ?? [];
    list.push(item);
    byDate.set(date, list);
  }

  for (const [date, dayItems] of byDate) {
    const codesOnDay = new Set(dayItems.map((i) => i.code));

    for (const item of dayItems) {
      const pairs = index.get(item.code);
      if (!pairs) continue;

      for (const { column2, modifier, rationale } of pairs) {
        if (!codesOnDay.has(column2)) continue;

        const flagKey = `${date}:${item.code}:${column2}`;
        if (reported.has(flagKey)) continue;
        reported.add(flagKey);

        const modifierNote =
          modifier === 0
            ? 'CMS often treats these as bundled on the same date without a valid modifier.'
            : 'These may be billed separately only with an appropriate modifier (e.g. 59, XE) — verify with billing.';

        flags.push({
          severity: modifier === 0 ? 'medium' : 'low',
          confidence: 'high',
          category: 'unbundling',
          code: column2,
          headline: `Possible NCCI unbundling: CPT ${item.code} + ${column2}`,
          detail: `${rationale}. ${modifierNote} This is a pattern check — not proof of error. ${date !== 'nodate' ? `Date: ${date}.` : 'Add dates of service for sharper matching.'}`,
        });
      }
    }
  }

  return flags;
}
