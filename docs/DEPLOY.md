# Cloudflare Pages deployment

PatientBillGuide is a static Astro site. Recommended stack:

```
GitHub (repo) → Cloudflare Pages (build + CDN) → patientbillguide.com (domain)
```

This is the standard, low-maintenance setup: push to `main` → automatic deploy → global CDN + free SSL.

## 1. GitHub

- Push this repo to GitHub (e.g. `your-org/PatientBillGuide`)
- Default branch: `main`

## 2. Cloudflare Pages

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select the GitHub repo
3. Build settings:

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | 22 (`NODE_VERSION=22` env var if needed) |

4. **Save and Deploy** — first build runs from GitHub

**Important:** Commit `public/data/*` and `package-lock.json` before connecting. Use
`npm run build` (not `build:fresh`) for routine deploys — see pre-deploy checklist below.

## 3. Custom domain

1. Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `patientbillguide.com` (and `www` if desired)
3. If the domain is already on Cloudflare DNS, records are added automatically
4. If the domain is elsewhere, point nameservers to Cloudflare or add the CNAME Cloudflare shows

**Flow:** User → `patientbillguide.com` → Cloudflare edge → static files from last GitHub build.

## 4. GitHub Actions (alternative)

`.github/workflows/deploy.yml` deploys via Wrangler on push to `main`. Use **either**:

- **Cloudflare Git integration** (simpler — recommended), or
- **GitHub Actions + Wrangler** (more control)

Do not enable both on the same branch unless you intend duplicate deploys.

Secrets for Actions only:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Environment

No app secrets required for v1 (client-side tools only).

## Pre-deploy checklist

```bash
npm test
npm run build          # uses committed data (--if-needed)
npm run preview        # smoke-test at http://localhost:4321
```

Refresh CMS data (quarterly or when CMS publishes updates):

```bash
npm run data:fetch     # download CMS source zips (needs network)
npm run build:fresh    # full regenerate + build
```

### Commit generated data

Include `public/data/*` and `src/data/generated/supported-cpt-codes.ts` in git so Cloudflare
builds finish in ~30s instead of re-parsing 1.7M NCCI pairs every deploy.

| Cloudflare build command | When |
|--------------------------|------|
| `npm run build` | Normal deploys (data committed) |
| `npm run build:fresh` | After `data:fetch` / CMS update |

Set environment variable `NODE_VERSION=22` if the build image needs it.

## Cache headers

`public/_headers` sets long cache for `/data/*` JSON bundles on Cloudflare.

## Preview locally

```bash
npm run build && npm run preview
```
