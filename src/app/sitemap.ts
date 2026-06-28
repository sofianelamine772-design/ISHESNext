import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ishes.fr';

  // Liste exhaustive de toutes les pages (root vitrine et pages fr) pour optimiser le SEO
  const routes = [
    '',
    '/program',
    '/formation-enseignant',
    '/institut',
    '/boutique',
    '/contact',
    '/test-positionnement',
    '/conseil-spiritualite',
    '/mentions-legales',
    '/fr',
    '/fr/boutique',
    '/fr/civilisation-arabo-musulmane',
    '/fr/contact',
    '/fr/correction-fatiha',
    '/fr/cours-a-distance',
    '/fr/cours-al-aqida',
    '/fr/cours-anglais',
    '/fr/cours-arabe-adulte',
    '/fr/cours-arabe-enfant',
    '/fr/cours-as-sirah',
    '/fr/cours-education-islamique',
    '/fr/cours-presentiel-femme-debutante',
    '/fr/cours-presentiel-femme-intermediaire',
    '/fr/cours-en-presentiel',
    '/fr/cours-fiqh-malikite',
    '/fr/cours-lecture-tajwid',
    '/fr/cours-memoriser-coran',
    '/fr/cours-particuliers',
    '/fr/cours-particuliers-coran',
    '/fr/cours-sciences-coran',
    '/fr/cours-sciences-hadith',
    '/fr/cours-tajwid-enfant',
    '/fr/cours-tajwid-intensif',
    '/fr/formation-nour-al-bayane',
    '/fr/formation-tarbya-islamya',
    '/fr/pack-accompagnement',
    '/fr/plateforme-inscription',
    '/fr/question-spiritualite-islam',
    '/fr/sciences-islamiques',
    '/fr/spiritualite-islam'
  ];

  return routes.map((route) => {
    const isMain = route === '' || route === '/fr' || route === '/program' || route === '/institut' || route === '/boutique';
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: isMain ? 'weekly' : 'monthly',
      priority: route === '' || route === '/fr' ? 1.0 : (isMain ? 0.9 : 0.8),
    };
  });
}
