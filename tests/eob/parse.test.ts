import { describe, expect, it } from 'vitest';
import { detectInsurer } from '../../src/lib/eob/detect-insurer';
import { parseEobDocument, parseEobWithInsurer, summarizeEob } from '../../src/lib/eob/parse';

const UHC_SAMPLE = `UnitedHealthcare
Explanation of Benefits

Date of Service: 01/15/2026
Procedure Code: 99213
Service: Office visit
Amount Billed: $185.00
Allowed Amount: $108.42
Plan Paid: $80.00
Your Share: $28.42

Date of Service: 01/15/2026
Procedure Code: 80053
Service: Metabolic panel
Amount Billed: $45.00
Allowed Amount: $13.22
Plan Paid: $10.00
Your Share: $3.22`;

const BCBS_SAMPLE = `Blue Cross Blue Shield
Explanation of Benefits

DOS          Proc    Description                         Amount Billed   Allowed Amount   Paid by Plan   Amount You Owe
01/15/2026   99213   OFFICE VISIT                        $185.00         $108.42            $80.00         $28.42
01/15/2026   80053   METABOLIC PANEL                     $45.00          $13.22             $10.00         $3.22`;

const AETNA_SAMPLE = `Aetna
Explanation of Benefits

Date of Service: 03/02/2026
Procedure Code: 99213
Service: Office visit established patient
Amount Billed: $185.00
Negotiated Rate: $108.42
Plan's Share: $80.00
Patient's Responsibility: $28.42

Date of Service: 03/02/2026
Procedure Code: 80053
Service: Comprehensive metabolic panel
Amount Billed: $45.00
Negotiated Rate: $13.22
Plan's Share: $10.00
Patient's Responsibility: $3.22`;

const CIGNA_SAMPLE = `Cigna Healthcare
Explanation of Benefits

Date of Service: 04/10/2026
Procedure Code: 99213
Service: Office visit
Amount Billed: $185.00
Member Rate: $108.42
Your Plan Paid: $80.00
Remaining Responsibility: $28.42

Date of Service: 04/10/2026
Procedure Code: 93000
Service: Electrocardiogram
Amount Billed: $89.00
Member Rate: $17.84
Your Plan Paid: $14.00
Remaining Responsibility: $3.84`;

describe('detectInsurer', () => {
  it('detects UnitedHealthcare', () => {
    const m = detectInsurer(UHC_SAMPLE);
    expect(m.id).toBe('uhc');
    expect(m.confidence).not.toBe('low');
  });

  it('detects Blue Cross Blue Shield', () => {
    const m = detectInsurer(BCBS_SAMPLE);
    expect(m.id).toBe('bcbs');
  });

  it('detects Aetna', () => {
    const m = detectInsurer(AETNA_SAMPLE);
    expect(m.id).toBe('aetna');
    expect(m.confidence).not.toBe('low');
  });

  it('detects Cigna', () => {
    const m = detectInsurer(CIGNA_SAMPLE);
    expect(m.id).toBe('cigna');
    expect(m.confidence).not.toBe('low');
  });
});

describe('parseEobDocument', () => {
  it('parses UHC block format with all columns', () => {
    const { lines, insurer } = parseEobDocument(UHC_SAMPLE);
    expect(insurer.id).toBe('uhc');
    expect(lines).toHaveLength(2);
    expect(lines[0].code).toBe('99213');
    expect(lines[0].billed).toBe(185);
    expect(lines[0].allowed).toBe(108.42);
    expect(lines[0].planPaid).toBe(80);
    expect(lines[0].patientOwes).toBe(28.42);
  });

  it('parses BCBS table format', () => {
    const { lines, insurer } = parseEobDocument(BCBS_SAMPLE);
    expect(insurer.id).toBe('bcbs');
    expect(lines.length).toBeGreaterThanOrEqual(2);
    expect(lines[0].code).toBe('99213');
    expect(lines[0].patientOwes).toBe(28.42);
  });

  it('parses Aetna block format with Negotiated Rate', () => {
    const { lines, insurer } = parseEobDocument(AETNA_SAMPLE);
    expect(insurer.id).toBe('aetna');
    expect(lines).toHaveLength(2);
    expect(lines[0].allowed).toBe(108.42);
    expect(lines[0].patientOwes).toBe(28.42);
  });

  it('parses Cigna block format with Member Rate', () => {
    const { lines, insurer } = parseEobDocument(CIGNA_SAMPLE);
    expect(insurer.id).toBe('cigna');
    expect(lines).toHaveLength(2);
    expect(lines[0].allowed).toBe(108.42);
    expect(lines[0].patientOwes).toBe(28.42);
  });

  it('falls back to generic single-line format', () => {
    const raw = '01/15/2026 99213 Office visit $185.00 $108.42 $80.00 $28.42';
    const { lines } = parseEobWithInsurer(raw, 'generic');
    expect(lines).toHaveLength(1);
    expect(lines[0].patientOwes).toBe(28.42);
  });
});

describe('summarizeEob', () => {
  it('totals patient responsibility', () => {
    const { lines, insurer } = parseEobDocument(UHC_SAMPLE);
    const summary = summarizeEob(lines, insurer);
    expect(summary.totalPatientOwes).toBe(31.64);
    expect(summary.codes).toContain('99213');
  });
});
