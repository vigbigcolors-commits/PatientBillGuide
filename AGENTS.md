# Agent Instructions — PatientBillGuide

Instructions for Cursor / AI agents continuing this project.

## First steps every session

1. Read [STATUS.md](STATUS.md) — current week and unchecked tasks
2. Read [docs/PROJECT_CONTINUITY.md](docs/PROJECT_CONTINUITY.md) — if folder was renamed or new session
3. Read [docs/ISSUES.md](docs/ISSUES.md) — open bugs and undecided items
4. Read [docs/PHASES.md](docs/PHASES.md) — what belongs in current week
5. Read [docs/DECISIONS.md](docs/DECISIONS.md) — do not contradict locked decisions
6. Read [docs/MASTER_PLAN.md](docs/MASTER_PLAN.md) — strategy and tool clusters
7. Read [docs/GROWTH_MASTER.md](docs/GROWTH_MASTER.md) — SEO, CPT scale, long-tail (post-launch)
8. Read [docs/DAILY_PLAN.md](docs/DAILY_PLAN.md) — **current day tasks** (do not skip ahead)
9. Read [docs/GOOGLE_QUALITY.md](docs/GOOGLE_QUALITY.md) — **Zero-Doorway Rule** (mandatory before any new URLs)
10. Work **only** the current phase in STATUS.md unless user explicitly overrides

## Project summary

- **PatientBillGuide.com** — US healthcare consumer transparency **super platform** (standalone, not VeloTools)
- English, uninsured + insured + Medicare audiences
- **7 live tools** + CPT encyclopedia scaling to **500 in 6 months**
- AdSense + soft affiliate later; client-side processing; CMS public data
- **Post-launch (Jul 2026):** site live · GSC · grow via CPT batches + compare/category + Reddit

## Key constraints

- **Zero-Doorway Rule** — every page answers a real question on-page; no thin SEO funnels ([GOOGLE_QUALITY.md](docs/GOOGLE_QUALITY.md))
- Never auto-generate compare pages or empty category hubs
- CPT batches: max 25–50/deploy, 10% manual QA; top 50 codes hand-edited
- Never copy AMA/AAPC CPT descriptions verbatim — write original plain-English
- Never claim "fraud" or "guaranteed savings"
- Always show confidence levels on billing flags
- "Bill looks normal" is a valid and required outcome
- Dispute letters = editable templates, not legal advice
- No EV/solar content on this domain

## User prompt to continue

> "Continue PatientBillGuide from STATUS.md"

## Stack

- Astro, static deploy on Cloudflare Pages
- Vitest for engine tests
- Data: CMS MPFS + NCCI as gzip JSON on CDN
