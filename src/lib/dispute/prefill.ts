/**
 * One-time, same-tab handoff for tool fields. Sensitive billing details must
 * never be placed in query parameters, browser history, or analytics URLs.
 */
const DISPUTE_PREFILL_KEY = 'pbg_dispute_prefill_v1';

export interface DisputePrefill {
  template: 'overcharge';
  code: string;
  amount?: string;
  benchmark: string;
}

export function storeDisputePrefill(prefill: DisputePrefill): void {
  try {
    sessionStorage.setItem(DISPUTE_PREFILL_KEY, JSON.stringify(prefill));
  } catch {
    /* A blocked sessionStorage must not stop the user from opening the tool. */
  }
}

export function consumeDisputePrefill(): DisputePrefill | null {
  try {
    const raw = sessionStorage.getItem(DISPUTE_PREFILL_KEY);
    sessionStorage.removeItem(DISPUTE_PREFILL_KEY);
    if (!raw) return null;

    const value = JSON.parse(raw) as Partial<DisputePrefill>;
    if (value.template !== 'overcharge' || typeof value.code !== 'string' || typeof value.benchmark !== 'string') {
      return null;
    }

    return {
      template: value.template,
      code: value.code.slice(0, 5),
      amount: typeof value.amount === 'string' ? value.amount.slice(0, 32) : undefined,
      benchmark: value.benchmark.slice(0, 200),
    };
  } catch {
    return null;
  }
}
