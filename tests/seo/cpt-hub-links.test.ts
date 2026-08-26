import { describe, expect, it } from 'vitest';
import { cptCategoryPages, resolveLiveCategorySlug } from '../../src/data/cpt-categories';
import { CODES_HUB_PRIORITY, sortCodesForHub } from '../../src/data/cpt-hub-priority';

describe('resolveLiveCategorySlug', () => {
  it('maps existing hub slugs and approved aliases only', () => {
    expect(resolveLiveCategorySlug('office-visits')).toBe('office-visits');
    expect(resolveLiveCategorySlug('preventive')).toBe('office-visits');
    expect(resolveLiveCategorySlug('emergency')).toBe('emergency-room');
    expect(resolveLiveCategorySlug('imaging')).toBe('imaging');
    expect(resolveLiveCategorySlug('laboratory')).toBe('laboratory');
    expect(resolveLiveCategorySlug('surgery')).toBe('surgery');
  });

  it('does not invent hubs for leftover generator slugs', () => {
    expect(resolveLiveCategorySlug('hospital-care')).toBeNull();
    expect(resolveLiveCategorySlug('diagnostics')).toBeNull();
    expect(resolveLiveCategorySlug('procedures')).toBeNull();
    expect(resolveLiveCategorySlug('mental-health')).toBeNull();
    expect(resolveLiveCategorySlug('physical-therapy')).toBeNull();
  });

  it('only returns slugs that exist as category pages', () => {
    for (const slug of Object.keys(cptCategoryPages)) {
      expect(resolveLiveCategorySlug(slug)).toBe(slug);
    }
  });
});

describe('sortCodesForHub', () => {
  it('places the 24 priority codes first in the specified order', () => {
    const codes = [
      { code: '10060' },
      { code: '99213' },
      { code: '66984' },
      { code: '27447' },
      { code: '99214' },
    ];
    const sorted = sortCodesForHub(codes).map((c) => c.code);
    expect(sorted.slice(0, 3)).toEqual(['99213', '99214', '27447']);
    expect(sorted.at(-1)).toBe('10060');
    expect(CODES_HUB_PRIORITY).toHaveLength(24);
  });
});
