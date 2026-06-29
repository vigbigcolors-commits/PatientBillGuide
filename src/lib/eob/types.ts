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
  lineCount: number;
  codes: string[];
  notes: string[];
  insurer: EobInsurerMatch;
}
