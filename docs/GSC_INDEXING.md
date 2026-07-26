# GSC & Indexing Strategy — Tool Sites

**Locked:** 2026-07-10  
**Applies to:** PatientBillGuide and similar **tool-first** sites (not article farms)  
**Read with:** [GROWTH_MASTER.md](GROWTH_MASTER.md), [GOOGLE_QUALITY.md](GOOGLE_QUALITY.md)

---

## Lesson learned (do not repeat)

Manual **Request indexing** for hundreds of URLs is **not** a growth strategy.

| What happened elsewhere | Why it fails |
|-------------------------|--------------|
| 287 URLs submitted one-by-one in GSC | Google may crawl/index, then **drop** thin or low-trust clusters |
| Treating indexing requests as SEO work | Requests ≠ rankings; no substitute for quality + links |
| Article-farm playbook on a tool site | Wrong niche — we win with **utility**, not volume indexing hacks |

**PatientBillGuide rule:** No mass manual URL inspection. No daily indexing checklist.

---

## Professional approach — tool-first site

### What Google should discover naturally

1. **Sitemap** — `sitemap-index.xml` submitted once; keep valid; auto-recrawl on deploy
2. **Internal links** — homepage → tools → CPT/compare/category; every new CPT links to 3+ live pages
3. **Real utility** — Fair Price, Bill Auditor, EOB tools (users stay, share, link)
4. **Quality pages** — 800+ words, MPFS data, author, methodology (Gate D in GOOGLE_QUALITY)
5. **External signals** — Product Hunt, Quora, HN (optional), newsletters, Shorts — **not Reddit** (DECISIONS #47)

### What we do in GSC (monthly, 15 min)

| Action | Frequency |
|--------|-----------|
| Sitemap status = Success | After each major deploy |
| Pages → **Indexed** trend (not per-URL panic) | Monthly |
| Pages → **Crawled – currently not indexed** on CPT cluster | After each batch; pause batch if spike |
| Core Web Vitals / HTTPS | Quarterly |
| Manual inspection | **Only** for debugging a specific bug (404, wrong canonical) |

### What we never do

- Request indexing for every new CPT page
- Submit 50+ URLs/day via URL Inspection
- **Google Indexing API** bulk pushes (same spam risk as mass Inspection)
- Buy links or use indexing services
- Publish batches if prior batch shows mass "not indexed"
- **Rename all CPT URLs** and 301 “to force reindex” — does not bypass crawl delay; resets equity
- Treat **Discovered – currently not indexed** on a new domain as a YMYL penalty requiring a stack rewrite

---

## Launch playbook (not GSC spam)

PatientBillGuide is **7 tools + CPT encyclopedia** — closer to **Product Hunt / Quora utility launch** than a 0-tool article site.

| Channel | Asset to lead with | When |
|---------|-------------------|------|
| **Product Hunt** | Fair Price Calculator — "Check your bill vs Medicare before you pay" | After contact@ live |
| **Quora** | Long answers on CPT / EOB / surprise bills — link once when relevant | Ongoing |
| **TikTok / Shorts** | Bill decode demos | Ongoing |
| ~~Reddit~~ | — | **Out** — DECISIONS #47 |

**Pitch angle:** Free browser tools, no upload, privacy — not "we have 200 SEO pages."

CPT pages support **long-tail organic** over months; launches drive **trust + backlinks + branded search**.

---

## Indexing expectations (realistic)

| Phase | CPT pages | Expectation |
|-------|-----------|-------------|
| Month 1 | 130–200 | Homepage + tools index first; CPT trickles |
| Month 2–3 | 200–350 | More CPT indexed if quality holds |
| Month 6 | 500 | Top codes + compare pages rank; long tail follows |

**Normal:** Many CPT URLs stay "Discovered – not indexed" for weeks.  
**Alarm:** Sudden mass **deindex** after a batch → pause publishes, run GOOGLE_QUALITY audit.

---

## Sitemap hygiene

- Astro `@astrojs/sitemap` — only `launchCptCodes` routes (no thin stubs)
- `/404` excluded automatically
- After deploy: spot-check `https://patientbillguide.com/sitemap-0.xml` count matches build
- Resubmit sitemap in GSC only if **domain or sitemap path changes** — not every deploy

---

## Related decisions

- DECISIONS #29 — domain property (correct)
- GOOGLE_QUALITY Gate D — batch pace 25–50, 10% QA
- GROWTH_MASTER — Product Hunt + Quora + Shorts, not Google-only; **Reddit out** (#47)
