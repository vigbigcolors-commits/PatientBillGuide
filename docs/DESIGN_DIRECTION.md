# Design Direction — PatientBillGuide UI/UX

**Status:** Principles locked; visual execution in Phase 0  
**Goal:** Stylish, modern, trustworthy — top-tier UX for YMYL healthcare/finance

---

## Design principles

| Principle | Meaning |
|-----------|---------|
| **Clarity over cleverness** | User in stress (big bill) — zero confusion |
| **Calm trust** | Not hospital sterile; not fintech aggressive |
| **Speed visible** | Instant feedback, skeleton states, no jank |
| **Honest UI** | Show confidence levels, limitations inline |
| **Accessible** | WCAG 2.1 AA target, readable type, contrast |

---

## Emotional tone

User feeling: *anxious, confused, possibly angry at hospital bill*

Design should feel: **calm advocate** — like a smart friend who explains, not a lawyer scaring you.

| Do | Don't |
|----|-------|
| Soft confidence (navy, teal, warm white) | Alarm red everywhere |
| Clear green "looks normal" state | Only showing scary flags |
| Generous whitespace | Dense medical forms |
| Plain language labels | CPT jargon in UI chrome |

---

## Color direction (starting point)

```
Primary:    Deep navy     #0F172A  (trust, seriousness)
Accent:     Teal          #0D9488  (health, clarity, action)
Success:    Soft green    #059669  (bill looks OK)
Warning:    Amber         #D97706  (review suggested)
Alert:      Coral red     #DC2626  (high-confidence flag only)
Background: Warm white    #FAFAF9
Surface:    White         #FFFFFF
Text:       Slate         #334155
Muted:      #64748B
```

Avoid: casino gold, sterile hospital green, purple "AI startup" gradients.

---

## Typography

| Role | Suggestion |
|------|------------|
| Headings | **DM Sans**, **Outfit**, or **Plus Jakarta Sans** — modern, friendly |
| Body | **Inter** or **Source Sans 3** — highly readable |
| Codes / numbers | **DM Mono** or **JetBrains Mono** — CPT codes, dollar amounts |

Large body (18px base on mobile) — stressed users skim.

---

## Logo direction

**BillTox** wordmark concepts:

1. **Wordmark only** — clean sans, `Bill` regular + `Tox` accent color (minimal, Phase 0 OK)
2. **Icon + wordmark** — abstract: document + magnifying glass / shield check (not syringe, not $ bag cliché)
3. Avoid: skull, poison symbol (too negative), caduceus (implies medical practice)

Logo must work at 32px favicon.

---

## Reference sites (study, don't copy)

| Site | Learn from |
|------|------------|
| [Stripe](https://stripe.com) | Clarity, whitespace, trust |
| [Linear](https://linear.app) | Modern SaaS polish, dark option later |
| [HealthCare.gov](https://healthcare.gov) | Plain language (inverse: avoid their clutter) |
| [TurboTax](https://turbotax.intuit.com) | Step-by-step anxiety reduction |
| [GoodRx](https://goodrx.com) | Healthcare consumer trust tone |

---

## Homepage (Figma — locked)

**Source:** Patient Bill Guide UI Design (Figma Make)

| Element | Rule |
|---------|------|
| Hero alignment | **Left** within `.container` — not centered |
| H1 line 2 | `before you pay.` in accent teal `#0D9488` |
| Hero badge | Shield icon · white pill · teal border |
| Hero stats | `12,400+` · `2026 CMS` · `100%` pattern |
| Section headings | Left-aligned (doors, tools) |
| Trust strip | Centered utility bar — exception |

**Component:** `src/components/home/HomeHero.astro` — edit Figma hero here only.

---

## UX patterns per area

### Tools

- Single primary action per screen
- Paste area huge and obvious
- Results: traffic-light severity (green / amber / red) + always explain *why*
- Empty state: example bill snippet
- "All clear" celebration state — not silent

### CPT encyclopedia

- Price widget above fold
- TOC for long pages
- Sticky CTA: "Check on your bill"

### Learn articles

- TOC, jump links
- Short paragraphs (2–3 sentences max)
- One illustration or diagram per pillar (optional)

### Trust pages

- Readable legal prose (not tiny gray text)
- Last updated date top-right

---

## Mobile first

70%+ traffic likely mobile (Reddit/TikTok viral).

- Thumb-zone CTAs
- No hover-only interactions
- Tool works without horizontal scroll
- Data loading: progress bar for CMS bundle fetch

---

## Phase 0 design deliverables

- [ ] Color tokens (CSS variables)
- [ ] Type scale
- [ ] Button, input, card components
- [ ] Header + footer (with trust links)
- [ ] Disclaimer component (reusable)
- [ ] Favicon + wordmark placeholder
- [ ] 1 Figma-free reference: mood board in this doc (links/screenshots optional)

---

## Open decisions

- [ ] Dark mode at launch? (Recommend: light only v1, add later)
- [ ] Illustration style: none / line icons / custom
- [ ] Final logo concept
