# Agent Instructions — PatientBillGuide

Instructions for Cursor / AI agents continuing this project.

## First steps every session

1. Read [STATUS.md](STATUS.md) — current week and unchecked tasks
2. Read [docs/PROJECT_CONTINUITY.md](docs/PROJECT_CONTINUITY.md) — if folder was renamed or new session
3. Read [docs/ISSUES.md](docs/ISSUES.md) — open bugs and undecided items
4. Read [docs/PHASES.md](docs/PHASES.md) — what belongs in current week
5. Read [docs/DECISIONS.md](docs/DECISIONS.md) — do not contradict locked decisions
6. Read [docs/MASTER_PLAN.md](docs/MASTER_PLAN.md) — strategy and tool clusters
7. Work **only** the current week unless user explicitly overrides

## Project summary

- **PatientBillGuide.com** — US healthcare consumer transparency hub (standalone, not VeloTools)
- English, uninsured + insured + Medicare audiences
- AdSense + soft affiliate later; client-side processing; CMS public data
- **Accelerated build:** minimal trust → Fair Price week 2 → SEO in parallel

## Key constraints

- Never copy AMA/AAPC CPT descriptions verbatim — write original plain-English
- Never claim "fraud" or "guaranteed savings"
- Always show confidence levels on billing flags
- "Bill looks normal" is a valid and required outcome
- Dispute letters = editable templates, not legal advice
- No EV/solar content on this domain

## User prompt to continue

> "Continue PatientBillGuide from STATUS.md Week X"

## Stack

- Astro, static deploy on Cloudflare Pages
- Vitest for engine tests
- Data: CMS MPFS + NCCI as gzip JSON on CDN
