# PatientBillGuide — Progress Tracker

> Update this file after every work session. Agents should read this first.

**Last updated:** 2026-07-26  
**Current phase:** Post-launch — **DECISIONS #48** original unique content (strict) · body audit green  
**Phase status:** 7 live tools · **89 tests** · **244 build** · **200 CPT** · 5 compare · 5 category  
**Domain:** PatientBillGuide.com  
**Master docs:** [NEXT_SESSION.md](docs/NEXT_SESSION.md) · [GOOGLE_QUALITY.md](docs/GOOGLE_QUALITY.md) · [GROWTH_MASTER.md](docs/GROWTH_MASTER.md)

> **Strict:** unique title + meta + H1 **and** unique body prose (`npm run audit:seo`). DECISIONS #46 + **#48**.  
> Never AMA/AAPC verbatim · never republish our pSEO elsewhere · no scaled identical paragraphs.  
> **Next:** deploy · `contact@` · Product Hunt ~Tue 2026-07-31.

---

## Platform roadmap (locked 2026-07-05)

| Milestone | Target date | CPT | Total pages | Status |
|-----------|-------------|-----|-------------|--------|
| **Launch** | Jul 2026 | 130 | 174 | ✅ Live + compare/category |
| **Scale A** | Aug 2026 | 200 | ~220 | ✅ Day 4 done — **200 CPT** milestone |
| **Scale B** | Oct 2026 | 350 | ~400 | 🔲 |
| **6-month** | Jan 2027 | **500** | **550–700** | 🔲 |
| **12-month** | Jul 2027 | 500–1,500 | 800–1,800 | 🔲 |
| **Medicare AEP** | Sep–Oct 2026 | — | +medicare hub | 🔲 |

---

## Post-launch — SEO & growth

- [x] Site live at patientbillguide.com (Cloudflare)
- [x] GSC domain property verified (DNS)
- [x] Sitemap submitted (`sitemap-index.xml` — Success)
- [x] Compare + category deployed live
- [x] **GSC strategy** — [GSC_INDEXING.md](docs/GSC_INDEXING.md): no mass manual indexing (DECISIONS #43)
- [x] **Batch 2 part 1** — +35 CPT → **165 total** (Day 3)
- [x] **Batch 2 part 2** — +35 CPT → **200 total** (Day 4)
- [x] **5 compare pages** + **5 category hubs**
- [x] **Unique SEO titles/metas** — `buildCptSeoTitle` / `audit:seo` (DECISIONS #46)
- [x] **Generic-label rehab** — replaced Day 3/4 placeholders (“Medicine procedure…”) in batches + seeds
- [x] **Indexed CPT polish** — unique body for Google-seen **90838** / **11400**; `dateModified` → 2026-07-26
- [ ] AdSense application — later (user deferred)
- [ ] Set up `contact@patientbillguide.com` — Day 5 manual
- [ ] Product Hunt launch — ~Tue 2026-07-31 (Fair Price utility)
- [ ] Quora / Shorts — soft answers (no Reddit)
- [x] ~~Reddit launch~~ — **cancelled** (DECISIONS #47)

---

## Uncommitted work (2026-07-10 evening) — ✅ done

**UX fix:** `/codes/` pagination — committed + live (`9cebb09`).

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
| 2026-07-26 | **#48 locked:** original unique content · body uniqueness audit · boilerplate uniquified across 200 CPT · generators updated |
| 2026-07-26 | **pSEO rehab:** unique titles/metas + generic CPT labels fixed (~49 codes) · 90838/11400 body rewrite · `audit:seo` green · deploy next |
| 2026-07-24 | CPT utility coded · referral idea parked · PH target ~Tue 2026-07-31 |
| 2026-07-13 | **Day 5 start:** contact page EEAT polish · [DAY5_MANUAL.md](docs/DAY5_MANUAL.md) |
| 2026-07-10 (pm) | **Codes hub UX:** paginated index 24/page — pushed (`9cebb09`) |
| 2026-07-10 | **Day 4:** +35 CPT → **200 total**, 244 pages · `db22074` |
| 2026-07-10 | **Day 3:** +35 CPT (165 total), GSC_INDEXING locked |
| 2026-07-06 | **Day 2:** deploy verified · GOOGLE_QUALITY |
| 2026-07-05 | **Day 1:** Compare (5) + category (5); GSC |

---

## Day 5 checklist (2026-07-13)

- [x] `/codes/` pager live
- [x] `/contact/` page reviewed + expanded (mailto ready)
- [ ] **You:** Cloudflare Email Routing → `contact@` → personal inbox ([DAY5_MANUAL.md](docs/DAY5_MANUAL.md) §A)
- [ ] AdSense — deferred by user
- [ ] Optional: GSC Performance glance
- [ ] Report back → close Day 5 in STATUS

**Next after Day 5:** Product Hunt (~2026-07-31) + Quora/Shorts; more CPT body rehab as GSC indexes.
