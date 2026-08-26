/** GA4 measurement ID — sitewide tag in BaseLayout. */
export const GA4_MEASUREMENT_ID = 'G-8N5T4H79XC';

/** localStorage key for analytics consent preference. */
export const ANALYTICS_CONSENT_KEY = 'pbg_analytics_consent';

/** EEA, UK, and Switzerland — consent required before analytics cookies/storage. */
export const CONSENT_REQUIRED_REGIONS = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'GB',
  'CH',
] as const;

export type AnalyticsConsent = 'granted' | 'denied';

/** Allowed GA4 event parameter keys — never expand without a privacy review. */
export type Ga4EventParams = {
  source_page?: string;
  tool_name?: string;
  cpt_code?: string;
};

const ALLOWED_PARAM_KEYS = new Set<keyof Ga4EventParams>(['source_page', 'tool_name', 'cpt_code']);
const CPT_CODE_RE = /^\d{5}$/;
const TOOL_NAME_RE = /^[a-z0-9_]{1,48}$/;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Current pathname for event context; empty during SSR. */
export function currentSourcePage(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname;
}

export function isConsentRequiredRegion(countryCode: string | null | undefined): boolean {
  if (!countryCode) return false;
  return (CONSENT_REQUIRED_REGIONS as readonly string[]).includes(countryCode.toUpperCase());
}

/**
 * Auto-grant analytics only for a confirmed non-EEA/UK/CH country.
 * Unknown/null/malformed → false (fail closed).
 */
export function canAutoGrantAnalytics(countryCode: string | null | undefined): boolean {
  if (!countryCode || !/^[A-Za-z]{2}$/.test(countryCode)) return false;
  return !isConsentRequiredRegion(countryCode);
}

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

/** Update Consent Mode and persist preference; fails silently if unavailable. */
export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch {
    /* localStorage may be blocked — still update Consent Mode below */
  }
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: consent,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  } catch {
    /* consent UI must never break the site */
  }
}

/** Strip disallowed/sensitive values before any GA4 event is sent. */
export function sanitizeGa4EventParams(params?: Ga4EventParams): Ga4EventParams | undefined {
  if (!params) return undefined;

  const clean: Ga4EventParams = {};

  for (const key of ALLOWED_PARAM_KEYS) {
    const raw = params[key];
    if (typeof raw !== 'string' || !raw.trim()) continue;

    if (key === 'source_page') {
      const path = raw.startsWith('/') ? raw.split('?')[0]!.split('#')[0]! : '';
      if (path.length <= 120) clean.source_page = path;
      continue;
    }

    if (key === 'tool_name') {
      const name = raw.toLowerCase();
      if (TOOL_NAME_RE.test(name)) clean.tool_name = name;
      continue;
    }

    if (key === 'cpt_code') {
      const code = raw.replace(/\D/g, '').slice(0, 5);
      if (CPT_CODE_RE.test(code)) clean.cpt_code = code;
    }
  }

  return Object.keys(clean).length ? clean : undefined;
}

/** Fire a GA4 custom event; no-op when gtag is blocked or unavailable. */
export function trackGa4Event(eventName: string, params?: Ga4EventParams): void {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    if (!/^[a-z][a-z0-9_]{0,39}$/.test(eventName)) return;
    const safe = sanitizeGa4EventParams(params);
    window.gtag('event', eventName, safe ?? {});
  } catch {
    /* analytics must never break tools */
  }
}

/** Best-effort country from Cloudflare trace (production on Cloudflare only). */
export async function detectCountryCode(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch('/cdn-cgi/trace', { credentials: 'same-origin' });
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/^loc=([A-Z]{2})$/m);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}
