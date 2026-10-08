import { MetadataRoute } from 'next';
import { PROGRAMS_DATA } from '@/lib/programs-data';
import { SITE_URL } from '@/lib/seo';
import { CIVILISATION_SAVANTS, savantPath } from '@/lib/civilisation-savants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Homepage unique (pas /fr en doublon — /fr a un canonical vers /)
  const mainRoutes: Array<{ route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' },
    { route: '/program', priority: 0.95, changeFrequency: 'weekly' },
    { route: '/institut', priority: 0.9, changeFrequency: 'monthly' },
    { route: '/boutique', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/notre-histoire', priority: 0.7, changeFrequency: 'yearly' },
    { route: '/formation-enseignant', priority: 0.85, changeFrequency: 'monthly' },
    { route: '/pack-accompagnement', priority: 0.92, changeFrequency: 'weekly' },
  ];

  // Pages cours — priorité haute pour les piliers SEO
  const highPriorityCourses = [
    '/fr/cours-fiqh-malikite',
    '/fr/cours-fiqh-malikite/ibn-ashir',
    '/fr/cours-lecture-tajwid',
    '/fr/cours-tajwid-intensif',
    '/fr/les-cles-du-coran',
    '/fr/cours-sciences-coran',
    '/fr/cours-sciences-coran/guide',
    '/fr/cours-sciences-coran/frise-chronologique',
    '/fr/fiches-pratiques',
    '/fr/cours-arabe-adulte',
    '/fr/cours-memoriser-coran',
    '/fr/cours-en-presentiel',
    '/fr/cours-a-distance',
    '/fr/correction-fatiha',
    '/fr/civilisation-arabo-musulmane',
    '/fr/civilisation-arabo-musulmane/savants',
  ];

  const courseRoutes = [
    '/fr/cours-al-aqida',
    '/fr/cours-anglais',
    '/fr/cours-arabe-enfant',
    '/fr/cours-as-sirah',
    '/fr/cours-education-islamique',
    '/fr/cours-particuliers',
    '/fr/cours-particuliers-coran',
    '/fr/cours-presentiel-enfant',
    '/fr/cours-presentiel-femme-debutante',
    '/fr/cours-presentiel-femme-intermediaire',
    '/fr/cours-sciences-hadith',
    '/fr/cours-tajwid-enfant',
    '/fr/formation-enseignant-tajwid',
    '/fr/formation-enseignant-tarbya',
    '/fr/formation-nour-al-bayane',
    '/fr/formation-tarbya-islamya',
    '/fr/sciences-islamiques',
    '/fr/spiritualite-islam',
  ];

  const serviceRoutes = [
    '/contact',
    '/inscription',
    '/conseil-spiritualite',
    '/fr/question-spiritualite-islam',
    '/test-positionnement',
    '/fr/rendez-vous',
  ];

  const legalRoutes = [
    '/cgv',
    '/mentions-legales',
    '/politique-de-confidentialite',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  mainRoutes.forEach(({ route, priority, changeFrequency }) => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    });
  });

  highPriorityCourses.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  courseRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  serviceRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.65,
    });
  });

  legalRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  });

  CIVILISATION_SAVANTS.forEach((s) => {
    sitemapEntries.push({
      url: `${baseUrl}${savantPath(s.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    });
  });

  Object.keys(PROGRAMS_DATA).forEach((key) => {
    sitemapEntries.push({
      url: `${baseUrl}/program/${key}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
