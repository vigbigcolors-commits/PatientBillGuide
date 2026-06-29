import { describe, expect, it } from 'vitest';
import {
  estimatePartBCost,
  PART_B_DEDUCTIBLE_2026,
} from '../../src/lib/pricing/medicare-part-b';

describe('estimatePartBCost', () => {
  it('computes 80/20 split from Medicare allowed', () => {
    const est = estimatePartBCost({ medicareAllowed: 100, deductibleMet: PART_B_DEDUCTIBLE_2026 });
    expect(est.medicarePays).toBe(80);
    expect(est.patientCoinsurance).toBe(20);
  });

  it('shows remaining deductible when none met', () => {
    const est = estimatePartBCost({ medicareAllowed: 100, deductibleMet: 0 });
    expect(est.deductibleRemaining).toBe(PART_B_DEDUCTIBLE_2026);
    expect(est.detail).toMatch(/deductible/i);
  });
});
