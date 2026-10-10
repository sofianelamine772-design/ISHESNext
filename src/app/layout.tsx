import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  // Toujours le domaine prod pour que Google résolve correctement les OG / canonical relatifs
  metadataBase: new URL(SITE_URL),
  title: {
    default: `ISHES — Arabe, Coran et sciences islamiques`,
    // Pas de suffixe auto : beaucoup de pages ont déjà « | ISHES » dans le titre
    template: "%s",
  },
  description:
    "Institut des Sciences Humaines et Spirituelles (ISHES) : cours d'arabe, Tajwid, Fiqh mâlikite et sciences islamiques. Présentiel à Toulouse et formations à distance.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  keywords: [
    "institut ishes",
    "cours arabe toulouse",
    "cours tajwid en ligne",
    "fiqh malikite",
    "sciences islamiques",
    "apprendre le coran",
    "cours islam à distance",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Arabe, Coran & Sciences Islamiques`,
    description:
      "Formations d'excellence en langue arabe, Tajwid et sciences islamiques. Présentiel Toulouse & distanciel.",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "Institut ISHES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Arabe, Coran & Sciences Islamiques`,
    description:
      "Formations d'excellence en langue arabe, Tajwid et sciences islamiques.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { frFR } from "@/lib/clerk-fr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      localization={frFR}
      appearance={{
        variables: {
          // Utiliser variables plutôt que layout (Clerk v5)
        },
        elements: {
          logoImage: "h-20 sm:h-24 w-auto object-contain",
          logoBox: "flex justify-center w-full mb-6"
        }
      }}
    >
      <html
        lang="fr"
        className={cn("antialiased", "h-full", inter.variable)}
      >
        <body className={cn(inter.className, "min-h-full flex flex-col bg-white text-ishes-dark selection:bg-ishes-blue selection:text-white")}>
          {children}
          <SpeedInsights />
          <AnalyticsTracker />
        </body>
        <GoogleAnalytics gaId="G-WS8XG0WKXZ" />
      </html>
    </ClerkProvider>
  );
}
