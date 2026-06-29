/** Featured tool cards for homepage hero — distinct visual themes per tool. */

export type HeroToolAccent = 'teal' | 'amber' | 'blue' | 'violet' | 'rose';

export interface HeroTool {
  id: string;
  href: string;
  cluster: 'CHECK' | 'UNDERSTAND';
  title: string;
  tagline: string;
  stat?: string;
  accent: HeroToolAccent;
  icon: 'price' | 'audit' | 'eob' | 'surprise' | 'medicare';
  live: boolean;
}

export const heroTools: HeroTool[] = [
  {
    id: 'fair-price',
    href: '/tools/fair-price/',
    cluster: 'CHECK',
    title: 'Fair Price',
    tagline: 'CPT + ZIP → Medicare benchmark & fair range',
    stat: '7,700+ codes',
    accent: 'teal',
    icon: 'price',
    live: true,
  },
  {
    id: 'surprise-bill',
    href: '/tools/surprise-bill-check/',
    cluster: 'CHECK',
    title: 'Surprise Bill',
    tagline: 'No Surprises Act risk check for OON bills',
    stat: 'NSA rules',
    accent: 'violet',
    icon: 'surprise',
    live: true,
  },
  {
    id: 'bill-auditor',
    href: '/tools/bill-auditor/',
    cluster: 'UNDERSTAND',
    title: 'Bill Auditor',
    tagline: 'Paste itemized bill → flags & NCCI checks',
    stat: '1.7M NCCI pairs',
    accent: 'amber',
    icon: 'audit',
    live: true,
  },
  {
    id: 'eob-analyzer',
    href: '/tools/eob-analyzer/',
    cluster: 'UNDERSTAND',
    title: 'EOB Analyzer',
    tagline: 'UHC · BCBS · Aetna · Cigna templates',
    stat: '4 insurers',
    accent: 'blue',
    icon: 'eob',
    live: true,
  },
  {
    id: 'medicare-tab',
    href: '/tools/fair-price/?tab=medicare',
    cluster: 'CHECK',
    title: 'Medicare Part B',
    tagline: 'Allowed amount + typical coinsurance',
    stat: '42K ZIPs',
    accent: 'rose',
    icon: 'medicare',
    live: true,
  },
];
