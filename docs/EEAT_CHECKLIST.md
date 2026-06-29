# SEO & EEAT Checklist

Use this for **every page** before publish. Target: YMYL 10/10.

---

## Global site requirements

- [ ] HTTPS everywhere
- [ ] Unique `<title>` (50–60 chars) per URL
- [ ] Unique meta description (150–160 chars) per URL
- [ ] Canonical URL (self-referencing)
- [ ] Open Graph tags (title, description, image)
- [ ] Mobile responsive, no horizontal scroll
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Semantic HTML: one H1, logical H2–H4
- [ ] Breadcrumbs visible + `BreadcrumbList` JSON-LD
- [ ] Internal links: minimum 3 contextual links per content page
- [ ] Footer on all pages: Privacy, Terms, Disclaimer, Methodology, Contact
- [ ] `dateModified` visible on content pages
- [ ] No lorem ipsum in production

---

## EEAT scorecard

| Signal | Requirement | Where |
|--------|-------------|-------|
| **Experience** | Real workflows, redacted examples, user stories | `/stories/`, learn articles |
| **Expertise** | Author bylines with real bios | `/authors/`, CPT, learn |
| **Authoritativeness** | Government sources cited | Methodology, learn pillars |
| **Trustworthiness** | Disclaimers, limitations, honest outcomes | All tools, `/disclaimer/` |
| **Transparency** | Public formulas, data versions | `/methodology/*` |
| **Freshness** | Visible update dates, corrections log | All content pages |
| **Honesty** | "Bill looks normal" as valid result | Bill Auditor UX |

---

## Red flags — NEVER do

- [ ] ~~"Guaranteed savings"~~
- [ ] ~~"We found fraud"~~ → use "possible billing concern"
- [ ] ~~Fake doctor credentials~~
- [ ] ~~Fake reviews or star ratings~~
- [ ] ~~500 identical CPT pages with one swapped variable~~
- [ ] ~~Missing disclaimer on tool pages~~
- [ ] ~~Copying AMA/AAPC CPT descriptions verbatim~~
- [ ] ~~Popups blocking tool usage~~

---

## Per page type

### Homepage `/`

- [ ] H1: clear benefit (understand medical bill / EOB)
- [ ] Both audiences mentioned (uninsured + insured)
- [ ] Primary CTA → Bill Auditor; secondary → EOB Analyzer
- [ ] Trust strip: browser-only, no upload, free
- [ ] 3-step how it works
- [ ] Tool cards linking to all tools
- [ ] "What we check" + link to limitations
- [ ] Methodology teaser + last data update date
- [ ] Disclaimer snippet
- [ ] Schema: `Organization`, `WebSite`, `SearchAction`

### Tool pages `/tools/*`

- [ ] Unique H1 and meta (not shared across tools)
- [ ] "What this tool checks" section
- [ ] "What it cannot check" → `/methodology/limitations/`
- [ ] "Who should use this" (audience-specific)
- [ ] FAQ section (8–12 questions) + `FAQPage` schema
- [ ] Related learn articles (2–3 links)
- [ ] Methodology footer: data version, CMS release
- [ ] Full disclaimer block
- [ ] Schema: `SoftwareApplication` or `WebApplication`

### CPT pages `/codes/cpt/[code]/`

- [ ] Minimum **800–1200 words** original content
- [ ] H1: `CPT Code XXXXX: What It Is, Typical Cost & Billing Guide`
- [ ] Quick summary paragraph (featured snippet target)
- [ ] Plain-English procedure description (**our copy**)
- [ ] When providers use this code
- [ ] Compare link (e.g. vs related code)
- [ ] Typical costs section with methodology link
- [ ] Fair price widget placeholder/live (Phase 3+)
- [ ] Common billing issues (factual, sourced)
- [ ] CTA → Bill Auditor with `?code=`
- [ ] FAQ (5–8) + `FAQPage` schema
- [ ] Author byline → `/authors/[slug]/`
- [ ] Sources: CMS links (not AMA full text)
- [ ] `dateModified` + `MedicalWebPage` or `Article` schema
- [ ] Disclaimer

### Learn pillars `/learn/*`

- [ ] 3000+ words for pillar pages
- [ ] Table of contents with jump links
- [ ] Inline citations (CMS, HHS, state AG)
- [ ] Author + optional reviewer note
- [ ] Mid-article CTA to relevant tool
- [ ] End CTA to relevant tool
- [ ] `Article` schema with `dateModified`
- [ ] Related articles section (3–5 links)

### Methodology `/methodology/*`

- [ ] What BillTox is and is **not**
- [ ] Exact data source file names + cms.gov URLs
- [ ] Update schedule (quarterly NCCI, annual MPFS)
- [ ] Step-by-step price formula (reproducible)
- [ ] Flag detection logic with confidence levels
- [ ] Known limitations (prominent)
- [ ] Client-side privacy architecture explained
- [ ] Changelog / link to `/corrections/`
- [ ] No ads (recommended)

### Trust / legal pages

- [ ] `/privacy/` — explicit: client-side processing, no PHI stored
- [ ] `/disclaimer/` — not legal advice, not medical advice
- [ ] `/terms/` — limitation of liability
- [ ] `/editorial-policy/` — how CPT summaries are written & reviewed
- [ ] `/contact/` — real contact method
- [ ] `/accessibility/` — WCAG commitment
- [ ] No ads on legal pages (recommended)

### Audience pages `/for/*`

- [ ] Scenario-specific H1 (not generic)
- [ ] Pain points in user language
- [ ] Which tools to use (ordered steps)
- [ ] Links to relevant learn pillars
- [ ] No duplicate of tool page content — unique angle

---

## Schema.org reference

| Page type | Schema types |
|-----------|--------------|
| Homepage | Organization, WebSite, SearchAction |
| Tool | SoftwareApplication, FAQPage, BreadcrumbList |
| CPT | MedicalWebPage, FAQPage, BreadcrumbList |
| Learn | Article, BreadcrumbList |
| FAQ sections | FAQPage (can combine with primary type) |

Validate with Google Rich Results Test before launch.

---

## Pre-publish QA script

1. Lighthouse audit (mobile)
2. Rich Results Test on 1 page per type
3. Check all internal links resolve (no 404)
4. Read disclaimer visible without scrolling on tools? (recommended above fold on mobile)
5. Spell-check + plain-language read (grade 8–10 reading level target)
