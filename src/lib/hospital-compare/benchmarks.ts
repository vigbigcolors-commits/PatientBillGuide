import type { CareSetting } from './types';

export const CARE_SETTING_LABELS: Record<CareSetting, string> = {
  physician_office: 'Physician office / clinic',
  asc: 'Ambulatory surgery center (ASC)',
  hospital_outpatient: 'Hospital outpatient department (HOPD)',
  er: 'Emergency department (ER)',
};

export const HOSPITAL_PIPELINE_LANES = [
  {
    title: 'Physician fee (MPFS)',
    detail: 'CMS Medicare Physician Fee Schedule — professional component only.',
    level: 'strong' as const,
  },
  {
    title: 'Facility / technical fee',
    detail: 'Hospital outpatient, ER, and imaging facility charges billed separately.',
    level: 'weak' as const,
  },
  {
    title: 'Your hospital charge',
    detail: 'Chargemaster or self-pay quote — often the sum of multiple line items.',
    level: 'strong' as const,
  },
  {
    title: 'Side-by-side context',
    detail: 'Educational ranges from CMS anchors + published transparency patterns — not your exact hospital.',
    level: 'weak' as const,
  },
];

export const HOSPITAL_GLOSSARY = [
  {
    term: 'Chargemaster',
    meaning: 'Hospital internal price list — often 5–10× what Medicare pays, before discounts.',
  },
  {
    term: 'Facility fee',
    meaning: 'Hospital outpatient or ER charge for using the building, equipment, and staff — separate from the doctor fee.',
  },
  {
    term: 'MPFS physician fee',
    meaning: 'Medicare allowed amount for the doctor\'s professional work — does not include hospital facility charges.',
  },
  {
    term: 'Typical total range',
    meaning: 'Our estimate of physician + facility components for your care setting — a benchmark, not a quote.',
  },
];

interface FacilityRange {
  low: number;
  high: number;
}

interface MultiplierRange {
  facilityMultiplierLow: number;
  facilityMultiplierHigh: number;
}

/** Default facility charge as multiple of MPFS physician fee by care setting. */
const SETTING_MULTIPLIERS: Record<CareSetting, MultiplierRange> = {
  physician_office: { facilityMultiplierLow: 0, facilityMultiplierHigh: 0.35 },
  asc: { facilityMultiplierLow: 1.2, facilityMultiplierHigh: 4 },
  hospital_outpatient: { facilityMultiplierLow: 2.5, facilityMultiplierHigh: 14 },
  er: { facilityMultiplierLow: 6, facilityMultiplierHigh: 32 },
};

/**
 * Curated absolute facility ranges (USD) from hospital price transparency filings
 * and CMS outpatient benchmarks — used when multiples alone understate facility fees.
 */
const CPT_FACILITY_OVERRIDES: Partial<
  Record<string, Partial<Record<CareSetting, FacilityRange>>>
> = {
  '77067': {
    hospital_outpatient: { low: 650, high: 4_200 },
    asc: { low: 180, high: 750 },
  },
  '71046': {
    hospital_outpatient: { low: 280, high: 1_400 },
    er: { low: 450, high: 2_200 },
  },
  '70553': {
    hospital_outpatient: { low: 1_800, high: 6_500 },
  },
  '99213': {
    hospital_outpatient: { low: 120, high: 650 },
    physician_office: { low: 0, high: 40 },
  },
  '99284': {
    er: { low: 1_200, high: 7_500 },
    hospital_outpatient: { low: 800, high: 4_500 },
  },
  '99285': {
    er: { low: 2_000, high: 12_000 },
  },
  '80053': {
    hospital_outpatient: { low: 35, high: 280 },
    er: { low: 60, high: 450 },
  },
  '27447': {
    hospital_outpatient: { low: 12_000, high: 42_000 },
    asc: { low: 6_500, high: 18_000 },
  },
  '45378': {
    hospital_outpatient: { low: 1_400, high: 5_500 },
    asc: { low: 900, high: 2_800 },
  },
  '93000': {
    hospital_outpatient: { low: 80, high: 450 },
    er: { low: 150, high: 750 },
  },
};

function roundUsd(n: number): number {
  return Math.round(n * 100) / 100;
}

export function estimateFacilityRange(
  code: string,
  careSetting: CareSetting,
  medicarePhysician: number,
): { low: number; high: number; source: 'override' | 'multiplier' } {
  const override = CPT_FACILITY_OVERRIDES[code]?.[careSetting];
  if (override) {
    return { low: override.low, high: override.high, source: 'override' };
  }

  const mult = SETTING_MULTIPLIERS[careSetting];
  let low = medicarePhysician * mult.facilityMultiplierLow;
  let high = medicarePhysician * mult.facilityMultiplierHigh;

  // Imaging families — facility dominates even without per-CPT override
  if (
    careSetting !== 'physician_office' &&
    (code.startsWith('70') || code.startsWith('71') || code.startsWith('72') || code.startsWith('74'))
  ) {
    low = Math.max(low, medicarePhysician * 4);
    high = Math.max(high, medicarePhysician * 18);
  }

  return {
    low: roundUsd(low),
    high: roundUsd(high),
    source: 'multiplier',
  };
}

export function benchmarkNoteFor(code: string, careSetting: CareSetting, source: 'override' | 'multiplier'): string {
  if (source === 'override') {
    return `Facility range for CPT ${code} in ${CARE_SETTING_LABELS[careSetting]} uses curated hospital transparency benchmarks.`;
  }
  return `Facility range estimated from CMS physician fee × typical ${CARE_SETTING_LABELS[careSetting]} multipliers. Request an itemized bill for your exact hospital.`;
}
