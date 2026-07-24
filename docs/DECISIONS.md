# Locked Decisions

All decisions agreed in planning sessions. Do not change without explicit discussion.

## Product

| # | Decision | Value |
|---|----------|-------|
| 1 | Project relationship | **Standalone** — not related to VeloTools |
| 2 | Domain / brand | **PatientBillGuide.com** |
| 3 | Tagline | *Honest healthcare numbers — before, during, and after you get the bill.* |
| 4 | UI language | **English only** (US market) |
| 5 | Target audience | Uninsured, insured (EOB), seniors (Medicare), families |
| 6 | Monetization (v1) | **Google AdSense** primary; soft affiliate in guides from month 4+ |
| 7 | CPT descriptions | **Original plain-English** summaries written by us |
| 8 | Core value proposition | Help users understand bills; show red flags OR confirm bill looks normal |
| 9 | Positioning | Independent **guide** / billing assistant — not lawyer, doctor, or insurer |
| 10 | Site scope | **One hub** — bills, EOB, Medicare, CPT (no EV/solar on this domain) |

## Technical

| # | Decision | Value |
|---|----------|-------|
| 11 | Processing | **Client-side only** (JS/WASM in browser) |
| 12 | User data | No PHI uploaded to servers; privacy as selling point |
| 13 | Data hosting | Static JSON bundles cached via **Cloudflare CDN** |
| 14 | Price benchmark source | **CMS Medicare MPFS** (not Fair Health API at start) |
| 15 | Commercial rate range | Medicare allowed × **1.5–2.5** heuristic (documented in Methodology) |
| 16 | Framework | **Astro** — static, SEO, content collections |
| 17 | Hosting | **Cloudflare Pages** |
| 18 | Tests | **Vitest** for parser & findings engine |
| 19 | Package manager | **npm** |

## Content & SEO

| # | Decision | Value |
|---|----------|-------|
| 20 | Build order | **Minimal trust → Fair Price week 2 → EEAT + SEO in parallel** |
| 21 | Tool clusters | CHECK → UNDERSTAND → ACT (see MASTER_PLAN.md) |
| 22 | CPT pages launch | Tiered: 50 → 150 → 500+ |
| 23 | AdSense timing | Apply after **~25–35 quality pages** live |
| 24 | Dispute letters | **Editable starting templates** — not "legally verified" |
| 25 | Flag language | "Possible billing concern" — never "fraud" or "illegal" without evidence |
| 26 | Traffic mix | Google SEO + Reddit/TikTok for 6-month goals (not Google-only) |
| 27 | Homepage hero layout | **Left-aligned** per Figma — `HomeHero.astro` is single source |

## Post-launch — locked 2026-07-05

| # | Decision | Value |
|---|----------|-------|
| 28 | Platform goal | **Super platform** — tools + CMS data engine + CPT/learn encyclopedia (not a thin SEO farm) |
| 29 | GSC setup | **Domain property** `patientbillguide.com` (DNS TXT), not URL-prefix only |
| 30 | Sitemap | Submit `sitemap-index.xml`; child `sitemap-0.xml` holds URLs; split at 500+ CPT |
| 31 | Long tail definition | Strategy = many specific queries; **not** synonymous with 10,000 pages on day one |
| 32 | CPT pace (6 mo) | Target **500 quality CPT** (~25–50 per weekly batch); **not** 1,000/day |
| 33 | CPT pace (12 mo) | Stretch **500 → 1,500** only if 800+ words & EEAT hold |
| 34 | Content priority after launch | **Compare pages + category hubs** alongside CPT batches (high ROI per page) |
| 35 | Growth playbook doc | **[GROWTH_MASTER.md](GROWTH_MASTER.md)** is the SEO/scale source of truth post-launch |

## Google quality — locked 2026-07-06

| # | Decision | Value |
|---|----------|-------|
| 36 | **Zero-Doorway Rule** | Every URL must fully answer a patient question on-page; no thin SEO funnels — see [GOOGLE_QUALITY.md](GOOGLE_QUALITY.md) |
| 37 | Compare pages | **Manual only**, max ~25 total, **never** auto-generate all CPT pairs |
| 38 | Category hubs | **Manual only**, max ~15, min 5 live CPT guides per category |
| 39 | CPT batch generator | Max **25–50/deploy**, 10% manual QA sample; top 50 codes hand-edited |
| 40 | Doorway test | 4-question gate in GOOGLE_QUALITY.md **before every new URL type** |
| 41 | Jul 5–6 compare + category | **Approved** — hand-written, not doorways |
| 42 | `cpt-batch-100` pages | **Live but watch zone** — do not scale same template to 1000+ without upgrade |
| 43 | GSC indexing | **No mass manual URL Inspection** — sitemap + quality + launch channels ([GSC_INDEXING.md](GSC_INDEXING.md)); Product Hunt / Reddit for tools |
| 44 | CPT utility path | Enhance **existing** `/codes/cpt/[code]/` with Fair Price widget + Dispute Letter deep-links — **never** mass-rename CPT URLs to bypass indexing lag |
| 45 | Stack lock (post-launch) | Stay on **Astro + client-side MPFS JSON** — no Next.js rewrite, no server SQLite price API for CPT |

## Out of scope for this domain

- EV / solar tax credit calculators (separate project later)
- Fair Health API integration (paid)
- Full upcoding detection (requires ICD-10 / clinical notes)
- OCR for photo bills (later)
- AMA licensed CPT full descriptions
- User accounts / saved bills on server
- Lead gen pop-ups in first 3 months
- **10,000 CPT pages in 10 days** (rejected — use tiered rollout in GROWTH_MASTER.md)
- Publishing CPT codes **without** MPFS row in `supported-cpt-codes.ts`
- **Doorway pages** — thin keyword URLs, auto compare matrices, empty category hubs (see GOOGLE_QUALITY.md)
- **Auto-generated compare** pages (`99213-vs-99214` style at scale)
- Scaling `cpt-batch-100` template to 1,000+ without editorial upgrade + QA
- **Mass CPT URL migration** (`/codes/cpt/X/` → `/tools/cpt-X-fair-price`) to “reset sandbox” — destroys discovered equity
- **Google Indexing API** bulk submit / mass Request indexing (see #43)
- **Next.js + SQLite server price API** (contradicts client-side + Astro locks)
- Replacing CPT editorial prose with calculator-only pages (thin / doorway)
- Framing dispute templates as “legal” documents or guaranteed savings
