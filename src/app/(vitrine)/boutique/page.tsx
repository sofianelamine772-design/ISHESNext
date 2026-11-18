import Link from "next/link";
import { BoutiqueHero } from "@/components/vitrine/BoutiqueHero";
import { BoutiqueProducts } from "@/components/vitrine/BoutiqueProducts";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, booksJsonLd, faqJsonLd } from "@/lib/seo";
import { BOUTIQUE_BOOKS, boutiqueBookDescription } from "@/lib/boutique-catalog";

const BOUTIQUE_FAQS = [
  {
    question: "Comment commander les livres de la boutique ISHES ?",
    answer:
      "Chaque fiche de la boutique ISHES présente le contenu du livre, son prix et un bouton de commande qui renvoie vers la page du livre sur Amazon.fr. La commande, le paiement et l’expédition sont donc assurés par Amazon. Les cinq ouvrages (La Chahada, Mohammed ﷺ le Messager d’Allah, le carnet d’invocation, Mon Ramadan Planner et Les Clés du Coran) se commandent de la même manière.",
  },
  {
    question: "Quels sont les délais et frais de livraison des livres ISHES ?",
    answer:
      "Les livres de l’Institut ISHES étant commandés via Amazon.fr, les délais et frais de livraison sont ceux affichés par Amazon au moment de la commande, selon votre adresse et le mode d’expédition choisi. Vérifiez ces informations sur la page Amazon du livre avant de valider. Le prix indiqué sur chaque fiche ISHES (de 11,99 € à 15,81 €) correspond au prix de référence du livre.",
  },
  {
    question: "Les livres de la boutique ISHES existent-ils en version numérique ?",
    answer:
      "Les fiches de la boutique ISHES renvoient vers l’édition papier de chaque livre sur Amazon. Pour des ressources numériques, l’Institut ISHES propose par ailleurs des fiches pratiques gratuites en ligne (Les Clés du Coran, Sciences du Coran, frise de la Révélation), qui complètent les manuels sans les remplacer. Les manuels papier restent le support utilisé en classe et à la maison.",
  },
  {
    question: "Quel volume des Clés du Coran est vendu dans la boutique ISHES ?",
    answer:
      "La boutique propose le volume des règles du Tajwid des Clés du Coran, à 15,81 €. Il intervient après les bases de lecture (alphabet, voyelles, tahajjî) et travaille les règles essentielles : reconnaissance des symboles du Moushaf, application sur des sourates, et un poème didactique en français pour retenir les règles. Les Clés du Coran sont l’adaptation francophone de la méthode Nour Al Bayan.",
  },
  {
    question: "Dans quel ordre lire les livres de la collection Tarbiya islamiya (La Chahada, Mohammed ﷺ) ?",
    answer:
      "La collection Tarbiya islamiya s’ouvre avec La Chahada, le chemin de son cœur (14,98 €), qui explique par des histoires et des morales le sens de Lâ ilâha illa Allâh. Vient ensuite Mohammed ﷺ, le Messager d’Allah (14,98 €), une biographie accessible qui développe la seconde partie de l’attestation de foi. Les deux se lisent en famille, à voix haute ; le second peut aussi se lire seul.",
  },
  {
    question: "Le carnet d’invocation convient-il à un enfant qui ne lit pas encore l’arabe ?",
    answer:
      "Oui. Dans le carnet d’invocation ISHES (11,99 €), chaque invocation est donnée en arabe, avec une transcription phonétique pour l’enfant qui déchiffre encore, et une traduction française pour comprendre ce que l’on dit. Un tableau de suivi permet de noter ce qui est mémorisé, revu ou à reprendre. Il convient à l’enfant qui commence les invocations du quotidien comme à l’adulte qui veut une révision régulière.",
  },
  {
    question: "Comment utiliser Mon Ramadan Planner avec un enfant ?",
    answer:
      "Mon Ramadan Planner (14,98 €) organise les trente jours du mois pour l’enfant : chaque jour, il note sa lecture du Coran, ses prières, son dhikr, ses invocations et fait un bilan de la journée. Il se remplit en famille et présente le Ramadan comme un mois d’adoration, pas seulement d’abstinence. Il donne un cadre quotidien sans remplacer les explications d’un parent ou d’un enseignant.",
  },
  {
    question: "Les livres de la boutique sont-ils utilisés dans les cours de l’Institut ISHES ?",
    answer:
      "Oui. Les Clés du Coran sont le support officiel des cours de Tajwid de l’Institut ISHES, le Tajwid standard sur deux années comme le Tajwid intensif sur trois mois : le livre montre la règle, l’enseignant corrige la lecture. Les ouvrages de la collection Tarbiya islamiya, le carnet d’invocation et le planner de Ramadan sont utilisés à la maison et dans les cours d’éducation islamique pour enfants.",
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
      <VitrineFaq
        eyebrow="FAQ Boutique"
        title="Questions sur les livres et manuels ISHES"
        intro="Commande, livraison, Les Clés du Coran et la collection Tarbiya islamiya : ce qu’il faut savoir avant d’acheter un support ISHES."
        items={BOUTIQUE_FAQS}
      />
    </div>
  );
}
