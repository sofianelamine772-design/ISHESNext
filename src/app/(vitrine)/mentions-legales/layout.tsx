import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions Légales | Institut ISHES",
  description: "Consultez les mentions légales de l'Institut ISHES, conditions d'utilisation et politique de protection des données personnelles.",
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
