/**
 * Smoke test for Fair Price data pipeline (run while dev server is up).
 * node scripts/smoke-fair-price.mjs [baseUrl]
 */
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const base = process.argv[2] ?? 'http://localhost:4322';

async function parseBody(buf) {
  if (buf.length >= 2 && buf[0] === 0x1f && buf[1] === 0x8b) {
    const chunks = [];
    await pipeline(Readable.from(buf), createGunzip(), async function* (source) {
      for await (const chunk of source) chunks.push(chunk);
    });
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  }
  return JSON.parse(buf.toString('utf8'));
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return parseBody(Buffer.from(await res.arrayBuffer()));
}

function computePayment(rvu, gpci, cf) {
  const total = rvu.work * gpci.work + rvu.pe * gpci.pe + rvu.mp * gpci.mp;
  return Math.round(total * cf * 100) / 100;
}

async function main() {
  console.log(`Smoke test → ${base}`);

  const pageRes = await fetch(`${base}/tools/fair-price/`);
  if (!pageRes.ok) throw new Error(`Page ${pageRes.status}`);
  const html = await pageRes.text();
  const checks = [
    ['calculator-panel', html.includes('id="calculator-panel"')],
    ['cpt-suggestions', html.includes('id="cpt-suggestions"')],
    ['fair-price-loading', html.includes('id="fair-price-loading"')],
    ['tab-medicare', html.includes('id="tab-medicare"')],
    ['localized sidebar', html.includes('localized to your Medicare area')],
  ];
  for (const [name, ok] of checks) {
    console.log(ok ? '✓' : '✗', name);
    if (!ok) process.exitCode = 1;
  }

  const manifest = await fetchJson(`${base}/data/manifest.json`);
  console.log('✓ manifest', manifest.mpfs.url, manifest.cptIndex?.url);

  const [mpfs, zipMap, cptIndex] = await Promise.all([
    fetchJson(`${base}${manifest.mpfs.url}`),
    fetchJson(`${base}${manifest.zipLocality.url}`),
    fetchJson(`${base}${manifest.cptIndex.url}`),
  ]);

  const code = '99213';
  const zip = '10001';
  const record = mpfs.codes[code];
  const localityId = zipMap[zip];
  const locality = mpfs.localities[localityId];
  const allowed = computePayment(record.rvu, locality.gpci, mpfs.conversion_factor);
  const fairHigh = Math.round(allowed * 2.5 * 100) / 100;

  console.log(`✓ CPT ${code} + ZIP ${zip}: allowed $${allowed}, fair high $${fairHigh}`);
  console.log(`✓ CPT index: ${cptIndex.codes.length} entries`);

  const suggestions = cptIndex.codes.filter(([c]) => c.startsWith('992')).slice(0, 3);
  console.log('✓ typeahead sample:', suggestions.map(([c]) => c).join(', '));

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
