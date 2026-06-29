import { formatUsd } from './lookup';

/** CMS Part B annual deductible — update when CMS publishes annual figures. */
export const PART_B_DEDUCTIBLE_2026 = 257;

export const PART_B_COINSURANCE_RATE = 0.2;
export const PART_B_MEDICARE_SHARE = 0.8;

export interface PartBEstimateInput {
  medicareAllowed: number;
  /** Amount of Part B deductible already met this calendar year (default 0). */
  deductibleMet?: number;
}

export interface PartBEstimate {
  medicareAllowed: number;
  medicarePays: number;
  patientCoinsurance: number;
  deductibleRemaining: number;
  headline: string;
  detail: string;
}

export function estimatePartBCost(input: PartBEstimateInput): PartBEstimate {
  const { medicareAllowed, deductibleMet = 0 } = input;
  const deductibleRemaining = Math.max(0, PART_B_DEDUCTIBLE_2026 - deductibleMet);

  const medicarePays = Math.round(medicareAllowed * PART_B_MEDICARE_SHARE * 100) / 100;
  const patientCoinsurance = Math.round(medicareAllowed * PART_B_COINSURANCE_RATE * 100) / 100;

  const headline =
    deductibleMet >= PART_B_DEDUCTIBLE_2026
      ? `Typical Part B coinsurance: about ${formatUsd(patientCoinsurance)} (20%)`
      : `After deductible: about ${formatUsd(patientCoinsurance)} patient share (20%)`;

  const detail =
    deductibleMet >= PART_B_DEDUCTIBLE_2026
      ? `Traditional Medicare Part B usually pays 80% of the approved amount (${formatUsd(medicarePays)}) after the annual deductible is met. Your Medigap, retiree plan, or Medicaid may cover some or all of the ${formatUsd(patientCoinsurance)} coinsurance — this is an estimate only.`
      : `The ${formatUsd(PART_B_DEDUCTIBLE_2026)} Part B deductible applies before Medicare pays its 80% share. Until it is met, you may owe more than the ${formatUsd(patientCoinsurance)} coinsurance shown. About ${formatUsd(deductibleRemaining)} of the deductible may still apply this year (if you enter $0 met).`;

  return {
    medicareAllowed,
    medicarePays,
    patientCoinsurance,
    deductibleRemaining,
    headline,
    detail,
  };
}
