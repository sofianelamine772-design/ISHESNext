import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Formation d'Enseignants - Méthode Nour Al Bayane | ISHES",
  description: "Devenez enseignant certifié de la langue arabe et des règles de Tajwid avec notre formation exclusive basée sur la méthode Nour Al Bayane.",
};

export default function FormationEnseignantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
