# PatientBillGuide.com

**Honest healthcare numbers for Americans** — check fair prices against Medicare benchmarks, understand itemized bills and insurance EOBs, and spot common billing concerns. All processing runs in the browser; no accounts required.

> **Separate project** — not related to VeloTools.

## Current status

| Item | Value |
|------|-------|
| **Domain** | PatientBillGuide.com |
| **Phase** | Week 8 — deploy ready (6 tools, 56 tests, 53 pages) |
| **Deploy** | Cloudflare Pages — see [docs/DEPLOY.md](docs/DEPLOY.md) |
| **Tracker** | [STATUS.md](STATUS.md) |

## Run the site locally (important)

This is an **Astro** app. It must run through the Astro dev server — **not** VS Code / Cursor **“Go Live”**.

| Method | What happens |
|--------|----------------|
| ❌ **Go Live** on project folder | Shows raw file list (`src/`, `public/`, …) — **wrong** |
| ✅ **`npm run dev`** | Real site at http://localhost:4321 |

### Quick start (Windows)

```powershell
cd C:\Users\Vigen\Desktop\VELO\PatientBillGuide
npm install
npm run dev
```

Or double-click **`start-dev.ps1`**.

Open **http://localhost:4321** — homepage, Fair Price Calculator, CPT pages all work.

### From Cursor / VS Code

1. **Terminal → Run Task → PatientBillGuide: Dev Server**, or  
2. **Run and Debug → PatientBillGuide: Dev Server**, or  
3. `npm start` / `npm run dev`

### Production build (local test before deploy)

```powershell
npm run build
npm run preview
```

Opens http://localhost:4321 with the built `dist/` output (same as Cloudflare will serve later).

### Tests

```powershell
npm test
```

## What works now

- Homepage, trust pages, methodology
- **Fair Price Calculator** — `/tools/fair-price/` (CPT + ZIP → Medicare benchmark)
- **CPT guides** — `/codes/` + 5 code pages
- **Learn hub** — `/learn/` + EOB and CPT basics
- Tool roadmap pages (bill auditor, EOB, Medicare lookup) — no 404s

## Documentation

See [docs/](docs/) — [MASTER_PLAN.md](docs/MASTER_PLAN.md), [PHASES.md](docs/PHASES.md).

**Continue in Cursor:** `Continue PatientBillGuide from STATUS.md`

## Project folder

```
C:\Users\Vigen\Desktop\VELO\PatientBillGuide
```

## License

TBD
