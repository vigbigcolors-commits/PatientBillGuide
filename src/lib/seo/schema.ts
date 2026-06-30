/**
 * JSON-LD schema helpers for SEO.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: `${siteUrl}${item.url}` } : {}),
    })),
  };
}

export function personSchema(opts: {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    url: opts.url,
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.description ? { description: opts.description } : {}),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  dateModified: string;
  datePublished?: string;
  authorName: string;
  authorUrl: string;
  authorJobTitle?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    dateModified: opts.dateModified,
    datePublished: opts.datePublished ?? opts.dateModified,
    author: personSchema({
      name: opts.authorName,
      url: opts.authorUrl,
      jobTitle: opts.authorJobTitle,
    }),
    publisher: {
      '@type': 'Organization',
      name: 'PatientBillGuide',
      url: 'https://patientbillguide.com',
    },
  };
}

export function medicalWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  dateModified: string;
  authorName: string;
  authorUrl: string;
  authorJobTitle?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    dateModified: opts.dateModified,
    author: personSchema({
      name: opts.authorName,
      url: opts.authorUrl,
      jobTitle: opts.authorJobTitle,
    }),
    publisher: { '@type': 'Organization', name: 'PatientBillGuide', url: 'https://patientbillguide.com' },
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  url: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function organizationSchema(opts: {
  name: string;
  url: string;
  description: string;
  founderName?: string;
  founderUrl?: string;
  founderJobTitle?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    ...(opts.founderName
      ? {
          founder: personSchema({
            name: opts.founderName,
            url: opts.founderUrl ?? opts.url,
            jobTitle: opts.founderJobTitle,
          }),
        }
      : {}),
  };
}

export function aboutPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'PatientBillGuide',
      url: 'https://patientbillguide.com',
    },
  };
}

export function webApplicationSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}
