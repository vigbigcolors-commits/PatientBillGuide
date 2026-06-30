import { describe, expect, it } from 'vitest';
import { filterCptSuggestions } from '../../src/scripts/cpt-typeahead';

const SAMPLE: [string, string][] = [
  ['99213', 'Office visit, established patient, low complexity'],
  ['99214', 'Office visit, established patient, moderate complexity'],
  ['71046', 'Chest X-ray, 2 views'],
  ['77067', 'Screening mammography, bilateral'],
];

describe('filterCptSuggestions', () => {
  it('filters by numeric prefix', () => {
    expect(filterCptSuggestions(SAMPLE, '992')).toEqual([
      ['99213', 'Office visit, established patient, low complexity'],
      ['99214', 'Office visit, established patient, moderate complexity'],
    ]);
  });

  it('filters by description keyword', () => {
    const matches = filterCptSuggestions(SAMPLE, 'mamm');
    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('77067');
  });

  it('returns popular codes for blank query', () => {
    const matches = filterCptSuggestions(SAMPLE, '   ');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0][0]).toBe('99213');
  });
});
