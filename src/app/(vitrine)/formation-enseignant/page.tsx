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
      "Pour devenir enseignant de Tajwid, il ne suffit pas de réciter correctement : il faut savoir transmettre. La formation enseignant de Tajwid de l'Institut ISHES (méthode Les Clés du Coran) apprend à construire une progression, expliquer chaque règle simplement, corriger sans décourager et gérer une classe. Les cours ont lieu à distance, en direct, avec certification.",
  },
  {
    question: "Comment devenir enseignant en Tarbiya Islamiyya ?",
    answer:
      "Devenir enseignant en éducation islamique, c'est apprendre à parler d'Allah aux enfants avec des mots adaptés à leur âge, à éveiller l'amour de la religion et à animer une classe avec bienveillance. La formation enseignant Tarbiya Islamiyya d'ISHES, fruit de plus de 15 ans d'expérience, forme des éducateurs pour écoles, mosquées, associations et familles.",
  },
  {
    question: "Faut-il déjà être professeur pour suivre la formation ?",
    answer:
      "Non. Les parcours s'adressent aux futurs enseignants, aux enseignants déjà en poste, aux étudiants en sciences islamiques, aux responsables d'associations ou de mosquées, et aux parents qui veulent transmettre le Coran et les valeurs de l'islam avec une vraie pédagogie.",
  },
  {
    question: "Quelle est la différence entre connaître le Tajwid et savoir l'enseigner ?",
    answer:
      "Connaître les règles permet de réciter. Enseigner demande une méthode : ordre des leçons, exemples, exercices, gestion de l'attention, correction bienveillante. C'est cette compétence professionnelle que visent les formations diplômantes ISHES.",
  },
  {
    question: "La formation enseignant ISHES est-elle reconnue ?",
    answer:
      "ISHES est un institut spécialisé en France dans la formation certifiante des enseignants en Tajwid et en Tarbiya Islamiyya. La validation des modules débouche sur une certification. Un accompagnement reste possible après la formation pour vos premiers cours.",
  },
  {
    question: "Où et comment se déroule la formation pour devenir enseignant ?",
    answer:
      "Les deux formations se font à distance, en direct sur Zoom (lundi et jeudi), pendant environ quatre mois, avec replays. Le paiement peut être étalé (jusqu'à 10 fois sans frais selon le parcours). Un devis personnalisé est proposé après un entretien gratuit.",
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
              <Link href="/contact" className="text-ishes-blue font-bold hover:underline">
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
        items={ENSEIGNANT_FAQS}
      />
    </div>
  );
}
