import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/app/', '/api/'],
    },
    sitemap: 'https://www.ishes.fr/sitemap.xml',
  };
}
