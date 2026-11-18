import Link from "next/link";
import { FormationEnseignantHero } from "@/components/vitrine/FormationEnseignantHero";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  courseJsonLd,
  faqJsonLd,
  howToJsonLd,
} from "@/lib/seo";

const ENSEIGNANT_FAQS = [
  {
    question: "Comment devenir enseignant de Tajwid ?",
    answer:
      "Pour devenir enseignant de Tajwid, il faut passer de « je sais lire » à « je sais transmettre ». La formation enseignant de Tajwid de l’Institut ISHES, fondée sur la méthode francophone Les Clés du Coran, apprend à construire une progression, expliquer chaque règle à un débutant, corriger un élève sans le décourager et tenir une classe, en présentiel comme à distance. Elle se suit en ligne, en direct, et se termine par la certification Formation enseignant ISHES.",
  },
  {
    question: "Comment devenir enseignant en Tarbiya Islamiyya (éducation islamique) ?",
    answer:
      "Devenir enseignant en Tarbiya Islamiyya, c’est apprendre à parler d’Allah aux enfants avec des mots adaptés à leur âge, raconter la Sîrah, ancrer les piliers de la foi et poser un cadre bienveillant. La formation enseignant Tarbiya Islamiyya de l’Institut ISHES couvre la pédagogie, la gestion de classe, les outils (manuels, invocations, évaluations) et la posture de l’éducateur, pour les mosquées, associations, écoles et familles.",
  },
  {
    question: "Quelle formation choisir entre enseignant de Tajwid et enseignant de Tarbiya Islamiyya ?",
    answer:
      "Choisissez la formation enseignant de Tajwid si votre projet est d’enseigner la lecture du Coran et ses règles, à des enfants ou à des adultes. Choisissez la formation enseignant Tarbiya Islamiyya si vous voulez transmettre la foi, les valeurs et la pratique de l’islam aux enfants, en école, en mosquée ou en association. Les conseillers pédagogiques de l’Institut ISHES vous orientent gratuitement selon votre public et votre contexte.",
  },
  {
    question: "Quels sont les débouchés après une formation d’enseignant ISHES ?",
    answer:
      "Les formations d’enseignant de l’Institut ISHES préparent à enseigner dans les mosquées, les associations, les écoles coraniques et les écoles privées musulmanes, en présentiel ou à distance, ainsi qu’à transmettre le Coran et l’éducation islamique au sein de sa propre famille. Elles s’adressent aussi aux enseignants déjà en poste qui veulent structurer leurs cours et gagner en clarté, en confiance et en légitimité.",
  },
  {
    question: "Quels sont les prérequis pour entrer en formation d’enseignant à l’Institut ISHES ?",
    answer:
      "Il n’est pas nécessaire d’être déjà professeur. Les formations enseignant ISHES accueillent les futurs enseignants, les enseignants en poste, les étudiants en sciences islamiques, les imams et responsables d’associations, et les parents qui veulent transmettre avec méthode. Le prérequis essentiel est la volonté de transmettre ; le niveau en récitation ou en connaissances se consolide pendant le parcours. Un entretien gratuit valide l’adéquation du projet.",
  },
  {
    question: "Que vaut la certification Formation enseignant ISHES ?",
    answer:
      "La certification Formation enseignant ISHES est délivrée par l’Institut ISHES à l’issue du parcours validé (modules pédagogiques et évaluations). ISHES se présente comme le seul institut en France spécialisé dans la formation certifiante des enseignants en Tajwid et en Tarbiya Islamiyya, avec plus de quinze ans d’expérience. Cette certification atteste d’une compétence pédagogique, au-delà de la seule connaissance de la matière.",
  },
  {
    question: "Peut-on suivre les deux formations enseignant (Tajwid et Tarbiya) la même année ?",
    answer:
      "Les deux formations se déroulent à distance, en direct sur Zoom à 19h30, avec replays, sur 4 à 5 mois à partir d’octobre 2026 : la formation enseignant de Tajwid le lundi et le jeudi, la formation enseignant Tarbiya Islamiyya le mardi et le vendredi. Les créneaux ne se chevauchent donc pas. Pour savoir si le double parcours est réaliste dans votre situation, demandez un entretien gratuit et un devis personnalisé.",
  },
  {
    question: "Y a-t-il un accompagnement après la certification pour mes premiers cours ?",
    answer:
      "Oui. L’Institut ISHES annonce un accompagnement à 100 % : avant la formation (entretien, orientation, devis), pendant (deux cours par semaine en direct, replays, évaluations) et après la certification, pour vos premiers cours. Vous appliquez la pédagogie apprise avec la possibilité de revenir vers l’équipe pédagogique. C’est ce suivi dans la durée qui distingue une formation de métier d’un simple cycle de conférences.",
  },
  {
    question: "Quelle est la différence entre connaître le Tajwid et savoir l’enseigner ?",
    answer:
      "Connaître les règles de Tajwid permet de réciter correctement. Enseigner demande une méthode : l’ordre des leçons, les exemples, les exercices, la gestion de l’attention d’un groupe, la correction bienveillante et la réponse aux parents. Beaucoup récitent bien, peu savent transmettre. C’est cette compétence professionnelle, et non la seule récitation, que vise la formation enseignant de Tajwid de l’Institut ISHES.",
  },
];

export default function FormationEnseignantPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-blue selection:text-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Devenir enseignant", path: "/formation-enseignant" },
        ])}
      />
      <JsonLd
        data={courseJsonLd({
          name: "Formation enseignant de Tajwid — Les Clés du Coran",
          description:
            "Formation diplômante pour devenir enseignant de Tajwid : pédagogie, gestion de classe et méthode Les Clés du Coran.",
          path: "/fr/formation-enseignant-tajwid",
          courseMode: "Online",
          workload: "P16W",
        })}
      />
      <JsonLd
        data={courseJsonLd({
          name: "Formation enseignant Tarbiya Islamiyya",
          description:
            "Formation pour devenir enseignant en éducation islamique et transmettre les valeurs de l'islam aux enfants avec pédagogie.",
          path: "/fr/formation-enseignant-tarbya",
          courseMode: "Online",
          workload: "P16W",
        })}
      />
      <JsonLd data={faqJsonLd(ENSEIGNANT_FAQS)} />
      <JsonLd
        data={howToJsonLd({
          name: "Comment devenir enseignant de Tajwid ou de Tarbiya Islamiyya",
          description:
            "Étapes pour se former comme enseignant du Coran et de l'éducation islamique à l'Institut ISHES.",
          path: "/formation-enseignant",
          steps: [
            {
              name: "Clarifier votre projet d'enseignement",
              text: "Tajwid (lecture du Coran) ou Tarbiya Islamiyya (éducation des enfants), pour une mosquée, une association, une école ou la famille.",
            },
            {
              name: "Demander un entretien gratuit",
              text: "Échangez avec un conseiller ISHES pour vérifier l'adéquation du parcours et obtenir un devis.",
            },
            {
              name: "Suivre la formation à distance",
              text: "Deux cours par semaine en direct, replays, modules pédagogiques, évaluations et certification.",
            },
            {
              name: "Enseigner avec méthode",
              text: "Appliquez la pédagogie apprise ; un accompagnement post-certification reste possible.",
            },
          ],
        })}
      />

      <FormationEnseignantHero />

      <article className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10 text-[15px] leading-relaxed text-gray-600">
          <header className="text-center mb-4">
            <p className="text-ishes-gold font-black uppercase tracking-[0.25em] text-xs mb-3">
              Métier d&apos;enseignant
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight">
              Devenir enseignant du Coran et de l&apos;éducation islamique
            </h2>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Devenir enseignant de Tajwid : plus qu&apos;une belle récitation
            </h3>
            <p>
              Beaucoup de musulmans et de musulmanes récitent correctement le Coran. Peu savent{" "}
              <strong>enseigner le Tajwid</strong> : poser une progression, expliquer une règle à un débutant,
              corriger un élève sans le blesser, tenir une classe — en présentiel ou à distance.{" "}
              <strong>Devenir enseignant de Tajwid</strong>, c&apos;est passer de « je sais lire » à « je sais
              transmettre ». C&apos;est le cœur de la{" "}
              <Link href="/fr/formation-enseignant-tajwid" className="text-ishes-blue font-bold hover:underline">
                formation enseignant de Tajwid
              </Link>{" "}
              de l&apos;Institut ISHES, fondée sur la méthode francophone{" "}
              <Link href="/fr/les-cles-du-coran" className="text-ishes-blue font-bold hover:underline">
                Les Clés du Coran
              </Link>{" "}
              (inspiration Nour Al Bayan).
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Devenir enseignant en Tarbiya Islamiyya : éveiller les cœurs
            </h3>
            <p>
              <strong>Enseigner l&apos;islam aux enfants</strong> ne consiste pas à empiler des leçons. Un bon
              enseignant de Tarbiya Islamiyya sait parler d&apos;Allah avec des mots d&apos;enfant, raconter la
              Sîrah, ancrer les piliers de la foi, capter l&apos;attention et poser un cadre bienveillant. La{" "}
              <Link href="/fr/formation-enseignant-tarbya" className="text-ishes-blue font-bold hover:underline">
                formation enseignant Tarbiya Islamiyya
              </Link>{" "}
              prépare à ce métier : pédagogie, gestion de classe, outils (manuels, invocations, évaluations) et
              posture de l&apos;éducateur — pour mosquées, associations, écoles et familles.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Pourquoi se former pour enseigner, même si l&apos;on connaît déjà la science ?
            </h3>
            <p>
              Un <strong>professeur de Coran</strong> ou un <strong>enseignant d&apos;éducation islamique</strong>{" "}
              porte une responsabilité : la qualité de ce que les enfants et les adultes retiendront. Sans
              méthode, le cours fatigue, les élèves décrochent, les parents doutent. Avec une formation
              pédagogique, l&apos;enseignant gagne en clarté, en confiance et en légitimité. ISHES forme des
              enseignants depuis plus de quinze ans, en France, à distance, avec un suivi avant, pendant et après
              la certification.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">À qui s&apos;adresse ce métier ?</h3>
            <p>
              Futurs enseignants, enseignants déjà en poste, étudiants en sciences islamiques, imams et
              responsables d&apos;associations, parents qui souhaitent transmettre le Coran à la maison : la
              formation diplômante ISHES est conçue pour professionnaliser la transmission. Deux cours par
              semaine en visio, replays, évaluations, devis et paiement échelonné. Pour démarrer, demandez un{" "}
              <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
                entretien gratuit
              </Link>{" "}
              ou consultez le{" "}
              <Link href="/program" className="text-ishes-blue font-bold hover:underline">
                catalogue des formations
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <VitrineFaq
        eyebrow="FAQ — Devenir enseignant"
        title="Questions pour ceux qui veulent enseigner"
        intro="Devenir enseignant de Tajwid ou de Tarbiya Islamiyya : prérequis, débouchés, certification ISHES et accompagnement."
        items={ENSEIGNANT_FAQS}
      />
    </div>
  );
}
