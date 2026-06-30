import { describe, expect, it } from 'vitest';
import { mpfsCodePrefix, prefixesForCodes } from '../../src/lib/pricing/mpfs-store';

describe('mpfs chunk helpers', () => {
  it('maps CPT prefix to first digit', () => {
    expect(mpfsCodePrefix('99213')).toBe('9');
    expect(mpfsCodePrefix('27447')).toBe('2');
    expect(mpfsCodePrefix(' 71046')).toBe('7');
  });

  it('dedupes prefixes for a code list', () => {
    expect(prefixesForCodes(['99213', '99214', '27447']).sort()).toEqual(['2', '9']);
  });
});
