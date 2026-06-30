import { describe, expect, it } from 'vitest';
import {
  normalizePastedHealthcareText,
  splitHealthcareLines,
} from '../../src/lib/text/normalize-pasted';
import { parseBillText } from '../../src/lib/billing/audit';

describe('normalizePastedHealthcareText', () => {
  it('joins PDF soft-hyphen line breaks', () => {
    const raw = 'Office visit es-\ntablished patient $185.00';
    expect(normalizePastedHealthcareText(raw)).toContain('established patient');
  });

  it('splits glued dollar amounts', () => {
    const raw = '99213 Office visit $185.00$28.00 copay';
    const out = normalizePastedHealthcareText(raw);
    expect(out).toContain('$185.00 $28.00');
  });

  it('converts tab columns to pipe separators', () => {
    const raw = '01/15/2026\t99213\tOffice visit\t$185.00';
    const out = normalizePastedHealthcareText(raw);
    expect(out).toContain('|');
  });

  it('drops page headers', () => {
    const raw = 'Page 2 of 5\n99213 Office visit $185.00';
    const out = normalizePastedHealthcareText(raw);
    expect(out).not.toMatch(/page 2 of 5/i);
    expect(out).toContain('99213');
  });
});

describe('parseBillText with noisy paste', () => {
  it('parses tab-separated PDF row', () => {
    const raw = '01/15/2026\t99213\tEstablished visit\t$185.00';
    const items = parseBillText(raw);
    expect(items.some((i) => i.code === '99213' && i.charged === 185)).toBe(true);
  });

  it('parses multi-space column paste', () => {
    const raw = '99213   Office visit   $185.00';
    const items = parseBillText(raw);
    expect(items[0]?.code).toBe('99213');
    expect(items[0]?.charged).toBe(185);
  });

  it('handles wrapped description before amount line', () => {
    const raw = '99213 Established patient office\nvisit $185.00';
    const lines = splitHealthcareLines(raw);
    expect(lines.some((l) => l.includes('99213') && l.includes('$185.00'))).toBe(true);
  });
});
