import { describe, expect, it } from 'vitest';
import { findNcciUnbundlingFlags, getNcciCheckStatus, getNcciEffectiveWindow } from '../../src/lib/billing/ncci';
import type { BillLineItem } from '../../src/lib/billing/types';
import { loadNcciForTestCodes } from './ncci-data';

describe('findNcciUnbundlingFlags', () => {
  it('exposes the effective window for a quarterly CMS version', () => {
    expect(getNcciEffectiveWindow('2026Q3')).toEqual({ start: '2026-07-01', end: '2026-09-30' });
    expect(getNcciEffectiveWindow('test')).toBeNull();
  });

  it('does not mark partial or seed-only quarterly data as fully evaluated', () => {
    const items: BillLineItem[] = [
      { code: '99213', description: 'Visit', charged: 185, lineRaw: '', serviceDate: '08/01/2026' },
    ];
    const provenance = (coverage: 'full' | 'partial' | 'seed_only') => ({
      coverage,
      requestedPrefixes: ['9'],
      loadedPrefixes: coverage === 'seed_only' ? [] : ['9'],
      failedPrefixes: coverage === 'full' ? [] : ['9'],
      seedFallbackUsed: coverage !== 'full',
    });

    expect(getNcciCheckStatus(items, { version: '2026Q3', source: 'test', provenance: provenance('full') })).toBe('evaluated');
    expect(getNcciCheckStatus(items, { version: '2026Q3', source: 'test', provenance: provenance('partial') })).toBe('partial_data');
    expect(getNcciCheckStatus(items, { version: '2026Q3', source: 'test', provenance: provenance('seed_only') })).toBe('seed_only');
  });

  it('flags known seed-style pair on same date', () => {
    const dataset = {
      version: 'test',
      source: 'test',
      pairs: [
        {
          column1: '99213',
          column2: '36415',
          modifier: 0,
          rationale: 'Venipuncture bundled with office visit',
        },
      ],
    };
    const items: BillLineItem[] = [
      { code: '99213', description: 'Visit', charged: 185, lineRaw: '' },
      { code: '36415', description: 'Draw', charged: 25, lineRaw: '', serviceDate: '01/15/2026' },
    ];
    items[0].serviceDate = '01/15/2026';
    const flags = findNcciUnbundlingFlags(items, dataset);
    expect(flags.some((f) => f.category === 'unbundling')).toBe(true);
  });

  it('does not flag pairs on different dates', () => {
    const dataset = {
      version: 'test',
      source: 'test',
      pairs: [{ column1: '99213', column2: '36415', modifier: 0, rationale: 'test' }],
    };
    const items: BillLineItem[] = [
      { code: '99213', description: 'Visit', charged: 185, lineRaw: '', serviceDate: '01/15/2026' },
      { code: '36415', description: 'Draw', charged: 25, lineRaw: '', serviceDate: '01/16/2026' },
    ];
    const flags = findNcciUnbundlingFlags(items, dataset);
    expect(flags).toHaveLength(0);
  });

  it('supports compact browser index tuples', () => {
    const dataset = {
      version: 'test',
      source: 'test',
      format: 'compact-v1',
      index: {
        '99213': [['36415', 0]],
      },
    };
    const items: BillLineItem[] = [
      { code: '99213', description: 'Visit', charged: 185, lineRaw: '', serviceDate: '01/15/2026' },
      { code: '36415', description: 'Draw', charged: 25, lineRaw: '', serviceDate: '01/15/2026' },
    ];
    const flags = findNcciUnbundlingFlags(items, dataset);
    expect(flags.some((f) => f.category === 'unbundling')).toBe(true);
  });

  it('matches live CMS index for panel + component test', () => {
    const ncci = loadNcciForTestCodes(['80053', '84460']);
    const items: BillLineItem[] = [
      { code: '80053', description: 'Panel', charged: 45, lineRaw: '', serviceDate: '08/01/2026' },
      { code: '84460', description: 'ALT', charged: 18, lineRaw: '', serviceDate: '08/01/2026' },
    ];
    const flags = findNcciUnbundlingFlags(items, ncci);
    expect(flags.some((f) => f.headline.includes('80053') && f.headline.includes('84460'))).toBe(true);
  });

  it('does not apply a quarterly file outside its effective date range or without a date', () => {
    const dataset = {
      version: '2026Q3',
      source: 'test',
      pairs: [{ column1: '99213', column2: '36415', modifier: 0 as const, rationale: 'test' }],
    };
    const octoberItems: BillLineItem[] = [
      { code: '99213', description: 'Visit', charged: 185, lineRaw: '', serviceDate: '10/01/2026' },
      { code: '36415', description: 'Draw', charged: 25, lineRaw: '', serviceDate: '10/01/2026' },
    ];
    const noDateItems = octoberItems.map(({ serviceDate, ...item }) => item);
    expect(findNcciUnbundlingFlags(octoberItems, dataset)).toHaveLength(0);
    expect(findNcciUnbundlingFlags(noDateItems, dataset)).toHaveLength(0);
  });
});
