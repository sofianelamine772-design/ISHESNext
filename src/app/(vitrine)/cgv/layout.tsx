import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Institut ISHES",
  description: "Consultez les Conditions Générales de Vente (CGV) de l'Institut ISHES, modalités d'inscription, de paiement et de remboursement.",
};

export default function CGVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
