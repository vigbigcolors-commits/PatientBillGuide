import { describe, expect, it } from 'vitest';
import { getCptRelatedFamily } from '../../scripts/cpt-related-family.mjs';

type RelatedFixture = {
  code: string;
  family: string;
  related: { code: string; family: string }[];
};

function assertRelatedFamilyIsolation(fixtures: RelatedFixture[]) {
  for (const fixture of fixtures) {
    for (const target of fixture.related) {
      if (target.family !== fixture.family) {
        throw new Error(`${fixture.code} (${fixture.family}) links to ${target.code} (${target.family})`);
      }
    }
  }
}

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

  it('rejects a fixture that mixes unrelated related-code families', () => {
    expect(() =>
      assertRelatedFamilyIsolation([
        {
          code: '92004',
          family: 'ophthalmology',
          related: [{ code: '93000', family: 'cardiology' }],
        },
      ]),
    ).toThrow('92004 (ophthalmology) links to 93000 (cardiology)');
  });
});
