# PatientBillGuide.com — Complete Site Map

Every URL planned. Check off in `STATUS.md` as built.

**URL rules:** lowercase, trailing slash, semantic paths, self-referencing canonical.

---

## A. Homepage & Brand

| URL | Page | Priority |
|-----|------|----------|
| `/` | Home — 3 doors: bill / fair price / Medicare | P0 |
| `/how-it-works/` | How tools work, client-side, no PHI | P0 |
| `/pricing/` | Free Forever (AdSense model) | P0 |
| `/start/` | Wizard: uninsured / insured / Medicare / family | P1 |

---

## B. EEAT Foundation

| URL | Page | Priority |
|-----|------|----------|
| `/about/` | About PatientBillGuide | P0 |
| `/about/our-mission/` | Why honest numbers matter | P0 |
| `/about/team/` | Team (when 2+ people) | P3 |
| `/authors/` | Authors index | P0 |
| `/authors/vigen/` | Founder bio | P0 |
| `/methodology/` | Methodology hub | P0 |
| `/methodology/data-sources/` | CMS, NCCI, hospital files | P0 |
| `/methodology/price-benchmarks/` | Medicare + 1.5–2.5× range | P0 |
| `/methodology/billing-flags/` | NCCI, duplicates, confidence | P1 |
| `/methodology/limitations/` | What we cannot detect | P0 |
| `/editorial-policy/` | Original CPT copy rules | P1 |
| `/corrections/` | Corrections log | P2 |
| `/contact/` | Contact | P1 |
| `/privacy/` | Privacy (client-side, no PHI) | P0 |
| `/terms/` | Terms of Use | P0 |
| `/disclaimer/` | Medical & legal disclaimer | P0 |
| `/accessibility/` | Accessibility | P2 |
| `/sitemap/` | HTML sitemap | P1 |

---

## C. Tools Hub

### Directory

| URL | Page | Priority |
|-----|------|----------|
| `/tools/` | Tools index (CHECK / UNDERSTAND / ACT) | P0 |

### C1. CHECK — fair numbers (build first)

| URL | Tool | Live target |
|-----|------|-------------|
| `/tools/fair-price/` | Fair Price Calculator | Week 2 |
| `/tools/medicare-lookup/` | Medicare Allowed Lookup | Week 3 |
| `/tools/surprise-bill-check/` | Surprise Bill Risk Checker | Week 4 |
| `/tools/hospital-compare/` | Hospital Price Compare | Month 3–4 |

### C2. UNDERSTAND — parse documents

| URL | Tool | Live target |
|-----|------|-------------|
| `/tools/bill-auditor/` | Itemized Bill Auditor | Month 2 |
| `/tools/eob-analyzer/` | EOB Analyzer | Month 3 |
| `/tools/code-lookup/` | Quick CPT Lookup | Month 2 |

### C3. ACT — next steps

| URL | Tool | Live target |
|-----|------|-------------|
| `/tools/dispute-letter/` | Dispute Letter Builder | Month 4 |
| `/tools/negotiation-script/` | Self-Pay Negotiation Script | Month 4 |
| `/tools/prior-auth-guide/` | Prior Auth Navigator | Month 5–6 |

### C4. MEDICARE tools

| URL | Tool | Live target |
|-----|------|-------------|
| `/tools/medicare-plan-finder/` | Medicare Plan Finder (educational) | Oct 2026 |

Each tool page: methodology footer + limitations + disclaimer.

---

## D. Medicare Section (same project)

| URL | Page | Priority |
|-----|------|----------|
| `/medicare/` | Medicare hub | P1 |
| `/medicare/billing-explained/` | Part A/B, excess charges | P1 |
| `/medicare/plan-basics/` | Advantage vs Medigap vs Part D | P2 |
| `/medicare/open-enrollment/` | AEP seasonal (Oct 15 – Dec 7) | Sep 2026 |

---

## E. Audience Landing Pages

| URL | Target | Priority |
|-----|--------|----------|
| `/for/uninsured/` | Self-pay | P0 |
| `/for/insured/` | EOB confusion | P0 |
| `/for/high-deductible/` | HDHP | P1 |
| `/for/seniors-medicare/` | 65+ | P1 |
| `/for/emergency/` | ER bill panic | P1 |
| `/for/families/` | Pediatric, family plans | P2 |

---

## F. Learn Hub

| URL | Topic | Priority |
|-----|-------|----------|
| `/learn/` | Learn hub index | P0 |
| `/learn/how-to-read-medical-bill/` | Pillar | P0 |
| `/learn/how-to-read-eob/` | Pillar — insured | P0 |
| `/learn/surprise-medical-bills/` | No Surprises Act | P1 |
| `/learn/medical-billing-errors/` | Duplicates, unbundling | P1 |
| `/learn/how-to-negotiate-hospital-bill/` | Self-pay playbook | P1 |
| `/learn/how-to-dispute-insurance-claim/` | Insured playbook | P2 |
| `/learn/cpt-codes-explained/` | Bridge to encyclopedia | P1 |
| `/learn/medicare-allowed-amount/` | Benchmark education | P1 |
| `/learn/guides/[slug]/` | Supporting guides | P2+ |
| `/learn/glossary/[term]/` | deductible, copay, EOB… | P2 |
| `/learn/state/[state]-surprise-billing/` | State guides | P5 |

---

## G. CPT Encyclopedia

| URL | Scale | Priority |
|-----|-------|----------|
| `/codes/` | Hub + search | P1 |
| `/codes/cpt/[code]/` | e.g. `/codes/cpt/99214/` | Tier 1: 50 |
| `/codes/hcpcs/[code]/` | HCPCS codes | P3 |
| `/codes/category/[slug]/` | Office visits, imaging… | P1 |
| `/codes/compare/[a]-vs-[b]/` | e.g. 99213-vs-99214 | P1 |

| Tier | Count | Timeline |
|------|-------|----------|
| Tier 1 | 50 | Weeks 2–4 |
| Tier 2 | 150 | Months 4–6 |
| Tier 3 | 500+ | Year 2 |

---

## H. Stories

| URL | Purpose | Priority |
|-----|---------|----------|
| `/stories/` | Index | P2 |
| `/stories/[slug]/` | Anonymized case studies | P2 |

---

## I. Technical / SEO

| Path | Purpose |
|------|---------|
| `/robots.txt` | Crawl rules |
| `/sitemap.xml` | Sitemap index |
| `/sitemap-pages.xml` | Trust + audience |
| `/sitemap-tools.xml` | Tools |
| `/sitemap-learn.xml` | Learn |
| `/sitemap-codes-*.xml` | CPT (split at scale) |
| `/sitemap-medicare.xml` | Medicare section |
| `404.html` | Recovery links |

---

## Internal linking rules

1. Every CPT page → Fair Price widget + Bill Auditor CTA (`?code=`)
2. Every tool → methodology + limitations footer
3. Every learn article → 1 mid + 1 end CTA to relevant tool
4. Homepage → CHECK tools + learn + codes
5. `/start/` wizard → audience pages → primary tool
6. Breadcrumbs below depth 1

---

## Page count targets

| Milestone | Total | Trigger |
|-----------|-------|---------|
| Week 1 | ~10 | Staging live |
| Week 3 | ~35 | AdSense prep |
| Week 6 | ~65+ | AdSense apply |
| Month 6 | 75+ | Medicare hub |
| Year 2 | 200+ | Scale |
