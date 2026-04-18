import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ishes.fr';

  // Liste exhaustive de vos anciennes URL pour préserver le référencement
  const routes = [
    '',
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
    '/fr/cours-en-presentiel',
    '/fr/cours-fiqh-malikite',
    '/fr/cours-lecture-tajwid',
    '/fr/cours-memoriser-coran',
    '/fr/cours-particuliers-coran',
    '/fr/cours-sciences-coran',
    '/fr/cours-sciences-hadith',
    '/fr/cours-tajwid-enfant',
    '/fr/cours-tajwid-intensif',
    '/fr/formation-nour-al-bayane',
    '/fr/formation-tarbya-islamya',
    '/fr/plateforme-inscription',
    '/fr/question-spiritualite-islam',
    '/fr/spiritualite-islam'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    // Les pages principales sont scannées plus souvent
    changeFrequency: route === '' || route === '/fr' ? 'weekly' : 'monthly',
    // Priorité plus élevée pour l'accueil
    priority: route === '' || route === '/fr' ? 1 : 0.8,
  }));
}
