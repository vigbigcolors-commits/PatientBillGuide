import fs from 'node:fs';
import path from 'node:path';

/** Audit built HTML for unique titles, metas, H1s and soft SEO length. */
function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === 'index.html' || e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const root = process.argv[2] || 'dist';
if (!fs.existsSync(root)) {
  console.error('Missing build output:', root);
  process.exit(1);
}

const files = walk(root);
const titles = new Map();
const metas = new Map();
const h1s = new Map();
const soft = [];

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const t = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
  const m = (html.match(/name="description" content="([^"]*)"/i) || [])[1] || '';
  const h1 =
    (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, '').trim() || '';
  const url = f.replace(/\\/g, '/').replace(new RegExp(`^${root.replace(/\\/g, '/')}`), '');

  if (!t) soft.push({ type: 'missing-title', url });
  if (!m && !url.includes('/404')) soft.push({ type: 'missing-meta', url });

  if (!titles.has(t)) titles.set(t, []);
  titles.get(t).push(url);
  if (m) {
    if (!metas.has(m)) metas.set(m, []);
    metas.get(m).push(url);
  }
  if (h1) {
    if (!h1s.has(h1)) h1s.set(h1, []);
    h1s.get(h1).push(url);
  }

  // Soft SEO: title before brand suffix ( | PatientBillGuide)
  const bare = t.replace(/\s*\|\s*PatientBillGuide\s*$/i, '');
  if (bare.length > 65 && !url.includes('/404')) soft.push({ type: 'title-long', url, n: bare.length, bare });
  if (m.length > 165) soft.push({ type: 'meta-long', url, n: m.length });
  if (m.length > 0 && m.length < 70 && !url.includes('/404')) soft.push({ type: 'meta-short', url, n: m.length });
}

const dupT = [...titles.entries()].filter(([t, u]) => t && u.length > 1);
const dupM = [...metas.entries()].filter(([, u]) => u.length > 1);
const dupH = [...h1s.entries()].filter(([, u]) => u.length > 1);

console.log(JSON.stringify({
  pages: files.length,
  dupTitles: dupT.length,
  dupMetas: dupM.length,
  dupH1: dupH.length,
  soft: soft.length,
}, null, 2));

let failed = false;
for (const [t, u] of dupT) {
  failed = true;
  console.error('DUP_TITLE', t, '->', u.join(' | '));
}
for (const [m, u] of dupM) {
  failed = true;
  console.error('DUP_META', m.slice(0, 100), '->', u.join(' | '));
}
for (const [h, u] of dupH) {
  failed = true;
  console.error('DUP_H1', h, '->', u.join(' | '));
}

const longTitles = soft.filter((s) => s.type === 'title-long');
const longMetas = soft.filter((s) => s.type === 'meta-long');
console.log('title_long_count', longTitles.length);
console.log('meta_long_count', longMetas.length);
for (const s of longTitles.slice(0, 30)) console.log('TITLE_LONG', s.n, s.url, JSON.stringify(s.bare));
for (const s of longMetas.slice(0, 15)) console.log('META_LONG', s.n, s.url);

// Soft lengths: fail on regressions
if (failed) {
  console.error('FAIL: duplicate title/meta/H1 violates uniqueness rule');
  process.exit(1);
}
if (longTitles.length > 20) {
  console.error('FAIL: too many long titles (>', 20, ') — fix SEO titles');
  process.exit(1);
}
if (longMetas.length > 0) {
  console.error('FAIL: meta descriptions over 165 chars — shorten them');
  process.exit(1);
}
console.log('OK: all titles, metas, and H1s unique; lengths within SEO band');
if (longTitles.length) console.log('WARN: soft title-long remaining', longTitles.length);
