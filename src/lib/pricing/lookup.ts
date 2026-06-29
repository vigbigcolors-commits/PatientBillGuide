import { computeNonFacilityPayment } from './compute';
import {
  FAIR_RANGE_HIGH_MULTIPLIER,
  FAIR_RANGE_LOW_MULTIPLIER,
  WELL_ABOVE_MULTIPLIER,
  type Confidence,
  type LocalityNotice,
  type LocalitySource,
  type MpfsCodeRecord,
  type MpfsDataset,
  type PriceComparisonStatus,
  type PriceLookupInput,
  type PriceLookupResult,
  type UserPriceComparison,
  type ZipLocalityMap,
} from './types';
import { getFacilityFeeNotice } from './facility-fee';

/** Shown when a code is not in MPFS — stable examples, not dependent on sort order. */
const LOOKUP_EXAMPLES = ['99213', '99214', '71046', '77067', '93000'];

export function normalizeCptCode(raw: string): string | null {
  const code = raw.trim().replace(/\s/g, '');
  if (!/^\d{5}$/.test(code)) return null;
  return code;
}

export function normalizeZip(raw: string): string | null {
  const zip = raw.trim().slice(0, 5);
  if (!/^\d{5}$/.test(zip)) return null;
  return zip;
}

export function parseCurrency(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, '');
  if (!cleaned) return null;
  const value = Number.parseFloat(cleaned);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100) / 100;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function buildLocalityNotice(
  zip: string | undefined,
  matched: boolean,
  localityLabel?: string,
): LocalityNotice {
  if (!zip) {
    return {
      type: 'zip_omitted',
      message:
        'No ZIP provided — showing the national median Medicare rate. Add your ZIP for a localized benchmark.',
    };
  }
  if (matched && localityLabel) {
    return {
      type: 'zip_matched',
      message: `Rates localized to ${localityLabel} based on your ZIP code.`,
    };
  }
  return {
    type: 'zip_unknown',
    message: `ZIP ${zip} is not in our locality database — showing the national median Medicare rate.`,
  };
}

function resolveAllowed(
  record: MpfsCodeRecord,
  mpfs: MpfsDataset,
  zipMap: ZipLocalityMap,
  zip?: string,
): {
  allowed: number;
  localitySource: LocalitySource;
  localityLabel?: string;
  confidence: Confidence;
  localityNotice: LocalityNotice;
} {
  if (zip) {
    const localityId = zipMap[zip];
    const locality = localityId ? mpfs.localities[localityId] : undefined;
    if (locality) {
      const allowed = computeNonFacilityPayment(record.rvu, locality.gpci, mpfs.conversion_factor);
      return {
        allowed,
        localitySource: 'zip',
        localityLabel: locality.label,
        confidence: 'high',
        localityNotice: buildLocalityNotice(zip, true, locality.label),
      };
    }
  }

  return {
    allowed: record.national_median,
    localitySource: 'national',
    localityLabel: 'National median',
    confidence: zip ? 'medium' : 'low',
    localityNotice: buildLocalityNotice(zip, false),
  };
}

function compareCharged(
  charged: number,
  medicareAllowed: number,
  fairRangeHigh: number,
): UserPriceComparison {
  const wellAboveThreshold = fairRangeHigh * WELL_ABOVE_MULTIPLIER;
  let status: PriceComparisonStatus;

  if (charged < medicareAllowed) {
    status = 'below_medicare';
  } else if (charged <= fairRangeHigh) {
    status = 'within_fair_range';
  } else if (charged <= wellAboveThreshold) {
    status = 'above_fair_range';
  } else {
    status = 'well_above_fair_range';
  }

  const headlines: Record<PriceComparisonStatus, string> = {
    below_medicare: 'Below Medicare benchmark',
    within_fair_range: 'Within typical fair range',
    above_fair_range: 'Above typical fair range',
    well_above_fair_range: 'Well above typical fair range',
  };

  const details: Record<PriceComparisonStatus, string> = {
    below_medicare:
      'Your charge is below the Medicare allowed amount for this code. That can happen with discounts or bundled pricing — not necessarily a problem.',
    within_fair_range:
      'Your charge falls within the 1.5×–2.5× Medicare range we use as a typical self-pay or commercial benchmark. This does not guarantee the bill is correct — only that the price is not an extreme outlier.',
    above_fair_range:
      'Your charge is above the typical 2.5× Medicare range. You may want to ask for an itemized bill or discuss a self-pay discount.',
    well_above_fair_range:
      'Your charge is significantly above the typical range. Consider requesting an itemized bill, comparing hospital vs. office rates, and asking about financial assistance.',
  };

  return {
    charged,
    status,
    headline: headlines[status],
    detail: details[status],
  };
}

export function lookupPrice(
  input: PriceLookupInput,
  mpfs: MpfsDataset,
  zipMap: ZipLocalityMap,
): PriceLookupOutcome {
  const code = normalizeCptCode(input.code);
  if (!code) {
    return { error: true, message: 'Enter a valid 5-digit CPT procedure code (e.g. 99213).' };
  }

  const record = mpfs.codes[code];
  if (!record) {
    const examples = LOOKUP_EXAMPLES.join(', ');
    return {
      error: true,
      message: `We don't have benchmark data for CPT ${code} yet. Try ${examples}, or browse our CPT guides.`,
    };
  }

  const zip = input.zip ? normalizeZip(input.zip) : undefined;
  if (input.zip && !zip) {
    return { error: true, message: 'Enter a valid 5-digit US ZIP code, or leave it blank for a national estimate.' };
  }

  if (input.chargedAmountRaw != null && input.chargedAmountRaw.trim() && input.chargedAmount == null) {
    return {
      error: true,
      message: 'Enter a valid dollar amount (e.g. 250 or $1,287.44), or leave the price field blank.',
    };
  }

  const { allowed, localitySource, localityLabel, confidence, localityNotice } = resolveAllowed(
    record,
    mpfs,
    zipMap,
    zip,
  );
  const fairRangeLow = Math.round(allowed * FAIR_RANGE_LOW_MULTIPLIER * 100) / 100;
  const fairRangeHigh = Math.round(allowed * FAIR_RANGE_HIGH_MULTIPLIER * 100) / 100;

  const base: PriceLookupResult = {
    code,
    description: record.description_short,
    medicareAllowed: allowed,
    fairRangeLow,
    fairRangeHigh,
    localitySource,
    localityLabel,
    localityNotice,
    confidence,
    dataVersion: mpfs.version,
  };

  if (input.chargedAmount != null && input.chargedAmount > 0) {
    base.userComparison = compareCharged(input.chargedAmount, allowed, fairRangeHigh);
  }

  base.facilityFeeNotice = getFacilityFeeNotice(
    code,
    allowed,
    input.chargedAmount,
    base.userComparison?.status,
  );

  return base;
}
