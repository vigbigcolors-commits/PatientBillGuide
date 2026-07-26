import { describe, expect, it } from 'vitest';
import {
  buildCptSeoMeta,
  buildCptSeoTitle,
  CPT_SEO_META_MAX,
  CPT_SEO_META_MIN,
  CPT_SEO_TITLE_MAX,
  extractCptProcedureName,
} from '../../src/lib/seo/cpt-page-meta';

const sample = {
  code: '10060',
  title: 'CPT Code 10060 — Incision and drainage, abscess, simple Cost & Billing Guide',
  metaDescription:
    'CPT 10060 is incision and drainage, abscess, simple. See typical Medicare costs near $98, fair price ranges, and how to review your itemized bill.',
  summary: 'CPT 10060 is a simple abscess drainage procedure often billed in outpatient settings.',
  category: 'Surgery',
  categorySlug: 'surgery',
  typicalCosts: ['Medicare often near $98 nationally.'],
};

describe('cpt-page-meta', () => {
  it('extracts a readable procedure name', () => {
    expect(extractCptProcedureName(sample).toLowerCase()).toContain('incision');
  });

  it('builds a unique short SEO title', () => {
    const title = buildCptSeoTitle(sample);
    expect(title.startsWith('CPT 10060 — ')).toBe(true);
    expect(title.length).toBeLessThanOrEqual(CPT_SEO_TITLE_MAX);
    expect(title.toLowerCase()).not.toContain('cost & billing guide');
  });

  it('builds a unique meta in SEO length band', () => {
    const meta = buildCptSeoMeta(sample);
    expect(meta).toContain('10060');
    expect(meta).toContain('$98');
    expect(meta.length).toBeGreaterThanOrEqual(CPT_SEO_META_MIN);
    expect(meta.length).toBeLessThanOrEqual(CPT_SEO_META_MAX + 1);
  });

  it('keeps different codes producing different titles', () => {
    const a = buildCptSeoTitle(sample);
    const b = buildCptSeoTitle({
      ...sample,
      code: '10120',
      title: 'CPT Code 10120 — Incision and removal of foreign body Cost & Billing Guide',
      metaDescription: 'CPT 10120 is incision and removal of foreign body. See typical Medicare costs near $112.',
    });
    expect(a).not.toBe(b);
  });

  it('preserves E/M casing and strips trailing comma from Medicare hint', () => {
    const page = {
      code: '90838',
      title: 'CPT Code 90838 — Psychotherapy, about 60 minutes with E/M Cost & Billing Guide',
      metaDescription:
        'CPT 90838 is psychotherapy, about 60 minutes with e/m. See typical Medicare costs near $137, fair price ranges, and how to review your itemized bill.',
      summary: 'CPT 90838 bills psychotherapy with E/M.',
      category: 'Mental health',
      categorySlug: 'mental-health',
      typicalCosts: ['Medicare often near $137 nationally.'],
    };
    expect(buildCptSeoTitle(page)).toContain('E/M');
    expect(buildCptSeoMeta(page)).toContain('~$137)');
    expect(buildCptSeoMeta(page)).not.toContain('$137,');
  });
});
