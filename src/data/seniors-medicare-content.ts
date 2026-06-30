/** Medicare & seniors audience page — content blocks. */

export type McTone = 'teal' | 'green' | 'blue' | 'amber' | 'violet' | 'rose';

export const medicareMeta = {
  updated: '2026-06-29',
  title: 'Medicare Billing Help for Seniors & Caregivers',
  description:
    'Plain-English Medicare billing guide: MSN vs bills, Part B allowed amounts, participating providers, facility fees, and free tools to check CMS benchmarks in your ZIP.',
};

export const medicareTrust = [
  { label: 'Public CMS data', detail: 'Same Medicare fee schedule we ship in tools', accent: 'teal' },
  { label: 'Caregiver-friendly', detail: 'Written for beneficiaries and family helpers', accent: 'green' },
  { label: 'Browser-only checks', detail: 'Look up codes without uploading paperwork', accent: 'blue' },
  { label: 'Honest limits', detail: 'We do not replace SHIP counselors or Medigap advice', accent: 'amber' },
];

export const medicareFlow = [
  {
    step: 1,
    label: 'READ',
    title: 'Find your paperwork type',
    text: 'Medicare Summary Notice (MSN), provider bill, or Medicare Advantage EOB — each tells a different part of the story.',
    emoji: '📋',
    accent: 'green',
    href: '#mc-paperwork',
  },
  {
    step: 2,
    label: 'CHECK',
    title: 'Look up allowed amounts',
    text: 'Enter the CPT code + ZIP in Fair Price. CMS publishes what Medicare approves before your 20% Part B share.',
    emoji: '🔍',
    accent: 'teal',
    href: '/tools/fair-price/?tab=medicare',
  },
  {
    step: 3,
    label: 'ASK',
    title: 'Call with specific facts',
    text: 'Provider name, date of service, CPT line, and Medicare allowed amount — not “why is this so high?” alone.',
    emoji: '📞',
    accent: 'blue',
    href: '#mc-steps',
  },
];

export const medicarePainPoints = [
  {
    question: 'Is this what Medicare should pay?',
    title: 'Allowed amount confusion',
    text: 'Your MSN shows what Medicare approved — not always what you owe. Part B coinsurance, deductibles, and Medigap change the bottom line.',
    href: '/tools/fair-price/?tab=medicare',
    linkLabel: 'Medicare lookup',
    tone: 'teal' as McTone,
  },
  {
    question: 'Why two bills for one visit?',
    title: 'Facility vs professional fees',
    text: 'Hospital outpatient visits often split: facility fee on one statement, physician professional fee on another. Both can involve Medicare.',
    href: '/learn/how-to-read-medical-bill/',
    linkLabel: 'Medical bill guide',
    tone: 'amber' as McTone,
  },
  {
    question: 'My doctor “does not take Medicare”',
    title: 'Non-participating providers',
    text: 'Some providers opt out or do not accept assignment. They may bill up to the limiting charge — often 115% of the Medicare allowed amount.',
    href: '#mc-concepts',
    linkLabel: 'Assignment explained',
    tone: 'rose' as McTone,
  },
  {
    question: 'What is this MSN?',
    title: 'Medicare Summary Notice',
    text: 'Traditional Medicare sends an MSN — not a bill. It summarizes processed Part A and Part B claims. You may still get a separate provider bill.',
    href: '/learn/how-to-read-eob/',
    linkLabel: 'EOB & MSN guide',
    tone: 'blue' as McTone,
  },
  {
    question: 'I have Medicare Advantage',
    title: 'Private plan statements',
    text: 'Medicare Advantage (Part C) plans send their own EOB-style statements from the insurer — not the same layout as Original Medicare MSNs.',
    href: '#mc-parts',
    linkLabel: 'Original vs Advantage',
    tone: 'violet' as McTone,
  },
  {
    question: 'Will Medigap cover the rest?',
    title: 'Supplemental insurance gaps',
    text: 'Medigap policies vary by plan letter (G, N, etc.). We help you understand Medicare’s share first — then you confirm supplemental coverage with your policy.',
    href: '/methodology/limitations/',
    linkLabel: 'What we cannot see',
    tone: 'green' as McTone,
  },
];

export const medicareSteps = [
  {
    num: 1,
    title: 'Gather codes and dates',
    text: 'Find CPT/HCPCS procedure codes on your MSN, provider bill, or plan statement. Note date of service and provider name.',
    accent: 'green',
  },
  {
    num: 2,
    title: 'Look up Medicare allowed amount',
    text: 'Use Fair Price Medicare tab with your ZIP. This is CMS public data — the approved amount before your Part B coinsurance.',
    accent: 'teal',
    toolHref: '/tools/fair-price/?tab=medicare',
    toolLabel: 'Medicare tab',
  },
  {
    num: 3,
    title: 'Compare to your statement',
    text: 'Check whether provider charges align with assignment rules. Flag duplicate lines or unclear facility fees with Bill Auditor.',
    accent: 'blue',
    toolHref: '/tools/bill-auditor/',
    toolLabel: 'Bill Auditor',
  },
  {
    num: 4,
    title: 'Call billing with specifics',
    text: 'Ask about assignment status, itemization, and financial assistance. For plan disputes, call your Medicare Advantage insurer.',
    accent: 'amber',
  },
];

export const medicareConcepts = [
  {
    term: 'Allowed amount',
    def: 'What Medicare approves for a covered service in your locality — the anchor for Part B payment before coinsurance.',
    tone: 'teal' as McTone,
  },
  {
    term: 'Assignment',
    def: 'When a provider accepts Medicare’s allowed amount as payment in full (for the Medicare portion). Most participating doctors do.',
    tone: 'green' as McTone,
  },
  {
    term: 'Limiting charge',
    def: 'Cap on what non-participating providers can charge for assigned Medicare services — often 115% of the allowed amount.',
    tone: 'rose' as McTone,
  },
  {
    term: 'Part B coinsurance',
    def: 'Typically 20% of the Medicare-approved amount after you meet the annual Part B deductible.',
    tone: 'blue' as McTone,
  },
  {
    term: 'Facility fee',
    def: 'Hospital outpatient department charge separate from the physician’s professional fee. MPFS benchmarks focus on professional fees.',
    tone: 'amber' as McTone,
  },
];

export const medicareParts = [
  {
    part: 'Part A',
    label: 'Hospital insurance',
    examples: 'Inpatient stays, skilled nursing (limited), hospice',
    paperwork: 'MSN for Part A claims',
    accent: 'blue',
  },
  {
    part: 'Part B',
    label: 'Medical insurance',
    examples: 'Doctor visits, outpatient care, labs, durable equipment',
    paperwork: 'MSN + provider bills; MPFS allowed amounts',
    accent: 'teal',
  },
  {
    part: 'Part C',
    label: 'Medicare Advantage',
    examples: 'Private plans combining A + B (often D)',
    paperwork: 'Plan EOB — contact insurer for appeals',
    accent: 'violet',
  },
];

export const medicareTools = [
  {
    title: 'Fair Price — Medicare tab',
    text: 'CPT code + ZIP → CMS allowed amount and educational fair range.',
    href: '/tools/fair-price/?tab=medicare',
    accent: 'teal',
  },
  {
    title: 'Medicare Lookup',
    text: 'Dedicated lookup for Medicare fee schedule amounts.',
    href: '/tools/medicare-lookup/',
    accent: 'green',
  },
  {
    title: 'Bill Auditor',
    text: 'Paste itemized lines — duplicates, benchmarks, NCCI signals.',
    href: '/tools/bill-auditor/',
    accent: 'amber',
  },
  {
    title: 'CPT encyclopedia',
    text: '30 common codes with plain-English summaries.',
    href: '/codes/',
    accent: 'violet',
  },
];

export const medicareFaqs = [
  {
    question: 'Is a Medicare Summary Notice the same as a bill?',
    answer:
      'No. An MSN is Medicare’s summary of claims it processed. A provider bill is a request for payment — often for your Part B coinsurance or amounts not yet paid by supplemental coverage. You may need both to know what you owe.',
  },
  {
    question: 'How do I find the Medicare allowed amount for a procedure?',
    answer:
      'Use our Fair Price Calculator Medicare tab or Medicare Lookup tool. Enter the five-digit CPT code and your ZIP. We load CMS Physician Fee Schedule data with locality adjustments — the same public benchmark Medicare uses for professional fees.',
  },
  {
    question: 'Why is my provider bill higher than the MSN allowed amount?',
    answer:
      'Non-participating providers may charge more than the allowed amount (up to limiting charge rules). Facility fees bill separately from professional fees. You may also owe coinsurance, deductible, or non-covered services not shown as “allowed.”',
  },
  {
    question: 'Does PatientBillGuide work with Medicare Advantage plans?',
    answer:
      'Our Medicare benchmarks reflect Original Medicare fee schedule data — useful for understanding procedure codes and professional fee anchors. Medicare Advantage plans negotiate their own networks and payment rules. Use your plan’s EOB for plan-specific amounts; use our tools for code context and public benchmarks.',
  },
  {
    question: 'Can caregivers use these tools for a family member?',
    answer:
      'Yes. Tools run in your browser — paste codes or bill text from a loved one’s paperwork on your device. We do not store uploads. Always respect the patient’s privacy when handling their health information.',
  },
  {
    question: 'Will checking Medicare rates lower my bill?',
    answer:
      'We do not guarantee savings. Medicare allowed amounts are a public reference for questions and itemized bill reviews — especially for professional fees. Hospitals may cite different rules for facility charges. We never promise a specific payment outcome.',
  },
  {
    question: 'Where can I get free Medicare counseling?',
    answer:
      'SHIP (State Health Insurance Assistance Program) counselors offer free, unbiased Medicare help in every state. PatientBillGuide is educational — not a replacement for SHIP, your Medigap insurer, or Medicare directly at 1-800-MEDICARE.',
  },
  {
    question: 'What if my bill looks normal but still feels wrong?',
    answer:
      'Call the provider billing office with CPT codes and dates. Request itemization. If the issue is plan processing, contact your Medicare Advantage insurer or Medicare for Original Medicare claims. Our Bill Auditor may report “looks normal” — that is a valid outcome when public rules find no obvious flags.',
  },
];
