import Link from "next/link";
import { PackAccompagnementContent } from "@/components/vitrine/PackAccompagnementContent";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  courseJsonLd,
  faqJsonLd,
  howToJsonLd,
} from "@/lib/seo";

const PACK_ACCOMPAGNEMENT_FAQS = [
  {
    question: "Que comprend exactement le Pack Accompagnement ISHES à 49 € par an ?",
    answer:
      "Le Pack Accompagnement de l’Institut ISHES comprend quatre éléments : une communauté privée active toute l’année (groupe WhatsApp avec rappels, motivation, préparation du Ramadan et échanges entre étudiants et parents), le module exclusif Les Fondamentaux de la Spiritualité, des lives mensuels privés avec les fondateurs, et un espace de questions et d’accompagnement. L’ensemble est proposé 49 € pour un an, pour une valeur annoncée de plus de 399 €.",
  },
  {
    question: "Quelle différence entre suivre un cours seul et rejoindre le Pack Accompagnement ?",
    answer:
      "Un cours seul vous donne une heure d’enseignement par semaine, en direct, avec replays. Le Pack Accompagnement ajoute ce qui se passe entre les cours : une communauté qui vous relance quand la motivation baisse, des rappels, des lives où poser vos questions aux fondateurs et un module de spiritualité pour donner du sens à l’apprentissage. Le cours construit la connaissance ; le Pack entretient le cheminement.",
  },
  {
    question: "Comment se passent les lives mensuels avec les fondateurs de l’Institut ISHES ?",
    answer:
      "Chaque mois, les membres du Pack Accompagnement participent à un live privé avec Oustadha Rachida et Oustadh Riad, fondateurs de l’Institut ISHES. Le format est simple : vos questions, leurs conseils, des échanges sur votre progression et vos difficultés concrètes. C’est un accès direct aux fondateurs que les cours classiques, centrés sur le programme, ne permettent pas.",
  },
  {
    question: "Qu’est-ce que le module « Les Fondamentaux de la Spiritualité » inclus dans le Pack ?",
    answer:
      "Les Fondamentaux de la Spiritualité est un module exclusif réservé aux membres du Pack Accompagnement. Il se compose de quatre séances essentielles : purifier son intention, comprendre les niveaux de la religion et construire une progression vers Allah. Il pose le cadre spirituel dans lequel s’inscrivent ensuite l’arabe, le Tajwid, le Fiqh mâlikite ou la Tarbiya, pour que l’étude nourrisse le cœur et pas seulement la mémoire.",
  },
  {
    question: "À quoi sert le groupe WhatsApp privé du Pack Accompagnement ?",
    answer:
      "Le groupe WhatsApp privé est le cœur de la communauté du Pack Accompagnement. On y reçoit des rappels et de la motivation, un accompagnement spécifique pour préparer le Ramadan, et l’on y échange entre étudiants et parents de l’Institut ISHES. C’est aussi là que l’on revient quand la régularité flanche : un lieu de présence tout au long de l’année, et pas seulement pendant les séances de cours.",
  },
  {
    question: "Peut-on prendre le Pack Accompagnement sans être inscrit à une formation ISHES ?",
    answer:
      "Le Pack Accompagnement est conçu comme le complément d’un cursus : il est proposé au moment de l’inscription à une formation annuelle de l’Institut ISHES, en présentiel à Toulouse ou à distance. Le parcours est le suivant : vous choisissez une formation, vous vous inscrivez, et le Pack vous est proposé pour accompagner cette année d’étude avec la communauté, les lives et le module de spiritualité.",
  },
  {
    question: "Pourquoi le Pack Accompagnement affiche-t-il une valeur de 399 € pour 49 € ?",
    answer:
      "La valeur de 399 € correspond à ce que représentent, pris séparément, les éléments du Pack : un module de spiritualité en quatre séances, des lives mensuels privés avec les fondateurs, une communauté animée toute l’année et un accompagnement aux questions. L’Institut ISHES le propose à 49 € par an comme un engagement symbolique : l’objectif n’est pas de vendre un produit, mais que chaque élève progresse durablement sans rester isolé.",
  },
  {
    question: "Le Pack Accompagnement est-il utile pour un parent qui inscrit son enfant ?",
    answer:
      "Oui. Le Pack Accompagnement est ouvert aux étudiants adultes et aux parents qui inscrivent un enfant à l’Institut ISHES, en présentiel à Toulouse ou à distance. Le parent accède au groupe d’entraide, aux conseils, aux rappels et aux lives avec les fondateurs. Il bénéficie ainsi d’un soutien pour accompagner son enfant à la maison et pour son propre cheminement, dans une même communauté.",
  },
  {
    question: "Combien de temps dure l’accès au Pack Accompagnement ?",
    answer:
      "L’accès au Pack Accompagnement dure un an, au tarif de 49 € par an. Pendant cette année, vous profitez en continu de la communauté privée, des lives mensuels avec les fondateurs, du module Les Fondamentaux de la Spiritualité et de l’accompagnement aux questions. La durée est alignée sur celle d’une formation annuelle de l’Institut ISHES, pour un soutien constant du début à la fin du cursus.",
  },
  {
    question: "En quoi le Pack fait-il d’ISHES un institut de sciences religieuses en ligne plutôt qu’une plateforme de vidéos ?",
    answer:
      "Une plateforme vend des replays ; un institut est une présence. Le Pack Accompagnement matérialise cette différence à l’Institut ISHES : des fondateurs joignables chaque mois, une communauté qui prie pour votre réussite et répond à vos questions, un module de spiritualité et des rappels réguliers. C’est ce cadre humain, ajouté aux cours en direct et au présentiel à Toulouse, qui fait d’ISHES un institut de sciences religieuses et non un catalogue de vidéos.",
  },
];

export default function PackAccompagnementPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Pack Accompagnement", path: "/pack-accompagnement" },
        ])}
      />
      <JsonLd
        data={courseJsonLd({
          name: "Pack Accompagnement ISHES — institut de sciences religieuses en ligne",
          description:
            "Accompagnement annuel d'un institut de science religieuse en ligne : communauté, lives et spiritualité pour réussir arabe, Tajwid et sciences islamiques.",
          path: "/pack-accompagnement",
          price: "49",
          courseMode: "Online",
          image: "/images/pack-hero.png",
        })}
      />
      <JsonLd
        data={articleJsonLd({
          headline:
            "Meilleurs instituts de science religieuse en ligne : le Pack Accompagnement ISHES",
          description:
            "Comment choisir un institut de sciences religieuses en ligne en français, et ce que propose ISHES à Toulouse et à distance.",
          path: "/pack-accompagnement",
          image: "/images/pack-hero.png",
          keywords: [
            "meilleurs instituts de science religieuse en ligne",
            "institut de sciences religieuses en ligne",
            "apprendre la religion en ligne",
            "institut islamique en ligne",
            "pack accompagnement ishes",
          ],
          about: [
            "Sciences religieuses en ligne",
            "Apprendre l'islam en ligne",
            "Institut ISHES",
            "Cours de religion musulmane",
          ],
        })}
      />
      <JsonLd data={faqJsonLd(PACK_ACCOMPAGNEMENT_FAQS)} />
      <JsonLd
        data={howToJsonLd({
          name: "Comment rejoindre un institut de science religieuse en ligne (ISHES)",
          description:
            "Étapes pour s'inscrire dans un institut de sciences religieuses en français, à distance, avec un vrai suivi.",
          path: "/pack-accompagnement",
          steps: [
            {
              name: "Choisir sa formation",
              text: "Arabe, Tajwid, Fiqh mâlikite, sciences islamiques : catalogue ISHES, présentiel Toulouse ou distanciel.",
            },
            {
              name: "S'inscrire en ligne",
              text: "Inscription et paiement sécurisés. Un conseiller WhatsApp peut orienter le niveau.",
            },
            {
              name: "Activer le Pack Accompagnement",
              text: "49 €/an : groupe privé, lives, module de spiritualité, questions aux fondateurs.",
            },
            {
              name: "Cheminer toute l'année",
              text: "Cours en direct, replays, communauté et rappels pour ancrer la pratique.",
            },
          ],
        })}
      />

      <PackAccompagnementContent />

      <article className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10 text-[15px] leading-relaxed text-gray-700">
          <header className="text-center">
            <p className="text-ishes-gold font-black uppercase tracking-[0.25em] text-xs mb-3">
              Sciences religieuses · en ligne
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight">
              Meilleurs instituts de science religieuse en ligne : comment choisir
            </h2>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Un institut de sciences religieuses, pas une chaîne sans suivi
            </h3>
            <p>
              Ceux qui cherchent les <strong>meilleurs instituts de science religieuse en ligne</strong>{" "}
              comparent souvent le prix des replays. Un vrai{" "}
              <strong>institut de sciences religieuses en ligne</strong> se juge autrement : enseignants
              nommés, programme (arabe, Coran, Fiqh, Aqîda), cours en direct, communauté, et un lieu physique.
              L&apos;<strong>Institut ISHES</strong> (Institut des Sciences Humaines et Spirituelles) forme
              adultes et enfants à Toulouse et à distance — Tajwid, Fiqh mâlikite, sciences islamiques — avec
              le Pack Accompagnement pour ne pas apprendre seul.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Le Pack Accompagnement : ce qui fait d&apos;ISHES un institut, pas un replay
            </h3>
            <p>
              Une heure de cours par semaine ne suffit pas. Le Pack (49 €/an) donne une communauté privée,
              des lives avec les fondateurs, un module de spiritualité et des rappels. C&apos;est le cadre pour{" "}
              <strong>apprendre l&apos;islam en ligne</strong> sans rester isolé — y compris pour les parents qui
              inscrivent un enfant.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Par où commencer ?</h3>
            <p>
              Parcourez le{" "}
              <Link href="/program" className="text-ishes-blue font-bold hover:underline">
                catalogue des formations
              </Link>
              , les{" "}
              <Link href="/fr/cours-a-distance" className="text-ishes-blue font-bold hover:underline">
                cours à distance
              </Link>
              , le{" "}
              <Link href="/fr/cours-fiqh-malikite" className="text-ishes-blue font-bold hover:underline">
                Fiqh mâlikite
              </Link>{" "}
              ou le{" "}
              <Link href="/fr/cours-lecture-tajwid" className="text-ishes-blue font-bold hover:underline">
                Tajwid
              </Link>
              . Une question ?{" "}
              <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
                Contact WhatsApp gratuit
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <VitrineFaq
        eyebrow="FAQ Pack Accompagnement"
        title="Tout savoir sur le Pack Accompagnement ISHES"
        intro="Contenu du pack, lives avec les fondateurs, communauté et suivi : ce qui distingue un institut de sciences religieuses en ligne d’une simple plateforme de cours."
        items={PACK_ACCOMPAGNEMENT_FAQS}
      />
    </>
  );
}
