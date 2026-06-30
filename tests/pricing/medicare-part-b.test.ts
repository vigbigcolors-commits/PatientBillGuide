import { describe, expect, it } from 'vitest';
import {
  estimatePartBCost,
  analyzePartBCost,
  PART_B_DEDUCTIBLE_2026,
} from '../../src/lib/pricing/medicare-part-b';

describe('estimatePartBCost', () => {
  it('computes 80/20 split when deductible is fully met', () => {
    const est = estimatePartBCost({ medicareAllowed: 100, deductibleMet: PART_B_DEDUCTIBLE_2026 });
    expect(est.medicarePays).toBe(80);
    expect(est.coinsuranceAmount).toBe(20);
    expect(est.patientShare).toBe(20);
    expect(est.deductibleApplied).toBe(0);
    expect(est.deductibleFullyMet).toBe(true);
  });

  it('patient owes full allowed when service is entirely within remaining deductible', () => {
    const est = estimatePartBCost({ medicareAllowed: 100, deductibleMet: 0 });
    expect(est.patientShare).toBe(100);
    expect(est.medicarePays).toBe(0);
    expect(est.deductibleApplied).toBe(100);
    expect(est.coinsuranceAmount).toBe(0);
    expect(est.deductibleRemaining).toBe(PART_B_DEDUCTIBLE_2026);
  });

  it('applies partial deductible then 20% coinsurance on the balance', () => {
    const est = estimatePartBCost({ medicareAllowed: 500, deductibleMet: 0 });
    expect(est.deductibleApplied).toBe(257);
    expect(est.coinsuranceAmount).toBe(48.6);
    expect(est.patientShare).toBe(305.6);
    expect(est.medicarePays).toBe(194.4);
  });

  it('handles partial deductible already met this year', () => {
    const est = estimatePartBCost({ medicareAllowed: 200, deductibleMet: 200 });
    expect(est.deductibleRemaining).toBe(57);
    expect(est.deductibleApplied).toBe(57);
    expect(est.coinsuranceAmount).toBe(28.6);
    expect(est.patientShare).toBe(85.6);
    expect(est.medicarePays).toBe(114.4);
  });

  it('shows remaining deductible context when none met', () => {
    const est = estimatePartBCost({ medicareAllowed: 50, deductibleMet: 0 });
    expect(est.detail).toMatch(/deductible/i);
    expect(est.headline).toMatch(/deductible/i);
  });
});

describe('analyzePartBCost', () => {
  it('returns checks, next steps, and percentage breakdown', () => {
    const analysis = analyzePartBCost({ medicareAllowed: 500, deductibleMet: 0 });
    expect(analysis.checksRun.length).toBeGreaterThanOrEqual(4);
    expect(analysis.nextSteps.length).toBeGreaterThanOrEqual(4);
    expect(analysis.deductiblePct + analysis.coinsurancePct + analysis.medicarePct).toBe(100);
    expect(analysis.deductibleApplied).toBe(257);
    expect(analysis.patientShare).toBe(305.6);
  });

  it('shows coinsurance-only split when deductible met', () => {
    const analysis = analyzePartBCost({
      medicareAllowed: 100,
      deductibleMet: PART_B_DEDUCTIBLE_2026,
    });
    expect(analysis.deductiblePct).toBe(0);
    expect(analysis.coinsurancePct).toBe(20);
    expect(analysis.medicarePct).toBe(80);
    expect(analysis.deductibleFullyMet).toBe(true);
  });
});
