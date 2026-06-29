# BillTox.com

**Medical bill transparency for Americans** — understand itemized hospital bills and insurance EOBs, compare charges to public Medicare benchmarks, and spot common billing red flags. All processing runs in the browser; no accounts required.

> **Separate project** — not related to VeloTools.

## Current status

| Item | Value |
|------|-------|
| **Phase** | 0 — Foundation (not started) |
| **Next step** | See [docs/PHASES.md](docs/PHASES.md) → Phase 0, task 1 |
| **Tracker** | [STATUS.md](STATUS.md) |

## Locked decisions

| Decision | Value |
|----------|-------|
| Domain / brand | BillTox.com |
| Language | English (US market) |
| Audience | Self-pay / uninsured **and** insured (EOB) |
| Monetization (start) | Google AdSense only |
| CPT descriptions | Original plain-English summaries (not AMA copy) |
| Architecture | Client-side JS/WASM; static data via CDN (Cloudflare) |
| Build order | **Page structure + EEAT shell first**, then tools & data engine |

## Documentation index

| Document | Purpose |
|----------|---------|
| [STATUS.md](STATUS.md) | Live progress tracker — update as you work |
| [docs/DECISIONS.md](docs/DECISIONS.md) | All agreed product & technical decisions |
| [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md) | Master plan: vision, engine, nuance, risks |
| [docs/SITE_MAP.md](docs/SITE_MAP.md) | Full URL map & page inventory |
| [docs/PHASES.md](docs/PHASES.md) | Phased action plan (week by week) |
| [docs/EEAT_CHECKLIST.md](docs/EEAT_CHECKLIST.md) | SEO & EEAT requirements per page type |
| [docs/PAGE_TEMPLATES.md](docs/PAGE_TEMPLATES.md) | Content specs: Home, Tool, CPT, Learn, Methodology |
| [docs/TECHNICAL_SPEC.md](docs/TECHNICAL_SPEC.md) | Data pipeline, findings engine, architecture |
| [docs/CONTENT_WORKFLOW.md](docs/CONTENT_WORKFLOW.md) | Editorial process for CPT & learn content |
| [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md) | Items still to decide before/during build |

## How to continue (для команды)

1. Open this folder in Cursor: `C:\Users\Vigen\Desktop\VELO\billtox`
2. Read [STATUS.md](STATUS.md) and [docs/PHASES.md](docs/PHASES.md)
3. Work **in phase order** — do not skip EEAT shell (Phase 0)
4. After each completed task, check the box in `STATUS.md`
5. Tell the agent: *"Continue BillTox from STATUS.md Phase X"*

## Planned stack (Phase 0+)

- **Framework:** Astro (static, fast SEO, content collections)
- **Hosting:** Cloudflare Pages
- **Data:** CMS MPFS + NCCI as `*.json.gz` on CDN
- **Tests:** Vitest (findings engine & parser logic)

## Repo layout (target)

```
billtox/
├── docs/              ← planning & specs (this conversation saved here)
├── src/
│   ├── pages/         ← routes mirror docs/SITE_MAP.md
│   ├── layouts/
│   ├── components/
│   └── content/       ← cpt/, learn/, authors/
├── public/
└── STATUS.md          ← progress tracker
```

## License

TBD
