import {
  checkSurpriseBill,
  CARE_SETTING_LABELS,
  INSURANCE_LABELS,
  NETWORK_LABELS,
  RISK_LABELS,
} from '../lib/surprise-bill/check';
import type {
  CareSetting,
  InsuranceType,
  NetworkStatus,
  SurpriseBillInput,
} from '../lib/surprise-bill/types';
import { bootOnReady } from '../lib/dom/boot';

function readRadio(form: HTMLFormElement, name: string): string {
  const checked = form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return checked?.value ?? '';
}

function readInput(form: HTMLFormElement): SurpriseBillInput {
  return {
    careSetting: readRadio(form, 'care-setting') as CareSetting,
    isEmergency: readRadio(form, 'is-emergency') === 'yes',
    facilityNetwork: readRadio(form, 'facility-network') as NetworkStatus,
    providerNetwork: readRadio(form, 'provider-network') as NetworkStatus,
    insuranceType: readRadio(form, 'insurance-type') as InsuranceType,
  };
}

function riskClass(level: string): string {
  if (level === 'likely_protected') return 'surprise-risk--protected';
  if (level === 'possibly_protected') return 'surprise-risk--normal';
  if (level === 'elevated_risk') return 'surprise-risk--elevated';
  return 'surprise-risk--unclear';
}

function confidenceLabel(c: string): string {
  return c === 'high' ? 'High' : c === 'medium' ? 'Medium' : 'Low';
}

function toggleEmergencyVisibility(form: HTMLFormElement) {
  const care = readRadio(form, 'care-setting');
  const emergencyField = form.querySelector<HTMLElement>('#emergency-field');
  if (!emergencyField) return;
  const hide = care === 'ambulance_air' || care === 'ambulance_ground' || care === 'er_emergency';
  emergencyField.hidden = hide;
}

export function initSurpriseBillCheck(root: ParentNode = document) {
  const form = root.querySelector<HTMLFormElement>('#surprise-bill-form');
  const results = root.querySelector<HTMLElement>('#surprise-bill-results');
  const error = root.querySelector<HTMLElement>('#surprise-bill-error');
  if (!form) return;

  form.addEventListener('change', () => toggleEmergencyVisibility(form));
  toggleEmergencyVisibility(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
    if (results) {
      results.innerHTML = '';
      results.hidden = true;
    }

    const input = readInput(form);
    if (!input.careSetting || !input.insuranceType) {
      if (error) {
        error.textContent = 'Please answer all required questions.';
        error.hidden = false;
      }
      return;
    }

    const result = checkSurpriseBill(input);

    if (results) {
      results.innerHTML = `
        <div class="surprise-results card ${riskClass(result.riskLevel)}" role="region" aria-live="polite">
          <div class="surprise-results__badge">
            <span class="surprise-results__risk">${RISK_LABELS[result.riskLevel]}</span>
            <span class="confidence confidence--${result.confidence}">${confidenceLabel(result.confidence)} confidence</span>
            ${result.nsaMayApply ? '<span class="surprise-results__nsa">Federal NSA may apply</span>' : ''}
          </div>
          <h2>${result.headline}</h2>
          <p class="surprise-results__summary">${result.summary}</p>
          ${
            result.protections.length
              ? `<section><h3>Protections that may apply</h3><ul>${result.protections.map((p) => `<li>${p}</li>`).join('')}</ul></section>`
              : ''
          }
          <section><h3>Suggested next steps</h3><ul>${result.actionSteps.map((s) => `<li>${s}</li>`).join('')}</ul></section>
          <section class="surprise-caveats"><h3>Important caveats</h3><ul>${result.caveats.map((c) => `<li>${c}</li>`).join('')}</ul></section>
          <p class="surprise-cta">
            <a href="/tools/fair-price/">Fair Price Calculator</a> ·
            <a href="/tools/eob-analyzer/">EOB Analyzer</a> ·
            <a href="/learn/how-to-read-eob/">How to read an EOB</a>
          </p>
        </div>`;
      results.hidden = false;
    }
  });
}

export { CARE_SETTING_LABELS, INSURANCE_LABELS, NETWORK_LABELS };

if (typeof document !== 'undefined') {
  bootOnReady(() => initSurpriseBillCheck());
}
