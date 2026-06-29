import type { EobInsurerId, EobInsurerMatch } from './types';

interface InsurerPatternSet {
  id: EobInsurerId;
  label: string;
  patterns: RegExp[];
}

const INSURERS: InsurerPatternSet[] = [
  {
    id: 'uhc',
    label: 'UnitedHealthcare-style EOB',
    patterns: [
      /\bunited\s*health\s*care\b/i,
      /\bunitedhealthcare\b/i,
      /\buhc\b/i,
      /\boptum\b/i,
      /\byour\s+share\b/i,
      /\bplan\s+paid\b/i,
    ],
  },
  {
    id: 'bcbs',
    label: 'Blue Cross Blue Shield-style EOB',
    patterns: [
      /\bblue\s+cross\b/i,
      /\bblue\s+shield\b/i,
      /\bbcbs\b/i,
      /\banthem\b/i,
      /\bmember\s+(?:owes|responsibility|liability)\b/i,
      /\bamount\s+you\s+owe\b/i,
      /\bpaid\s+by\s+plan\b/i,
    ],
  },
  {
    id: 'aetna',
    label: 'Aetna-style EOB',
    patterns: [
      /\baetna\b/i,
      /\bpatient'?s?\s+responsibility\b/i,
      /\bplan'?s?\s+share\b/i,
      /\bnegotiated\s+rate\b/i,
      /\baetna\s+health\b/i,
    ],
  },
  {
    id: 'cigna',
    label: 'Cigna-style EOB',
    patterns: [
      /\bcigna\b/i,
      /\bcigna\s+healthcare\b/i,
      /\bmember\s+rate\b/i,
      /\bremaining\s+responsibility\b/i,
      /\byour\s+plan\s+paid\b/i,
    ],
  },
];

function scorePatterns(text: string, patterns: RegExp[]): number {
  let score = 0;
  for (const re of patterns) {
    if (re.test(text)) score += 1;
  }
  return score;
}

export function detectInsurer(raw: string): EobInsurerMatch {
  const head = raw.slice(0, 4000);
  const scored = INSURERS.map((ins) => ({
    ...ins,
    score: scorePatterns(head, ins.patterns),
  })).sort((a, b) => b.score - a.score);

  const best = scored[0];
  const second = scored[1];

  if (best.score >= 2 && best.score > (second?.score ?? 0)) {
    return {
      id: best.id,
      label: best.label,
      confidence: best.score >= 3 ? 'high' : 'medium',
    };
  }
  if (best.score === 1 && (second?.score ?? 0) === 0) {
    return { id: best.id, label: best.label, confidence: 'low' };
  }

  return { id: 'generic', label: 'Generic EOB format', confidence: 'low' };
}

export function insurerLabel(id: EobInsurerId): string {
  const match = INSURERS.find((i) => i.id === id);
  if (match) return match.label;
  return 'Generic EOB format';
}
