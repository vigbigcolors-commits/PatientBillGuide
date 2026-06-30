import {
  formatUsd,
  isPriceLookupError,
  loadPricingData,
  lookupPrice,
  parseCurrency,
  prefetchPricingData,
} from '../lib/pricing';
import { compareHospitalPrice } from '../lib/hospital-compare/compare';
import type { CareSetting, HospitalCompareResult } from '../lib/hospital-compare/types';
import { bootOnReady } from '../lib/dom/boot';
import { bindCptTypeahead } from './cpt-typeahead';
import { bindToolExamples } from './tool-examples';

function verdictClass(v: HospitalCompareResult['verdict']): string {
  if (v === 'typical' || v === 'below_typical') return 'hospital-verdict--ok';
  if (v === 'high') return 'hospital-verdict--watch';
  return 'hospital-verdict--alert';
}

function insightHtml(insight: HospitalCompareResult['insights'][number]) {
  return `
    <li class="hospital-insight hospital-insight--${insight.level}">
      <p class="hospital-insight__headline">${insight.headline}</p>
      <p class="hospital-insight__detail">${insight.detail}</p>
    </li>`;
}

function renderResults(container: HTMLElement, result: HospitalCompareResult) {
  const noticeClass = `locality-notice locality-notice--${result.localityNotice.type}`;
  const confidenceLabel = { high: 'High', medium: 'Medium', low: 'Low' }[result.confidence];
  const locality = result.localityLabel ?? 'National median';

  const chargePct = Math.min(100, Math.round((result.hospitalCharge / result.typicalTotalHigh) * 100));
  const physicianBar = Math.max(8, result.physicianSharePct);
  const facilityBar = Math.max(8, result.facilitySharePct);

  container.innerHTML = `
    <div class="hospital-results card" role="region" aria-live="polite">
      <div class="${noticeClass}" role="status">${result.localityNotice.message}</div>

      <header class="hospital-results__header">
        <span class="hospital-results__code">CPT ${result.code}</span>
        <h2 class="hospital-results__title" tabindex="-1">${result.description}</h2>
        <p class="hospital-results__setting">${result.careSettingLabel}</p>
      </header>

      <div class="hospital-verdict ${verdictClass(result.verdict)}" role="status">
        <p class="hospital-verdict__headline">${result.verdictHeadline}</p>
        <p class="hospital-verdict__detail">${result.verdictDetail}</p>
      </div>

      <div class="hospital-charge-highlight">
        <span class="hospital-charge-highlight__label">Your hospital charge</span>
        <span class="hospital-charge-highlight__amount">${formatUsd(result.hospitalCharge)}</span>
        <span class="hospital-charge-highlight__ratio">${result.chargeVsPhysicianRatio.toFixed(1)}× Medicare physician fee</span>
      </div>

      <div class="hospital-split" role="group" aria-label="Estimated bill components">
        <p class="hospital-split__title">Estimated typical total: ${formatUsd(result.typicalTotalLow)} – ${formatUsd(result.typicalTotalHigh)}</p>
        <div class="hospital-split__bar" aria-hidden="true">
          <span class="hospital-split__seg hospital-split__seg--physician" style="width:${physicianBar}%"></span>
          <span class="hospital-split__seg hospital-split__seg--facility" style="width:${facilityBar}%"></span>
        </div>
        <ul class="hospital-split__legend">
          <li><span class="hospital-split__dot hospital-split__dot--physician"></span>Physician (MPFS): ${formatUsd(result.medicarePhysician)}</li>
          <li><span class="hospital-split__dot hospital-split__dot--facility"></span>Facility est.: ${formatUsd(result.estimatedFacilityLow)} – ${formatUsd(result.estimatedFacilityHigh)}</li>
        </ul>
        <div class="hospital-split__you" style="width:${Math.min(100, chargePct)}%">
          <span>Your charge marker</span>
        </div>
      </div>

      <dl class="hospital-stats">
        <div><dt>Medicare physician</dt><dd>${formatUsd(result.medicarePhysician)}</dd></div>
        <div><dt>Facility (low–high)</dt><dd>${formatUsd(result.estimatedFacilityLow)} – ${formatUsd(result.estimatedFacilityHigh)}</dd></div>
        <div><dt>Typical total</dt><dd>${formatUsd(result.typicalTotalLow)} – ${formatUsd(result.typicalTotalHigh)}</dd></div>
        <div><dt>vs typical mid</dt><dd>${result.chargeVsTypicalMidRatio.toFixed(1)}×</dd></div>
        <div><dt>Locality</dt><dd>${locality}</dd></div>
        <div><dt>Confidence</dt><dd><span class="confidence confidence--${result.confidence}">${confidenceLabel}</span></dd></div>
      </dl>

      ${result.insights.length ? `<section class="hospital-insights"><h3>Insights</h3><ul class="hospital-insights__list">${result.insights.map(insightHtml).join('')}</ul></section>` : ''}

      <p class="hospital-benchmark-note" role="note">${result.benchmarkNote}</p>

      <section class="hospital-path">
        <h3>Checks performed</h3>
        <ol class="hospital-path__list">${result.checksRun.map((s, i) => `<li><span class="hospital-path__num">${i + 1}</span>${s}</li>`).join('')}</ol>
      </section>

      <section class="hospital-next-steps">
        <h3>Suggested next steps</h3>
        <ul>${result.nextSteps.map((s) => `<li>${s}</li>`).join('')}</ul>
      </section>

      <div class="hospital-tools">
        <a class="hospital-tool-link hospital-tool-link--primary" href="/tools/fair-price/?code=${result.code}">Fair Price Calculator</a>
        <a class="hospital-tool-link" href="/tools/bill-auditor/">Bill Auditor</a>
        <a class="hospital-tool-link" href="/tools/surprise-bill-check/">Surprise Bill Checker</a>
        <a class="hospital-tool-link" href="/for/uninsured/">Self-pay guide</a>
      </div>

      <p class="hospital-results__note">
        Educational benchmark — not your hospital's chargemaster or a legal maximum. CMS MPFS ${result.dataVersion}.
        <a href="/methodology/price-benchmarks/">Methodology</a>
      </p>
    </div>`;

  container.hidden = false;
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  container.querySelector<HTMLElement>('.hospital-results__title')?.focus({ preventScroll: true });
}

export function initHospitalCompare(root: ParentNode = document) {
  const form = root.querySelector<HTMLFormElement>('#hospital-compare-form');
  const cpt = root.querySelector<HTMLInputElement>('#cpt');
  const zip = root.querySelector<HTMLInputElement>('#hc-zip');
  const charge = root.querySelector<HTMLInputElement>('#hc-charge');
  const results = root.querySelector<HTMLElement>('#hospital-compare-results');
  const error = root.querySelector<HTMLElement>('#hospital-compare-error');
  const loading = root.querySelector<HTMLElement>('#hospital-compare-loading');
  const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!form || !cpt || !charge || !submit) return;

  prefetchPricingData();
  bindCptTypeahead(root);
  bindToolExamples(root, 'hospital-compare', 'hospital-compare-form');

  let dataPromise: ReturnType<typeof loadPricingData> | null = null;
  let dataLoaded = false;
  const getData = () => {
    if (!dataPromise) {
      dataPromise = loadPricingData().then((d) => {
        dataLoaded = true;
        return d;
      });
    }
    return dataPromise;
  };

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

    const settingInput = form.querySelector<HTMLInputElement>('input[name="care-setting"]:checked');
    const careSetting = (settingInput?.value ?? 'hospital_outpatient') as CareSetting;
    const chargeRaw = charge.value.trim();
    const charged = parseCurrency(chargeRaw);

    if (!chargeRaw || charged == null || charged <= 0) {
      if (error) {
        error.textContent = 'Enter the hospital charge or self-pay quote you received.';
        error.hidden = false;
      }
      return;
    }

    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    if (!dataLoaded && loading) loading.hidden = false;

    try {
      const { mpfs, zipMap } = await getData();
      const outcome = lookupPrice({ code: cpt.value, zip: zip?.value, chargedAmount: charged, chargedAmountRaw: chargeRaw }, mpfs, zipMap);

      if (isPriceLookupError(outcome)) {
        if (error) {
          error.textContent = outcome.message;
          error.hidden = false;
        }
        return;
      }

      const analysis = compareHospitalPrice(
        { code: cpt.value, zip: zip?.value, hospitalCharge: charged, careSetting },
        outcome,
      );

      if (results) renderResults(results, analysis);
    } catch {
      if (error) {
        error.textContent = 'Could not load benchmark data. Check your connection and try again.';
        error.hidden = false;
      }
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
      if (loading) loading.hidden = true;
    }
  });

  const params = new URLSearchParams(window.location.search);
  const presetCode = params.get('code');
  if (presetCode) cpt.value = presetCode;
  const scenario = params.get('scenario');
  if (scenario) {
    root.querySelector<HTMLButtonElement>(`[data-example-id="${scenario}"]`)?.click();
  }
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initHospitalCompare());
}
