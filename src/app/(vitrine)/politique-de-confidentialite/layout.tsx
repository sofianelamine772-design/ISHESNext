import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Institut ISHES",
  description: "Consultez la politique de confidentialité de l'Institut ISHES, protection de vos données personnelles et respect de la vie privée.",
};

export default function PolitiqueConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
