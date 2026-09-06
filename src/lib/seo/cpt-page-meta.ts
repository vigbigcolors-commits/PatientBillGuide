import type { CptPageData } from '../../data/cpt-codes';

/** Target bare <title> length before " | PatientBillGuide" (~50–60). */
export const CPT_SEO_TITLE_MAX = 58;
export const CPT_SEO_META_MIN = 110;
export const CPT_SEO_META_MAX = 158;

function truncateAtWord(text: string, max: number): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const sliced = t.slice(0, max - 1);
  const cut = sliced.lastIndexOf(' ');
  return `${(cut > 20 ? sliced.slice(0, cut) : sliced).trim()}…`;
}

function titleCasePhrase(raw: string): string {
  const small = new Set(['a', 'an', 'and', 'or', 'of', 'the', 'to', 'for', 'with', 'vs', 'in', 'on']);
  return raw
    .split(' ')
    .map((w, i) => {
      if (!w) return w;
      if (/^e\/m$/i.test(w)) return 'E/M';
      if (/^\d+(\.\d+)?$/i.test(w)) return w; // keep "0.5" as-is
      if (/^cm$/i.test(w)) return 'cm';
      const lead = w.match(/^\(+/)?.[0] ?? '';
      const trail = w.match(/\)+$/)?.[0] ?? '';
      const bare = trail ? w.slice(lead.length, -trail.length) : w.slice(lead.length);
      if (!bare) return w;
      if (/^dlco$/i.test(bare)) return `${lead}DLCO${trail}`;
      if (/^e\/m$/i.test(bare)) return `${lead}E/M${trail}`;
      const lower = bare.toLowerCase();
      if (i > 0 && small.has(lower)) return `${lead}${lower}${trail}`;
      if (/^\d/.test(bare) || /^[A-Z0-9-]{2,}$/.test(bare)) return `${lead}${bare}${trail}`;
      return `${lead}${lower.charAt(0).toUpperCase()}${lower.slice(1)}${trail}`;
    })
    .join(' ');
}

/** Pull a short procedure label from stored title / summary / meta. */
export function extractCptProcedureName(page: Pick<CptPageData, 'code' | 'title' | 'summary' | 'metaDescription'>): string {
  const fromTitle = page.title.match(
    /CPT(?:\s+Code)?\s+\d{5}\s*[—–-]\s*(.+?)(?:\s+Cost\s*&\s*Billing(?:\s+Guide)?)?\s*$/i,
  );
  if (fromTitle?.[1]) {
    return titleCasePhrase(fromTitle[1].replace(/\s+Cost\s*&\s*Billing.*$/i, '').trim());
  }

  const fromMeta = page.metaDescription.match(
    new RegExp(`^CPT\\s*${page.code}\\s+is\\s+(.+?)\\.`, 'i'),
  );
  if (fromMeta?.[1]) return titleCasePhrase(fromMeta[1].trim());

  const fromSummary = page.summary.match(new RegExp(`^CPT\\s*${page.code}\\s+is\\s+(.+?)\\.`, 'i'));
  if (fromSummary?.[1]) {
    return titleCasePhrase(truncateAtWord(fromSummary[1].trim(), 48).replace(/…$/, ''));
  }

  return `Code ${page.code}`;
}

/**
 * Unique, SEO-length title for CPT guides.
 * Format: `CPT 99213 — Established Office Visit`
 */
export function buildCptSeoTitle(page: Pick<CptPageData, 'code' | 'title' | 'summary' | 'metaDescription'>): string {
  const prefix = `CPT ${page.code} — `;
  const nameBudget = Math.max(18, CPT_SEO_TITLE_MAX - prefix.length);
  const name = truncateAtWord(extractCptProcedureName(page), nameBudget);
  return `${prefix}${name}`;
}

function medicareHint(page: Pick<CptPageData, 'metaDescription' | 'typicalCosts'>): string {
  // Do not let "near $137, fair…" capture the trailing comma as part of the amount.
  const money = /\$\d{1,3}(?:,\d{3})*(?:\.\d+)?/;
  const fromMeta = page.metaDescription.match(new RegExp(`near\\s+(${money.source})`, 'i'));
  if (fromMeta) return fromMeta[1];
  const blob = (page.typicalCosts || []).join(' ');
  const fromCosts = blob.match(money);
  return fromCosts?.[0] ?? 'Medicare';
}

/**
 * Unique meta description — keeps code-specific Medicare figure, varies CTA by category.
 */
export function buildCptSeoMeta(
  page: Pick<CptPageData, 'code' | 'title' | 'summary' | 'metaDescription' | 'category' | 'categorySlug' | 'typicalCosts'>,
): string {
  const name = extractCptProcedureName(page).replace(/…$/, '');
  const med = medicareHint(page);
  const bySlug: Record<string, string> = {
    'office-visits': `See Medicare (~${med}), fair range by ZIP, and how to review an office-visit bill.`,
    imaging: `Compare your charge to Medicare (~${med}), fair range by ZIP, and imaging bill tips.`,
    laboratory: `Medicare lab benchmark (~${med}), fair range by ZIP, and how to read lab lines on a bill.`,
    emergency: `ER code cost vs Medicare (~${med}), fair range, and what to check on an emergency bill.`,
    surgery: `Surgery code vs Medicare (~${med}), fair range by ZIP, and facility vs professional fees.`,
    preventive: `Preventive visit vs Medicare (~${med}), fair range, and how coverage can differ from problem visits.`,
    'nursing-facility': `Nursing facility care, CMS Medicare benchmark (~${med}), and bill or EOB review tips.`,
    'hospital-care': `Hospital E/M vs Medicare (~${med}), fair range, and inpatient billing notes.`,
  };
  const tail =
    bySlug[page.categorySlug] ??
    `Medicare benchmark (~${med}), fair price range by ZIP, and how to review your itemized bill.`;

  let meta = /\(/.test(name)
    ? `CPT ${page.code} — ${name}: ${tail}`
    : `CPT ${page.code} (${name}): ${tail}`;
  if (meta.length > CPT_SEO_META_MAX) {
    meta = truncateAtWord(meta, CPT_SEO_META_MAX).replace(/…$/, '.');
  }
  if (meta.length < CPT_SEO_META_MIN) {
    meta = `${meta} Free browser tool — no account required.`;
    if (meta.length > CPT_SEO_META_MAX) meta = truncateAtWord(meta, CPT_SEO_META_MAX).replace(/…$/, '.');
  }
  return meta;
}
