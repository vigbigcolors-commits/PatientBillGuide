import type { Confidence, LocalityNotice } from '../pricing/types';

export type CareSetting = 'physician_office' | 'asc' | 'hospital_outpatient' | 'er';

export type HospitalVerdict = 'below_typical' | 'typical' | 'high' | 'very_high' | 'extreme';

export type HospitalInsightLevel = 'info' | 'watch' | 'alert';

export interface HospitalCompareInput {
  code: string;
  zip?: string;
  hospitalCharge: number;
  careSetting: CareSetting;
}

export interface HospitalInsight {
  id: string;
  level: HospitalInsightLevel;
  headline: string;
  detail: string;
}

export interface HospitalCompareResult {
  code: string;
  description: string;
  careSetting: CareSetting;
  careSettingLabel: string;
  medicarePhysician: number;
  estimatedFacilityLow: number;
  estimatedFacilityHigh: number;
  typicalTotalLow: number;
  typicalTotalHigh: number;
  hospitalCharge: number;
  chargeVsPhysicianRatio: number;
  chargeVsTypicalMidRatio: number;
  physicianSharePct: number;
  facilitySharePct: number;
  verdict: HospitalVerdict;
  verdictHeadline: string;
  verdictDetail: string;
  insights: HospitalInsight[];
  checksRun: string[];
  nextSteps: string[];
  confidence: Confidence;
  localityLabel?: string;
  localityNotice: LocalityNotice;
  dataVersion: string;
  benchmarkNote: string;
}
