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
  'plateforme-inscription',
  'question-spiritualite-islam',
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
    // Anciennes URLs sans /fr → pages FR
    return redirectPaths.map((path) => ({
      source: `/${path}`,
      destination: `/fr/${path}`,
      permanent: true,
    }));
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
