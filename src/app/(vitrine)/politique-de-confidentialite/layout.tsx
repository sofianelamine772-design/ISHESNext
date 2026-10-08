import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/politique-de-confidentialite") },
  openGraph: {
    url: absoluteUrl("/politique-de-confidentialite"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Politique de Confidentialité | Institut ISHES",
  description: "Consultez la politique de confidentialité de l'Institut ISHES, protection de vos données personnelles et respect de la vie privée.",
};

export default function PolitiqueConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
