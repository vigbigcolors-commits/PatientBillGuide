/** How It Works page — structured content for SEO + UI blocks. */

export const howItWorksMeta = {
  updated: '2026-06-29',
  title: 'How PatientBillGuide Works',
  description:
    'Learn how PatientBillGuide helps you check fair medical prices, audit itemized bills, and read EOBs — using public Medicare data, 100% in your browser, with no account or upload.',
};

export const howItWorksTrust = [
  { label: 'Browser-only', detail: 'No bill upload to servers' },
  { label: 'CMS public data', detail: 'Medicare Physician Fee Schedule' },
  { label: 'Honest outcomes', detail: '“Bill looks normal” is valid' },
  { label: 'Free forever', detail: 'No account required' },
];

export const howItWorksPipeline = [
  {
    step: '01',
    title: 'Enter your details locally',
    text: 'Type a CPT procedure code and ZIP for price checks, or paste text from an itemized bill or EOB. Nothing is sent to our servers.',
    icon: 'input',
    tone: 'teal',
  },
  {
    step: '02',
    title: 'We match public benchmarks',
    text: 'Tools load CMS Medicare rates and compare your numbers to documented fair ranges and billing patterns — with confidence levels shown.',
    icon: 'data',
    tone: 'blue',
  },
  {
    step: '03',
    title: 'Get plain-English results',
    text: 'See Medicare allowed amounts, typical commercial ranges, parsed line items, and possible concerns explained without jargon or fear-mongering.',
    icon: 'results',
    tone: 'violet',
  },
  {
    step: '04',
    title: 'Decide your next step',
    text: 'Ask your billing office better questions, request itemization, or use our guides. We do not negotiate for you or provide legal advice.',
    icon: 'action',
    tone: 'amber',
  },
];

export const howItWorksAudiences = [
  {
    href: '/for/uninsured/',
    label: 'Self-pay & uninsured',
    title: 'I got a hospital bill',
    text: 'Compare chargemaster-style charges to Medicare benchmarks before paying. Fair Price shows whether a line item is typical, high, or worth questioning.',
    cta: 'For uninsured patients',
  },
  {
    href: '/for/insured/',
    label: 'Private insurance',
    title: 'My EOB is confusing',
    text: 'Parse allowed amounts, plan paid, and patient responsibility. Cross-check provider bills against what your insurer already processed.',
    cta: 'For insured patients',
  },
  {
    href: '/for/seniors-medicare/',
    label: 'Medicare & caregivers',
    title: 'What should Medicare pay?',
    text: 'Look up CMS allowed amounts by ZIP, understand facility vs. professional fees, and review Medicare Summary Notices with the same public anchor.',
    cta: 'For Medicare patients',
  },
];

export const howItWorksTools = [
  {
    href: '/tools/fair-price/',
    cluster: 'CHECK',
    name: 'Fair Price Calculator',
    status: 'live',
    text: 'Enter CPT + ZIP (+ optional charge). See Medicare allowed, fair range 1.5×–2.5×, and whether your price looks typical.',
    pain: '“Is this price fair?”',
  },
  {
    href: '/tools/medicare-lookup/',
    cluster: 'CHECK',
    name: 'Medicare Allowed Lookup',
    status: 'live',
    text: 'Quick CMS MPFS lookup by code and locality — the transparent public price anchor behind our fair-range math.',
    pain: '“What does Medicare pay here?”',
  },
  {
    href: '/tools/bill-auditor/',
    cluster: 'UNDERSTAND',
    name: 'Bill Auditor',
    status: 'live',
    text: 'Paste itemized charges. Flags duplicate lines and prices well above benchmark — with confidence levels on every flag.',
    pain: '“Does my bill look wrong?”',
  },
  {
    href: '/tools/eob-analyzer/',
    cluster: 'UNDERSTAND',
    name: 'EOB Analyzer',
    status: 'live',
    text: 'Paste Explanation of Benefits text. Builds a readable table of billed, allowed, plan paid, and your share.',
    pain: '“What do I actually owe?”',
  },
];

export const howItWorksFaqs = [
  {
    question: 'How does PatientBillGuide work?',
    answer:
      'You enter a CPT code, ZIP code, or paste bill/EOB text in your browser. Our tools load public CMS Medicare data and run comparisons locally on your device. Results explain prices and possible billing patterns in plain English — no account and no upload to our servers.',
  },
  {
    question: 'Is PatientBillGuide really free?',
    answer:
      'Yes. All current tools and guides are free. We may show advertising later, but core price checks and bill review will remain free. No subscription or credit card is required.',
  },
  {
    question: 'Do you store my medical bill or personal information?',
    answer:
      'No. CPT lookups, pasted bills, and EOB text are processed in your browser. We do not receive, store, or analyze protected health information on our servers for these tools.',
  },
  {
    question: 'What data do you use for price benchmarks?',
    answer:
      'Fair price and audit tools use the CMS Medicare Physician Fee Schedule (MPFS) — publicly published allowed amounts by procedure code and geographic locality. We document our multipliers and limitations on our methodology pages.',
  },
  {
    question: 'What is a “fair price” on this site?',
    answer:
      'We show Medicare’s allowed amount as a public anchor, then a documented educational range of about 1.5× to 2.5× that figure. This is a transparency benchmark, not a guaranteed market price or legal maximum. Facility fees, urgency, and network status can legitimately push totals higher.',
  },
  {
    question: 'Can PatientBillGuide tell me if my hospital committed fraud?',
    answer:
      'No. We flag possible billing concerns — such as duplicate lines or charges far above benchmark — with confidence levels. We never claim fraud, guarantee savings, or replace conversations with your billing department or insurer.',
  },
  {
    question: 'What if the tool says my bill looks normal?',
    answer:
      'That is a valid and intentional outcome. Many bills fall within typical ranges after facility fees and network pricing. Our tools help you understand numbers; they do not replace professional billing help when something still feels wrong.',
  },
  {
    question: 'What is a CPT code and where do I find it?',
    answer:
      'A CPT code is a five-digit procedure code on itemized bills and EOBs (e.g., 99213 for an office visit, 77067 for screening mammography). Look for columns labeled CPT, HCPCS, or procedure code. See our CPT guide for step-by-step help.',
  },
  {
    question: 'How is the Bill Auditor different from the Fair Price Calculator?',
    answer:
      'Fair Price checks one code at a time against Medicare data. Bill Auditor parses multiple lines from pasted bill text and applies pattern checks — duplicate charges and per-line price comparisons — across the whole paste at once.',
  },
  {
    question: 'Does this work for Medicare Advantage or Medigap?',
    answer:
      'Medicare lookup shows traditional Medicare Part B physician fee schedule amounts. Medicare Advantage plans may pay differently, and Medigap changes your out-of-pocket share. Use our Medicare audience guide for context, and always compare to your Medicare Summary Notice.',
  },
];
