# PatientBillGuide.com

**Honest healthcare numbers for Americans** — check fair prices against Medicare benchmarks, understand itemized bills and insurance EOBs, and spot common billing concerns. All processing runs in the browser; no accounts required.

> **Separate project** — not related to VeloTools.

**Repository:** [github.com/vigbigcolors-commits/PatientBillGuide](https://github.com/vigbigcolors-commits/PatientBillGuide)

## Current status

| Item | Value |
|------|-------|
| **Domain** | PatientBillGuide.com (pending DNS) |
| **Phase** | Week 8 — deploy ready |
| **Live tools** | 7 (see below) |
| **Tests** | 75 passing (`npm test`) |
| **Pages** | 64 static routes (`npm run build`) |
| **GitHub** | Pushed to `main` |
| **Deploy** | Cloudflare Pages — see [docs/DEPLOY.md](docs/DEPLOY.md) |
| **Tracker** | [STATUS.md](STATUS.md) |

### Live tools

| Tool | URL |
|------|-----|
| Fair Price Calculator | `/tools/fair-price/` |
| Medicare Part B estimate | `/tools/fair-price/?tab=medicare` |
| Surprise Bill Checker | `/tools/surprise-bill-check/` |
| Hospital Price Compare | `/tools/hospital-compare/` |
| Itemized Bill Auditor | `/tools/bill-auditor/` |
| EOB Analyzer | `/tools/eob-analyzer/` |
| Dispute Letter Builder | `/tools/dispute-letter/` |

CMS data bundles (`MPFS`, NCCI chunks, ZIP→locality) live in `public/data/` and ship with every deploy.

## Stack

- **Astro 7** — static site
- **Vitest** — engine tests
- **Cloudflare Pages** — target host (CDN + SSL)
- **Node 22+** — build and CI

## Run the site locally (important)

This is an **Astro** app. It must run through the Astro dev server — **not** VS Code / Cursor **“Go Live”**.

| Method | What happens |
|--------|----------------|
| ❌ **Go Live** on project folder | Shows raw file list (`src/`, `public/`, …) — **wrong** |
| ✅ **`npm run dev`** | Real site at http://localhost:4321 (or **4322** if 4321 is busy) |

### Quick start (Windows)

```powershell
cd C:\Users\Vigen\Desktop\VELO\PatientBillGuide
npm install
npm run dev
```

Or double-click **`start-dev.ps1`**.

Open the URL Astro prints in the terminal — homepage, tools, and CPT pages all work.

### From Cursor / VS Code

1. **Terminal → Run Task → PatientBillGuide: Dev Server**, or  
2. **Run and Debug → PatientBillGuide: Dev Server**, or  
3. `npm start` / `npm run dev`

### Production build (local test before deploy)

```powershell
npm run build
npm run preview
```

Serves the built `dist/` folder — same output Cloudflare Pages will publish.

### Tests

```powershell
npm test
```

On Windows, if Vitest runs out of memory, use:

```powershell
npx vitest run --pool=forks --maxWorkers=2
```

## What works now

- **Homepage** — hero, FAQ, tool bridge
- **7 live tools** — full client-side calculators and checkers (see table above)
- **CPT encyclopedia** — `/codes/` + **30** launch code pages with plain-English summaries
- **Learn hub** — `/learn/` including redesigned EOB and CPT guides
- **Audience pages** — `/for/uninsured/`, `/for/seniors-medicare/`, `/for/insured/`
- **Trust & methodology** — privacy (browser-only policy), data sources, price benchmarks, limitations
- **SEO** — sitemap, structured data on key articles

## Documentation

See [docs/](docs/) — [MASTER_PLAN.md](docs/MASTER_PLAN.md), [PHASES.md](docs/PHASES.md), [DEPLOY.md](docs/DEPLOY.md).

**Continue in Cursor:** `Continue PatientBillGuide from STATUS.md`

## Project folder

```
C:\Users\Vigen\Desktop\VELO\PatientBillGuide
```

## License

TBD
