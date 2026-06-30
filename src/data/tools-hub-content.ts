/** Tools hub page — hero copy, trust, workflow. */

export const toolsHubMeta = {
  updated: '2026-06-29',
  title: 'Free Billing Tools',
  description:
    'Free PatientBillGuide tools — Fair Price Calculator, Bill Auditor, EOB Analyzer, Surprise Bill Checker, Dispute Letters. Browser-only, no account, no upload.',
};

export const toolsHubTrust = [
  { label: 'Browser-only', detail: 'No bill upload to servers' },
  { label: 'CMS public data', detail: 'Medicare fee schedule benchmarks' },
  { label: 'No account', detail: 'Free — start in seconds' },
  { label: 'Honest outcomes', detail: '“Bill looks normal” is valid' },
];

export const toolsHubAudiences = [
  {
    href: '/for/uninsured/',
    label: 'Self-pay',
    text: 'Compare hospital charges to Medicare before paying.',
  },
  {
    href: '/for/insured/',
    label: 'Insured',
    text: 'Decode EOBs and cross-check provider bills.',
  },
  {
    href: '/for/seniors-medicare/',
    label: 'Medicare',
    text: 'Look up CMS allowed amounts by ZIP.',
  },
];
