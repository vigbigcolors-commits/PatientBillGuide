import {
  formatUsd,
  isPriceLookupError,
  loadPricingData,
  lookupPrice,
  parseCurrency,
  estimatePartBCost,
  type PriceLookupResult,
} from '../lib/pricing';
import { bootOnReady } from '../lib/dom/boot';
import { bindToolExamples } from './tool-examples';

export type PriceCheckMode = 'fair' | 'medicare';

function getFormElements(root: ParentNode = document) {
  return {
    form: root.querySelector<HTMLFormElement>('#fair-price-form'),
    cpt: root.querySelector<HTMLInputElement>('#cpt'),
    zip: root.querySelector<HTMLInputElement>('#zip'),
    price: root.querySelector<HTMLInputElement>('#price'),
    deductibleMet: root.querySelector<HTMLInputElement>('#deductible-met'),
    submit: root.querySelector<HTMLButtonElement>('#fair-price-form button[type="submit"]'),
    submitLabel: root.querySelector<HTMLSpanElement>('#fair-price-submit-label'),
    results: root.querySelector<HTMLElement>('#fair-price-results'),
    error: root.querySelector<HTMLElement>('#fair-price-error'),
    tabs: root.querySelectorAll<HTMLButtonElement>('[data-price-tab]'),
    priceField: root.querySelector<HTMLElement>('[data-field="price"]'),
    deductibleField: root.querySelector<HTMLElement>('[data-field="deductible"]'),
  };
}

function renderFairResults(container: HTMLElement, result: PriceLookupResult) {
  const confidenceLabel = { high: 'High', medium: 'Medium', low: 'Low' }[result.confidence];
  const noticeClass = `locality-notice locality-notice--${result.localityNotice.type}`;
  const locality =
    result.localitySource === 'zip' && result.localityLabel
      ? result.localityLabel
      : 'National median';

  let comparisonHtml = '';
  if (result.userComparison) {
    const statusClass = `result-comparison--${result.userComparison.status}`;
    comparisonHtml = `
      <div class="result-comparison ${statusClass}">
        <h3>${result.userComparison.headline}</h3>
        <p class="result-comparison__charged">Your charge: <strong>${formatUsd(result.userComparison.charged)}</strong></p>
        <p>${result.userComparison.detail}</p>
      </div>`;
  }

  let facilityHtml = '';
  if (result.facilityFeeNotice) {
    const levelClass = `facility-fee-notice--${result.facilityFeeNotice.level}`;
    facilityHtml = `
      <div class="facility-fee-notice ${levelClass}" role="note">
        <p class="facility-fee-notice__headline">${result.facilityFeeNotice.headline}</p>
        <p class="facility-fee-notice__detail">${result.facilityFeeNotice.detail}</p>
        <p class="facility-fee-notice__link"><a href="/learn/how-to-read-medical-bill/#facility-professional">Facility vs professional fees →</a></p>
      </div>`;
  }

  container.innerHTML = `
    <div class="price-results card" role="region" aria-live="polite" aria-label="Price check results">
      <div class="${noticeClass}" role="status">${result.localityNotice.message}</div>
      <header class="price-results__header">
        <span class="price-results__code">CPT ${result.code}</span>
        <h2 class="price-results__title">${result.description}</h2>
      </header>
      <dl class="price-results__grid">
        <div>
          <dt>Medicare allowed</dt>
          <dd>${formatUsd(result.medicareAllowed)}</dd>
        </div>
        <div>
          <dt>Fair range (1.5×–2.5×)</dt>
          <dd>${formatUsd(result.fairRangeLow)} – ${formatUsd(result.fairRangeHigh)}</dd>
        </div>
        <div>
          <dt>Locality</dt>
          <dd>${locality}</dd>
        </div>
        <div>
          <dt>Data confidence</dt>
          <dd><span class="confidence confidence--${result.confidence}">${confidenceLabel}</span></dd>
        </div>
      </dl>
      ${facilityHtml}
      ${comparisonHtml}
      <p class="price-results__note">
        Based on CMS Physician Fee Schedule (${result.dataVersion}).
        <a href="/methodology/price-benchmarks/">How we calculate fair range</a>
      </p>
      <p class="price-results__cta">
        <a href="/codes/cpt/${result.code}/">Learn more about CPT ${result.code}</a>
      </p>
    </div>`;
  container.hidden = false;
}

function renderMedicareResults(container: HTMLElement, result: PriceLookupResult, deductibleMet: number) {
  const noticeClass = `locality-notice locality-notice--${result.localityNotice.type}`;
  const partB = estimatePartBCost({ medicareAllowed: result.medicareAllowed, deductibleMet });

  let facilityHtml = '';
  if (result.facilityFeeNotice) {
    const levelClass = `facility-fee-notice--${result.facilityFeeNotice.level}`;
    facilityHtml = `
      <div class="facility-fee-notice ${levelClass}" role="note">
        <p class="facility-fee-notice__headline">${result.facilityFeeNotice.headline}</p>
        <p class="facility-fee-notice__detail">${result.facilityFeeNotice.detail}</p>
      </div>`;
  }

  container.innerHTML = `
    <div class="price-results card" role="region" aria-live="polite" aria-label="Medicare Part B estimate">
      <div class="${noticeClass}" role="status">${result.localityNotice.message}</div>
      <header class="price-results__header">
        <span class="price-results__code">CPT ${result.code}</span>
        <h2 class="price-results__title">${result.description}</h2>
      </header>
      <dl class="price-results__grid">
        <div>
          <dt>Medicare allowed (2026 MPFS)</dt>
          <dd class="medicare-amount">${formatUsd(result.medicareAllowed)}</dd>
        </div>
        <div>
          <dt>Medicare pays (typical 80%)</dt>
          <dd>${formatUsd(partB.medicarePays)}</dd>
        </div>
        <div>
          <dt>Your coinsurance (typical 20%)</dt>
          <dd>${formatUsd(partB.patientCoinsurance)}</dd>
        </div>
        <div>
          <dt>Locality</dt>
          <dd>${result.localityLabel ?? 'National median'}</dd>
        </div>
      </dl>
      <div class="part-b-estimate" role="note">
        <p class="part-b-estimate__headline">${partB.headline}</p>
        <p class="part-b-estimate__detail">${partB.detail}</p>
      </div>
      ${facilityHtml}
      <p class="price-results__note">
        Estimate only — not your EOB. Medigap, Medicare Advantage, and Medicaid change what you owe.
        <a href="/methodology/price-benchmarks/">Methodology</a>
      </p>
    </div>`;
  container.hidden = false;
}

function showError(el: HTMLElement | null, message: string) {
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
}

function hideError(el: HTMLElement | null) {
  if (!el) return;
  el.textContent = '';
  el.hidden = true;
}

function setMode(root: ParentNode, mode: PriceCheckMode) {
  const { tabs, priceField, deductibleField, submitLabel } = getFormElements(root);
  tabs.forEach((tab) => {
    const active = tab.dataset.priceTab === mode;
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
    tab.classList.toggle('tool-tab--active', active);
  });
  if (priceField) priceField.hidden = mode === 'medicare';
  if (deductibleField) deductibleField.hidden = mode === 'fair';
  if (submitLabel) {
    submitLabel.textContent = mode === 'medicare' ? 'Estimate Part B cost' : 'Check price';
  }
}

export async function initFairPriceForm(root: ParentNode = document) {
  const { form, cpt, zip, price, deductibleMet, submit, results, error, tabs } = getFormElements(root);
  if (!form || !cpt || !submit) return;

  submit.disabled = false;
  const note = form.querySelector('.calculator__note');
  if (note) note.remove();

  let mode: PriceCheckMode = 'fair';
  const params = new URLSearchParams(window.location.search);
  if (params.get('tab') === 'medicare') mode = 'medicare';
  setMode(root, mode);

  let dataPromise: ReturnType<typeof loadPricingData> | null = null;
  const getData = () => {
    if (!dataPromise) dataPromise = loadPricingData();
    return dataPromise;
  };

  bindToolExamples(root, 'fair-price', 'fair-price-form');

  const presetCode = params.get('code');
  if (presetCode && cpt) cpt.value = presetCode;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const next = tab.dataset.priceTab as PriceCheckMode | undefined;
      if (!next || next === mode) return;
      mode = next;
      setMode(root, mode);
      if (results) {
        results.innerHTML = '';
        results.hidden = true;
      }
      hideError(error);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError(error);
    if (results) {
      results.innerHTML = '';
      results.hidden = true;
    }

    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');

    try {
      const { mpfs, zipMap } = await getData();
      const chargedRaw = price?.value?.trim() ?? '';
      const outcome = lookupPrice(
        {
          code: cpt.value,
          zip: zip?.value,
          chargedAmount:
            mode === 'fair' && chargedRaw ? (parseCurrency(chargedRaw) ?? undefined) : undefined,
          chargedAmountRaw: mode === 'fair' && chargedRaw ? chargedRaw : undefined,
        },
        mpfs,
        zipMap,
      );

      if (isPriceLookupError(outcome)) {
        showError(error, outcome.message);
        return;
      }

      if (results) {
        if (mode === 'medicare') {
          const met = parseCurrency(deductibleMet?.value?.trim() ?? '') ?? 0;
          renderMedicareResults(results, outcome, met);
        } else {
          renderFairResults(results, outcome);
        }
      }
    } catch {
      showError(error, 'Could not load price data. Check your connection and try again.');
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initFairPriceForm());
}
