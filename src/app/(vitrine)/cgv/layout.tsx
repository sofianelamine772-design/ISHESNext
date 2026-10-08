import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/cgv") },
  openGraph: {
    url: absoluteUrl("/cgv"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Conditions Générales de Vente | Institut ISHES",
  description: "Consultez les Conditions Générales de Vente (CGV) de l'Institut ISHES, modalités d'inscription, de paiement et de remboursement.",
};

export default function CGVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
