import { BoutiqueHero } from "@/components/vitrine/BoutiqueHero";
import { BoutiqueProducts } from "@/components/vitrine/BoutiqueProducts";
import { BoutiqueFaq } from "@/components/vitrine/BoutiqueFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";

const BOUTIQUE_FAQS = [
  {
    question: "Quels sont les délais de livraison pour les supports physiques ?",
    answer:
      "Les commandes sont expédiées sous 48h ouvrées. La livraison à domicile (Colissimo) ou en point relais prend généralement 3 à 5 jours ouvrés en France métropolitaine.",
  },
  {
    question: "Les manuels achetés sont-ils fournis avec une version numérique ?",
    answer:
      "Oui. Pour chaque manuel physique acheté sur notre boutique, vous bénéficiez d'un accès à sa version PDF et aux ressources associées depuis votre espace élève.",
  },
  {
    question: "Les supports sont-ils adaptés à l'apprentissage en autonomie ?",
    answer:
      "Oui. Des éditions comme Les Clés du Coran ont été conçues pour les francophones, avec des repères clairs et des explications pour faciliter l'étude.",
  },
];

export const metadata = buildPageMetadata({
  title: "Boutique ISHES — Livres & supports pédagogiques",
  description:
    "Boutique ISHES : Les Clés du Coran, manuels et supports pour l'arabe, le Tajwid et les sciences islamiques. Livraison France et international.",
  path: "/boutique",
  keywords: [
    "clés du coran",
    "boutique islamique",
    "manuel tajwid",
    "livre arabe francophone",
    "institut ishes",
  ],
});

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-ishes-blue selection:text-white">
      <JsonLd data={faqJsonLd(BOUTIQUE_FAQS)} />
      <BoutiqueHero />
      <BoutiqueProducts />
      <BoutiqueFaq />
    </div>
  );
}
