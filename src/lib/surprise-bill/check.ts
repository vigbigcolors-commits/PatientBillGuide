import type {
  CareSetting,
  Confidence,
  InsuranceType,
  NetworkStatus,
  SurpriseBillInput,
  SurpriseBillResult,
  SurpriseRiskLevel,
} from './types';

export type { SurpriseBillInput, SurpriseBillResult } from './types';

function isEmergencyContext(input: SurpriseBillInput): boolean {
  return input.isEmergency || input.careSetting === 'er_emergency';
}

function unknownCount(input: SurpriseBillInput): number {
  let n = 0;
  if (input.facilityNetwork === 'unknown') n++;
  if (input.providerNetwork === 'unknown') n++;
  if (input.insuranceType === 'unknown') n++;
  if (input.careSetting === 'other') n++;
  return n;
}

function baseConfidence(input: SurpriseBillInput): Confidence {
  const unknowns = unknownCount(input);
  if (input.insuranceType === 'unknown' || unknowns >= 2) return 'low';
  if (unknowns === 1) return 'medium';
  return 'high';
}

function elevated(
  headline: string,
  summary: string,
  input: SurpriseBillInput,
  extras: Partial<SurpriseBillResult> = {},
): SurpriseBillResult {
  return {
    riskLevel: 'elevated_risk',
    confidence: baseConfidence(input),
    headline,
    summary,
    nsaMayApply: false,
    protections: extras.protections ?? [],
    actionSteps: extras.actionSteps ?? defaultActions(input),
    caveats: extras.caveats ?? defaultCaveats(),
    ...extras,
  };
}

function protectedResult(
  level: SurpriseRiskLevel,
  headline: string,
  summary: string,
  input: SurpriseBillInput,
  extras: Partial<SurpriseBillResult> = {},
): SurpriseBillResult {
  return {
    riskLevel: level,
    confidence: baseConfidence(input),
    headline,
    summary,
    nsaMayApply: true,
    protections: extras.protections ?? [],
    actionSteps: extras.actionSteps ?? defaultActions(input),
    caveats: extras.caveats ?? defaultCaveats(),
    ...extras,
  };
}

function defaultCaveats(): string[] {
  return [
    'This is an educational screening tool — not legal advice, not a guarantee of coverage, and not a substitute for your plan documents or insurer.',
    'State laws, plan type (HMO vs PPO), and billing errors can change what you actually owe.',
  ];
}

function defaultActions(input: SurpriseBillInput): string[] {
  const steps = [
    'Request an itemized bill with CPT/HCPCS codes and provider NPI if missing.',
    'Compare the bill to your Explanation of Benefits (EOB) — amounts should eventually align.',
  ];
  if (input.insuranceType === 'private_insured') {
    steps.push('Call your insurer and ask whether the claim was processed as in-network or out-of-network.');
    steps.push(
      'If you believe federal surprise-billing protections apply, ask the provider about a Good Faith Estimate dispute or an independent dispute resolution (IDR) notice.',
    );
  }
  if (input.insuranceType === 'uninsured') {
    steps.push('Ask for a self-pay or financial assistance discount before paying in full.');
    steps.push('Use our Fair Price tool to compare charges to Medicare benchmarks in your ZIP.');
  }
  steps.push('Keep copies of all bills, EOBs, and call reference numbers.');
  return steps;
}

function evaluateUninsured(input: SurpriseBillInput): SurpriseBillResult {
  return elevated(
    'No federal surprise-billing shield — negotiate the bill',
    'The No Surprises Act mainly protects people with health insurance from certain out-of-network balance bills. Without coverage, your leverage is price transparency, hospital financial assistance, and self-pay discounts — not NSA protections.',
    input,
    {
      protections: [
        'Hospitals must publish certain prices and give uninsured patients a good-faith estimate for scheduled care in many cases.',
        'Many systems offer charity care or prompt-pay discounts — always ask in writing.',
      ],
      actionSteps: [
        'Request an itemized bill and compare line items to Medicare rates using our Fair Price Calculator.',
        'Ask for the hospital financial assistance / charity care policy.',
        'Do not pay a lump sum until you verify each CPT code and date of service.',
      ],
    },
  );
}

function evaluateMedicare(input: SurpriseBillInput): SurpriseBillResult {
  return {
    riskLevel: 'unclear',
    confidence: 'medium',
    headline: 'Medicare has different rules — verify with Medicare or your plan',
    summary:
      'Traditional Medicare and Medicare Advantage handle out-of-network claims differently. The No Surprises Act targets commercial insurance surprise bills — not Medicare billing in the same way.',
    nsaMayApply: false,
    protections: [
      'Traditional Medicare Part B often covers emergency care broadly; Advantage plans may have network restrictions.',
      'Medicare Summary Notices (MSNs) or MA EOBs show what Medicare approved and what you may owe.',
    ],
    actionSteps: [
      'Review your Medicare Summary Notice or Medicare Advantage EOB for each service date.',
      'Use our Medicare Part B tab on Fair Price for CMS allowed amounts by code and ZIP.',
      'Call 1-800-MEDICARE or your MA plan if provider network status is unclear.',
    ],
    caveats: defaultCaveats(),
  };
}

function evaluateAirAmbulance(input: SurpriseBillInput): SurpriseBillResult {
  if (input.insuranceType !== 'private_insured') {
    return evaluateUninsured(input);
  }
  return protectedResult(
    'likely_protected',
    'Air ambulance — federal protections often apply',
    'For plan years starting 2022, the No Surprises Act generally limits out-of-network air ambulance balance billing for people with job-based or individual health coverage. You typically owe in-network cost-sharing, not the full billed charge.',
    input,
    {
      protections: [
        'Out-of-network air ambulance providers generally cannot balance bill beyond your in-network cost-sharing amount.',
        'You should receive a notice explaining your rights if an out-of-network air ambulance is used.',
      ],
    },
  );
}

function evaluateGroundAmbulance(input: SurpriseBillInput): SurpriseBillResult {
  return {
    riskLevel: 'elevated_risk',
    confidence: input.insuranceType === 'private_insured' ? 'medium' : 'low',
    headline: 'Ground ambulance — limited federal protection',
    summary:
      'The No Surprises Act does not broadly ban out-of-network balance billing for ground ambulance services. Some states have additional ambulance protections — federal rules alone may not cap your bill.',
    nsaMayApply: false,
    protections: [
      'A few states regulate ground ambulance balance billing; many do not.',
      'Insurance may cover ambulance as out-of-network with higher cost-sharing — check your EOB.',
    ],
    actionSteps: [
      'Ask whether the ambulance company is in-network with your plan.',
      'Request an itemized bill — ambulance bills often combine mileage, supplies, and facility fees.',
      'Look up your state insurance department guidance on ambulance surprise billing.',
    ],
    caveats: [
      ...defaultCaveats(),
      'Ground ambulance is one of the most common remaining surprise bill categories after the NSA.',
    ],
  };
}

function evaluateEmergency(input: SurpriseBillInput): SurpriseBillResult {
  if (input.insuranceType !== 'private_insured') {
    return input.insuranceType === 'medicare' ? evaluateMedicare(input) : evaluateUninsured(input);
  }

  return protectedResult(
    'likely_protected',
    'Emergency care — strong federal surprise-billing protections',
    'For emergency services, the No Surprises Act generally requires that out-of-network providers and facilities bill you no more than your in-network cost-sharing (deductible, copay, coinsurance) — even if the ER or hospital is out-of-network.',
    input,
    {
      protections: [
        'Emergency services at out-of-network hospitals or freestanding ERs: in-network cost-sharing only.',
        'Out-of-network emergency physicians and ER professionals: balance billing generally prohibited.',
        'You cannot be asked to give up these protections in advance for emergency care.',
      ],
    },
  );
}

function evaluateNonEmergencyFacility(
  input: SurpriseBillInput,
  facility: NetworkStatus,
  provider: NetworkStatus,
): SurpriseBillResult {
  if (input.insuranceType !== 'private_insured') {
    return input.insuranceType === 'medicare' ? evaluateMedicare(input) : evaluateUninsured(input);
  }

  if (facility === 'out_of_network') {
    return elevated(
      'Out-of-network facility — NSA surprise protections usually do not apply',
      'For non-emergency care at an out-of-network hospital or surgery center, the No Surprises Act generally does not stop the facility from billing out-of-network rates. Your plan may cover little or apply out-of-network cost-sharing.',
      input,
      {
        protections: [
          'You may still have rights under your plan\'s out-of-network benefits — but not the same surprise-billing caps as in-network facility scenarios.',
        ],
      },
    );
  }

  if (facility === 'in_network' && provider === 'out_of_network') {
    return protectedResult(
      'likely_protected',
      'In-network facility + out-of-network provider — classic NSA scenario',
      'When you receive non-emergency care at an in-network hospital or ambulatory surgery center, out-of-network ancillary providers (anesthesia, radiology, pathology, assistant surgeons) generally cannot balance bill you beyond in-network cost-sharing.',
      input,
      {
        protections: [
          'Applies to covered services at in-network facilities — anesthesia, radiology, hospitalists, and similar OON professionals.',
          'You should receive a written notice and consent form before choosing an out-of-network provider when allowed — but many ancillary services are not optional.',
        ],
      },
    );
  }

  if (facility === 'in_network' && provider === 'in_network') {
    return {
      riskLevel: 'possibly_protected',
      confidence: 'high',
      headline: 'In-network facility and provider — standard plan rules apply',
      summary:
        'When both the facility and the billing provider are in-network, surprise balance billing is less common. Your bill should reflect in-network deductibles, copays, and coinsurance — still verify EOB math.',
      nsaMayApply: false,
      protections: ['Standard in-network cost-sharing applies — not typically a surprise-billing scenario.'],
      actionSteps: defaultActions(input),
      caveats: defaultCaveats(),
    };
  }

  return {
    riskLevel: 'unclear',
    confidence: 'low',
    headline: 'Need more network details to assess surprise-bill risk',
    summary:
      'We could not determine facility and provider network status. Surprise-billing protections depend heavily on whether the hospital was in-network and whether the specific doctor was out-of-network.',
    nsaMayApply: false,
    protections: [],
    actionSteps: [
      'Check your EOB for "out-of-network" or "not covered" labels on each line.',
      'Call the hospital billing office and ask if the facility and each professional group were in-network on the date of service.',
      ...defaultActions(input),
    ],
    caveats: defaultCaveats(),
  };
}

function evaluateOfficeClinic(input: SurpriseBillInput): SurpriseBillResult {
  if (input.providerNetwork === 'out_of_network' || input.facilityNetwork === 'out_of_network') {
    return elevated(
      'Out-of-network office or clinic visit',
      'The No Surprises Act surprise-billing rules focus on emergency care, air ambulance, and certain non-emergency hospital settings — not typical out-of-network office visits you chose (or could have avoided).',
      input,
      {
        protections: [
          'Your plan\'s out-of-network benefits (or lack thereof) govern what you owe — not NSA facility-based caps.',
        ],
      },
    );
  }
  return {
    riskLevel: 'possibly_protected',
    confidence: 'medium',
    headline: 'Office or clinic — usually standard in-network billing',
    summary:
      'Routine office visits are typically not "surprise bill" scenarios unless you unknowingly saw an out-of-network provider. Verify network status on your insurer\'s portal.',
    nsaMayApply: false,
    protections: [],
    actionSteps: defaultActions(input),
    caveats: defaultCaveats(),
  };
}

/**
 * Evaluate surprise balance billing risk under federal No Surprises Act rules (educational).
 * Does not determine legal outcomes or guaranteed savings.
 */
export function checkSurpriseBill(input: SurpriseBillInput): SurpriseBillResult {
  if (input.insuranceType === 'uninsured') return evaluateUninsured(input);
  if (input.insuranceType === 'medicare') return evaluateMedicare(input);
  if (input.insuranceType === 'unknown') {
    return {
      riskLevel: 'unclear',
      confidence: 'low',
      headline: 'Select your coverage type for a meaningful result',
      summary: 'Surprise-billing protections differ sharply for uninsured patients, Medicare beneficiaries, and people with job-based or marketplace insurance.',
      nsaMayApply: false,
      protections: [],
      actionSteps: defaultActions(input),
      caveats: defaultCaveats(),
    };
  }

  if (input.careSetting === 'ambulance_air') return evaluateAirAmbulance(input);
  if (input.careSetting === 'ambulance_ground') return evaluateGroundAmbulance(input);
  if (isEmergencyContext(input)) return evaluateEmergency(input);

  if (
    input.careSetting === 'hospital_inpatient' ||
    input.careSetting === 'hospital_outpatient' ||
    input.careSetting === 'er_emergency'
  ) {
    return evaluateNonEmergencyFacility(input, input.facilityNetwork, input.providerNetwork);
  }

  if (input.careSetting === 'office_clinic') return evaluateOfficeClinic(input);

  return evaluateNonEmergencyFacility(input, input.facilityNetwork, input.providerNetwork);
}

export const CARE_SETTING_LABELS: Record<CareSetting, string> = {
  er_emergency: 'Emergency room / emergency care',
  hospital_inpatient: 'Hospital stay (inpatient)',
  hospital_outpatient: 'Hospital outpatient (surgery, imaging, lab)',
  ambulance_air: 'Air ambulance',
  ambulance_ground: 'Ground ambulance',
  office_clinic: 'Doctor office or clinic',
  other: 'Other / not sure',
};

export const NETWORK_LABELS: Record<NetworkStatus, string> = {
  in_network: 'In-network',
  out_of_network: 'Out-of-network',
  unknown: 'Not sure',
};

export const INSURANCE_LABELS: Record<InsuranceType, string> = {
  private_insured: 'Job-based or individual insurance',
  medicare: 'Medicare (Traditional or Advantage)',
  uninsured: 'Uninsured / self-pay',
  unknown: 'Not sure',
};

export const RISK_LABELS: Record<SurpriseBillResult['riskLevel'], string> = {
  likely_protected: 'Protections likely apply',
  possibly_protected: 'Standard billing — verify amounts',
  elevated_risk: 'Elevated surprise-bill risk',
  unclear: 'Need more information',
};
