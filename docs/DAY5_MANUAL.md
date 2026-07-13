# Day 5 — Contact email + AdSense (manual)

**Date:** 2026-07-13  
**Why manual:** Cloudflare Email Routing and Google AdSense require your account login. Agent prepares the site; you click through the panels.

**Site ready:** 200 CPT · 244 pages · trust pages live · `/contact/` shows `contact@patientbillguide.com`

---

## A. contact@patientbillguide.com (Cloudflare Email Routing) — ~10 min

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → domain **patientbillguide.com**
2. **Email** → **Email Routing** → enable if prompted
3. **Destination addresses** → Add your personal inbox (Gmail etc.) → verify the link Cloudflare emails you
4. **Routing rules** → Create address:
   - **Custom address:** `contact`
   - **Action:** Send to → your verified destination
5. Save. DNS MX records for Email Routing are usually auto-added by Cloudflare — leave them unless Cloudflare shows a warning
6. Test: from another account, email `contact@patientbillguide.com` → should arrive in your inbox

**Done when:** you receive a test message at your personal inbox.

---

## B. AdSense application — ~15 min

**Do not add ad code yet** — only apply. Tags go in after approval (DECISIONS / PHASES).

### Pre-flight (already OK on site)

| Check | URL / note |
|-------|------------|
| HTTPS + custom domain | patientbillguide.com |
| Contact | `/contact/` + working mailbox (finish A first) |
| Privacy | `/privacy/` mentions AdSense intent |
| About / methodology | `/about/`, `/methodology/` |
| Original content + tools | 7 tools, 200 CPT guides |
| No thin doorway farm | see GOOGLE_QUALITY |

### Apply

1. Go to [Google AdSense](https://www.google.com/adsense/) → Sign in with the Google account you want as publisher
2. Add site: `https://patientbillguide.com`
3. Complete account / payment / tax info as prompted
4. Submit for review
5. Wait — approval often takes days to weeks for YMYL/health-adjacent sites

**After approval (not today):** add `ads.txt`, place ads below tool results and mid-learn only — never on privacy/disclaimer.

---

## C. Optional GSC glance (2 min)

Search Console → **Performance** — empty or near-empty is normal this early.  
Sitemaps: live has **243** URLs; GSC “discovered” may lag (was 173 on Jul 8).

---

## Report back to agent

Reply with one line each:

```
Email: works / not yet
AdSense: submitted / pending account / blocked
```

Then agent updates STATUS.md + ISSUES.md.
