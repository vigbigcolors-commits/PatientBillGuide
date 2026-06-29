# Open Questions

Items to resolve before or during build. Check off as decided.

---

## Before Phase 0 starts

| # | Question | Status | Decision |
|---|----------|--------|----------|
| 1 | Final brand name — **BillTox** confirmed? | ⏳ Open | |
| 2 | Author name(s) for `/authors/` pages | ⏳ Open | |
| 3 | Tone: **empathetic advocate** vs clinical neutral | ⏳ Recommended: empathetic | |
| 4 | Tier 1 CPT list — run SEO keyword validation? | ⏳ Open | Draft in CONTENT_WORKFLOW.md |
| 5 | Attorney review of disclaimer before launch? | ⏳ Open | Recommended before AdSense |

---

## Before Phase 0 implementation

| # | Question | Status | Decision |
|---|----------|--------|----------|
| 6 | Astro version + package manager (npm/pnpm) | ⏳ Open | |
| 7 | Design references / competitor sites to beat | ⏳ Open | |
| 8 | Logo & favicon design | ⏳ Open | |
| 9 | Contact email for `/contact/` page | ⏳ Open | |
| 10 | Google Analytics / privacy-friendly analytics? | ⏳ Open | Plausible? CF Analytics? |

---

## Before Phase 3 (data pipeline)

| # | Question | Status | Decision |
|---|----------|--------|----------|
| 11 | MPFS year to ship first (2025 vs 2026) | ⏳ Open | |
| 12 | Price multiplier range (1.5–2.5x Medicare) — finalize | ⏳ Open | Document in methodology |
| 13 | R2 bucket vs `public/data/` on Cloudflare Pages | ⏳ Open | |

---

## Before Phase 4 (tools)

| # | Question | Status | Decision |
|---|----------|--------|----------|
| 14 | PDF library: jsPDF vs browser print | ⏳ Open | |
| 15 | Service Worker for offline data cache | ⏳ Open | Recommended yes |
| 16 | EOB parser — which insurer formats to support first | ⏳ Open | |

---

## Resolved ✅

| # | Question | Decision | Date |
|---|----------|----------|------|
| R1 | Separate from VeloTools? | **Yes — standalone project** | 2026-06-29 |
| R2 | UI language? | **English (US)** | 2026-06-29 |
| R3 | Audience? | **Both self-pay and insured** | 2026-06-29 |
| R4 | Monetization? | **AdSense only at start** | 2026-06-29 |
| R5 | CPT descriptions? | **Original plain-English** | 2026-06-29 |
| R6 | Build order? | **EEAT pages first, then tools** | 2026-06-29 |
| R7 | Framework? | **Astro (planned)** | 2026-06-29 |
| R8 | Hosting? | **Cloudflare Pages (planned)** | 2026-06-29 |

---

## How to use this file

When a question is decided:

1. Move row to **Resolved** section
2. Update [DECISIONS.md](DECISIONS.md) if it's a locked decision
3. Update [STATUS.md](../STATUS.md) if it unblocks a phase task
