/** Site author — single source for bylines, schema, and EEAT. */

export const author = {
  /** Display name (initials strengthen Person schema / byline trust). */
  name: 'Vigen G.R.',
  role: 'Independent researcher & developer',
  title: 'Founder, PatientBillGuide',
  path: '/authors/vigen/',
  jobTitle: 'Independent Healthcare Billing Researcher & Developer',
  bioShort:
    'Independent researcher and developer who builds PatientBillGuide — plain-English billing guides and browser-only tools grounded in public CMS data.',
  bioLong:
    'Vigen G.R. is an independent researcher and developer focused on U.S. medical billing transparency. He founded PatientBillGuide as a standalone project — not affiliated with any hospital, insurer, or law firm. He designs the tools, writes the guides, and documents methodology and limitations openly.',
} as const;

export function getAuthorUrl(siteUrl: string): string {
  return `${siteUrl}${author.path}`;
}
