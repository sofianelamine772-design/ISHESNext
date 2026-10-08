import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/cours-particuliers") },
  openGraph: {
    url: absoluteUrl("/fr/cours-particuliers"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Cours Particuliers de Coran & Tajwid | ISHES",
  description: "Apprenez le Coran et les règles de Tajwid avec un professeur particulier. Accompagnement sur-mesure à distance pour adultes et enfants.",
};

export default function CoursParticuliersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
