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
import { PROGRAMS_DATA } from "@/lib/programs-data";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Hourglass,
  GraduationCap,
  Heart,
  Lightbulb,
  MessageCircle,
  Monitor,
  Play,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const INSCRIPTION = "/inscription?plan=tajwid_intensif&audience=adulte";

const INTENSIF_FAQS = [
  {
    question: "Qu'est-ce que le Tajwid intensif ISHES ?",
    answer:
      "C'est un cours en ligne pour apprendre à lire le Coran avec les règles du Tajwid en 3 mois (12 semaines). Deux séances par semaine, le mardi et le vendredi à 19h30, en direct sur Zoom, avec replays, corrections audio individuelles et le support Les Clés du Coran (volumes 1 et 2). Le diplôme ISHES est remis en fin de parcours validé.",
  },
  {
    question: "Peut-on suivre le Tajwid intensif sans savoir lire l'arabe ?",
    answer:
      "Oui. Aucun prérequis n'est exigé. Le premier module part de l'alphabet, des voyelles et de la lecture pas à pas, puis applique les règles sur des phrases et des petites sourates. Le cours accueille aussi celles et ceux qui lisent déjà et veulent reprendre les bases proprement.",
  },
  {
    question: "Quelle est la différence entre le Tajwid intensif et le Tajwid standard ?",
    answer:
      "Le support est le même : Les Clés du Coran, adaptation francophone inspirée de Nour Al Bayan. Le Tajwid standard avance à raison d'une heure par semaine, sur deux années scolaires. Le Tajwid intensif condense le parcours en 12 semaines, avec deux cours par semaine et des corrections audio individuelles. Les deux mènent au diplôme ISHES.",
  },
  {
    question: "Quels sont les horaires du cours de Tajwid intensif ?",
    answer:
      "À partir d'octobre 2026, le mardi et le vendredi à 19h30, une heure par séance, en direct sur Zoom. Si tu rates un cours, le replay reste disponible. Le cursus dure 3 mois.",
  },
  {
    question: "Le support Les Clés du Coran est-il inclus ?",
    answer:
      "Oui. Les volumes 1 et 2 sont inclus. Le volume 1 construit la lecture (alphabet, harakât, tahajjî). Le volume 2 porte les règles du Tajwid, les symboles du Moushaf et un poème didactique en français pour mémoriser les règles. Une fiche pratique détaille la méthode.",
  },
  {
    question: "Comment se passent les corrections audio ?",
    answer:
      "Tu envoies ta lecture, l'enseignant te renvoie une correction audio individuelle : une lettre mal articulée, une ghounna, un prolongement. Le direct sert à expliquer et à pratiquer ; l'audio sert à corriger ta voix entre les séances.",
  },
  {
    question: "Quel est le tarif du Tajwid intensif ?",
    answer:
      "649 € pour les 3 mois : deux cours par semaine, replays, corrections audio, Les Clés du Coran volumes 1 et 2, suivi et diplôme ISHES. Paiement en plusieurs fois, sans frais.",
  },
  {
    question: "Le diplôme est-il remis à la fin ?",
    answer:
      "Oui. L'Institut ISHES remet un diplôme aux élèves qui ont validé le parcours de 3 mois.",
  },
];

export const metadata = buildPageMetadata({
  title: "Tajwid Intensif en ligne : lire le Coran en 3 mois",
  description:
    "Cours de Tajwid intensif en ligne : lire le Coran en 3 mois, même débutant. Mardi et vendredi 19h30, Zoom, replays, corrections audio, Clés du Coran.",
  path: "/fr/cours-tajwid-intensif",
  keywords: [
    "tajwid intensif",
    "cours tajwid intensif",
    "tajwid accéléré",
    "apprendre à lire le coran en 3 mois",
    "cours tajwid en ligne",
    "tajwid débutant",
    "règles du tajwid",
    "clés du coran",
    "nour al bayan",
    "tahajji",
    "lecture du moushaf",
    "corrections audio tajwid",
    "apprendre l'arabe pour lire le coran",
    "institut ishes",
  ],
  image: "/images/quran-coffee.png",
});

export default function CoursTajwidIntensifPage() {
  const price = PROGRAMS_DATA.tajwid_intensif?.price ?? "649 €";

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#101828]">
      <JsonLd
        data={courseJsonLd({
          name: "Cours de Tajwid Intensif — lire le Coran en 3 mois",
          description:
            "Formation en ligne de 12 semaines pour apprendre à lire le Coran avec les règles du Tajwid, dès l'alphabet. Deux cours par semaine, corrections audio, Les Clés du Coran.",
          path: "/fr/cours-tajwid-intensif",
          price,
          courseMode: "Online",
          workload: "P3M",
          image: "/images/quran-coffee.png",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Tajwid Intensif", path: "/fr/cours-tajwid-intensif" },
        ])}
      />
      <JsonLd data={faqJsonLd(INTENSIF_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Tajwid intensif : apprendre à lire le Coran en 3 mois",
          description:
            "Guide du cours de Tajwid intensif ISHES : alphabet, règles, Les Clés du Coran, corrections audio, mardi et vendredi à 19h30.",
          path: "/fr/cours-tajwid-intensif",
          image: "/images/quran-coffee.png",
          dateModified: "2026-10-10",
          keywords: ["tajwid intensif", "lire le coran", "clés du coran", "tajwid débutant"],
          wordCount: 1500,
          about: ["Tajwid", "Lecture du Coran", "Les Clés du Coran", "Nour Al Bayan"],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment apprendre à lire le Coran en 3 mois",
          description:
            "Le parcours du Tajwid intensif ISHES, de l'alphabet à une lecture appliquée dans le Moushaf.",
          path: "/fr/cours-tajwid-intensif",
          steps: [
            {
              name: "Partir des lettres",
              text: "Le premier module pose l'alphabet, les voyelles et le tahajjî, avec Les Clés du Coran.",
            },
            {
              name: "Appliquer les règles du Tajwid",
              text: "Symboles du Moushaf, règles fondamentales, phrases puis petites sourates.",
            },
            {
              name: "Suivre le direct et envoyer ses audios",
              text: "Mardi et vendredi à 19h30 sur Zoom, plus une correction audio individuelle.",
            },
            {
              name: "Valider le diplôme",
              text: "Au bout de 12 semaines, le parcours validé donne le diplôme ISHES.",
            },
          ],
        })}
      />

      <section className="relative w-full overflow-hidden bg-white pt-28 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-black tracking-[0.22em] text-[11px] uppercase mb-5 text-ishes-gold">
                Formation en ligne · Intensif
              </p>
              <h1 className="text-[36px] sm:text-5xl md:text-[52px] font-black text-ishes-blue leading-[1.12] tracking-tight mb-6">
                Tajwid Intensif{" "}
                <span className="text-ishes-gold">
                  Apprends à lire le Coran en 3 mois, même si tu pars de zéro
                </span>
              </h1>
              <p className="text-lg text-gray-600 font-medium max-w-xl leading-relaxed">
                Un parcours complet et structuré pour apprendre à lire le Coran avec justesse,
                selon les règles du Tajwid. Deux cours par semaine, un enseignant, des corrections
                audio, et un suivi personnalisé. Les Clés du Coran, volumes 1 et 2, sont inclus.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={INSCRIPTION}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm rounded-xl shadow-xl shadow-[#c8a063]/30 transition-all"
                >
                  Je m&apos;inscris au Tajwid Intensif <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#programme"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-[#e6d5b8] text-ishes-blue font-bold text-sm rounded-xl hover:bg-[#f5efe4] transition-all"
                >
                  Découvrir le programme
                </Link>
              </div>
            </div>
            <div className="w-full">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-ishes-blue">
                <iframe
                  src={PROGRAMS_DATA.tajwid_intensif?.videoUrl}
                  title="Présentation du Tajwid intensif — Institut ISHES"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <blockquote className="mt-4 bg-[#f7f1e6] border border-[#e6d5b8]/50 rounded-2xl p-5 shadow-sm">
                <p className="text-sm font-medium text-ishes-blue leading-relaxed italic">
                  « Une lecture correcte du Coran est une adoration, une marque de respect et un
                  lien direct avec la parole d&apos;ALLAH. »
                </p>
              </blockquote>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Hourglass, label: "Durée", value: "3 mois · 12 semaines" },
              { icon: Clock, label: "Rythme", value: "Mardi et vendredi, 19h30" },
              { icon: Monitor, label: "Format", value: "Zoom en direct + replays" },
              { icon: MessageCircle, label: "Corrections", value: "Audio individuelles" },
              { icon: Award, label: "Diplôme", value: "Diplôme ISHES" },
              { icon: Users, label: "Niveau", value: "Aucun prérequis" },
            ].map((item) => (
              <div key={item.label} className="bg-[#faf8f4] border border-[#e6d5b8]/40 rounded-2xl p-4 shadow-sm">
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
        Dès octobre 2026, deux cours par semaine, le mardi et le vendredi à 19h30, en direct sur
        Zoom. Si tu rates une séance, le replay est là. En 3 mois, avec Les Clés du Coran et les
        corrections audio, tu valides le diplôme ISHES.
      </CourseCadenceNote>

      <section className="py-16 px-4 sm:px-6 bg-[#fafafa] border-y border-gray-100 mt-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Pour qui ?
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Une formation accessible à toutes et à tous. Hommes et femmes, débutants compris.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Eye, text: "Tu ne sais pas lire l'arabe et tu veux partir des premières lettres." },
              { icon: Heart, text: "Tu n'as aucune notion de Tajwid, ou tu veux reprendre depuis les bases." },
              { icon: Target, text: "Tu lis déjà, et tu veux comprendre les signes que tu vois dans le Moushaf." },
              { icon: Lightbulb, text: "Tu veux un cadre serré : deux soirs par semaine, pendant 12 semaines." },
              { icon: GraduationCap, text: "Tu veux un enseignant qui entend ta lecture et te corrige." },
              { icon: BookOpen, text: "Tu veux le même support que le cursus classique : Les Clés du Coran." },
            ].map((item) => (
              <div key={item.text} className="bg-white border border-[#e6d5b8]/40 rounded-2xl p-5 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-sm font-bold text-gray-700 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-5">
              Pourquoi apprendre le Tajwid ?
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              Lire le Coran comme il a été révélé, en donnant à chaque lettre son droit, est une
              adoration et une préservation de la parole d&apos;ALLAH. Le Tajwid t&apos;aide à lire
              de manière juste, fluide et respectueuse, en comprenant ce que tu lis.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Une lecture plus belle",
                "Une meilleure compréhension",
                "Une adoration plus complète",
                "Un lien plus fort avec le Coran",
              ].map((label) => (
                <div key={label} className="bg-[#faf8f4] border border-[#e6d5b8]/40 rounded-xl px-4 py-3 text-sm font-bold text-ishes-blue text-center">
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/quran-coffee.png"
              alt="Moushaf ouvert — cours de Tajwid intensif pour apprendre à lire le Coran"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-4">
              Pourquoi choisir un format intensif ?
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              Une progression rapide, un encadrement renforcé. Deux soirées par semaine empêchent
              la règle apprise lundi d&apos;être oubliée le mois suivant. Le{" "}
              <Link href="/fr/cours-lecture-tajwid" className="text-ishes-blue font-bold underline underline-offset-2">
                Tajwid standard
              </Link>{" "}
              reste là pour qui préfère une heure par semaine sur deux années. L&apos;intensif est
              le même savoir, tenu sur 12 semaines.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Un apprentissage structuré et progressif, de la lettre à la sourate.",
              "Des corrections immédiates par l'enseignant, en direct puis en audio.",
              "Une pratique intensive pour gagner en fluidité.",
              "Un suivi bienveillant et motivant, sur un temps court.",
              "Des replays pour réviser à ton rythme entre le mardi et le vendredi.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white border border-[#e6d5b8]/40 rounded-2xl p-4">
                <CheckCircle2 className="w-5 h-5 text-[#c8a063] shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-ishes-blue leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="programme" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Un programme en 2 modules
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-12">
            Pour une progression complète et équilibrée, sur les deux volumes des Clés du Coran.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-white border border-[#e6d5b8]/40 rounded-3xl p-8 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#c8a063] mb-1">01</p>
              <h3 className="text-lg font-black text-ishes-blue">Théorie et pratique du Tajwid</h3>
              <p className="text-sm text-gray-500 font-medium mt-1 mb-6">Les Clés du Coran, volumes 1 et 2</p>
              <ul className="space-y-2.5 text-sm font-medium text-gray-700">
                {[
                  "Alphabet arabe et lecture pas à pas",
                  "Voyelles, tahajjî, prolongements de base",
                  "Règles fondamentales du Tajwid",
                  "Symboles du Moushaf",
                  "Application sur des phrases et des petites sourates",
                  "Exercices réguliers pour consolider l'apprentissage",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a063] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="bg-white border border-[#e6d5b8]/40 rounded-3xl p-8 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#c8a063] mb-1">02</p>
              <h3 className="text-lg font-black text-ishes-blue">Coaching et suivi personnalisé</h3>
              <p className="text-sm text-gray-500 font-medium mt-1 mb-6">Ta voix, corrigée chaque semaine</p>
              <ul className="space-y-2.5 text-sm font-medium text-gray-700">
                {[
                  "Enseignant qualifié et expérimenté",
                  "Corrections audio individuelles",
                  "Exercices pratiques, avec les replays pour réviser",
                  "Suivi régulier de la progression",
                  "Conseils pour une lecture autonome et confiante",
                  "Diplôme ISHES en fin de parcours validé",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a063] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-4">
              Les Clés du Coran : les supports inclus
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              Le cours s&apos;appuie sur <strong>Les Clés du Coran</strong>, deux volumes conçus
              pour les francophones, inspirés de la méthode Nour Al Bayan. Le volume 1 pose
              l&apos;alphabet, les harakât et le tahajjî : on décompose la lettre, sa voyelle, puis
              on reconstruit le mot, pour lire au lieu de deviner. Le volume 2 porte les règles :
              noun sâkina et tanwîn, mîm sâkina, moudoud, idghâm, iqlâb, ikhfâ, règles du râ, waqf,
              makhârij et sifât, plus les repères du Moushaf.
            </p>
            <p className="text-sm font-bold text-ishes-blue mb-6 leading-relaxed">
              Un poème didactique en français accompagne le volume 2 et aide à retenir les règles.
            </p>
            <Link href="/fr/les-cles-du-coran" className="inline-flex items-center gap-2 text-[#c8a063] font-black text-sm hover:underline">
              Découvrir la méthode Les Clés du Coran <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex justify-center gap-4">
            <Image src="/images/livre-ishes.png" alt="Les Clés du Coran, volume 1" width={220} height={308} className="w-40 sm:w-52 h-auto rounded-lg shadow-xl -rotate-6" />
            <Image src="/images/livre-ishes.png" alt="Les Clés du Coran, volume 2" width={220} height={308} className="w-40 sm:w-52 h-auto rounded-lg shadow-xl rotate-6 mt-8" />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-8">
            Ce que tu vas progressivement savoir faire
          </h2>
          <ul className="space-y-3">
            {[
              "Reconnaître les lettres, les voyelles et les principaux signes de lecture.",
              "Lire des mots, puis des passages, sans dépendre d'une transcription phonétique.",
              "Repérer dans le Moushaf les règles essentielles du Tajwid.",
              "Identifier les prolongements, les règles du noun et du mîm, les arrêts et les reprises.",
              "Mieux placer les points de sortie et les caractéristiques des lettres.",
              "Entendre tes erreurs grâce aux corrections audio, et lire avec plus d'autonomie.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c8a063] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-black text-ishes-blue mb-3">Un livre ne remplace pas un enseignant</h2>
          <p className="text-gray-600 font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Le Tajwid se transmet par l&apos;écoute. Un support explique une règle. Il n&apos;entend
            pas une lettre mal articulée, une ghounna trop courte ou un prolongement faux. Le
            direct pose la règle. La correction audio individuelle te la renvoie dans ta propre voix.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: CheckCircle2, t: "Corrections audio individuelles" },
              { icon: Target, t: "Suivi de ta progression" },
              { icon: Play, t: "Replays de toutes les séances" },
            ].map((item) => (
              <div key={item.t} className="bg-white border border-[#e6d5b8]/40 rounded-2xl p-5 flex items-center justify-center gap-3">
                <item.icon className="w-5 h-5 text-[#c8a063]" />
                <span className="text-sm font-bold text-ishes-blue">{item.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-10">
            Tout ce qui est inclus
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: Monitor, label: "Cours en direct sur Zoom, mardi et vendredi 19h30" },
              { icon: Play, label: "Replays de tous les cours" },
              { icon: BookOpen, label: "Les Clés du Coran, volumes 1 et 2" },
              { icon: MessageCircle, label: "Corrections audio individuelles" },
              { icon: Users, label: "Suivi par un enseignant qualifié" },
              { icon: Award, label: "Diplôme ISHES en fin de formation" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-[#faf8f4] border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                  <Icon className="w-5 h-5 text-[#c8a063]" />
                </div>
                <p className="text-[12px] font-bold text-gray-800 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-[#101828] rounded-[2rem] p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-8">Informations pratiques</h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["Durée", "3 mois (12 semaines)"],
              ["Rythme", "2 cours / semaine, mardi et vendredi 19h30"],
              ["Format", "Zoom en direct + replays"],
              ["Début", "Octobre 2026"],
              ["Tarif", price],
              ["Diplôme", "Diplôme ISHES"],
              ["Public", "Adultes, hommes et femmes"],
              ["Niveau", "Aucun prérequis"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] font-black uppercase tracking-widest text-[#c8a063] mb-1">{k}</dt>
                <dd className="text-sm font-bold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={INSCRIPTION}
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm rounded-xl"
          >
            Je m&apos;inscris au Tajwid Intensif — {price} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <article className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10 text-[15px] leading-relaxed text-gray-700">
          <header className="text-center">
            <p className="text-ishes-gold font-black uppercase tracking-[0.25em] text-xs mb-3">
              Guide · Tajwid intensif
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight">
              Apprendre à lire le Coran en 3 mois : le Tajwid intensif expliqué
            </h2>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Qu&apos;est-ce que le Tajwid ?</h3>
            <p>
              Le <strong>Tajwid</strong> est l&apos;ensemble des règles qui permettent de réciter le
              Coran en donnant à chaque lettre son point de sortie et sa qualité. Sans ces règles,
              on reconnaît parfois les lettres sans savoir pourquoi un signe allonge, nasalise ou
              fait fusionner deux sons. Le cours intensif de l&apos;<strong>Institut ISHES</strong>{" "}
              apprend à les voir dans le Moushaf et à les appliquer, en français, dès les premières
              semaines.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              De l&apos;alphabet à la sourate, en 12 semaines
            </h3>
            <p>
              Beaucoup croient qu&apos;il faut déjà « savoir lire » avant d&apos;ouvrir un cours de
              Tajwid. Ici, le premier module commence par l&apos;<strong>alphabet arabe</strong>,
              les voyelles et le <strong>tahajjî</strong> : décomposer la lettre, identifier le
              signe, reconstruire le mot. Viennent ensuite les <strong>règles fondamentales</strong>,
              les <strong>symboles du Moushaf</strong>, puis des phrases et des petites sourates.
              Le second module est le coaching : lecture envoyée, <strong>correction audio</strong>,
              suivi, jusqu&apos;à une lecture plus autonome.
            </p>
            <p>
              Le support est{" "}
              <Link href="/fr/les-cles-du-coran" className="text-ishes-blue font-bold hover:underline">
                Les Clés du Coran
              </Link>
              , adaptation francophone inspirée de <strong>Nour Al Bayan</strong>. Les deux volumes
              sont inclus, avec le poème didactique du volume 2.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Intensif ou cursus sur deux ans</h3>
            <p>
              Le{" "}
              <Link href="/fr/cours-lecture-tajwid" className="text-ishes-blue font-bold hover:underline">
                cours de Tajwid standard
              </Link>{" "}
              suit la même méthode, à raison d&apos;une heure par semaine, sur deux années
              scolaires. Le <strong>Tajwid intensif</strong> tient le parcours en{" "}
              <strong>3 mois</strong>, avec <strong>deux cours par semaine</strong>, le mardi et le
              vendredi à <strong>19h30</strong>, dès octobre 2026. Même diplôme, même support,
              rythme plus serré, et les corrections audio en plus. On le suit de partout : France,
              Belgique, Suisse, Maghreb, Canada.
            </p>
            <p>
              Le tarif est de <strong>{price}</strong>, payable en plusieurs fois. Une question de
              niveau :{" "}
              <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
                l&apos;équipe répond sur WhatsApp
              </Link>
              . L&apos;ensemble des parcours est sur le{" "}
              <Link href="/fr/cours-a-distance" className="text-ishes-blue font-bold hover:underline">
                catalogue des cours à distance
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <VitrineFaq
        eyebrow="FAQ Tajwid intensif"
        title="Questions fréquentes : 3 mois, débutants, corrections audio"
        items={INTENSIF_FAQS}
      />

      <section className="relative w-full bg-[#101828] py-24 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-8 leading-tight">
            Dans trois mois, tu ouvres le Coran{" "}
            <span className="text-[#c8a063] font-bold">et tu lis, avec une règle pour chaque signe.</span>
          </h2>
          <Link
            href={INSCRIPTION}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-2xl"
          >
            Je m&apos;inscris au Tajwid Intensif <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#c8a063]" /> Aucun prérequis
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c8a063]" /> Les Clés du Coran
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c8a063]" /> Mardi et vendredi 19h30
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
