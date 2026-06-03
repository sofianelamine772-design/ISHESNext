import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "L'Institut en Présentiel à Toulouse | ISHES",
  description: "Découvrez nos cours de langue arabe, Coran et Tajwid en présentiel dans nos locaux à Toulouse. Pédagogie de qualité, petits groupes.",
};

export default function InstitutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
