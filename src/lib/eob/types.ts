export type EobInsurerId = 'uhc' | 'bcbs' | 'aetna' | 'cigna' | 'generic';

export interface EobInsurerMatch {
  id: EobInsurerId;
  label: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface EobLine {
  serviceDate?: string;
  code?: string;
  description: string;
  billed?: number;
  allowed?: number;
  planPaid?: number;
  patientOwes?: number;
  raw: string;
}

export interface EobParseResult {
  lines: EobLine[];
  insurer: EobInsurerMatch;
  templateNotes: string[];
}

export interface EobSummary {
  totalPatientOwes: number;
  totalBilled: number;
  totalAllowed: number;
  totalPlanPaid: number;
  lineCount: number;
  codes: string[];
  notes: string[];
  insurer: EobInsurerMatch;
}

export type EobInsightLevel = 'info' | 'watch' | 'alert';

export interface EobInsight {
  id: string;
  level: EobInsightLevel;
  headline: string;
  detail: string;
  code?: string;
}

export interface EobAnalysis extends EobSummary {
  insights: EobInsight[];
  checksRun: string[];
  nextSteps: string[];
  templateNotes: string[];
}

export const EOB_COLUMN_GLOSSARY = [
  {
    term: 'Billed',
    meaning: 'What the provider charged — often higher than what insurance recognizes.',
  },
  {
    term: 'Allowed',
    meaning: 'The negotiated or plan-approved amount — your cost-sharing is usually based on this.',
  },
  {
    term: 'Plan paid',
    meaning: 'What your insurer paid toward the allowed amount after deductibles and coinsurance rules.',
  },
  {
    term: 'You owe',
    meaning: 'Your patient responsibility for this line — compare to the provider bill before paying.',
  },
] as const;

export const EOB_PIPELINE_LANES = [
  {
    id: 'detect',
    title: 'Detect insurer',
    detail: 'Auto-match UHC, BCBS, Aetna, Cigna — or generic fallback',
    level: 'strong' as const,
  },
  {
    id: 'parse',
    title: 'Parse lines',
    detail: 'Extract dates, CPT codes, descriptions, and dollar columns',
    level: 'strong' as const,
  },
  {
    id: 'map',
    title: 'Map columns',
    detail: 'Billed → Allowed → Plan paid → Patient responsibility',
    level: 'strong' as const,
  },
  {
    id: 'insights',
    title: 'Surface insights',
    detail: 'Large billed vs allowed gaps, high patient share, $0 preventive',
    level: 'strong' as const,
  },
  {
    id: 'limits',
    title: 'What we cannot see',
    detail: 'Denial reason codes, accumulator balances, network status per line',
    level: 'weak' as const,
  },
];
