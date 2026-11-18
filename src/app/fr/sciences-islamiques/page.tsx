import { Metadata } from 'next';
import { absoluteUrl, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";

const SCIENCES_ISLAMIQUES_FAQS = [
  {
    question: "Qu'appelle-t-on les sciences islamiques ?",
    answer:
      "Les sciences islamiques désignent l'ensemble des disciplines qui permettent de comprendre et de pratiquer l'Islam à partir de ses sources : le fiqh (jurisprudence des actes d'adoration), l'aqîda (croyance), la Sîrah (vie du Prophète ﷺ), les sciences du Coran, les sciences du hadith et la langue arabe qui donne accès aux textes. Le cursus Sciences Islamiques de l'Institut ISHES en propose un socle cohérent, expliqué de manière claire et adaptée à notre époque.",
  },
  {
    question: "Par où commencer pour étudier les sciences islamiques en ligne ?",
    answer:
      "Le plus simple est de commencer par un socle qui relie les bases : comprendre sa croyance (aqîda), savoir comment valider ses adorations (fiqh), connaître la vie du Prophète ﷺ (Sîrah) et l'histoire du Coran. C'est exactement l'objectif du cursus Sciences Islamiques de l'ISHES, pensé pour tout musulman adulte qui cherche à acquérir les fondements de sa religion avant, éventuellement, d'approfondir une science en particulier.",
  },
  {
    question: "Quelles sciences islamiques sont enseignées dans le cursus ISHES ?",
    answer:
      "Le cursus Sciences Islamiques regroupe le fiqh et l'aqîda, pour comprendre les bases de la pratique et de la croyance, la vie du Prophète ﷺ à travers sa biographie, les sciences du Coran, ainsi qu'une introduction à l'arabe littéraire pour se familiariser avec les outils linguistiques des textes. Chaque discipline est présentée dans un programme équilibré, avec des supports de cours exclusifs.",
  },
  {
    question: "À qui s'adresse le cursus Sciences Islamiques de l'ISHES ?",
    answer:
      "Le cursus s'adresse à tout musulman adulte qui souhaite acquérir les bases fondamentales de sa religion : celui qui pratique sans avoir jamais étudié, celui qui a appris par fragments et veut un cadre structuré, ou celui qui veut vérifier ses connaissances auprès de professeurs diplômés. Aucun niveau préalable en sciences islamiques n'est demandé pour rejoindre ce socle de connaissances.",
  },
  {
    question: "Les cours de sciences islamiques ISHES sont-ils donnés en français ?",
    answer:
      "Oui. Les cours de sciences islamiques de l'Institut ISHES sont donnés en français, par des professeurs diplômés et pédagogues, pour être accessibles aux musulmans francophones de France, de Belgique, de Suisse, du Canada ou du Maghreb. Le cursus inclut une introduction à l'arabe littéraire, afin que l'étudiant commence à se repérer dans les termes techniques et les textes, sans que la maîtrise de l'arabe soit un prérequis.",
  },
  {
    question: "Comment se déroulent les cours de sciences islamiques à distance ?",
    answer:
      "Les cours du cursus Sciences Islamiques sont structurés et donnés en ligne, en direct sur Zoom, avec un replay vidéo disponible pour chaque séance. Un groupe WhatsApp de classe assure le suivi pédagogique entre les cours. L'étudiant s'inscrit en ligne, reçoit ses accès et ses supports exclusifs, puis suit le programme pendant 8 mois depuis chez lui, quel que soit son pays.",
  },
  {
    question: "Combien de temps dure le cursus Sciences Islamiques et combien coûte-t-il ?",
    answer:
      "Le cursus Sciences Islamiques de l'Institut ISHES dure 8 mois et coûte 349 € pour le programme complet, supports de cours inclus. Le tarif couvre les cours en direct, les replays, les supports exclusifs et le suivi pédagogique dans le groupe de classe. Pour une question sur le règlement ou le niveau, l'institut propose un entretien gratuit avant l'inscription.",
  },
  {
    question: "Quelle différence entre le cursus Sciences Islamiques et les cours spécialisés de Fiqh, d'Aqîda ou de Sîrah ?",
    answer:
      "Le cursus Sciences Islamiques est un socle généraliste : il présente les bases de plusieurs sciences en 8 mois pour donner une vision d'ensemble. Les cours spécialisés de l'ISHES, comme le Fiqh mâlikite ou l'Aqîda à partir du matn d'Ibn Âchir, ou la Sîrah sur 8 mois, étudient une seule science en profondeur, souvent à partir d'un texte classique. Le socle permet de commencer ; les cours spécialisés permettent d'approfondir.",
  },
  {
    question: "Qui enseigne les sciences islamiques à l'Institut ISHES ?",
    answer:
      "Les cours sont assurés par des professeurs diplômés en sciences islamiques et formés à la pédagogie pour francophones. L'Institut ISHES, implanté à Toulouse, forme des élèves depuis plus de quinze ans en présentiel et à distance. L'équipe pédagogique valide les contenus et accompagne les étudiants via le groupe de classe, pour que chacun progresse avec des réponses fiables plutôt que des informations glanées au hasard sur internet.",
  },
  {
    question: "Pourquoi étudier les sciences islamiques avec un institut plutôt que seul sur internet ?",
    answer:
      "Parce qu'apprendre seul expose aux sources contradictoires, aux raccourcis et aux lacunes qu'on ne voit pas. Un cursus structuré avec des professeurs diplômés offre une progression cohérente, la possibilité de poser ses questions en direct, des supports exclusifs et un groupe d'étudiants qui avancent ensemble. Le socle Sciences Islamiques de l'ISHES vise précisément à donner des fondations solides et authentiques pour comprendre sa pratique et sa croyance.",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/sciences-islamiques") },
  openGraph: {
    url: absoluteUrl("/fr/sciences-islamiques"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Cursus Sciences Islamiques | Fondations Solides | ISHES",
  description: "Un socle de connaissances solide et authentique pour tout musulman. Fiqh, Aqida, Sîrah et Arabe regroupés dans un programme cohérent.",
  keywords: "sciences islamiques, socle islam, cours religion toulouse, ishes, formation islamique"
};

export default function SciencesIslamiquesPage() {
  const id = "sciences_islamiques";
  const course = PROGRAMS_DATA[id];
  
  return (
    <>
      <JsonLd data={faqJsonLd(SCIENCES_ISLAMIQUES_FAQS)} />
      <CourseDetailView course={course} id={id} />
      <VitrineFaq
        eyebrow="FAQ Sciences Islamiques"
        title="Questions fréquentes sur les sciences islamiques en ligne"
        intro="Quelles sciences étudier, par où commencer, en français et à distance : les réponses pour choisir sereinement le cursus Sciences Islamiques de l'Institut ISHES."
        items={SCIENCES_ISLAMIQUES_FAQS}
      />
    </>
  );
}
