import { TajwidStandardView } from "@/components/vitrine/TajwidStandardView";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import {
  buildPageMetadata,
  courseJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

const TAJWID_FAQS = [
  {
    question: "Comment apprendre à lire le Coran quand on est adulte et débutant ?",
    answer:
      "En partant des lettres, pas des règles. Le cours de Tajwid en ligne de l’Institut ISHES commence par l’alphabet arabe, les voyelles (harakât) et la lecture de mots simples, avant les passages coraniques courts. Il est conçu pour les adultes, hommes et femmes, qui n’ont jamais appris à lire l’arabe ou qui veulent reprendre les bases proprement, avec un enseignant qui corrige la lecture chaque semaine.",
  },
  {
    question: "Combien de temps faut-il pour apprendre à lire le Coran avec le Tajwid ?",
    answer:
      "Le cursus ISHES s’étale sur deux années scolaires, à raison d’une heure de cours par semaine. La première année construit la lecture (alphabet, voyelles, allongements, premiers passages). La deuxième année applique les règles du Tajwid dans le Moushaf : idghâm, iqlâb, ikhfâ, moudoud, lecture de sourates choisies. Les replays permettent de revoir chaque séance entre deux cours.",
  },
  {
    question: "Quelles règles du Tajwid apprend-on en première puis en deuxième année ?",
    answer:
      "La première année pose les bases : lettres et leurs sons, harakât, lecture de mots et de phrases, madd (allongements) et premières règles, avec Les Clés du Coran volume 1. La deuxième année travaille les règles essentielles du Tajwid avec le volume 2 : idghâm, iqlâb, ikhfâ, règles de prolongement, arrêts et reprises, points de sortie et caractéristiques des lettres, jusqu’à une lecture fluide dans le Moushaf.",
  },
  {
    question: "Quel support utilise-t-on dans le cours de Tajwid ISHES ?",
    answer:
      "Le support exclusif Les Clés du Coran, volumes 1 et 2, une adaptation francophone inspirée de la méthode Nour Al Bayan. Le volume 1 enseigne la lecture par le tahajjî (décomposer la lettre et son signe, puis reconstruire le mot). Le volume 2 porte les règles du Tajwid et un poème didactique en français pour les mémoriser. Le support est inclus dans la formation, et une fiche pratique gratuite le présente en détail.",
  },
  {
    question: "Pourquoi apprendre les règles du Tajwid pour lire le Coran ?",
    answer:
      "Parce que le Tajwid donne à chaque lettre son droit : son point de sortie, sa durée, sa nasalisation. Sans ces règles, on reconnaît les lettres mais on hésite devant les symboles du Moushaf et on répète les mêmes erreurs. Lire le Coran comme il a été révélé est une adoration et une préservation de la parole d’Allah. Le cours vise une lecture juste, fluide et comprise, pas une liste de règles théoriques.",
  },
  {
    question: "Quand débute la prochaine session du cours de Tajwid en ligne ?",
    answer:
      "Le cours démarre en janvier 2027. Il se suit à distance, en direct sur Zoom, à raison d’un rendez-vous d’une heure par semaine, avec les replays inclus et illimités si tu manques une séance. Entre deux cours, tu révises avec Les Clés du Coran, tu fais les exercices et tu poses tes questions dans le groupe WhatsApp privé de la classe.",
  },
  {
    question: "Combien coûte le cours de Tajwid en ligne de l’Institut ISHES ?",
    answer:
      "Le cours de Tajwid standard coûte 649 € pour l’année, payable en plusieurs fois sans frais. Le tarif comprend les cours en direct chaque semaine, les replays, le support Les Clés du Coran volumes 1 et 2, les corrections personnalisées, le groupe WhatsApp privé et le diplôme remis en fin de parcours. Un Pack Accompagnement optionnel peut s’y ajouter.",
  },
  {
    question: "Le cours de Tajwid en ligne est-il ouvert aux femmes comme aux hommes ?",
    answer:
      "Oui. Le cours de Tajwid ISHES s’adresse aux adultes, hommes et femmes, débutants acceptés. Les séances se déroulent en direct sur Zoom dans une classe bienveillante, avec un enseignant qualifié qui écoute la récitation de chacun et corrige. Les élèves suivent le cours depuis la France ou l’étranger, sans se déplacer à Toulouse.",
  },
  {
    question: "Je sais déjà lire le Coran : ce cours de Tajwid m’est-il utile ?",
    answer:
      "Oui, si tu lis sans connaître les règles que tu appliques, si tu confonds certaines lettres ou si tu ne comprends pas les symboles du Moushaf. Le cursus reprend les bases proprement puis explique chaque règle du Tajwid. Il n’est pas adapté si tu maîtrises déjà parfaitement le Tajwid : dans ce cas, le Tajwid intensif ou la formation enseignant de Tajwid de l’Institut ISHES conviennent mieux.",
  },
  {
    question: "Tajwid, Tajweed ou Tajwîd : est-ce la même chose ?",
    answer:
      "Oui. Tajwid, Tajweed et Tajwîd sont trois transcriptions du même mot arabe, qui désigne la science de la récitation correcte du Coran. L’orthographe change selon les habitudes francophones ou anglophones, mais le contenu est identique : règles de prononciation des lettres, prolongements, arrêts et symboles du Moushaf. Le cours ISHES l’enseigne en français, à partir du support Les Clés du Coran.",
  },
];

export const metadata = buildPageMetadata({
  title: "Cours de Tajwid en Ligne | Apprendre à Lire le Coran",
  description:
    "Cours de Tajwid en ligne pour adultes, y compris débutants. Parcours progressif avec Les Clés du Coran Vol. 1 & 2, cours en direct, replays et accompagnement enseignant. Tarif 649 €.",
  path: "/fr/cours-lecture-tajwid",
  keywords: [
    "cours tajwid en ligne",
    "apprendre à lire le coran",
    "tajwid débutant",
    "règles du tajwid",
    "clés du coran",
    "nour al bayan",
    "lecture moushaf",
    "tahajji",
    "institut ishes",
  ],
  image: "/images/quran-coffee.png",
});

export default function CoursLectureTajwidPage() {
  return (
    <>
      <JsonLd
        data={courseJsonLd({
          name: "Cours de Tajwid en Ligne",
          description:
            "Parcours progressif pour apprendre les bases de la lecture du Coran, comprendre les règles du Tajwid et les appliquer dans le Moushaf.",
          path: "/fr/cours-lecture-tajwid",
          price: "649",
          courseMode: "Online",
          workload: "P1Y",
          image: "/images/quran-coffee.png",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Cours de Tajwid", path: "/fr/cours-lecture-tajwid" },
        ])}
      />
      <JsonLd data={faqJsonLd(TAJWID_FAQS)} />
      <TajwidStandardView />
      <VitrineFaq
        eyebrow="FAQ cours de Tajwid"
        title="Questions fréquentes : apprendre à lire le Coran en ligne"
        intro="Tajwid pour adulte débutant, durée du cursus, règles étudiées, support Les Clés du Coran et tarif : les réponses de l’Institut ISHES."
        items={TAJWID_FAQS}
      />
    </>
  );
}
