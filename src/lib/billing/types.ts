export interface BillLineItem {
  code: string;
  description: string;
  charged: number;
  lineRaw: string;
  serviceDate?: string;
  quantity?: number;
}

export type FlagSeverity = 'low' | 'medium' | 'high';
export type FlagConfidence = 'low' | 'medium' | 'high';
export type FlagCategory = 'duplicate' | 'pricing' | 'quantity' | 'data' | 'coverage' | 'unbundling';

export interface BillAuditFlag {
  id: string;
  severity: FlagSeverity;
  confidence: FlagConfidence;
  category: FlagCategory;
  code?: string;
  headline: string;
  detail: string;
  lineRaw?: string;
}

export interface BillAuditResult {
  lineCount: number;
  flags: BillAuditFlag[];
  summary: string;
  looksNormal: boolean;
  skippedUnknownCodes: number;
  stats: BillAuditStats;
  /** Plain-English list of checks performed */
  checksRun: string[];
  nextSteps: string[];
}

export interface BillAuditStats {
  totalCharged: number;
  uniqueCodes: number;
  byCategory: Record<FlagCategory, number>;
  bySeverity: Record<FlagSeverity, number>;
  concernCount: number;
}
