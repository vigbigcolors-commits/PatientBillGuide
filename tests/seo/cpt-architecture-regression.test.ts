import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { allCptPages, launchCptCodes } from '../../src/data/cpt-codes';
import { cptCategoryPages, resolveLiveCategorySlug } from '../../src/data/cpt-categories';
import { site } from '../../src/data/site';
import { buildCptSeoMeta } from '../../src/lib/seo/cpt-page-meta';
import { medicalWebPageSchema } from '../../src/lib/seo/schema';

const CPT_ROUTE_SOURCE = readFileSync(new URL('../../src/pages/codes/cpt/[code].astro', import.meta.url), 'utf8');
const BASE_LAYOUT_SOURCE = readFileSync(new URL('../../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const SITEMAP_CONFIG_SOURCE = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8');
const GENERATOR_SOURCES = [
  readFileSync(new URL('../../scripts/generate-cpt-batch.mjs', import.meta.url), 'utf8'),
  readFileSync(new URL('../../scripts/generate-cpt-pages.mjs', import.meta.url), 'utf8'),
];

const HOSPITAL_INITIAL_CARE = new Set(['99221', '99222', '99223']);
const ER_CODES = new Set(['99281', '99282', '99283', '99284', '99285']);
const OFFICE_VISIT_CODES = new Set(['99202', '99203', '99204', '99205', '99211', '99212', '99213', '99214', '99215']);
const CARDIOLOGY_CODES = new Set(['93000', '93005', '93017', '93307', '93308']);
const OPHTHALMOLOGY_CODES = new Set(['92004', '92012', '92014']);
const PROCEDURE_FAMILIES: Record<string, Set<string>> = {
  '52000': new Set(),
  '90471': new Set(['90472']),
  '90472': new Set(['90471']),
  '92567': new Set(),
  '96365': new Set(['96369', '96374']),
  '96369': new Set(['96365', '96374']),
  '96374': new Set(['96365', '96369']),
  '99406': new Set(['99407']),
  '99407': new Set(['99406']),
  '99490': new Set(),
};

function page(code: string) {
  const result = allCptPages[code];
  if (!result) throw new Error(`Missing CPT ${code}`);
  return result;
}

function relatedCodes(code: string) {
  return page(code).relatedCodes.map((related) => related.code);
}

function expectMetaAndSchema(code: string, required: RegExp, forbidden: RegExp) {
  const cpt = page(code);
  const meta = buildCptSeoMeta(cpt);
  const canonical = new URL(`/codes/cpt/${code}/`, site.url).href;
  const schema = medicalWebPageSchema({
    name: code,
    description: meta,
    url: canonical,
    dateModified: cpt.dateModified ?? '2026-08-15',
    authorName: 'PatientBillGuide',
    authorUrl: site.url,
  });

  expect(meta).toMatch(required);
  expect(meta).not.toMatch(forbidden);
  expect(schema.description).toBe(meta);
  expect(schema.url).toBe(canonical);
}

describe('CPT semantic classification regressions', () => {
  it('keeps nursing-facility CPT 99304–99310 out of the hospital-care template', () => {
    for (const code of ['99304', '99305', '99306', '99307', '99308', '99309', '99310']) {
      expect(page(code).categorySlug).toBe('nursing-facility');
      expectMetaAndSchema(code, /nursing facility care/i, /hospital|inpatient/i);
    }
  });

  it('keeps home-visit CPT pages out of the office-visit template', () => {
    for (const code of ['99341', '99342', '99350']) {
      expect(page(code).categorySlug).toBe('home-visits');
      expectMetaAndSchema(code, /home\/residence service/i, /office.visit/i);
    }
  });

  it('keeps critical-care CPT pages out of the emergency template', () => {
    for (const code of ['99291', '99292']) {
      expect(page(code).categorySlug).toBe('critical-care');
      expectMetaAndSchema(code, /critical care service/i, /\bER\b|emergency/i);
    }
  });
});

describe('CPT related-family regressions', () => {
  it('keeps confirmed semantic families isolated', () => {
    for (const code of OPHTHALMOLOGY_CODES) {
      expect(relatedCodes(code).some((target) => CARDIOLOGY_CODES.has(target))).toBe(false);
    }
    for (const code of ['93017', '93307', '93308']) {
      expect(relatedCodes(code).some((target) => OPHTHALMOLOGY_CODES.has(target))).toBe(false);
    }
    for (const code of ['99291', '99292']) {
      expect(relatedCodes(code).some((target) => ER_CODES.has(target))).toBe(false);
    }
    for (const code of ['99304', '99305', '99306', '99307', '99308', '99309', '99310']) {
      expect(relatedCodes(code).some((target) => HOSPITAL_INITIAL_CARE.has(target))).toBe(false);
    }
    for (const code of ['99341', '99342', '99350']) {
      expect(relatedCodes(code).some((target) => OFFICE_VISIT_CODES.has(target))).toBe(false);
    }
  });

  it('keeps imaging pages away from the unrelated cataract CPT 66984', () => {
    for (const code of launchCptCodes) {
      if (page(code).categorySlug === 'imaging') expect(relatedCodes(code)).not.toContain('66984');
    }
  });

  it('keeps approved procedure families inside their confirmed sibling set', () => {
    for (const [code, allowed] of Object.entries(PROCEDURE_FAMILIES)) {
      for (const target of relatedCodes(code)) expect(allowed.has(target)).toBe(true);
    }
  });
});

describe('CPT generator regressions', () => {
  it('uses cpt-related-family as the shared generator-time source of truth', () => {
    for (const source of GENERATOR_SOURCES) {
      expect(source).toContain("from './cpt-related-family.mjs'");
      expect(source).toContain('getCptRelatedFamily(');
    }
  });

  it('caps related codes at three without random or length-filling fallback', () => {
    for (const source of GENERATOR_SOURCES) {
      expect(source).toContain('return unique.slice(0, 3)');
      expect(source).not.toMatch(/Math\.random|relatedCodes\.length\s*<\s*3|unique\.length\s*<\s*3/);
    }
  });

  it('allows the effective CPT set to contain zero through three related codes', () => {
    const counts = launchCptCodes.map((code) => page(code).relatedCodes.length);
    expect(Math.max(...counts)).toBeLessThanOrEqual(3);
    expect(counts).toContain(0);
    expect(counts).toContain(1);
    expect(counts).toContain(2);
  });
});

describe('CPT routes, canonicalization, and indexability regressions', () => {
  it('renders related-code anchors only for generated CPT targets', () => {
    const generated = new Set(launchCptCodes);
    expect(generated.size).toBe(200);
    expect(CPT_ROUTE_SOURCE).toContain('{allCptPages[r.code] ? (');
    expect(CPT_ROUTE_SOURCE).toContain('<a href={`/codes/cpt/${r.code}/`}>');
    expect(CPT_ROUTE_SOURCE).toContain('<span>');

    for (const code of launchCptCodes) {
      expect(allCptPages[code]).toBeDefined();
      for (const target of relatedCodes(code)) {
        if (allCptPages[target]) expect(generated.has(target)).toBe(true);
      }
    }
  });

  it('keeps non-live related references non-clickable and out of generated CPT routes', () => {
    const generated = new Set(launchCptCodes);
    const nonLiveReferences = launchCptCodes.flatMap((code) =>
      relatedCodes(code)
        .filter((target) => !allCptPages[target])
        .map((target) => `${code} -> ${target}`),
    );

    for (const reference of nonLiveReferences) {
      const [, target] = reference.split(' -> ');
      expect(allCptPages[target]).toBeUndefined();
      expect(generated.has(target)).toBe(false);
    }
    // The template's allCptPages guard keeps these references as <span>, never anchors.
    expect(CPT_ROUTE_SOURCE).toMatch(/allCptPages\[r\.code\]\s*\?\s*\([\s\S]*?<a href=\{`\/codes\/cpt\/\$\{r\.code\}\/`\}>[\s\S]*?:\s*\([\s\S]*?<span>/);
  });

  it('keeps every generated CPT route HTTPS, self-canonical, and indexable', () => {
    expect(CPT_ROUTE_SOURCE).toContain('const canonical = new URL(pageUrl, site.url).href;');
    expect(CPT_ROUTE_SOURCE).not.toContain('noindex');
    expect(BASE_LAYOUT_SOURCE.match(/<link rel="canonical" href=\{canonical\} \/>/g)).toHaveLength(1);
    expect(BASE_LAYOUT_SOURCE).toContain('{noindex && <meta name="robots" content="noindex, follow" />}');
    expect(SITEMAP_CONFIG_SOURCE).toContain("site: 'https://patientbillguide.com'");

    for (const code of launchCptCodes) {
      const canonical = new URL(`/codes/cpt/${code}/`, site.url);
      expect(canonical.protocol).toBe('https:');
      expect(canonical.href).toBe(`https://patientbillguide.com/codes/cpt/${code}/`);
    }
  });
});

describe('semantic category slugs without live hubs', () => {
  it('never resolve to category routes or sitemap candidates', () => {
    for (const slug of ['nursing-facility', 'home-visits', 'critical-care']) {
      expect(resolveLiveCategorySlug(slug)).toBeNull();
      expect(cptCategoryPages[slug]).toBeUndefined();
      expect(CPT_ROUTE_SOURCE).not.toContain(`/codes/category/${slug}/`);
      expect(SITEMAP_CONFIG_SOURCE).not.toContain(`/codes/category/${slug}/`);
    }
  });
});
