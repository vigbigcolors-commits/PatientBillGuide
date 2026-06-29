/**

 * EOB text parser with insurer templates (UHC, BCBS, Aetna, Cigna) + generic fallback.

 */



import { detectInsurer, insurerLabel } from './detect-insurer';

import { parseAetnaEob } from './templates/aetna';

import { parseBcbsEob } from './templates/bcbs';

import { parseCignaEob } from './templates/cigna';

import { parseGenericEob } from './templates/generic';

import { parseUhcEob } from './templates/uhc';

import type { EobInsurerId, EobInsurerMatch, EobLine, EobParseResult, EobSummary } from './types';



export type { EobLine, EobInsurerMatch, EobParseResult, EobSummary } from './types';

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

      'Aetna template: we map Date of Service, Procedure Code, Billed, Negotiated Rate, Plan\'s Share, and Patient\'s Responsibility when present.',

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



export function summarizeEob(lines: EobLine[], insurer?: EobInsurerMatch): EobSummary {

  const codes = [...new Set(lines.map((l) => l.code).filter(Boolean))] as string[];
  const totalPatientOwes = lines.reduce((sum, l) => sum + (l.patientOwes ?? 0), 0);

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

    lineCount: lines.length,

    codes,

    notes,

    insurer: insurer ?? { id: 'generic', label: 'Generic EOB format', confidence: 'low' },

  };

}

