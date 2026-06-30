import { parseEobDocument, parseEobWithInsurer, analyzeEob } from '../lib/eob/parse';
import type { EobAnalysis, EobLine } from '../lib/eob/types';
import type { EobInsurerId } from '../lib/eob/types';
import { bootOnReady } from '../lib/dom/boot';
import { bindToolExamples } from './tool-examples';

function fmt(n?: number) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

function confidenceLabel(c: string) {
  return c === 'high' ? 'High' : c === 'medium' ? 'Medium' : 'Low';
}

function rowClass(line: EobLine): string {
  if (line.billed && line.allowed && line.billed > line.allowed * 3) return 'eob-row--alert';
  if ((line.patientOwes ?? 0) > 200) return 'eob-row--high-owe';
  return '';
}

function renderInsight(insight: EobAnalysis['insights'][number]) {
  return `
    <li class="eob-insight eob-insight--${insight.level}">
      <p class="eob-insight__headline">${insight.headline}</p>
      <p class="eob-insight__detail">${insight.detail}</p>
    </li>`;
}

function renderEobResults(
  container: HTMLElement | null,
  analysis: EobAnalysis,
  lines: EobLine[],
) {
  if (!container) return;

  const rows = lines
    .map(
      (l) => `
      <tr class="${rowClass(l)}">
        <td>${l.serviceDate ?? '—'}</td>
        <td>${l.code ? `<code>${l.code}</code>` : '—'}</td>
        <td>${l.description.slice(0, 48)}${l.description.length > 48 ? '…' : ''}</td>
        <td>${fmt(l.billed)}</td>
        <td>${fmt(l.allowed)}</td>
        <td>${fmt(l.planPaid)}</td>
        <td><strong>${fmt(l.patientOwes)}</strong></td>
      </tr>`,
    )
    .join('');

  const insightsHtml = analysis.insights.length
    ? `<section class="eob-insights"><h3>Insights</h3><ul class="eob-insights__list">${analysis.insights.map(renderInsight).join('')}</ul></section>`
    : '';

  const notesHtml = [...analysis.templateNotes, ...analysis.notes]
    .map((n) => `<p class="eob-note">${n}</p>`)
    .join('');

  const checksHtml = analysis.checksRun
    .map((step, i) => `<li><span class="eob-path__num">${i + 1}</span>${step}</li>`)
    .join('');

  const toolLinks = `
    <a class="eob-tool-link eob-tool-link--primary" href="/tools/fair-price/">Fair Price Calculator</a>
    <a class="eob-tool-link" href="/tools/bill-auditor/">Bill Auditor</a>
    <a class="eob-tool-link" href="/tools/surprise-bill-check/">Surprise Bill Checker</a>
    <a class="eob-tool-link" href="/learn/how-to-read-eob/">How to read an EOB</a>
  `;

  const oweHighlight =
    analysis.totalPatientOwes > 0
      ? `<div class="eob-owe-highlight">
          <span class="eob-owe-highlight__label">Estimated patient responsibility</span>
          <span class="eob-owe-highlight__amount">${fmt(analysis.totalPatientOwes)}</span>
        </div>`
      : `<div class="eob-owe-highlight eob-owe-highlight--zero">
          <span class="eob-owe-highlight__label">Patient responsibility on parsed lines</span>
          <span class="eob-owe-highlight__amount">${fmt(0)}</span>
        </div>`;

  container.innerHTML = `
    <div class="eob-results card" role="region" aria-live="polite">
      <div class="eob-insurer-badge" role="status">
        <span class="eob-insurer-badge__label">Template</span>
        <strong>${analysis.insurer.label}</strong>
        <span class="confidence confidence--${analysis.insurer.confidence}">${confidenceLabel(analysis.insurer.confidence)} match</span>
      </div>

      <h2 class="eob-results__headline" tabindex="-1">EOB summary</h2>
      ${oweHighlight}

      <dl class="eob-stats">
        <div><dt>Service lines</dt><dd>${analysis.lineCount}</dd></div>
        <div><dt>CPT codes</dt><dd>${analysis.codes.length}</dd></div>
        <div><dt>Total billed</dt><dd>${fmt(analysis.totalBilled)}</dd></div>
        <div><dt>Total allowed</dt><dd>${fmt(analysis.totalAllowed)}</dd></div>
        <div><dt>Plan paid</dt><dd>${fmt(analysis.totalPlanPaid)}</dd></div>
        <div><dt>Insights</dt><dd>${analysis.insights.length}</dd></div>
      </dl>

      ${insightsHtml}
      ${notesHtml}

      <section class="eob-path">
        <h3>Checks performed</h3>
        <ol class="eob-path__list">${checksHtml}</ol>
      </section>

      <div class="eob-table-wrap">
        <table class="eob-table">
          <thead>
            <tr>
              <th>Date</th><th>CPT</th><th>Description</th>
              <th>Billed</th><th>Allowed</th><th>Plan paid</th><th>You owe</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr class="eob-table__totals">
              <td colspan="3"><strong>Totals</strong></td>
              <td><strong>${fmt(analysis.totalBilled)}</strong></td>
              <td><strong>${fmt(analysis.totalAllowed)}</strong></td>
              <td><strong>${fmt(analysis.totalPlanPaid)}</strong></td>
              <td><strong>${fmt(analysis.totalPatientOwes)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <section class="eob-next-steps">
        <h3>Suggested next steps</h3>
        <ul>${analysis.nextSteps.map((s) => `<li>${s}</li>`).join('')}</ul>
      </section>

      <div class="eob-tools">${toolLinks}</div>
    </div>`;

  container.hidden = false;
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  container.querySelector<HTMLElement>('.eob-results__headline')?.focus({ preventScroll: true });
}

export function initEobAnalyzer(root: ParentNode = document) {
  const form = root.querySelector<HTMLFormElement>('#eob-analyzer-form');
  const text = root.querySelector<HTMLTextAreaElement>('#eob-text');
  const insurerSelect = root.querySelector<HTMLSelectElement>('#eob-insurer');
  const linePreview = root.querySelector<HTMLElement>('#eob-line-preview');
  const results = root.querySelector<HTMLElement>('#eob-results');
  const error = root.querySelector<HTMLElement>('#eob-error');
  const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!form || !text || !submit) return;

  bindToolExamples(root, 'eob-analyzer', 'eob-analyzer-form');

  const params = new URLSearchParams(window.location.search);
  const scenario = params.get('scenario');
  if (scenario) {
    root.querySelector<HTMLButtonElement>(`[data-example-id="${scenario}"]`)?.click();
  }

  const updatePreview = () => {
    if (!linePreview) return;
    const raw = text.value.trim();
    if (!raw) {
      linePreview.hidden = true;
      return;
    }
    const override = insurerSelect?.value as EobInsurerId | 'auto' | '';
    const parsed =
      override && override !== 'auto'
        ? parseEobWithInsurer(raw, override)
        : parseEobDocument(raw);
    linePreview.hidden = false;
    linePreview.textContent =
      parsed.lines.length > 0
        ? `${parsed.lines.length} service line${parsed.lines.length === 1 ? '' : 's'} detected · ${parsed.insurer.label}`
        : 'No service lines detected yet — include dates, CPT codes, and dollar amounts';
  };

  text.addEventListener('input', updatePreview);
  insurerSelect?.addEventListener('change', updatePreview);

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

    const raw = text.value.trim();
    if (!raw) {
      if (error) {
        error.textContent = 'Paste your EOB text above.';
        error.hidden = false;
      }
      return;
    }

    const override = insurerSelect?.value as EobInsurerId | 'auto' | '';
    const parsed =
      override && override !== 'auto'
        ? parseEobWithInsurer(raw, override)
        : parseEobDocument(raw);

    if (parsed.lines.length === 0) {
      if (error) {
        error.textContent =
          'Could not parse EOB lines. Try selecting your insurer template or include dates, CPT codes, and dollar amounts.';
        error.hidden = false;
      }
      return;
    }

    const analysis = analyzeEob(parsed);
    renderEobResults(results, analysis, parsed.lines);
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initEobAnalyzer());
}
