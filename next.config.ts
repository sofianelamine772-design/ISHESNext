import type { NextConfig } from "next";

const redirectPaths = [
  'boutique',
  'civilisation-arabo-musulmane',
  'contact',
  'correction-fatiha',
  'cours-a-distance',
  'cours-al-aqida',
  'cours-anglais',
  'cours-arabe-adulte',
  'cours-arabe-enfant',
  'cours-as-sirah',
  'cours-education-islamique',
  'cours-en-presentiel',
  'cours-fiqh-malikite',
  'cours-lecture-tajwid',
  'cours-memoriser-coran',
  'cours-particuliers',
  'cours-particuliers-coran',
  'cours-sciences-coran',
  'cours-sciences-hadith',
  'cours-tajwid-enfant',
  'cours-tajwid-intensif',
  'formation-nour-al-bayane',
  'formation-tarbya-islamya',
  'pack-accompagnement',
  'plateforme-inscription',
  'question-spiritualite-islam',
  'sciences-islamiques',
  'spiritualite-islam'
];

const nextConfig: NextConfig = {
  images: {
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
      }
    ],
  },
  async redirects() {
    const redirectsList = redirectPaths.map((path) => ({
      source: `/${path}`,
      destination: `/fr/${path}`,
      permanent: true,
    }));

    // Redirection canonique de la racine (/) vers /fr pour éviter le duplicate content
    redirectsList.push({
      source: '/',
      destination: '/fr',
      permanent: true,
    });

    return redirectsList;
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
};

export default nextConfig;
