# Issues & Decisions Log

Track errors, open questions, and fixes **as we go**.

---

## Pre-launch — still open

### [OPEN] Git: most of codebase untracked
- **Found:** 2026-06-29 audit
- **Severity:** ~~critical~~ → **fixed** (site live on Cloudflare from full repo)
- **Fix:** codebase committed and deployed — close when convenient

### [OPEN] Contact email inbox
- **Found:** 2026-06-29
- **Severity:** medium
- **Description:** Site shows `contact@patientbillguide.com` — mailbox must be created on domain host
- **Fix:** Day 5 — Cloudflare Email Routing · see [DAY5_MANUAL.md](DAY5_MANUAL.md) §A · _awaiting user_

### [FIXED] medicare-lookup dual canonical
- **Found:** 2026-07-18 GSC “Alternate page with proper canonical”
- **Fix:** single canonical → `/tools/fair-price/`, `noindex`, sitemap filter, Cloudflare `_redirects` 301 (2026-07-24)

### [NOTE] Reddit channel — abandoned
- **2026-07-24:** Network blocks / account loss after normal link posts (incl. other brands). **DECISIONS #47 — do not use Reddit.**
- Launch mix: Product Hunt, Quora, Shorts/TikTok, B2B.

### [OPEN] Author display name format
- **Severity:** low (placeholder bio OK for launch)
- **Fix:** _pending — see AUTHOR_STRATEGY.md_

### [OPEN] Logo final concept
- **Severity:** low (SVG shield works for launch)
- **Fix:** _pending — see DESIGN_DIRECTION.md_

### [OPEN] Mobile nav hidden below 768px
- **Found:** 2026-06-29 audit
- **Severity:** medium (footer links work; header nav missing on phone)
- **Fix:** _post-launch polish_

---

## Fixed (2026-06-29 audit)

| Item | Fix |
|------|-----|
| CMS fetch used PowerShell only — failed on Linux/Cloudflare | Cross-platform `unzip` in `fetch-cms.mjs` |
| `/for/insured/` said EOB "coming soon" | Updated to live EOB + dispute links |
| `/for/seniors-medicare/` linked dead Medicare lookup | Points to Fair Price Medicare tab |
| `/tools/code-lookup/` 404 from tools index | Removed broken link |
| `site.ts` nav `/medicare/` 404 | Points to `/for/seniors-medicare/` |
| Footer said "BillGuide" | Full PatientBillGuide name |
| Privacy/contact placeholders | Email + last-updated date |
| Slow Cloudflare builds | `--if-needed` data skip + commit data guidance |
| Missing security headers | Added to `public/_headers` |

---

## Session review checklist

- [ ] Read open `[OPEN]` items above
- [ ] Any new issues to log?
- [ ] Any `[OPEN]` resolved → move to Fixed
