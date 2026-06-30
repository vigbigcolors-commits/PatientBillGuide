/** About page — structured content for SEO, EEAT, and UI blocks. */

export const aboutMeta = {
  updated: '2026-06-29',
  title: 'About PatientBillGuide',
  description:
    'PatientBillGuide is an independent US healthcare billing guide. Learn what problems we solve — fair price checks, bill audits, EOB decoding, surprise bill screening — and what we honestly cannot do.',
};

export const aboutTrust = [
  { label: 'Independent', detail: 'Not a hospital, insurer, or law firm' },
  { label: 'Privacy-first', detail: 'Tools run in your browser only' },
  { label: 'Public data', detail: 'CMS Medicare & NCCI benchmarks' },
  { label: 'Honest outcomes', detail: '“Bill looks normal” counts as success' },
];

export const aboutProblems = [
  {
    rank: 1,
    question: 'Is this price fair?',
    title: 'Sticker shock without context',
    text: 'Hospital and clinic bills often arrive with no reference point. A $400 office visit or a $4,000 imaging charge feels arbitrary when you cannot compare it to anything authoritative.',
    solution: 'Fair Price Calculator',
    href: '/tools/fair-price/',
    tone: 'teal',
  },
  {
    rank: 2,
    question: 'Can I trust this site with my bill?',
    title: 'Fear of uploading sensitive health data',
    text: 'Medical bills contain names, dates of service, diagnoses, and account numbers. Many people avoid online tools that ask for PDF uploads or account creation.',
    solution: 'Browser-only processing',
    href: '/privacy/',
    tone: 'blue',
  },
  {
    rank: 3,
    question: 'What am I paying for?',
    title: 'Itemized bills that read like code',
    text: 'Twenty lines of CPT codes, modifiers, and duplicate-looking charges. Most patients cannot tell a legitimate facility fee from a duplicate lab line.',
    solution: 'Bill Auditor',
    href: '/tools/bill-auditor/',
    tone: 'violet',
  },
  {
    rank: 4,
    question: 'What does my EOB mean?',
    title: 'Insurance statements in insurer language',
    text: 'Allowed amount, plan paid, patient responsibility, contractual adjustment — EOB columns sound similar but change what you owe. EOBs are not bills, but they drive payment decisions.',
    solution: 'EOB Analyzer',
    href: '/tools/eob-analyzer/',
    tone: 'amber',
  },
  {
    rank: 5,
    question: 'Is this a surprise bill?',
    title: 'Out-of-network charges at in-network hospitals',
    text: 'Emergency care, anesthesiologists, air ambulances, and specialists you never chose can produce balances that feel illegal even when plan rules apply.',
    solution: 'Surprise Bill Checker',
    href: '/tools/surprise-bill-check/',
    tone: 'rose',
  },
  {
    rank: 6,
    question: 'How do I push back?',
    title: 'Disputes stalled by blank-page anxiety',
    text: 'People know something looks wrong but do not know how to write billing office or insurer letters with the right tone and facts.',
    solution: 'Dispute Letter Builder',
    href: '/tools/dispute-letter/',
    tone: 'slate',
  },
  {
    rank: 7,
    question: 'What should Medicare pay?',
    title: 'Medicare paperwork without a clear anchor',
    text: 'Medicare Summary Notices mix professional fees, facility charges, and 20% coinsurance. Beneficiaries need a public reference before calling a provider.',
    solution: 'Medicare lookup in Fair Price',
    href: '/tools/fair-price/?tab=medicare',
    tone: 'teal',
  },
  {
    rank: 8,
    question: 'What is CPT 99213?',
    title: 'Procedure codes that look like passwords',
    text: 'Patients search for code meanings and land on paywalled or jargon-heavy pages. AMA descriptions are licensed — we write original plain-English summaries.',
    solution: 'CPT code encyclopedia',
    href: '/codes/',
    tone: 'blue',
  },
];

export const aboutPrinciples = [
  {
    title: 'Calm advocate, not alarmist',
    text: 'We explain patterns worth asking about. We do not scream fraud, guarantee savings, or imply every high bill is wrong.',
  },
  {
    title: 'Show your work',
    text: 'Methodology, data sources, formulas, and limitations are published. Every flag carries a confidence level tied to data quality.',
  },
  {
    title: 'Privacy as product design',
    text: 'Your pasted bill text and CPT codes stay on your device. We architect tools so you can verify that claim in browser dev tools.',
  },
  {
    title: 'Normal is a valid result',
    text: 'When public-data rules find no duplicate patterns, unbundling concerns, or extreme price outliers, we say the bill looks normal — that is success, not failure.',
  },
];

export const aboutWeAre = [
  'An independent educational site and free tool hub for US patients and caregivers',
  'A plain-English bridge between confusing bills and public CMS benchmarks',
  'Built for uninsured, privately insured, and Medicare audiences — often the same household',
  'Maintained with documented data pipelines, Vitest engine tests, and a public corrections log',
];

export const aboutWeAreNot = [
  'A law firm, medical practice, insurance broker, or hospital billing department',
  'A bill negotiation service that contacts providers on your behalf',
  'A source of guaranteed savings, fraud findings, or legal advice',
  'A substitute for your insurance contract, Explanation of Benefits, or state insurance regulator',
];

export const aboutFaqs = [
  {
    question: 'Who runs PatientBillGuide?',
    answer:
      'PatientBillGuide is an independent project founded by Vigen G.R., an independent researcher and developer focused on US healthcare billing transparency. We are not affiliated with any hospital system, insurer, or patient advocacy law firm. Editorial and engineering decisions prioritize patient clarity over sensationalism.',
  },
  {
    question: 'Is PatientBillGuide free?',
    answer:
      'Yes. Core tools — Fair Price Calculator, Bill Auditor, EOB Analyzer, Surprise Bill Checker, and Dispute Letter Builder — are free and require no account. The site may display advertising in the future; methodology and limitations will remain public regardless.',
  },
  {
    question: 'Do you upload my medical bill to your servers?',
    answer:
      'No. Tools process CPT codes, ZIP codes, and pasted bill or EOB text locally in your browser using JavaScript. Public JSON data files (Medicare fee schedule, NCCI edits, ZIP-to-locality maps) are fetched from our CDN, but your document contents are not sent for server-side analysis.',
  },
  {
    question: 'Can PatientBillGuide tell me if I was overcharged?',
    answer:
      'We compare charges to documented public benchmarks and billing patterns — duplicates, NCCI unbundling signals, and price vs. Medicare allowed amounts. That is evidence for questions, not a legal determination. Real prices depend on contracts, facility fees, emergency settings, and medical necessity we cannot see.',
  },
  {
    question: 'What if my bill looks normal on your tools?',
    answer:
      'That is a valid and common outcome. A high total can still be legitimate when facility fees, multiple physician groups, and out-of-network rules apply. Our tools surface common automated concerns — when none appear, we tell you clearly. You can still call billing with specific CPT lines if something feels wrong.',
  },
  {
    question: 'How is this different from other medical bill review sites?',
    answer:
      'Many services require uploads, accounts, or paid advocates. We publish reproducible methodology, center CMS public data, assign confidence levels, and treat “looks normal” as a first-class result. Read our methodology hub for formulas, sources, and known limits.',
  },
];
