export type DisputeTemplateId = 'overcharge' | 'duplicate' | 'surprise-bill';

export interface DisputeLetterInput {
  template: DisputeTemplateId;
  patientName: string;
  patientAddress: string;
  patientCityStateZip: string;
  providerName: string;
  providerAddress: string;
  accountNumber: string;
  serviceDate: string;
  /** CPT codes, line descriptions, or summary of disputed items */
  lineItems: string;
  /** Dollar amount in dispute */
  amountDisputed: string;
  /** Optional: Medicare benchmark or fair price reference */
  benchmarkNote: string;
  /** Optional extra context */
  additionalNotes: string;
}

export interface DisputeLetterResult {
  subject: string;
  body: string;
  disclaimer: string;
}

export const TEMPLATE_LABELS: Record<DisputeTemplateId, string> = {
  overcharge: 'Charge above fair price',
  duplicate: 'Duplicate charge',
  'surprise-bill': 'Surprise / balance bill',
};

export const TEMPLATE_DESCRIPTIONS: Record<DisputeTemplateId, string> = {
  overcharge:
    'Request a review when a charge appears well above Medicare benchmarks or your insurer\'s allowed amount.',
  duplicate:
    'Request removal when the same service, date, and CPT code appears more than once on your bill.',
  'surprise-bill':
    'Request in-network cost-sharing when federal surprise-billing protections may apply — not legal advice.',
};

function todayFormatted(): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());
}

function block(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed || fallback;
}

function buildOverchargeLetter(input: DisputeLetterInput): DisputeLetterResult {
  const benchmark = input.benchmarkNote.trim()
    ? `\nBased on publicly available Medicare Physician Fee Schedule data${input.benchmarkNote.trim().startsWith('(') ? ' ' : ', '}${input.benchmarkNote.trim()}, the amount charged appears significantly above a typical allowed amount for this service in my area.`
    : '\nBased on publicly available Medicare Physician Fee Schedule data, the amount charged appears significantly above a typical allowed amount for this service.';

  const body = `${todayFormatted()}

${block(input.providerName, '[Provider / Billing Department Name]')}
${block(input.providerAddress, '[Provider Billing Address]')}

Re: Billing dispute — account ${block(input.accountNumber, '[Account Number]')}
Patient: ${block(input.patientName, '[Your Full Name]')}
Service date: ${block(input.serviceDate, '[Date of Service]')}

Dear Billing Department,

I am writing to formally request a review and adjustment of the following charge(s) on my account:

${block(input.lineItems, '[List each CPT code, description, and dollar amount in dispute]')}

Total amount in dispute: $${block(input.amountDisputed, '[Amount]')}${benchmark}

Please provide:
1. An itemized statement with CPT/HCPCS codes for each line
2. The contract rate or fee schedule used to set the charge
3. A corrected statement if the charge was billed in error

I am requesting a good-faith review before paying the disputed portion. Please confirm receipt of this letter and provide a written response within 30 days.

${input.additionalNotes.trim() ? `\nAdditional context:\n${input.additionalNotes.trim()}\n` : ''}
Sincerely,

${block(input.patientName, '[Your Full Name]')}
${block(input.patientAddress, '[Street Address]')}
${block(input.patientCityStateZip, '[City, State ZIP]')}
${block(input.patientName, '[Your Name]')} (printed)`;

  return {
    subject: `Billing dispute — account ${block(input.accountNumber, '[Account Number]')} — charge review requested`,
    body,
    disclaimer:
      'Editable template for informational purposes only. Not legal advice. Consider sending via certified mail and keeping copies of all correspondence.',
  };
}

function buildDuplicateLetter(input: DisputeLetterInput): DisputeLetterResult {
  const body = `${todayFormatted()}

${block(input.providerName, '[Provider / Billing Department Name]')}
${block(input.providerAddress, '[Provider Billing Address]')}

Re: Duplicate charge dispute — account ${block(input.accountNumber, '[Account Number]')}
Patient: ${block(input.patientName, '[Your Full Name]')}
Service date: ${block(input.serviceDate, '[Date of Service]')}

Dear Billing Department,

I believe my account includes duplicate charge(s) for the same service on the same date. Please review and remove any duplicate line items:

${block(input.lineItems, '[List duplicate CPT codes, descriptions, and amounts — e.g. "99213 Office visit $185.00 appears twice on 01/15/2026"]')}

Total amount in dispute: $${block(input.amountDisputed, '[Amount]')}

Duplicate billing can occur when the same procedure is listed on both a facility bill and a professional bill, when a claim is resubmitted, or when a line is entered twice in error. I am requesting an itemized reconciliation showing each unique service date and CPT code billed only once.

Please issue a corrected statement and confirm whether any payment already made should be refunded or credited.

${input.additionalNotes.trim() ? `\nAdditional context:\n${input.additionalNotes.trim()}\n` : ''}
Sincerely,

${block(input.patientName, '[Your Full Name]')}
${block(input.patientAddress, '[Street Address]')}
${block(input.patientCityStateZip, '[City, State ZIP]')}
${block(input.patientName, '[Your Full Name]')} (printed)`;

  return {
    subject: `Duplicate charge dispute — account ${block(input.accountNumber, '[Account Number]')}`,
    body,
    disclaimer:
      'Editable template for informational purposes only. Not legal advice. Attach copies of your itemized bill highlighting duplicate lines.',
  };
}

function buildSurpriseBillLetter(input: DisputeLetterInput): DisputeLetterResult {
  const body = `${todayFormatted()}

${block(input.providerName, '[Provider / Billing Department Name]')}
${block(input.providerAddress, '[Provider Billing Address]')}

Re: Surprise billing / balance bill review — account ${block(input.accountNumber, '[Account Number]')}
Patient: ${block(input.patientName, '[Your Full Name]')}
Service date: ${block(input.serviceDate, '[Date of Service]')}

Dear Billing Department,

I received a bill from an out-of-network provider for services related to care at an in-network facility (or emergency care). I am requesting a review under applicable federal surprise-billing protections, including the No Surprises Act where relevant.

Disputed service(s):
${block(input.lineItems, '[List provider name, CPT codes, and billed amounts]')}

Amount in dispute: $${block(input.amountDisputed, '[Amount]')}

I understand that for many insured patients, out-of-network providers at in-network facilities — and many emergency services — should be limited to in-network cost-sharing, not full balance billing. Please:
1. Confirm whether this claim was processed as in-network or out-of-network
2. Provide an updated statement reflecting in-network cost-sharing if federal protections apply
3. Send any required Good Faith Estimate or Independent Dispute Resolution notices already issued

This letter is not a waiver of any rights under my health plan or applicable law.

${input.additionalNotes.trim() ? `\nAdditional context:\n${input.additionalNotes.trim()}\n` : ''}
Sincerely,

${block(input.patientName, '[Your Full Name]')}
${block(input.patientAddress, '[Street Address]')}
${block(input.patientCityStateZip, '[City, State ZIP]')}
${block(input.patientName, '[Your Full Name]')} (printed)`;

  return {
    subject: `Surprise billing review requested — account ${block(input.accountNumber, '[Account Number]')}`,
    body,
    disclaimer:
      'Editable template for informational purposes only. Not legal advice. Also contact your insurer and consider using our Surprise Bill Checker for context before sending.',
  };
}

export function buildDisputeLetter(input: DisputeLetterInput): DisputeLetterResult {
  switch (input.template) {
    case 'duplicate':
      return buildDuplicateLetter(input);
    case 'surprise-bill':
      return buildSurpriseBillLetter(input);
    default:
      return buildOverchargeLetter(input);
  }
}
