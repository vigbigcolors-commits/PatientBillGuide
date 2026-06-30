/** Methodology hub — strengths, evidence pillars, and SEO content. */

export const methodologyMeta = {
  updated: '2026-06-29',
  title: 'Methodology — How We Calculate & Flag Bills',
  description:
    'PatientBillGuide methodology: CMS Medicare MPFS benchmarks, 1.5×–2.5× fair range, NCCI unbundling rules, confidence levels, client-side architecture, and published limitations.',
};

export const methodologyStats = [
  { value: '7,700+', label: 'CPT codes in MPFS bundle', detail: 'Physician fee schedule lookup' },
  { value: '42K+', label: 'ZIP → locality mappings', detail: 'Geographic Medicare adjustments' },
  { value: '100%', label: 'Client-side analysis', detail: 'No PHI uploaded for tool runs' },
  { value: '56+', label: 'Automated engine tests', detail: 'Vitest on parsers & flag rules' },
];

/** Core differentiators — our strongest sides */
export const methodologyPillars = [
  {
    id: 'public-anchor',
    icon: 'anchor',
    title: 'Medicare as the transparent price anchor',
    headline: 'We start where the US government publishes numbers',
    text: 'Private insurer contract rates and hospital chargemasters are proprietary. CMS Medicare Physician Fee Schedule (MPFS) amounts are public, locality-adjusted, and updated on a documented cadence — the most reproducible nationwide benchmark available to consumers.',
    proof: ['CMS MPFS 2026 vintage shipped in launch bundle', 'ZIP resolves to CMS locality with fallback transparency', 'Medicare lookup available without commercial range overlay'],
    href: '/methodology/data-sources/',
    linkLabel: 'Data sources',
    accent: 'teal',
  },
  {
    id: 'documented-heuristic',
    icon: 'formula',
    title: 'Published fair-range formula',
    headline: '1.5×–2.5× Medicare — not a black box',
    text: 'Commercial and self-pay prices vary by market, payer, and setting. We display an educational band of approximately 1.5× to 2.5× the Medicare allowed amount as a “typical commercial zone” reference. The multiplier is a documented heuristic, not a secret algorithm or ML guess.',
    proof: ['Within / above / far above labels defined on price benchmarks page', 'Your charge compared only when you optionally enter it', 'Facility fees and anesthesia units called out as MPFS limits'],
    href: '/methodology/price-benchmarks/',
    linkLabel: 'Price benchmarks',
    accent: 'blue',
  },
  {
    id: 'deterministic-flags',
    icon: 'flag',
    title: 'Rule-based billing flags with confidence',
    headline: 'Patterns worth asking about — never “fraud” by default',
    text: 'Bill Auditor applies deterministic checks: duplicate CPT lines on the same date, charges above documented benchmarks, and NCCI procedure-to-procedure unbundling edits loaded on demand. Each finding includes severity, plain-English explanation, and a confidence level tied to data match quality.',
    proof: ['Duplicate detection: same code + amount + date', 'NCCI chunks loaded by CPT prefix — only what your bill needs', '“Possible billing concern” language — not legal accusations'],
    href: '/methodology/billing-flags/',
    linkLabel: 'Billing flags',
    accent: 'violet',
  },
  {
    id: 'privacy-architecture',
    icon: 'shield',
    title: 'Privacy-by-architecture, not policy alone',
    headline: 'Your bill text never hits our analysis servers',
    text: 'Tools fetch public JSON bundles from CDN and run parsers and comparators in your browser. There is no “upload for AI review” pipeline storing protected health information. You can confirm this by watching network requests while using any tool.',
    proof: ['Static Astro site on Cloudflare Pages', 'Gzip JSON bundles cached at the edge', 'Privacy policy aligned with client-side design'],
    href: '/privacy/',
    linkLabel: 'Privacy policy',
    accent: 'amber',
  },
  {
    id: 'honest-outcomes',
    icon: 'balance',
    title: 'Normal bills are first-class results',
    headline: 'We are not incentivized to always find problems',
    text: 'Many review products only show scary flags. PatientBillGuide explicitly reports when automated public-data rules find no duplicate patterns, unbundling concerns, or extreme price outliers. That outcome builds trust — and matches reality for many itemized bills.',
    proof: ['“Bill looks normal” headline in Bill Auditor', 'Confidence describes data quality, not legal certainty', 'Limitations page lists what we cannot detect'],
    href: '/methodology/limitations/',
    linkLabel: 'Known limitations',
    accent: 'green',
  },
  {
    id: 'reproducible-engine',
    icon: 'test',
    title: 'Tested, versioned, correctable',
    headline: 'Engine behavior you can trace and challenge',
    text: 'Parser and flag logic runs under Vitest with fixture bills. Data bundle versions appear in manifest.json. When CMS releases updates or we fix a bug, methodology pages and the corrections log document what changed — supporting Experience, Expertise, Authoritativeness, and Trust (E-E-A-T) for YMYL healthcare content.',
    proof: [
      'Vitest coverage on billing engine modules',
      'Public corrections log when formulas or data change',
      'Manifest.json tracks data bundle vintage',
    ],
    href: '/corrections/',
    linkLabel: 'Corrections log',
    accent: 'slate',
  },
];

export const methodologyCompare = {
  headline: 'How we differ from typical bill help',
  rows: [
    {
      aspect: 'Price reference',
      typical: 'Opaque “fair price” from unknown source',
      us: 'CMS MPFS allowed + documented 1.5×–2.5× range',
    },
    {
      aspect: 'Your documents',
      typical: 'Upload PDF or create account',
      us: 'Paste text locally — nothing sent for analysis',
    },
    {
      aspect: 'Findings language',
      typical: '“Overcharged” or “fraud” headlines',
      us: '“Possible billing concern” + confidence level',
    },
    {
      aspect: 'Clean bill outcome',
      typical: 'Often omitted or buried',
      us: 'Explicit “bill looks normal” when rules pass',
    },
    {
      aspect: 'Methodology',
      typical: 'Marketing page or none',
      us: 'Published sources, formulas, limitations',
    },
    {
      aspect: 'NCCI unbundling',
      typical: 'Rare in free consumer tools',
      us: 'Chunked NCCI PTP edits loaded per bill',
    },
  ],
};

export const methodologyDeepLinks = [
  {
    href: '/methodology/data-sources/',
    title: 'Data sources',
    text: 'CMS MPFS, NCCI, ZIP-locality maps, update cadence, and what we do not scrape.',
  },
  {
    href: '/methodology/price-benchmarks/',
    title: 'Price benchmarks',
    text: 'Medicare allowed amounts, fair range math, and how to interpret within / above / far above.',
  },
  {
    href: '/methodology/billing-flags/',
    title: 'Billing flags',
    text: 'Duplicate, unbundling, price, and modifier flags with high / medium / low confidence.',
  },
  {
    href: '/methodology/limitations/',
    title: 'Limitations',
    text: 'Physician-fee focus, no OCR, no contract rates, no medical necessity — stated upfront.',
  },
];

export const methodologyFaqs = [
  {
    question: 'Why use Medicare rates if I am not on Medicare?',
    answer:
      'Medicare publishes locality-adjusted allowed amounts for thousands of procedure codes — the most transparent nationwide price anchor available. Commercial insurers negotiate different rates, but Medicare gives self-pay and insured patients a documented starting point for questions. We clearly label benchmarks as educational, not contractual.',
  },
  {
    question: 'Where does the 1.5×–2.5× fair range come from?',
    answer:
      'It is an documented heuristic for typical commercial pricing relative to Medicare, not a statutory rule or insurer guarantee. Markets vary; emergency and hospital facility settings often exceed this band legitimately. Full interpretation guidance is on our price benchmarks page.',
  },
  {
    question: 'How does NCCI unbundling detection work?',
    answer:
      'We load CMS National Correct Coding Initiative procedure-to-procedure edit chunks based on CPT codes present in your pasted bill. When two codes on the same date appear in an edit pair Medicare typically does not pay separately, we surface a possible unbundling concern with confidence — not proof of billing error.',
  },
  {
    question: 'What does confidence high / medium / low mean?',
    answer:
      'Confidence reflects data and rule match quality — for example, whether your ZIP mapped to a CMS locality, whether the CPT code exists in our bundle, and whether a duplicate line is exact. It does not mean legal certainty about your bill.',
  },
  {
    question: 'Can I reproduce your results?',
    answer:
      'Yes. Sources are public CMS files. Formulas and flag rules are documented on this site and implemented in test-covered TypeScript modules. You can cross-check Medicare allowed amounts on CMS tools and compare against our Fair Price Calculator output for the same code and ZIP.',
  },
];
