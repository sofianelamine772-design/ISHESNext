import { Metadata } from 'next';
import { absoluteUrl } from "@/lib/seo";
import ConseilSpiritualitePage from "@/app/(vitrine)/conseil-spiritualite/page";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/question-spiritualite-islam") },
  openGraph: {
    url: absoluteUrl("/fr/question-spiritualite-islam"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Questions Spiritualité Islam | Conseil & Accompagnement | ISHES",
  description: "Éclairez votre cheminement intérieur avec l’Institut ISHES. Nos conseillers sont à votre écoute pour vous aider à approfondir votre foi et répondre à vos doutes.",
  keywords: "spiritualité islam, conseil spirituel musulman, question islam, doute foi islam, ishes conseil"
};

export default function FrQuestionSpiritualitePage() {
  return <ConseilSpiritualitePage />;
}
