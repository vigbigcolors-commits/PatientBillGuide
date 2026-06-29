import type { BillLineItem, BillAuditFlag, BillAuditResult } from './types';
import type { NcciDataset } from './ncci-types';
import { findNcciUnbundlingFlags } from './ncci';
import { WELL_ABOVE_MULTIPLIER } from '../pricing/types';
import type { MpfsDataset, ZipLocalityMap } from '../pricing/types';
import { lookupPrice, formatUsd } from '../pricing/lookup';

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
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
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

  return {
    lineCount: items.length,
    flags,
    skippedUnknownCodes,
    summary:
      flags.length === 0
        ? 'Based on public Medicare benchmarks, this bill looks normal — no obvious concerns found.'
        : looksNormal
          ? `Found ${flags.length} informational note${flags.length === 1 ? '' : 's'} — no major pricing or duplicate concerns.`
          : `Found ${flags.length} possible billing concern${flags.length === 1 ? '' : 's'} worth reviewing.`,
    looksNormal,
  };
}
