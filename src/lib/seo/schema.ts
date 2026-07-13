/**
 * JSON-LD schema helpers for SEO.
 *
 * Software / web apps follow Google Search Central:
 * https://developers.google.com/search/docs/appearance/structured-data/software-app
 *
 * Required for Software App rich results: name, offers.price, and aggregateRating OR review.
 * We do NOT invent ratings/reviews — schema stays honest. Semantic WebApplication markup
 * still signals browser tools; rich-result eligibility can wait for real reviews.
 */

import { author } from '../../data/author';
import { site } from '../../data/site';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Google-supported applicationCategory values for SoftwareApplication. */
export type GoogleApplicationCategory =
  | 'GameApplication'
  | 'SocialNetworkingApplication'
  | 'TravelApplication'
  | 'ShoppingApplication'
  | 'SportsApplication'
  | 'LifestyleApplication'
  | 'BusinessApplication'
  | 'DesignApplication'
  | 'DeveloperApplication'
  | 'DriverApplication'
  | 'EducationalApplication'
  | 'HealthApplication'
  | 'FinanceApplication'
  | 'SecurityApplication'
  | 'BrowserApplication'
  | 'CommunicationApplication'
  | 'DesktopEnhancementApplication'
  | 'EntertainmentApplication'
  | 'MultimediaApplication'
  | 'HomeApplication'
  | 'UtilitiesApplication'
  | 'ReferenceApplication';

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

export interface WebApplicationSchemaOpts {
  name: string;
  description: string;
  url: string;
  /** Optional stable @id for @graph linking (homepage / hub). */
  id?: string;
  applicationCategory?: GoogleApplicationCategory;
  /** Schema.org Text — comma/period-separated capabilities. */
  featureList?: string | string[];
  browserRequirements?: string;
}

/**
 * Browser-only PatientBillGuide tools.
 * Uses WebApplication (Google-supported SoftwareApplication subtype) + SoftwareApplication co-type.
 */
export function webApplicationSchema(opts: WebApplicationSchemaOpts) {
  const featureList = Array.isArray(opts.featureList)
    ? opts.featureList.filter(Boolean).join('. ')
    : opts.featureList;

  return {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'SoftwareApplication'],
    ...(opts.id ? { '@id': opts.id } : {}),
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: opts.applicationCategory ?? 'HealthApplication',
    operatingSystem: 'Web browser',
    browserRequirements:
      opts.browserRequirements ??
      'Requires JavaScript. Runs entirely in your browser — no install, no account, no server-side upload of bill data.',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    ...(featureList ? { featureList } : {}),
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    creator: {
      '@type': 'Person',
      name: author.name,
      url: `${site.url}${author.path}`,
      jobTitle: author.jobTitle,
    },
  };
}
