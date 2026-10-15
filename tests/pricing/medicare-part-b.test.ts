import { describe, expect, it } from 'vitest';
import {
  estimatePartBCost,
  analyzePartBCost,
  PART_B_DEDUCTIBLE_2026,
} from '../../src/lib/pricing/medicare-part-b';

describe('estimatePartBCost', () => {
  it('uses the published 2026 Part B deductible', () => {
    expect(PART_B_DEDUCTIBLE_2026).toBe(283);
  });

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
    expect(est.deductibleApplied).toBe(283);
    expect(est.coinsuranceAmount).toBe(43.4);
    expect(est.patientShare).toBe(326.4);
    expect(est.medicarePays).toBe(173.6);
  });

  it('handles partial deductible already met this year', () => {
    const est = estimatePartBCost({ medicareAllowed: 200, deductibleMet: 200 });
    expect(est.deductibleRemaining).toBe(83);
    expect(est.deductibleApplied).toBe(83);
    expect(est.coinsuranceAmount).toBe(23.4);
    expect(est.patientShare).toBe(106.4);
    expect(est.medicarePays).toBe(93.6);
  });

  it('handles the deductible boundary immediately before it is met', () => {
    const est = estimatePartBCost({ medicareAllowed: 100, deductibleMet: 282 });
    expect(est.deductibleApplied).toBe(1);
    expect(est.coinsuranceAmount).toBe(19.8);
    expect(est.patientShare).toBe(20.8);
    expect(est.medicarePays).toBe(79.2);
  });

  it('handles a larger service before any deductible is met', () => {
    const est = estimatePartBCost({ medicareAllowed: 400, deductibleMet: 0 });
    expect(est.deductibleApplied).toBe(283);
    expect(est.coinsuranceAmount).toBe(23.4);
    expect(est.patientShare).toBe(306.4);
    expect(est.medicarePays).toBe(93.6);
  });

  it('rejects invalid allowed amounts and deductible values', () => {
    expect(() => estimatePartBCost({ medicareAllowed: -1 })).toThrow(RangeError);
    expect(() => estimatePartBCost({ medicareAllowed: Number.NaN })).toThrow(RangeError);
    expect(() => estimatePartBCost({ medicareAllowed: Number.POSITIVE_INFINITY })).toThrow(RangeError);
    expect(() => estimatePartBCost({ medicareAllowed: 100, deductibleMet: -1 })).toThrow(RangeError);
    expect(() => estimatePartBCost({ medicareAllowed: 100, deductibleMet: 284 })).toThrow(RangeError);
    expect(() => estimatePartBCost({ medicareAllowed: 100, deductibleMet: Number.NaN })).toThrow(RangeError);
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
    expect(analysis.deductibleApplied).toBe(283);
    expect(analysis.patientShare).toBe(326.4);
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
