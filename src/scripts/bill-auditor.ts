import { loadPricingData } from '../lib/pricing';
import { auditBill, parseBillText, loadNcciData } from '../lib/billing';
import type { FlagCategory } from '../lib/billing/types';
import { normalizeZip } from '../lib/pricing/lookup';
import { bootOnReady } from '../lib/dom/boot';
import { bindToolExamples } from './tool-examples';

const CATEGORY_LABELS: Record<FlagCategory, string> = {
  duplicate: 'Duplicate',
  pricing: 'Pricing',
  quantity: 'Quantity',
  data: 'Data mismatch',
  coverage: 'Coverage gap',
  unbundling: 'NCCI unbundling',
};

function getElements(root: ParentNode = document) {
  return {
    form: root.querySelector<HTMLFormElement>('#bill-auditor-form'),
    text: root.querySelector<HTMLTextAreaElement>('#bill-text'),
    zip: root.querySelector<HTMLInputElement>('#zip'),
    submit: root.querySelector<HTMLButtonElement>('#bill-auditor-form button[type="submit"]'),
    results: root.querySelector<HTMLElement>('#bill-auditor-results'),
    error: root.querySelector<HTMLElement>('#bill-auditor-error'),
  };
}

function showLoading(container: HTMLElement, step: 'pricing' | 'ncci') {
  const message =
    step === 'ncci'
      ? 'Loading CMS NCCI practitioner edits (1.7M pairs)…'
      : 'Loading Medicare benchmarks…';
  container.innerHTML = `
    <div class="audit-loading card" role="status" aria-live="polite">
      <p class="audit-loading__text">${message}</p>
      <p class="audit-loading__hint">First load may take a few seconds — data stays on your device.</p>
    </div>`;
  container.hidden = false;
}

function renderResults(container: HTMLElement, result: ReturnType<typeof auditBill>, ncciChecked: boolean) {
  const summaryClass = result.looksNormal ? 'audit-summary--normal' : 'audit-summary--flags';
  const unbundlingCount = result.flags.filter((f) => f.category === 'unbundling').length;

  const flagsHtml =
    result.flags.length === 0
      ? ''
      : `<ul class="audit-flags">
          ${result.flags
            .map(
              (f) => `
            <li class="audit-flag audit-flag--${f.severity} audit-flag--cat-${f.category}">
              <p class="audit-flag__headline">${f.headline}
                <span class="audit-flag__category audit-flag__category--${f.category}">${CATEGORY_LABELS[f.category]}</span>
                <span class="audit-flag__confidence">Confidence: ${f.confidence}</span>
              </p>
              <p class="audit-flag__detail">${f.detail}</p>
              ${f.lineRaw ? `<p class="audit-flag__line"><code>${f.lineRaw}</code></p>` : ''}
            </li>`,
            )
            .join('')}
        </ul>`;

  container.innerHTML = `
    <div class="audit-results card" role="region" aria-live="polite">
      <div class="audit-summary ${summaryClass}">
        <h2>${result.looksNormal ? 'Bill looks normal' : 'Review recommended'}</h2>
        <p>${result.summary}</p>
        <p class="audit-meta">
          Parsed ${result.lineCount} line item${result.lineCount === 1 ? '' : 's'} with CPT codes and amounts.
          ${ncciChecked ? `NCCI practitioner edits checked${unbundlingCount ? ` — ${unbundlingCount} unbundling flag${unbundlingCount === 1 ? '' : 's'}` : ''}.` : ''}
        </p>
      </div>
      ${flagsHtml}
      <p class="audit-disclaimer">
        These are educational flags based on public Medicare data — not a legal or medical determination.
        <a href="/methodology/billing-flags/">How we flag bills</a>
        ${unbundlingCount ? ' · <a href="/tools/dispute-letter/">Dispute letter templates</a>' : ''}
      </p>
    </div>`;
  container.hidden = false;
}

export async function initBillAuditor(root: ParentNode = document) {
  const { form, text, zip, submit, results, error } = getElements(root);
  if (!form || !text || !submit) return;

  let dataPromise: ReturnType<typeof loadPricingData> | null = null;
  const getData = () => {
    if (!dataPromise) dataPromise = loadPricingData();
    return dataPromise;
  };

  bindToolExamples(root, 'bill-auditor', 'bill-auditor-form');

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

    const raw = text.value.trim();
    if (!raw) {
      if (error) {
        error.textContent = 'Paste your itemized bill text above — one charge per line works best.';
        error.hidden = false;
      }
      return;
    }

    const zipVal = zip?.value?.trim();
    if (zipVal && !normalizeZip(zipVal)) {
      if (error) {
        error.textContent = 'Enter a valid 5-digit US ZIP code, or leave blank for national benchmarks.';
        error.hidden = false;
      }
      return;
    }

    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');

    try {
      const items = parseBillText(raw);
      if (items.length === 0) {
        if (error) {
          error.textContent =
            'No line items found. Include CPT codes (5 digits) and dollar amounts on each line, e.g. "99213 Office visit $185.00".';
          error.hidden = false;
        }
        return;
      }

      if (results) showLoading(results, 'pricing');
      const { mpfs, zipMap } = await getData();

      if (results) showLoading(results, 'ncci');
      const ncci = await loadNcciData();

      const result = auditBill(items, mpfs, zipMap, zipVal ? normalizeZip(zipVal)! : undefined, ncci);
      if (results) renderResults(results, result, Boolean(ncci));
    } catch {
      if (error) {
        error.textContent = 'Could not analyze the bill. Check your connection and try again.';
        error.hidden = false;
      }
      if (results) results.hidden = true;
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initBillAuditor());
}
