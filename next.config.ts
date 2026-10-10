import type { NextConfig } from "next";

const redirectPaths = [
  'boutique',
  'civilisation-arabo-musulmane',
  'contact',
  'correction-fatiha',
  'cours-a-distance',
  'cours-al-aqida',
  'cours-arabe-adulte',
  'cours-arabe-enfant',
  'cours-as-sirah',
  'cours-en-presentiel',
  'cours-fiqh-malikite',
  'cours-lecture-tajwid',
  'cours-memoriser-coran',
  'guide-tilawa-memorisation-coran',
  'cours-particuliers',
  'cours-sciences-coran',
  'cours-sciences-hadith',
  'cours-tajwid-enfant',
  'cours-tajwid-intensif',
  'formation-tarbya-islamya',
  'plateforme-inscription',
  'sciences-islamiques',
  'spiritualite-islam'
];

const nextConfig: NextConfig = {
  images: {
    // Dev uniquement : évite "internal image response is empty" (Turbopack / Next 16).
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    const frRedirects = redirectPaths.map((path) => ({
      source: `/${path}`,
      destination: `/fr/${path}`,
      permanent: true,
    }));
    return [
      { source: '/fr/cours-anglais', destination: '/program', permanent: true },
      { source: '/cours-anglais', destination: '/program', permanent: true },
      { source: '/fr/cours-education-islamique', destination: '/fr/formation-tarbya-islamya', permanent: true },
      { source: '/cours-education-islamique', destination: '/fr/formation-tarbya-islamya', permanent: true },
      { source: '/fr/formation-nour-al-bayane', destination: '/fr/cours-lecture-tajwid', permanent: true },
      { source: '/formation-nour-al-bayane', destination: '/fr/cours-lecture-tajwid', permanent: true },
      { source: '/fr/question-spiritualite-islam', destination: '/conseil-spiritualite', permanent: true },
      { source: '/question-spiritualite-islam', destination: '/conseil-spiritualite', permanent: true },
      { source: '/fr/cours-particuliers-coran', destination: '/fr/cours-particuliers', permanent: true },
      { source: '/cours-particuliers-coran', destination: '/fr/cours-particuliers', permanent: true },
      { source: '/fr/sitemap', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      ...frRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: '/app/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/sign-in/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/sign-up/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
