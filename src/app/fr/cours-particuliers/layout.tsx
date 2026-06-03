import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cours Particuliers de Coran & Tajwid | ISHES",
  description: "Apprenez le Coran et les règles de Tajwid avec un professeur particulier. Accompagnement sur-mesure à distance pour adultes et enfants.",
};

export default function CoursParticuliersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
