import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conseil & Accompagnement Spirituel | ISHES",
  description: "Bénéficiez d'un accompagnement personnalisé et de conseils spirituels pour cheminer sereinement et renforcer votre pratique quotidienne.",
};

export default function ConseilSpiritualiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
