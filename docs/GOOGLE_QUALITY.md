# Google Quality & Zero-Doorway Policy

**Locked:** 2026-07-06  
**Applies to:** all agents, all new URLs, all CPT batches  
**Read with:** [EEAT_CHECKLIST.md](EEAT_CHECKLIST.md), [DECISIONS.md](DECISIONS.md)

---

## Zero-Doorway Rule (non-negotiable)

> **Every URL must fully answer a real patient question on that page.**  
> If the page exists mainly to rank and send users elsewhere with thin content — it is a **doorway** and **must not ship**.

Google [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) penalize doorway pages, thin content, and scaled content abuse. PatientBillGuide is YMYL (money + health billing). **Strict compliance is mandatory.**

### What counts as a doorway (NEVER publish)

| Pattern | Example | Verdict |
|---------|---------|---------|
| Thin keyword page → funnel only | "CPT 99214 Texas" with 2 sentences + ads | ❌ Doorway |
| Mass identical templates | 5,000 pages, only code number swapped | ❌ Scaled abuse |
| Compare pages for every code pair | Auto `99213-vs-99215`, `99213-vs-99216`… thousands | ❌ Doorway farm |
| Category pages with only links | Empty hub, no unique editorial | ❌ Thin doorway |
| City/ZIP × CPT matrices | `/fair-price/90210/99214/` at scale without unique value | ❌ Doorway (future risk) |
| Pages with no utility | No tool, no data, no original guidance | ❌ |

### What is NOT a doorway (allowed when done right)

| Pattern | Requirement | Verdict |
|---------|-------------|---------|
| **Compare page** (manual) | 1000+ words, unique table, real clinical/billing diff, FAQ, tool CTA | ✅ |
| **Category hub** (manual) | Unique intro + tips + FAQ; links only to live CPT guides | ✅ |
| **CPT guide** | 800+ words original, Fair Price widget, MPFS data, author, disclaimer | ✅ if quality holds |
| **Learn pillar** | 1500+ words, original, cited sources | ✅ |
| **Tool page** | Interactive utility, runs in browser | ✅ |

---

## Audit: what we added (Jul 5–6, 2026)

### ✅ Safe — manually authored (10 pages)

| URL type | Count | Why safe |
|----------|-------|----------|
| `/codes/compare/*` | 5 | Hand-written, 1000+ words each, unique comparison tables, high-intent queries only, links to tools + CPT guides, FAQ schema, no fraud claims |
| `/codes/category/*` | 5 | Hand-written editorial (intro, billing tips, FAQ); code list is **index of existing guides**, not thin stubs |

**These are NOT doorways.** They add depth to an existing tool site and answer specific questions (e.g. 99213 vs 99214).

### ⚠️ Watch zone — already live (not added Jul 5–6)

| URL type | Count | Risk | Mitigation |
|----------|-------|------|------------|
| `/codes/cpt/*` from `cpt-batch-100.ts` | ~100 | Template similarity — same paragraph structure, swapped code/dollar | 800+ words, category-specific `settingNote`, Fair Price widget per page, MPFS real data |
| `/codes/cpt/*` hand-written (Tier 1 + extra) | ~30 | Low risk | Keep as quality benchmark |

**Do not scale batch-100 style to 1,000+ without editorial upgrade** (see gates below).

### ✅ Safe — pre-existing (not Jul 5–6)

- 7 interactive tools (real browser utility)
- Learn pillars, methodology, trust pages
- Homepage, audience pages

---

## Quality gates — MUST pass before publish

### Gate A — All content pages

- [ ] Unique title + meta (not duplicated across URLs)
- [ ] Unique H1 (not duplicated across URLs)
- [ ] Bare `<title>` ideally **≤58 characters** before ` | PatientBillGuide` (CPT: use `buildCptSeoTitle`)
- [ ] Meta description roughly **110–158** characters, unique intent per URL
- [ ] One clear user question answered on-page
- [ ] Author byline + `dateModified`
- [ ] Disclaimer on tool-adjacent content
- [ ] ≥3 internal links to real pages (no 404)
- [ ] Link to `/methodology/` where prices mentioned
- [ ] Passes [EEAT_CHECKLIST.md](EEAT_CHECKLIST.md) red flags scan
- [ ] After deploy build: `npm run audit:seo` must pass (duplicate title/meta/H1 = fail)

### Gate A+ — Uniqueness is mandatory (DECISIONS #46 + **#48**)

**Never ship** two indexable URLs that share the same title, meta description, or H1.  
**Never ship** CPT (or other) pages that share long identical body paragraphs — that is scaled content abuse, not “light template.”

**Originality (strict — DECISIONS #48):**
- All patient-facing prose is **written for PatientBillGuide** — original plain-English.
- **Never** copy AMA / AAPC / competitor CPT descriptions verbatim.
- **Never** publish the same CPT/pSEO article on Medium, guest blogs, or other domains as a duplicate mirror.
- Shared chrome (nav, disclaimer component, methodology footer) is fine; **main guide body must differ by code**.

Template CPT batches must produce **code-specific** titles/metas **and** paragraphs that include the CPT code (or otherwise unique wording). Enforce with `npm run audit:seo` (title/meta/H1 **and** body uniqueness).

### Gate B — Compare pages (manual only)

- [ ] **Never auto-generate** compare URLs from code matrix
- [ ] Max **~25 compare pages** total unless user explicitly expands with manual copy
- [ ] Minimum **1000 words** unique prose (not counting table)
- [ ] Both CPT codes must have **live guides** OR Fair Price MPFS support
- [ ] Must include: table, when A / when B, cost context, billing notes, what-to-do, FAQ

### Gate C — Category hubs (manual only)

- [ ] Max **~15 category hubs** — no empty taxonomy explosion
- [ ] Minimum **600 words** unique editorial (intro + tips + FAQ), not counting code list
- [ ] Code list only links to **published** CPT guides
- [ ] No category page without at least **5 live CPT guides** in that category

### Gate D — CPT batch (generator)

- [ ] **Max 25–50 codes per deploy** (not 100+/day)
- [ ] Code must exist in `supported-cpt-codes.ts` (MPFS)
- [ ] Generator output ≥ **800 words** (script warns if under)
- [ ] **10% manual QA sample** per batch — read 3–5 pages, fix template stiffness
- [ ] **Top 50 codes by search volume:** hand-written or heavy edit — not raw template
- [ ] Related codes → **only published URLs**
- [ ] No new batch if prior batch triggered GSC "Crawled — currently not indexed" spike on CPT URLs

### Gate E — Zero-Doorway quick test

Ask before every new URL type:

1. Would a patient learn something useful **without clicking away**?
2. Is there **unique value** vs our other pages (not just a synonym URL)?
3. Would we be embarrassed to show this page to a Google quality rater?
4. Does it exist because users need it — or only for SEO?

**If any answer fails → do not publish.**

---

## Scale limits (locked)

| Content type | Max total | Pace | Generation |
|--------------|-----------|------|------------|
| Compare | 25 | 1–2/week manual | **Never auto** |
| Category | 15 | 1/week manual | **Never auto** |
| CPT guides | 500 (6 mo) | 25–50/week batch | Generator + QA |
| CPT guides | 1,500 (12 mo) | Only if Gate D holds | Upgrade templates first |
| Glossary | 20 | 2–3/week | Manual short form |
| State guides | 50 | 2/week | Manual |

---

## What agents must NOT do

1. Auto-generate compare pages for all CPT pairs
2. Create category per CPT prefix or per ZIP
3. Publish CPT without MPFS row
4. Ship 100+ templated CPT pages in one day
5. Copy AMA/AAPC text
6. Create pages whose only purpose is AdSense/arbitrage
7. Add pages with duplicate titles or near-duplicate body text
8. Remove Fair Price widget from CPT pages to "ship faster"

---

## If Google penalizes or deindexes

1. Pause all CPT batch publishes
2. GSC → Pages → filter "Not indexed" / "Crawled currently not indexed"
3. Identify thin/template clusters
4. `noindex` or consolidate worst URLs
5. Improve top 50 codes manually
6. Resubmit sitemap after fix — do not mass-delete without analysis

---

## Related docs

- [EEAT_CHECKLIST.md](EEAT_CHECKLIST.md)
- [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md)
- [GROWTH_MASTER.md](GROWTH_MASTER.md) — pace limits
- [DECISIONS.md](DECISIONS.md) #36–42
