import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Test de Positionnement Arabe & Coran | ISHES",
  description: "Évaluez le niveau d'arabe ou de Tajwid de votre enfant ou le vôtre en quelques minutes grâce à notre test interactif d'orientation.",
};

export default function TestPositionnementLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
