import type { PriceComparisonStatus } from './types';

export type FacilityFeeNoticeLevel = 'info' | 'alert';

export interface FacilityFeeNotice {
  level: FacilityFeeNoticeLevel;
  headline: string;
  detail: string;
}

/** CPT families where hospital facility fees commonly dominate the patient bill. */
const FACILITY_PRONE_PREFIXES = ['70', '71', '72', '73', '74', '77', '78', '79'];

const FACILITY_PRONE_CODES = new Set([
  '99281', '99282', '99283', '99284', '99285',
  '99291', '99292',
  '45378', '45380', '45385',
  '43235', '43239',
  '27447', '29881', '29827', '29806',
  '66984', '47562',
  '77067', '77063', '77066',
  '59400', '59510',
]);

const HIGH_RATIO_THRESHOLD = 5;
const EXTREME_RATIO_THRESHOLD = 10;

export function isFacilityProneCode(code: string): boolean {
  if (FACILITY_PRONE_CODES.has(code)) return true;
  return FACILITY_PRONE_PREFIXES.some((p) => code.startsWith(p));
}

export function getFacilityFeeNotice(
  code: string,
  medicareAllowed: number,
  charged?: number,
  comparisonStatus?: PriceComparisonStatus,
): FacilityFeeNotice | undefined {
  const facilityProne = isFacilityProneCode(code);
  const ratio = charged != null && medicareAllowed > 0 ? charged / medicareAllowed : undefined;

  const extremeCharge =
    ratio != null && ratio >= EXTREME_RATIO_THRESHOLD;
  const highCharge =
    ratio != null && ratio >= HIGH_RATIO_THRESHOLD;
  const wellAbove =
    comparisonStatus === 'well_above_fair_range' || comparisonStatus === 'above_fair_range';

  if (extremeCharge || (facilityProne && highCharge) || (facilityProne && wellAbove)) {
    const examples =
      code === '77067'
        ? 'Screening mammography often shows a modest physician fee on Medicare data while hospitals bill thousands in facility and technical charges separately.'
        : code.startsWith('71') || code.startsWith('72') || code.startsWith('74')
          ? 'Imaging at a hospital outpatient department frequently adds a facility fee far above the physician interpretation fee.'
          : code.startsWith('9928')
            ? 'Emergency visits commonly split into a physician ER code, hospital facility fee, imaging, and labs — each on separate lines.'
            : 'Major procedures and endoscopy often bill surgeon/professional fees separately from hospital outpatient facility charges.';

    return {
      level: 'alert',
      headline: 'Your charge may include facility fees not in this benchmark',
      detail: `${examples} Medicare allowed here (${medicareAllowed.toFixed(2)} reference) reflects the non-facility physician fee schedule only. Request an itemized bill separating professional vs facility/technical charges before concluding the price is "wrong."`,
    };
  }

  if (facilityProne) {
    return {
      level: 'info',
      headline: 'Physician fee only — facility charges billed separately',
      detail:
        'This benchmark is the CMS non-facility physician fee. Hospital outpatient, ER, and imaging center bills often add facility or technical fees that are not included in the number above.',
    };
  }

  if (highCharge || wellAbove) {
    return {
      level: 'alert',
      headline: 'Large gap vs Medicare — check for separate facility lines',
      detail:
        'A charge far above the physician fee schedule may reflect hospital facility fees, out-of-network pricing, or bundled outpatient services — not necessarily a coding error on this line alone.',
    };
  }

  return undefined;
}
