# Locked Decisions

All decisions agreed in planning sessions. Do not change without explicit discussion.

## Product

| # | Decision | Value |
|---|----------|-------|
| 1 | Project relationship | **Standalone** — not related to VeloTools |
| 2 | Domain / brand | **BillTox.com** |
| 3 | UI language | **English only** (US market) |
| 4 | Target audience | **Both** — self-pay / uninsured AND insured (EOB) |
| 5 | Monetization (v1) | **Google AdSense only** |
| 6 | CPT descriptions | **Original plain-English** summaries written by us |
| 7 | Core value proposition | Help users understand bills; show red flags OR confirm bill looks normal |
| 8 | Positioning | Billing **assistant**, not legal/medical expert or fraud accuser |

## Technical

| # | Decision | Value |
|---|----------|-------|
| 9 | Processing | **Client-side only** (JS/WASM in browser) |
| 10 | User data | No PHI uploaded to servers; privacy as selling point |
| 11 | Data hosting | Static JSON bundles cached via **Cloudflare CDN** |
| 12 | Price benchmark source | **CMS Medicare MPFS** (not Fair Health API at start) |
| 13 | Commercial rate range | Medicare allowed × **1.5–2.5** heuristic (documented in Methodology) |
| 14 | Framework (planned) | **Astro** — static, SEO, content collections |
| 15 | Hosting (planned) | **Cloudflare Pages** |
| 16 | Tests | **Vitest** for parser & findings engine |

## Content & SEO

| # | Decision | Value |
|---|----------|-------|
| 17 | Build order | **Page structure + EEAT shell first**, then tools & data engine |
| 18 | CPT pages launch | Tiered: 50 → 150 → 500+ (not all at once) |
| 19 | AdSense timing | Apply after **~25–35 quality pages** live |
| 20 | Dispute letters | **Editable starting templates** — not "legally verified" |
| 21 | Flag language | "Possible billing concern" — never "fraud" or "illegal" without evidence |

## Out of scope for v1

- Fair Health API integration (paid)
- Full upcoding detection (requires ICD-10 / clinical notes)
- OCR for photo bills (Phase 5+ / later)
- AMA licensed CPT full descriptions
- User accounts / saved bills on server
- Backend API for real-time third-party lookups
