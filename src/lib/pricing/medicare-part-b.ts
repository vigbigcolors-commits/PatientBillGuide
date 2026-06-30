import { formatUsd } from './lookup';

/** CMS Part B annual deductible — update when CMS publishes annual figures. */
export const PART_B_DEDUCTIBLE_2026 = 257;

export const PART_B_COINSURANCE_RATE = 0.2;
export const PART_B_MEDICARE_SHARE = 0.8;

export const PART_B_PIPELINE_LANES = [
  {
    title: 'CMS allowed amount',
    detail: 'Physician fee schedule rate for your CPT code and Medicare locality (ZIP).',
    level: 'strong' as const,
  },
  {
    title: 'Part B deductible',
    detail: `$${PART_B_DEDUCTIBLE_2026} annual deductible applied first — you owe 100% until met.`,
    level: 'weak' as const,
  },
  {
    title: '80/20 coinsurance',
    detail: 'After deductible, Medicare pays 80% and you pay 20% of the approved amount.',
    level: 'strong' as const,
  },
  {
    title: 'Compare to MSN',
    detail: 'Match against your Medicare Summary Notice — Medigap and Advantage change your share.',
    level: 'weak' as const,
  },
];

export const PART_B_GLOSSARY = [
  {
    term: 'Allowed amount',
    meaning: 'What Medicare approves for this physician service — not the hospital chargemaster price.',
  },
  {
    term: 'Part B deductible',
    meaning: `Annual amount you pay before Medicare pays on physician services ($${PART_B_DEDUCTIBLE_2026} in 2026).`,
  },
  {
    term: 'Coinsurance',
    meaning: 'Your 20% share after the deductible is met on each approved service.',
  },
  {
    term: 'MSN / EOB',
    meaning: 'Medicare Summary Notice (Traditional) or plan EOB (Advantage) — official record of what you owe.',
  },
];

export interface PartBEstimateInput {
  medicareAllowed: number;
  /** Amount of Part B deductible already met this calendar year (default 0). */
  deductibleMet?: number;
}

export interface PartBEstimate {
  medicareAllowed: number;
  medicarePays: number;
  /** Total estimated patient responsibility for this service. */
  patientShare: number;
  /** Portion of this service applied to the remaining Part B deductible. */
  deductibleApplied: number;
  /** 20% coinsurance on the allowed amount after deductible is applied on this service. */
  coinsuranceAmount: number;
  deductibleRemaining: number;
  deductibleFullyMet: boolean;
  headline: string;
  detail: string;
  /** @deprecated Use coinsuranceAmount — kept for backward compatibility */
  patientCoinsurance: number;
}

export interface PartBAnalysis extends PartBEstimate {
  deductibleMetInput: number;
  annualDeductible: number;
  checksRun: string[];
  nextSteps: string[];
  /** Share of allowed amount applied to deductible (0–100). */
  deductiblePct: number;
  /** Share of allowed amount that is patient coinsurance (0–100). */
  coinsurancePct: number;
  /** Share Medicare pays on this service (0–100). */
  medicarePct: number;
}

function roundUsd(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Traditional Medicare Part B cost-sharing for a single physician-fee service:
 * deductible first (up to remaining annual amount), then 80/20 on the balance.
 */
export function estimatePartBCost(input: PartBEstimateInput): PartBEstimate {
  const { medicareAllowed, deductibleMet = 0 } = input;
  const deductibleRemaining = Math.max(0, PART_B_DEDUCTIBLE_2026 - deductibleMet);
  const deductibleFullyMet = deductibleRemaining <= 0;

  const deductibleApplied = Math.min(deductibleRemaining, medicareAllowed);
  const afterDeductible = medicareAllowed - deductibleApplied;
  const coinsuranceAmount = roundUsd(afterDeductible * PART_B_COINSURANCE_RATE);
  const medicarePays = roundUsd(afterDeductible * PART_B_MEDICARE_SHARE);
  const patientShare = roundUsd(deductibleApplied + coinsuranceAmount);

  let headline: string;
  let detail: string;

  if (deductibleFullyMet) {
    headline = `Typical Part B coinsurance: about ${formatUsd(patientShare)} (20%)`;
    detail =
      `Traditional Medicare Part B usually pays 80% of the approved amount (${formatUsd(medicarePays)}) after the annual deductible is met. ` +
      `Your Medigap, retiree plan, or Medicaid may cover some or all of the ${formatUsd(coinsuranceAmount)} coinsurance — this is an estimate only.`;
  } else if (deductibleApplied >= medicareAllowed) {
    headline = `Toward Part B deductible: about ${formatUsd(patientShare)}`;
    detail =
      `Until you meet the ${formatUsd(PART_B_DEDUCTIBLE_2026)} annual Part B deductible, Medicare typically pays $0 on physician services. ` +
      `This ${formatUsd(medicareAllowed)} allowed amount would count toward your remaining ${formatUsd(deductibleRemaining)} deductible. ` +
      `Medigap and Medicare Advantage plans work differently — this is an estimate only.`;
  } else {
    headline = `Estimated patient share: about ${formatUsd(patientShare)}`;
    detail =
      `Includes ${formatUsd(deductibleApplied)} toward your remaining ${formatUsd(deductibleRemaining)} Part B deductible, ` +
      `plus ${formatUsd(coinsuranceAmount)} coinsurance (20%) on the ${formatUsd(afterDeductible)} balance. ` +
      `Medicare would pay about ${formatUsd(medicarePays)} on this service. Medigap, Medicare Advantage, and Medicaid change what you owe.`;
  }

  return {
    medicareAllowed,
    medicarePays,
    patientShare,
    deductibleApplied,
    coinsuranceAmount,
    deductibleRemaining,
    deductibleFullyMet,
    headline,
    detail,
    patientCoinsurance: coinsuranceAmount,
  };
}

/** Full Part B analysis with pipeline context and suggested next steps. */
export function analyzePartBCost(input: PartBEstimateInput): PartBAnalysis {
  const deductibleMetInput = input.deductibleMet ?? 0;
  const estimate = estimatePartBCost(input);
  const allowed = estimate.medicareAllowed || 1;

  const checksRun = [
    `Loaded CMS Medicare Physician Fee Schedule allowed amount: ${formatUsd(estimate.medicareAllowed)}`,
    `Applied 2026 Part B annual deductible (${formatUsd(PART_B_DEDUCTIBLE_2026)}) with ${formatUsd(deductibleMetInput)} already met this year`,
    estimate.deductibleFullyMet
      ? 'Deductible met — applied standard 80/20 coinsurance on the approved amount'
      : estimate.deductibleApplied >= estimate.medicareAllowed
        ? 'Service counts entirely toward your remaining Part B deductible — Medicare pays $0'
        : `Split: ${formatUsd(estimate.deductibleApplied)} toward deductible + ${formatUsd(estimate.coinsuranceAmount)} coinsurance`,
    'Non-facility physician fee only — hospital outpatient and ER facility fees are separate line items',
  ];

  const nextSteps = [
    'Compare this estimate to your Medicare Summary Notice (Traditional) or Medicare Advantage EOB.',
    'If you have Medigap (Plan G, N, etc.), your supplement may cover coinsurance — check your policy booklet.',
  ];

  if (!estimate.deductibleFullyMet && deductibleMetInput === 0) {
    nextSteps.push(
      `Track progress toward the ${formatUsd(PART_B_DEDUCTIBLE_2026)} Part B deductible — physician services are 100% your responsibility until it is met.`,
    );
  }

  if (estimate.medicareAllowed > 200) {
    nextSteps.push(
      'Higher-cost services often include separate hospital facility charges — request an itemized bill and compare each CPT line.',
    );
  }

  nextSteps.push('Switch to the Fair Price tab to see how provider charges compare to Medicare allowed amounts.');
  nextSteps.push('Paste itemized bills into Bill Auditor for duplicate charges and price outlier flags.');

  return {
    ...estimate,
    deductibleMetInput,
    annualDeductible: PART_B_DEDUCTIBLE_2026,
    checksRun,
    nextSteps,
    deductiblePct: Math.round((estimate.deductibleApplied / allowed) * 100),
    coinsurancePct: Math.round((estimate.coinsuranceAmount / allowed) * 100),
    medicarePct: Math.round((estimate.medicarePays / allowed) * 100),
  };
}
