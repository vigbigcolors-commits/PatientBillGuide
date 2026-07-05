# PatientBillGuide — Growth & SEO Master Plan

**Locked:** 2026-07-05  
**Status:** Site live · GSC verified · Sitemap submitted  
**Audience:** You + future agents — single source for growth, SEO, and CPT scale.

---

## 0. Super platform vision

PatientBillGuide is **not** a CPT spam site. It is a **free, private, client-side** US healthcare billing transparency platform:

```
CMS public data (MPFS, NCCI, ZIP)
        ↓
   Data engine (chunked, IndexedDB)
        ↓
┌───────────────────────────────────────────┐
│  CHECK          UNDERSTAND        ACT      │
│  Fair Price     Bill Auditor      Dispute  │
│  Surprise Bill  EOB Analyzer    Letters  │
│  Hospital Cmp   Medicare tab              │
└───────────────────────────────────────────┘
        ↓
   LEARN + CPT encyclopedia (long-tail SEO)
        ↓
   Trust (EEAT, methodology, privacy)
```

**Competitive moat:** Real tools that work offline in-browser + original content + Medicare anchors — not generic AI articles.

**Scale path:** 130 CPT → **500 in 6 months** → 1,500 in 12 months → toward MPFS ceiling (~7,740) over years.

---

## 1. Executive snapshot

| Asset | Status | Strength |
|-------|--------|----------|
| **Domain** | [patientbillguide.com](https://patientbillguide.com/) live on Cloudflare | SSL, CDN, privacy story |
| **Tools** | 7 interactive (Fair Price, Bill Auditor, EOB, Surprise Bill, Dispute Letter, Medicare tab, …) | Real utility → backlinks, Reddit, retention |
| **CPT encyclopedia** | **130 guides** at `/codes/cpt/[code]/` | Long-tail SEO engine (started) |
| **Learn pillars** | 3 articles + hub | YMYL trust, Discover potential |
| **Trust / EEAT** | Methodology, privacy, disclaimer, author | Required for billing YMYL |
| **Data** | CMS MPFS **7,740 codes** in pipeline | Fair Price works per ZIP |
| **Tests** | 84 Vitest | Engine credibility |
| **GSC** | Domain property verified | Sitemap `sitemap-index.xml` → **Success** |
| **Sitemap** | **163 URLs** in `sitemap-0.xml` | robots.txt points to index |

**What we are NOT doing:** 10,000 CPT pages in 10 days, AMA copy, “fraud” claims, server-side PHI.

---

## 2. Long tail — what it actually means for us

**Long tail SEO** = ranking for **many specific, low-competition queries** instead of one giant keyword.

Examples that already match our pages:

- `CPT 99214 cost`
- `what does CPT 77067 mean on my bill`
- `Medicare allowed amount 71046`
- `how to read an EOB allowed amount`

**Long tail ≠ 10,000 pages.**  
It is a *strategy*. One strong CPT page **is** a long-tail page.

| Concept | Reality |
|---------|---------|
| Long tail strategy | ✅ Core plan |
| 10,000 CPT URLs day one | ❌ Not in locked decisions |
| MPFS data ceiling | ~7,740 billable codes (technical max, not a launch target) |
| Locked CPT rollout | **50 → 150 → 500+** (tiered over months/years) |

---

## 3. Traffic mix (6-month view)

| Channel | Role | Notes |
|---------|------|-------|
| **Google SEO** | Long-term base | CPT + learn + compare pages |
| **Reddit** | Launch spikes | r/personalfinance, r/HealthInsurance + Fair Price demo |
| **TikTok / Shorts** | Awareness | Bill stories + “check before you pay” |
| **Google Discover** | Learn articles | Pillars with fresh dates |
| **Direct / return** | Tools | Browser-only privacy builds trust |

**Not Google-only** for 6-month goals (see DECISIONS.md #26).

---

## 4. Content pillars — strength ranking

### Tier A — Highest ROI (do more of this)

1. **CPT guides** `/codes/cpt/[code]/`  
   - 800+ words original copy, FAQ schema, Fair Price widget, Bill Auditor CTA  
   - **130 live** → target **500** in 6 months  

2. **Compare pages** `/codes/compare/[a]-vs-[b]/` *(not built yet — high priority)*  
   - e.g. `99213-vs-99214`, `99283-vs-99284`  
   - Few pages, **very** high intent  

3. **Category hubs** `/codes/category/[slug]/` *(not built yet)*  
   - office-visits, imaging, laboratory, emergency-room, surgery  

4. **Learn pillars** `/learn/...`  
   - how-to-read-medical-bill, how-to-read-eob, cpt-codes-explained  
   - Bridge traffic → tools + CPT encyclopedia  

### Tier B — Month 3–6

5. **Glossary** `/learn/glossary/[term]/` — deductible, copay, allowed-amount, …  
6. **State surprise billing** `/learn/state/[state]-surprise-billing/` — top 10 states first  
7. **Audience landings** `/for/uninsured/`, `/for/insured/`, `/for/seniors-medicare/`  
8. **Stories** `/stories/[slug]/` — anonymized case studies (social proof)  

### Tier C — Year 2+

9. HCPCS `/codes/hcpcs/[code]/`  
10. Hospital compare data pages  
11. Medicare open enrollment (Oct 2026 seasonal)  

---

## 5. CPT scaling — the realistic math

**Current:** 130 CPT pages  
**MPFS codes available:** 7,740 (only publish codes **in** `supported-cpt-codes.ts`)

| Target | New pages | Over 6 months (~26 weeks) | Per week (batch deploy) |
|--------|-----------|---------------------------|-------------------------|
| **200** | +70 | — | One batch now |
| **500** | +370 | ~14/week | **25–50 per deploy**, every 1–2 weeks |
| **800** | +670 | ~26/week | Aggressive but OK if quality holds |
| **1,500** | +1,370 | ~53/week | Only if templates stay 800+ words & varied |

**Daily average (500 in 6 months):** ~**2 CPT pages/day** — deployed in **weekly batches**, not literally every day.

### Rollout phases

| Phase | CPT total | Calendar | Other content |
|-------|-----------|----------|---------------|
| **Now** | 130 | ✅ | GSC, sitemap |
| **Batch 2** | 200 | Weeks 1–2 | 5 compare + 5 category pages |
| **Month 2–3** | 350 | +25–50/week | 3 learn articles, glossary start |
| **Month 4–6** | **500** | steady batches | State guides (10), AdSense live |
| **Month 6–12** | 500 → 1,500 | slow ramp | HCPCS pilot, more compare |

---

## 6. Quality guardrails (non-negotiable)

From EEAT_CHECKLIST + DECISIONS — **every** CPT page must have:

- [ ] Original plain-English (never AMA/AAPC verbatim)
- [ ] Medicare benchmark section + link to `/methodology/price-benchmarks/`
- [ ] **800+ words** minimum
- [ ] FAQ with valid schema
- [ ] Author byline + `dateModified`
- [ ] CTA: Fair Price (`?code=`) + Bill Auditor
- [ ] Related codes link **only** to pages that exist (no 404)
- [ ] “Possible billing concern” language — never “fraud” / “guaranteed savings”
- [ ] “Bill looks normal” is a valid outcome

**Never publish:**

- Code missing from MPFS data
- Thin template with only code number swapped (EEAT anti-pattern)
- Page without `getStaticPaths` entry (orphan URLs)

**404 prevention (already in code):**

- `getStaticPaths()` ← `launchCptCodes` only  
- Unknown code → redirect to `/codes/` (not 404)

---

## 7. Technical SEO — current setup

| Item | URL / config | Status |
|------|--------------|--------|
| Canonical site | `https://patientbillguide.com` | ✅ astro.config `site` |
| Trailing slash | `always` | ✅ consistent URLs |
| robots.txt | `Sitemap: …/sitemap-index.xml` | ✅ |
| Sitemap index | `sitemap-index.xml` → `sitemap-0.xml` | ✅ 163 URLs |
| 404 page | `/404/` excluded from sitemap | ✅ |
| Schema | Organization, FAQ, MedicalWebPage on CPT | ✅ |
| Privacy | Client-side processing | ✅ differentiator |

### GSC notes

- **Domain property** `patientbillguide.com` — correct choice (covers www + https).
- Sitemap status **Success** with **0 pages** on the index file is **normal** — index lists child sitemaps, not URLs. Real count is in `sitemap-0.xml` (**163**). Google updates discovered count in 1–48 hours.
- Optional: also submit `sitemap-0.xml` to see 163 immediately.

### At 500+ CPT pages

- Split sitemaps: `sitemap-codes-*.xml` (see SITE_MAP.md)
- Paginate `/codes/` hub
- Monitor Cloudflare Bot Fight Mode if GSC fetch errors return

---

## 8. Production pipeline (CPT)

```
Pick codes (MPFS + search volume / bill frequency)
    → scripts/generate-cpt-pages.mjs (or hand-write Tier-1)
    → Add to launchCptCodes in cpt-codes.ts
    → EEAT checklist pass
    → npm test && npm run build
    → Deploy (Cloudflare)
    → GSC auto-recrawls sitemap
```

**Generator:** `npm run generate:cpt-pages` — batch from `CPT_CODES_150` seed; extend seed from MPFS for scale.

**Top 50 codes:** prefer editorial review; batch 100+ can be template-generated with category-specific paragraphs.

---

## 9. Monetization timing

| When | Action |
|------|--------|
| **Now** | 163 pages — **AdSense-ready volume** |
| Month 3+ | Apply AdSense (below tool results, mid-learn — never on legal pages) |
| Month 4+ | Soft affiliate in guides (disclosed) |
| Oct 2026 | Medicare AEP affiliate on `/medicare/` only |

No lead-gen pop-ups in first 3 months.

---

## 10. Six-month targets (aligned with MASTER_PLAN)

| Metric | Conservative | With viral |
|--------|--------------|------------|
| CPT pages | 500 | 500–800 |
| Total site pages | 550–700 | 700+ |
| Monthly visits | 5k–15k | 15k–50k |
| Revenue | AdSense + early affiliate | $200–$1,500/mo |

Traffic **lags** publishing by 6–12 weeks — do not panic if week 1 after deploy is quiet.

---

## 11. Priority queue — next 30 days

1. **Batch 2 CPT** — +70 codes → **200 total**  
2. **5 compare pages** — highest long-tail ROI per page  
3. **5 category hubs** — internal linking + head terms  
4. **Request indexing** in GSC for homepage + Fair Price + top 10 CPT  
5. **Reddit launch** — Fair Price tool (one strong post, not spam)  
6. **AdSense application** — site qualifies on page count  
7. **contact@patientbillguide.com** — trust signal for GSC / users  

---

## 12. Anti-patterns (do not do)

| Bad idea | Why |
|----------|-----|
| 1,000 CPT pages/day | YMYL thin-content / spam risk |
| 10k pages before 500 quality pages | No index budget, no trust |
| Copy AMA descriptions | Legal + EEAT failure |
| “Your hospital committed fraud” | Brand + manual action risk |
| Publish code without MPFS row | Broken Fair Price widget |
| Link related codes that 404 | Crawl waste + user trust hit |
| HTTP-only or duplicate www without GSC domain property | Split signals (domain property fixes this) |

---

## 13. One-line strategy

> **Ship useful tools first, then own long-tail CPT queries with original 800-word guides — in weekly batches toward 500 codes over 6 months — while compare pages, learn pillars, and Reddit drive faster wins than raw page count.**

---

## Related docs

- [MASTER_PLAN.md](MASTER_PLAN.md) — vision & tool clusters  
- [DECISIONS.md](DECISIONS.md) — locked choices  
- [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md) — CPT editorial checklist  
- [SITE_MAP.md](SITE_MAP.md) — URL inventory & tiers  
- [EEAT_CHECKLIST.md](EEAT_CHECKLIST.md) — per-page review  
- [STATUS.md](../STATUS.md) — session tracker  
