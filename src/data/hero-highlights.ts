/** Trust + value props below the hero headline — compact cards with optional links */

export interface HeroHighlight {
  icon: 'shield' | 'benchmark' | 'flags' | 'confidence' | 'plain' | 'dispute';
  title: string;
  text: string;
  href?: string;
}

export const heroHighlights: HeroHighlight[] = [
  {
    icon: 'shield',
    title: 'Private by design',
    text: 'Your bill text stays in your browser. We never upload, store, or sell your data.',
    href: '/privacy/',
  },
  {
    icon: 'benchmark',
    title: 'Medicare as the anchor',
    text: 'We compare charges to CMS published rates — the same benchmark insurers use to negotiate.',
    href: '/methodology/price-benchmarks/',
  },
  {
    icon: 'flags',
    title: 'Flags you can act on',
    text: 'Price outliers, duplicate lines, NCCI unbundling checks, and No Surprises Act screening.',
    href: '/tools/bill-auditor/',
  },
  {
    icon: 'confidence',
    title: 'Confidence on every flag',
    text: 'High, medium, or low — so you know how strongly our data supports each finding.',
    href: '/methodology/billing-flags/',
  },
  {
    icon: 'plain',
    title: 'Plain English, not legalese',
    text: 'EOB columns, CPT codes, and allowed amounts translated into language you can actually use.',
    href: '/tools/eob-analyzer/',
  },
];
