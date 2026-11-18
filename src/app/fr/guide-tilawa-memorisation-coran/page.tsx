import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { FichePratiqueShell } from "@/components/vitrine/FichePratiqueShell";
import { TILAWA_RESOURCES, TilawaGuideBody } from "@/components/vitrine/TilawaGuideBody";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
  howToJsonLd,
} from "@/lib/seo";

const GUIDE_FAQS = [
  {
    question: "Qu’est-ce que la Tilawa du Coran ?",
    answer:
      "La Tilawa est la récitation du Coran. Dans l’apprentissage, elle fait passer de la connaissance des règles du Tajwid à leur application réelle et régulière : prononciation des lettres, prolongements, arrêts et enchaînements. L’objectif est de réciter avec justesse, fluidité et attention, pour que les hésitations diminuent et que l’attention reste sur le sens des versets. Ce guide gratuit de l’Institut ISHES en donne la méthode.",
  },
  {
    question: "Comment faire un planning de mémorisation du Coran sur 30 jours ?",
    answer:
      "Avec un tableau à remplir chaque jour : les nouveaux versets, les révisions, les difficultés rencontrées et un bilan. Tu fixes d’abord un temps quotidien réaliste, puis un jour de bilan dans le mois pour ajuster. La fiche gratuite « Mon planning de mémorisation — 30 jours » de l’Institut ISHES est prête à imprimer et se télécharge en PDF depuis ce guide, sans inscription.",
  },
  {
    question: "Par quelles sourates courtes commencer à mémoriser le Coran ?",
    answer:
      "Par celles qui servent à la prière et correspondent à ton niveau de lecture : Al-Fâtiha, Al-Ikhlâs, Al-Falaq, An-Nâs, puis Al-Kawthar, Al-‘Asr, An-Nasr, Al-Kâfirûn, Al-Masad, Quraysh, Al-Fîl et Al-Mâ‘ûn. Ce n’est pas un ordre obligatoire. Si tu en connais déjà plusieurs, fais-les écouter et corriger avant d’en ajouter. La liste des douze sourates courtes est disponible en fiche PDF gratuite.",
  },
  {
    question: "Comment réviser le Coran pour ne pas oublier ce que l’on a mémorisé ?",
    answer:
      "En distinguant trois catégories de passages : le nouveau (les versets du jour), le récent (appris ces derniers jours, encore fragile) et l’ancien (les sourates déjà mémorisées, à entretenir). Si les anciennes sourates deviennent fragiles, réduis temporairement le nouveau texte et consolide. C’est la mouraja’a. La fiche gratuite « Mon plan de révision du Coran » répartit ces trois catégories sur une semaine.",
  },
  {
    question: "Comment fluidifier sa récitation du Coran quand on hésite ?",
    answer:
      "Lis lentement, sans chercher la vitesse, sur de courts passages relus plusieurs fois. Repère une difficulté précise (une lettre, un prolongement, une ghounna, un arrêt), écoute une récitation fiable puis répète en respectant le rythme. Enregistre-toi pour comparer, fais corriger ta récitation par un enseignant, et révise les passages déjà fluides pour stabiliser les bonnes habitudes. Ces sept conseils sont réunis dans une fiche PDF gratuite.",
  },
  {
    question: "Combien de temps par jour faut-il consacrer à la mémorisation du Coran ?",
    answer:
      "Un temps que tu peux tenir tous les jours, plutôt qu’un programme ambitieux abandonné au bout d’une semaine. Un objectif modeste et régulier tient mieux qu’un volume impossible. Le planning de 30 jours proposé par l’Institut ISHES te fait noter ton temps quotidien réaliste, puis répartir ce temps entre nouveaux versets et révisions. L’enseignant, si tu suis un cours, ajuste ensuite la quantité à ta progression.",
  },
  {
    question: "Quelle est la récompense de celui qui mémorise et récite le Coran ?",
    answer:
      "Un hadith rapporté par Abû Dâwûd (1464) et At-Tirmidhî (2914) dit qu’il sera dit au compagnon du Coran : « Lis et élève-toi, et récite comme tu récitais dans le bas monde, car ta place sera au dernier verset que tu réciteras. » Le Coran lui-même demande de réciter « lentement et clairement » (sourate Al-Muzzammil, verset 4). La régularité compte donc davantage que la quantité.",
  },
  {
    question: "Comment télécharger les quatre fiches gratuites de Tilawa et de mémorisation ?",
    answer:
      "Directement depuis ce guide : chaque fiche (planning de 30 jours, liste des sourates courtes, 7 conseils de récitation, plan de révision) s’ouvre dans la page ou se télécharge en PDF pour l’imprimer. Il n’y a ni formulaire ni adresse e-mail à fournir. Sur mobile, le navigateur peut proposer le téléchargement plutôt que l’aperçu.",
  },
  {
    question: "Ce guide gratuit suffit-il, ou faut-il un enseignant pour mémoriser le Coran ?",
    answer:
      "Le guide donne la méthode, les fiches et les sourates par lesquelles commencer. Il ne remplace pas l’oreille d’un enseignant : certaines erreurs de prononciation ne s’entendent pas seul, même en s’enregistrant, et se figent une fois mémorisées. Pour un suivi, l’Institut ISHES propose la formation Mémorisation du Coran en cours individuels : 4 mois, mercredi 19h30 et dimanche 12h, en direct sur Zoom, 399 €.",
  },
];

export const metadata = buildPageMetadata({
  title: "Récitation et mémorisation du Coran",
  description:
    "Guide gratuit de Tilawa et de Hifdh : fluidifier sa récitation, réviser le Coran, 12 sourates courtes et 4 fiches PDF. Cours individuels ISHES, 399 €.",
  path: "/fr/guide-tilawa-memorisation-coran",
  keywords: [
    "tilawa",
    "récitation du coran",
    "mémoriser le coran",
    "hifdh",
    "hifz coran",
    "mouraja'a",
    "sourates courtes",
    "améliorer sa récitation",
    "cours de mémorisation du coran",
    "planning mémorisation coran",
    "institut ishes",
  ],
  image: "/images/tilawa_quran.png",
});

export default function GuideTilawaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Fiches pratiques", path: "/fr/fiches-pratiques" },
          { name: "Tilawa et mémorisation", path: "/fr/guide-tilawa-memorisation-coran" },
        ])}
      />
      <JsonLd data={faqJsonLd(GUIDE_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Comment améliorer sa récitation et mémoriser le Coran",
          description:
            "Guide ISHES de Tilawa et de Hifdh : justesse, révision, sourates courtes et fiches gratuites.",
          path: "/fr/guide-tilawa-memorisation-coran",
          image: "/images/tilawa_quran.png",
          dateModified: "2026-10-10",
          keywords: ["tilawa", "hifdh", "mémorisation du coran", "récitation"],
          wordCount: 1600,
          about: ["Tilawa", "Hifdh", "Mémorisation du Coran", "Récitation du Coran"],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment progresser en récitation et en mémorisation du Coran",
          description: "Cinq étapes proposées par l'Institut ISHES pour la Tilawa et le Hifdh.",
          path: "/fr/guide-tilawa-memorisation-coran",
          steps: [
            { name: "Choisir un passage adapté", text: "Un objectif court et régulier, utile à la prière." },
            { name: "Écouter une récitation de référence", text: "Observer l'articulation, les arrêts et les règles." },
            { name: "Lire et répéter avec attention", text: "Privilégier la justesse avant la vitesse." },
            { name: "Faire corriger les erreurs", text: "Un enseignant repère ce que l'oreille seule n'entend pas." },
            { name: "Réviser selon un planning", text: "Distinguer le nouveau, le récent et l'ancien." },
          ],
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Fiches gratuites Tilawa et mémorisation",
          itemListElement: TILAWA_RESOURCES.map((resource, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: resource.title,
            url: absoluteUrl(resource.file),
          })),
        }}
      />

      <FichePratiqueShell
        eyebrow="Guide pédagogique gratuit"
        title={
          <>
            Comment améliorer sa récitation et{" "}
            <span className="text-ishes-gold">mémoriser le Coran ?</span>
          </>
        }
        lead="Tu souhaites réciter avec plus de fluidité, corriger tes erreurs ou mémoriser quelques sourates, voire le Coran entier ? Des conseils pratiques et quatre ressources gratuites pour avancer à ton rythme."
        backHref="/fr/cours-memoriser-coran"
        backLabel="Cours Tilawa et mémorisation"
        primaryCta={{ href: "#ressources", label: "Consulter les ressources gratuites" }}
        secondaryCta={{ href: "/inscription?plan=memoriser_coran&audience=adulte", label: "Découvrir les cours individuels" }}
        readingTime="10 min de lecture"
        toc={[
          { id: "tilawa", label: "La Tilawa" },
          { id: "memorisation", label: "Mémoriser durablement" },
          { id: "methodes", label: "Méthode et 7 conseils" },
          { id: "sourates", label: "Sourates courtes" },
          { id: "ressources", label: "4 fiches gratuites" },
          { id: "cours", label: "Cours individuels" },
        ]}
        related={[
          {
            href: "/fr/cours-memoriser-coran",
            title: "Formation Tilawa et mémorisation",
            desc: "Cours individuels, 4 mois, mercredi 19h30 et dimanche 12h, 399 €.",
          },
          {
            href: "/fr/cours-lecture-tajwid",
            title: "Cours de Tajwid",
            desc: "Pour poser les règles de lecture avant d'intensifier la récitation.",
          },
          {
            href: "/fr/cours-tajwid-intensif",
            title: "Tajwid intensif",
            desc: "Lire le Coran en 3 mois, même en partant de l'alphabet.",
          },
          {
            href: "/fr/fiches-pratiques",
            title: "Toutes les fiches pratiques",
            desc: "Clés du Coran, Sciences du Coran et frise de la Révélation.",
          },
        ]}
      >
        <TilawaGuideBody />
      </FichePratiqueShell>
      <VitrineFaq
        eyebrow="FAQ guide gratuit"
        title="Questions fréquentes : planning, sourates courtes et révision du Coran"
        intro="Les réponses pratiques du guide gratuit de Tilawa et de mémorisation du Coran de l’Institut ISHES."
        items={GUIDE_FAQS}
      />
    </>
  );
}
