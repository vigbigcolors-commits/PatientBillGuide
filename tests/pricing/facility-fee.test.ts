import { describe, expect, it } from 'vitest';
import { getFacilityFeeNotice, isFacilityProneCode } from '../../src/lib/pricing/facility-fee';

describe('isFacilityProneCode', () => {
  it('marks imaging and ER codes', () => {
    expect(isFacilityProneCode('71046')).toBe(true);
    expect(isFacilityProneCode('99284')).toBe(true);
    expect(isFacilityProneCode('77067')).toBe(true);
  });

  it('does not mark simple office visit alone', () => {
    expect(isFacilityProneCode('99213')).toBe(false);
  });
});

describe('getFacilityFeeNotice', () => {
  it('shows info for facility-prone code without charge', () => {
    const notice = getFacilityFeeNotice('71046', 29.44);
    expect(notice?.level).toBe('info');
    expect(notice?.headline).toMatch(/Physician fee only/i);
  });

  it('shows alert for mammogram with extreme charge', () => {
    const notice = getFacilityFeeNotice('77067', 131.44, 4200, 'well_above_fair_range');
    expect(notice?.level).toBe('alert');
    expect(notice?.detail).toMatch(/facility/i);
  });

  it('shows alert for high ratio on non-imaging code', () => {
    const notice = getFacilityFeeNotice('99213', 100, 1500, 'well_above_fair_range');
    expect(notice?.level).toBe('alert');
  });
});
