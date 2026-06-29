import { readFileSync, existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findNcciUnbundlingFlags } from '../../src/lib/billing/ncci';
import type { BillLineItem } from '../../src/lib/billing/types';

const dataDir = join(import.meta.dirname, '../../public/data');

function loadNcciDataset() {
  const gzPath = join(dataDir, 'ncci-ptp.json.gz');
  const jsonPath = join(dataDir, 'ncci-ptp.json');
  if (existsSync(gzPath)) {
    return JSON.parse(gunzipSync(readFileSync(gzPath)).toString('utf8'));
  }
  return JSON.parse(readFileSync(jsonPath, 'utf8'));
}

describe('findNcciUnbundlingFlags', () => {
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

  it('matches live CMS index for panel + component test', () => {
    const ncci = loadNcciDataset();
    const items: BillLineItem[] = [
      { code: '80053', description: 'Panel', charged: 45, lineRaw: '', serviceDate: '02/01/2026' },
      { code: '84460', description: 'ALT', charged: 18, lineRaw: '', serviceDate: '02/01/2026' },
    ];
    const flags = findNcciUnbundlingFlags(items, ncci);
    expect(flags.some((f) => f.headline.includes('80053') && f.headline.includes('84460'))).toBe(true);
  });
});
