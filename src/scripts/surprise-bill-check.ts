import {
  checkSurpriseBill,
  RISK_LABELS,
} from '../lib/surprise-bill/check';
import type {
  BillSource,
  CareSetting,
  ConsentStatus,
  InsuranceType,
  NetworkStatus,
  ProviderRole,
  SurpriseBillInput,
  SurpriseBillResult,
} from '../lib/surprise-bill/types';
import { bootOnReady } from '../lib/dom/boot';
import { bindToolExamples } from './tool-examples';

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
    providerRole: (readRadio(form, 'provider-role') || 'unknown') as ProviderRole,
    consentStatus: (readRadio(form, 'consent-status') || 'not_applicable') as ConsentStatus,
    billSource: (readRadio(form, 'bill-source') || 'unknown') as BillSource,
  };
}

function riskClass(level: SurpriseBillResult['riskLevel']): string {
  if (level === 'likely_protected') return 'surprise-risk--protected';
  if (level === 'possibly_protected') return 'surprise-risk--normal';
  if (level === 'elevated_risk') return 'surprise-risk--elevated';
  return 'surprise-risk--unclear';
}

function confidenceLabel(c: string): string {
  return c === 'high' ? 'High' : c === 'medium' ? 'Medium' : 'Low';
}

function isEmergencyContext(input: SurpriseBillInput): boolean {
  return input.isEmergency || input.careSetting === 'er_emergency';
}

function consentFieldApplies(input: SurpriseBillInput): boolean {
  return (
    input.insuranceType === 'private_insured' &&
    !isEmergencyContext(input) &&
    input.careSetting !== 'ambulance_air' &&
    input.careSetting !== 'ambulance_ground' &&
    input.facilityNetwork === 'in_network' &&
    input.providerNetwork === 'out_of_network'
  );
}

function providerFieldApplies(input: SurpriseBillInput): boolean {
  return (
    input.careSetting === 'hospital_inpatient' ||
    input.careSetting === 'hospital_outpatient' ||
    input.careSetting === 'er_emergency' ||
    input.careSetting === 'ambulance_air' ||
    input.careSetting === 'ambulance_ground'
  );
}

export function updateSurpriseBillFields(form: HTMLFormElement): void {
  const input = readInput(form);
  const emergencyField = form.querySelector<HTMLElement>('#emergency-field');
  const consentField = form.querySelector<HTMLElement>('[data-field="consent"]');
  const providerField = form.querySelector<HTMLElement>('[data-field="provider-role"]');
  const facilityField = form.querySelector<HTMLElement>('[data-field="facility-network"]');

  const hideEmergency =
    input.careSetting === 'ambulance_air' ||
    input.careSetting === 'ambulance_ground' ||
    input.careSetting === 'er_emergency';

  if (emergencyField) emergencyField.hidden = hideEmergency;

  if (consentField) consentField.hidden = !consentFieldApplies(input);
  if (providerField) providerField.hidden = !providerFieldApplies(input);

  const hideFacility =
    input.careSetting === 'ambulance_air' || input.careSetting === 'ambulance_ground';
  if (facilityField) facilityField.hidden = hideFacility;
}

function renderResults(container: HTMLElement, result: SurpriseBillResult) {
  const pathHtml = result.decisionPath
    .map((step, i) => `<li><span class="surprise-path__num">${i + 1}</span>${step}</li>`)
    .join('');

  const timelineHtml = result.timeline
    .map((t) => `<li><strong>${t.phase}</strong> — ${t.action}</li>`)
    .join('');

  const toolsHtml = result.toolLinks
    .map((link) => {
      const cls = link.emphasis ? 'surprise-tool-link surprise-tool-link--primary' : 'surprise-tool-link';
      return `<a class="${cls}" href="${link.href}">${link.label}</a>`;
    })
    .join('');

  const disputeCta = result.disputeLetterHref
    ? `<div class="surprise-dispute-cta">
        <p><strong>Next step:</strong> If protections likely apply, draft a surprise-bill dispute letter.</p>
        <a class="btn btn--primary" href="${result.disputeLetterHref}">Open dispute letter template</a>
      </div>`
    : '';

  container.innerHTML = `
    <div class="surprise-results card ${riskClass(result.riskLevel)}" role="region" aria-live="polite">
      <div class="surprise-results__badge">
        <span class="surprise-results__risk">${RISK_LABELS[result.riskLevel]}</span>
        <span class="confidence confidence--${result.confidence}">${confidenceLabel(result.confidence)} confidence</span>
        ${result.nsaMayApply ? '<span class="surprise-results__nsa">Federal NSA may apply</span>' : ''}
      </div>
      <h2 class="surprise-results__headline" tabindex="-1">${result.headline}</h2>
      <p class="surprise-results__summary">${result.summary}</p>

      <section class="surprise-path">
        <h3>How we reached this screening</h3>
        <ol class="surprise-path__list">${pathHtml}</ol>
      </section>

      ${
        result.protections.length
          ? `<section class="surprise-section"><h3>Protections that may apply</h3><ul>${result.protections.map((p) => `<li>${p}</li>`).join('')}</ul></section>`
          : ''
      }

      <section class="surprise-section">
        <h3>Suggested next steps</h3>
        <ul>${result.actionSteps.map((s) => `<li>${s}</li>`).join('')}</ul>
      </section>

      <section class="surprise-section surprise-timeline">
        <h3>Timeline</h3>
        <ul>${timelineHtml}</ul>
      </section>

      ${disputeCta}

      <section class="surprise-caveats">
        <h3>Important caveats</h3>
        <ul>${result.caveats.map((c) => `<li>${c}</li>`).join('')}</ul>
      </section>

      <div class="surprise-tools">${toolsHtml}</div>
    </div>`;
  container.hidden = false;
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  container.querySelector<HTMLElement>('.surprise-results__headline')?.focus({ preventScroll: true });
}

export function initSurpriseBillCheck(root: ParentNode = document) {
  const form = root.querySelector<HTMLFormElement>('#surprise-bill-form');
  const results = root.querySelector<HTMLElement>('#surprise-bill-results');
  const error = root.querySelector<HTMLElement>('#surprise-bill-error');
  if (!form) return;

  bindToolExamples(root, 'surprise-bill', 'surprise-bill-form');

  const params = new URLSearchParams(window.location.search);
  const scenario = params.get('scenario');
  if (scenario) {
    const btn = root.querySelector<HTMLButtonElement>(`[data-example-id="${scenario}"]`);
    btn?.click();
  }

  form.addEventListener('change', () => updateSurpriseBillFields(form));
  updateSurpriseBillFields(form);

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
    if (results) renderResults(results, result);
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initSurpriseBillCheck());
}
