export type CareSetting =
  | 'er_emergency'
  | 'hospital_inpatient'
  | 'hospital_outpatient'
  | 'ambulance_air'
  | 'ambulance_ground'
  | 'office_clinic'
  | 'other';

export type NetworkStatus = 'in_network' | 'out_of_network' | 'unknown';

export type InsuranceType = 'private_insured' | 'medicare' | 'uninsured' | 'unknown';

export type ProviderRole =
  | 'anesthesiologist'
  | 'er_physician'
  | 'radiology'
  | 'pathology'
  | 'hospitalist'
  | 'surgeon'
  | 'assistant_surgeon'
  | 'ambulance'
  | 'lab'
  | 'primary_care'
  | 'other'
  | 'unknown';

/** Whether patient signed to allow out-of-network billing at in-network facility */
export type ConsentStatus = 'did_not_sign' | 'signed_waiver' | 'not_sure' | 'not_applicable';

export type BillSource = 'facility' | 'professional' | 'both' | 'unknown';

export type SurpriseRiskLevel =
  | 'likely_protected'
  | 'possibly_protected'
  | 'elevated_risk'
  | 'unclear';

export type Confidence = 'high' | 'medium' | 'low';

export interface SurpriseBillInput {
  careSetting: CareSetting;
  isEmergency: boolean;
  facilityNetwork: NetworkStatus;
  providerNetwork: NetworkStatus;
  insuranceType: InsuranceType;
  providerRole?: ProviderRole;
  consentStatus?: ConsentStatus;
  billSource?: BillSource;
}

export interface SurpriseTimelineStep {
  phase: string;
  action: string;
}

export interface SurpriseToolLink {
  label: string;
  href: string;
  emphasis?: boolean;
}

export interface SurpriseBillResult {
  riskLevel: SurpriseRiskLevel;
  confidence: Confidence;
  headline: string;
  summary: string;
  /** Federal No Surprises Act may limit balance billing */
  nsaMayApply: boolean;
  protections: string[];
  actionSteps: string[];
  caveats: string[];
  /** Plain-English reasoning chain shown to the user */
  decisionPath: string[];
  timeline: SurpriseTimelineStep[];
  toolLinks: SurpriseToolLink[];
  disputeLetterHref?: string;
  scenarioId?: string;
}
