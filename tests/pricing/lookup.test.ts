import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { lookupPrice, normalizeCptCode, parseCurrency } from '../../src/lib/pricing/lookup';

const dataDir = join(import.meta.dirname, '../../public/data');
const mpfs = JSON.parse(readFileSync(join(dataDir, 'mpfs-2026.json'), 'utf8'));
const zipMap = JSON.parse(readFileSync(join(dataDir, 'zip-to-locality.json'), 'utf8'));

describe('normalizeCptCode', () => {
  it('accepts valid 5-digit codes', () => {
    expect(normalizeCptCode('99213')).toBe('99213');
    expect(normalizeCptCode(' 99213 ')).toBe('99213');
  });

  it('rejects invalid codes', () => {
    expect(normalizeCptCode('9921')).toBeNull();
    expect(normalizeCptCode('abcde')).toBeNull();
  });
});

describe('parseCurrency', () => {
  it('parses dollar amounts', () => {
    expect(parseCurrency('$250.00')).toBe(250);
    expect(parseCurrency('1,287.44')).toBe(1287.44);
  });
});

describe('lookupPrice', () => {
  it('returns Medicare allowed for known code + ZIP', () => {
    const result = lookupPrice({ code: '99213', zip: '10001' }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.medicareAllowed).toBe(107.37);
    expect(result.localitySource).toBe('zip');
    expect(result.localityNotice.type).toBe('zip_matched');
    expect(result.fairRangeLow).toBeCloseTo(result.medicareAllowed * 1.5, 2);
    expect(result.fairRangeHigh).toBeCloseTo(result.medicareAllowed * 2.5, 2);
    expect(result.confidence).toBe('high');
  });

  it('warns on unknown ZIP', () => {
    const result = lookupPrice({ code: '99213', zip: '99999' }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.localityNotice.type).toBe('zip_unknown');
  });

  it('rejects invalid price input', () => {
    const result = lookupPrice(
      { code: '99213', zip: '10001', chargedAmountRaw: '$abc', chargedAmount: undefined },
      mpfs,
      zipMap,
    );
    expect('error' in result).toBe(true);
  });

  it('falls back to national median for unknown ZIP', () => {
    const result = lookupPrice({ code: '93000', zip: '99999' }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.medicareAllowed).toBe(15.36);
    expect(result.localitySource).toBe('national');
    expect(result.confidence).toBe('medium');
  });

  it('uses national median when ZIP omitted', () => {
    const result = lookupPrice({ code: '71046' }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.medicareAllowed).toBe(33.07);
    expect(result.confidence).toBe('low');
  });

  it('compares user charge within fair range', () => {
    const result = lookupPrice({ code: '99213', zip: '10001', chargedAmount: 200 }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.userComparison?.status).toBe('within_fair_range');
  });

  it('flags well above fair range', () => {
    const result = lookupPrice({ code: '99213', zip: '10001', chargedAmount: 500 }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.userComparison?.status).toBe('well_above_fair_range');
  });

  it('handles screening mammography 77067 + Burbank ZIP', () => {
    const result = lookupPrice({ code: '77067', zip: '91506', chargedAmount: 5000 }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.medicareAllowed).toBe(144.65);
    expect(result.localityLabel).toMatch(/LOS ANGELES/i);
    expect(result.userComparison?.status).toBe('well_above_fair_range');
    expect(result.facilityFeeNotice?.level).toBe('alert');
  });

  it('includes facility info for imaging lookup without charge', () => {
    const result = lookupPrice({ code: '71046', zip: '10001' }, mpfs, zipMap);
    expect('error' in result).toBe(false);
    if ('error' in result) return;
    expect(result.facilityFeeNotice?.level).toBe('info');
  });

  it('returns error for unknown code', () => {
    const result = lookupPrice({ code: '12345' }, mpfs, zipMap);
    expect('error' in result).toBe(true);
  });
});
