import {
  formatUsd,
  isPriceLookupError,
  loadPricingData,
  lookupPrice,
} from '../lib/pricing';
import type { PriceLookupResult } from '../lib/pricing';
import { bootOnReady } from '../lib/dom/boot';
import { bindToolExamples } from './tool-examples';

function renderMedicareResults(container: HTMLElement, result: PriceLookupResult) {
  const noticeClass = `locality-notice locality-notice--${result.localityNotice.type}`;

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
    <div class="price-results card" role="region" aria-live="polite">
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
          <dt>Locality</dt>
          <dd>${result.localityLabel ?? 'National median'}</dd>
        </div>
        <div>
          <dt>Data confidence</dt>
          <dd><span class="confidence confidence--${result.confidence}">${result.confidence}</span></dd>
        </div>
      </dl>
      ${facilityHtml}
      <p class="price-results__note">
        Part B deductible and coinsurance still apply.
        <a href="/methodology/price-benchmarks/">Methodology</a> ·
        <a href="/tools/fair-price/?code=${result.code}">Compare with fair range</a>
      </p>
    </div>`;
  container.hidden = false;
}

export async function initMedicareLookup(root: ParentNode = document) {
  const form = root.querySelector<HTMLFormElement>('#medicare-lookup-form');
  const cpt = root.querySelector<HTMLInputElement>('#cpt');
  const zip = root.querySelector<HTMLInputElement>('#zip');
  const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  const results = root.querySelector<HTMLElement>('#medicare-lookup-results');
  const error = root.querySelector<HTMLElement>('#medicare-lookup-error');
  if (!form || !cpt || !submit) return;

  bindToolExamples(root, 'medicare-lookup', 'medicare-lookup-form');

  let dataPromise: ReturnType<typeof loadPricingData> | null = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
    if (results) {
      results.innerHTML = '';
      results.hidden = true;
    }

    submit.disabled = true;
    try {
      const { mpfs, zipMap } = await (dataPromise ??= loadPricingData());
      const outcome = lookupPrice({ code: cpt.value, zip: zip?.value }, mpfs, zipMap);
      if (isPriceLookupError(outcome)) {
        if (error) {
          error.textContent = outcome.message;
          error.hidden = false;
        }
        return;
      }
      if (results) renderMedicareResults(results, outcome);
    } catch {
      if (error) {
        error.textContent = 'Could not load Medicare data. Try again.';
        error.hidden = false;
      }
    } finally {
      submit.disabled = false;
    }
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initMedicareLookup());
}
