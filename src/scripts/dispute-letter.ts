import {
  buildDisputeLetter,
  TEMPLATE_DESCRIPTIONS,
  TEMPLATE_LABELS,
  type DisputeTemplateId,
} from '../lib/dispute/letters';
import { bootOnReady } from '../lib/dom/boot';

function readForm(form: HTMLFormElement) {
  const fd = new FormData(form);
  return {
    template: (fd.get('template') as DisputeTemplateId) || 'overcharge',
    patientName: String(fd.get('patient-name') ?? ''),
    patientAddress: String(fd.get('patient-address') ?? ''),
    patientCityStateZip: String(fd.get('patient-city-state-zip') ?? ''),
    providerName: String(fd.get('provider-name') ?? ''),
    providerAddress: String(fd.get('provider-address') ?? ''),
    accountNumber: String(fd.get('account-number') ?? ''),
    serviceDate: String(fd.get('service-date') ?? ''),
    lineItems: String(fd.get('line-items') ?? ''),
    amountDisputed: String(fd.get('amount-disputed') ?? ''),
    benchmarkNote: String(fd.get('benchmark-note') ?? ''),
    additionalNotes: String(fd.get('additional-notes') ?? ''),
  };
}

function copyText(text: string) {
  return navigator.clipboard?.writeText(text);
}

export function initDisputeLetter(root: ParentNode = document) {
  const form = root.querySelector<HTMLFormElement>('#dispute-letter-form');
  const results = root.querySelector<HTMLElement>('#dispute-letter-results');
  const templateDesc = root.querySelector<HTMLElement>('#template-description');
  const templateSelect = root.querySelector<HTMLSelectElement>('#template');
  if (!form) return;

  const updateDesc = () => {
    const id = (templateSelect?.value ?? 'overcharge') as DisputeTemplateId;
    if (templateDesc) templateDesc.textContent = TEMPLATE_DESCRIPTIONS[id];
    const benchmarkField = form.querySelector<HTMLElement>('#benchmark-field');
    if (benchmarkField) benchmarkField.hidden = id !== 'overcharge';
  };

  templateSelect?.addEventListener('change', updateDesc);
  updateDesc();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const letter = buildDisputeLetter(readForm(form));

    if (results) {
      results.innerHTML = `
        <div class="dispute-results card" role="region" aria-live="polite">
          <div class="dispute-results__header">
            <h2>Your dispute letter</h2>
            <span class="dispute-results__template">${TEMPLATE_LABELS[readForm(form).template]}</span>
          </div>
          <p class="dispute-results__subject"><strong>Subject:</strong> ${letter.subject}</p>
          <label class="input-label" for="dispute-letter-body">Letter body (editable)</label>
          <textarea id="dispute-letter-body" class="input-field dispute-letter-body" rows="18">${letter.body}</textarea>
          <div class="dispute-results__actions">
            <button type="button" class="btn btn--primary" id="copy-dispute-letter">Copy letter</button>
            <button type="button" class="btn btn--secondary" id="copy-dispute-subject">Copy subject</button>
          </div>
          <p class="dispute-disclaimer">${letter.disclaimer}</p>
          <p class="dispute-cta">
            <a href="/tools/bill-auditor/">Bill Auditor</a> ·
            <a href="/tools/surprise-bill-check/">Surprise Bill Checker</a> ·
            <a href="/disclaimer/">Disclaimer</a>
          </p>
        </div>`;
      results.hidden = false;

      const bodyEl = results.querySelector<HTMLTextAreaElement>('#dispute-letter-body');
      results.querySelector('#copy-dispute-letter')?.addEventListener('click', async () => {
        if (bodyEl) await copyText(bodyEl.value);
      });
      results.querySelector('#copy-dispute-subject')?.addEventListener('click', async () => {
        await copyText(letter.subject);
      });
    }
  });
}

if (typeof document !== 'undefined') {
  bootOnReady(() => initDisputeLetter());
}
