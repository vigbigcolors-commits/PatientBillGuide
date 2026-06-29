import { describe, expect, it } from 'vitest';
import { buildDisputeLetter, TEMPLATE_LABELS } from '../../src/lib/dispute/letters';

const base = {
  patientName: 'Jane Doe',
  patientAddress: '123 Main St',
  patientCityStateZip: 'Chicago, IL 60601',
  providerName: 'Metro Hospital Billing',
  providerAddress: '456 Health Ave, Chicago, IL 60602',
  accountNumber: 'ACC-998877',
  serviceDate: '01/15/2026',
  lineItems: '99213 Office visit — billed $485.00',
  amountDisputed: '485.00',
  benchmarkNote: 'Medicare allowed ~$108 in ZIP 60601',
  additionalNotes: '',
};

describe('buildDisputeLetter', () => {
  it('builds overcharge template with benchmark note', () => {
    const r = buildDisputeLetter({ ...base, template: 'overcharge' });
    expect(r.subject).toMatch(/Billing dispute/i);
    expect(r.body).toMatch(/Jane Doe/);
    expect(r.body).toMatch(/Medicare Physician Fee Schedule/i);
    expect(r.body).not.toMatch(/\bfraud\b/i);
  });

  it('builds duplicate template', () => {
    const r = buildDisputeLetter({ ...base, template: 'duplicate' });
    expect(r.subject).toMatch(/Duplicate charge/i);
    expect(r.body).toMatch(/duplicate charge/i);
  });

  it('builds surprise bill template without guaranteeing savings', () => {
    const r = buildDisputeLetter({ ...base, template: 'surprise-bill' });
    expect(r.subject).toMatch(/Surprise billing/i);
    expect(r.body).toMatch(/No Surprises Act/i);
    expect(r.body).not.toMatch(/guaranteed savings/i);
  });

  it('includes disclaimer on all templates', () => {
    for (const template of Object.keys(TEMPLATE_LABELS) as Array<keyof typeof TEMPLATE_LABELS>) {
      const r = buildDisputeLetter({ ...base, template });
      expect(r.disclaimer).toMatch(/not legal advice/i);
    }
  });
});
