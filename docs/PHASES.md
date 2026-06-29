# Phased Action Plan

Work **in order**. Do not skip EEAT shell (Phase 0) or build tools before trust pages.

---

## Phase 0 — Foundation (Week 1–2)

**Goal:** Trust shell live on staging. No working audit engine.

### Tasks

1. Initialize Astro project in repo root
2. Design system: typography, color palette (clinical trust — navy/teal), spacing, components
3. Shared layouts: `Base`, `Legal`, `Learn`, `Tool` (placeholder), `CPT` (placeholder)
4. Shared components: `Breadcrumbs`, `Disclaimer`, `MethodologyFooter`, `FAQ`, `TrustStrip`, `LastUpdated`
5. Build **all Section B pages** from [SITE_MAP.md](SITE_MAP.md)
6. Homepage — content-complete (tools may say "Coming soon" with full educational copy)
7. `/how-it-works/` + `/pricing/`
8. `robots.txt`, `sitemap.xml`, custom `404`
9. Schema: `Organization`, `WebSite` on homepage
10. Deploy to Cloudflare Pages (staging)
11. Google Search Console verification

### Exit criteria

- 18–20 pages live
- Every trust/legal page complete (not lorem ipsum)
- Mobile-responsive, accessible baseline
- Lighthouse 90+ performance target

### Do NOT in Phase 0

- CMS data pipeline
- Working bill parser
- AdSense tags (too early)

---

## Phase 1 — Tools & Audience Pages (Week 3)

**Goal:** ~30 pages. Full SEO landing content for tools (JS can be static placeholder).

### Tasks

1. `/tools/` directory page
2. All 6 tool landing pages — full copy per [PAGE_TEMPLATES.md](PAGE_TEMPLATES.md)
3. Audience pages: `/for/uninsured/`, `/for/insured/`, `/for/high-deductible/`
4. `/learn/` hub
5. Pillar articles: `how-to-read-medical-bill`, `how-to-read-eob`
6. Update sitemaps
7. Internal linking pass

### Exit criteria

- ~30 indexed-ready pages
- Each tool page has FAQ schema + methodology footer
- Unique meta titles/descriptions on every new page

---

## Phase 2 — CPT Encyclopedia Tier 1 (Week 4–6)

**Goal:** ~60 total pages. Apply for AdSense.

### Tasks

1. Content collection setup: `src/content/cpt/`
2. `/codes/` hub with client-side search (static filter OK)
3. Publish **50 Tier 1 CPT pages** — see [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md)
4. 5 compare pages (99213 vs 99214, etc.)
5. 5 category pages
6. Author bylines on all CPT pages
7. `FAQPage` + `BreadcrumbList` schema validation
8. **Submit Google AdSense application**

### Exit criteria

- 50 CPT pages ≥ 800 words each, original copy
- AdSense application submitted
- No thin/template-only pages

---

## Phase 3 — Data & First Live Tool (Week 7–10)

**Goal:** Real Medicare benchmarks. First interactive tool.

### Tasks

1. Build CMS data pipeline — see [TECHNICAL_SPEC.md](TECHNICAL_SPEC.md)
2. Generate `mpfs-YYYY.json.gz`, `ncci-YYYYQn.json.gz`, `zip-locality.json.gz`
3. Host data on Cloudflare CDN (immutable cache headers)
4. Implement lazy-load by user ZIP/locality
5. **Ship `/tools/fair-price/`** — fully working
6. Embed benchmark widget on CPT pages
7. Update methodology pages with real version numbers & dates
8. Vitest tests for price lookup logic

### Exit criteria

- Fair Price tool works end-to-end in browser
- CPT pages show live benchmarks for user's ZIP
- Methodology reflects actual data release

---

## Phase 4 — Core Tools (Week 11–16)

**Goal:** Full product suite MVP.

### Tasks

1. Findings engine + parser (manual entry + paste text)
2. **Bill Auditor** — duplicates, NCCI, price flags
3. **EOB Analyzer** — insured workflow
4. **Dispute Letter Builder** — PDF export, disclaimers
5. **Code Lookup** — redirect/enhance to CPT pages
6. `/stories/` — 3 anonymized examples
7. Service Worker for data bundle caching (optional but recommended)

### Exit criteria

- All 5 tools functional at MVP level
- "Bill looks normal" green path works
- Confidence levels shown on every flag

---

## Phase 5 — Scale (Month 4+)

**Goal:** Topical authority at scale.

### Tasks

1. CPT Tier 2 — 150 codes
2. `/learn/state/[state]-surprise-billing/` — top 10 states
3. Learn articles wave 2 (10–15 guides)
4. `/for/seniors-medicare/`, `/for/families/`
5. PDF bill upload (pdf.js text extract)
6. CPT Tier 3 toward 500+
7. OCR evaluation (photo bills) — only if metrics justify

---

## AdSense placement plan (after approval)

- Below tool results area (not blocking input)
- Mid-article in learn content (after paragraph 3–4)
- **Avoid** ads on: disclaimer, methodology, privacy, terms
- No popups, no deceptive ad labels

---

## Minimum pages before AdSense

| Category | Count |
|----------|-------|
| Trust/legal (Section B) | 15 |
| Home + how-it-works + pricing | 3 |
| Tools directory + 2 tool pages (min) | 3 |
| Learn pillars | 3 |
| CPT Tier 1 | 10 |
| **Total minimum** | **~25–35** |

Phase 2 targets ~60 for stronger YMYL approval odds.
