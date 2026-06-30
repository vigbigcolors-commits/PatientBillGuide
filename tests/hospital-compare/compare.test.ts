import { describe, expect, it } from 'vitest';
import { compareHospitalPrice } from '../../src/lib/hospital-compare/compare';
import { estimateFacilityRange } from '../../src/lib/hospital-compare/benchmarks';
import type { PriceLookupResult } from '../../src/lib/pricing/types';

function mockPrice(code: string, allowed: number): PriceLookupResult {
  return {
    code,
    description: 'Test procedure',
    medicareAllowed: allowed,
    fairRangeLow: allowed * 1.5,
    fairRangeHigh: allowed * 2.5,
    localitySource: 'zip',
    localityLabel: 'Manhattan NY',
    localityNotice: { type: 'zip_matched', message: 'Localized.' },
    confidence: 'high',
    dataVersion: '2026',
  };
}

describe('estimateFacilityRange', () => {
  it('uses override for mammogram at hospital outpatient', () => {
    const est = estimateFacilityRange('77067', 'hospital_outpatient', 131);
    expect(est.source).toBe('override');
    expect(est.low).toBe(650);
    expect(est.high).toBe(4200);
  });

  it('uses multipliers for generic office visit at ASC', () => {
    const est = estimateFacilityRange('99203', 'asc', 100);
    expect(est.source).toBe('multiplier');
    expect(est.low).toBeGreaterThan(0);
  });
});

describe('compareHospitalPrice', () => {
  it('flags extreme mammogram hospital charge', () => {
    const result = compareHospitalPrice(
      { code: '77067', hospitalCharge: 4200, careSetting: 'hospital_outpatient' },
      mockPrice('77067', 131),
    );
    expect(result.verdict).toBe('extreme');
    expect(result.insights.length).toBeGreaterThan(0);
    expect(result.checksRun.length).toBeGreaterThanOrEqual(4);
    expect(result.typicalTotalLow).toBeGreaterThan(result.medicarePhysician);
  });

  it('finds typical range for modest office charge', () => {
    const result = compareHospitalPrice(
      { code: '99213', hospitalCharge: 150, careSetting: 'physician_office' },
      mockPrice('99213', 108),
    );
    expect(['typical', 'below_typical', 'high']).toContain(result.verdict);
    expect(result.nextSteps.length).toBeGreaterThan(0);
  });

  it('includes ER insight for emergency setting', () => {
    const result = compareHospitalPrice(
      { code: '99284', hospitalCharge: 2890, careSetting: 'er' },
      mockPrice('99284', 110),
    );
    expect(result.insights.some((i) => i.id === 'er-bundle')).toBe(true);
  });
});
