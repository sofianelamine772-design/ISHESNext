import Link from "next/link";
import { BoutiqueHero } from "@/components/vitrine/BoutiqueHero";
import { BoutiqueProducts } from "@/components/vitrine/BoutiqueProducts";
import { BoutiqueFaq } from "@/components/vitrine/BoutiqueFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, booksJsonLd, faqJsonLd } from "@/lib/seo";
import { BOUTIQUE_BOOKS, boutiqueBookDescription } from "@/lib/boutique-catalog";

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
    "Livres ISHES : La Chahada, Sîrah du Prophète, carnet d’invocations, planner Ramadan et Les Clés du Coran.",
  path: "/boutique",
  keywords: [
    "clés du coran",
    "boutique islamique",
    "manuel tajwid",
    "livre chahada",
    "sirah enfant",
    "carnet d'invocation",
    "planner ramadan",
    "institut ishes",
  ],
});

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-ishes-blue selection:text-white">
      <JsonLd data={faqJsonLd(BOUTIQUE_FAQS)} />
      <JsonLd
        data={booksJsonLd(
          BOUTIQUE_BOOKS.map((book) => ({
            name: book.title,
            description: boutiqueBookDescription(book),
            image: book.image,
            price: book.priceValue,
            url: book.amazonUrl,
          })),
        )}
      />
      <BoutiqueHero />
      <BoutiqueProducts />
      <BoutiqueFaq />
      <section id="librairie" className="px-6 pb-24 scroll-mt-28">
        <div className="max-w-3xl mx-auto bg-white border border-[#e4dccb] rounded-3xl px-6 py-8 sm:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6e5730]">
            Librairie ISHES
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#101828] leading-tight">
            Des livres pour lire, réviser et comprendre
          </h2>
          <div className="mt-4 space-y-4 text-sm text-[#344054] leading-relaxed">
            <p>
              La boutique de l’Institut ISHES réunit les livres utilisés à la maison et dans les cours.
              La collection Tarbiya islamiya commence par{" "}
              <a href="#chahada" className="font-bold text-ishes-blue">La Chahada</a>,
              puis la{" "}
              <a href="#mohammed" className="font-bold text-ishes-blue">Sîrah du Prophète ﷺ</a>.
              Le{" "}
              <a href="#invocation" className="font-bold text-ishes-blue">carnet d’invocation</a>{" "}
              sert à apprendre et à revoir les dou‘â du quotidien, en arabe, en phonétique et en français.
              Le{" "}
              <a href="#ramadan" className="font-bold text-ishes-blue">planner de Ramadan</a>{" "}
              aide l’enfant à suivre les trente jours : Coran, prière, dhikr et bilan.
            </p>
            <p>
              <Link href="/fr/les-cles-du-coran" className="font-bold text-ishes-blue">
                Les Clés du Coran
              </Link>{" "}
              sont l’adaptation francophone de Nour Al Bayan. C’est le support du{" "}
              <Link href="/fr/cours-lecture-tajwid" className="font-bold text-ishes-blue">
                cours de Tajwid
              </Link>{" "}
              et du{" "}
              <Link href="/fr/cours-tajwid-intensif" className="font-bold text-ishes-blue">
                Tajwid intensif
              </Link>
              . Le livre montre la règle. L’enseignant corrige la lecture. Chaque fiche ci-dessus
              détaille le contenu, le prix, et le lien pour commander.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
