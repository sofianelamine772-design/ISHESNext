import type { Metadata } from 'next';

/** URL canonique de production — une seule source de vérité SEO. */
export const SITE_URL = 'https://www.ishes.fr';

export const SITE_NAME = 'Institut ISHES';

export const DEFAULT_OG_IMAGE = '/images/institut-ishes-accueil-hero.png';

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function truncateDescription(text: string, max = 155): string {
  const clean = String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/[•\n\r]+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string | string[];
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

/**
 * Metadata SEO complète (canonical www.ishes.fr + Open Graph + Twitter).
 * À utiliser sur toutes les pages vitrine.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const desc = truncateDescription(description);

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    // absolute = évite le double suffixe du template root (« | Institut ISHES »)
    title: { absolute: fullTitle },
    description: desc,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ['ISHES', 'Institut des Sciences Humaines et Spirituelles'],
    url: SITE_URL,
    logo: absoluteUrl('/logo.png'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description:
      'Institut d\'enseignement de la langue arabe, du Coran (Tajwid) et des sciences islamiques. Cours en présentiel à Toulouse et à distance.',
    email: 'contact@ishes.fr',
    telephone: '+33666033519',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toulouse',
      addressCountry: 'FR',
    },
    areaServed: ['FR', 'BE', 'CH', 'CA', 'MA', 'DZ', 'TN'],
    sameAs: [
      'https://www.youtube.com/@institutishes',
      'https://www.instagram.com/institutishes/',
      'https://www.tiktok.com/@institutishes',
      'https://www.facebook.com/people/Institut-des-Sciences-Humaines-et-Spirituelles/100064820028202/',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/program?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

type CourseJsonLdInput = {
  name: string;
  description: string;
  path: string;
  price?: string | number;
  courseMode?: 'Online' | 'Onsite' | 'Blended';
  workload?: string;
  image?: string;
  isAccessibleForFree?: boolean;
};

export function courseJsonLd({
  name,
  description,
  path,
  price,
  courseMode = 'Online',
  workload,
  image,
  isAccessibleForFree = false,
}: CourseJsonLdInput) {
  const priceNumber =
    typeof price === 'number'
      ? String(price)
      : String(price || '')
          .replace(/[^\d.,]/g, '')
          .replace(',', '.')
          .trim();

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description: truncateDescription(description, 300),
    url: absoluteUrl(path),
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    inLanguage: 'fr',
    isAccessibleForFree,
    image: absoluteUrl(image || DEFAULT_OG_IMAGE),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode,
      inLanguage: 'fr',
      ...(workload ? { courseWorkload: workload } : {}),
      ...(priceNumber
        ? {
            offers: {
              '@type': 'Offer',
              price: priceNumber,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: absoluteUrl(path),
            },
          }
        : {}),
    },
  };

  return data;
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

type ArticleJsonLdInput = {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  keywords?: string[];
  wordCount?: number;
  isAccessibleForFree?: boolean;
  about?: string[];
};

/** Article / LearningResource JSON-LD pour fiches pédagogiques SEO. */
export function articleJsonLd({
  headline,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  datePublished = '2026-09-01',
  dateModified = '2026-10-08',
  authorName = 'Institut ISHES',
  keywords = [],
  wordCount,
  isAccessibleForFree = true,
  about = [],
}: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Article', 'LearningResource'],
    '@id': absoluteUrl(path),
    headline,
    name: headline,
    description: truncateDescription(description, 300),
    url: absoluteUrl(path),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
    image: absoluteUrl(image),
    inLanguage: 'fr-FR',
    isAccessibleForFree,
    learningResourceType: 'Guide',
    educationalLevel: 'Beginner',
    datePublished,
    dateModified,
    author: {
      '@type': authorName.includes('ISHES') ? 'Organization' : 'Person',
      name: authorName,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    ...(keywords.length ? { keywords: keywords.join(', ') } : {}),
    ...(wordCount ? { wordCount } : {}),
    ...(about.length
      ? {
          about: about.map((thing) => ({
            '@type': 'Thing',
            name: thing,
          })),
        }
      : {}),
  };
}

type HowToStep = { name: string; text: string };

export function howToJsonLd({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: HowToStep[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description: truncateDescription(description, 300),
    url: absoluteUrl(path),
    inLanguage: 'fr-FR',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
