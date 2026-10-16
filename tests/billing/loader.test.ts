import { afterEach, describe, expect, it, vi } from 'vitest';
import { clearNcciCache, loadNcciForCodes } from '../../src/lib/billing/loader';

const manifest = {
  ncci: {
    version: '2026Q3',
    chunkUrl: '/data/ncci-chunks/{prefix}.json.gz',
    pairCount: 1728585,
  },
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

function mockNcciFetch(chunks: Record<string, Response>, seed = json({ version: 'seed-v1', index: {} })) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL | Request) => {
      const url = String(input);
      if (url.endsWith('/manifest.json')) return json(manifest);
      if (url.endsWith('/ncci-seed.json')) return seed;
      const prefix = /ncci-chunks\/([^/.]+)/.exec(url)?.[1];
      return (prefix && chunks[prefix]) || json({}, 404);
    }),
  );
}

describe('loadNcciForCodes coverage provenance', () => {
  afterEach(() => {
    clearNcciCache();
    vi.unstubAllGlobals();
  });

  it('marks all requested Q3 chunks as full coverage', async () => {
    mockNcciFetch({
      '8': json({ version: '2026Q3', prefix: '8', index: { '80053': [['84460', 0]] } }),
      '9': json({ version: '2026Q3', prefix: '9', index: {} }),
    });

    const dataset = await loadNcciForCodes(['80053', '99213']);

    expect(dataset.provenance).toEqual({
      coverage: 'full',
      requestedPrefixes: ['8', '9'],
      loadedPrefixes: ['8', '9'],
      failedPrefixes: [],
      seedFallbackUsed: false,
    });
  });

  it('marks missing chunks with a seed fallback as partial coverage', async () => {
    mockNcciFetch(
      { '8': json({ version: '2026Q3', prefix: '8', index: { '80053': [['84460', 0]] } }) },
      json({
        version: 'seed-v1',
        index: {
          '80053': [['99999', 0]],
          '99213': [['36415', 0]],
        },
      }),
    );

    const dataset = await loadNcciForCodes(['80053', '99213']);

    expect(dataset.provenance).toEqual({
      coverage: 'partial',
      requestedPrefixes: ['8', '9'],
      loadedPrefixes: ['8'],
      failedPrefixes: ['9'],
      seedFallbackUsed: true,
    });
    expect(dataset.index).toMatchObject({
      '80053': [['84460', 0]],
      '99213': [['36415', 0]],
    });
  });

  it('marks a seed-only fallback when every requested chunk is missing', async () => {
    mockNcciFetch({}, json({ version: 'seed-v1', index: { '99213': [['36415', 0]] } }));

    const dataset = await loadNcciForCodes(['99213']);

    expect(dataset.provenance).toEqual({
      coverage: 'seed_only',
      requestedPrefixes: ['9'],
      loadedPrefixes: [],
      failedPrefixes: ['9'],
      seedFallbackUsed: true,
    });
  });

  it('fails rather than inventing coverage when requested chunks and seed are unavailable', async () => {
    mockNcciFetch({}, json({}, 404));

    await expect(loadNcciForCodes(['99213'])).rejects.toThrow('NCCI data unavailable');
  });

  it('treats a version-mismatched chunk as failed instead of complete', async () => {
    mockNcciFetch(
      { '9': json({ version: '2026Q2', prefix: '9', index: { '99213': [['36415', 0]] } }) },
      json({ version: 'seed-v1', index: { '99213': [['36415', 0]] } }),
    );

    const dataset = await loadNcciForCodes(['99213']);

    expect(dataset.provenance).toEqual({
      coverage: 'seed_only',
      requestedPrefixes: ['9'],
      loadedPrefixes: [],
      failedPrefixes: ['9'],
      seedFallbackUsed: true,
    });
  });

  it('treats a prefix-mismatched chunk as failed instead of complete', async () => {
    mockNcciFetch(
      { '9': json({ version: '2026Q3', prefix: '8', index: { '99213': [['36415', 0]] } }) },
      json({ version: 'seed-v1', index: { '99213': [['36415', 0]] } }),
    );

    const dataset = await loadNcciForCodes(['99213']);

    expect(dataset.provenance?.coverage).toBe('seed_only');
    expect(dataset.provenance?.failedPrefixes).toEqual(['9']);
  });
});
