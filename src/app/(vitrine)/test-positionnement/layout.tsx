import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/test-positionnement") },
  openGraph: {
    url: absoluteUrl("/test-positionnement"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Test de Niveau Arabe & Coran | ISHES",
  description: "Évaluez le niveau d'arabe ou de Tajwid de votre enfant ou le vôtre en quelques minutes grâce à notre test interactif d'orientation.",
};

export default function TestPositionnementLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
