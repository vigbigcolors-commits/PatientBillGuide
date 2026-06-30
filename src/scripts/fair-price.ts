import {
  formatUsd,
  isPriceLookupError,
  loadPricingData,
  lookupPrice,
  parseCurrency,
  analyzePartBCost,
  prefetchPricingData,
  type PriceLookupResult,
} from '../lib/pricing';
import { bootOnReady } from '../lib/dom/boot';
import type { PartBAnalysis } from '../lib/pricing/medicare-part-b';
import { bindToolExamples } from './tool-examples';
import { bindCptTypeahead } from './cpt-typeahead';

export type PriceCheckMode = 'fair' | 'medicare';

function getFormElements(root: ParentNode = document) {
  return {
    form: root.querySelector<HTMLFormElement>('#fair-price-form'),
    panel: root.querySelector<HTMLElement>('#calculator-panel'),
    cpt: root.querySelector<HTMLInputElement>('#cpt'),
    zip: root.querySelector<HTMLInputElement>('#zip'),
    price: root.querySelector<HTMLInputElement>('#price'),
    deductibleMet: root.querySelector<HTMLInputElement>('#deductible-met'),
    submit: root.querySelector<HTMLButtonElement>('#fair-price-form button[type="submit"]'),
    submitLabel: root.querySelector<HTMLSpanElement>('#fair-price-submit-label'),
    results: root.querySelector<HTMLElement>('#fair-price-results'),
    error: root.querySelector<HTMLElement>('#fair-price-error'),
    loading: root.querySelector<HTMLElement>('#fair-price-loading'),
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
        <h2 class="price-results__title" tabindex="-1">${result.description}</h2>
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
  const partB: PartBAnalysis = analyzePartBCost({ medicareAllowed: result.medicareAllowed, deductibleMet });
  const confidenceLabel = { high: 'High', medium: 'Medium', low: 'Low' }[result.confidence];
  const locality =
    result.localitySource === 'zip' && result.localityLabel
      ? result.localityLabel
      : 'National median';

  const deductibleProgress = Math.min(
    100,
    Math.round(((partB.deductibleMetInput + partB.deductibleApplied) / partB.annualDeductible) * 100),
  );

  let facilityHtml = '';
  if (result.facilityFeeNotice) {
    const levelClass = `facility-fee-notice--${result.facilityFeeNotice.level}`;
    facilityHtml = `
      <div class="facility-fee-notice ${levelClass}" role="note">
        <p class="facility-fee-notice__headline">${result.facilityFeeNotice.headline}</p>
        <p class="facility-fee-notice__detail">${result.facilityFeeNotice.detail}</p>
      </div>`;
  }

  const checksHtml = partB.checksRun
    .map((step, i) => `<li><span class="part-b-path__num">${i + 1}</span>${step}</li>`)
    .join('');

  const toolLinks = `
    <a class="part-b-tool-link part-b-tool-link--primary" href="/for/seniors-medicare/">Medicare guide</a>
    <a class="part-b-tool-link" href="/tools/bill-auditor/">Bill Auditor</a>
    <a class="part-b-tool-link" href="/tools/eob-analyzer/">EOB Analyzer</a>
    <a class="part-b-tool-link" href="/learn/how-to-read-eob/">How to read an EOB</a>
  `;

  container.innerHTML = `
    <div class="price-results card part-b-results" role="region" aria-live="polite" aria-label="Medicare Part B estimate">
      <div class="${noticeClass}" role="status">${result.localityNotice.message}</div>
      <header class="price-results__header">
        <span class="price-results__code">CPT ${result.code}</span>
        <h2 class="price-results__title" tabindex="-1">${result.description}</h2>
      </header>

      <div class="part-b-owe-highlight" role="status">
        <span class="part-b-owe-highlight__label">Your estimated share</span>
        <span class="part-b-owe-highlight__amount">${formatUsd(partB.patientShare)}</span>
      </div>

      <div class="part-b-deductible-track" role="group" aria-label="Part B deductible progress">
        <div class="part-b-deductible-track__header">
          <span>2026 Part B deductible progress</span>
          <span>${formatUsd(partB.deductibleMetInput + partB.deductibleApplied)} / ${formatUsd(partB.annualDeductible)}</span>
        </div>
        <div class="part-b-deductible-track__bar" aria-hidden="true">
          <span class="part-b-deductible-track__fill" style="width: ${deductibleProgress}%"></span>
        </div>
        <p class="part-b-deductible-track__hint">
          ${partB.deductibleFullyMet
            ? 'Annual deductible met — future services use 80/20 coinsurance only.'
            : `${formatUsd(partB.deductibleRemaining)} remaining before Medicare pays its 80% share.`}
        </p>
      </div>

      <div class="part-b-breakdown" role="group" aria-label="Cost split on this service">
        <p class="part-b-breakdown__title">How this ${formatUsd(partB.medicareAllowed)} allowed amount splits</p>
        <div class="part-b-breakdown__bar" aria-hidden="true">
          ${partB.deductiblePct > 0 ? `<span class="part-b-breakdown__seg part-b-breakdown__seg--deductible" style="width:${partB.deductiblePct}%"></span>` : ''}
          ${partB.coinsurancePct > 0 ? `<span class="part-b-breakdown__seg part-b-breakdown__seg--coinsurance" style="width:${partB.coinsurancePct}%"></span>` : ''}
          ${partB.medicarePct > 0 ? `<span class="part-b-breakdown__seg part-b-breakdown__seg--medicare" style="width:${partB.medicarePct}%"></span>` : ''}
        </div>
        <ul class="part-b-breakdown__legend">
          ${partB.deductibleApplied > 0 ? `<li><span class="part-b-breakdown__dot part-b-breakdown__dot--deductible"></span>You — deductible: ${formatUsd(partB.deductibleApplied)}</li>` : ''}
          ${partB.coinsuranceAmount > 0 ? `<li><span class="part-b-breakdown__dot part-b-breakdown__dot--coinsurance"></span>You — coinsurance (20%): ${formatUsd(partB.coinsuranceAmount)}</li>` : ''}
          ${partB.medicarePays > 0 ? `<li><span class="part-b-breakdown__dot part-b-breakdown__dot--medicare"></span>Medicare pays (80%): ${formatUsd(partB.medicarePays)}</li>` : ''}
        </ul>
      </div>

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
          <dt>Your coinsurance (20%)</dt>
          <dd>${formatUsd(partB.coinsuranceAmount)}</dd>
        </div>
        <div>
          <dt>Toward deductible (this service)</dt>
          <dd>${formatUsd(partB.deductibleApplied)}</dd>
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

      <div class="part-b-estimate" role="note">
        <p class="part-b-estimate__headline">${partB.headline}</p>
        <p class="part-b-estimate__detail">${partB.detail}</p>
      </div>

      ${facilityHtml}

      <section class="part-b-path">
        <h3>Checks performed</h3>
        <ol class="part-b-path__list">${checksHtml}</ol>
      </section>

      <section class="part-b-next-steps">
        <h3>Suggested next steps</h3>
        <ul>${partB.nextSteps.map((s) => `<li>${s}</li>`).join('')}</ul>
      </section>

      <div class="part-b-tools">${toolLinks}</div>

      <p class="price-results__note">
        Estimate only — not your EOB or MSN. Medigap, Medicare Advantage, Medicaid, and employer retiree plans change what you owe.
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

function setLoading(el: HTMLElement | null, active: boolean) {
  if (!el) return;
  el.hidden = !active;
}

function setMode(root: ParentNode, mode: PriceCheckMode) {
  const { form, tabs, panel, priceField, deductibleField, submitLabel } = getFormElements(root);
  tabs.forEach((tab) => {
    const active = tab.dataset.priceTab === mode;
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
    tab.setAttribute('tabindex', active ? '0' : '-1');
    tab.classList.toggle('tool-tab--active', active);
  });
  if (panel) {
    panel.setAttribute('aria-labelledby', mode === 'medicare' ? 'tab-medicare' : 'tab-fair');
  }
  if (priceField) priceField.hidden = mode === 'medicare';
  if (deductibleField) deductibleField.hidden = mode === 'fair';
  if (submitLabel) {
    submitLabel.textContent = mode === 'medicare' ? 'Estimate Part B cost' : 'Check price';
  }
  if (form) {
    form.classList.toggle('tool-form--teal', mode === 'fair');
    form.classList.toggle('tool-form--emerald', mode === 'medicare');
  }
  root.querySelectorAll<HTMLElement>('[data-tab-content]').forEach((el) => {
    const show = el.dataset.tabContent === mode || el.dataset.tabContent === 'both';
    el.hidden = !show;
  });
}

function activateTab(root: ParentNode, mode: PriceCheckMode, focusTab = false) {
  setMode(root, mode);
  if (focusTab) {
    const tab = root.querySelector<HTMLButtonElement>(`[data-price-tab="${mode}"]`);
    tab?.focus();
  }
}

export async function initFairPriceForm(root: ParentNode = document) {
  const { form, cpt, zip, price, deductibleMet, submit, results, error, loading, tabs } =
    getFormElements(root);
  if (!form || !cpt || !submit) return;

  submit.disabled = false;

  let mode: PriceCheckMode = 'fair';
  const params = new URLSearchParams(window.location.search);
  if (params.get('tab') === 'medicare') mode = 'medicare';
  setMode(root, mode);

  let dataLoaded = false;
  let dataPromise: ReturnType<typeof loadPricingData> | null = null;
  const getData = () => {
    if (!dataPromise) {
      dataPromise = loadPricingData().then((data) => {
        dataLoaded = true;
        return data;
      });
    }
    return dataPromise;
  };

  prefetchPricingData();
  bindCptTypeahead(root);
  bindToolExamples(root, 'fair-price', 'fair-price-form');
  bindToolExamples(root, 'medicare-lookup', 'fair-price-form');

  const presetCode = params.get('code');
  if (presetCode && cpt) cpt.value = presetCode;

  const scenario = params.get('scenario');
  if (scenario) {
    const variant = mode === 'medicare' ? 'medicare-lookup' : 'fair-price';
    root
      .querySelector<HTMLButtonElement>(
        `[data-tool-examples="${variant}"] [data-example-id="${scenario}"]`,
      )
      ?.click();
  }

  const tabList = Array.from(tabs);
  const applyMode = (next: PriceCheckMode, focusTab = false) => {
    mode = next;
    activateTab(root, mode, focusTab);
    const url = new URL(window.location.href);
    if (mode === 'medicare') url.searchParams.set('tab', 'medicare');
    else url.searchParams.delete('tab');
    history.replaceState(null, '', url);
    if (results) {
      results.innerHTML = '';
      results.hidden = true;
    }
    hideError(error);
  };

  tabList.forEach((tab) => {
    tab.addEventListener('click', () => {
      const next = tab.dataset.priceTab as PriceCheckMode | undefined;
      if (!next || next === mode) return;
      applyMode(next);
    });

    tab.addEventListener('keydown', (e) => {
      const idx = tabList.indexOf(tab);
      let nextIdx = idx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIdx = (idx + 1) % tabList.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIdx = (idx - 1 + tabList.length) % tabList.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = tabList.length - 1;
      } else {
        return;
      }
      e.preventDefault();
      const nextMode = tabList[nextIdx]?.dataset.priceTab as PriceCheckMode | undefined;
      if (!nextMode) return;
      applyMode(nextMode, true);
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
    if (!dataLoaded) setLoading(loading, true);

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
        results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const heading = results.querySelector<HTMLElement>('h2, h3, .part-b-estimate__headline');
        heading?.focus({ preventScroll: true });
      }
    } catch {
      showError(error, 'Could not load price data. Check your connection and try again.');
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
      setLoading(loading, false);
    }
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initFairPriceForm());
}
