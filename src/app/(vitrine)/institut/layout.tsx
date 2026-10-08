import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/institut") },
  openGraph: {
    url: absoluteUrl("/institut"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "L'Institut en Présentiel à Toulouse | ISHES",
  description: "Découvrez nos cours de langue arabe, Coran et Tajwid en présentiel dans nos locaux à Toulouse. Pédagogie de qualité, petits groupes.",
};

export default function InstitutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
