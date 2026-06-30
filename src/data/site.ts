export const site = {
  name: 'PatientBillGuide',
  domain: 'patientbillguide.com',
  url: 'https://patientbillguide.com',
  tagline: 'Honest healthcare numbers — before, during, and after you get the bill.',
  description:
    'Check medical prices against Medicare benchmarks, understand hospital bills and insurance EOBs, and spot common billing concerns. Free tools, browser-only processing.',
} as const;

export const nav = {
  tools: [
    { href: '/tools/fair-price/', label: 'Fair Price Check' },
    { href: '/tools/hospital-compare/', label: 'Hospital Compare' },
    { href: '/tools/surprise-bill-check/', label: 'Surprise Bill Checker' },
    { href: '/tools/bill-auditor/', label: 'Bill Auditor' },
    { href: '/tools/eob-analyzer/', label: 'EOB Analyzer' },
    { href: '/tools/dispute-letter/', label: 'Dispute Letters' },
  ],
  learn: [
    { href: '/learn/', label: 'Learn' },
    { href: '/codes/', label: 'CPT Codes' },
    { href: '/for/seniors-medicare/', label: 'Medicare' },
  ],
  trust: [
    { href: '/about/', label: 'About' },
    { href: '/methodology/', label: 'Methodology' },
    { href: '/disclaimer/', label: 'Disclaimer' },
  ],
} as const;
