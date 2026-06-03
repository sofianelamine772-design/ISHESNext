import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pack Accompagnement - Boostez Votre Réussite | ISHES",
  description: "Accédez à un groupe WhatsApp d'entraide, des sessions de questions-réponses en direct et des conseils spirituels pour réussir vos études de la langue arabe.",
};

export default function PackAccompagnementLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
