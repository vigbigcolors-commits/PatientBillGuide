# Next session plan — PatientBillGuide

**Saved:** 2026-07-24  
**Continue:** tomorrow (user)

---

## Do not push now

- AdSense — later (user); do not nag in session prompts
- No CPT URL migration / Indexing API / Next.js rewrite (DECISIONS #43–45)
- CPT utility code is **local uncommitted** — deploy when ready (commit + push)

---

## Immediate queue (tomorrow+)

1. **Review / commit + deploy** CPT utility PR (markup %, dispute deep-link, WebApplication schema, medicare-lookup 301)
2. **`contact@patientbillguide.com`** — Cloudflare Email Routing ([DAY5_MANUAL.md](DAY5_MANUAL.md) §A only) — needed before Product Hunt
3. **Product Hunt** — register / ship **Tuesday ~2026-07-31** (one week from 2026-07-24)
   - Lead asset: **Fair Price Calculator** (utility), not “200 CPT pages”
   - Pitch: free, browser-only, Medicare MPFS benchmark, privacy
4. Optional same week: Reddit Fair Price post (honest tone) after PH or instead if PH slips

---

## Monetization discussion — medical center referrals (open)

**Idea:** When traffic exists, send users to partner clinics / networks for a referral fee — not ads-only.

### Verdict (working thesis)

**Direction is valid** and already foreshadowed as soft affiliate month 4+ ([MASTER_PLAN.md](MASTER_PLAN.md), DECISIONS #6).  
**Hospital “we send you patients” CPA is usually weak** for a bill-transparency site. Stronger fits:

| Partner type | Fit | Why |
|--------------|-----|-----|
| Cash-pay / transparent price networks (imaging, labs, ASC) | High | Matches Fair Price intent |
| Patient advocates / bill negotiation services | High | Matches Dispute Letter journey |
| Telehealth / self-pay primary care | Medium | Clear disclosure needed |
| Named hospital systems “book here” | Low early | Trust conflict + hard sales cycle |
| Medicare plan lead gen | Seasonal | Only on `/medicare/` later (locked) |

### Strengthen the idea

1. **Traffic first** → PH/Reddit → then outreach with real visit stats  
2. **Disclose** always (“we may earn a fee”) — YMYL trust  
3. **Never** override “bill looks normal” or push dispute when charge is fair  
4. **Soft placement:** mid-guide / after tool results — not pop-ups (locked: no lead-gen pop-ups first 3 months)  
5. Prefer **networks with existing affiliate** over cold hospital BD  
6. Position as **options for uninsured/self-pay**, not “we recommend this doctor medically”

### Risks (keep honest)

- Independence story breaks if partners look like the only “answer”  
- Medical referral regulations / state rules — legal review before clinic lead forms  
- Early affiliate on thin traffic wastes partner goodwill  

**Decision status:** discuss further after PH; no affiliate UI until traffic + partner shortlist.

---

## Success check next week

- [ ] CPT utility live on production  
- [ ] contact@ receives mail  
- [ ] Product Hunt listing created / launch date set for Tue  
- [ ] GSC: watch **Indexed** trend (not Discovered panic)

---

**Prompt to continue:** `Continue PatientBillGuide from NEXT_SESSION.md`
