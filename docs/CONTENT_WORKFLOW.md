# Content Production Workflow

How CPT pages, learn articles, and trust content get created and published.

---

## Editorial principles

1. **Original writing** — every CPT summary in our own words
2. **Factual pricing** — tied to CMS data with methodology link
3. **Honest scope** — say what we don't know
4. **User-first language** — grade 8–10 reading level
5. **No fear-mongering** — "possible issue" not "they scammed you"

---

## CPT page production pipeline

```
Research (CMS + clinical context)
    → Draft plain-English summary
    → Add cost section (benchmark placeholders until Phase 3)
    → Write FAQ from People Also Ask / Reddit threads
    → Assign author
    → SEO meta + internal links (min 3)
    → EEAT checklist review
    → Publish with dateModified
    → Quarterly refresh on CMS updates
```

### Per-page editorial checklist

- [ ] Original description (not copied from AMA/AAPC)
- [ ] Medicare benchmark section with methodology link
- [ ] Limitations mentioned where relevant
- [ ] CTA to Bill Auditor
- [ ] Author byline linked to `/authors/`
- [ ] Government sources cited
- [ ] FAQ schema valid
- [ ] 800+ words
- [ ] Compare link to related code (if applicable)

---

## Tier 1 CPT codes (50) — launch list

**Office / outpatient visits (E&M)**
- 99202, 99203, 99204, 99205 (new patient)
- 99211, 99212, 99213, 99214, 99215 (established)
- 99385, 99386, 99387 (preventive adult)

**Emergency**
- 99281, 99282, 99283, 99284, 99285

**Imaging**
- 70450 (CT head w/o contrast)
- 70553 (MRI brain w/ contrast)
- 71046 (chest X-ray 2 views)
- 72148 (MRI lumbar spine)
- 74177 (CT abdomen/pelvis w/ contrast)

**Lab**
- 80053 (comprehensive metabolic panel)
- 85025 (CBC with diff)
- 84443 (TSH)
- 36415 (venipuncture)

**Surgery / procedures**
- 27447 (total knee replacement)
- 66984 (cataract surgery)
- 45378 (colonoscopy diagnostic)
- 45380 (colonoscopy with biopsy)
- 29881 (knee arthroscopy)

**Anesthesia / facility (common on bills)**
- 01967 (epidural labor)
- 96372 (injection subq/im)

**HCPCS**
- G0105 (colonoscopy high risk)
- G0121 (colonoscopy screening)
- J1885 (ketorolac injection)

**Other high-volume**
- 93000 (EKG)
- 97110 (physical therapy)
- 12001 (wound repair simple)
- 20610 (joint injection)
- 43239 (upper endoscopy biopsy)
- 59510 (C-section delivery)
- 59400 (vaginal delivery)
- 29827 (shoulder arthroscopy)
- 47562 (laparoscopic cholecystectomy)
- 23412 (rotator cuff repair)
- 22612 (lumbar fusion)
- 76700 (abdominal ultrasound)
- 78815 (PET scan)
- 90471 (immunization admin)
- 90686 (flu vaccine)
- 96365 (IV infusion first hour)

> **Note:** Finalize list with SEO keyword research (Ahrefs/Semrush) before Phase 2. Replace low-volume codes as needed.

---

## Compare pages (Phase 2 — first 5)

| URL | Why |
|-----|-----|
| `/codes/compare/99213-vs-99214/` | Most common E&M confusion |
| `/codes/compare/99214-vs-99215/` | Upcoding context (careful tone) |
| `/codes/compare/99283-vs-99284/` | ER level confusion |
| `/codes/compare/99202-vs-99203/` | New patient levels |
| `/codes/compare/45378-vs-45380/` | Colonoscopy codes |

---

## Category pages (Phase 2 — first 5)

| Slug | Title |
|------|-------|
| `office-visits` | Office Visit CPT Codes (99202–99215) |
| `emergency-room` | Emergency Room Visit Codes (99281–99285) |
| `imaging` | Medical Imaging CPT Codes (MRI, CT, X-Ray) |
| `laboratory` | Common Lab Test CPT Codes |
| `surgery` | Frequently Billed Surgery CPT Codes |

---

## Learn content priority

### Phase 1 (must have)

1. How to Read a Medical Bill
2. How to Read an EOB

### Phase 2

3. Surprise Medical Bills (No Surprises Act overview)
4. Common Medical Billing Errors
5. Medicare Allowed Amount Explained

### Phase 5

6. How to Negotiate a Hospital Bill (self-pay)
7. How to Dispute an Insurance Claim
8. CPT Codes Explained (pillar → encyclopedia)

---

## Glossary terms (Phase 2+)

`/learn/glossary/[term]/`

- eob
- deductible
- copay
- coinsurance
- cpt
- hcpcs
- chargemaster
- allowed-amount
- balance-billing
- itemized-bill
- prior-authorization
- explanation-of-benefits

---

## Author page requirements

Each author at `/authors/[slug]/` needs:

- Real name and photo (optional but builds trust)
- Short bio (health literacy, consumer advocacy, tech — honest credentials)
- LinkedIn or professional link (if applicable)
- **Do not claim MD/lawyer unless true**
- List of articles authored on BillTox

---

## Corrections process

1. User reports error via `/contact/` or `/corrections/`
2. Verify against CMS source
3. Fix content + data if needed
4. Log entry on `/corrections/` with date
5. Update `dateModified` on affected pages

---

## Tone guide

**Voice:** Empathetic advocate (recommended)

| Do | Don't |
|----|-------|
| "Your bill may include an error worth checking" | "Your hospital committed fraud" |
| "Here's what this code typically costs in your area" | "You're being ripped off" |
| "This looks normal based on public data" | Silence when no flags found |
| "Consider calling the billing department" | "Sue your hospital" |

---

## Content file format (Astro — when building)

```markdown
---
code: "99214"
title: "CPT Code 99214"
category: "office-visits"
author: "jane-doe"
pubDate: 2026-06-29
updatedDate: 2026-06-29
relatedCodes: ["99213", "99215"]
compareSlug: "99213-vs-99214"
faqs:
  - question: "What does CPT 99214 mean?"
    answer: "..."
---

Content body here...
```
