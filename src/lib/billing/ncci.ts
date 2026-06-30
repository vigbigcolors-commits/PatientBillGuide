import type { BillLineItem, BillAuditFlag } from './types';
import type { NcciColumn2Edit, NcciCompactEdit, NcciColumn2Edit as Edit, NcciDataset } from './ncci-types';

export type { NcciDataset, NcciPtpEdit, NcciColumn2Edit } from './ncci-types';

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
