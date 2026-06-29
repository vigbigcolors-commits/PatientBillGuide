import type { MpfsGpci, MpfsRvu } from './types';

export function computeNonFacilityPayment(
  rvu: MpfsRvu,
  gpci: MpfsGpci,
  conversionFactor: number,
): number {
  const total = rvu.work * gpci.work + rvu.pe * gpci.pe + rvu.mp * gpci.mp;
  return Math.round(total * conversionFactor * 100) / 100;
}
