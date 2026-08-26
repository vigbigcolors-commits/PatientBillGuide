import { describe, expect, it } from 'vitest';
import {
  sanitizeGa4EventParams,
  isConsentRequiredRegion,
  canAutoGrantAnalytics,
  CONSENT_REQUIRED_REGIONS,
} from '../../src/lib/analytics/ga4';

describe('ga4 sanitizeGa4EventParams', () => {
  it('allows safe tool event params', () => {
    expect(
      sanitizeGa4EventParams({
        source_page: '/tools/fair-price/',
        tool_name: 'fair_price',
        cpt_code: '99213',
      }),
    ).toEqual({
      source_page: '/tools/fair-price/',
      tool_name: 'fair_price',
      cpt_code: '99213',
    });
  });

  it('strips unknown keys and sensitive-looking values', () => {
    expect(
      sanitizeGa4EventParams({
        source_page: '/tools/bill-auditor/',
        tool_name: 'bill_auditor',
        // @ts-expect-error intentional abuse test
        patient_name: 'Jane Doe',
        // @ts-expect-error intentional abuse test
        bill_text: '99213 office visit $200',
      }),
    ).toEqual({
      source_page: '/tools/bill-auditor/',
      tool_name: 'bill_auditor',
    });
  });

  it('rejects invalid cpt_code and query strings in source_page', () => {
    expect(
      sanitizeGa4EventParams({
        source_page: '/tools/fair-price/?zip=90210',
        tool_name: 'fair_price',
        cpt_code: '9921X',
      }),
    ).toEqual({
      source_page: '/tools/fair-price/',
      tool_name: 'fair_price',
    });
  });
});

describe('ga4 consent regions', () => {
  it('includes UK and CH', () => {
    expect(CONSENT_REQUIRED_REGIONS).toContain('GB');
    expect(CONSENT_REQUIRED_REGIONS).toContain('CH');
    expect(isConsentRequiredRegion('de')).toBe(true);
    expect(isConsentRequiredRegion('US')).toBe(false);
  });

  it('fail-closes auto-grant for unknown or consent-required regions', () => {
    expect(canAutoGrantAnalytics(null)).toBe(false);
    expect(canAutoGrantAnalytics(undefined)).toBe(false);
    expect(canAutoGrantAnalytics('')).toBe(false);
    expect(canAutoGrantAnalytics('XX')).toBe(true); // known 2-letter, not EEA list
    expect(canAutoGrantAnalytics('US')).toBe(true);
    expect(canAutoGrantAnalytics('DE')).toBe(false);
    expect(canAutoGrantAnalytics('GB')).toBe(false);
    expect(canAutoGrantAnalytics('CH')).toBe(false);
    expect(canAutoGrantAnalytics('USA')).toBe(false); // malformed
  });
});
