# PatientBillGuide — Progress Tracker

> Update this file after every work session. Agents should read this first.

**Last updated:** 2026-07-05  
**Current phase:** Post-launch — build the super platform  
**Phase status:** 7 live tools · 84 tests · **174 sitemap URLs** · 130 CPT · 5 compare · 5 category hubs  
**Domain:** PatientBillGuide.com  
**Master docs:** [GROWTH_MASTER.md](docs/GROWTH_MASTER.md) · [DAILY_PLAN.md](docs/DAILY_PLAN.md) · [MASTER_PLAN.md](docs/MASTER_PLAN.md)

---

## Platform roadmap (locked 2026-07-05)

| Milestone | Target date | CPT | Total pages | Status |
|-----------|-------------|-----|-------------|--------|
| **Launch** | Jul 2026 | 130 | 174 | ✅ Live + compare/category |
| **Scale A** | Aug 2026 | 200 | ~220 | 🟡 compare/category done · Batch 2 CPT next |
| **Scale B** | Oct 2026 | 350 | ~400 | 🔲 |
| **6-month** | Jan 2027 | **500** | **550–700** | 🔲 |
| **12-month** | Jul 2027 | 500–1,500 | 800–1,800 | 🔲 |
| **Medicare AEP** | Sep–Oct 2026 | — | +medicare hub | 🔲 |

**Strategy one-liner:** Tools first → CPT long tail in weekly batches → compare/category/learn for fast wins → Reddit + AdSense → scale to MPFS ceiling (~7,740) over years, not days.

---

## Post-launch — SEO & growth

- [x] Site live at patientbillguide.com (Cloudflare)
- [x] GSC domain property verified (DNS)
- [x] Sitemap submitted (`sitemap-index.xml` — Success)
- [ ] GSC: discovered URLs updating (174 in sitemap after deploy)
- [ ] **Batch 2 CPT** (+70 → 200 total)
- [x] **5 compare pages** + **5 category hubs**
- [ ] AdSense application
- [ ] Set up `contact@patientbillguide.com` mailbox
- [ ] Reddit launch (Fair Price)
- [ ] GSC indexing: homepage + Fair Price + top 10 CPT

---

## Week 8 — Deploy prep ✅

- [x] NCCI loading state + category badges in Bill Auditor
- [x] Aetna + Cigna EOB templates fixed (10 EOB tests pass)
- [x] Homepage hero + bridge animation
- [x] Full audit: Linux CMS pipeline, stale pages, deploy docs
- [ ] **Push repo to GitHub** (verify full codebase + data tracked)
- [x] **Cloudflare Pages** + custom domain
- [x] **GSC** submit

---

## Live tools (7)

| Tool | URL | Score |
|------|-----|-------|
| Fair Price | `/tools/fair-price/` | 8/10 |
| Medicare Part B tab | `/tools/fair-price/?tab=medicare` | 8/10 |
| Surprise Bill Checker | `/tools/surprise-bill-check/` | 7/10 |
| Hospital Price Compare | `/tools/hospital-compare/` | 7/10 |
| Bill Auditor | `/tools/bill-auditor/` | 8/10 |
| EOB Analyzer | `/tools/eob-analyzer/` | 7/10 |
| Dispute Letter Builder | `/tools/dispute-letter/` | 7/10 |

---

## Session log

| Date | Done |
|------|------|
| 2026-07-05 | Compare (5) + category hubs (5); GSC; GROWTH_MASTER locked |
| 2026-06-29 | Full deploy audit + fixes (CMS Linux unzip, stale content, headers, contact email) |
| 2026-06-29 | Week 7 dispute letters + Week 8 NCCI polish + hero redesign + EOB Aetna/Cigna fix |
