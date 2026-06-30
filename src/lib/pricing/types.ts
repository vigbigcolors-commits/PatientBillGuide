export const FAIR_RANGE_LOW_MULTIPLIER = 1.5;
export const FAIR_RANGE_HIGH_MULTIPLIER = 2.5;
export const WELL_ABOVE_MULTIPLIER = 1.5;

export type Confidence = 'high' | 'medium' | 'low';

export type LocalitySource = 'zip' | 'national';

export type PriceComparisonStatus =
  | 'below_medicare'
  | 'within_fair_range'
  | 'above_fair_range'
  | 'well_above_fair_range';

export interface MpfsGpci {
  work: number;
  pe: number;
  mp: number;
}

export interface MpfsLocality {
  label: string;
  gpci: MpfsGpci;
}

export interface MpfsRvu {
  work: number;
  pe: number;
  mp: number;
}

export interface MpfsCodeRecord {
  description_short: string;
  rvu: MpfsRvu;
  national_median: number;
  status?: string;
}

export interface MpfsDataset {
  version: string;
  source: string;
  conversion_factor: number;
  localities: Record<string, MpfsLocality>;
  codes: Record<string, MpfsCodeRecord>;
}

export interface ZipLocalityMap {
  [zip: string]: string;
}

/** Compact CPT index for autocomplete: [code, shortDescription] tuples. */
export interface CptIndex {
  version: string;
  codes: [string, string][];
}

export interface DataManifest {
  mpfs: {
    version: string;
    url: string;
    codeCount?: number;
    mode?: 'chunked' | 'full';
    metaUrl?: string;
    chunkUrl?: string;
  };
  zipLocality: { version: string; url: string; zipCount?: number };
  cptIndex?: { version: string; url: string; codeCount?: number };
  ncci?: {
    version: string;
    url?: string;
    pairCount?: number;
    format?: string;
    mode?: 'chunked' | 'full';
    chunkUrl?: string;
  };
  updatedAt: string;
}

export interface PriceLookupInput {
  code: string;
  zip?: string;
  /** Parsed charge; omit when field empty */
  chargedAmount?: number;
  /** Raw price field — used to detect invalid input */
  chargedAmountRaw?: string;
}

export interface UserPriceComparison {
  charged: number;
  status: PriceComparisonStatus;
  headline: string;
  detail: string;
}

export interface LocalityNotice {
  type: 'zip_matched' | 'zip_unknown' | 'zip_omitted';
  message: string;
}

export interface FacilityFeeNotice {
  level: 'info' | 'alert';
  headline: string;
  detail: string;
}

export interface PriceLookupResult {
  code: string;
  description: string;
  medicareAllowed: number;
  fairRangeLow: number;
  fairRangeHigh: number;
  localitySource: LocalitySource;
  localityLabel?: string;
  localityNotice: LocalityNotice;
  confidence: Confidence;
  userComparison?: UserPriceComparison;
  facilityFeeNotice?: FacilityFeeNotice;
  dataVersion: string;
}

export interface PriceLookupError {
  error: true;
  message: string;
}

export type PriceLookupOutcome = PriceLookupResult | PriceLookupError;

export function isPriceLookupError(r: PriceLookupOutcome): r is PriceLookupError {
  return 'error' in r && r.error === true;
}
