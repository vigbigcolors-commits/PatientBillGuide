import { parseEobDocument, parseEobWithInsurer, summarizeEob } from '../lib/eob/parse';
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

export function initEobAnalyzer(root: ParentNode = document) {
  const form = root.querySelector<HTMLFormElement>('#eob-analyzer-form');
  const text = root.querySelector<HTMLTextAreaElement>('#eob-text');
  const insurerSelect = root.querySelector<HTMLSelectElement>('#eob-insurer');
  const results = root.querySelector<HTMLElement>('#eob-results');
  const error = root.querySelector<HTMLElement>('#eob-error');
  const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!form || !text || !submit) return;

  bindToolExamples(root, 'eob-analyzer', 'eob-analyzer-form');

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

    const summary = summarizeEob(parsed.lines, parsed.insurer);
    const rows = parsed.lines
      .map(
        (l) => `
      <tr>
        <td>${l.serviceDate ?? '—'}</td>
        <td>${l.code ?? '—'}</td>
        <td>${l.description.slice(0, 60)}${l.description.length > 60 ? '…' : ''}</td>
        <td>${fmt(l.billed)}</td>
        <td>${fmt(l.allowed)}</td>
        <td>${fmt(l.planPaid)}</td>
        <td><strong>${fmt(l.patientOwes)}</strong></td>
      </tr>`,
      )
      .join('');

    const allNotes = [...parsed.templateNotes, ...summary.notes];

    if (results) {
      results.innerHTML = `
        <div class="eob-results card" role="region" aria-live="polite">
          <div class="eob-insurer-badge" role="status">
            <span class="eob-insurer-badge__label">Template</span>
            <strong>${parsed.insurer.label}</strong>
            <span class="confidence confidence--${parsed.insurer.confidence}">${confidenceLabel(parsed.insurer.confidence)} match</span>
          </div>
          <h2>EOB summary</h2>
          <p>Parsed <strong>${summary.lineCount}</strong> service line${summary.lineCount === 1 ? '' : 's'}.
          Estimated patient responsibility: <strong>${fmt(summary.totalPatientOwes)}</strong></p>
          ${allNotes.map((n) => `<p class="eob-note">${n}</p>`).join('')}
          <div class="eob-table-wrap">
            <table class="eob-table">
              <thead>
                <tr>
                  <th>Date</th><th>CPT</th><th>Description</th>
                  <th>Billed</th><th>Allowed</th><th>Plan paid</th><th>You owe</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          <p class="eob-cta">
            Compare CPT codes: <a href="/tools/fair-price/">Fair Price Calculator</a> ·
            <a href="/learn/how-to-read-eob/">How to read an EOB</a>
          </p>
        </div>`;
      results.hidden = false;
    }
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initEobAnalyzer());
}
