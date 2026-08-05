import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ishes.fr';

  // Routes principales (haute priorité, mises à jour régulières)
  const mainRoutes = [
    '',
    '/fr',
    '/program',
    '/institut',
    '/boutique',
    '/fr/boutique',
    '/notre-histoire',
    '/formation-enseignant'
  ];

  // Routes des cours et formations (priorité moyenne, mises à jour mensuelles)
  const courseRoutes = [
    '/fr/civilisation-arabo-musulmane',
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
    '/fr/cours-particuliers',
    '/fr/cours-particuliers-coran',
    '/fr/cours-presentiel-enfant',
    '/fr/cours-presentiel-femme-debutante',
    '/fr/cours-presentiel-femme-intermediaire',
    '/fr/cours-sciences-coran',
    '/fr/cours-sciences-hadith',
    '/fr/cours-tajwid-enfant',
    '/fr/cours-tajwid-intensif',
    '/fr/cours-tilawa',
    '/fr/formation-enseignant-tajwid',
    '/fr/formation-enseignant-tarbya',
    '/fr/formation-nour-al-bayane',
    '/fr/formation-tarbya-islamya',
    '/fr/pack-accompagnement',
    '/pack-accompagnement',
    '/fr/sciences-islamiques',
    '/fr/spiritualite-islam'
  ];

  // Routes de services et contact (priorité normale, mises à jour mensuelles/annuelles)
  const serviceRoutes = [
    '/contact',
    '/fr/contact',
    '/inscription',
    '/fr/plateforme-inscription',
    '/conseil-spiritualite',
    '/fr/question-spiritualite-islam',
    '/test-positionnement'
  ];

  // Routes légales (faible priorité, mises à jour annuelles)
  const legalRoutes = [
    '/cgv',
    '/mentions-legales',
    '/politique-de-confidentialite'
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Mapping des routes principales
  mainRoutes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' || route === '/fr' ? 1.0 : 0.9,
    });
  });

  // Mapping des routes de cours
  courseRoutes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Mapping des routes de services
  serviceRoutes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Mapping des routes légales
  legalRoutes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    });
  });

  return sitemap;
}
