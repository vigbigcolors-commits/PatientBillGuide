import type { BillLineItem, BillAuditFlag, BillAuditResult } from './types';
import type { NcciDataset } from './ncci-types';
import { findNcciUnbundlingFlags } from './ncci';
import { WELL_ABOVE_MULTIPLIER } from '../pricing/types';
import type { MpfsDataset, ZipLocalityMap } from '../pricing/types';
import { lookupPrice, formatUsd } from '../pricing/lookup';
import { splitHealthcareLines } from '../text/normalize-pasted';

const CPT_RE = /\b(\d{5})\b/g;
const MONEY_RE = /\$?\s*([\d,]+\.\d{2}|\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
const DATE_RE = /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/;
const QTY_RE = /\b(?:qty|quantity|units?)\s*[:\-]?\s*(\d+)\b|\bx(\d+)\b/i;

function parseQuantity(line: string): number | undefined {
  const match = line.match(QTY_RE);
  if (!match) return undefined;
  const qty = Number.parseInt(match[1] ?? match[2], 10);
  return Number.isFinite(qty) && qty > 0 ? qty : undefined;
}

export function parseBillText(raw: string): BillLineItem[] {
  const lines = splitHealthcareLines(raw);
  const items: BillLineItem[] = [];

  for (const line of lines) {
    const codes = [...line.matchAll(CPT_RE)].map((m) => m[1]);
    if (codes.length === 0) continue;

    const amounts = [...line.matchAll(MONEY_RE)].map((m) =>
      Number.parseFloat(m[1].replace(/,/g, '')),
    );
    const amount = amounts.length > 0 ? amounts[amounts.length - 1] : null;
    if (amount == null || !Number.isFinite(amount)) continue;

    const code = codes[codes.length - 1];
    const dateMatch = line.match(DATE_RE);
    const quantity = parseQuantity(line);
    const description = line
      .replace(DATE_RE, '')
      .replace(CPT_RE, '')
      .replace(MONEY_RE, '')
      .replace(QTY_RE, '')
      .replace(/[-–|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    items.push({
      code,
      description: description || `CPT ${code}`,
      charged: Math.round(amount * 100) / 100,
      lineRaw: line,
      serviceDate: dateMatch?.[1],
      quantity,
    });
  }

  return items;
}

function makeFlag(
  partial: Omit<BillAuditFlag, 'id'>,
  index: number,
): BillAuditFlag {
  return { id: `flag-${index}`, ...partial };
}

export function auditBill(
  items: BillLineItem[],
  mpfs: MpfsDataset,
  zipMap: ZipLocalityMap,
  zip?: string,
  ncci?: NcciDataset,
): BillAuditResult {
  const flags: BillAuditFlag[] = [];
  let flagIndex = 0;
  let skippedUnknownCodes = 0;
  const unknownReported = new Set<string>();

  for (const item of items) {
    if (item.charged <= 0) {
      flags.push(
        makeFlag(
          {
            severity: 'medium',
            confidence: 'high',
            category: 'data',
            code: item.code,
            headline: `Zero or invalid charge for CPT ${item.code}`,
            detail: `Line shows ${formatUsd(item.charged)}. Verify this is not a credit, adjustment, or parsing error.`,
            lineRaw: item.lineRaw,
          },
          flagIndex++,
        ),
      );
    }

    if (item.quantity != null && item.quantity > 1) {
      flags.push(
        makeFlag(
          {
            severity: 'low',
            confidence: 'medium',
            category: 'quantity',
            code: item.code,
            headline: `Multiple units billed for CPT ${item.code}`,
            detail: `Quantity ${item.quantity} on one line — confirm each unit was medically necessary and correctly coded (modifiers may apply).`,
            lineRaw: item.lineRaw,
          },
          flagIndex++,
        ),
      );
    }

    const lookup = lookupPrice({ code: item.code, zip }, mpfs, zipMap);
    if ('error' in lookup) {
      skippedUnknownCodes++;
      if (!unknownReported.has(item.code)) {
        unknownReported.add(item.code);
        flags.push(
          makeFlag(
            {
              severity: 'low',
              confidence: 'high',
              category: 'coverage',
              code: item.code,
              headline: `CPT ${item.code} not in our benchmark dataset`,
              detail:
                'We could not compare this line to Medicare data yet. Check the code on your bill and try Fair Price if we support it — or request an itemized explanation from billing.',
              lineRaw: item.lineRaw,
            },
            flagIndex++,
          ),
        );
      }
      continue;
    }

    const priceKey = `${item.code}:${item.charged}`;
    const wellAbove = lookup.fairRangeHigh * WELL_ABOVE_MULTIPLIER;

    if (item.charged > wellAbove) {
      flags.push(
        makeFlag(
          {
            severity: 'high',
            confidence: lookup.confidence === 'high' ? 'high' : 'medium',
            category: 'pricing',
            code: item.code,
            headline: `CPT ${item.code} charge is well above typical range`,
            detail: `Charged ${formatUsd(item.charged)} vs Medicare allowed ${formatUsd(lookup.medicareAllowed)} (fair range ${formatUsd(lookup.fairRangeLow)}–${formatUsd(lookup.fairRangeHigh)}). Facility fees may apply — request an itemized bill.`,
            lineRaw: item.lineRaw,
          },
          flagIndex++,
        ),
      );
    } else if (item.charged > lookup.fairRangeHigh) {
      flags.push(
        makeFlag(
          {
            severity: 'low',
            confidence: lookup.confidence === 'high' ? 'medium' : 'low',
            category: 'pricing',
            code: item.code,
            headline: `CPT ${item.code} is above typical fair range`,
            detail: `Charged ${formatUsd(item.charged)} exceeds our 2.5× Medicare benchmark (${formatUsd(lookup.fairRangeHigh)}). May be valid with facility or out-of-network pricing.`,
            lineRaw: item.lineRaw,
          },
          flagIndex++,
        ),
      );
    }
  }

  const dupCounts = new Map<string, number>();
  for (const item of items) {
    const key = `${item.serviceDate ?? 'nodate'}:${item.code}:${item.charged}`;
    dupCounts.set(key, (dupCounts.get(key) ?? 0) + 1);
  }

  const dupReported = new Set<string>();
  for (const [key, count] of dupCounts) {
    if (count > 1 && !dupReported.has(key)) {
      dupReported.add(key);
      const [, code, charged] = key.split(':');
      flags.push(
        makeFlag(
          {
            severity: 'medium',
            confidence: 'high',
            category: 'duplicate',
            code,
            headline: `Possible duplicate charge for CPT ${code}`,
            detail: `CPT ${code} at ${formatUsd(Number.parseFloat(charged))} appears ${count} times on the same date. Confirm each line is a separate, medically necessary service.`,
          },
          flagIndex++,
        ),
      );
    }
  }

  const priceByCodeDate = new Map<string, Set<number>>();
  for (const item of items) {
    const key = `${item.serviceDate ?? 'nodate'}:${item.code}`;
    if (!priceByCodeDate.has(key)) priceByCodeDate.set(key, new Set());
    priceByCodeDate.get(key)!.add(item.charged);
  }

  for (const [key, prices] of priceByCodeDate) {
    if (prices.size <= 1) continue;
    const [, code] = key.split(':');
    const amounts = [...prices].map((p) => formatUsd(p)).join(' vs ');
    flags.push(
      makeFlag(
        {
          severity: 'medium',
          confidence: 'medium',
          category: 'data',
          code,
          headline: `Same CPT ${code} with different amounts on one date`,
          detail: `Amounts found: ${amounts}. Verify coding levels, modifiers, or separate providers — or ask billing to explain the difference.`,
        },
        flagIndex++,
      ),
    );
  }

  for (const partial of ncci ? findNcciUnbundlingFlags(items, ncci) : []) {
    flags.push(makeFlag(partial, flagIndex++));
  }

  const concernFlags = flags.filter(
    (f) => f.category === 'pricing' || f.category === 'duplicate' || f.category === 'unbundling',
  );
  const looksNormal = concernFlags.length === 0;

  const byCategory: BillAuditResult['stats']['byCategory'] = {
    duplicate: 0,
    pricing: 0,
    quantity: 0,
    data: 0,
    coverage: 0,
    unbundling: 0,
  };
  const bySeverity: BillAuditResult['stats']['bySeverity'] = { low: 0, medium: 0, high: 0 };
  for (const f of flags) {
    byCategory[f.category]++;
    bySeverity[f.severity]++;
  }

  const checksRun = [
    `Parsed ${items.length} line item${items.length === 1 ? '' : 's'} with CPT codes and dollar amounts`,
    zip
      ? `Compared charges to Medicare benchmarks localized to ZIP ${zip}`
      : 'Compared charges to national Medicare median benchmarks (no ZIP provided)',
    ncci
      ? 'Checked same-day code pairs against CMS NCCI practitioner PTP edits'
      : 'NCCI unbundling check skipped (data not loaded)',
    'Scanned for duplicate CPT + amount on the same service date',
    'Flagged same CPT with different amounts on one date',
  ];

  const nextSteps: string[] = [
    'Request an itemized bill with CPT/HCPCS codes, dates, and provider NPI if anything is missing.',
    'Compare your bill to your EOB — allowed amounts and patient responsibility should eventually align.',
  ];
  if (flags.some((f) => f.category === 'pricing')) {
    nextSteps.push(
      'For outlier charges, look up each CPT in our Fair Price Calculator with your ZIP for localized benchmarks.',
    );
  }
  if (flags.some((f) => f.category === 'duplicate')) {
    nextSteps.push(
      'Ask billing to explain duplicate lines — confirm each is a separate, medically necessary service.',
    );
  }
  if (flags.some((f) => f.category === 'unbundling')) {
    nextSteps.push(
      'Ask whether panel and component lab codes were billed correctly — NCCI edits may require bundling.',
    );
  }
  if (flags.some((f) => f.category === 'coverage')) {
    nextSteps.push('For unrecognized CPT codes, ask billing for a plain-English description of each service.');
  }
  nextSteps.push('Keep copies of the bill, EOB, and any call reference numbers before paying in full.');

  return {
    lineCount: items.length,
    flags,
    skippedUnknownCodes,
    summary:
      flags.length === 0
        ? 'Based on public Medicare benchmarks, this bill looks normal — no obvious concerns found.'
        : looksNormal
          ? `Found ${flags.length} informational note${flags.length === 1 ? '' : 's'} — no major pricing or duplicate concerns.`
          : `Found ${concernFlags.length} billing concern${concernFlags.length === 1 ? '' : 's'} worth reviewing (${flags.length} total flag${flags.length === 1 ? '' : 's'}).`,
    looksNormal,
    stats: {
      totalCharged: Math.round(items.reduce((sum, i) => sum + i.charged, 0) * 100) / 100,
      uniqueCodes: new Set(items.map((i) => i.code)).size,
      byCategory,
      bySeverity,
      concernCount: concernFlags.length,
    },
    checksRun,
    nextSteps,
  };
}

export const FLAG_CATEGORY_LABELS: Record<BillAuditFlag['category'], string> = {
  duplicate: 'Duplicate',
  pricing: 'Pricing',
  quantity: 'Quantity',
  data: 'Data mismatch',
  coverage: 'Coverage gap',
  unbundling: 'NCCI unbundling',
};

export const AUDIT_CHECK_LANES = [
  {
    id: 'parse',
    title: 'Parse lines',
    detail: 'Extract CPT codes, dates, quantities, and dollar amounts from pasted text',
    level: 'strong' as const,
  },
  {
    id: 'pricing',
    title: 'Medicare benchmarks',
    detail: 'Compare each charge to CMS allowed + 1.5×–2.5× fair range (ZIP-localized)',
    level: 'strong' as const,
  },
  {
    id: 'duplicate',
    title: 'Duplicate scan',
    detail: 'Same CPT + amount on the same date, or conflicting amounts',
    level: 'strong' as const,
  },
  {
    id: 'ncci',
    title: 'NCCI unbundling',
    detail: 'CMS practitioner PTP edits — panel + component codes same day',
    level: 'strong' as const,
  },
  {
    id: 'limits',
    title: 'What we cannot see',
    detail: 'Medical necessity, network contracts, hospital-only NCCI',
    level: 'weak' as const,
  },
];
