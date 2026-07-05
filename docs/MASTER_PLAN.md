# PatientBillGuide.com — Master Plan

**Locked:** 2026-06-29 · **Post-launch update:** 2026-07-05  
**Tagline:** *Honest healthcare numbers — before, during, and after you get the bill.*  
**Growth & SEO (live):** [GROWTH_MASTER.md](GROWTH_MASTER.md)

---

## Vision

One unified US healthcare consumer transparency hub:

- **CHECK** fair prices (Medicare benchmarks, hospital compare, surprise bill risk)
- **UNDERSTAND** itemized bills and EOBs
- **ACT** with dispute letters and negotiation scripts
- **LEARN** via pillars, glossary, CPT encyclopedia
- **MEDICARE** section for seniors (seasonal AEP upside Oct 2026)

All processing client-side. No accounts. No PHI uploaded.

**Not in this project:** EV/solar tax credits (separate domain later if needed).

---

## Brand

| Item | Value |
|------|-------|
| Domain | **PatientBillGuide.com** |
| Positioning | Independent guide — billing assistant, not lawyer/doctor |
| Tone | Empathetic advocate, calm trust (YMYL) |
| Language | English (US) |

---

## Tool clusters

### CHECK — build first (viral + SEO)

| Tool | URL | Priority |
|------|-----|----------|
| Fair Price Calculator | `/tools/fair-price/` | Week 2 |
| Medicare Allowed Lookup | `/tools/medicare-lookup/` | Week 3 |
| Surprise Bill Risk Checker | `/tools/surprise-bill-check/` | Week 4 |
| Hospital Price Compare | `/tools/hospital-compare/` | Month 3–4 |

### UNDERSTAND — retention

| Tool | URL | Priority |
|------|-----|----------|
| Itemized Bill Auditor | `/tools/bill-auditor/` | Month 2 |
| EOB Analyzer | `/tools/eob-analyzer/` | Month 3 |
| Quick Code Lookup | `/tools/code-lookup/` | Month 2 |

### ACT — conversion / share

| Tool | URL | Priority |
|------|-----|----------|
| Dispute Letter Builder | `/tools/dispute-letter/` | Month 4 |
| Self-Pay Negotiation Script | `/tools/negotiation-script/` | Month 4 |
| Prior Auth Navigator | `/tools/prior-auth-guide/` | Month 5–6 |

### MEDICARE — same site, seasonal

| Section | URL | Priority |
|---------|-----|----------|
| Medicare hub | `/medicare/` | Month 3 |
| Plan Finder (full) | `/tools/medicare-plan-finder/` | Oct 2026 AEP |
| Open Enrollment hub | `/medicare/open-enrollment/` | Sep 2026 |

---

## Build order (accelerated — user full-time)

**Old plan:** 20 EEAT pages → then tools.  
**New plan:** minimal trust (8–10) → **Fair Price live week 2** → EEAT + SEO in parallel.

| Week | Focus |
|------|-------|
| 1 | Astro, design system, trust minimum, homepage |
| 2 | Fair Price + MPFS pipeline + 5 CPT pages |
| 3 | 15 CPT + learn pillars + audience pages + AdSense prep |
| 4 | Reddit launch + surprise checker + bill auditor MVP |
| 5–6 | EOB, dispute letter, stories, hospital compare v1 |
| 7–8 | Medicare hub, negotiation script |

---

## Traffic strategy

| Source | Role |
|--------|------|
| Google SEO | Long-term (CPT long-tail, learn pillars) |
| Reddit | Launch spikes (r/personalfinance, r/HealthInsurance) |
| TikTok/Shorts | Bill horror stories + fair price demos |
| Google Discover | Learn content |

**Not Google-only** for 6-month goals.

---

## Monetization

| Phase | Model |
|-------|-------|
| Month 1–2 | None (build) |
| Month 3+ | **Google AdSense** (apply at ~25–35 quality pages) |
| Month 4+ | Soft **affiliate** in guides (bill negotiation, HSA) |
| Oct 2026+ | Medicare plan affiliate / lead gen on `/medicare/` only |

Lead gen pop-ups: **not** in first 3 months.

---

## Platform milestones (super platform build)

| Phase | When | Pages (approx) | CPT guides | Focus |
|-------|------|----------------|------------|-------|
| **Launch** ✅ | Jul 2026 | 163 | 130 | 7 tools live, GSC, sitemap |
| **Scale A** | Weeks 1–8 post-launch | 250–300 | 200 | Batch 2 CPT + compare + category |
| **Scale B** | Month 3–6 | 550–700 | **500** | Weekly CPT batches, learn, states, AdSense |
| **Scale C** | Month 6–12 | 800–1,800 | 500–1,500 | HCPCS pilot, hospital data, more compare |
| **Medicare season** | Sep–Oct 2026 | +hub | — | AEP tools + affiliate (disclosed) |
| **Year 2** | 2027 | 2,000+ | MPFS ceiling ~7,740 | Full encyclopedia where quality allows |

**North star:** The most trusted **free, private** US medical billing transparency hub — CHECK → UNDERSTAND → ACT → LEARN on one domain.

---

## 6-month targets (updated post-launch)

| Metric | Target |
|--------|--------|
| Pages live | **550–700** (500 CPT + hubs/learn/tools) |
| CPT guides | **500** quality (800+ words each) |
| Tools live | **7–8** (hospital compare v1+) |
| Monthly visits | 15k–50k (with viral); 5–15k conservative |
| Revenue | AdSense + soft affiliate; $200–$1,500/mo combined |
| 12–24 mo | 100k+ visits/mo, Medicare season spike |

---

## Data engine (shared)

One pipeline feeds all CHECK tools:

- CMS MPFS → `mpfs-YYYY.json.gz`
- NCCI → `ncci-YYYYQn.json.gz`
- ZIP locality → `zip-locality.json.gz`
- Hospital chargemasters (phase 2)

---

## User journeys

1. **Uninsured:** `/for/uninsured/` → fair-price → bill-auditor → negotiation-script  
2. **Insured:** `/for/insured/` → eob-analyzer → dispute learn  
3. **Medicare:** `/for/seniors-medicare/` → medicare-lookup → `/medicare/`  
4. **ER panic:** `/for/emergency/` → surprise-bill-check → dispute-letter  

---

## Constraints (never break)

- Original CPT plain-English only (no AMA copy)
- Never claim fraud or guaranteed savings
- Confidence levels on all flags
- "Bill looks normal" is required outcome
- Dispute letters = editable templates, not legal advice

---

## Related docs

- [GROWTH_MASTER.md](GROWTH_MASTER.md) — **SEO, CPT scale, long tail, 30-day queue**
- [SITE_MAP.md](SITE_MAP.md) — full URL tree
- [PHASES.md](PHASES.md) — week-by-week tasks
- [STATUS.md](../STATUS.md) — live tracker
- [DECISIONS.md](DECISIONS.md) — locked decisions
