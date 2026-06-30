import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditBill, parseBillText } from '../../src/lib/billing';
import { loadNcciForTestCodes } from './ncci-data';



const dataDir = join(import.meta.dirname, '../../public/data');

const mpfs = JSON.parse(readFileSync(join(dataDir, 'mpfs-2026.json'), 'utf8'));

const zipMap = JSON.parse(readFileSync(join(dataDir, 'zip-to-locality.json'), 'utf8'));



describe('parseBillText', () => {

  it('parses CPT lines with amounts', () => {

    const items = parseBillText('99213 Office visit $185.00\n71046 Chest x-ray $340.00');

    expect(items).toHaveLength(2);

    expect(items[0].code).toBe('99213');

    expect(items[0].charged).toBe(185);

  });



  it('parses service dates and quantities', () => {

    const items = parseBillText('01/15/2026 99213 Office visit qty 2 $370.00');

    expect(items[0].serviceDate).toBe('01/15/2026');

    expect(items[0].quantity).toBe(2);

  });

});



describe('auditBill', () => {

  it('reports normal bill when charges are reasonable', () => {

    const items = parseBillText('99213 Office visit $150.00');

    const result = auditBill(items, mpfs, zipMap, '10001');

    expect(result.looksNormal).toBe(true);

    expect(result.flags.filter((f) => f.category === 'pricing' || f.category === 'duplicate')).toHaveLength(0);

  });



  it('flags duplicate lines on same date', () => {

    const items = parseBillText(

      '02/01/2026 71046 Chest x-ray $450.00\n02/01/2026 71046 Chest x-ray $450.00',

    );

    const result = auditBill(items, mpfs, zipMap, '90210');

    expect(result.flags.some((f) => f.category === 'duplicate')).toBe(true);

  });



  it('flags well above fair range for mammogram', () => {

    const items = parseBillText('01/12/2026 77067 Screening mammogram $5000.00');

    const result = auditBill(items, mpfs, zipMap, '91506');

    expect(result.looksNormal).toBe(false);

    expect(result.flags.some((f) => f.severity === 'high')).toBe(true);

  });



  it('flags unknown CPT codes', () => {

    const items = parseBillText('99999 Unknown procedure $500.00');

    const result = auditBill(items, mpfs, zipMap, '60601');

    expect(result.flags.some((f) => f.category === 'coverage')).toBe(true);

    expect(result.skippedUnknownCodes).toBe(1);

  });



  it('flags quantity greater than one', () => {

    const items = parseBillText('03/01/2026 97110 Physical therapy units 3 $100.50');

    const result = auditBill(items, mpfs, zipMap, '10001');

    expect(result.flags.some((f) => f.category === 'quantity')).toBe(true);

  });



  it('flags same CPT with different amounts on one date', () => {

    const items = parseBillText(

      '04/10/2026 99213 Office visit $185.00\n04/10/2026 99213 Office visit $350.00',

    );

    const result = auditBill(items, mpfs, zipMap, '10001');

    expect(result.flags.some((f) => f.headline.includes('different amounts'))).toBe(true);

  });

  it('flags NCCI unbundling pairs on same date', () => {
    const ncci = loadNcciForTestCodes(['80053', '84460']);
    const items = parseBillText(
      '01/15/2026 80053 Comprehensive metabolic panel $45.00\n01/15/2026 84460 ALT liver enzyme $18.00',
    );
    const result = auditBill(items, mpfs, zipMap, '10001', ncci);
    expect(result.flags.some((f) => f.category === 'unbundling')).toBe(true);
    expect(result.looksNormal).toBe(false);
  });

  it('returns stats and next steps', () => {
    const items = parseBillText('99213 Office visit $150.00');
    const result = auditBill(items, mpfs, zipMap, '10001');
    expect(result.stats.totalCharged).toBe(150);
    expect(result.stats.uniqueCodes).toBe(1);
    expect(result.checksRun.length).toBeGreaterThan(0);
    expect(result.nextSteps.length).toBeGreaterThan(0);
  });
});

