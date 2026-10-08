import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/conseil-spiritualite") },
  openGraph: {
    url: absoluteUrl("/conseil-spiritualite"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Conseil & Accompagnement Spirituel | ISHES",
  description: "Bénéficiez d'un accompagnement personnalisé et de conseils spirituels pour cheminer sereinement et renforcer votre pratique quotidienne.",
};

export default function ConseilSpiritualiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
