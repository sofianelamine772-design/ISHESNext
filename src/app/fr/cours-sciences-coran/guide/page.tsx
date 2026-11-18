import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { FichePratiqueShell } from "@/components/vitrine/FichePratiqueShell";
import {
  SciencesDuCoranGuideArticle,
  SCIENCES_GUIDE_TOC,
} from "@/components/vitrine/SciencesDuCoranGuideArticle";
import {
  buildPageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from "@/lib/seo";

const GUIDE_FAQS = [
  {
    question: "Que contient le guide gratuit des Sciences du Coran de l'ISHES ?",
    answer:
      "Ce guide pédagogique gratuit, d'environ 18 minutes de lecture, introduit les Sciences du Coran en huit étapes : définition des ‘Ulûm al-Qur'ân, Révélation et mission du Prophète ﷺ, rôle des Compagnons, collecte du texte, grandes disciplines, manuscrits anciens (Birmingham, Sanaa, codex Parisino-petropolitanus), miracle du Coran et relation personnelle au Livre. Il est téléchargeable en PDF et complété par une frise chronologique.",
  },
  {
    question: "Que sont les Sciences du Coran (‘Ulûm al-Qur'ân) ?",
    answer:
      "Les Sciences du Coran regroupent les disciplines qui étudient la Révélation : son contexte, son déroulement, sa transmission, ses modes de récitation (qirâ'ât), l'organisation du texte et les méthodes qui éclairent son interprétation. Ce n'est pas une science unique mais un ensemble complémentaire, qui répond à des questions concrètes : pourquoi tel verset a-t-il été révélé, pourquoi plusieurs lectures reconnues existent-elles, comment comprendre un passage dans son contexte.",
  },
  {
    question: "Quelles sont les principales disciplines des Sciences du Coran ?",
    answer:
      "Le guide en présente douze dans un tableau : les asbâb an-nuzûl (circonstances de la révélation), le classement makkî/madanî, les qirâ'ât (lectures), le rasm al-mushaf (graphie des premiers codex), le tafsîr (exégèse), le nâsikh et mansûkh (abrogation), le muhkam et mutashâbih, le gharîb al-Qur'ân (vocabulaire rare), l'i‘jâz (inimitabilité), le waqf et ibtidâ' (arrêts et reprises), le tajwîd et la langue arabe avec sa rhétorique.",
  },
  {
    question: "Quelle différence entre Sciences du Coran et Tafsîr ?",
    answer:
      "Le Tafsîr cherche à expliquer le sens des versets. Les Sciences du Coran étudient plus largement les conditions, modalités et outils nécessaires à cette compréhension : histoire de la Révélation, transmission, distinction mecquois/médinois, lectures, graphie du texte. Le Tafsîr est donc l'une des disciplines des ‘Ulûm al-Qur'ân, qui lui fournissent le contexte et la méthode dont il a besoin.",
  },
  {
    question: "Les Sciences du Coran sont-elles réservées aux spécialistes ?",
    answer:
      "Non. Une introduction progressive est accessible aux débutants, à condition d'expliquer le vocabulaire et de distinguer les niveaux de complexité. C'est le rôle de ce guide, qui sépare clairement les convictions de la tradition musulmane, les récits transmis dans les sources islamiques et ce que permettent d'étudier les manuscrits anciens. Pour aller plus loin, le cours de 4 mois de l'ISHES reprend ces notions avec un enseignant.",
  },
  {
    question: "Faut-il savoir lire l'arabe pour étudier les Sciences du Coran ?",
    answer:
      "On peut découvrir l'histoire de la Révélation, de la transmission et des manuscrits en français, sans savoir lire l'arabe : c'est ce que propose ce guide. L'arabe devient indispensable pour approfondir certaines disciplines, comme les qirâ'ât, le rasm al-mushaf ou la rhétorique coranique (balâgha), qui portent directement sur la langue du texte.",
  },
  {
    question: "Que prouvent les manuscrits de Birmingham et de Sanaa ?",
    answer:
      "Le manuscrit de Birmingham comprend deux feuillets des sourates 18 à 20, dont le parchemin a été daté au radiocarbone entre 568 et 645 avec une probabilité de 95,4 % ; cette fourchette concerne la peau animale, pas forcément la date d'écriture. Le palimpseste de Sanaa éclaire les premiers états écrits du Coran, avec des variations textuelles qu'il faut étudier plutôt que nier. Les deux montrent qu'un texte coranique écrit circulait très tôt.",
  },
  {
    question: "Les manuscrits anciens prouvent-ils à eux seuls l'authenticité du Coran ?",
    answer:
      "Non, pas à eux seuls. Les manuscrits sont des témoins historiques précieux de la circulation du texte, mais un fragment isolé ne peut pas démontrer que chaque détail du texte actuel était identique dès le premier jour. Dans la perspective musulmane, l'authenticité s'établit en articulant la documentation matérielle, la tradition de récitation, les récits de collecte et la foi dans la promesse divine de préservation (Coran 15:9), sans confondre preuve historique et affirmation de foi.",
  },
  {
    question: "Qu'est-ce que l'i‘jâz, le miracle du Coran ?",
    answer:
      "L'i‘jâz al-Qur'ân désigne le caractère inimitable et miraculeux du Coran selon la tradition islamique. Les savants l'étudient à travers le défi d'inimitabilité lancé par le texte, sa langue, sa rhétorique, la portée et la cohérence de son message, et sa transmission. Le guide rappelle que l'i‘jâz ne se réduit pas à des listes de coïncidences numériques ou de prétendus miracles scientifiques : l'approche solide distingue arguments linguistiques, historiques et théologiques.",
  },
  {
    question: "Où suivre un cours de Sciences du Coran en français ?",
    answer:
      "À l'Institut ISHES, qui propose une formation en ligne de Sciences du Coran de 4 mois, à raison d'un cours par semaine en direct avec replays, pour 399 €, avec un diplôme de fin de parcours. Ce guide gratuit en est l'introduction : il permet de se familiariser avec les notions avant de les étudier en profondeur avec un enseignant.",
  },
];

export const metadata = buildPageMetadata({
  title: "Les Sciences du Coran : la fascinante histoire du Livre d'ALLAH | Institut ISHES",
  description:
    "Guide pédagogique gratuit : Révélation, mission prophétique, Compagnons, préservation, manuscrits (Birmingham, Sanaa) et miracle du Coran. Introduction ‘Ulûm al-Qur'ân — ISHES.",
  path: "/fr/cours-sciences-coran/guide",
  keywords: [
    "sciences du coran",
    "ulum al quran",
    "histoire de la révélation",
    "histoire du livre d'allah",
    "transmission du coran",
    "manuscrit birmingham coran",
    "palimpseste sanaa",
    "codex parisino-petropolitanus",
    "asbab an nuzul",
    "qiraat coran",
    "ijaz al quran",
    "makki madani",
    "collecte coran uthman",
    "guide sciences du coran gratuit",
  ],
  type: "article",
  image: "/images/formations/sc-du-coran-dsita-1.png",
});

export default function GuideSciencesCoranPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Sciences du Coran", path: "/fr/cours-sciences-coran" },
          { name: "Guide pédagogique", path: "/fr/cours-sciences-coran/guide" },
        ])}
      />
      <JsonLd data={faqJsonLd(GUIDE_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Les Sciences du Coran : la fascinante histoire du Livre d'ALLAH",
          description:
            "Guide pédagogique gratuit sur la révélation, la transmission, les manuscrits et les disciplines des ‘Ulûm al-Qur'ân.",
          path: "/fr/cours-sciences-coran/guide",
          image: "/images/formations/sc-du-coran-dsita-1.png",
          keywords: [
            "Sciences du Coran",
            "Ulum al-Quran",
            "Révélation",
            "Manuscrits coraniques",
          ],
          wordCount: 4200,
          about: [
            "Sciences du Coran",
            "Histoire de l'islam",
            "Transmission du Coran",
          ],
        })}
      />

      <FichePratiqueShell
        eyebrow="Fiche pratique · Sciences du Coran"
        title={
          <>
            Les Sciences du Coran :{" "}
            <span className="text-ishes-gold">la fascinante histoire du Livre d&apos;ALLAH</span>
          </>
        }
        lead="Guide pédagogique gratuit : Révélation, mission prophétique, Compagnons, préservation, manuscrits et miracle du Coran."
        backHref="/fr/cours-sciences-coran"
        backLabel="Cours Sciences du Coran"
        pdfHref="/fiches-pratiques/guide-sciences-du-coran.pdf"
        primaryCta={{
          href: "/inscription?plan=sciences_du_coran&audience=adulte",
          label: "Formation 4 mois — 399 €",
        }}
        secondaryCta={{
          href: "/fr/cours-sciences-coran/frise-chronologique",
          label: "Voir la frise",
        }}
        toc={SCIENCES_GUIDE_TOC}
        readingTime="18 min de lecture"
        related={[
          {
            href: "/fr/cours-sciences-coran",
            title: "Cours Sciences du Coran",
            desc: "Formation diplômante en ligne — 4 mois, 399 €.",
          },
          {
            href: "/fr/cours-sciences-coran/frise-chronologique",
            title: "Frise chronologique",
            desc: "De la Révélation à la codification de l'arabe.",
          },
          {
            href: "/fr/cours-as-sirah",
            title: "Cours de Sîrah",
            desc: "La biographie prophétique éclaire les versets.",
          },
          {
            href: "/fr/les-cles-du-coran",
            title: "Les Clés du Coran",
            desc: "Méthode pour lire et réciter correctement.",
          },
        ]}
      >
        <SciencesDuCoranGuideArticle />
      </FichePratiqueShell>

      <VitrineFaq
        eyebrow="FAQ Guide"
        title="Questions fréquentes sur le guide des Sciences du Coran"
        intro="Définitions, disciplines, manuscrits anciens et miracle du Coran : les réponses pour tirer le meilleur de ce guide gratuit des ‘Ulûm al-Qur'ân."
        items={GUIDE_FAQS}
      />
    </>
  );
}
