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

export type SurpriseRiskLevel =
  | 'likely_protected'
  | 'possibly_protected'
  | 'elevated_risk'
  | 'unclear';

export type Confidence = 'high' | 'medium' | 'low';

export interface SurpriseBillInput {
  careSetting: CareSetting;
  isEmergency: boolean;
  /** Hospital or facility where care was delivered */
  facilityNetwork: NetworkStatus;
  /** Professional who sent the bill (e.g. ER doctor, anesthesiologist) */
  providerNetwork: NetworkStatus;
  insuranceType: InsuranceType;
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
}
