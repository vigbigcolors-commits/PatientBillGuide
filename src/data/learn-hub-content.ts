/** Learn hub — curriculum, guides, SEO, and UI blocks. */

export type LearnGuideTone = 'teal' | 'blue' | 'violet' | 'amber' | 'rose' | 'slate' | 'green';

export interface LearnGuide {
  rank: number;
  question: string;
  title: string;
  text: string;
  audience: string;
  readTime: string;
  href: string;
  toolLabel?: string;
  toolHref?: string;
  tone: LearnGuideTone;
  status: 'live';
}

export interface LearnRoadmapItem {
  title: string;
  text: string;
  audience: string;
  eta: string;
  interim?: { label: string; href: string };
  tone: LearnGuideTone;
}

export const learnMeta = {
  updated: '2026-06-29',
  title: 'Learn — Medical Billing Guides (Plain English)',
  description:
    'Free plain-English guides to medical bills, insurance EOBs, CPT codes, and Medicare basics. Pair every article with browser-only tools — no upload, no account.',
};

export const learnTrust = [
  { label: '3 pillar guides', detail: 'Bills, EOBs, and CPT codes — live now', accent: 'violet' },
  { label: 'Tool-paired', detail: 'Every guide links to a free check you can run', accent: 'teal' },
  { label: 'Original writing', detail: 'Plain English — never AMA description copy', accent: 'blue' },
  { label: 'No jargon walls', detail: 'Short sections, real examples, honest limits', accent: 'amber' },
];

/** Core workflow — shown in hero and pipeline strip */
export const learnFlow = [
  {
    step: 1,
    label: 'READ',
    title: 'Learn the vocabulary',
    text: 'Plain-English guides decode bills, EOBs, and CPT codes — so you know what to ask.',
    emoji: '📖',
    accent: 'violet',
    href: '/learn/how-to-read-medical-bill/',
  },
  {
    step: 2,
    label: 'CHECK',
    title: 'Run a free tool',
    text: 'Paste your bill or enter a CPT + ZIP. Public Medicare data runs locally in your browser.',
    emoji: '🔍',
    accent: 'teal',
    href: '/tools/fair-price/',
  },
  {
    step: 3,
    label: 'ACT',
    title: 'Push back with facts',
    text: 'Call billing with specific lines, use dispute templates, or confirm the bill looks normal.',
    emoji: '✉️',
    accent: 'blue',
    href: '/tools/dispute-letter/',
  },
];

/** Site clusters — maps guides to CHECK / UNDERSTAND / ACT */
export const learnClusters: {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  items: { label: string; href: string; tool?: boolean }[];
}[] = [
  {
    id: 'CHECK',
    title: 'Get reference numbers',
    subtitle: 'Before you pay — compare to public benchmarks',
    accent: 'teal',
    items: [
      { label: 'What is a CPT code?', href: '/learn/cpt-codes-explained/' },
      { label: 'CPT encyclopedia (30 codes)', href: '/codes/' },
      { label: 'Uninsured & self-pay', href: '/for/uninsured/' },
      { label: 'Fair Price Calculator', href: '/tools/fair-price/', tool: true },
      { label: 'Surprise Bill Checker', href: '/tools/surprise-bill-check/', tool: true },
    ],
  },
  {
    id: 'UNDERSTAND',
    title: 'Decode your paperwork',
    subtitle: 'Itemized bills, EOB columns, Medicare MSNs',
    accent: 'amber',
    items: [
      { label: 'How to read a medical bill', href: '/learn/how-to-read-medical-bill/' },
      { label: 'How to read an EOB', href: '/learn/how-to-read-eob/' },
      { label: 'Insured patient playbook', href: '/for/insured/' },
      { label: 'Medicare billing basics', href: '/for/seniors-medicare/' },
      { label: 'Bill Auditor', href: '/tools/bill-auditor/', tool: true },
      { label: 'EOB Analyzer', href: '/tools/eob-analyzer/', tool: true },
    ],
  },
  {
    id: 'ACT',
    title: 'Take the next step',
    subtitle: 'Templates and workflows — not legal advice',
    accent: 'blue',
    items: [
      { label: 'How PatientBillGuide works', href: '/how-it-works/' },
      { label: 'Dispute Letter Builder', href: '/tools/dispute-letter/', tool: true },
      { label: 'Methodology & limits', href: '/methodology/' },
      { label: 'All tools directory', href: '/tools/', tool: true },
    ],
  },
];

export const learnJourneys = [
  {
    id: 'bill',
    emoji: '📄',
    title: 'I got a hospital or clinic bill',
    steps: [
      { num: 1, text: 'Read the itemized bill guide' },
      { num: 2, text: 'Paste lines into Bill Auditor' },
      { num: 3, text: 'Check CPT prices in your ZIP' },
    ],
    href: '/learn/how-to-read-medical-bill/',
    cta: 'Start with the bill guide',
    toolHref: '/tools/bill-auditor/',
    toolLabel: 'Bill Auditor',
    accent: 'amber',
  },
  {
    id: 'eob',
    emoji: '📬',
    title: 'I got an EOB from my insurer',
    steps: [
      { num: 1, text: 'Learn EOB columns in plain English' },
      { num: 2, text: 'Paste your EOB into the analyzer' },
      { num: 3, text: 'Compare to the provider bill' },
    ],
    href: '/learn/how-to-read-eob/',
    cta: 'Start with the EOB guide',
    toolHref: '/tools/eob-analyzer/',
    toolLabel: 'EOB Analyzer',
    accent: 'blue',
  },
  {
    id: 'medicare',
    emoji: '🏥',
    title: 'I am on Medicare (or helping someone who is)',
    steps: [
      { num: 1, text: 'Read Medicare billing basics' },
      { num: 2, text: 'Look up allowed amounts by code' },
      { num: 3, text: 'Separate professional vs facility fees' },
    ],
    href: '/for/seniors-medicare/',
    cta: 'Medicare patient guide',
    toolHref: '/tools/fair-price/?tab=medicare',
    toolLabel: 'Medicare lookup',
    accent: 'teal',
  },
];

export const learnGuides: LearnGuide[] = [
  {
    rank: 1,
    question: 'What does my EOB mean?',
    title: 'How to read an EOB',
    text: 'Allowed amount, plan paid, patient responsibility, CARC/RARC denial codes — decode insurer language before you pay a provider bill.',
    audience: 'Insured',
    readTime: '12 min',
    href: '/learn/how-to-read-eob/',
    toolLabel: 'EOB Analyzer',
    toolHref: '/tools/eob-analyzer/',
    tone: 'blue',
    status: 'live',
  },
  {
    rank: 2,
    question: 'What am I being charged for?',
    title: 'How to read a medical bill',
    text: 'Itemized hospital bills, facility vs professional fees, chargemaster list prices, and self-pay negotiation starting points.',
    audience: 'Everyone',
    readTime: '14 min',
    href: '/learn/how-to-read-medical-bill/',
    toolLabel: 'Bill Auditor',
    toolHref: '/tools/bill-auditor/',
    tone: 'amber',
    status: 'live',
  },
  {
    rank: 3,
    question: 'What is this five-digit code?',
    title: 'What is a CPT code?',
    text: 'Why procedure codes appear on every bill, how they differ from diagnosis codes, and where to look yours up safely.',
    audience: 'Basics',
    readTime: '8 min',
    href: '/learn/cpt-codes-explained/',
    toolLabel: 'Fair Price Calculator',
    toolHref: '/tools/fair-price/',
    tone: 'violet',
    status: 'live',
  },
  {
    rank: 4,
    question: 'How much should this code cost?',
    title: 'CPT code encyclopedia',
    text: '30 common codes with original plain-English summaries, Medicare benchmarks, and embedded price checks — office, ER, imaging, labs, surgery.',
    audience: 'Reference',
    readTime: 'Browse',
    href: '/codes/',
    toolLabel: 'Fair Price (7,700+ codes)',
    toolHref: '/tools/fair-price/',
    tone: 'teal',
    status: 'live',
  },
  {
    rank: 5,
    question: 'I have no insurance — now what?',
    title: 'Uninsured & self-pay help',
    text: 'Compare hospital charges to Medicare, request itemization, financial assistance, and negotiation scripts that stay factual.',
    audience: 'Self-pay',
    readTime: '10 min',
    href: '/for/uninsured/',
    toolLabel: 'Fair Price Calculator',
    toolHref: '/tools/fair-price/',
    tone: 'rose',
    status: 'live',
  },
  {
    rank: 6,
    question: 'My plan processed it — do I owe this?',
    title: 'Insured patient playbook',
    text: 'EOB-first workflow, in-network vs out-of-network, deductible tracking, and when to call billing vs your insurer.',
    audience: 'Insured',
    readTime: '9 min',
    href: '/for/insured/',
    toolLabel: 'EOB Analyzer',
    toolHref: '/tools/eob-analyzer/',
    tone: 'blue',
    status: 'live',
  },
  {
    rank: 7,
    question: 'Medicare sent confusing paperwork',
    title: 'Medicare billing basics',
    text: 'MSN vs EOB, Part B coinsurance, professional vs facility fees, and Advantage plan differences — for beneficiaries and caregivers.',
    audience: 'Medicare',
    readTime: '11 min',
    href: '/for/seniors-medicare/',
    toolLabel: 'Medicare tab in Fair Price',
    toolHref: '/tools/fair-price/?tab=medicare',
    tone: 'green',
    status: 'live',
  },
  {
    rank: 8,
    question: 'Where do I start on this site?',
    title: 'How PatientBillGuide works',
    text: 'Step-by-step walkthrough: CHECK → UNDERSTAND → ACT — which tool to run first and what each result means.',
    audience: 'New here',
    readTime: '6 min',
    href: '/how-it-works/',
    toolLabel: 'All tools',
    toolHref: '/tools/',
    tone: 'slate',
    status: 'live',
  },
];

export const learnRoadmap: LearnRoadmapItem[] = [
  {
    title: 'Surprise medical bills & the No Surprises Act',
    text: 'Emergency out-of-network rules, good-faith estimates, and when federal protections may apply.',
    audience: 'Insured',
    eta: 'Coming soon',
    interim: { label: 'Surprise Bill Checker', href: '/tools/surprise-bill-check/' },
    tone: 'rose',
  },
  {
    title: 'Common medical billing errors',
    text: 'Duplicates, unbundling patterns, modifier confusion — what to ask billing when lines look wrong.',
    audience: 'Everyone',
    eta: 'Coming soon',
    interim: { label: 'Bill Auditor', href: '/tools/bill-auditor/' },
    tone: 'violet',
  },
  {
    title: 'How to negotiate a hospital bill (self-pay)',
    text: 'Financial assistance, itemized bill requests, and Medicare benchmark conversations without hype.',
    audience: 'Self-pay',
    eta: 'Planned',
    interim: { label: 'Uninsured guide', href: '/for/uninsured/' },
    tone: 'amber',
  },
  {
    title: 'How to dispute an insurance claim',
    text: 'Appeals timelines, medical necessity letters, and documenting EOB discrepancies.',
    audience: 'Insured',
    eta: 'Planned',
    interim: { label: 'Dispute Letter Builder', href: '/tools/dispute-letter/' },
    tone: 'blue',
  },
  {
    title: 'Medicare allowed amount explained',
    text: 'What CMS publishes, locality adjustments, and why Medicare is our public price anchor.',
    audience: 'Medicare',
    eta: 'Planned',
    interim: { label: 'Methodology hub', href: '/methodology/' },
    tone: 'teal',
  },
];

export const learnPrinciples = [
  {
    title: 'Plain English first',
    text: 'We explain allowed amounts, NCCI edits, and chargemasters the way a patient would ask — not the way a coding manual reads.',
    accent: 'teal',
    num: '01',
  },
  {
    title: 'Original summaries only',
    text: 'CPT descriptions on this site are written by us. We never copy AMA/AAPC proprietary description text.',
    accent: 'violet',
    num: '02',
  },
  {
    title: 'Every guide pairs with a tool',
    text: 'Reading alone is not enough. Each article ends with a specific free check you can run in your browser — no upload pipeline.',
    accent: 'blue',
    num: '03',
  },
  {
    title: 'Honest about what we cannot know',
    text: 'Guides say when you need your contract, chart, or state law — not pretend a blog post replaces professional advice.',
    accent: 'amber',
    num: '04',
  },
  {
    title: 'Normal outcomes are valid',
    text: 'Sometimes a bill or EOB looks correct after you understand the columns. We treat that as success, not a missed scare headline.',
    accent: 'green',
    num: '05',
  },
  {
    title: 'Updated with public data',
    text: 'When CMS fee schedules or our methodology change, guides and the corrections log note what shifted.',
    accent: 'slate',
    num: '06',
  },
];

export const learnFaqs = [
  {
    question: 'Do I need to read everything before using a tool?',
    answer:
      'No. Most patients start with Fair Price or Bill Auditor, then read the guide that matches their paperwork. The journeys above suggest a sensible order if you prefer learning first.',
  },
  {
    question: 'Are these guides medical or legal advice?',
    answer:
      'No. PatientBillGuide publishes educational content about billing paperwork and public Medicare data. For treatment decisions, talk to your clinician. For contract disputes or lawsuits, consult licensed professionals in your state.',
  },
  {
    question: 'Why do guides focus on CPT codes and EOB columns?',
    answer:
      'Those are the two places patients get stuck most often: itemized bills full of procedure codes, and insurer statements with similar-sounding dollar columns. Master those and you can ask billing offices specific questions.',
  },
  {
    question: 'How is this different from insurer or hospital billing FAQs?',
    answer:
      'We are independent — not a hospital, insurer, or law firm. We link to CMS public benchmarks, show our methodology, and design tools that run locally in your browser instead of asking for PDF uploads.',
  },
  {
    question: 'Can I use these guides if I am uninsured?',
    answer:
      'Yes. The medical bill guide, CPT encyclopedia, and uninsured audience page are written for self-pay patients. Fair Price compares codes to Medicare allowed amounts as a negotiation reference — not a guarantee any provider will match it.',
  },
  {
    question: 'What should Medicare patients read first?',
    answer:
      'Start with our Medicare audience page, then the CPT code guide if codes confuse you. Use the Medicare tab in Fair Price to look up allowed amounts before calling a provider about a balance.',
  },
  {
    question: 'Will you add more guides?',
    answer:
      'Yes. Surprise billing, billing error patterns, hospital negotiation, and insurance appeals are on the roadmap. Each will pair with an existing tool until the dedicated article ships.',
  },
  {
    question: 'How often are guides updated?',
    answer:
      'Pillar guides show a “last updated” date in-page. We revise when CMS data vintages change, tool behavior shifts, or readers report confusing sections via the contact form.',
  },
];
