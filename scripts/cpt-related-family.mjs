/**
 * Related-link grouping is intentionally separate from categorySlug: the latter
 * drives page semantics, while diagnostics contains several clinical families.
 */
export function getCptRelatedFamily(code, categorySlug, description = '') {
  if (categorySlug !== 'diagnostics') return categorySlug;

  const n = Number.parseInt(code, 10);
  const d = description.toLowerCase();

  if ((n >= 92000 && n <= 92499) || d.includes('ophthalmological')) return 'ophthalmology';
  if (n >= 92500 && n <= 92799) return 'audiology';
  if (n >= 93000 && n <= 93399) return 'cardiology';
  if (n >= 94000 && n <= 94799) return 'pulmonary-diagnostics';

  return 'diagnostics';
}
