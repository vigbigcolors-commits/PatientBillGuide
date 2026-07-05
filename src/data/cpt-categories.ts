import type { CptFaq } from './cpt-codes';
import { launchCptCodes, allCptPages } from './cpt-codes';

export interface CategoryCodeRef {
  code: string;
  label: string;
  href: string;
}

export interface CptCategoryPage {
  slug: string;
  title: string;
  metaDescription: string;
  summary: string;
  eyebrow: string;
  intro: string[];
  whatPatientsSee: string[];
  costDrivers: string[];
  billingTips: string[];
  faq: CptFaq[];
  featuredCompares: { slug: string; label: string }[];
  /** Match codes from launchCptCodes via categorySlug and optional code patterns */
  matchSlugs: string[];
  codePatterns?: RegExp[];
}

export const cptCategoryPages: Record<string, CptCategoryPage> = {
  'office-visits': {
    slug: 'office-visits',
    eyebrow: 'Evaluation & management',
    title: 'Office Visit CPT Codes (99202–99215) — Cost & Billing Guide',
    metaDescription:
      'Common office visit CPT codes 99202–99215 explained: new vs established patients, complexity levels, Medicare benchmarks, and how to check your doctor bill.',
    summary:
      'Office visit codes (E/M) describe the clinician\'s evaluation and decision-making — not procedures done in the room. They are the most frequently billed CPT family on outpatient bills.',
    intro: [
      'Evaluation and management (E/M) codes appear on bills from primary care, specialists, urgent care, and telehealth when the main service was the visit itself. The five-digit code reflects patient status (new vs established) and documented medical decision-making complexity — not a timer at the reception desk.',
      'New patients use the 99202–99205 series. Established patients use 99211–99215 (99211 is nurse-only in many settings; 99212–99215 are physician visits). Most patient questions involve 99213 vs 99214 — moderate step-ups on established-patient bills.',
      'Medicare publishes allowed amounts for each code by locality. Commercial insurers negotiate their own rates, but Medicare anchors remain the most transparent public benchmark for comparing whether a charge is in a typical zone.',
    ],
    whatPatientsSee: [
      'A single "office visit" line with CPT 99213, 99214, or similar — often $100–$250+ allowed on EOBs before deductible.',
      'Separate facility fees when the visit occurred at a hospital-owned clinic (professional + facility split).',
      'Telehealth visits billed with the same E/M codes plus modifiers — check place of service on the claim.',
      'Preventive wellness codes (99385–99396) on a different date or visit type than problem-oriented 99213/99214.',
    ],
    costDrivers: [
      'Complexity level: 99215 pays more than 99214, which pays more than 99213 on Medicare\'s schedule.',
      'Site of service: hospital outpatient department vs independent physician office affects facility add-ons.',
      'Network status: out-of-network allowed amounts can differ sharply from in-network.',
      'Geography: Medicare locality adjustment changes physician fee; our Fair Price tool uses your ZIP.',
    ],
    billingTips: [
      'Match the CPT code to your after-visit summary — how many problems were addressed?',
      'Use our compare guides for 99213 vs 99214 and 99214 vs 99215 before calling billing.',
      'Ask for clarification, not accusations: "Which documentation supported this level?"',
      'If insured, compare provider bill patient responsibility to EOB math line by line.',
    ],
    faq: [
      {
        question: 'What is the most common office visit code?',
        answer:
          '99213 and 99214 are among the most frequently billed established-patient codes nationally. New-patient first visits often use 99203 or 99204.',
      },
      {
        question: 'Does a longer wait time mean a higher code?',
        answer:
          'No. Wait time is not a billing element. Level selection is based on documented history, exam, and medical decision-making (or time when time-based billing rules apply).',
      },
      {
        question: 'Are office visit codes covered by insurance?',
        answer:
          'Usually when medically necessary and in-network, subject to deductible, copay, and coinsurance. Preventive visits may have separate coverage rules.',
      },
      {
        question: 'Where can I compare two office visit levels?',
        answer:
          'See our 99213 vs 99214 and 99214 vs 99215 compare pages, plus individual CPT guides with Medicare ZIP lookup.',
      },
    ],
    featuredCompares: [
      { slug: '99213-vs-99214', label: '99213 vs 99214' },
      { slug: '99214-vs-99215', label: '99214 vs 99215' },
      { slug: '99202-vs-99203', label: '99202 vs 99203 (new patient)' },
    ],
    matchSlugs: ['office-visits', 'preventive'],
    codePatterns: [/^992(0[2-5]|1[1-5]|4[1-5])$/],
  },

  'emergency-room': {
    slug: 'emergency-room',
    eyebrow: 'Emergency department',
    title: 'Emergency Room Visit CPT Codes (99281–99285) — Billing Explained',
    metaDescription:
      'ER visit codes 99281–99285: five acuity levels, physician vs facility fees, typical Medicare costs, and how to read your emergency department bill.',
    summary:
      'Emergency department E/M codes run from 99281 (lowest acuity) to 99285 (highest). They describe the emergency clinician\'s work — facility fees and imaging usually bill separately and often cost far more.',
    intro: [
      'Emergency department billing splits into at least two worlds: the physician or advanced practice provider E/M code (99281–99285) and the hospital facility charge for using the ER. Patients often fixate on the E/M level while the facility line drives the total — especially at hospital-owned sites.',
      'Higher codes reflect documented acuity and complexity of medical decision-making: more differential diagnosis, more studies, higher risk treatments. A level 4 (99284) or 5 (99285) visit typically involves substantial workup — CT, labs, IV medications, or admission decisions — not merely a long wait.',
      'The No Surprises Act and state laws may limit certain out-of-network balance bills in emergency settings, but patients still need itemized bills to verify lines, dates, and codes.',
    ],
    whatPatientsSee: [
      'Professional fee from emergency physician group — often 99283–99285 on moderate-to-high acuity visits.',
      'Hospital facility fee — frequently the largest line, may not use the same 9928x number.',
      'Ancillary charges: CT (70450+), labs (80053+), ECG (93000), supplies, observation hours.',
      'Separate bills from radiology or pathology if out-of-network at an in-network hospital.',
    ],
    costDrivers: [
      'Acuity level on physician claim — 99285 pays more than 99283 on Medicare.',
      'Facility charge tier — hospital ER facility fees exceed urgent care and freestanding ED in many markets.',
      'Imaging and labs ordered in the ED — same visit, multiple high-cost CPT lines.',
      'Insurance network: OON emergency physicians remain a common surprise bill scenario — know your rights.',
    ],
    billingTips: [
      'Always request itemized facility and professional bills for the same date of service.',
      'Compare 99283 vs 99284 if your E/M level seems high relative to care received — ask for coding explanation.',
      'Use our Surprise Bill Checker for basic OON risk context (educational, not legal advice).',
      'Negotiate self-pay or financial assistance on facility balances before paying chargemaster rates.',
    ],
    faq: [
      {
        question: 'What is the difference between 99283 and 99284?',
        answer:
          '99284 is a higher acuity/complexity level than 99283 on the five-tier ED scale. See our full 99283 vs 99284 compare page for Medicare anchors and examples.',
      },
      {
        question: 'Why is my ER bill thousands of dollars for a short visit?',
        answer:
          'Facility fees, imaging, and labs often exceed the physician E/M fee. The CPT level on the doctor bill does not cap total charges.',
      },
      {
        question: 'Is the ER facility fee a CPT 99284 code?',
        answer:
          'Not necessarily. Hospitals bill facility services on their own chargemaster / revenue codes. Physician 99284 is separate from facility billing.',
      },
    ],
    featuredCompares: [{ slug: '99283-vs-99284', label: '99283 vs 99284' }],
    matchSlugs: ['emergency'],
    codePatterns: [/^9928[1-5]$/],
  },

  imaging: {
    slug: 'imaging',
    eyebrow: 'Radiology & diagnostic imaging',
    title: 'Medical Imaging CPT Codes — MRI, CT, X-Ray & Mammography Costs',
    metaDescription:
      'Common imaging CPT codes: chest X-ray 71046, CT head 70450, MRI spine 72148, screening mammogram 77067. Medicare benchmarks, facility fees, and price check tools.',
    summary:
      'Imaging codes bill for X-ray, CT, MRI, ultrasound, and mammography. The same CPT study can cost dramatically more at a hospital ER than at a freestanding imaging center — site of service matters more than many patients expect.',
    intro: [
      'Radiology CPT codes describe the technical component (scanner time, equipment) and may include or split the professional interpretation (radiologist read) depending on billing arrangement. Patients see imaging on hospital bills, standalone imaging center statements, and professional radiology group invoices.',
      'CMS Medicare Physician Fee Schedule includes many imaging codes; hospital outpatient departments also bill facility fees that can multiply patient responsibility. That is why CPT 71046 (chest X-ray) might show a modest Medicare physician/technical anchor but a $800+ hospital charge.',
      'Screening mammography (77067) has special preventive coverage rules under the ACA when in-network — diagnostic or 3-D add-ons may change patient cost-sharing. Always compare the order indication on your referral to codes on the bill.',
    ],
    whatPatientsSee: [
      'Chest X-ray 71046, 71045 — common ER and outpatient orders.',
      'CT head 70450, CT abdomen 74176–74177 — higher cost studies.',
      'MRI lumbar 72148, MRI brain 70553 — among the priciest outpatient imaging lines.',
      'Screening mammogram 77067, diagnostic mammography 77066 — verify screening vs diagnostic intent.',
      'Ultrasound 76700 (abdomen complete) — professional + technical split or global charge.',
    ],
    costDrivers: [
      'Site of service: hospital outpatient vs imaging center vs physician office.',
      'Contrast vs without contrast — different CPT numbers (e.g., 70450 vs 70460).',
      'Professional component only vs global billing — two bills possible.',
      'Emergency setting surcharges — same CPT, higher facility multiplier.',
    ],
    billingTips: [
      'For elective imaging, ask where your order can be fulfilled — freestanding centers are often cheaper.',
      'Match radiology report procedure description to billed CPT.',
      'Run your code + ZIP through Fair Price before paying self-pay hospital rates.',
      'Screening mammogram large bill? Check network, preventive coding, and facility vs professional split.',
    ],
    faq: [
      {
        question: 'Why does the same MRI code cost $400 at one place and $3,000 at another?',
        answer:
          'The CPT code identifies the study — chargemaster pricing and facility fees differ by site. Hospital outpatient MRI often costs far more than independent imaging centers.',
      },
      {
        question: 'Does imaging include the radiologist fee?',
        answer:
          'Sometimes globally, sometimes separately. You may receive a bill from the hospital (technical) and from the radiology group (professional).',
      },
      {
        question: 'Is screening mammography free?',
        answer:
          'ACA preventive rules often cover screening mammography in-network at $0 — but diagnostic coding, OON sites, or facility fees can still produce balances. Review your EOB.',
      },
    ],
    featuredCompares: [],
    matchSlugs: ['imaging'],
  },

  laboratory: {
    slug: 'laboratory',
    eyebrow: 'Clinical laboratory',
    title: 'Common Lab Test CPT Codes — Panels, Blood Draw & Medicare Costs',
    metaDescription:
      'Frequent lab CPT codes: metabolic panel 80053, CBC 85025, TSH 84443, venipuncture 36415. Compare hospital lab markup vs Medicare clinical lab fee schedule.',
    summary:
      'Laboratory CPT codes cover blood panels, cultures, urinalysis, and the blood draw itself (36415). Hospital lab charges often exceed standalone lab Medicare rates by large multiples.',
    intro: [
      'Clinical laboratory services bill under CPT codes in the 80000–89999 range plus specimen collection (36415 venipuncture is ubiquitous). Panels such as 80053 (comprehensive metabolic panel) and 85025 (CBC with differential) appear on routine physicals, ER visits, and pre-surgery labs.',
      'Medicare pays labs under the Clinical Laboratory Fee Schedule — generally lower than hospital chargemaster rates. Uninsured patients paying hospital cash prices for the same 80053 assay processed on identical equipment may see 5–10× Medicare or more.',
      'Each lab line should correspond to a test on your lab report. Duplicate panels on the same date or unbundled components when a panel code already includes them are worth asking about — pattern review, not fraud claims.',
    ],
    whatPatientsSee: [
      '80053 comprehensive metabolic panel — common annual physical line.',
      '85025 CBC with differential — infection, anemia, pre-op workups.',
      '84443 TSH — thyroid monitoring.',
      '36415 venipuncture — small line that appears alongside every blood draw.',
      '87880 rapid strep, 83036 A1c — point-of-care or lab-based tests.',
    ],
    costDrivers: [
      'Hospital lab vs Quest/Labcorp/independent draw site pricing.',
      'Number of tests ordered — ER panels stack many codes on one encounter.',
      'Out-of-network reference lab when hospital sends specimens externally.',
      'Repeat labs on consecutive days without clinical change.',
    ],
    billingTips: [
      'Ask whether routine labs can be drawn at a standalone lab if hospital pricing is quoted upfront.',
      'Compare 36415 + panel codes to Medicare CLFS anchors in Fair Price.',
      'Match lab report test list to itemized CPT lines.',
      'Insurance EOB "allowed" for lab is often much lower than billed charge — verify patient responsibility math.',
    ],
    faq: [
      {
        question: 'Why is a blood test so expensive at the hospital?',
        answer:
          'Hospital outpatient labs often use chargemaster rates far above Medicare clinical lab fees. The same CPT code at an independent lab is usually cheaper.',
      },
      {
        question: 'What is CPT 36415?',
        answer:
          'Routine venipuncture — drawing blood for lab tests. It bills in addition to the actual test codes.',
      },
      {
        question: 'Can I shop lab prices?',
        answer:
          'For elective orders, yes — ask your doctor if fulfillment at a standalone lab is acceptable. ER and inpatient labs are harder to shop in advance.',
      },
    ],
    featuredCompares: [],
    matchSlugs: ['laboratory'],
  },

  surgery: {
    slug: 'surgery',
    eyebrow: 'Surgery & procedures',
    title: 'Frequently Billed Surgery CPT Codes — Costs & Bill Structure',
    metaDescription:
      'Common surgery CPT codes: colonoscopy 45378, knee replacement 27447, cataract 66984, arthroscopy 29881. Surgeon fees vs facility, anesthesia, and implants explained.',
    summary:
      'Surgery bills bundle surgeon professional fees, facility charges, anesthesia, implants, and post-op services on separate lines. One CPT on the surgeon bill is rarely the total episode cost.',
    intro: [
      'Surgical CPT codes describe the procedure the physician performed — scope, joint replacement, excision, endoscopy, and thousands of specialty operations. Patients often receive the surgeon\'s bill first and discover later that the hospital or ASC, anesthesia group, and device suppliers bill separately.',
      'Medicare physician fee schedule amounts for procedures like 45378 (colonoscopy) or 29881 (knee arthroscopy) provide anchors for the surgeon\'s work only — often hundreds to low thousands of dollars. Facility fees for the same procedure may be multiples higher.',
      'Ambulatory surgery centers (ASCs) frequently offer lower all-in cash packages than hospital outpatient departments for elective procedures — when clinically appropriate and in-network with your plan.',
    ],
    whatPatientsSee: [
      '45378 diagnostic colonoscopy — screening vs biopsy/polypectomy changes codes (45380, 45385).',
      '27447 total knee arthroplasty — high surgeon + facility + implant lines.',
      '66984 cataract with lens — professional + facility + lens supply charges.',
      '29881 knee arthroscopy — sports medicine and orthopedic common code.',
      '47562 laparoscopic cholecystectomy — gallbladder removal.',
    ],
    costDrivers: [
      'Facility setting: hospital outpatient vs ASC.',
      'Anesthesia time and base units — separate provider group bill.',
      'Implants and supplies (HCPCS C-codes, pass-through devices).',
      'Complexity add-ons, multiple procedures same session (modifier rules).',
    ],
    billingTips: [
      'Request a written good-faith estimate for elective surgery — surgeon + facility + anesthesia.',
      'Compare colonoscopy 45378 vs 45380 if biopsy changes your screening cost-sharing.',
      'Review operative report for procedures billed — match each CPT to documented work.',
      'Ask about cash ASC packages when hospital quotes exceed benchmarks substantially.',
    ],
    faq: [
      {
        question: 'Does the surgeon CPT code include the hospital fee?',
        answer:
          'No. Surgeon professional fee, facility fee, anesthesia, and implants typically bill separately.',
      },
      {
        question: '45378 vs 45380 — which is my colonoscopy?',
        answer:
          '45378 is diagnostic without biopsy. 45380 includes biopsy during colonoscopy. See our compare page for screening cost-sharing context.',
      },
      {
        question: 'Why is surgery so much more than the Medicare rate?',
        answer:
          'Medicare surgeon fee is one component. Commercial and chargemaster rates, facility fees, and implants drive most patient balances.',
      },
    ],
    featuredCompares: [{ slug: '45378-vs-45380', label: '45378 vs 45380 (colonoscopy)' }],
    matchSlugs: ['surgery'],
  },
};

export const cptCategorySlugs = Object.keys(cptCategoryPages);

export function getCategoryCodes(slug: string): CategoryCodeRef[] {
  const cat = cptCategoryPages[slug];
  if (!cat) return [];

  const seen = new Set<string>();
  const refs: CategoryCodeRef[] = [];

  for (const code of launchCptCodes) {
    const page = allCptPages[code];
    if (!page) continue;

    const slugMatch = cat.matchSlugs.includes(page.categorySlug);
    const patternMatch = cat.codePatterns?.some((re) => re.test(code)) ?? false;
    if (!slugMatch && !patternMatch) continue;
    if (seen.has(code)) continue;
    seen.add(code);

    refs.push({
      code,
      label: page.summary.replace(/…$/, '').slice(0, 100),
      href: `/codes/cpt/${code}/`,
    });
  }

  return refs.sort((a, b) => a.code.localeCompare(b.code));
}

export function getCategoryPage(slug: string): CptCategoryPage | undefined {
  return cptCategoryPages[slug];
}
