/** Paste-and-click examples for live tools — Week 1 P0 */

export interface FairPriceExample {
  id: string;
  label: string;
  subtitle?: string;
  cpt: string;
  zip?: string;
  price?: string;
}

export interface MedicareLookupExample {
  id: string;
  label: string;
  subtitle?: string;
  cpt: string;
  zip?: string;
  /** Part B deductible already met this year (optional). */
  deductibleMet?: string;
}

export interface BillAuditorExample {
  id: string;
  label: string;
  subtitle?: string;
  text: string;
  zip?: string;
}

export interface EobAnalyzerExample {
  id: string;
  label: string;
  subtitle?: string;
  text: string;
  /** Optional insurer template hint for the dropdown */
  insurer?: 'auto' | 'uhc' | 'bcbs' | 'aetna' | 'cigna' | 'generic';
}

export interface SurpriseBillExample {
  id: string;
  label: string;
  subtitle?: string;
  careSetting: string;
  isEmergency: boolean;
  facilityNetwork: string;
  providerNetwork: string;
  insuranceType: string;
  providerRole?: string;
  consentStatus?: string;
  billSource?: string;
}

export interface HospitalCompareExample {
  id: string;
  label: string;
  subtitle?: string;
  cpt: string;
  zip?: string;
  charge: string;
  careSetting: 'physician_office' | 'asc' | 'hospital_outpatient' | 'er';
}

export const fairPriceExamples: FairPriceExample[] = [
  {
    id: 'mammogram-overcharge',
    label: 'Screening mammogram',
    subtitle: 'CPT 77067 · Beverly Hills · $4,200 charged',
    cpt: '77067',
    zip: '90210',
    price: '4200',
  },
  {
    id: 'office-visit',
    label: 'Office visit (established)',
    subtitle: 'CPT 99213 · NYC',
    cpt: '99213',
    zip: '10001',
    price: '185',
  },
  {
    id: 'er-visit',
    label: 'ER visit (high severity)',
    subtitle: 'CPT 99284 · Miami',
    cpt: '99284',
    zip: '33139',
    price: '2890',
  },
  {
    id: 'chest-xray',
    label: 'Chest X-ray, 2 views',
    subtitle: 'CPT 71046 · Chicago',
    cpt: '71046',
    zip: '60601',
    price: '450',
  },
  {
    id: 'metabolic-panel',
    label: 'Comprehensive metabolic panel',
    subtitle: 'CPT 80053 · no charge entered',
    cpt: '80053',
    zip: '98101',
  },
];

export const medicareLookupExamples: MedicareLookupExample[] = [
  {
    id: 'mammogram-medicare',
    label: 'Screening mammogram',
    subtitle: 'CPT 77067 · Los Angeles · deductible met',
    cpt: '77067',
    zip: '90210',
    deductibleMet: '257',
  },
  {
    id: 'office-medicare',
    label: 'Office visit — deductible not met',
    subtitle: 'CPT 99213 · Manhattan · $0 deductible met',
    cpt: '99213',
    zip: '10001',
    deductibleMet: '0',
  },
  {
    id: 'office-deductible-met',
    label: 'Office visit — deductible met',
    subtitle: 'CPT 99213 · typical 20% coinsurance only',
    cpt: '99213',
    zip: '10001',
    deductibleMet: '257',
  },
  {
    id: 'knee-replacement',
    label: 'Total knee replacement',
    subtitle: 'CPT 27447 · Houston · splits deductible + coinsurance',
    cpt: '27447',
    zip: '77001',
    deductibleMet: '0',
  },
  {
    id: 'colonoscopy',
    label: 'Colonoscopy, diagnostic',
    subtitle: 'CPT 45378 · Boston',
    cpt: '45378',
    zip: '02108',
    deductibleMet: '200',
  },
  {
    id: 'er-medicare',
    label: 'ER visit (high severity)',
    subtitle: 'CPT 99284 · Miami · professional fee only',
    cpt: '99284',
    zip: '33139',
    deductibleMet: '0',
  },
];

export const billAuditorExamples: BillAuditorExample[] = [
  {
    id: 'ncci-panel-unbundling',
    label: 'NCCI: panel + component test',
    subtitle: '80053 + 84460 same day — CMS PTP edit',
    zip: '10001',
    text: `01/15/2026 80053 Comprehensive metabolic panel $45.00
01/15/2026 84460 ALT liver enzyme $18.00
01/15/2026 99213 Office visit established patient $185.00`,
  },
  {
    id: 'duplicate-and-overcharge',
    label: 'Duplicate X-ray + high mammogram',
    subtitle: 'Flags duplicates and price outliers',
    zip: '90210',
    text: `01/12/2026 77067 Screening mammogram bilateral $4,200.00
01/12/2026 99284 Emergency department visit level 4 $2,890.00
02/01/2026 71046 Chest x-ray 2 views $450.00
02/01/2026 71046 Chest x-ray 2 views $450.00
02/01/2026 80053 Comprehensive metabolic panel $45.00`,
  },
  {
    id: 'normal-office-visit',
    label: 'Typical office visit bill',
    subtitle: 'Should look normal',
    zip: '10001',
    text: `03/05/2026 99213 Office visit established patient $150.00
03/05/2026 36415 Venipuncture $12.00
03/05/2026 80053 Comprehensive metabolic panel $18.00`,
  },
  {
    id: 'facility-mix',
    label: 'ER + imaging + labs',
    subtitle: 'Multi-line ER bill — pricing + duplicates',
    zip: '33139',
    text: `03/18/2026 99284 Emergency department visit level 4 $2,890.00
03/18/2026 71046 Chest x-ray 2 views $890.00
03/18/2026 80053 Comprehensive metabolic panel $125.00
03/18/2026 93000 Electrocardiogram complete $320.00
03/18/2026 99284 Emergency department visit level 4 $2,890.00`,
  },
  {
    id: 'unknown-code-mix',
    label: 'Mix with unknown CPT',
    subtitle: 'Flags codes not in our dataset',
    zip: '60601',
    text: `04/10/2026 99213 Office visit $185.00
04/10/2026 99999 Unknown procedure code $500.00
04/10/2026 93000 Electrocardiogram $75.00`,
  },
];

export const eobAnalyzerExamples: EobAnalyzerExample[] = [
  {
    id: 'uhc-block-format',
    label: 'UnitedHealthcare · block format',
    subtitle: 'Portal copy with labeled fields',
    insurer: 'uhc',
    text: `UnitedHealthcare
Explanation of Benefits

Date of Service: 01/15/2026
Procedure Code: 99213
Service: Office visit - established patient
Amount Billed: $185.00
Allowed Amount: $108.42
Plan Paid: $80.00
Your Share: $28.42

Date of Service: 01/15/2026
Procedure Code: 80053
Service: Comprehensive metabolic panel
Amount Billed: $45.00
Allowed Amount: $13.22
Plan Paid: $10.00
Your Share: $3.22

Date of Service: 01/22/2026
Procedure Code: 93000
Service: Electrocardiogram complete
Amount Billed: $89.00
Allowed Amount: $17.84
Plan Paid: $14.00
Your Share: $3.84`,
  },
  {
    id: 'bcbs-table-format',
    label: 'Blue Cross Blue Shield · table',
    subtitle: 'Claim detail with DOS / Member Owes columns',
    insurer: 'bcbs',
    text: `Blue Cross Blue Shield
Explanation of Benefits — Claim Detail

DOS          Proc    Description                         Amount Billed   Allowed Amount   Paid by Plan   Amount You Owe
01/15/2026   99213   OFFICE VISIT ESTABLISHED            $185.00         $108.42            $80.00         $28.42
01/15/2026   80053   COMPREHENSIVE METABOLIC PANEL       $45.00          $13.22             $10.00         $3.22
02/03/2026   99284   EMERGENCY DEPT VISIT HIGH           $3,450.00       $892.00            $0.00          $892.00`,
  },
  {
    id: 'aetna-block-format',
    label: 'Aetna · block format',
    subtitle: 'Negotiated Rate + Patient\'s Responsibility',
    insurer: 'aetna',
    text: `Aetna
Explanation of Benefits

Date of Service: 03/02/2026
Procedure Code: 99213
Service: Office visit established patient
Amount Billed: $185.00
Negotiated Rate: $108.42
Plan's Share: $80.00
Patient's Responsibility: $28.42

Date of Service: 03/02/2026
Procedure Code: 80053
Service: Comprehensive metabolic panel
Amount Billed: $45.00
Negotiated Rate: $13.22
Plan's Share: $10.00
Patient's Responsibility: $3.22`,
  },
  {
    id: 'cigna-block-format',
    label: 'Cigna · block format',
    subtitle: 'Member Rate + Remaining Responsibility',
    insurer: 'cigna',
    text: `Cigna Healthcare
Explanation of Benefits

Date of Service: 04/10/2026
Procedure Code: 99213
Service: Office visit
Amount Billed: $185.00
Member Rate: $108.42
Your Plan Paid: $80.00
Remaining Responsibility: $28.42

Date of Service: 04/10/2026
Procedure Code: 93000
Service: Electrocardiogram
Amount Billed: $89.00
Member Rate: $17.84
Your Plan Paid: $14.00
Remaining Responsibility: $3.84`,
  },
  {
    id: 'preventive-zero-owe',
    label: 'Generic · preventive $0 share',
    subtitle: 'Screening mammogram in-network',
    insurer: 'generic',
    text: `01/15/2026 77067 Screening mammography $450.00 $131.44 $131.44 $0.00`,
  },
];

export const surpriseBillExamples: SurpriseBillExample[] = [
  {
    id: 'classic-anesthesia',
    label: 'Surgery anesthesia surprise',
    subtitle: 'In-network hospital · OON anesthesiologist · private insurance',
    careSetting: 'hospital_outpatient',
    isEmergency: false,
    facilityNetwork: 'in_network',
    providerNetwork: 'out_of_network',
    insuranceType: 'private_insured',
    providerRole: 'anesthesiologist',
    consentStatus: 'did_not_sign',
    billSource: 'professional',
  },
  {
    id: 'er-oon',
    label: 'Out-of-network ER visit',
    subtitle: 'Emergency · OON hospital & ER doctor · private insurance',
    careSetting: 'er_emergency',
    isEmergency: true,
    facilityNetwork: 'out_of_network',
    providerNetwork: 'out_of_network',
    insuranceType: 'private_insured',
    providerRole: 'er_physician',
    billSource: 'both',
  },
  {
    id: 'ground-ambulance',
    label: 'Ground ambulance bill',
    subtitle: 'After ER visit · OON ambulance company',
    careSetting: 'ambulance_ground',
    isEmergency: false,
    facilityNetwork: 'unknown',
    providerNetwork: 'out_of_network',
    insuranceType: 'private_insured',
    providerRole: 'ambulance',
    billSource: 'professional',
  },
  {
    id: 'signed-waiver',
    label: 'Signed OON consent at surgery',
    subtitle: 'In-network ASC · OON provider · waiver signed',
    careSetting: 'hospital_outpatient',
    isEmergency: false,
    facilityNetwork: 'in_network',
    providerNetwork: 'out_of_network',
    insuranceType: 'private_insured',
    providerRole: 'surgeon',
    consentStatus: 'signed_waiver',
    billSource: 'professional',
  },
  {
    id: 'elective-oon-hospital',
    label: 'Chose out-of-network hospital',
    subtitle: 'Planned imaging · OON facility · not emergency',
    careSetting: 'hospital_outpatient',
    isEmergency: false,
    facilityNetwork: 'out_of_network',
    providerNetwork: 'out_of_network',
    insuranceType: 'private_insured',
    providerRole: 'radiology',
    billSource: 'both',
  },
  {
    id: 'air-ambulance',
    label: 'Air ambulance transport',
    subtitle: 'OON air ambulance · private insurance',
    careSetting: 'ambulance_air',
    isEmergency: true,
    facilityNetwork: 'unknown',
    providerNetwork: 'out_of_network',
    insuranceType: 'private_insured',
    providerRole: 'ambulance',
    billSource: 'professional',
  },
];

export const hospitalCompareExamples: HospitalCompareExample[] = [
  {
    id: 'mammogram-hospital',
    label: 'Screening mammogram — hospital',
    subtitle: 'CPT 77067 · Beverly Hills · $4,200',
    cpt: '77067',
    zip: '90210',
    charge: '4200',
    careSetting: 'hospital_outpatient',
  },
  {
    id: 'er-visit-high',
    label: 'ER visit (high severity)',
    subtitle: 'CPT 99284 · Miami · $2,890',
    cpt: '99284',
    zip: '33139',
    charge: '2890',
    careSetting: 'er',
  },
  {
    id: 'knee-hospital',
    label: 'Total knee replacement',
    subtitle: 'CPT 27447 · Houston outpatient · $38,500',
    cpt: '27447',
    zip: '77001',
    charge: '38500',
    careSetting: 'hospital_outpatient',
  },
  {
    id: 'chest-xray-er',
    label: 'Chest X-ray in ER',
    subtitle: 'CPT 71046 · Chicago · $890',
    cpt: '71046',
    zip: '60601',
    charge: '890',
    careSetting: 'er',
  },
  {
    id: 'colonoscopy-asc',
    label: 'Colonoscopy — surgery center',
    subtitle: 'CPT 45378 · Boston ASC · $2,100',
    cpt: '45378',
    zip: '02108',
    charge: '2100',
    careSetting: 'asc',
  },
  {
    id: 'office-hospital-clinic',
    label: 'Office visit — hospital clinic',
    subtitle: 'CPT 99213 · NYC · $185',
    cpt: '99213',
    zip: '10001',
    charge: '185',
    careSetting: 'hospital_outpatient',
  },
];
