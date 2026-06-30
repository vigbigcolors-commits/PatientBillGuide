/** Tools hub — live + roadmap cards for /tools/ */

export type ToolCluster = 'CHECK' | 'UNDERSTAND' | 'ACT';
export type ToolStatus = 'live' | 'planned' | 'soon';
export type ToolAccent = 'teal' | 'amber' | 'blue' | 'violet' | 'rose' | 'slate' | 'indigo';
export type ToolIcon =
  | 'price'
  | 'medicare'
  | 'surprise'
  | 'hospital'
  | 'audit'
  | 'eob'
  | 'search'
  | 'letter'
  | 'phone';

export interface DirectoryTool {
  id: string;
  cluster: ToolCluster;
  title: string;
  description: string;
  /** Short patient pain — shown on card */
  pain: string;
  /** One-line “what it does” */
  tagline: string;
  /** 3 bullets — what you get */
  bullets: string[];
  status: ToolStatus;
  href?: string;
  accent: ToolAccent;
  icon: ToolIcon;
  stat?: string;
  /** Roadmap detail for planned / soon tools */
  eta?: string;
  roadmap?: string[];
  /** Interim link while tool is not live */
  interim?: { label: string; href: string };
}

export const toolClusters: { id: ToolCluster; label: string; subtitle: string; step: string }[] = [
  { id: 'CHECK', label: 'Check', subtitle: 'Fair numbers before you pay', step: '01' },
  { id: 'UNDERSTAND', label: 'Understand', subtitle: 'Decode bills and EOBs', step: '02' },
  { id: 'ACT', label: 'Act', subtitle: 'Next steps when something looks wrong', step: '03' },
];

export const directoryTools: DirectoryTool[] = [
  {
    id: 'fair-price',
    cluster: 'CHECK',
    title: 'Fair Price Calculator',
    pain: '“Is this price fair?”',
    tagline: 'CPT + ZIP → Medicare benchmark & fair range',
    bullets: ['Medicare allowed amount for your area', 'Fair range 1.5×–2.5× with confidence', 'Optional: compare your charge'],
    description:
      'Enter a CPT procedure code and ZIP. See Medicare’s allowed amount and our documented fair range — with confidence levels for your locality.',
    status: 'live',
    href: '/tools/fair-price/',
    accent: 'teal',
    icon: 'price',
    stat: '7,700+ codes',
  },
  {
    id: 'medicare-tab',
    cluster: 'CHECK',
    title: 'Medicare Part B estimate',
    pain: '“What should Medicare pay?”',
    tagline: 'CMS allowed + deductible + 80/20 coinsurance',
    bullets: [
      'Deductible progress & cost-split bar',
      'Physician fee by ZIP locality',
      '6 examples with deductible context',
    ],
    description:
      'CMS allowed amount for your code and ZIP, plus a typical 80/20 coinsurance estimate after the Part B deductible.',
    status: 'live',
    href: '/tools/fair-price/?tab=medicare',
    accent: 'rose',
    icon: 'medicare',
    stat: '42K ZIPs',
  },
  {
    id: 'surprise-bill',
    cluster: 'CHECK',
    title: 'Surprise Bill Checker',
    pain: '“Is this a surprise bill?”',
    tagline: 'Screen OON bills against No Surprises Act',
    bullets: [
      'Emergency vs planned care paths',
      'Consent waiver + provider role screening',
      'Decision path, timeline & dispute letter link',
    ],
    description:
      'Screen out-of-network emergency and facility charges against federal No Surprises Act rules — with plain-English outcomes.',
    status: 'live',
    href: '/tools/surprise-bill-check/',
    accent: 'violet',
    icon: 'surprise',
    stat: 'NSA screening',
  },
  {
    id: 'hospital-compare',
    cluster: 'CHECK',
    title: 'Hospital Price Compare',
    pain: '“Why is the hospital so expensive?”',
    tagline: 'Hospital charge vs physician + facility benchmarks',
    bullets: [
      'Physician MPFS + facility range by setting',
      'ER · HOPD · ASC · office care paths',
      'Side-by-side insights & negotiation steps',
    ],
    description:
      'Compare your hospital charge to CMS physician fees plus estimated facility components — ER, outpatient, ASC, and office settings.',
    status: 'live',
    href: '/tools/hospital-compare/',
    accent: 'indigo',
    icon: 'hospital',
    stat: '4 care settings',
  },
  {
    id: 'bill-auditor',
    cluster: 'UNDERSTAND',
    title: 'Itemized Bill Auditor',
    pain: '“What am I paying for?”',
    tagline: 'Paste your bill → flags with confidence',
    bullets: [
      'Live line preview as you paste',
      'Grouped flags + stats dashboard',
      'NCCI unbundling + dispute letter links',
    ],
    description:
      'Paste your itemized bill. We flag duplicates, prices above benchmark, and NCCI unbundling patterns — with confidence on every finding.',
    status: 'live',
    href: '/tools/bill-auditor/',
    accent: 'amber',
    icon: 'audit',
    stat: 'NCCI + MPFS',
  },
  {
    id: 'eob-analyzer',
    cluster: 'UNDERSTAND',
    title: 'EOB Analyzer',
    pain: '“What does my EOB mean?”',
    tagline: 'Paste EOB text → clear line-by-line table',
    bullets: [
      'UHC · BCBS · Aetna · Cigna templates',
      'Totals, insights & column glossary',
      'Live preview + next-step tool links',
    ],
    description:
      'Parse insurance Explanation of Benefits into a clear table — UHC, BCBS, Aetna, Cigna, and generic formats supported.',
    status: 'live',
    href: '/tools/eob-analyzer/',
    accent: 'blue',
    icon: 'eob',
    stat: '4 insurers',
  },
  {
    id: 'code-lookup',
    cluster: 'UNDERSTAND',
    title: 'Quick Code Lookup',
    pain: '“What is CPT 99213?”',
    tagline: 'Search a code → jump to Fair Price',
    bullets: ['Autocomplete CPT search', 'One-click pre-fill calculator', 'ER · labs · imaging shortcuts'],
    description:
      'Instant CPT search with a one-click jump to Fair Price — faster than scrolling encyclopedia pages when you have a code in hand.',
    status: 'planned',
    accent: 'slate',
    icon: 'search',
    eta: 'Week 9',
    roadmap: [
      'Instant CPT search with autocomplete',
      'One-click jump to Fair Price with code pre-filled',
      'Common code shortcuts for ER, labs, imaging',
    ],
    interim: { label: 'CPT encyclopedia', href: '/codes/' },
  },
  {
    id: 'dispute-letter',
    cluster: 'ACT',
    title: 'Dispute Letter Builder',
    pain: '“How do I push back?”',
    tagline: 'Editable letters — overcharge, duplicate, surprise',
    bullets: ['Three starter templates', 'Copy & customize in browser', 'Not legal advice — starting point'],
    description:
      'Editable templates for overcharges, duplicate charges, and surprise bills — copy, customize, and send. Not legal advice.',
    status: 'live',
    href: '/tools/dispute-letter/',
    accent: 'teal',
    icon: 'letter',
    stat: '3 templates',
  },
  {
    id: 'negotiation-script',
    cluster: 'ACT',
    title: 'Self-Pay Negotiation Script',
    pain: '“What do I say on the phone?”',
    tagline: 'Phone & email scripts for billing office',
    bullets: ['Itemization request script', 'Financial assistance questions', 'Fair-price talking points'],
    description:
      'Step-by-step phone and email scripts to request itemization, financial assistance, and fair pricing from billing offices.',
    status: 'soon',
    accent: 'slate',
    icon: 'phone',
    eta: 'Week 11',
    roadmap: [
      'Step-by-step call script for billing office',
      'Financial assistance screening questions',
      'Links to fair-price benchmarks mid-conversation',
    ],
    interim: { label: 'Self-pay guide', href: '/for/uninsured/' },
  },
];

export const liveToolCount = directoryTools.filter((t) => t.status === 'live').length;
