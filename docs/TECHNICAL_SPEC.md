# Technical Specification

Engine, data pipeline, and client-side architecture. **Implement in Phase 3+** — document now for continuity.

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare CDN                        │
│  mpfs-2026.json.gz · ncci-2026Q1.json.gz · zip-loc.gz  │
└──────────────────────────┬──────────────────────────────┘
                           │ fetch on demand
┌──────────────────────────▼──────────────────────────────┐
│                   Browser (BillTox)                      │
│  ┌─────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Parser  │→ │ Line Items   │→ │ Findings Engine  │  │
│  └─────────┘  └──────────────┘  └────────┬─────────┘  │
│                                           ↓             │
│                              ┌──────────────────────┐  │
│                              │ Report + Letter PDF  │  │
│                              └──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         No PHI sent to BillTox servers
```

---

## Data bundles

### Directory structure (CDN)

```
/data/
├── manifest.json              # versions, checksums, URLs
├── mpfs-2026.json.gz
├── ncci-2026Q1.json.gz
├── zip-to-locality.json.gz
├── gpci-localities.json.gz
└── cpt-summaries.json.gz      # our plain-English short titles
```

### manifest.json

```json
{
  "mpfs": { "version": "2026", "url": "/data/mpfs-2026.json.gz", "sha256": "..." },
  "ncci": { "version": "2026Q1", "url": "/data/ncci-2026Q1.json.gz", "sha256": "..." },
  "zipLocality": { "version": "2026", "url": "/data/zip-to-locality.json.gz" },
  "updatedAt": "2026-03-15"
}
```

### MPFS record shape

```json
{
  "99214": {
    "description_short": "Office visit, established, moderate",
    "rvu": { "work": 1.5, "pe": 1.1, "mp": 0.1 },
    "localities": {
      "0111205": { "allowed": 128.47, "facility": 95.22 }
    }
  }
}
```

### NCCI edit shape

```json
{
  "column1": "99213",
  "column2": "36415",
  "modifier": 0,
  "effective": "2026-01-01",
  "rationale": "bundled"
}
```

### ZIP → locality

```json
{
  "10001": "0111205",
  "90210": "0118209
}
```

---

## Data pipeline (build script)

**Location (planned):** `scripts/build-data/`

### Steps

1. Download CMS MPFS release (annual)
2. Download NCCI PTP edits (quarterly)
3. Download ZIP-locality crosswalk
4. Transform to optimized JSON
5. Gzip + compute SHA256
6. Upload to CDN / `public/data/`
7. Update `manifest.json` + methodology page dates

### Update cadence

| Dataset | Frequency | Action |
|---------|-----------|--------|
| MPFS | Annual (+ mid-year corrections) | Rebuild + deploy |
| NCCI | Quarterly | Rebuild + deploy |
| ZIP-locality | Annual | Rebuild + deploy |
| CPT summaries | As needed | Content PR |

---

## Client data loading strategy

**Problem:** Full dataset ~15–25 MB gzip.

**Solution:**

1. On first visit: fetch `manifest.json` only (~1 KB)
2. On ZIP entry: fetch `zip-to-locality.json.gz` if not cached
3. Fetch MPFS slice OR full MPFS cached in Service Worker
4. Fetch NCCI only when Bill Auditor runs (lazy)
5. `Cache-Control: immutable` on versioned filenames

---

## Parser module

**Location (planned):** `src/lib/parser/`

### Input modes (by phase)

| Mode | Phase | Method |
|------|-------|--------|
| Manual table entry | 4 | Structured form |
| Paste text | 4 | Regex + heuristics |
| PDF upload | 5 | pdf.js text extract |
| Photo OCR | 5+ | Tesseract WASM (evaluate) |

### Line item normalized shape

```typescript
interface LineItem {
  code: string;           // "99214" or "G0105"
  codeType: 'CPT' | 'HCPCS';
  description?: string;   // from user bill if present
  charged: number;
  units: number;
  date?: string;          // ISO date if parseable
  modifiers: string[];    // ["25", "59"]
}
```

### Parsing heuristics

- CPT: `\b([0-9]{5})\b` with context validation
- HCPCS: `\b([A-V][0-9]{4})\b`
- Currency: `\$[\d,]+\.?\d*`
- Modifiers: `-(\d{2})\b` or `modifier[:\s]+(\d{2})`

---

## Findings engine

**Location (planned):** `src/lib/findings/`

### Check modules

| Module | File | Output types |
|--------|------|--------------|
| `duplicate-check.js` | Same code + date + similar amount | `DUPLICATE_CHARGE` |
| `ncci-check.js` | Column1/Column2 pairs on same date | `NCCI_BUNDLE` |
| `price-check.js` | Charged vs MPFS allowed | `PRICE_ABOVE_BENCHMARK` |
| `modifier-check.js` | Basic modifier rules | `MODIFIER_REVIEW` |

### Finding output

```typescript
interface Finding {
  type: string;
  severity: 'high' | 'medium' | 'low' | 'info';
  codes: string[];
  charged?: number;
  benchmark?: number;
  benchmarkSource: string;
  explanation: string;
  confidence: 'high' | 'medium' | 'low';
  actionHint: string;
}
```

### Report summary

```typescript
interface AuditReport {
  lineItems: LineItem[];
  findings: Finding[];
  summary: {
    totalCharged: number;
    totalMedicareEstimate: number;
    flagCount: number;
    overallStatus: 'flags_found' | 'looks_normal' | 'incomplete';
  };
  generatedAt: string;
  dataVersions: { mpfs: string; ncci: string };
}
```

### Price benchmark logic

```
medicareAllowed = MPFS[code].localities[userLocality].allowed
negotiatedRangeLow  = medicareAllowed * 1.5
negotiatedRangeHigh = medicareAllowed * 2.5

if charged > negotiatedRangeHigh * 1.5:
  severity = high
elif charged > negotiatedRangeHigh:
  severity = medium
elif charged > medicareAllowed:
  severity = low (info for insured users)
```

Document exact multipliers in `/methodology/price-benchmarks/`.

---

## Fair Price tool (Phase 3 — first ship)

**Input:** CPT/HCPCS code + 5-digit ZIP  
**Output:**

- Medicare allowed amount for locality
- Negotiated range (documented heuristic)
- National median fallback if ZIP not found
- Link to full CPT encyclopedia page

---

## EOB Analyzer (Phase 4)

### Parse targets

- Service date, procedure code, billed amount
- Allowed amount, plan paid, patient responsibility
- Denial/adjustment reason codes (CARC/RARC basics)

### EOB-specific findings

- Patient responsibility math doesn't add up
- Denied item still charged on hospital bill (link to learn content)
- Out-of-network surprise indicators (basic, state-agnostic v1)

---

## Dispute Letter Builder (Phase 4)

- Template variables: patient name, provider, dates, findings list
- Output: PDF via browser print or jsPDF
- Templates: hospital billing dispute, insurance appeal (basic)
- **Required UI:** "Review and edit before sending" + disclaimer checkbox

---

## Testing strategy

**Framework:** Vitest

| Test file | Covers |
|-----------|--------|
| `parser.test.js` | CPT/HCPCS extraction from sample bills |
| `duplicate-check.test.js` | Duplicate detection |
| `ncci-check.test.js` | Known NCCI pairs |
| `price-check.test.js` | Benchmark comparison |
| `findings.integration.test.js` | End-to-end sample bills |

### Fixture bills

Store anonymized sample bills in `tests/fixtures/`:

- `er-visit-simple.txt`
- `duplicate-charge.txt`
- `unbundling-pair.txt`
- `normal-bill.txt` (should return `looks_normal`)

---

## Security & privacy

- No server-side bill storage
- No analytics on bill content (only page views)
- CSP headers on Cloudflare
- Subresource Integrity on CDN data files (optional)
- Privacy policy must match implementation exactly

---

## Performance targets

| Metric | Target |
|--------|--------|
| Static page TTFB | < 200ms |
| Tool interactive | < 3s after data cache warm |
| Initial data fetch (cold) | < 5s on 4G |
| Lighthouse Performance | 90+ |

---

## Planned repo paths (when coding starts)

```
src/
├── lib/
│   ├── parser/
│   ├── findings/
│   ├── pricing/
│   └── letter/
├── components/
│   ├── tools/
│   └── ...
└── pages/          # Astro routes

scripts/
└── build-data/
    ├── fetch-cms.js
    ├── build-mpfs.js
    └── build-ncci.js

tests/
├── fixtures/
└── *.test.js
```
