# Project Continuity — PatientBillGuide

**Read this after renaming the folder or opening the project on a new machine.**

---

## Identity

| Item | Value |
|------|-------|
| **Brand / domain** | PatientBillGuide.com |
| **Repo folder** | `PatientBillGuide` (was `billtox` during early setup) |
| **Tagline** | Honest healthcare numbers — before, during, and after you get the bill. |
| **Stack** | Astro 7, TypeScript, static → Cloudflare Pages |
| **Language** | English (US) |

---

## Folder path (after rename)

```
C:\Users\Vigen\Desktop\VELO\PatientBillGuide
```

Renaming the folder is **safe**. Git, `node_modules`, and all paths inside the project are relative — nothing breaks.

If `npm run dev` fails after rename, run once:

```powershell
cd C:\Users\Vigen\Desktop\VELO\PatientBillGuide
npm install
npm run dev
```

---

## What is already built (2026-06-29)

- Astro scaffold, 21 static pages, build OK
- Figma UI v1: homepage, header, trust strip, footer, fair-price layout
- Trust pages: about, methodology, privacy, terms, disclaimer, authors
- Tool landing: `/tools/fair-price/` (form UI only — **calculator logic Week 2**)
- Docs: strategy, site map, phases, decisions

---

## Current phase

**Week 1** — almost done. Remaining:
- [ ] Buy/connect domain PatientBillGuide.com
- [ ] Deploy Cloudflare Pages
- [ ] Contact email before public launch

**Week 2 next:**
- [ ] CMS MPFS data pipeline
- [ ] Live Fair Price Calculator (real Medicare benchmarks)

---

## Key documents (read in order)

1. [STATUS.md](../STATUS.md) — live checklist
2. [docs/MASTER_PLAN.md](MASTER_PLAN.md) — strategy, tools, monetization
3. [docs/SITE_MAP.md](SITE_MAP.md) — all URLs
4. [docs/PHASES.md](PHASES.md) — week-by-week tasks
5. [docs/DECISIONS.md](DECISIONS.md) — locked decisions (do not contradict)

---

## Figma

- File: Patient Bill Guide UI Design (Figma Make)
- UI adapted to code: homepage + fair-price (screenshots + link)
- Logo: shield SVG in `src/components/Logo.astro`, `public/favicon.svg`

---

## Locked product rules

- Client-side only — no PHI upload
- Original CPT plain-English (no AMA copy)
- Never claim fraud or guaranteed savings
- "Bill looks normal" is a valid outcome
- One hub: bills + EOB + Medicare (no EV/solar on this domain)
- Monetization: AdSense → soft affiliate month 4+

---

## Tool build order

1. **CHECK:** fair-price → medicare-lookup → surprise-bill-check → hospital-compare
2. **UNDERSTAND:** bill-auditor → eob-analyzer → code-lookup
3. **ACT:** dispute-letter → negotiation-script → prior-auth-guide
4. **MEDICARE:** `/medicare/` hub → plan-finder (Oct 2026 AEP)

---

## Continue in Cursor

1. **File → Open Folder** → `C:\Users\Vigen\Desktop\VELO\PatientBillGuide`
2. Terminal: `npm run dev`
3. Tell agent: **"Continue PatientBillGuide from STATUS.md Week 2"**

---

## Open items ([docs/ISSUES.md](ISSUES.md))

- Author display name for `/authors/vigen/`
- Contact email (before publish)
- Logo polish (Figma export SVG optional)
- Tier 1 CPT list SEO validation

---

## Old name

**BillTox** was the working title only. Brand is **PatientBillGuide.com** — see [BRAND_DECISION.md](BRAND_DECISION.md).

Some older doc lines may still say "BillTox"; ignore or update when editing those files.
