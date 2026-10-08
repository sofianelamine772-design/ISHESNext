import { TajwidStandardView } from "@/components/vitrine/TajwidStandardView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  courseJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

const TAJWID_FAQS = [
  {
    question: "Quel support utilise-t-on dans le cours de Tajwid ISHES ?",
    answer:
      "Le support exclusif Les Clés du Coran (Volume 1 & 2), adaptation francophone inspirée de Nour Al Bayan. Une fiche pratique détaille la méthode, le tahajjî et le poème didactique.",
  },
  {
    question: "Le cours convient-il aux débutants complets ?",
    answer:
      "Oui. Le Volume 1 construit les fondations (alphabet, voyelles, tahajjî). Les adultes débutants comme ceux qui veulent reprendre les bases proprement sont les bienvenus.",
  },
  {
    question: "Quel est le tarif du cursus ?",
    answer:
      "649 € pour un parcours progressif sur l'année, en direct sur Zoom, avec replays et accompagnement enseignant.",
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
    </>
  );
}
