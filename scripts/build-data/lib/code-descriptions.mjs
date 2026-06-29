/**
 * Plain-English procedure labels — never copy AMA/CMS descriptions verbatim.
 * Tier-1 codes use hand-written copy; others use category heuristics.
 */

import { CPT_CODES_150 } from '../cpt-seed-150.mjs';

/** @param {string} code @param {string} [_cmsHint] unused — kept for pipeline API */
export function describeHcpcs(code, _cmsHint = '') {
  const seed = CPT_CODES_150[code];
  if (seed?.description_short) return seed.description_short;

  const n = Number.parseInt(code, 10);
  if (Number.isFinite(n)) {
    if (n >= 99201 && n <= 99215) return 'Office or outpatient visit (E/M)';
    if (n >= 99281 && n <= 99285) return 'Emergency department visit';
    if (n >= 99381 && n <= 99397) return 'Preventive medicine visit';
    if (n >= 80047 && n <= 80081) return 'Clinical laboratory panel';
    if (n >= 70010 && n <= 79999) return 'Diagnostic imaging or radiology';
    if (n >= 10021 && n <= 69990) return 'Surgical or procedural service';
    if (n >= 90000 && n <= 99199) return 'Medicine procedure or service';
    if (n >= 100 && n <= 1999) return 'Anesthesia service';
  }

  if (/^[A-Z]\d{4}$/.test(code)) return `Medicare HCPCS procedure (${code})`;

  return `Procedure code ${code}`;
}
