# BillTox — Master Project Plan

Consolidated plan from product & technical planning sessions (Gemini discussion + Cursor refinement).

---

## 1. Vision

BillTox.com is a **medical bill transparency hub** for Americans. Users paste or enter bill/EOB data and instantly get:

1. **Plain-English explanations** of each line item
2. **Price benchmarks** vs Medicare allowed amounts in their region
3. **Common red flags** — duplicate charges, NCCI unbundling pairs, prices far above benchmark
4. **Honest "all clear"** when nothing suspicious is found

All computation runs in the browser. No accounts. Free (AdSense monetization).

### Why this niche (vs alternatives)

| Factor | Medical bill audit | Casino / high-risk niches |
|--------|-------------------|---------------------------|
| AdSense / YMYL | Hard but **legitimate** with EEAT | High ban risk |
| User need | Universal pain in USA | Narrow |
| Viral potential | r/personalfinance, TikTok bill horror stories | Limited |
| Technical fit | Static data + client JS = fast CWV | Often heavy / shady |

---

## 2. Site architecture philosophy

**Not** one calculator on one page (bad for SEO topical authority).  
**Not** scattered general health blog (dilutes focus).

**Yes:** A **cluster** of strong utilities + hardcore educational content around one problem: *"Why is my US medical bill so high, and is it fair?"*

### Three pillars + trust layer

```
                    [ TRUST LAYER — EEAT ]
    About · Methodology · Editorial · Authors · Legal · Contact
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   TOOLS HUB            LEARN HUB            CPT ENCYCLOPEDIA
   (conversion)          (topical authority)    (long-tail SEO)
```

---

## 3. Tools (product suite)

### 3.1 Itemized Bill Auditor (flagship)

User pastes bill text or enters CPT lines manually. Engine highlights:

| Signal | Feasibility | Notes |
|--------|-------------|-------|
| Price vs Medicare benchmark | **High** | Core wow factor |
| Duplicate line items | **High** | Same CPT + date twice |
| NCCI unbundling | **Medium** | Needs CMS NCCI edit database |
| Modifier sanity | **Medium** | Basic rules |
| Upcoding | **Low–Medium** | Without ICD-10 diagnoses, only weak heuristics — **do not oversell** |
| Balance / surprise billing | **Medium** | State-specific; Phase 5 |

### 3.2 Fair Price Calculator

CPT code + ZIP → Medicare allowed amount + documented "typical negotiated range."

### 3.3 EOB Analyzer

For **insured** users: parse Explanation of Benefits — patient responsibility, denied items, deductible progress.

### 3.4 Dispute Letter Builder

JS template engine → PDF download. Inserts detected flags into editable letter. Heavy disclaimers.

### 3.5 Quick Code Lookup

Lightweight entry funnel → full CPT encyclopedia page.

---

## 4. What we can and cannot promise

### Can detect (high confidence)

- Charged amount vs CMS Medicare rate for locality
- Exact duplicate charges
- Known NCCI procedure-to-procedure conflicts
- Missing expected bundling context (with explanation)

### Cannot reliably detect (be honest)

- Upcoding without diagnosis codes
- Medical necessity disputes
- Whether insurance correctly applied plan rules
- Legal violations — only "possible billing concerns"

### Required UX outcome

> If the bill looks normal → **green report**, not false alarms. This builds trust.

---

## 5. Code systems (data model awareness)

US bills involve multiple code systems:

| System | Use | MVP |
|--------|-----|-----|
| CPT | Physician procedures | ✅ Yes |
| HCPCS Level II | Supplies, ambulance, some services | ✅ Yes |
| ICD-10-CM | Diagnoses | ❌ Phase 2+ |
| Revenue codes | Hospital UB-04 lines | ❌ Phase 2+ |
| DRG | Inpatient stays | ❌ Phase 2+ |
| NDC | Drugs | ❌ Later |
| Modifiers | -25, -59, -76, etc. | ✅ Basic rules |

---

## 6. Data sources (public, legal)

| Data | Source | Update cadence | Est. size (gzip) |
|------|--------|----------------|------------------|
| Medicare Physician Fee Schedule | [CMS MPFS](https://www.cms.gov/medicare/payment/fee-schedules/physician) | Annual + adjustments | ~10–15 MB |
| NCCI PTP edits | CMS NCCI | Quarterly | ~5 MB |
| GPCI / localities | CMS | Annual | Part of MPFS |
| ZIP → locality mapping | CMS / crosswalk | Annual | ~1–2 MB |
| CPT short descriptors | CMS (limited) | Annual | Subset only |
| Full CPT descriptions | AMA (licensed) | — | **Not using** — we write our own |

### CPT intellectual property

AMA owns CPT. We **write original plain-English summaries** for SEO pages. Use CMS short descriptors only where permitted. Never bulk-copy AAPC or AMA text.

### Fair Health clarification

Gemini referenced "Fair Health Price Index" — that is a **commercial product**. We use **CMS Medicare benchmarks** + documented multiplier range. See `/methodology/price-benchmarks/`.

---

## 7. Findings engine (core logic)

### Pipeline

```
Input (text / codes / PDF)
    → Parser → Normalized line items
        → Duplicate check
        → NCCI unbundle check
        → Price benchmark check
        → Modifier sanity check
    → Findings Engine → Report
    → (optional) Dispute Letter Builder
```

### Finding object schema

```javascript
{
  type: 'PRICE_ABOVE_BENCHMARK' | 'DUPLICATE_CHARGE' | 'NCCI_BUNDLE' | ...,
  severity: 'high' | 'medium' | 'low' | 'info',
  codes: ['99214'],
  charged: 450.00,
  benchmark: 128.00,
  benchmarkSource: 'CMS MPFS 2026, Locality 01',
  explanation: 'Plain English...',
  confidence: 'high' | 'medium' | 'low',
  actionHint: 'Request itemized bill / call billing department'
}
```

**Confidence levels are mandatory** — especially for weak signals like upcoding heuristics.

---

## 8. Bill parsing reality

Hospital bills are **not standardized**. Epic, Cerner, Athena — different layouts.

### MVP parsing strategy

1. **Manual line entry** — 100% reliable (ship first)
2. **Paste text** — regex + heuristics for CPT (`\b\d{5}\b`), HCPCS (`[A-V]\d{4}`)
3. **PDF upload** — pdf.js text extraction (no OCR in v1)
4. **Photo OCR** — Phase 5+ (Tesseract WASM; heavy on mobile)

Do not promise "upload any bill and we understand everything" in v1.

---

## 9. SEO & EEAT strategy

### Technical SEO

- Static HTML, excellent Core Web Vitals (no backend latency)
- Unique title + meta per URL
- Breadcrumbs + `BreadcrumbList` schema
- Split sitemaps by section
- Internal linking: CPT → tool → learn → methodology loop

### EEAT (YMYL finance/health)

| Signal | How |
|--------|-----|
| Experience | `/stories/`, real workflows, redacted bill examples |
| Expertise | Author bios, editorial policy |
| Authoritativeness | Methodology citing cms.gov |
| Trustworthiness | Disclaimers, limitations, privacy, contact, freshness dates |

### AdSense YMYL rules

- No "guaranteed savings"
- Substantial content before applying (~25–35 pages)
- Clear disclaimers on every tool page
- Methodology & limitations pages required

### Viral / social

Reddit r/personalfinance, TikTok: *"This free site helped me understand my $2,000 ER bill."*  
On-site: user stories as **self-reported**, not guarantees.

---

## 10. Corrections vs Gemini proposal

| Gemini said | Our correction |
|-------------|----------------|
| Upcoding detection as headline feature | Weak without ICD-10 — secondary, low confidence |
| Fair Health data | Use CMS Medicare + documented range |
| "Legally verified" dispute templates | Editable starting templates + disclaimers |
| 500 CPT pages day one | Tiered rollout: 50 → 150 → 500+ |
| Upload any bill | MVP = manual entry + paste; PDF later |
| 0.2s load with full DB | Lazy-load locality data; 15–25 MB total dataset |

---

## 11. Audience paths

### Self-pay / uninsured

Landing: `/for/uninsured/`  
Tools: Bill Auditor, Fair Price, Dispute Letter  
Learn: negotiate hospital bill, surprise billing

### Insured (EOB)

Landing: `/for/insured/`  
Tools: EOB Analyzer, Bill Auditor, Dispute Letter  
Learn: read EOB, dispute insurance claim

---

## Related docs

- [SITE_MAP.md](SITE_MAP.md) — every URL
- [PHASES.md](PHASES.md) — build order
- [EEAT_CHECKLIST.md](EEAT_CHECKLIST.md) — per-page requirements
- [PAGE_TEMPLATES.md](PAGE_TEMPLATES.md) — content specs
- [TECHNICAL_SPEC.md](TECHNICAL_SPEC.md) — engine & data details
- [DECISIONS.md](DECISIONS.md) — locked choices
