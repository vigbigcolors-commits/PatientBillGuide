import type {
  BillSource,
  CareSetting,
  Confidence,
  ConsentStatus,
  InsuranceType,
  NetworkStatus,
  ProviderRole,
  SurpriseBillInput,
  SurpriseBillResult,
  SurpriseRiskLevel,
  SurpriseTimelineStep,
  SurpriseToolLink,
} from './types';

export type { SurpriseBillInput, SurpriseBillResult } from './types';

const DISPUTE_SURPRISE_HREF = '/tools/dispute-letter/?template=surprise-bill';

function isEmergencyContext(input: SurpriseBillInput): boolean {
  return input.isEmergency || input.careSetting === 'er_emergency';
}

function unknownCount(input: SurpriseBillInput): number {
  let n = 0;
  if (input.facilityNetwork === 'unknown') n++;
  if (input.providerNetwork === 'unknown') n++;
  if (input.insuranceType === 'unknown') n++;
  if (input.careSetting === 'other') n++;
  if (input.consentStatus === 'not_sure') n++;
  return n;
}

function baseConfidence(input: SurpriseBillInput): Confidence {
  const unknowns = unknownCount(input);
  if (input.insuranceType === 'unknown' || unknowns >= 2) return 'low';
  if (unknowns === 1) return 'medium';
  return 'high';
}

function defaultCaveats(): string[] {
  return [
    'This is an educational screening tool — not legal advice, not a guarantee of coverage, and not a substitute for your plan documents or insurer.',
    'State laws, plan type (HMO vs PPO), and billing errors can change what you actually owe.',
  ];
}

function defaultTimeline(input: SurpriseBillInput, nsaMayApply: boolean): SurpriseTimelineStep[] {
  const steps: SurpriseTimelineStep[] = [
    {
      phase: 'Today',
      action: 'Request an itemized bill with CPT/HCPCS codes, dates of service, and provider NPI numbers.',
    },
    {
      phase: 'Within 1–2 weeks',
      action: 'Compare the bill to your EOB (or ask your insurer for claim status if no EOB yet).',
    },
  ];
  if (input.insuranceType === 'private_insured' && nsaMayApply) {
    steps.push({
      phase: 'If balance billing continues',
      action:
        'Ask in writing whether the No Surprises Act applies and request an independent dispute resolution (IDR) notice if the provider disputes in-network cost-sharing.',
    });
  }
  if (input.insuranceType === 'uninsured') {
    steps.push({
      phase: 'Before paying in full',
      action: 'Request financial assistance / charity care policy and compare charges to Medicare benchmarks.',
    });
  }
  steps.push({
    phase: 'Always',
    action: 'Keep copies of bills, EOBs, consent forms, and insurer call reference numbers.',
  });
  return steps;
}

function defaultToolLinks(input: SurpriseBillInput, nsaMayApply: boolean): SurpriseToolLink[] {
  const links: SurpriseToolLink[] = [
    { label: 'Fair Price Calculator', href: '/tools/fair-price/' },
    { label: 'EOB Analyzer', href: '/tools/eob-analyzer/' },
    { label: 'Bill Auditor', href: '/tools/bill-auditor/' },
  ];
  if (nsaMayApply && input.insuranceType === 'private_insured') {
    links.unshift({
      label: 'Surprise bill dispute letter',
      href: DISPUTE_SURPRISE_HREF,
      emphasis: true,
    });
  }
  if (input.insuranceType === 'uninsured') {
    links[0] = { label: 'Fair Price Calculator', href: '/tools/fair-price/', emphasis: true };
  }
  return links;
}

function defaultActions(input: SurpriseBillInput): string[] {
  const steps = [
    'Request an itemized bill with CPT/HCPCS codes and provider NPI if missing.',
    'Compare the bill to your Explanation of Benefits (EOB) — amounts should eventually align.',
  ];
  if (input.billSource === 'facility') {
    steps.push('Separate facility fees from physician professional charges — they follow different NSA rules.');
  }
  if (input.insuranceType === 'private_insured') {
    steps.push('Call your insurer and ask whether the claim was processed as in-network or out-of-network.');
    steps.push(
      'If federal surprise-billing protections may apply, ask about Good Faith Estimate disputes or an IDR notice.',
    );
  }
  if (input.insuranceType === 'uninsured') {
    steps.push('Ask for a self-pay or financial assistance discount before paying in full.');
    steps.push('Use our Fair Price tool to compare charges to Medicare benchmarks in your ZIP.');
  }
  steps.push('Keep copies of all bills, EOBs, and call reference numbers.');
  return steps;
}

function providerNote(role?: ProviderRole): string | undefined {
  const notes: Partial<Record<ProviderRole, string>> = {
    anesthesiologist:
      'Anesthesiologists are among the most common out-of-network bills at in-network surgery centers and hospitals.',
    er_physician:
      'Emergency physician groups often bill separately from the hospital — emergency NSA rules may still apply if the visit was a true emergency.',
    radiology: 'Radiology and imaging reads are frequently out-of-network even when the hospital is in-network.',
    pathology: 'Hospital pathology and lab professional fees are a classic ancillary surprise-bill category.',
    hospitalist: 'Hospitalist groups may be out-of-network while the hospital facility is in-network.',
    assistant_surgeon: 'Assistant surgeons and co-surgeons are covered NSA ancillary professionals at in-network facilities.',
    ambulance: 'Ambulance billing is separate from hospital NSA facility rules — ground vs air protections differ sharply.',
    lab: 'Out-of-network lab professional fees at in-network hospitals may fall under NSA ancillary rules.',
  };
  return role ? notes[role] : undefined;
}

function consentApplies(input: SurpriseBillInput): boolean {
  return (
    input.insuranceType === 'private_insured' &&
    !isEmergencyContext(input) &&
    input.careSetting !== 'ambulance_air' &&
    input.careSetting !== 'ambulance_ground' &&
    input.facilityNetwork === 'in_network' &&
    input.providerNetwork === 'out_of_network'
  );
}

function buildResult(
  input: SurpriseBillInput,
  core: {
    riskLevel: SurpriseRiskLevel;
    headline: string;
    summary: string;
    nsaMayApply: boolean;
    protections?: string[];
    actionSteps?: string[];
    caveats?: string[];
    decisionPath: string[];
    confidence?: Confidence;
    disputeLetterHref?: string;
    scenarioId?: string;
  },
): SurpriseBillResult {
  const nsa = core.nsaMayApply;
  const protections = [...(core.protections ?? [])];
  const providerHint = providerNote(input.providerRole);
  if (providerHint) protections.unshift(providerHint);

  let disputeHref = core.disputeLetterHref;
  if (!disputeHref && nsa && input.insuranceType === 'private_insured') {
    disputeHref = DISPUTE_SURPRISE_HREF;
  }

  return {
    riskLevel: core.riskLevel,
    confidence: core.confidence ?? baseConfidence(input),
    headline: core.headline,
    summary: core.summary,
    nsaMayApply: nsa,
    protections,
    actionSteps: core.actionSteps ?? defaultActions(input),
    caveats: core.caveats ?? defaultCaveats(),
    decisionPath: core.decisionPath,
    timeline: defaultTimeline(input, nsa),
    toolLinks: defaultToolLinks(input, nsa),
    disputeLetterHref: disputeHref,
    scenarioId: core.scenarioId,
  };
}

function evaluateUninsured(input: SurpriseBillInput): SurpriseBillResult {
  return buildResult(input, {
    riskLevel: 'elevated_risk',
    headline: 'No federal surprise-billing shield — negotiate the bill',
    summary:
      'The No Surprises Act mainly protects people with health insurance from certain out-of-network balance bills. Without coverage, your leverage is price transparency, hospital financial assistance, and self-pay discounts — not NSA protections.',
    nsaMayApply: false,
    decisionPath: [
      'Coverage: uninsured / self-pay',
      'NSA protections generally require job-based or individual health insurance',
      'Focus on itemized bills, financial assistance, and Medicare benchmarks',
    ],
    protections: [
      'Hospitals must publish certain prices and give uninsured patients a good-faith estimate for scheduled care in many cases.',
      'Many systems offer charity care or prompt-pay discounts — always ask in writing.',
    ],
    actionSteps: [
      'Request an itemized bill and compare line items to Medicare rates using our Fair Price Calculator.',
      'Ask for the hospital financial assistance / charity care policy.',
      'Do not pay a lump sum until you verify each CPT code and date of service.',
    ],
  });
}

function evaluateMedicare(input: SurpriseBillInput): SurpriseBillResult {
  return buildResult(input, {
    riskLevel: 'unclear',
    confidence: 'medium',
    headline: 'Medicare has different rules — verify with Medicare or your plan',
    summary:
      'Traditional Medicare and Medicare Advantage handle out-of-network claims differently. The No Surprises Act targets commercial insurance surprise bills — not Medicare billing in the same way.',
    nsaMayApply: false,
    decisionPath: [
      'Coverage: Medicare (Traditional or Advantage)',
      'NSA balance-billing limits apply to commercial insurance — not Medicare the same way',
      'Use MSN/MA EOB and CMS benchmarks to verify amounts',
    ],
    protections: [
      'Traditional Medicare Part B often covers emergency care broadly; Advantage plans may have network restrictions.',
      'Medicare Summary Notices (MSNs) or MA EOBs show what Medicare approved and what you may owe.',
    ],
    actionSteps: [
      'Review your Medicare Summary Notice or Medicare Advantage EOB for each service date.',
      'Use our Medicare Part B tab on Fair Price for CMS allowed amounts by code and ZIP.',
      'Call 1-800-MEDICARE or your MA plan if provider network status is unclear.',
    ],
  });
}

function evaluateAirAmbulance(input: SurpriseBillInput): SurpriseBillResult {
  if (input.insuranceType !== 'private_insured') {
    return input.insuranceType === 'medicare' ? evaluateMedicare(input) : evaluateUninsured(input);
  }
  return buildResult(input, {
    riskLevel: 'likely_protected',
    headline: 'Air ambulance — federal protections often apply',
    summary:
      'For plan years starting 2022, the No Surprises Act generally limits out-of-network air ambulance balance billing for people with job-based or individual health coverage. You typically owe in-network cost-sharing, not the full billed charge.',
    nsaMayApply: true,
    decisionPath: [
      'Care setting: air ambulance',
      'Coverage: job-based or individual insurance',
      'NSA generally caps patient cost-sharing for out-of-network air ambulance',
    ],
    protections: [
      'Out-of-network air ambulance providers generally cannot balance bill beyond your in-network cost-sharing amount.',
      'You should receive a notice explaining your rights if an out-of-network air ambulance is used.',
    ],
  });
}

function evaluateGroundAmbulance(input: SurpriseBillInput): SurpriseBillResult {
  return buildResult(input, {
    riskLevel: 'elevated_risk',
    confidence: input.insuranceType === 'private_insured' ? 'medium' : 'low',
    headline: 'Ground ambulance — limited federal protection',
    summary:
      'The No Surprises Act does not broadly ban out-of-network balance billing for ground ambulance services. Some states have additional ambulance protections — federal rules alone may not cap your bill.',
    nsaMayApply: false,
    decisionPath: [
      'Care setting: ground ambulance',
      'NSA does not broadly ban ground ambulance balance billing',
      'Check state law and plan out-of-network ambulance benefits',
    ],
    protections: [
      'A few states regulate ground ambulance balance billing; many do not.',
      'Insurance may cover ambulance as out-of-network with higher cost-sharing — check your EOB.',
    ],
    actionSteps: [
      'Ask whether the ambulance company is in-network with your plan.',
      'Request an itemized bill — ambulance bills often combine mileage, supplies, and facility fees.',
      'Look up your state insurance department guidance on ambulance surprise billing.',
    ],
    caveats: [...defaultCaveats(), 'Ground ambulance is one of the most common remaining surprise bill categories after the NSA.'],
  });
}

function evaluateEmergency(input: SurpriseBillInput): SurpriseBillResult {
  if (input.insuranceType !== 'private_insured') {
    return input.insuranceType === 'medicare' ? evaluateMedicare(input) : evaluateUninsured(input);
  }

  return buildResult(input, {
    riskLevel: 'likely_protected',
    headline: 'Emergency care — strong federal surprise-billing protections',
    summary:
      'For emergency services, the No Surprises Act generally requires that out-of-network providers and facilities bill you no more than your in-network cost-sharing (deductible, copay, coinsurance) — even if the ER or hospital is out-of-network.',
    nsaMayApply: true,
    decisionPath: [
      'Emergency care (or ER setting)',
      'Coverage: job-based or individual insurance',
      'NSA emergency rule: in-network cost-sharing even if facility/provider is out-of-network',
      'Advance consent waivers cannot apply to emergency services',
    ],
    protections: [
      'Emergency services at out-of-network hospitals or freestanding ERs: in-network cost-sharing only.',
      'Out-of-network emergency physicians and ER professionals: balance billing generally prohibited.',
      'You cannot be asked to give up these protections in advance for emergency care.',
    ],
  });
}

function applyConsentOverride(
  input: SurpriseBillInput,
  base: SurpriseBillResult,
): SurpriseBillResult {
  if (!consentApplies(input)) return base;

  if (input.consentStatus === 'signed_waiver') {
    return buildResult(input, {
      riskLevel: 'elevated_risk',
      confidence: base.confidence === 'high' ? 'medium' : base.confidence,
      headline: 'You may have waived NSA protections by signing consent',
      summary:
        'For non-emergency care at an in-network facility, providers can sometimes ask you to consent to out-of-network billing at higher rates. If you signed that notice, federal surprise-billing caps may not apply to that provider — even for ancillary services.',
      nsaMayApply: false,
      decisionPath: [
        ...base.decisionPath,
        'You indicated you signed an out-of-network consent / waiver',
        'Signed waiver may remove NSA balance-billing limits for that provider',
      ],
      protections: [
        'A signed consent form for out-of-network care can allow balance billing beyond in-network cost-sharing.',
        'You may still dispute billing errors, duplicate charges, or incorrect network coding.',
      ],
      actionSteps: [
        'Locate any consent or waiver forms you signed at admission or before the procedure.',
        'Ask the provider which specific provider group the waiver covered and on what date.',
        'If you did not understand the form or had no real choice, ask your insurer whether the waiver is valid.',
        ...defaultActions(input),
      ],
      caveats: [
        ...defaultCaveats(),
        'Consent rules are fact-specific — this tool cannot know whether a waiver was legally valid or voluntary.',
      ],
    });
  }

  if (input.consentStatus === 'did_not_sign') {
    return {
      ...base,
      decisionPath: [...base.decisionPath, 'You did not sign an out-of-network consent waiver — NSA ancillary protections may be stronger'],
      protections: [
        'Without a valid signed waiver, out-of-network ancillary providers at in-network facilities generally cannot balance bill beyond in-network cost-sharing.',
        ...base.protections,
      ],
    };
  }

  return base;
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
    return buildResult(input, {
      riskLevel: 'elevated_risk',
      headline: 'Out-of-network facility — NSA surprise protections usually do not apply',
      summary:
        'For non-emergency care at an out-of-network hospital or surgery center, the No Surprises Act generally does not stop the facility from billing out-of-network rates. Your plan may cover little or apply out-of-network cost-sharing.',
      nsaMayApply: false,
      decisionPath: [
        'Non-emergency hospital / outpatient care',
        'Facility: out-of-network',
        'NSA facility-based surprise protections generally require an in-network facility',
      ],
      protections: [
        'You may still have rights under your plan\'s out-of-network benefits — but not the same surprise-billing caps as in-network facility scenarios.',
      ],
    });
  }

  if (facility === 'in_network' && provider === 'out_of_network') {
    const base = buildResult(input, {
      riskLevel: 'likely_protected',
      headline: 'In-network facility + out-of-network provider — classic NSA scenario',
      summary:
        'When you receive non-emergency care at an in-network hospital or ambulatory surgery center, out-of-network ancillary providers (anesthesia, radiology, pathology, assistant surgeons) generally cannot balance bill you beyond in-network cost-sharing.',
      nsaMayApply: true,
      decisionPath: [
        'Non-emergency care at in-network hospital or surgery center',
        'Billing provider: out-of-network',
        'Classic No Surprises Act ancillary professional scenario',
      ],
      protections: [
        'Applies to covered ancillary services at in-network facilities — anesthesia, radiology, hospitalists, and similar out-of-network professionals.',
        'You should receive a written notice before choosing an out-of-network provider when allowed — many ancillary services are not optional.',
      ],
    });
    return applyConsentOverride(input, base);
  }

  if (facility === 'in_network' && provider === 'in_network') {
    return buildResult(input, {
      riskLevel: 'possibly_protected',
      confidence: 'high',
      headline: 'In-network facility and provider — standard plan rules apply',
      summary:
        'When both the facility and the billing provider are in-network, surprise balance billing is less common. Your bill should reflect in-network deductibles, copays, and coinsurance — still verify EOB math.',
      nsaMayApply: false,
      decisionPath: [
        'Facility and billing provider both in-network',
        'Not typically a surprise balance bill — verify amounts against your EOB',
      ],
      protections: ['Standard in-network cost-sharing applies — not typically a surprise-billing scenario.'],
    });
  }

  return buildResult(input, {
    riskLevel: 'unclear',
    confidence: 'low',
    headline: 'Need more network details to assess surprise-bill risk',
    summary:
      'We could not determine facility and provider network status. Surprise-billing protections depend heavily on whether the hospital was in-network and whether the specific doctor was out-of-network.',
    nsaMayApply: false,
    decisionPath: [
      'Network status incomplete or unknown',
      'NSA rules hinge on in-network facility + out-of-network professional pattern',
    ],
    protections: [],
    actionSteps: [
      'Check your EOB for "out-of-network" or "not covered" labels on each line.',
      'Call the hospital billing office and ask if the facility and each professional group were in-network on the date of service.',
      ...defaultActions(input),
    ],
  });
}

function evaluateOfficeClinic(input: SurpriseBillInput): SurpriseBillResult {
  if (input.providerNetwork === 'out_of_network' || input.facilityNetwork === 'out_of_network') {
    return buildResult(input, {
      riskLevel: 'elevated_risk',
      headline: 'Out-of-network office or clinic visit',
      summary:
        'The No Surprises Act surprise-billing rules focus on emergency care, air ambulance, and certain non-emergency hospital settings — not typical out-of-network office visits you chose (or could have avoided).',
      nsaMayApply: false,
      decisionPath: [
        'Care setting: doctor office or clinic',
        'Out-of-network provider or facility',
        'NSA facility-based rules generally do not cover elective office visits',
      ],
      protections: [
        'Your plan\'s out-of-network benefits (or lack thereof) govern what you owe — not NSA facility-based caps.',
      ],
    });
  }
  return buildResult(input, {
    riskLevel: 'possibly_protected',
    confidence: 'medium',
    headline: 'Office or clinic — usually standard in-network billing',
    summary:
      'Routine office visits are typically not "surprise bill" scenarios unless you unknowingly saw an out-of-network provider. Verify network status on your insurer\'s portal.',
    nsaMayApply: false,
    decisionPath: [
      'Office / clinic visit with in-network parties',
      'Lower surprise-bill risk — still verify EOB and network status',
    ],
    protections: [],
  });
}

/**
 * Evaluate surprise balance billing risk under federal No Surprises Act rules (educational).
 * Does not determine legal outcomes or guaranteed savings.
 */
export function checkSurpriseBill(input: SurpriseBillInput): SurpriseBillResult {
  const normalized: SurpriseBillInput = {
    ...input,
    providerRole: input.providerRole ?? 'unknown',
    consentStatus: input.consentStatus ?? 'not_applicable',
    billSource: input.billSource ?? 'unknown',
  };

  if (normalized.insuranceType === 'uninsured') return evaluateUninsured(normalized);
  if (normalized.insuranceType === 'medicare') return evaluateMedicare(normalized);
  if (normalized.insuranceType === 'unknown') {
    return buildResult(normalized, {
      riskLevel: 'unclear',
      confidence: 'low',
      headline: 'Select your coverage type for a meaningful result',
      summary:
        'Surprise-billing protections differ sharply for uninsured patients, Medicare beneficiaries, and people with job-based or marketplace insurance.',
      nsaMayApply: false,
      decisionPath: ['Insurance coverage type not selected', 'NSA screening requires knowing your coverage category'],
      protections: [],
    });
  }

  if (normalized.careSetting === 'ambulance_air') return evaluateAirAmbulance(normalized);
  if (normalized.careSetting === 'ambulance_ground') return evaluateGroundAmbulance(normalized);
  if (isEmergencyContext(normalized)) return evaluateEmergency(normalized);

  if (
    normalized.careSetting === 'hospital_inpatient' ||
    normalized.careSetting === 'hospital_outpatient' ||
    normalized.careSetting === 'er_emergency'
  ) {
    return evaluateNonEmergencyFacility(
      normalized,
      normalized.facilityNetwork,
      normalized.providerNetwork,
    );
  }

  if (normalized.careSetting === 'office_clinic') return evaluateOfficeClinic(normalized);

  return evaluateNonEmergencyFacility(
    normalized,
    normalized.facilityNetwork,
    normalized.providerNetwork,
  );
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

export const PROVIDER_ROLE_LABELS: Record<ProviderRole, string> = {
  anesthesiologist: 'Anesthesiologist',
  er_physician: 'ER / emergency physician',
  radiology: 'Radiology / imaging',
  pathology: 'Pathology / lab professional',
  hospitalist: 'Hospitalist',
  surgeon: 'Surgeon',
  assistant_surgeon: 'Assistant surgeon',
  ambulance: 'Ambulance company',
  lab: 'Laboratory',
  primary_care: 'Primary care / specialist office',
  other: 'Other provider',
  unknown: 'Not sure',
};

export const CONSENT_LABELS: Record<ConsentStatus, string> = {
  did_not_sign: 'No — I did not sign an out-of-network consent form',
  signed_waiver: 'Yes — I signed a notice allowing out-of-network billing',
  not_sure: 'Not sure',
  not_applicable: 'Not applicable',
};

export const BILL_SOURCE_LABELS: Record<BillSource, string> = {
  facility: 'Hospital / facility bill',
  professional: 'Doctor or professional bill',
  both: 'Both facility and professional bills',
  unknown: 'Not sure',
};

export const RISK_LABELS: Record<SurpriseBillResult['riskLevel'], string> = {
  likely_protected: 'Protections likely apply',
  possibly_protected: 'Standard billing — verify amounts',
  elevated_risk: 'Elevated surprise-bill risk',
  unclear: 'Need more information',
};

export const NSA_COVERAGE_LANES = [
  {
    id: 'emergency',
    title: 'Emergency care',
    detail: 'In-network cost-sharing even if ER or hospital is out-of-network',
    level: 'strong' as const,
  },
  {
    id: 'air',
    title: 'Air ambulance',
    detail: 'Balance billing generally capped for insured patients',
    level: 'strong' as const,
  },
  {
    id: 'ancillary',
    title: 'In-network hospital + OON doctor',
    detail: 'Anesthesia, radiology, pathology, and similar ancillary pros',
    level: 'strong' as const,
  },
  {
    id: 'ground',
    title: 'Ground ambulance',
    detail: 'Limited federal protection — many states vary',
    level: 'weak' as const,
  },
  {
    id: 'office',
    title: 'Elective out-of-network office',
    detail: 'Plan out-of-network rules apply — not typical NSA scenario',
    level: 'weak' as const,
  },
];
