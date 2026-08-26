/** First-visible `/codes/` order — high-intent codes before numeric remainder. */
export const CODES_HUB_PRIORITY = [
  '99213',
  '99214',
  '99215',
  '99203',
  '99202',
  '99212',
  '99204',
  '99283',
  '99284',
  '99285',
  '45378',
  '45380',
  '80053',
  '85025',
  '36415',
  '84443',
  '71046',
  '77067',
  '70450',
  '74177',
  '76700',
  '72148',
  '27447',
  '66984',
] as const;

const priorityRank = new Map<string, number>(CODES_HUB_PRIORITY.map((code, i) => [code, i]));

export function sortCodesForHub<T extends { code: string }>(codes: T[]): T[] {
  return [...codes].sort((a, b) => {
    const ra = priorityRank.has(a.code) ? priorityRank.get(a.code)! : Number.POSITIVE_INFINITY;
    const rb = priorityRank.has(b.code) ? priorityRank.get(b.code)! : Number.POSITIVE_INFINITY;
    if (ra !== rb) return ra - rb;
    return a.code.localeCompare(b.code, undefined, { numeric: true });
  });
}
