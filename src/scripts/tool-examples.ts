import {
  fairPriceExamples,
  medicareLookupExamples,
  billAuditorExamples,
  eobAnalyzerExamples,
} from '../data/tool-examples';

const EXAMPLES_BY_TOOL = {
  'fair-price': fairPriceExamples,
  'medicare-lookup': medicareLookupExamples,
  'bill-auditor': billAuditorExamples,
  'eob-analyzer': eobAnalyzerExamples,
} as const;

export type ToolExampleVariant = keyof typeof EXAMPLES_BY_TOOL;

export function bindToolExamples(root: ParentNode, variant: ToolExampleVariant, formId: string) {
  const form = root.querySelector<HTMLFormElement>(`#${formId}`);
  if (!form) return;

  root.querySelectorAll(`[data-tool-examples="${variant}"] .example-btn`).forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-example-id');
      if (!id) return;
      const example = EXAMPLES_BY_TOOL[variant].find((ex) => ex.id === id);
      if (!example) return;

      if (variant === 'fair-price') {
        const ex = example as (typeof fairPriceExamples)[number];
        const cpt = root.querySelector<HTMLInputElement>('#cpt');
        const zip = root.querySelector<HTMLInputElement>('#zip');
        const price = root.querySelector<HTMLInputElement>('#price');
        if (cpt) cpt.value = ex.cpt;
        if (zip) zip.value = ex.zip ?? '';
        if (price) price.value = ex.price ?? '';
      } else if (variant === 'medicare-lookup') {
        const ex = example as (typeof medicareLookupExamples)[number];
        const cpt = root.querySelector<HTMLInputElement>('#cpt');
        const zip = root.querySelector<HTMLInputElement>('#zip');
        if (cpt) cpt.value = ex.cpt;
        if (zip) zip.value = ex.zip ?? '';
      } else if (variant === 'bill-auditor') {
        const ex = example as (typeof billAuditorExamples)[number];
        const text = root.querySelector<HTMLTextAreaElement>('#bill-text');
        const zip = root.querySelector<HTMLInputElement>('#zip');
        if (text) text.value = ex.text;
        if (zip) zip.value = ex.zip ?? '';
      } else if (variant === 'eob-analyzer') {
        const ex = example as (typeof eobAnalyzerExamples)[number];
        const text = root.querySelector<HTMLTextAreaElement>('#eob-text');
        const insurer = root.querySelector<HTMLSelectElement>('#eob-insurer');
        if (text) text.value = ex.text;
        if (insurer && ex.insurer) insurer.value = ex.insurer;
      }

      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      form.requestSubmit();
    });
  });
}
