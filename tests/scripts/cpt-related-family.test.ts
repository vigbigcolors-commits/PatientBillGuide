import { describe, expect, it } from 'vitest';
import { getCptRelatedFamily } from '../../scripts/cpt-related-family.mjs';

describe('getCptRelatedFamily', () => {
  it('separates semantic families that share the procedures category slug', () => {
    expect(getCptRelatedFamily('52000', 'procedures', 'Cystourethroscopy')).toBe('urology');
    expect(getCptRelatedFamily('90471', 'procedures', 'Immunization administration, first injection')).toBe(
      'immunization-administration',
    );
    expect(getCptRelatedFamily('90472', 'procedures', 'Immunization administration, each additional')).toBe(
      'immunization-administration',
    );
    expect(getCptRelatedFamily('92567', 'procedures', 'Tympanometry')).toBe('audiology-diagnostics');
    expect(getCptRelatedFamily('96365', 'procedures', 'IV infusion for therapy, initial hour')).toBe(
      'infusion-administration',
    );
    expect(getCptRelatedFamily('96369', 'procedures', 'Subcutaneous infusion for therapy, initial')).toBe(
      'infusion-administration',
    );
    expect(getCptRelatedFamily('96374', 'procedures', 'IV push, single or initial substance')).toBe(
      'infusion-administration',
    );
    expect(getCptRelatedFamily('99406', 'procedures', 'Tobacco cessation counseling, 3–10 minutes')).toBe(
      'tobacco-cessation',
    );
    expect(getCptRelatedFamily('99407', 'procedures', 'Tobacco cessation counseling, over 10 minutes')).toBe(
      'tobacco-cessation',
    );
    expect(getCptRelatedFamily('99490', 'procedures', 'Chronic care management, first 20 minutes')).toBe(
      'chronic-care-management',
    );
  });

  it('preserves the broad procedures family for codes outside the targeted scope', () => {
    expect(getCptRelatedFamily('20552', 'procedures', 'Trigger point injection')).toBe('procedures');
  });
});
