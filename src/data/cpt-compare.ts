import type { CptFaq } from './cpt-codes';

export interface CompareRow {
  aspect: string;
  codeA: string;
  codeB: string;
}

export interface CptComparePage {
  slug: string;
  codeA: string;
  codeB: string;
  labelA: string;
  labelB: string;
  title: string;
  metaDescription: string;
  summary: string;
  categorySlug: string;
  intro: string[];
  comparisonRows: CompareRow[];
  keyDifferences: string[];
  whenCodeA: string[];
  whenCodeB: string[];
  costContext: string[];
  billingNotes: string[];
  whatToDo: string[];
  faq: CptFaq[];
  relatedCompares: { slug: string; label: string }[];
}

export const cptComparePages: Record<string, CptComparePage> = {
  '99213-vs-99214': {
    slug: '99213-vs-99214',
    codeA: '99213',
    codeB: '99214',
    labelA: 'Established patient — low complexity',
    labelB: 'Established patient — moderate complexity',
    title: 'CPT 99213 vs 99214 — Office Visit Codes Compared',
    metaDescription:
      'Compare CPT 99213 vs 99214: complexity, Medicare costs, when each applies, and how to review a doctor bill without assuming fraud.',
    summary:
      '99213 and 99214 are the two most common established-patient office visit codes. The difference is documented medical decision-making complexity — not simply how long you waited or how many questions you asked.',
    categorySlug: 'office-visits',
    intro: [
      'If your doctor bill lists CPT 99213 or 99214, you are looking at an evaluation and management (E/M) visit for a patient who already has a relationship with that provider. Neither code is a procedure — they describe the clinician\'s work in evaluating you, making decisions, and documenting the encounter.',
      'Patients often wonder whether 99214 is appropriate when the visit felt routine. That is a fair question. CMS and commercial payers use detailed documentation rules: number of problems addressed, amount of data reviewed, and risk level. A short visit can still support 99214 when moderate complexity is documented; a longer visit may correctly bill 99213 if decision-making was straightforward.',
      '99214 typically pays more on the Medicare Physician Fee Schedule than 99213 — often roughly $40–$50 more nationally before patient cost-sharing. That gap is why both codes appear frequently on appeals and patient questions. Understanding the distinction helps you compare your charge to benchmarks and ask informed questions — not to accuse your provider of wrongdoing.',
    ],
    comparisonRows: [
      {
        aspect: 'Patient status',
        codeA: 'Established patient (seen within past 3 years by same provider/group)',
        codeB: 'Established patient (same definition)',
      },
      {
        aspect: 'Decision-making level',
        codeA: 'Low complexity — stable problems, limited data, low risk',
        codeB: 'Moderate complexity — multiple issues, outside data reviewed, moderate risk',
      },
      {
        aspect: 'Typical Medicare anchor (national)',
        codeA: 'Often ~$95–$110 non-facility',
        codeB: 'Often ~$135–$155 non-facility',
      },
      {
        aspect: 'Common clinical examples',
        codeA: 'Stable diabetes follow-up, minor URI, routine lab review',
        codeB: 'Worsening symptoms, medication change with risk, multiple chronic conditions',
      },
      {
        aspect: 'Relative to other E/M codes',
        codeA: 'Above 99212 (straightforward), below 99214',
        codeB: 'Above 99213, below 99215 (high complexity)',
      },
    ],
    keyDifferences: [
      'Documentation burden: 99214 requires more elements in history, exam, and medical decision-making than 99213 under current E/M guidelines.',
      'Payment: Medicare and most insurers reimburse 99214 at a higher rate because the code represents more cognitive work — not because the visit was automatically longer.',
      'Frequency: 99213 is still the most common outpatient E/M code nationally, but 99214 is very common in primary care and specialty follow-up where multiple problems are managed.',
      'Patient experience mismatch: Feeling that a visit was "quick" does not by itself prove the wrong code — complexity can be high even in a focused encounter (e.g., adjusting warfarin after reviewing INR).',
    ],
    whenCodeA: [
      'One or two stable chronic conditions reviewed without major treatment changes.',
      'Minor acute complaint with straightforward plan (e.g., simple rash, mild pharyngitis).',
      'Lab results reviewed with no significant change in management.',
      'Medication refill with limited assessment when problems are stable.',
    ],
    whenCodeB: [
      'Multiple problems addressed in one visit (e.g., diabetes + hypertension + new symptom).',
      'Review of outside records, imaging, or labs that influences the plan.',
      'Prescription drug management with moderate risk (dose changes, new medication with side-effect counseling).',
      'Condition not stable or improving — requires more evaluation and decision-making.',
    ],
    costContext: [
      'Medicare allowed amounts vary by ZIP code. Use our Fair Price Calculator with your locality to see anchors for 99213 and 99214 side by side.',
      'Hospital-owned clinic visits may add facility fees on top of the physician E/M line — the CPT code alone does not predict your total bill.',
      'Self-pay patients sometimes see chargemaster rates several times Medicare for either code. Our educational fair range uses 1.5×–2.5× Medicare as a comparison zone, not a legal maximum.',
      'If insured, compare allowed amount on your EOB to the provider bill — your plan\'s contracted rate may differ from Medicare.',
    ],
    billingNotes: [
      'Upcoding concern: Patients sometimes ask if they were billed 99214 when 99213 would fit. You can request a copy of visit documentation or ask the billing office which elements supported the level — this is a clarification request, not a fraud allegation.',
      'Downcoding is also possible: A complex visit documented at 99213 may under-represent work (usually a payer/provider issue, not patient overpayment).',
      'Duplicate E/M same day: Two visit codes on one date without modifier justification may warrant a line-by-line review.',
      'Telehealth: Same codes may apply with telehealth modifiers; place of service affects payment.',
    ],
    whatToDo: [
      'Request an itemized bill and match the CPT line to your after-visit summary or patient portal note.',
      'Run both codes with your ZIP in the Fair Price Calculator to see Medicare benchmarks.',
      'If the level seems unclear, ask: "Which problems and data points supported moderate complexity?" — specific questions get better answers than generic disputes.',
      'If insured, compare to your EOB allowed amount and patient responsibility math.',
      'For self-pay, ask about prompt-pay or financial assistance before paying chargemaster rates in full.',
    ],
    faq: [
      {
        question: 'Is 99214 always more expensive than 99213?',
        answer:
          'On the Medicare fee schedule and most insurer contracts, 99214 pays more than 99213. Your actual patient balance depends on deductible, coinsurance, network status, and facility fees — not the code gap alone.',
      },
      {
        question: 'Can my doctor bill 99214 for a 10-minute visit?',
        answer:
          'Time alone does not determine the code. CMS allows time-based billing in some cases, but level selection is usually based on medical decision-making complexity. A brief visit can support 99214 if documentation meets moderate complexity rules.',
      },
      {
        question: 'Should I dispute if I received 99214 but expected 99213?',
        answer:
          'Start with clarification: request itemization and ask which documentation elements supported 99214. If you still disagree, you may appeal through your insurer or request a coding review. Our tools help compare prices; they do not provide legal advice.',
      },
      {
        question: 'Do 99213 and 99214 include lab or imaging charges?',
        answer:
          'No. E/M codes cover the visit evaluation. Labs, imaging, and procedures bill on separate CPT lines the same day.',
      },
      {
        question: 'Where can I learn more about each code individually?',
        answer:
          'See our full guides for CPT 99213 and CPT 99214, each with Medicare benchmarks, FAQs, and an embedded price check for your ZIP.',
      },
    ],
    relatedCompares: [
      { slug: '99214-vs-99215', label: '99214 vs 99215' },
      { slug: '99202-vs-99203', label: '99202 vs 99203 (new patient)' },
    ],
  },

  '99214-vs-99215': {
    slug: '99214-vs-99215',
    codeA: '99214',
    codeB: '99215',
    labelA: 'Established patient — moderate complexity',
    labelB: 'Established patient — high complexity',
    title: 'CPT 99214 vs 99215 — High Complexity Office Visits',
    metaDescription:
      'CPT 99214 vs 99215: when high-complexity visits are billed, Medicare rates, and how to review your bill with context.',
    summary:
      '99215 is the highest routine outpatient E/M level for established patients. It is less common than 99214 but appears on specialist and complex primary-care bills where documentation supports high medical decision-making risk.',
    categorySlug: 'office-visits',
    intro: [
      'CPT 99214 and 99215 both describe office or outpatient visits for established patients. The step from 99214 to 99215 is significant: 99215 requires high complexity medical decision-making — typically severe exacerbation, high-risk treatment decisions, or extensive data review with high-risk differential diagnosis.',
      'Because 99215 pays materially more than 99214 on Medicare\'s fee schedule (often $50–$70+ nationally), patients notice when it appears on a bill — especially after what felt like a standard specialist follow-up. The code alone does not tell the whole clinical story; documentation rules are detailed.',
      'Our goal is billing literacy: understand what each level means, compare charges to public Medicare anchors, and know how to ask your billing office or insurer for explanation. We do not label higher codes as fraud without evidence.',
    ],
    comparisonRows: [
      {
        aspect: 'Complexity level',
        codeA: 'Moderate medical decision-making',
        codeB: 'High medical decision-making',
      },
      {
        aspect: 'Typical Medicare anchor (national)',
        codeA: 'Often ~$135–$155',
        codeB: 'Often ~$185–$210',
      },
      {
        aspect: 'How often seen',
        codeA: 'Very common — among top billed E/M codes',
        codeB: 'Less common — complex cases, oncology, cardiology, severe exacerbations',
      },
      {
        aspect: 'Risk examples',
        codeA: 'Moderate risk prescription management, multiple stable-chronic issues',
        codeB: 'High-risk drug therapy, decision about hospitalization, severe symptom escalation',
      },
      {
        aspect: 'Next lower / higher codes',
        codeA: 'Below: 99213 · Above: 99215',
        codeB: 'Below: 99214 · Critical care uses different codes (99291+)',
      },
    ],
    keyDifferences: [
      '99215 requires the highest level of outpatient E/M decision-making short of prolonged services or critical care codes.',
      'Specialists managing complex disease (e.g., active cancer treatment decisions, heart failure decompensation) may appropriately bill 99215 when documentation supports high complexity.',
      'A 99215 on a bill is worth verifying against your visit summary — but high complexity can occur in a focused visit when risk is genuinely high.',
      'Payers sometimes audit 99215 more frequently than 99214 because of payment differential — patient appeals may need clinical documentation from the provider.',
    ],
    whenCodeA: [
      'Multiple problems with moderate risk management changes.',
      'Review of external labs or imaging influencing treatment.',
      'Stable specialty follow-up that still requires moderate decision-making.',
    ],
    whenCodeB: [
      'Severe worsening of a chronic condition requiring high-risk treatment plan.',
      'Extensive review of records plus high-risk differential (e.g., ruling out serious causes of new symptoms).',
      'Drug therapy requiring intensive monitoring for toxicity or interaction risk documented in the note.',
    ],
    costContext: [
      'The Medicare gap between 99214 and 99215 is larger than between 99213 and 99214 — uninsured patients may see proportionally larger chargemaster spreads.',
      'Facility fees at hospital outpatient departments can dwarf the E/M differential — always review the full itemized bill.',
      'Use Fair Price with your ZIP for localized allowed amounts for both codes.',
    ],
    billingNotes: [
      '99215 without supporting documentation in the medical record is a payer audit topic — patients can request coding clarification.',
      'Do not assume 99215 is wrong solely because the visit felt short; risk-based complexity drives the level.',
      'Same-day procedures plus 99215 may be appropriate with modifier rules — duplicate E/M without justification is a separate review pattern.',
    ],
    whatToDo: [
      'Compare your itemized bill and EOB to the visit date and provider.',
      'Check Medicare benchmarks for 99214 and 99215 in your ZIP.',
      'Ask the billing office which high-complexity elements were documented if the level surprises you.',
      'If insured, use your plan\'s appeal process with the provider\'s clinical note if available.',
    ],
    faq: [
      {
        question: 'How much more does 99215 pay than 99214?',
        answer:
          'Medicare often pays roughly $50–$70 more for 99215 than 99214 nationally, before locality adjustment. Commercial allowed amounts vary by contract.',
      },
      {
        question: 'Is 99215 only for specialists?',
        answer:
          'No. Primary care can bill 99215 when documentation supports high complexity. It is more common in specialty settings managing severe disease.',
      },
      {
        question: 'Can I ask my doctor why 99215 was billed?',
        answer:
          'Yes. Request a billing or coding explanation tied to your visit documentation. That is a standard patient question.',
      },
      {
        question: 'Does 99215 mean I was hospitalized?',
        answer:
          'No. It is still an outpatient office visit code. Inpatient services use different E/M and facility code families.',
      },
    ],
    relatedCompares: [
      { slug: '99213-vs-99214', label: '99213 vs 99214' },
      { slug: '99202-vs-99203', label: '99202 vs 99203' },
    ],
  },

  '99283-vs-99284': {
    slug: '99283-vs-99284',
    codeA: '99283',
    codeB: '99284',
    labelA: 'ER visit — moderate severity',
    labelB: 'ER visit — high severity',
    title: 'CPT 99283 vs 99284 — Emergency Room Visit Levels Compared',
    metaDescription:
      'ER billing codes 99283 vs 99284: acuity levels, typical Medicare physician fees, facility fee context, and how to read your emergency department bill.',
    summary:
      '99283 and 99284 are emergency department E/M codes on the five-level scale (99281–99285). The number reflects documented acuity and complexity — not waiting-room time or whether you were admitted.',
    categorySlug: 'emergency-room',
    intro: [
      'Emergency department bills confuse patients more than almost any other setting. You will often see an E/M code such as 99283 or 99284 on the physician or advanced practice provider bill, plus a separate hospital facility fee that may be thousands of dollars. The E/M code describes the clinician\'s evaluation and management work — not the entire ED visit cost.',
      '99283 represents moderate severity and moderate complexity medical decision-making. 99284 is one level higher — high severity and high complexity. The step up reflects more extensive workup, higher risk decisions, and more complicated presenting problems documented in the chart.',
      'ED level codes are a frequent source of patient questions after insurance processes the claim. Understanding 99283 vs 99284 helps you interpret your EOB and ask targeted questions about facility vs professional charges — especially for high-deductible plans.',
    ],
    comparisonRows: [
      {
        aspect: 'ED level (5-tier scale)',
        codeA: 'Level 3 — moderate',
        codeB: 'Level 4 — high',
      },
      {
        aspect: 'Typical physician Medicare anchor',
        codeA: 'Often ~$130–$160',
        codeB: 'Often ~$230–$270',
      },
      {
        aspect: 'Clinical picture (examples)',
        codeA: 'Moderate problem needing workup — e.g., uncomplicated fracture workup, moderate asthma flare',
        codeB: 'Serious problem — advanced imaging, multiple labs, IV meds, admission considered',
      },
      {
        aspect: 'Facility fee relationship',
        codeA: 'Facility level often correlates but bills separately — can be much larger than physician line',
        codeB: 'Higher facility charges common — trauma, CT, observation',
      },
      {
        aspect: 'Adjacent codes',
        codeA: 'Below: 99282 · Above: 99284',
        codeB: 'Below: 99283 · Above: 99285 (highest)',
      },
    ],
    keyDifferences: [
      '99284 typically involves more diagnostic intensity documented in the chart — not just perceived urgency while waiting.',
      'The payment gap between 99283 and 99284 is larger than many office visit steps — both insurer and patient cost-sharing may reflect that.',
      'Out-of-network emergency physicians at in-network hospitals can produce surprise bills — the E/M level is only one line on a complex claim.',
      '99285 is reserved for highest acuity; 99284 is often seen on serious but non-catastrophic presentations.',
    ],
    whenCodeA: [
      'Single moderate complaint with limited workup and stable disposition home.',
      'Problems requiring evaluation and treatment but without high-risk differential documented at high complexity.',
      'Lower-tier ED visits that still exceed straightforward (99282) complexity.',
    ],
    whenCodeB: [
      'Significant workup — CT, multiple labs, IV medications, consultant involvement.',
      'High-risk decision-making about admission vs discharge documented.',
      'Presenting problems with high severity (chest pain protocol, significant trauma evaluation, etc.) when documentation supports level 4.',
    ],
    costContext: [
      'Physician 99284 Medicare anchor is often under $300 — total ED patient responsibility is frequently driven by facility charges and ancillary CPT lines.',
      'Uninsured ED visits can produce five-figure chargemaster totals; E/M level is a fraction of the bill.',
      'Compare each line on the itemized bill: E/M, facility, imaging, labs, supplies.',
    ],
    billingNotes: [
      'Facility level and physician E/M level may not match numerically — they bill on different code sets.',
      'Duplicate ED E/M same date from two provider groups is unusual but worth checking.',
      'Observation status and admission change billing dramatically — date of service review matters.',
    ],
    whatToDo: [
      'Request separate itemized bills for facility and professional services.',
      'Match each CPT line to your clinical summary and discharge instructions.',
      'Run 99283 or 99284 with your ZIP in Fair Price for physician fee anchors.',
      'For surprise out-of-network ED physician bills, review No Surprises Act protections for applicable situations.',
      'Ask hospital financial assistance before paying full chargemaster balances.',
    ],
    faq: [
      {
        question: 'Does a higher ER code mean my condition was life-threatening?',
        answer:
          'Not necessarily. 99284 indicates high severity/complexity in documentation — serious but not the same as 99285 (highest) or critical care codes. Clinical context matters.',
      },
      {
        question: 'Why is my ER bill huge if 99284 is only ~$250 on Medicare?',
        answer:
          'Medicare physician fee is one component. Hospital facility fees, imaging, labs, and supplies usually dominate the total.',
      },
      {
        question: 'Can the ER downgrade my code after insurance review?',
        answer:
          'Insurers may request documentation and adjust payment to the provider. Your patient responsibility may change on a revised EOB — review updates.',
      },
      {
        question: '99283 vs 99284 — which is more common?',
        answer:
          'Distribution varies by hospital acuity mix. Urban trauma centers see more high-level codes; urgent lower-acuity volumes may cluster at 99282–99283.',
      },
    ],
    relatedCompares: [
      { slug: '99213-vs-99214', label: '99213 vs 99214 (office)' },
    ],
  },

  '99202-vs-99203': {
    slug: '99202-vs-99203',
    codeA: '99202',
    codeB: '99203',
    labelA: 'New patient — straightforward',
    labelB: 'New patient — low complexity',
    title: 'CPT 99202 vs 99203 — New Patient Office Visit Codes',
    metaDescription:
      'New patient visit codes 99202 vs 99203: who counts as a new patient, Medicare cost difference, and how to verify your first appointment bill.',
    summary:
      '99202 and 99203 are new-patient office E/M codes. "New patient" has a specific billing definition — no face-to-face professional services from that physician or same-specialty group in the past three years.',
    categorySlug: 'office-visits',
    intro: [
      'Your first visit with a primary care doctor or specialist may bill as a new-patient E/M code. CPT 99202 is the straightforward level; 99203 adds low-complexity medical decision-making. Both are common entry points on the new-patient scale that continues through 99205 for high complexity.',
      'Patients switching insurers or clinics sometimes think they are "new" when billing rules still classify them as established with the same tax ID group. Conversely, true new patients may see 99203 when the intake felt simple — low complexity can still require history, exam, and a treatment plan for a focused problem.',
      'Medicare pays 99203 more than 99202 nationally — often roughly $40–$50 more before locality adjustment. That difference matters for deductibles and for self-pay comparison to benchmarks.',
    ],
    comparisonRows: [
      {
        aspect: 'Patient status',
        codeA: 'New patient per CMS definition',
        codeB: 'New patient per CMS definition',
      },
      {
        aspect: 'Decision-making',
        codeA: 'Straightforward',
        codeB: 'Low complexity',
      },
      {
        aspect: 'Typical Medicare anchor',
        codeA: 'Often ~$65–$80',
        codeB: 'Often ~$110–$125',
      },
      {
        aspect: 'Typical scenarios',
        codeA: 'Single minor issue, brief history and exam',
        codeB: 'One or more problems needing low-complexity plan — new chronic issue intake',
      },
      {
        aspect: 'Higher new-patient codes',
        codeA: 'Above: none lower for new office · Below 99203',
        codeB: 'Above: 99204 (moderate), 99205 (high)',
      },
    ],
    keyDifferences: [
      '99203 requires more documented decision-making than 99202 — not just a longer intake form.',
      'Specialists often bill 99203 or higher on first visits because initial consultations involve more data and planning.',
      'Established-patient codes (99212–99215) should not appear on a true new-patient visit — wrong status is a billing review topic.',
      'Telehealth new-patient visits use the same code family with appropriate modifiers and place of service.',
    ],
    whenCodeA: [
      'Brief new-patient encounter for a simple, self-limited problem.',
      'Minimal risk and straightforward plan — e.g., single minor complaint.',
    ],
    whenCodeB: [
      'New patient intake for a problem requiring diagnosis and treatment plan beyond straightforward level.',
      'Multiple minor issues or one problem needing prescription management with low risk.',
      'Initial visit establishing care for a chronic condition at low complexity.',
    ],
    costContext: [
      'First visits sometimes bundle preventive screening discussions — ensure preventive codes (99381–99397) are not confused with problem-oriented 99202/99203.',
      'Hospital-employed physician groups may add facility fees even for office new-patient visits.',
      'Compare both codes in Fair Price with your ZIP before paying self-pay rates.',
    ],
    billingNotes: [
      'Verify "new" status if you have seen the same specialty group within three years.',
      '99204/99205 on a simple intake may warrant clarification — same process as established-patient level questions.',
      'Duplicate new-patient same day from two providers — check if both were medically necessary.',
    ],
    whatToDo: [
      'Confirm new vs established on the bill against your visit history with that group.',
      'Request itemization and after-visit summary.',
      'Benchmark 99202 or 99203 with your ZIP.',
      'Ask about self-pay discounts for first visits if uninsured.',
    ],
    faq: [
      {
        question: 'What makes me a "new patient" for 99202 or 99203?',
        answer:
          'Generally: no face-to-face professional E/M services from that doctor or same-specialty group practice in the past three years. Insurance cards changing does not automatically reset status.',
      },
      {
        question: 'Is 99203 normal for a first primary care visit?',
        answer:
          'Yes. Intake visits often support 99203 or 99204 because of history, exam, and planning — even when you feel the appointment was routine.',
      },
      {
        question: 'Can I be billed 99213 as a new patient?',
        answer:
          '99213 is an established-patient code. If you were truly new, the provider should use 99202–99205 series. Ask for coding clarification if statuses conflict.',
      },
    ],
    relatedCompares: [
      { slug: '99213-vs-99214', label: '99213 vs 99214 (established)' },
    ],
  },

  '45378-vs-45380': {
    slug: '45378-vs-45380',
    codeA: '45378',
    codeB: '45380',
    labelA: 'Colonoscopy — diagnostic',
    labelB: 'Colonoscopy with biopsy',
    title: 'CPT 45378 vs 45380 — Colonoscopy Codes Compared',
    metaDescription:
      'Diagnostic colonoscopy 45378 vs biopsy 45380: procedure difference, typical Medicare costs, screening vs diagnostic billing, and how to read your colonoscopy bill.',
    summary:
      '45378 bills a diagnostic colonoscopy. 45380 adds biopsy during the same session. The distinction affects insurance cost-sharing — especially for screening colonoscopies that become diagnostic or therapeutic.',
    categorySlug: 'surgery',
    intro: [
      'Colonoscopy is one of the most common ambulatory surgery bills Americans receive. CPT 45378 describes colonoscopy with examination of the entire colon — diagnostic. CPT 45380 describes the same scope procedure when one or more biopsies are taken during the session.',
      'Patients with ACA preventive screening benefits may owe $0 for a screening colonoscopy when in-network — but finding a polyp removed or biopsy taken can reclassify the visit as diagnostic or therapeutic for cost-sharing purposes. That policy surprise is separate from whether 45378 vs 45380 is the correct procedure code.',
      'Both codes are physician/procedural charges. Facility fees (hospital outpatient vs ambulatory surgery center), anesthesia, pathology on biopsy specimens, and bowel prep supplies may appear as additional lines on the same date of service.',
    ],
    comparisonRows: [
      {
        aspect: 'Procedure performed',
        codeA: 'Colonoscopy — diagnostic examination',
        codeB: 'Colonoscopy with biopsy (single or multiple specimens)',
      },
      {
        aspect: 'Typical Medicare physician anchor',
        codeA: 'Often ~$700–$750',
        codeB: 'Often ~$780–$850',
      },
      {
        aspect: 'Pathology',
        codeA: 'No biopsy — pathology usually not billed for mucosal sampling',
        codeB: 'Biopsy specimens sent to pathology — additional CPT lines common (88305, etc.)',
      },
      {
        aspect: 'Screening context',
        codeA: 'May map to screening benefits when no therapeutic intervention',
        codeB: 'Biopsy often shifts plan rules from pure screening — check EOB',
      },
      {
        aspect: 'Related codes',
        codeA: '45380 if biopsy added · 45385 if polypectomy',
        codeB: '45378 if no biopsy performed',
      },
    ],
    keyDifferences: [
      '45380 pays more than 45378 on Medicare because additional work and risk of biopsy are documented.',
      'A single session should not bill both 45378 and 45380 — the biopsy code includes the examination.',
      'Polyp removal uses different codes (e.g., 45385) — not 45380 alone.',
      'Screening vs diagnostic intent is documented in the indication — patients should compare order notes, operative report, and EOB.',
    ],
    whenCodeA: [
      'Screening or diagnostic colonoscopy with no biopsy and no polypectomy during the session.',
      'Normal examination or visual findings without tissue sampling.',
    ],
    whenCodeB: [
      'Suspicious mucosa sampled — one or more biopsies during colonoscopy.',
      'Histology needed for diagnosis even if no polyp removal occurred.',
    ],
    costContext: [
      'ASC colonoscopy cash prices often $1,500–$3,500 all-in; hospital outpatient may exceed $5,000–$10,000 before discounts.',
      'Medicare physician fee is one line — facility and anesthesia dominate many patient bills.',
      'Pathology on biopsies adds separate professional and technical components.',
    ],
    billingNotes: [
      'Screening colonoscopy with polyp removal: billing may include snare polypectomy codes plus pathology — not 45378 alone.',
      'Balance billing protections may apply in certain network scenarios — see surprise bill resources.',
      'Duplicate colonoscopy lines same day — verify if technical and professional split vs true duplicate.',
    ],
    whatToDo: [
      'Request operative report and itemized bill with all CPT lines (scope, anesthesia, pathology, facility).',
      'Compare 45378 or 45380 physician fee to Medicare benchmark in your ZIP.',
      'If screening was intended, ask insurer why cost-sharing applied — attach preventive order documentation.',
      'For cash pay, quote ASC vs hospital before scheduling elective colonoscopy.',
    ],
    faq: [
      {
        question: 'If they took a biopsy, will I always see 45380?',
        answer:
          'Generally yes for colonoscopy with biopsy. Polyp removal without biopsy-only sampling may use polypectomy codes instead. The operative report is the source of truth.',
      },
      {
        question: 'Why did my free screening colonoscopy become expensive?',
        answer:
          'Many plans waive cost-sharing for screening but charge for diagnostic or therapeutic interventions (biopsy, polypectomy) found during the procedure. This is plan design — not necessarily a coding error.',
      },
      {
        question: 'Is 45380 more expensive than 45378?',
        answer:
          'Medicare physician fees are somewhat higher for 45380. Total episode cost depends heavily on facility and pathology — not just the scope code difference.',
      },
      {
        question: 'Does 45378 include anesthesia?',
        answer:
          'No. Anesthesia, facility, and pathology bill separately on most colonoscopy claims.',
      },
    ],
    relatedCompares: [
      { slug: '99213-vs-99214', label: '99213 vs 99214' },
    ],
  },
};

export const cptCompareSlugs = Object.keys(cptComparePages);

export function getComparePage(slug: string): CptComparePage | undefined {
  return cptComparePages[slug];
}

/** Compare pages that reference a given CPT code (for internal links). */
export function getComparesForCode(code: string): { slug: string; label: string }[] {
  return cptCompareSlugs
    .map((slug) => cptComparePages[slug])
    .filter((p) => p.codeA === code || p.codeB === code)
    .map((p) => ({ slug: p.slug, label: `CPT ${p.codeA} vs ${p.codeB}` }));
}
