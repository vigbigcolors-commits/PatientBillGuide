/**
 * EOB text parser with insurer templates (UHC, BCBS, Aetna, Cigna) + generic fallback.
 */

import { detectInsurer, insurerLabel } from './detect-insurer';
import { parseAetnaEob } from './templates/aetna';
import { parseBcbsEob } from './templates/bcbs';
import { parseCignaEob } from './templates/cigna';
import { parseGenericEob } from './templates/generic';
import { parseUhcEob } from './templates/uhc';
import type {
  EobAnalysis,
  EobInsight,
  EobInsurerId,
  EobInsurerMatch,
  EobLine,
  EobParseResult,
  EobSummary,
} from './types';

export type {
  EobLine,
  EobInsurerMatch,
  EobParseResult,
  EobSummary,
  EobAnalysis,
  EobInsight,
} from './types';
export { EOB_COLUMN_GLOSSARY, EOB_PIPELINE_LANES } from './types';
export { detectInsurer } from './detect-insurer';

function parseWithTemplate(raw: string, insurer: EobInsurerMatch): EobLine[] {
  switch (insurer.id) {
    case 'uhc':
      return parseUhcEob(raw);
    case 'bcbs':
      return parseBcbsEob(raw);
    case 'aetna':
      return parseAetnaEob(raw);
    case 'cigna':
      return parseCignaEob(raw);
    default:
      return parseGenericEob(raw);
  }
}

function templateNotes(insurer: EobInsurerMatch): string[] {
  if (insurer.id === 'uhc') {
    return [
      'UnitedHealthcare template: we map Date of Service, Procedure Code, Billed, Allowed, Plan Paid, and Your Share columns when present.',
    ];
  }
  if (insurer.id === 'bcbs') {
    return [
      'BCBS template: we map DOS, procedure code, Amount Billed, Allowed, Paid by Plan, and Member Owes / Amount You Owe columns when present.',
    ];
  }
  if (insurer.id === 'aetna') {
    return [
      "Aetna template: we map Date of Service, Procedure Code, Billed, Negotiated Rate, Plan's Share, and Patient's Responsibility when present.",
    ];
  }
  if (insurer.id === 'cigna') {
    return [
      'Cigna template: we map Date of Service, Procedure Code, Billed, Member Rate, Your Plan Paid, and Remaining Responsibility when present.',
    ];
  }
  return ['Generic parser: include dates, CPT codes, and dollar amounts on each service line.'];
}

export function parseEobText(raw: string): EobLine[] {
  return parseEobDocument(raw).lines;
}

export function parseEobDocument(raw: string): EobParseResult {
  const trimmed = raw.trim();
  const insurer = detectInsurer(trimmed);
  let lines = parseWithTemplate(trimmed, insurer);

  if (lines.length === 0 && insurer.id !== 'generic') {
    lines = parseGenericEob(trimmed);
  }

  return {
    lines,
    insurer,
    templateNotes: templateNotes(insurer),
  };
}

/** Re-parse with a specific insurer template (manual override). */
export function parseEobWithInsurer(raw: string, id: EobInsurerId): EobParseResult {
  const insurer: EobInsurerMatch = {
    id,
    label: insurerLabel(id),
    confidence: 'high',
  };
  let lines = parseWithTemplate(raw.trim(), insurer);
  if (lines.length === 0) lines = parseGenericEob(raw.trim());
  return {
    lines,
    insurer,
    templateNotes: [`Manual template: ${insurer.label}`, ...templateNotes(insurer)],
  };
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function summarizeEob(lines: EobLine[], insurer?: EobInsurerMatch): EobSummary {
  const codes = [...new Set(lines.map((l) => l.code).filter(Boolean))] as string[];
  const totalPatientOwes = lines.reduce((sum, l) => sum + (l.patientOwes ?? 0), 0);
  const totalBilled = lines.reduce((sum, l) => sum + (l.billed ?? 0), 0);
  const totalAllowed = lines.reduce((sum, l) => sum + (l.allowed ?? 0), 0);
  const totalPlanPaid = lines.reduce((sum, l) => sum + (l.planPaid ?? 0), 0);

  const notes: string[] = [];

  if (lines.some((l) => l.billed && l.allowed && l.billed > l.allowed * 3)) {
    notes.push(
      'Some lines show a large gap between billed and allowed amounts — common with out-of-network or hospital charges.',
    );
  }
  if (totalPatientOwes === 0 && lines.length > 0) {
    notes.push('No patient responsibility detected on parsed lines — verify you copied the full EOB.');
  }
  if (insurer?.id === 'uhc') {
    notes.push(
      'UHC EOBs often split professional vs facility claims — paste each service section if totals look incomplete.',
    );
  }
  if (insurer?.id === 'bcbs') {
    notes.push(
      'BCBS formats vary by state plan — if columns look wrong, try copying the claim detail table only.',
    );
  }
  if (insurer?.id === 'aetna') {
    notes.push(
      'Aetna EOBs may label allowed amounts as "Negotiated Rate" — we map that to the allowed column.',
    );
  }
  if (insurer?.id === 'cigna') {
    notes.push(
      'Cigna EOBs often use "Member Rate" and "Remaining Responsibility" — paste the claim detail section if totals look off.',
    );
  }

  return {
    totalPatientOwes: Math.round(totalPatientOwes * 100) / 100,
    totalBilled: Math.round(totalBilled * 100) / 100,
    totalAllowed: Math.round(totalAllowed * 100) / 100,
    totalPlanPaid: Math.round(totalPlanPaid * 100) / 100,
    lineCount: lines.length,
    codes,
    notes,
    insurer: insurer ?? { id: 'generic', label: 'Generic EOB format', confidence: 'low' },
  };
}

function buildInsights(lines: EobLine[], summary: EobSummary): EobInsight[] {
  const insights: EobInsight[] = [];

  for (const line of lines) {
    if (line.billed && line.allowed && line.billed > line.allowed * 3) {
      insights.push({
        id: `gap-${line.code ?? line.raw.slice(0, 12)}`,
        level: 'alert',
        headline: `Large billed vs allowed gap on CPT ${line.code ?? 'unknown'}`,
        detail: `Provider billed ${formatMoney(line.billed)} but the plan allowed ${formatMoney(line.allowed)}. This can happen with out-of-network care, facility fees, or hospital pricing.`,
        code: line.code,
      });
    }

    if (
      line.patientOwes != null &&
      line.patientOwes > 0 &&
      line.planPaid === 0 &&
      (line.allowed ?? 0) > 100
    ) {
      insights.push({
        id: `nopay-${line.code ?? 'line'}`,
        level: 'watch',
        headline: `Plan paid $0 on CPT ${line.code ?? 'service'} — you owe ${formatMoney(line.patientOwes)}`,
        detail:
          'When the plan pays nothing, you may be in deductible, out-of-network, or non-covered territory. Check network status and reason codes on your full EOB.',
        code: line.code,
      });
    }

    if (line.code?.startsWith('9928') && (line.patientOwes ?? 0) > 200) {
      insights.push({
        id: `er-${line.code}`,
        level: 'watch',
        headline: `High ER patient share on CPT ${line.code}`,
        detail:
          'Emergency EOB lines can split professional, facility, and imaging charges. Compare with our Surprise Bill Checker if out-of-network language appears.',
        code: line.code,
      });
    }
  }

  if (summary.totalPatientOwes === 0 && lines.length > 0) {
    insights.push({
      id: 'zero-owe',
      level: 'info',
      headline: '$0 patient responsibility on parsed lines',
      detail:
        'Preventive care in-network often shows $0 owed. Confirm you copied all service lines — facility fees may be on a separate claim.',
    });
  }

  const missingAllowed = lines.filter((l) => l.billed != null && l.allowed == null).length;
  if (missingAllowed > 0) {
    insights.push({
      id: 'missing-allowed',
      level: 'info',
      headline: `${missingAllowed} line${missingAllowed === 1 ? '' : 's'} missing allowed amount`,
      detail:
        'Try selecting your insurer template manually or paste the claim detail table with all dollar columns.',
    });
  }

  const deduped = new Map<string, EobInsight>();
  for (const item of insights) deduped.set(item.id, item);
  return [...deduped.values()];
}

export function analyzeEob(parsed: EobParseResult): EobAnalysis {
  const summary = summarizeEob(parsed.lines, parsed.insurer);
  const insights = buildInsights(parsed.lines, summary);

  const checksRun = [
    `Detected template: ${parsed.insurer.label} (${parsed.insurer.confidence} confidence)`,
    `Parsed ${parsed.lines.length} service line${parsed.lines.length === 1 ? '' : 's'} with CPT and dollar columns`,
    'Mapped billed, allowed, plan paid, and patient responsibility where present',
    'Calculated totals and patient-responsibility insights',
  ];

  const nextSteps = [
    'Compare each "You owe" amount to the provider bill — they should align after claims process.',
    'If billed is far above allowed, check network status or ask for an itemized bill.',
  ];
  if (insights.some((i) => i.level === 'alert' || i.level === 'watch')) {
    nextSteps.push(
      'Look up flagged CPT codes in our Fair Price Calculator with your ZIP for Medicare benchmarks.',
    );
    nextSteps.push('If out-of-network or emergency language appears, run our Surprise Bill Checker.');
  }
  if (summary.codes.length > 0) {
    nextSteps.push(
      'Paste matching lines from your provider bill into the Bill Auditor for duplicate and pricing flags.',
    );
  }
  nextSteps.push('Keep the EOB, provider bill, and payment receipts until the claim is fully resolved.');

  return {
    ...summary,
    insights,
    checksRun,
    nextSteps,
    templateNotes: parsed.templateNotes,
  };
}
