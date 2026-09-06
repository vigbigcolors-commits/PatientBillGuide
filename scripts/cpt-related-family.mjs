/**
 * Related-link grouping is intentionally separate from categorySlug: the latter
 * drives page semantics, while diagnostics contains several clinical families.
 */
export function getCptRelatedFamily(code, categorySlug, description = '') {
  const n = Number.parseInt(code, 10);
  const d = description.toLowerCase();

  if (categorySlug === 'procedures') {
    if (n === 52000) return 'urology';
    if (n === 90471 || n === 90472) return 'immunization-administration';
    if (n === 92567) return 'audiology-diagnostics';
    if (n === 96365 || n === 96369 || n === 96374) return 'infusion-administration';
    if (n === 99406 || n === 99407) return 'tobacco-cessation';
    if (n === 99490) return 'chronic-care-management';
  }

  if (categorySlug !== 'diagnostics') return categorySlug;

  if ((n >= 92000 && n <= 92499) || d.includes('ophthalmological')) return 'ophthalmology';
  if (n >= 92500 && n <= 92799) return 'audiology';
  if (n >= 93000 && n <= 93399) return 'cardiology';
  if (n >= 94000 && n <= 94799) return 'pulmonary-diagnostics';

  return 'diagnostics';
}
