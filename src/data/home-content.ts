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

export type HomeFaqCategory = 'price' | 'privacy' | 'bill' | 'trust';

export interface HomeFaqItem {
  id: string;
  category: HomeFaqCategory;
  question: string;
  answer: string;
  /** Shorter label for the question picker */
  picker: string;
  link?: { href: string; label: string };
}

export const homeFaqCategories: { id: HomeFaqCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'price', label: 'Fair price' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'bill', label: 'Bills & EOBs' },
  { id: 'trust', label: 'Trust & limits' },
];

export const homeFaqs: HomeFaqItem[] = [
  {
    id: 'free',
    category: 'trust',
    picker: 'Is it really free?',
    question: 'Is PatientBillGuide free?',
    answer:
      'Yes — every calculator, parser, and guide on this site is free. No account, subscription, or credit card. We use public CMS Medicare data and run tools in your browser. The site may show ads in the future; the tools and methodology pages stay public either way.',
    link: { href: '/tools/', label: 'Browse all tools' },
  },
  {
    id: 'privacy',
    category: 'privacy',
    picker: 'Do you see my bill?',
    question: 'Do you upload or store my medical bill?',
    answer:
      'No. When you paste a bill or EOB, processing happens locally in your browser with JavaScript. CPT codes, ZIP codes, and pasted text are not sent to our servers for analysis. You can verify this in your browser’s network tab — there is no “upload for review” pipeline.',
    link: { href: '/privacy/', label: 'Privacy policy' },
  },
  {
    id: 'fair-price',
    category: 'price',
    picker: 'What is a fair price?',
    question: 'What counts as a fair price for a procedure?',
    answer:
      'We start with Medicare’s published allowed amount for your CPT code and ZIP — the most transparent public anchor in US healthcare. We then show an educational range of about 1.5× to 2.5× Medicare as a typical commercial zone. That is a benchmark for questions, not a legal cap or what your insurer must pay.',
    link: { href: '/methodology/price-benchmarks/', label: 'How we calculate fair range' },
  },
  {
    id: 'medicare-higher',
    category: 'price',
    picker: 'Why above Medicare?',
    question: 'Why is my bill higher than the Medicare rate?',
    answer:
      'Medicare rates are a reference point, not what hospitals charge everyone. Commercial insurers negotiate their own prices. Self-pay patients may see chargemaster rates several times Medicare. Facility fees, emergency settings, implants, and out-of-network providers can push totals much higher — especially at hospital-owned sites.',
    link: { href: '/tools/fair-price/', label: 'Check your code + ZIP' },
  },
  {
    id: 'fraud',
    category: 'trust',
    picker: 'Is this fraud?',
    question: 'Can you tell me if my hospital committed fraud?',
    answer:
      'No — and we will not say that. We surface possible billing concerns (duplicate lines, price vs benchmark, NCCI patterns) with confidence levels. That means “worth asking about,” not “illegal” or “guaranteed savings.” Always start with your billing office or insurer for an explanation.',
    link: { href: '/methodology/billing-flags/', label: 'How we flag bills' },
  },
  {
    id: 'normal',
    category: 'bill',
    picker: 'Bill looks normal?',
    question: 'What if your tool says my bill looks normal?',
    answer:
      'That is a valid outcome — not a failure. Many itemized bills pass our public-data checks. A high total can still be legitimate when facility fees, multiple physician groups, or plan rules apply. If something still feels wrong, call billing with specific CPT lines and dates.',
    link: { href: '/tools/bill-auditor/', label: 'Run Bill Auditor' },
  },
  {
    id: 'cpt',
    category: 'bill',
    picker: 'Find my CPT code',
    question: 'Where do I find the CPT code on my bill?',
    answer:
      'Look for a 5-digit number on each line of an itemized bill or EOB — often labeled CPT, HCPCS, or “procedure code.” Examples: 99213 (office visit), 71046 (chest X-ray), 80053 (metabolic panel). Request a fully itemized bill if you only see a lump sum.',
    link: { href: '/learn/cpt-codes-explained/', label: 'CPT codes explained' },
  },
  {
    id: 'eob',
    category: 'bill',
    picker: 'EOB vs bill?',
    question: 'What is the difference between an EOB and a hospital bill?',
    answer:
      'An Explanation of Benefits (EOB) is from your insurer — it shows how a claim was processed (allowed amount, plan paid, your share). It is usually not a bill. The hospital or doctor sends a separate statement for what you owe. Compare dates and CPT codes on both before paying.',
    link: { href: '/tools/eob-analyzer/', label: 'Decode your EOB' },
  },
  {
    id: 'advice',
    category: 'trust',
    picker: 'Legal or medical advice?',
    question: 'Is PatientBillGuide legal or medical advice?',
    answer:
      'Neither. We are an independent educational guide — not a law firm, medical practice, insurance broker, or billing negotiation service. Dispute letter templates are editable starting points, not attorney-reviewed documents. For disputes that escalate, consider certified patient advocates or your state insurance department.',
    link: { href: '/disclaimer/', label: 'Full disclaimer' },
  },
  {
    id: 'start',
    category: 'price',
    picker: 'Where to start?',
    question: 'I just got a bill — what should I do first?',
    answer:
      'Request a fully itemized bill with CPT codes on every line. Note your ZIP and the main procedure codes. Run each code through Fair Price, paste the full text into Bill Auditor, and match any EOB for the same dates. Takes a few minutes, costs nothing, and keeps your documents on your device.',
    link: { href: '/how-it-works/', label: 'Step-by-step workflow' },
  },
];
