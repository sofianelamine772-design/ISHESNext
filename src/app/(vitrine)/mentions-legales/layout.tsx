import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/mentions-legales") },
  openGraph: {
    url: absoluteUrl("/mentions-legales"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Mentions Légales | Institut ISHES",
  description: "Consultez les mentions légales de l'Institut ISHES, conditions d'utilisation et politique de protection des données personnelles.",
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
