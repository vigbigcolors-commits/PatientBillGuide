# Agent Instructions — BillTox

Instructions for Cursor / AI agents continuing this project.

## First steps every session

1. Read [STATUS.md](STATUS.md) — current phase and unchecked tasks
2. Read [docs/PHASES.md](docs/PHASES.md) — what belongs in current phase
3. Read [docs/DECISIONS.md](docs/DECISIONS.md) — do not contradict locked decisions
4. Work **only** the current phase unless user explicitly overrides

## Project summary

- **BillTox.com** — US medical bill transparency tools (standalone, not VeloTools)
- English, both uninsured + insured audiences, AdSense monetization
- Client-side processing, CMS public data, strong EEAT for YMYL
- Build trust pages **before** working tools

## Key constraints

- Never copy AMA/AAPC CPT descriptions verbatim — write original plain-English
- Never claim "fraud" or "guaranteed savings"
- Always show confidence levels on billing flags
- "Bill looks normal" is a valid and required outcome
- Dispute letters = editable templates, not legal advice

## Documentation map

| File | Use when |
|------|----------|
| [docs/SITE_MAP.md](docs/SITE_MAP.md) | Adding a new page/route |
| [docs/PAGE_TEMPLATES.md](docs/PAGE_TEMPLATES.md) | Writing page content |
| [docs/EEAT_CHECKLIST.md](docs/EEAT_CHECKLIST.md) | Before publishing any page |
| [docs/TECHNICAL_SPEC.md](docs/TECHNICAL_SPEC.md) | Building parser, findings engine, data pipeline |
| [docs/CONTENT_WORKFLOW.md](docs/CONTENT_WORKFLOW.md) | CPT/learn content production |
| [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md) | Unresolved decisions |

## After completing work

1. Check off tasks in [STATUS.md](STATUS.md)
2. Add row to Session log in STATUS.md
3. Update OPEN_QUESTIONS.md if decisions were made
4. Update DECISIONS.md for new locked decisions

## User prompt to continue

> "Continue BillTox from STATUS.md Phase X"

## Phase order (never skip)

```
Phase 0: EEAT shell + homepage
Phase 1: Tool landing pages + learn pillars
Phase 2: CPT encyclopedia Tier 1 + AdSense
Phase 3: Data pipeline + Fair Price tool
Phase 4: Bill Auditor + EOB + Dispute Letter
Phase 5: Scale content
```

## Stack (planned)

- Astro, static deploy on Cloudflare Pages
- Vitest for engine tests
- Data: CMS MPFS + NCCI as gzip JSON on CDN
