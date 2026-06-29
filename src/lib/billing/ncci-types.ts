export interface NcciColumn2Edit {
  column2: string;
  modifier: 0 | 1;
  rationale: string;
}

/** Legacy flat pair (seed subset). */
export interface NcciPtpEdit {
  column1: string;
  column2: string;
  modifier: 0 | 1;
  rationale: string;
}

export interface NcciDataset {
  version: string;
  source: string;
  pairCount?: number;
  /** Pre-indexed edits keyed by column1 HCPCS — preferred for full quarterly files. */
  index?: Record<string, NcciColumn2Edit[]>;
  /** Flat list — legacy launch subset only. */
  pairs?: NcciPtpEdit[];
}
