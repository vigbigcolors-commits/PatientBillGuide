import { loadPricingData, prefetchPricingData, normalizeZip, formatUsd } from '../lib/pricing';
import { auditBill, parseBillText, loadNcciForCodes, FLAG_CATEGORY_LABELS } from '../lib/billing';
import type { BillAuditFlag, BillAuditResult, FlagCategory } from '../lib/billing/types';
import type { BillLineItem } from '../lib/billing/types';
import { bootOnReady } from '../lib/dom/boot';
import { bindToolExamples } from './tool-examples';

const CATEGORY_ORDER: FlagCategory[] = [
  'pricing',
  'duplicate',
  'unbundling',
  'data',
  'quantity',
  'coverage',
];

function getElements(root: ParentNode = document) {
  return {
    form: root.querySelector<HTMLFormElement>('#bill-auditor-form'),
    text: root.querySelector<HTMLTextAreaElement>('#bill-text'),
    zip: root.querySelector<HTMLInputElement>('#zip'),
    linePreview: root.querySelector<HTMLElement>('#bill-line-preview'),
    submit: root.querySelector<HTMLButtonElement>('#bill-auditor-form button[type="submit"]'),
    results: root.querySelector<HTMLElement>('#bill-auditor-results'),
    error: root.querySelector<HTMLElement>('#bill-auditor-error'),
  };
}

function confidenceLabel(c: string): string {
  return c === 'high' ? 'High' : c === 'medium' ? 'Medium' : 'Low';
}

function showLoading(container: HTMLElement, step: 'pricing' | 'ncci') {
  const message =
    step === 'ncci'
      ? 'Loading NCCI edits for your CPT codes…'
      : 'Loading Medicare benchmarks…';
  container.innerHTML = `
    <div class="audit-loading card" role="status" aria-live="polite">
      <span class="audit-loading__spinner" aria-hidden="true"></span>
      <p class="audit-loading__text">${message}</p>
      <p class="audit-loading__hint">First load may take a few seconds — data stays on your device.</p>
    </div>`;
  container.hidden = false;
}

function renderFlag(f: BillAuditFlag): string {
  return `
    <li class="audit-flag audit-flag--${f.severity} audit-flag--cat-${f.category}">
      <p class="audit-flag__headline">
        ${f.headline}
        <span class="audit-flag__category audit-flag__category--${f.category}">${FLAG_CATEGORY_LABELS[f.category]}</span>
        <span class="confidence confidence--${f.confidence}">${confidenceLabel(f.confidence)}</span>
      </p>
      <p class="audit-flag__detail">${f.detail}</p>
      ${f.lineRaw ? `<p class="audit-flag__line"><code>${f.lineRaw}</code></p>` : ''}
    </li>`;
}

function buildDisputeLinks(result: BillAuditResult): string {
  const links: string[] = [];
  if (result.flags.some((f) => f.category === 'pricing')) {
    links.push('<a class="audit-tool-link audit-tool-link--primary" href="/tools/dispute-letter/?template=overcharge">Overcharge dispute letter</a>');
  }
  if (result.flags.some((f) => f.category === 'duplicate')) {
    links.push('<a class="audit-tool-link" href="/tools/dispute-letter/?template=duplicate">Duplicate charge letter</a>');
  }
  if (result.flags.some((f) => f.category === 'unbundling')) {
    links.push('<a class="audit-tool-link" href="/tools/dispute-letter/?template=overcharge">Unbundling dispute letter</a>');
  }
  return links.length
    ? `<div class="audit-dispute-cta"><p><strong>Next step:</strong> Draft an editable dispute letter for flagged issues.</p><div class="audit-dispute-cta__links">${links.join('')}</div></div>`
    : '';
}

function renderParsedLines(items: BillLineItem[]): string {
  if (items.length === 0) return '';
  const rows = items
    .slice(0, 12)
    .map(
      (item) => `
      <tr>
        <td><code>${item.code}</code></td>
        <td>${item.description.slice(0, 48)}${item.description.length > 48 ? '…' : ''}</td>
        <td>${item.serviceDate ?? '—'}</td>
        <td>${formatUsd(item.charged)}</td>
      </tr>`,
    )
    .join('');
  const more =
    items.length > 12
      ? `<p class="audit-lines__more">+ ${items.length - 12} more line${items.length - 12 === 1 ? '' : 's'} parsed</p>`
      : '';
  return `
    <details class="audit-lines">
      <summary>Parsed line items (${items.length})</summary>
      <div class="audit-lines__table-wrap">
        <table class="audit-lines__table">
          <thead><tr><th>CPT</th><th>Description</th><th>Date</th><th>Charged</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${more}
    </details>`;
}

function renderResults(
  container: HTMLElement,
  result: BillAuditResult,
  items: BillLineItem[],
  ncciChecked: boolean,
) {
  const summaryClass = result.looksNormal ? 'audit-summary--normal' : 'audit-summary--flags';
  const unbundlingCount = result.stats.byCategory.unbundling;

  const grouped = CATEGORY_ORDER.filter((cat) => result.stats.byCategory[cat] > 0)
    .map((cat) => {
      const catFlags = result.flags.filter((f) => f.category === cat);
      return `
        <section class="audit-flag-group">
          <h3 class="audit-flag-group__title">${FLAG_CATEGORY_LABELS[cat]} <span class="audit-flag-group__count">${catFlags.length}</span></h3>
          <ul class="audit-flags">${catFlags.map(renderFlag).join('')}</ul>
        </section>`;
    })
    .join('');

  const checksHtml = result.checksRun
    .map((step, i) => `<li><span class="audit-path__num">${i + 1}</span>${step}</li>`)
    .join('');

  const stepsHtml = result.nextSteps.map((s) => `<li>${s}</li>`).join('');

  const toolLinks = `
    <a class="audit-tool-link" href="/tools/fair-price/">Fair Price Calculator</a>
    <a class="audit-tool-link" href="/tools/eob-analyzer/">EOB Analyzer</a>
    <a class="audit-tool-link" href="/tools/surprise-bill-check/">Surprise Bill Checker</a>
    <a class="audit-tool-link" href="/learn/how-to-read-medical-bill/">How to read a bill</a>
  `;

  container.innerHTML = `
    <div class="audit-results card" role="region" aria-live="polite">
      <div class="audit-summary ${summaryClass}">
        <h2 class="audit-summary__headline" tabindex="-1">${result.looksNormal ? 'Bill looks normal' : 'Review recommended'}</h2>
        <p>${result.summary}</p>
      </div>

      <dl class="audit-stats">
        <div><dt>Line items</dt><dd>${result.lineCount}</dd></div>
        <div><dt>Unique CPT codes</dt><dd>${result.stats.uniqueCodes}</dd></div>
        <div><dt>Total charged</dt><dd>${formatUsd(result.stats.totalCharged)}</dd></div>
        <div><dt>Concerns</dt><dd>${result.stats.concernCount}</dd></div>
        <div><dt>High severity</dt><dd>${result.stats.bySeverity.high}</dd></div>
        <div><dt>NCCI checked</dt><dd>${ncciChecked ? 'Yes' : 'No'}</dd></div>
      </dl>

      ${renderParsedLines(items)}

      <section class="audit-path">
        <h3>Checks performed</h3>
        <ol class="audit-path__list">${checksHtml}</ol>
      </section>

      ${grouped || '<p class="audit-no-flags">No flags — charges fall within expected public-data patterns.</p>'}

      ${buildDisputeLinks(result)}

      <section class="audit-next-steps">
        <h3>Suggested next steps</h3>
        <ul>${stepsHtml}</ul>
      </section>

      <p class="audit-disclaimer">
        Educational flags from public Medicare data — not a legal or medical determination.
        <a href="/methodology/billing-flags/">How we flag bills</a>
        ${unbundlingCount ? ' · <a href="/methodology/limitations/">NCCI limitations</a>' : ''}
      </p>

      <div class="audit-tools">${toolLinks}</div>
    </div>`;

  container.hidden = false;
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  container.querySelector<HTMLElement>('.audit-summary__headline')?.focus({ preventScroll: true });
}

function updateLinePreview(text: string, preview: HTMLElement | null) {
  if (!preview) return;
  const items = parseBillText(text);
  if (!text.trim()) {
    preview.hidden = true;
    preview.textContent = '';
    return;
  }
  preview.hidden = false;
  preview.textContent =
    items.length > 0
      ? `${items.length} line item${items.length === 1 ? '' : 's'} detected — ${new Set(items.map((i) => i.code)).size} unique CPT code${items.length === 1 ? '' : 's'}`
      : 'No CPT + dollar lines detected yet — include 5-digit codes and amounts';
}

export async function initBillAuditor(root: ParentNode = document) {
  const { form, text, zip, linePreview, submit, results, error } = getElements(root);
  if (!form || !text || !submit) return;

  prefetchPricingData();
  bindToolExamples(root, 'bill-auditor', 'bill-auditor-form');

  const params = new URLSearchParams(window.location.search);
  const scenario = params.get('scenario');
  if (scenario) {
    root.querySelector<HTMLButtonElement>(`[data-example-id="${scenario}"]`)?.click();
  }

  text.addEventListener('input', () => updateLinePreview(text.value, linePreview));

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
      const billCodes = [...new Set(items.map((i) => i.code))];
      const { mpfs, zipMap } = await loadPricingData('/data', { codes: billCodes });
      if (results) showLoading(results, 'ncci');
      const ncci = await loadNcciForCodes(billCodes);

      const result = auditBill(items, mpfs, zipMap, zipVal ? normalizeZip(zipVal)! : undefined, ncci);
      if (results) renderResults(results, result, items, Boolean(ncci));
    } catch (err) {
      if (error) {
        const detail = err instanceof Error ? err.message : 'Unknown error';
        error.textContent = detail.includes('NCCI') || detail.includes('ncci')
          ? `${detail} Try: npm run data:generate — then restart npm run dev.`
          : `Could not analyze the bill: ${detail}`;
        error.hidden = false;
      }
      console.error('[Bill Auditor]', err);
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
