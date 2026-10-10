import Link from "next/link";
import Image from "next/image";
import { CourseCadenceNote } from "@/components/vitrine/CourseCadenceNote";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import {
  buildPageMetadata,
  courseJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
  howToJsonLd,
} from "@/lib/seo";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  MessageCircle,
  Monitor,
  Target,
  User,
  Users,
} from "lucide-react";

const CONTACT = "/fr/contact";
const WHATSAPP =
  "https://wa.me/33666033519?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20des%20cours%20particuliers%20de%20Coran.";

const FAQS = [
  {
    question: "Qu'est-ce qu'un cours particulier de Coran à l'Institut ISHES ?",
    answer:
      "C'est un cours en tête-à-tête, à distance, avec un enseignant ISHES. Le programme est construit selon ton niveau et ton objectif : apprendre à lire, corriger le Tajwid, réciter avec plus de justesse, ou mémoriser des sourates. Le rythme est convenu avec l'enseignant. Le tarif est sur devis.",
  },
  {
    question: "Les cours particuliers sont-ils ouverts aux enfants ?",
    answer:
      "Oui. Ils s'adressent aux adultes et aux enfants, à partir du niveau débutant. Un enfant qui a besoin de toute l'attention de l'enseignant, ou un adulte qui ne peut pas suivre un horaire de groupe, peut avancer seul avec le professeur. Les cours en groupe restent disponibles : Tajwid enfant, arabe enfant, Tajwid standard et Tajwid intensif.",
  },
  {
    question: "Peut-on commencer sans savoir lire l'arabe ?",
    answer:
      "Oui. Le parcours peut partir de l'alphabet, des voyelles et de la lecture des premiers mots. L'enseignant n'avance pas tant que la lettre n'est pas sûre. Si tu lis déjà, le cours se concentre sur les erreurs qui restent : une lettre, un prolongement, un arrêt, une règle du Tajwid.",
  },
  {
    question: "Quelle est la différence avec le cours de Tajwid en groupe ?",
    answer:
      "Le Tajwid standard (649 €) et le Tajwid intensif (799 €) suivent un calendrier fixé, avec d'autres élèves, les replays et Les Clés du Coran. Le cours particulier n'a pas d'horaire imposé : la séance est pour toi seul, le contenu change selon ce que tu dois travailler, et le prix est établi après un échange sur le rythme souhaité.",
  },
  {
    question: "Comment obtenir un devis pour des cours particuliers ?",
    answer:
      "Écris via la page Contact ou sur WhatsApp au 06 66 03 35 19. Indique si le cours est pour un adulte ou un enfant, ton niveau de lecture, ce que tu veux travailler (lecture, Tajwid, récitation, mémorisation) et les créneaux possibles. L'équipe répond pour proposer un rythme et un tarif. Il n'y a pas de paiement en ligne tant que le devis n'est pas validé.",
  },
  {
    question: "Les cours particuliers se font-ils en présentiel à Toulouse ?",
    answer:
      "Non. Cette formule est uniquement à distance, en direct avec l'enseignant. L'institut accueille aussi des classes en présentiel au 41 boulevard de Thibaud, à Toulouse, pour d'autres cursus. Le particulier permet de suivre le cours depuis la France, la Belgique, la Suisse, le Maghreb ou le Canada.",
  },
  {
    question: "Y a-t-il un certificat à la fin ?",
    answer:
      "Oui. Lorsque le parcours convenu est validé, l'Institut ISHES remet un certificat qui atteste les connaissances acquises en Tajwid. Le certificat correspond au travail réellement fait avec l'enseignant, pas à une durée unique imposée à tout le monde.",
  },
  {
    question: "Peut-on mémoriser le Coran en cours particulier ?",
    answer:
      "Oui, si c'est l'objectif posé au départ. On peut viser quelques sourates utiles à la prière, consolider une récitation déjà apprise, ou avancer sur un projet plus long. La mémorisation suppose une lecture juste : l'enseignant corrige avant que l'erreur ne soit apprise par cœur. Un cours en groupe existe aussi : Tilawa et mémorisation, 399 €, mercredi 19h30 et dimanche 12h.",
  },
];

export const metadata = buildPageMetadata({
  title: "Cours particuliers Coran et Tajwid en ligne",
  description:
    "Cours particuliers de Coran et de Tajwid en ligne, adultes et enfants, dès le débutant. Programme sur mesure, rythme convenu, certificat ISHES. Devis.",
  path: "/fr/cours-particuliers",
  keywords: [
    "cours particulier coran",
    "cours particuliers coran",
    "professeur de coran en ligne",
    "cours de tajwid individuel",
    "cours particulier tajwid",
    "apprendre à lire le coran avec un prof",
    "cours de coran pour adulte débutant",
    "cours de coran pour enfant",
    "correction de récitation coran",
    "cours de coran à distance",
    "professeur de tajwid francophone",
    "institut ishes",
  ],
  image: "/images/formations/cours-particulier-1.png",
});

export default function CoursParticuliersPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#101828]">
      <JsonLd
        data={courseJsonLd({
          name: "Cours particuliers de Coran et de Tajwid",
          description:
            "Cours en tête-à-tête, à distance, pour adultes et enfants. Lecture du Coran, règles du Tajwid, correction et mémorisation, à un rythme convenu avec l'enseignant. Tarif sur devis. Certificat ISHES.",
          path: "/fr/cours-particuliers",
          courseMode: "Online",
          image: "/images/formations/cours-particulier-1.png",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Cours particuliers", path: "/fr/cours-particuliers" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Cours particuliers de Coran et de Tajwid en ligne",
          description:
            "Comment fonctionne un cours particulier ISHES : pour qui, ce que l'on travaille, la différence avec les cours en groupe, le devis et le certificat.",
          path: "/fr/cours-particuliers",
          image: "/images/formations/cours-particulier-1.png",
          dateModified: "2026-10-10",
          keywords: [
            "cours particulier coran",
            "tajwid individuel",
            "professeur de coran en ligne",
          ],
          wordCount: 1700,
          about: ["Coran", "Tajwid", "Cours particulier", "Lecture du Coran"],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment démarrer des cours particuliers de Coran",
          description:
            "Les étapes pour obtenir un devis et commencer un cours individuel de Coran et de Tajwid à l'Institut ISHES.",
          path: "/fr/cours-particuliers",
          steps: [
            {
              name: "Décrire le niveau et l'objectif",
              text: "Adulte ou enfant, lecture actuelle, et ce que tu veux travailler : alphabet, Tajwid, récitation ou mémorisation.",
            },
            {
              name: "Demander un devis",
              text: "Via la page Contact ou WhatsApp. L'équipe propose un rythme et un tarif.",
            },
            {
              name: "Fixer les séances avec l'enseignant",
              text: "Le calendrier est convenu. Chaque cours est en direct, à distance, en tête-à-tête.",
            },
            {
              name: "Valider le parcours",
              text: "Quand le travail convenu est acquis, l'Institut ISHES remet un certificat de Tajwid.",
            },
          ],
        })}
      />

      <section className="relative w-full overflow-hidden bg-white pt-28 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-black tracking-[0.22em] text-[11px] uppercase mb-5 text-ishes-gold">
                Cours en ligne · Sur mesure
              </p>
              <h1 className="text-[36px] sm:text-5xl md:text-[52px] font-black text-ishes-blue leading-[1.12] tracking-tight mb-6">
                Cours particuliers{" "}
                <span className="text-ishes-gold">de Coran et de Tajwid en ligne</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium max-w-xl leading-relaxed">
                Un enseignant, une seule personne en face. Adultes et enfants, dès le
                débutant. Le programme, le rythme et les passages travaillés sont convenus
                avec toi. Tarif sur devis, certificat ISHES en fin de parcours.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={CONTACT}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm rounded-xl shadow-xl shadow-[#c8a063]/30 transition-all"
                >
                  Demander un devis <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-[#e6d5b8] text-ishes-blue font-bold text-sm rounded-xl hover:bg-[#f5efe4] transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Écrire sur WhatsApp
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#101828]">
              <Image
                src="/images/formations/cours-particulier-1.png"
                alt="Élève en cours particulier de Coran à distance, devant son ordinateur"
                fill
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Monitor, label: "Lieu", value: "À distance, en direct" },
              { icon: User, label: "Cours", value: "Tête-à-tête" },
              { icon: Users, label: "Public", value: "Adultes et enfants" },
              { icon: BookOpen, label: "Niveau", value: "Dès le débutant" },
              { icon: Calendar, label: "Rythme", value: "Convenu avec toi" },
              { icon: Award, label: "Fin", value: "Certificat ISHES" },
            ].map((item) => (
              <div
                key={item.value}
                className="bg-[#faf8f4] border border-[#e6d5b8]/40 rounded-2xl p-4 shadow-sm"
              >
                <item.icon className="w-5 h-5 text-[#c8a063] mb-2" />
                <dt className="text-[10px] font-black uppercase tracking-widest text-[#c8a063] mb-1">
                  {item.label}
                </dt>
                <dd className="text-sm font-bold text-ishes-blue leading-snug">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CourseCadenceNote>
        Il n&apos;y a pas de soirée fixe. Tu indiques tes disponibilités, l&apos;enseignant
        propose un rythme tenable, et chaque séance est pour toi seul. Entre deux cours, tu
        répètes le passage travaillé. Le tarif dépend de ce rythme : il est annoncé dans le
        devis, avant toute inscription.
      </CourseCadenceNote>

      <section className="py-16 px-4 sm:px-6 bg-[#fafafa] border-y border-gray-100 mt-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Pour qui est le cours particulier ?
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Quand le groupe ne convient pas, ou quand une difficulté précise demande toute
            l&apos;oreille de l&apos;enseignant.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Heart,
                text: "Tu pars de zéro et tu veux un professeur qui reste sur chaque lettre le temps qu'il faut.",
              },
              {
                icon: Target,
                text: "Tu lis déjà, et une erreur revient toujours : une lettre, une ghounna, un arrêt.",
              },
              {
                icon: Users,
                text: "Tu inscris un enfant qui a besoin d'un suivi individuel, pas d'une classe.",
              },
              {
                icon: Clock,
                text: "Tes horaires ne collent ni au mardi-vendredi du Tajwid intensif, ni au rythme d'une classe.",
              },
              {
                icon: BookOpen,
                text: "Tu veux quelques sourates pour la prière, corrigées avant de les apprendre par cœur.",
              },
              {
                icon: Award,
                text: "Tu veux un cadre court et ciblé, avec un certificat à la fin du parcours convenu.",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4"
              >
                <item.icon className="w-5 h-5 text-[#c8a063] shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-4">
              Pourquoi un professeur particulier pour le Coran ?
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              Le Tajwid s&apos;entend. Un cours enregistré explique une règle. Il n&apos;entend
              pas si le ʿayn devient un alif, si le prolongement est trop court, ou si tu
              t&apos;arrêtes là où le sens change. En cours particulier, l&apos;enseignant
              t&apos;écoute pendant toute la séance et reprend tout de suite.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed">
              Le groupe reste le bon cadre quand tu veux un calendrier, des camarades et un
              tarif affiché. Le particulier est le bon cadre quand le blocage est personnel,
              quand l&apos;enfant a besoin qu&apos;on ne passe pas à la suite sans lui, ou
              quand tes horaires bougent.
            </p>
          </div>
          <div className="bg-[#faf8f4] border border-[#e6d5b8]/50 rounded-3xl p-8">
            <h3 className="text-lg font-black text-ishes-blue mb-5">Ce que la séance change</h3>
            <ul className="space-y-3">
              {[
                "Toute l'heure est pour ta voix, pas partagée avec un groupe.",
                "On reste sur le passage qui bloque, au lieu d'enchaîner le chapitre.",
                "Le prochain cours reprend exactement là où tu en es.",
                "Les erreurs sont corrigées avant d'être mémorisées.",
                "Le rythme baisse ou monte selon la semaine, sans perdre ta place dans une classe.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm font-medium text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-[#c8a063] shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Ce que l&apos;on peut travailler
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Le contenu n&apos;est pas un sommaire unique. L&apos;enseignant le compose après
            t&apos;avoir entendu. Voici les chantiers les plus demandés.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                n: "01",
                title: "Lire depuis l'alphabet",
                text: "Lettres, formes, voyelles, puis mots et phrases courtes. Utile pour un adulte qui n'a jamais appris à lire l'arabe, ou pour un enfant qui démarre.",
              },
              {
                n: "02",
                title: "Appliquer le Tajwid",
                text: "Prolongements, noun et tanwîn, mîm, arrêts, signes du Moushaf. On relie la règle au verset que tu lis, pas à une liste apprise à part.",
              },
              {
                n: "03",
                title: "Corriger une récitation",
                text: "Tu récites, l'enseignant marque l'erreur, tu recommences. La Fatiha et les sourates de la prière sont souvent le premier passage, parce qu'une faute y revient à chaque salât.",
              },
              {
                n: "04",
                title: "Mémoriser à ton rythme",
                text: "Quelques sourates, ou un projet plus long. On ne multiplie pas le nouveau texte tant que l'ancien n'est pas stable, et on ne mémorise pas une lecture encore fausse.",
              },
            ].map((block) => (
              <article key={block.n} className="bg-white rounded-3xl border border-gray-100 p-7">
                <p className="text-[#c8a063] font-black tracking-widest text-sm mb-2">{block.n}</p>
                <h3 className="text-xl font-black text-ishes-blue mb-3">{block.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{block.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Comment se déroule le parcours
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Quatre étapes, de la première question jusqu&apos;au certificat.
          </p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                t: "Tu décris ton niveau",
                d: "Adulte ou enfant, ce que tu sais déjà lire, et ce que tu veux à la fin.",
              },
              {
                t: "Tu reçois un devis",
                d: "Rythme proposé et tarif, avant de t'engager. Réponse par le contact ou WhatsApp.",
              },
              {
                t: "Tu suis les séances",
                d: "En direct, à distance. Tu récites, tu es corrigé, tu repars avec un passage précis.",
              },
              {
                t: "Tu valides",
                d: "Quand le travail convenu est acquis, l'institut remet le certificat de Tajwid.",
              },
            ].map((step, index) => (
              <li key={step.t} className="bg-[#faf8f4] rounded-2xl p-6 border border-[#e6d5b8]/40">
                <p className="text-[#c8a063] font-black text-sm mb-3">0{index + 1}</p>
                <h3 className="font-black text-ishes-blue mb-2">{step.t}</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Particulier ou cours en groupe ?
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Le même institut. Le cadre change. Choisis selon l&apos;horaire et le besoin
            d&apos;être seul avec l&apos;enseignant.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                href: "/fr/cours-lecture-tajwid",
                title: "Tajwid standard",
                text: "Deux années scolaires, 1 h par semaine, Les Clés du Coran, 649 €. Pour apprendre à lire dans un groupe, avec replays.",
              },
              {
                href: "/fr/cours-tajwid-intensif",
                title: "Tajwid intensif",
                text: "3 mois, mardi et vendredi à 19h30, corrections audio, 799 €. Le même support, un calendrier serré.",
              },
              {
                href: "/fr/cours-memoriser-coran",
                title: "Tilawa et mémorisation",
                text: "4 mois, mercredi 19h30 et dimanche 12h, 399 €. Il faut déjà une base de Tajwid. Une base gratuite existe aussi : le guide Tilawa.",
              },
              {
                href: "/fr/correction-fatiha",
                title: "Correction de la Fatiha",
                text: "Module gratuit pour la sourate d'ouverture et les trois dernières sourates, avant d'enchaîner sur un cours payant.",
              },
              {
                href: "/fr/cours-tajwid-enfant",
                title: "Tajwid enfant",
                text: "Classe à distance pour les enfants, si le groupe convient mieux qu'un cours seul.",
              },
              {
                href: "/fr/cours-arabe-adulte",
                title: "Arabe adulte",
                text: "La langue, pas la lecture du Moushaf. Utile si l'objectif est de comprendre l'arabe, pas seulement de réciter.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#c8a063] transition-colors"
              >
                <h3 className="font-black text-ishes-blue mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-6">
            Cours particulier de Coran : ce qu&apos;il faut savoir avant le devis
          </h2>
          <div className="space-y-4 text-gray-700 font-medium leading-relaxed">
            <p>
              Un <strong>cours particulier de Coran</strong> à l&apos;Institut ISHES est une
              séance en direct, à distance, entre un enseignant et un seul élève. Il n&apos;y a
              pas de promotion de groupe, pas de chapitre imposé à une date fixe, et pas de
              prix affiché avant d&apos;avoir parlé du rythme. Le devis vient après.
            </p>
            <h3 className="text-xl font-black text-ishes-blue pt-4">
              Lire, corriger, puis mémoriser
            </h3>
            <p>
              Beaucoup veulent « apprendre le Coran » alors que trois travaux différents se
              mélangent. <strong>Lire</strong>, c&apos;est reconnaître les lettres et les
              voyelles. <strong>Réciter avec le Tajwid</strong>, c&apos;est appliquer les
              règles sur un verset déjà déchiffré. <strong>Mémoriser</strong>, c&apos;est
              retenir un passage dont la lecture est déjà juste. Le cours particulier sépare
              ces trois étapes. On ne fait pas apprendre par cœur une Fatiha encore mal lue.
            </p>
            <p>
              Si la lecture n&apos;existe pas encore, on commence par l&apos;alphabet. Si la
              lecture existe et que les règles restent floues, on ouvre le Moushaf et on
              corrige. Si l&apos;objectif est la prière, on travaille d&apos;abord Al-Fatiha,
              Al-Ikhlas, Al-Falaq et An-Nas. Le{" "}
              <Link href="/fr/correction-fatiha" className="text-ishes-blue font-bold hover:underline">
                cours gratuit de Fatiha
              </Link>{" "}
              peut servir de premier repère avant le particulier.
            </p>
            <h3 className="text-xl font-black text-ishes-blue pt-4">
              Adulte débutant, enfant, ou lecteur déjà à l&apos;aise
            </h3>
            <p>
              Le même intitulé recouvre des besoins opposés. Un adulte débutant a besoin
              qu&apos;on ne se moque pas de la lenteur et qu&apos;on ne saute pas les lettres
              difficiles. Un enfant a besoin que la séance reste courte et que l&apos;enseignant
              revienne sur le même mot jusqu&apos;à ce qu&apos;il tienne. Un lecteur habitué a
              besoin qu&apos;on arrête de réexpliquer l&apos;alphabet pour s&apos;occuper de la
              faute qu&apos;il n&apos;entend plus. Le premier échange sert à cela : entendre où
              tu en es, puis écrire un programme qui ne ressemble pas à celui du voisin.
            </p>
            <p>
              Les classes en groupe restent ouvertes à côté. Le{" "}
              <Link href="/fr/cours-lecture-tajwid" className="text-ishes-blue font-bold hover:underline">
                cours de Tajwid
              </Link>{" "}
              avance sur deux ans. Le{" "}
              <Link href="/fr/cours-tajwid-intensif" className="text-ishes-blue font-bold hover:underline">
                Tajwid intensif
              </Link>{" "}
              tient le parcours en trois mois. La{" "}
              <Link href="/fr/cours-memoriser-coran" className="text-ishes-blue font-bold hover:underline">
                mémorisation en groupe
              </Link>{" "}
              demande déjà une base de lecture. Le{" "}
              <Link
                href="/fr/guide-tilawa-memorisation-coran"
                className="text-ishes-blue font-bold hover:underline"
              >
                guide gratuit de Tilawa
              </Link>{" "}
              donne la méthode de révision si tu veux t&apos;organiser avant même le devis.
            </p>
            <h3 className="text-xl font-black text-ishes-blue pt-4">
              À distance, avec un certificat
            </h3>
            <p>
              Les séances sont uniquement en ligne. Tu peux être à Toulouse, ailleurs en
              France, ou à l&apos;étranger. L&apos;institut a aussi une adresse en présentiel,
              le 41 boulevard de Thibaud, pour d&apos;autres formations : ce n&apos;est pas le
              cadre de cette formule. Le suivi entre les cours passe par l&apos;enseignant et,
              si besoin, par WhatsApp.
            </p>
            <p>
              À la fin du parcours validé, l&apos;Institut ISHES remet un{" "}
              <strong>certificat</strong> des connaissances acquises en Tajwid. Il atteste le
              travail fait avec le professeur, pas un diplôme de groupe calé sur quatre mois
              ou sur deux ans. Le tarif, lui, n&apos;est pas dans le catalogue : il est dans
              le devis, une fois le rythme choisi. Écris sur la{" "}
              <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
                page Contact
              </Link>{" "}
              ou au 06 66 03 35 19. L&apos;ensemble des autres parcours est sur le{" "}
              <Link href="/fr/cours-a-distance" className="text-ishes-blue font-bold hover:underline">
                catalogue des cours à distance
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ cours particuliers"
        title="Questions fréquentes sur le cours particulier de Coran"
        items={FAQS}
      />

      <section className="relative w-full bg-[#101828] py-24 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-8 leading-tight">
            Une heure rien que pour ta lecture,{" "}
            <span className="text-[#c8a063] font-bold">au rythme que tu peux tenir.</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={CONTACT}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-2xl"
            >
              Demander un devis <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-5 border border-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/10"
            >
              WhatsApp · 06 66 03 35 19
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#c8a063]" /> Adultes et enfants
            </span>
            <span className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#c8a063]" /> Uniquement à distance
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#c8a063]" /> Certificat ISHES
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
