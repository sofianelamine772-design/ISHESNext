import { Metadata } from 'next';
import ConseilSpiritualitePage from "@/app/(vitrine)/conseil-spiritualite/page";

export const metadata: Metadata = {
  title: "Questions Spiritualité Islam | Conseil & Accompagnement | ISHES",
  description: "Éclairez votre cheminement intérieur avec l’Institut ISHES. Nos conseillers sont à votre écoute pour vous aider à approfondir votre foi et répondre à vos doutes.",
  keywords: "spiritualité islam, conseil spirituel musulman, question islam, doute foi islam, ishes conseil"
};

export default function FrQuestionSpiritualitePage() {
  return <ConseilSpiritualitePage />;
}
