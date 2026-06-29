# BillTox — Complete Site Map

Every URL planned for the site. Check off in `STATUS.md` as built.

**URL rules:** lowercase, trailing slash, semantic paths, self-referencing canonical.

---

## A. Homepage & Brand

| URL | Page | Priority |
|-----|------|----------|
| `/` | Home | P0 |
| `/how-it-works/` | How It Works | P0 |
| `/pricing/` | Free Forever (AdSense model, no paid upsell) | P0 |

---

## B. EEAT Foundation (build BEFORE tools & AdSense)

| URL | Page | Priority |
|-----|------|----------|
| `/about/` | About BillTox | P0 |
| `/about/our-mission/` | Why We Built This | P0 |
| `/about/team/` | Team | P0 |
| `/authors/` | Authors index | P0 |
| `/authors/[slug]/` | Author bio (e.g. `/authors/jane-doe/`) | P0 |
| `/methodology/` | Methodology hub | P0 |
| `/methodology/data-sources/` | CMS, NCCI, update cadence | P0 |
| `/methodology/price-benchmarks/` | Medicare + range formula | P0 |
| `/methodology/billing-flags/` | NCCI, duplicates, confidence levels | P0 |
| `/methodology/limitations/` | What we cannot detect | P0 |
| `/editorial-policy/` | How we write CPT summaries | P0 |
| `/corrections/` | Corrections & updates log | P0 |
| `/contact/` | Contact | P0 |
| `/privacy/` | Privacy Policy (client-side, no PHI) | P0 |
| `/terms/` | Terms of Use | P0 |
| `/disclaimer/` | Medical & legal disclaimer | P0 |
| `/accessibility/` | Accessibility statement | P0 |
| `/sitemap/` | HTML sitemap | P0 |

---

## C. Tools Hub

| URL | Tool | Audience | Priority |
|-----|------|----------|----------|
| `/tools/` | Tools directory | Both | P1 |
| `/tools/bill-auditor/` | Itemized Bill Auditor | Both | P1 landing, P4 live |
| `/tools/fair-price/` | Fair Price Calculator | Both | P1 landing, P3 live |
| `/tools/eob-analyzer/` | EOB Analyzer | Insured | P1 landing, P4 live |
| `/tools/dispute-letter/` | Dispute Letter Builder | Both | P1 landing, P4 live |
| `/tools/code-lookup/` | Quick CPT Lookup | Both | P1 landing, P4 live |

Each tool page must link to relevant methodology subpage in footer.

---

## D. Audience Landing Pages

| URL | Target | Priority |
|-----|--------|----------|
| `/for/uninsured/` | Self-pay, no insurance | P1 |
| `/for/high-deductible/` | HDHP, surprise bills | P1 |
| `/for/insured/` | EOB vs hospital bill | P1 |
| `/for/seniors-medicare/` | Medicare billing confusion | P2 |
| `/for/families/` | Pediatric, family plans | P2 |

---

## E. Learn Hub

### Hub & pillars

| URL | Topic | Priority |
|-----|-------|----------|
| `/learn/` | Learn hub index | P1 |
| `/learn/how-to-read-medical-bill/` | Pillar (3000+ words) | P1 |
| `/learn/how-to-read-eob/` | Pillar — insured | P1 |
| `/learn/surprise-medical-bills/` | No Surprises Act | P2 |
| `/learn/medical-billing-errors/` | Unbundling, duplicates | P2 |
| `/learn/how-to-negotiate-hospital-bill/` | Self-pay playbook | P2 |
| `/learn/how-to-dispute-insurance-claim/` | Insured playbook | P2 |
| `/learn/cpt-codes-explained/` | Bridge to encyclopedia | P2 |
| `/learn/medicare-allowed-amount/` | Benchmark education | P2 |

### Supporting content (waves)

| URL pattern | Examples | Priority |
|-------------|----------|----------|
| `/learn/guides/[slug]/` | Hospital bill vs physician bill | P2+ |
| `/learn/glossary/[term]/` | EOB, deductible, copay, CPT | P2+ |
| `/learn/state/[state]-surprise-billing/` | State-specific guides | P5 |

---

## F. CPT Encyclopedia

| URL | Scale | Priority |
|-----|-------|----------|
| `/codes/` | Encyclopedia hub + search | P2 |
| `/codes/cpt/[code]/` | e.g. `/codes/cpt/99214/` | P2 Tier 1: 50 |
| `/codes/hcpcs/[code]/` | e.g. `/codes/hcpcs/G0105/` | P3 |
| `/codes/category/[slug]/` | Office visits, imaging, surgery | P2 |
| `/codes/compare/[code]-vs-[code]/` | e.g. `99213-vs-99214` | P2 |

### Launch tiers

| Tier | Count | Timeline |
|------|-------|----------|
| Tier 1 | 50 codes | Phase 2 (week 4–6) |
| Tier 2 | 150 codes | Phase 5 (month 4+) |
| Tier 3 | 500+ codes | Ongoing |

---

## G. Stories (social proof)

| URL | Purpose | Priority |
|-----|---------|----------|
| `/stories/` | User stories index | P4 |
| `/stories/[slug]/` | Anonymized case study | P4 |

Format: self-reported outcomes. No guaranteed savings claims.

---

## H. Technical / SEO files

| Path | Purpose |
|------|---------|
| `/robots.txt` | Crawl rules |
| `/sitemap.xml` | Sitemap index |
| `/sitemap-pages.xml` | Core + trust pages |
| `/sitemap-tools.xml` | Tool pages |
| `/sitemap-learn.xml` | Learn content |
| `/sitemap-codes-1.xml` | CPT pages (split if needed) |
| `404.html` | Helpful recovery links |

---

## Sitemap index structure

```
sitemap-index.xml
├── sitemap-pages.xml      (A + B + D + G core)
├── sitemap-tools.xml      (C)
├── sitemap-learn.xml      (E)
└── sitemap-codes-1.xml    (F — add sitemap-codes-2.xml at scale)
```

---

## Internal linking rules

1. Every CPT page → Bill Auditor CTA (pre-fill `?code=`)
2. Every CPT page → Fair Price widget + methodology link
3. Every tool page → limitations + methodology footer
4. Every learn article → 1 mid-article + 1 end CTA to relevant tool
5. Homepage → all three pillars (tools, learn, codes)
6. Breadcrumbs on all pages below depth 1

---

## Page count targets

| Milestone | Total pages | Trigger |
|-----------|-------------|---------|
| Phase 0 complete | ~20 | GSC submit |
| Phase 1 complete | ~30 | — |
| Phase 2 complete | ~60 | AdSense application |
| Phase 4 complete | ~80+ | Full tool suite |
| Phase 5 | 200+ | Scale SEO |
