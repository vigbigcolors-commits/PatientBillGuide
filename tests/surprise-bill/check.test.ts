import { describe, expect, it } from 'vitest';
import {
  checkSurpriseBill,
  RISK_LABELS,
} from '../../src/lib/surprise-bill/check';
import type { SurpriseBillInput } from '../../src/lib/surprise-bill/types';

function base(overrides: Partial<SurpriseBillInput> = {}): SurpriseBillInput {
  return {
    careSetting: 'hospital_outpatient',
    isEmergency: false,
    facilityNetwork: 'in_network',
    providerNetwork: 'out_of_network',
    insuranceType: 'private_insured',
    ...overrides,
  };
}

describe('checkSurpriseBill', () => {
  it('flags classic in-network facility + OON provider as likely protected', () => {
    const r = checkSurpriseBill(base());
    expect(r.riskLevel).toBe('likely_protected');
    expect(r.nsaMayApply).toBe(true);
    expect(r.confidence).toBe('high');
  });

  it('protects emergency care for privately insured patients', () => {
    const r = checkSurpriseBill(
      base({
        careSetting: 'er_emergency',
        isEmergency: true,
        facilityNetwork: 'out_of_network',
        providerNetwork: 'out_of_network',
      }),
    );
    expect(r.riskLevel).toBe('likely_protected');
    expect(r.nsaMayApply).toBe(true);
  });

  it('elevates risk for non-emergency OON facility', () => {
    const r = checkSurpriseBill(
      base({
        facilityNetwork: 'out_of_network',
        providerNetwork: 'out_of_network',
      }),
    );
    expect(r.riskLevel).toBe('elevated_risk');
    expect(r.nsaMayApply).toBe(false);
  });

  it('warns on ground ambulance without broad NSA protection', () => {
    const r = checkSurpriseBill(
      base({
        careSetting: 'ambulance_ground',
        providerNetwork: 'out_of_network',
      }),
    );
    expect(r.riskLevel).toBe('elevated_risk');
    expect(r.nsaMayApply).toBe(false);
    expect(r.summary).toMatch(/ground ambulance/i);
  });

  it('protects air ambulance for privately insured', () => {
    const r = checkSurpriseBill(
      base({
        careSetting: 'ambulance_air',
        providerNetwork: 'out_of_network',
      }),
    );
    expect(r.riskLevel).toBe('likely_protected');
    expect(r.nsaMayApply).toBe(true);
  });

  it('routes uninsured patients to negotiation guidance', () => {
    const r = checkSurpriseBill(base({ insuranceType: 'uninsured' }));
    expect(r.riskLevel).toBe('elevated_risk');
    expect(r.nsaMayApply).toBe(false);
    expect(r.summary).toMatch(/uninsured|without coverage/i);
  });

  it('returns unclear when insurance type unknown', () => {
    const r = checkSurpriseBill(base({ insuranceType: 'unknown' }));
    expect(r.riskLevel).toBe('unclear');
    expect(r.confidence).toBe('low');
  });

  it('lowers confidence when network status unknown', () => {
    const r = checkSurpriseBill(
      base({
        facilityNetwork: 'unknown',
        providerNetwork: 'unknown',
      }),
    );
    expect(r.confidence).toBe('low');
  });

  it('never uses fraud language in output', () => {
    const scenarios: SurpriseBillInput[] = [
      base(),
      base({ careSetting: 'er_emergency', isEmergency: true }),
      base({ insuranceType: 'uninsured' }),
    ];
    for (const input of scenarios) {
      const r = checkSurpriseBill(input);
      const blob = [r.headline, r.summary, ...r.protections, ...r.caveats].join(' ');
      expect(blob.toLowerCase()).not.toMatch(/\bfraud\b/);
      expect(blob.toLowerCase()).not.toMatch(/guaranteed savings/);
    }
  });

  it('includes human-readable risk labels for all levels', () => {
    expect(RISK_LABELS.likely_protected).toBeTruthy();
    expect(RISK_LABELS.elevated_risk).toBeTruthy();
  });
});
