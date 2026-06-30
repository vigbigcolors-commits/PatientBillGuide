import {
  fairPriceExamples,
  medicareLookupExamples,
  billAuditorExamples,
  eobAnalyzerExamples,
  surpriseBillExamples,
  hospitalCompareExamples,
} from '../data/tool-examples';

const EXAMPLES_BY_TOOL = {
  'fair-price': fairPriceExamples,
  'medicare-lookup': medicareLookupExamples,
  'bill-auditor': billAuditorExamples,
  'eob-analyzer': eobAnalyzerExamples,
  'surprise-bill': surpriseBillExamples,
  'hospital-compare': hospitalCompareExamples,
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
        const deductibleMet = root.querySelector<HTMLInputElement>('#deductible-met');
        if (cpt) cpt.value = ex.cpt;
        if (zip) zip.value = ex.zip ?? '';
        if (deductibleMet) deductibleMet.value = ex.deductibleMet ?? '';
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
      } else if (variant === 'hospital-compare') {
        const ex = example as (typeof hospitalCompareExamples)[number];
        const cpt = root.querySelector<HTMLInputElement>('#cpt');
        const zip = root.querySelector<HTMLInputElement>('#hc-zip');
        const charge = root.querySelector<HTMLInputElement>('#hc-charge');
        if (cpt) cpt.value = ex.cpt;
        if (zip) zip.value = ex.zip ?? '';
        if (charge) charge.value = ex.charge;
        const setting = form.querySelector<HTMLInputElement>(`input[name="care-setting"][value="${ex.careSetting}"]`);
        if (setting) setting.checked = true;
      } else if (variant === 'surprise-bill') {
        const ex = example as (typeof surpriseBillExamples)[number];
        const setRadio = (name: string, value: string) => {
          const input = form.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`);
          if (input) input.checked = true;
        };
        setRadio('care-setting', ex.careSetting);
        setRadio('is-emergency', ex.isEmergency ? 'yes' : 'no');
        setRadio('facility-network', ex.facilityNetwork);
        setRadio('provider-network', ex.providerNetwork);
        setRadio('insurance-type', ex.insuranceType);
        if (ex.providerRole) setRadio('provider-role', ex.providerRole);
        if (ex.consentStatus) setRadio('consent-status', ex.consentStatus);
        if (ex.billSource) setRadio('bill-source', ex.billSource);
        form.dispatchEvent(new Event('change', { bubbles: true }));
      }

      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      form.requestSubmit();
    });
  });
}
