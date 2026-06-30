import { formatUsd } from '../pricing/lookup';
import type { PriceLookupResult } from '../pricing/types';
import {
  benchmarkNoteFor,
  CARE_SETTING_LABELS,
  estimateFacilityRange,
} from './benchmarks';
import type {
  CareSetting,
  HospitalCompareInput,
  HospitalCompareResult,
  HospitalInsight,
  HospitalVerdict,
} from './types';

function roundUsd(n: number): number {
  return Math.round(n * 100) / 100;
}

function buildVerdict(
  charge: number,
  totalLow: number,
  totalHigh: number,
  physician: number,
): { verdict: HospitalVerdict; headline: string; detail: string } {
  const mid = (totalLow + totalHigh) / 2;
  const ratioMid = mid > 0 ? charge / mid : 0;
  const ratioPhysician = physician > 0 ? charge / physician : 0;

  if (ratioPhysician >= 25 || ratioMid >= 3) {
    return {
      verdict: 'extreme',
      headline: 'Far above CMS-based hospital benchmarks',
      detail:
        `At ${ratioPhysician.toFixed(0)}× the Medicare physician fee, this looks like full chargemaster pricing or bundled facility charges. Compare ASC or independent imaging options when clinically appropriate, and request hospital financial assistance.`,
    };
  }

  if (charge < totalLow * 0.85) {
    return {
      verdict: 'below_typical',
      headline: 'Below our typical hospital total estimate',
      detail:
        'Your charge is under the low end of our physician + facility benchmark for this setting. Verify you have the full bill — facility, supply, and professional lines may arrive separately.',
    };
  }

  if (charge <= totalHigh * 1.15) {
    return {
      verdict: 'typical',
      headline: 'Within typical hospital total range',
      detail:
        `Your ${formatUsd(charge)} charge falls within our estimated ${formatUsd(totalLow)}–${formatUsd(totalHigh)} range for this procedure and care setting. That does not mean it is fair for your insurance — only that it is not an extreme outlier versus CMS-based benchmarks.`,
    };
  }

  if (charge <= totalHigh * 2) {
    return {
      verdict: 'high',
      headline: 'Above typical hospital range',
      detail:
        `Your charge exceeds our high-end estimate (${formatUsd(totalHigh)}) but is under 2× that figure. Ask for an itemized bill, financial assistance, and a self-pay or prompt-pay discount.`,
    };
  }

  return {
    verdict: 'very_high',
    headline: 'Well above typical hospital range',
    detail:
      'Your charge is more than double our high-end facility-inclusive estimate. Request itemization separating professional vs facility fees before paying in full.',
  };
}

function buildInsights(
  input: HospitalCompareInput,
  physician: number,
  facilityLow: number,
  facilityHigh: number,
  totalLow: number,
  totalHigh: number,
  verdict: HospitalVerdict,
): HospitalInsight[] {
  const insights: HospitalInsight[] = [];
  const ratioPhysician = physician > 0 ? input.hospitalCharge / physician : 0;

  if (input.careSetting !== 'physician_office' && ratioPhysician >= 8) {
    insights.push({
      id: 'facility-dominates',
      level: 'alert',
      headline: `Hospital charge is ${ratioPhysician.toFixed(0)}× the Medicare physician fee`,
      detail:
        'Most of what you are seeing is likely facility, technical, or ER surcharges — not the doctor\'s professional fee alone. Medicare MPFS shows only the physician portion.',
    });
  }

  if (facilityHigh > physician * 3 && input.careSetting !== 'physician_office') {
    insights.push({
      id: 'split-bill',
      level: 'watch',
      headline: 'Expect separate professional and facility lines',
      detail: `We estimate ${formatUsd(facilityLow)}–${formatUsd(facilityHigh)} in facility/technical fees on top of ~${formatUsd(physician)} physician allowed. Your single charge may bundle both.`,
    });
  }

  if (input.careSetting === 'er') {
    insights.push({
      id: 'er-bundle',
      level: 'info',
      headline: 'ER bills often include imaging, labs, and facility fees',
      detail:
        'A single ER CPT code rarely captures the full visit. Paste itemized lines into Bill Auditor to check duplicates and per-line outliers.',
    });
  }

  if (input.careSetting === 'asc' && verdict === 'high') {
    insights.push({
      id: 'asc-alt',
      level: 'info',
      headline: 'ASC vs hospital outpatient pricing',
      detail:
        'The same procedure at an ambulatory surgery center often costs less than hospital outpatient department facility fees — ask if your surgeon operates at both.',
    });
  }

  if (verdict === 'extreme' || verdict === 'very_high') {
    insights.push({
      id: 'negotiate',
      level: 'watch',
      headline: 'Self-pay negotiation may help',
      detail:
        'Hospitals often have financial assistance, charity care, and cash discounts below chargemaster. Ask in writing before paying the full amount.',
    });
  }

  const deduped = new Map<string, HospitalInsight>();
  for (const item of insights) deduped.set(item.id, item);
  return [...deduped.values()];
}

export function compareHospitalPrice(
  input: HospitalCompareInput,
  price: PriceLookupResult,
): HospitalCompareResult {
  const { low: facilityLow, high: facilityHigh, source } = estimateFacilityRange(
    price.code,
    input.careSetting,
    price.medicareAllowed,
  );

  const totalLow = roundUsd(price.medicareAllowed + facilityLow);
  const totalHigh = roundUsd(price.medicareAllowed + facilityHigh);
  const charge = input.hospitalCharge;
  const typicalMid = (totalLow + totalHigh) / 2;

  const { verdict, headline, detail } = buildVerdict(
    charge,
    totalLow,
    totalHigh,
    price.medicareAllowed,
  );

  const insights = buildInsights(
    input,
    price.medicareAllowed,
    facilityLow,
    facilityHigh,
    totalLow,
    totalHigh,
    verdict,
  );

  const physicianSharePct = typicalMid > 0
    ? Math.min(100, Math.round((price.medicareAllowed / typicalMid) * 100))
    : 0;
  const facilitySharePct = Math.max(0, 100 - physicianSharePct);

  const checksRun = [
    `Loaded CMS MPFS physician allowed: ${formatUsd(price.medicareAllowed)} for CPT ${price.code}`,
    `Care setting: ${CARE_SETTING_LABELS[input.careSetting]}`,
    `Estimated facility component: ${formatUsd(facilityLow)}–${formatUsd(facilityHigh)} (${source})`,
    `Typical total (physician + facility): ${formatUsd(totalLow)}–${formatUsd(totalHigh)}`,
    `Compared your charge ${formatUsd(charge)} to physician fee and facility-inclusive range`,
  ];

  const nextSteps = [
    'Request an itemized bill separating professional, facility, supply, and pharmacy lines.',
    `Look up CPT ${price.code} in Fair Price Calculator for physician-only Medicare context.`,
  ];

  if (verdict === 'high' || verdict === 'very_high' || verdict === 'extreme') {
    nextSteps.push('Ask about hospital financial assistance, charity care, and self-pay discounts.');
    nextSteps.push('Paste itemized charges into Bill Auditor for duplicate and per-line outlier flags.');
  }

  if (input.careSetting === 'er' || input.careSetting === 'hospital_outpatient') {
    nextSteps.push('If out-of-network providers were involved, run our Surprise Bill Checker.');
  }

  nextSteps.push('Use our dispute letter builder if you need a written request to billing.');

  return {
    code: price.code,
    description: price.description,
    careSetting: input.careSetting,
    careSettingLabel: CARE_SETTING_LABELS[input.careSetting],
    medicarePhysician: price.medicareAllowed,
    estimatedFacilityLow: facilityLow,
    estimatedFacilityHigh: facilityHigh,
    typicalTotalLow: totalLow,
    typicalTotalHigh: totalHigh,
    hospitalCharge: charge,
    chargeVsPhysicianRatio: roundUsd(price.medicareAllowed > 0 ? charge / price.medicareAllowed : 0),
    chargeVsTypicalMidRatio: roundUsd(typicalMid > 0 ? charge / typicalMid : 0),
    physicianSharePct,
    facilitySharePct,
    verdict,
    verdictHeadline: headline,
    verdictDetail: detail,
    insights,
    checksRun,
    nextSteps,
    confidence: price.confidence,
    localityLabel: price.localityLabel,
    localityNotice: price.localityNotice,
    dataVersion: price.dataVersion,
    benchmarkNote: benchmarkNoteFor(price.code, input.careSetting, source),
  };
}
