# Phased Action Plan — PatientBillGuide.com

**Accelerated schedule** (full-time build). See [MASTER_PLAN.md](MASTER_PLAN.md).

Work in order within each week. Trust minimum first, then **Fair Price** ASAP.

---

## Week 1 — Foundation

**Goal:** Astro live on staging, trust minimum, homepage.

### Tasks

1. Initialize Astro (TypeScript, static output)
2. Design system: navy/teal, components per [DESIGN_DIRECTION.md](DESIGN_DIRECTION.md)
3. Layouts: `Base`, `Legal`, `Learn`, `Tool`
4. Components: `Header`, `Footer`, `Breadcrumbs`, `Disclaimer`, `TrustStrip`, `MethodologyFooter`
5. Trust pages (minimum): `/about/`, `/about/our-mission/`, `/methodology/` + 3 subpages, `/privacy/`, `/terms/`, `/disclaimer/`, `/authors/vigen/`
6. Homepage content-complete (tools may say "Coming soon")
7. `/how-it-works/`, `/pricing/`
8. `robots.txt`, `sitemap.xml`, `404`
9. Schema: Organization + WebSite on homepage
10. Deploy Cloudflare Pages (staging)

### Exit criteria

- ~10 pages live, mobile-responsive
- Lighthouse 90+ performance target

---

## Week 2 — First live tool

**Goal:** Fair Price Calculator + data pipeline start.

### Tasks

1. CMS MPFS pipeline spec → `mpfs-YYYY.json.gz` (see [TECHNICAL_SPEC.md](TECHNICAL_SPEC.md))
2. **Ship `/tools/fair-price/`** — CPT + ZIP → Medicare allowed + range
3. `/tools/` directory page
4. 5 Tier 1 CPT pages with embedded widget
5. `/codes/` hub skeleton

### Exit criteria

- Fair Price works client-side with real MPFS data
- Vitest for price lookup logic

---

## Week 3 — SEO base + audience

**Goal:** ~35 pages, AdSense-ready volume approaching.

### Tasks

1. 15 more CPT pages (20 total)
2. Learn pillars: `how-to-read-medical-bill`, `how-to-read-eob`
3. `/for/uninsured/`, `/for/insured/`, `/for/high-deductible/`
4. `/tools/medicare-lookup/`
5. `/learn/`, `/editorial-policy/`, `/contact/`
6. Internal linking pass

### Exit criteria

- ~35 indexed-ready pages
- Unique meta on every page

---

## Week 4 — Viral push

**Goal:** Reddit launch + more tools.

### Tasks

1. **Reddit launch** — Fair Price tool
2. `/tools/surprise-bill-check/`
3. `/tools/bill-auditor/` MVP (paste + flags)
4. `/tools/code-lookup/`
5. `/for/emergency/`, `/for/seniors-medicare/`
6. 10 more CPT pages (30 total)
7. Google Search Console submit

### Exit criteria

- 3+ interactive tools live
- First external traffic spike possible

---

## Week 5–6 — AdSense + expansion

**Goal:** 65+ pages, AdSense application.

### Tasks

1. 20 more CPT pages (50 Tier 1 total)
2. 5 compare pages, 5 category pages
3. `/tools/eob-analyzer/` basic
4. `/tools/dispute-letter/`, `/tools/negotiation-script/`
5. `/stories/` × 3 case studies
6. **Submit Google AdSense**
7. `/medicare/` hub + `billing-explained`

### Exit criteria

- 50 CPT pages ≥ 800 words original copy
- AdSense submitted
- 6+ tools live or landing-complete

---

## Week 7–8 — Medicare + hospital compare

### Tasks

1. `/tools/hospital-compare/` v1
2. `/medicare/plan-basics/`
3. `/tools/prior-auth-guide/` v1
4. Affiliate test (one guide, disclosed)
5. TikTok/Shorts content plan

---

## Post-launch — Jul 2026 ✅ site live

**Goal:** Index, scale CPT encyclopedia, activate growth channels.  
**Playbook:** [GROWTH_MASTER.md](GROWTH_MASTER.md)

### Done

- [x] Cloudflare Pages + `patientbillguide.com`
- [x] GSC domain property (DNS verification)
- [x] Sitemap `sitemap-index.xml` submitted (Success)
- [x] 163 URLs in sitemap · 130 CPT guides live

### Weeks 1–4 post-launch

1. **Batch 2 CPT** — +70 codes → **200 total**
2. **5 compare pages** — `99213-vs-99214`, ER levels, colonoscopy, …
3. **5 category hubs** — office-visits, imaging, lab, ER, surgery
4. GSC URL inspection — homepage, Fair Price, top 10 CPT
5. **Reddit launch** — Fair Price (one quality post)
6. **AdSense application**
7. `contact@patientbillguide.com` mailbox

### Exit criteria (month 1 post-launch)

- 200+ CPT pages, 10 compare/category URLs
- GSC shows discovered URLs from `sitemap-0.xml`
- AdSense submitted

---

## Month 3–6 — Scale (updated targets)

- CPT toward **500** (25–50 per weekly batch — see GROWTH_MASTER.md)
- 5 compare + 5 category pages *(if not done in month 1)*
- Hospital data pipeline
- EOB parser insurers expansion
- State surprise billing guides (top 10)
- Prep `/medicare/open-enrollment/` for Sep 2026
- Glossary terms (12+)
- 3 `/stories/` case studies

### Exit criteria

- **500 CPT** pages ≥ 800 words original copy
- **550–700** total indexed pages
- AdSense approved or pending
- 5k+ monthly organic visits (conservative path)

---

## Sep–Oct 2026 — Medicare AEP

- `/tools/medicare-plan-finder/` full
- `/medicare/open-enrollment/` hub
- Affiliate / lead gen (Medicare only, disclosed)

---

## Do NOT in Week 1

- Full 20-page EEAT before any tool
- AdSense tags
- Lead gen widgets
- EV/solar content (wrong site)

---

## AdSense placement (after approval)

- Below tool results (not above fold)
- Mid-article in learn (after 2nd H2)
- Never on disclaimer/privacy pages
