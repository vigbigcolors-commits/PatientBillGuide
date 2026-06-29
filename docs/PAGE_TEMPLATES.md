# Page Content Templates

Copy specs for each major page type. Use when writing or generating content in Phase 0–2.

---

## Homepage `/`

### Meta

```
Title: BillTox — Understand Your Medical Bill & Insurance EOB (Free)
Description: Free tools to decode hospital bills and insurance EOBs. Compare charges to Medicare benchmarks, spot common billing errors, or confirm your bill looks fair. Runs in your browser — private & free.
```

### Section structure

```
[Trust strip]
  Runs in your browser · No account · Your data stays on your device

[H1]
  Understand Your Medical Bill in Minutes

[Subhead]
  Whether you have a hospital bill or an insurance EOB — see what you owe, what codes mean, and whether charges look fair.

[CTA row]
  [Audit My Bill]  [Analyze My EOB]

[How it works — 3 steps]
  1. Paste your bill or enter codes
  2. We compare to public Medicare data
  3. Get a clear report — flags or all-clear

[Tools grid — 5 cards]
  → each links to /tools/*

[What we check]
  ✓ Price vs Medicare benchmark
  ✓ Duplicate charges
  ✓ Common unbundling pairs (NCCI)
  ✓ Plain-English code explanations
  Link: What we cannot check → /methodology/limitations/

[Audiences]
  Card: Uninsured / self-pay → /for/uninsured/
  Card: Insured with EOB → /for/insured/

[Trust / EEAT block]
  How we source data → /methodology/
  Data last updated: [DATE]
  Short disclaimer + link to /disclaimer/

[Footer]
```

---

## Tool page template

**Example:** `/tools/bill-auditor/`

### Meta (unique per tool)

```
Title: Free Medical Bill Auditor — Check Hospital Charges Online | BillTox
Description: Paste your itemized hospital bill to compare charges against Medicare rates, find duplicate line items, and spot common billing issues. Free, private, instant.
```

### Section structure

```
[Breadcrumbs]
  Home > Tools > Bill Auditor

[H1]
  Medical Bill Auditor

[Intro — 2 sentences]
  What it does + who it's for (both audiences).

[TOOL UI AREA]
  (Phase 1: placeholder with "Coming soon" + email optional)
  (Phase 4: live tool)

[What this tool checks]
  • Medicare price comparison by ZIP
  • Duplicate CPT/HCPCS lines
  • CMS NCCI unbundling pairs
  • Plain-English code breakdown

[What this tool cannot check]
  • Medical necessity or upcoding without diagnosis data
  • Whether your insurance plan was applied correctly
  → Full list: /methodology/limitations/

[Who should use this]
  • Uninsured patients reviewing hospital statements
  • Insured patients comparing bill vs EOB
  • Anyone who received an itemized bill after a procedure

[How to get your itemized bill]
  Short guide (hospital billing dept, online portal)

[FAQ — 8–12 items]
  See tool-specific FAQ list below

[Related guides]
  • How to Read a Medical Bill
  • How to Read an EOB
  • Medicare Allowed Amount Explained

[Methodology footer]
  Data: CMS MPFS [YEAR], NCCI [YEAR Q#]
  → /methodology/billing-flags/

[Disclaimer box]
  BillTox is not a law firm or medical provider. Results are informational...
```

### Bill Auditor — FAQ starters

1. Is BillTox really free?
2. Do you store my medical bill?
3. What is a CPT code?
4. What's the difference between a hospital bill and an EOB?
5. How accurate are Medicare benchmarks for insured patients?
6. What if the tool says my bill looks normal?
7. Can BillTox help me dispute a charge?
8. Is this legal or medical advice?

---

## CPT page template

**Example:** `/codes/cpt/99214/`

### Meta

```
Title: CPT Code 99214 — Office Visit Cost & What It Means | BillTox
Description: CPT 99214 is a moderate-complexity office visit. See typical Medicare costs in your area, common billing issues, and check your bill for free.
```

### Section structure

```
[Breadcrumbs]
  Home > Codes > CPT > 99214

[H1]
  CPT Code 99214: Office Visit Cost & Billing Guide

[Quick summary — 2–3 sentences]
  Featured-snippet style answer.

[What is CPT 99214?]
  Plain-English: what happens during this visit (ORIGINAL COPY)

[When is this code used?]
  Provider documentation level, typical scenarios

[99214 vs 99213]
  Link → /codes/compare/99213-vs-99214/

[Typical costs]
  • National Medicare allowed amount (approx)
  • [ZIP widget: Enter ZIP → see your locality rate] (Phase 3+)
  • What "charged amount" vs "allowed amount" means
  → /methodology/price-benchmarks/

[Common billing issues]
  • Related NCCI pairs if any (cite CMS)
  • Upcoding context (99215 vs 99214) — factual, no accusations

[What to do if charged above benchmark]
  Steps + CTA

[CTA button]
  Check this code on your bill → /tools/bill-auditor/?code=99214

[FAQ — 5–8]
  1. What does CPT 99214 mean in plain English?
  2. How much should 99214 cost?
  3. Is 99214 covered by insurance?
  4. What's the difference between 99213 and 99214?
  5. Can I dispute a 99214 charge?

[Author byline]
  Written by [Name] · Last updated [DATE]
  → /authors/[slug]/

[Sources]
  • CMS Physician Fee Schedule [YEAR]
  • CMS NCCI Policy Manual (if relevant)

[Disclaimer]
```

### Minimum word counts

| Page type | Min words |
|-----------|-----------|
| CPT page | 800 |
| CPT pillar codes (99213–99215, etc.) | 1200 |
| Compare page | 1000 |
| Learn pillar | 3000 |
| Tool page | 600 (+ FAQ) |

---

## Methodology hub `/methodology/`

### Required sections

1. **Our approach** — client-side, public data, transparency
2. **Quick links** to subpages
3. **Data freshness** — last updated table:

| Dataset | Source | Version | Updated |
|---------|--------|---------|---------|
| MPFS | CMS | 2026 | [date] |
| NCCI | CMS | 2026 Q1 | [date] |
| ZIP-Locality | CMS | 2026 | [date] |

4. **What we are not** — not legal/medical advice, not a collection agency
5. **Contact for corrections** → `/corrections/`

---

## Learn pillar template

**Example:** `/learn/how-to-read-eob/`

```
[H1] How to Read an Explanation of Benefits (EOB)

[TOC]

## What is an EOB?
## EOB vs medical bill — what's the difference?
## Key sections of your EOB
## Patient responsibility: deductible, copay, coinsurance
## Denied or adjusted claims — what to do
## Red flags on an EOB
## Step-by-step: reviewing your EOB
## Tools that can help
  [CTA → EOB Analyzer]
## FAQ
## Sources (CMS, insurer help pages)

[Author] [dateModified]
```

---

## Audience page template

**Example:** `/for/uninsured/`

```
[H1] Medical Bill Help for Uninsured & Self-Pay Patients

[Empathy intro — 1 paragraph]

[Your situation]
  • No insurance / paying cash
  • "Chargemaster" prices vs real costs
  • Negotiation is possible

[Recommended steps]
  1. Get itemized bill
  2. Run Bill Auditor
  3. Compare Fair Price by code
  4. Use Dispute Letter if flags found

[Tools for you — 3 cards]

[Learn more — 3 article links]

[CTA]
```

---

## 404 page

```
[H1] Page not found

Try:
• Bill Auditor
• Fair Price Calculator
• CPT Code Lookup
• How to Read a Medical Bill

[Search box → /codes/ or site search]
```
