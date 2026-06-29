/** Homepage content — SEO-rich, original copy. */

export const homeFacts = [
  {
    stat: '80%',
    label: 'of medical bills contain errors',
    detail: 'Industry studies often cite high error rates on hospital bills. Many are coding or duplicate-line issues — worth a quick check before paying in full.',
    tone: 'amber',
  },
  {
    stat: '3×',
    label: 'typical self-pay markup',
    detail: 'Uninsured patients are often charged several times Medicare’s allowed amount. Our fair range uses 1.5×–2.5× as an educational benchmark — not a legal cap.',
    tone: 'teal',
  },
  {
    stat: '$0',
    label: 'data sent to our servers',
    detail: 'Every tool runs in your browser. Your CPT codes, ZIP, and bill text never leave your device — a core privacy promise for sensitive health billing.',
    tone: 'green',
  },
  {
    stat: '2 bills',
    label: 'EOB and hospital bill differ',
    detail: 'You may get an Explanation of Benefits from insurance and a separate bill from the hospital. The amounts should align eventually — but timing and wording confuse almost everyone.',
    tone: 'slate',
  },
];

export const homeSteps = [
  {
    step: '1',
    title: 'Find your CPT code',
    text: 'Look for a 5-digit procedure code on your itemized bill or EOB — e.g. 99213 for an office visit, 77067 for a screening mammogram.',
    href: '/learn/cpt-codes-explained/',
    link: 'What is a CPT code?',
  },
  {
    step: '2',
    title: 'Compare to Medicare data',
    text: 'Enter the code and your ZIP. We show CMS’s published allowed amount and a documented fair range for your area.',
    href: '/tools/fair-price/',
    link: 'Open Fair Price Calculator',
  },
  {
    step: '3',
    title: 'Decide your next step',
    text: 'A normal result is valid — not every high bill is wrong. If something looks off, request an itemized bill or use our Bill Auditor before paying.',
    href: '/tools/bill-auditor/',
    link: 'Try Bill Auditor',
  },
];

export const homeInsights = [
  {
    title: 'Facility fees are often the surprise',
    text: 'The same chest X-ray (CPT 71046) can cost $40 at an imaging center and $800+ at a hospital ER — because of facility charges billed separately from the physician fee.',
    tag: 'Imaging & ER',
    tone: 'coral',
    href: '/codes/cpt/71046/',
    proof: 'CPT 71046 · CMS MPFS',
    icon: 'scan',
  },
  {
    title: '“Allowed amount” is not what the doctor charged',
    text: 'On your EOB, allowed amount is what your plan recognizes — usually far below the billed charge. That gap is normal; your job is to verify patient responsibility math.',
    tag: 'Insurance',
    tone: 'blue',
    href: '/learn/how-to-read-eob/',
    proof: 'EOB glossary',
    icon: 'shield',
  },
  {
    title: 'Screening mammograms should be $0 in-network',
    text: 'ACA preventive rules cover screening mammography (CPT 77067) at no cost when in-network. A large bill may mean diagnostic coding, out-of-network radiology, or a facility fee.',
    tag: 'Preventive care',
    tone: 'pink',
    href: '/codes/cpt/77067/',
    proof: 'ACA preventive rules',
    icon: 'heart',
  },
  {
    title: 'You can ask for an itemized bill — always',
    text: 'Federal rules require hospitals to give machine-readable itemized bills on request. Never pay a lump sum without line-item CPT codes and dates of service.',
    tag: 'Your rights',
    tone: 'teal',
    href: '/learn/how-to-read-medical-bill/',
    proof: 'No Surprises Act',
    icon: 'document',
  },
  {
    title: 'Duplicate lines happen more than you think',
    text: 'The same CPT code and dollar amount twice on one date of service is a common flag. It may be legitimate (two units) — but always worth confirming.',
    tag: 'Bill audit',
    tone: 'amber',
    href: '/tools/bill-auditor/',
    proof: 'Pattern flag · not fraud claim',
    icon: 'duplicate',
  },
  {
    title: 'Medicare rates help everyone — not just seniors',
    text: 'CMS publishes what Medicare pays in every ZIP. It’s the most transparent public price anchor in US healthcare — useful for uninsured and insured patients alike.',
    tag: 'Benchmarks',
    tone: 'green',
    href: '/tools/medicare-lookup/',
    proof: 'CMS MPFS by locality',
    icon: 'chart',
  },
] as const;

export const homeTips = [
  {
    title: 'Before you pay a hospital bill',
    items: [
      'Request a fully itemized bill with CPT/HCPCS codes on every line.',
      'Match each date of service to your calendar and insurance EOB.',
      'Run codes through our Fair Price tool with your ZIP code.',
      'Ask about self-pay, prompt-pay, or financial assistance discounts.',
      'Get a written good-faith estimate for elective care when possible.',
    ],
  },
  {
    title: 'If you have insurance',
    items: [
      'Read the EOB before paying the provider — they are different documents.',
      'Check whether you met your deductible or out-of-pocket max for the year.',
      'Note denial reason codes (CARC/RARC) — many appeals succeed with documentation.',
      'Verify in-network vs out-of-network — surprise bills often start here.',
      'Keep Explanation of Benefits until the provider bill is resolved.',
    ],
  },
  {
    title: 'On Medicare or helping a parent',
    items: [
      'Medicare Summary Notice (MSN) is Medicare’s version of an EOB — review quarterly.',
      'Part B pays 80% of approved amounts after the deductible; Medigap changes your share.',
      'Hospital outpatient facility fees are billed separately from surgeon codes like 27447.',
      'Compare provider statements to CMS allowed amounts in your ZIP.',
      'Annual wellness visits use preventive codes — different rules than problem visits.',
    ],
  },
];

export const homeLearn = [
  {
    href: '/learn/how-to-read-medical-bill/',
    title: 'How to read a medical bill',
    text: 'Line by line: charges, CPT codes, facility vs professional fees, and what to do before you pay.',
    readTime: '12 min',
  },
  {
    href: '/learn/how-to-read-eob/',
    title: 'How to read an EOB',
    text: 'Allowed amount, plan paid, patient responsibility, denials — decoded in plain English.',
    readTime: '11 min',
  },
  {
    href: '/learn/cpt-codes-explained/',
    title: 'CPT codes explained',
    text: 'Where to find procedure codes on bills and EOBs, and how to look up fair prices.',
    readTime: '6 min',
  },
];

export const homePopularCodes = [
  { code: '99213', label: 'Office visit', href: '/codes/cpt/99213/' },
  { code: '77067', label: 'Screening mammogram', href: '/codes/cpt/77067/' },
  { code: '71046', label: 'Chest X-ray', href: '/codes/cpt/71046/' },
  { code: '99284', label: 'ER visit (high)', href: '/codes/cpt/99284/' },
  { code: '80053', label: 'Metabolic panel', href: '/codes/cpt/80053/' },
  { code: '45378', label: 'Colonoscopy', href: '/codes/cpt/45378/' },
];

export const homeFaqs = [
  {
    question: 'Is PatientBillGuide free?',
    answer:
      'Yes. All calculators and guides are free. We use public CMS Medicare data and run everything in your browser — no account required.',
  },
  {
    question: 'Can you tell me if my hospital committed fraud?',
    answer:
      'No. We flag possible billing concerns based on public benchmarks and patterns — with confidence levels. We never claim fraud or guaranteed savings. Always ask the billing office for an explanation.',
  },
  {
    question: 'What is a fair price for a medical procedure?',
    answer:
      'We use Medicare’s allowed amount as a public anchor, then show a typical commercial range of 1.5× to 2.5× that figure. Real prices vary by facility, network, and urgency. See our methodology for the full formula.',
  },
  {
    question: 'Why is my bill higher than the Medicare rate if I have private insurance?',
    answer:
      'Medicare rates are a benchmark, not what commercial plans pay. Hospital chargemasters, facility fees, and out-of-network providers can push patient-facing totals much higher — especially in emergency settings.',
  },
  {
    question: 'Do you store my bill or personal information?',
    answer:
      'No. CPT lookups, pasted bills, and EOB text are processed locally in your browser. We do not upload PHI to our servers.',
  },
  {
    question: 'What if your tool says my bill looks normal?',
    answer:
      'That is a valid outcome. Many bills are within typical ranges. Our tools help you understand numbers — they do not replace talking to your billing department or insurer when something still feels wrong.',
  },
];
