import Link from 'next/link';
import { CourseCadenceNote } from "@/components/vitrine/CourseCadenceNote";
import {
  Calendar,
  Clock,
  Video,
  Award,
  BookOpen,
  Heart,
  UserRound,
  BrainCircuit,
  Mail,
  PenTool,
  CheckCircle2,
  Lock,
  CreditCard,
  ArrowRight,
  Monitor,
  Hourglass,
  Gift,
  Sparkles,
  ScrollText,
  BadgeCheck,
  Shield,
  Landmark,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { buildPageMetadata, courseJsonLd, breadcrumbJsonLd, faqJsonLd, articleJsonLd, howToJsonLd } from "@/lib/seo";

const PROGRAMME_AQIDA = [
  {
    num: 1,
    title: "Allah et Ses attributs",
    color: "text-amber-700 bg-amber-50",
    items: [
      "Les treize attributs obligatoires",
      "Leurs contraires",
      "Connaître Allah tel qu'Il s'est décrit",
    ],
  },
  {
    num: 2,
    title: "Prophètes et messagers",
    color: "text-emerald-700 bg-emerald-50",
    items: [
      "Les qualités nécessaires",
      "Ce qui est impossible à leur égard",
      "La mission de transmission",
    ],
  },
  {
    num: 3,
    title: "L'attestation de foi",
    color: "text-ishes-blue bg-blue-50",
    items: [
      "Le sens de lâ ilâha illâ Allah",
      "Muhammad, messager d'Allah",
      "Ce que la shahada engage",
    ],
  },
  {
    num: 4,
    title: "Les six piliers de la foi",
    color: "text-sky-700 bg-sky-50",
    items: [
      "Allah, Ses anges, Ses livres",
      "Ses messagers et le Jour dernier",
      "Le destin, son bien et son mal",
    ],
  },
  {
    num: 5,
    title: "Les cinq piliers de l'Islam",
    color: "text-green-700 bg-green-50",
    items: [
      "Shahada, prière, zakat",
      "Jeûne et pèlerinage",
      "Leur place dans la croyance",
    ],
  },
  {
    num: 6,
    title: "L'Ihsân",
    color: "text-rose-700 bg-rose-50",
    items: [
      "La définition de l'excellence",
      "Adorer avec présence du cœur",
      "Foi, pratique et sincérité",
    ],
  },
];

const AQIDA_FAQS = [
  {
    question: "Qu'est-ce que l'aqîda en Islam ?",
    answer:
      "L'aqîda est la science de la croyance : ce qu'un musulman affirme au sujet d'Allah, de Ses messagers et de l'invisible. Elle couvre les six piliers de la foi (Allah, les anges, les livres, les messagers, le Jour dernier et le destin), le sens de l'attestation de foi, et la définition de l'ihsân. Le cours ISHES l'étudie en français, de façon progressive, à partir du matn d'Ibn 'Âshir.",
  },
  {
    question: "Pourquoi suivre un cours d'aqîda en français ?",
    answer:
      "Beaucoup de musulmans francophones ont reçu la foi par héritage, par fragments : un peu sur les anges, un peu sur le destin, sans jamais relier l'ensemble. Un cours d'aqîda en ligne donne un cadre clair, appuyé sur le Coran et la Sounna, pour connaître Allah, répondre aux confusions et vivre sa religion avec plus de certitude.",
  },
  {
    question: "Quel livre est étudié dans le cours d'aqîda ISHES ?",
    answer:
      "Le texte du cours est Al-Murshid al-Mu'în, le matn en vers de l'imam Abd al-Wahid Ibn 'Âshir (Fès, 1582–1631). La formation suit la partie de croyance de ce poème : attributs d'Allah, prophètes, attestation de foi, piliers de la foi, piliers de l'Islam et ihsân. Le même ouvrage sert de référence au cours de fiqh mâlikite pour les adorations.",
  },
  {
    question: "Quels sont les treize attributs d'Allah étudiés ?",
    answer:
      "Le matn d'Ibn 'Âshir expose treize attributs obligatoires : l'existence, l'éternité sans commencement, la pérennité, la dissemblance avec les créatures, la subsistance par Soi-même, l'unicité, la vie, la science, la puissance, la volonté, l'ouïe, la vue et la parole. Le cours explique aussi leurs contraires, c'est-à-dire ce qu'il est impossible d'attribuer à Allah.",
  },
  {
    question: "Le cours d'aqîda est-il adapté aux débutants ?",
    answer:
      "Oui. Aucune formation préalable en sciences islamiques n'est exigée. Les séances sont progressives, en français, avec des exemples et des questions-réponses. Le cours accueille les hommes et les femmes, les débutants comme ceux qui ont déjà étudié.",
  },
  {
    question: "Quelle est la différence entre le cours d'aqîda et le fiqh mâlikite ?",
    answer:
      "Les deux cours s'appuient sur Al-Murshid al-Mu'în d'Ibn 'Âshir. L'aqîda traite de la croyance : qui est Allah, que signifie croire, quels sont les piliers de la foi. Le fiqh mâlikite traite des actes d'adoration : purification, prière, zakat, jeûne et hajj. Ils se complètent.",
  },
  {
    question: "Comment se déroule le cours d'aqîda en ligne ?",
    answer:
      "La formation dure 4 mois, à raison d'un cours par semaine, le samedi à 11h00, en direct sur Zoom, à partir d'octobre 2026. Les replays restent disponibles, les supports sont inclus, et le parcours validé donne le diplôme ISHES. Tarif : 399 €, payable en plusieurs fois. Le cours se suit depuis la France, la Belgique, la Suisse, le Maghreb, le Canada ou ailleurs.",
  },
  {
    question: "Faut-il habiter près de Toulouse pour suivre l'aqîda ?",
    answer:
      "Non. Le cours d'aqîda est entièrement à distance. L'Institut ISHES est à Toulouse pour d'autres formations en présentiel. Ici, il suffit d'une connexion pour le direct du samedi et les replays.",
  },
];

export const metadata = buildPageMetadata({
  title: "Cours d'Aqîda en ligne — Ibn Âchir",
  description:
    "Cours d'aqîda en français sur Al-Murshid al-Mu'în d'Ibn Âchir : attributs d'Allah, piliers de la foi, shahada et ihsân. En ligne, 4 mois, diplôme ISHES.",
  path: "/fr/cours-al-aqida",
  keywords: [
    "aqida",
    "aqîda",
    "cours aqida",
    "cours aqida en ligne",
    "aqida en français",
    "croyance islamique",
    "fondements de la foi",
    "foi musulmane",
    "ibn ashir",
    "ibn achir",
    "al murshid al muin",
    "matn ibn ashir",
    "attributs d'Allah",
    "treize attributs",
    "piliers de la foi",
    "six piliers de l'iman",
    "tawhid",
    "shahada",
    "ihsan",
    "aqida sunnite",
    "cours de croyance islam",
    "sciences islamiques aqida",
  ],
  image: "/images/formations/aqida-2.png",
});

export default function CoursAlAqidaPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      <JsonLd
        data={courseJsonLd({
          name: "Cours d'Aqîda en ligne — Matn Ibn 'Âshir",
          description:
            "Comprendre la foi musulmane en français à partir d'Al-Murshid al-Mu'în : attributs d'Allah, prophètes, six piliers de la foi, cinq piliers de l'Islam et ihsân.",
          path: "/fr/cours-al-aqida",
          price: "399",
          courseMode: "Online",
          workload: "P4M",
          image: "/images/formations/aqida-2.png",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Al-Aqîda", path: "/fr/cours-al-aqida" },
        ])}
      />
      <JsonLd data={faqJsonLd(AQIDA_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Cours d'aqîda en ligne : Ibn Âchir, la foi et les piliers de l'iman",
          description:
            "Guide ISHES pour étudier l'aqîda en français avec Al-Murshid al-Mu'în : attributs d'Allah, shahada, six piliers de la foi et ihsân.",
          path: "/fr/cours-al-aqida",
          image: "/images/formations/aqida-2.png",
          dateModified: "2026-10-10",
          keywords: [
            "aqida",
            "ibn ashir",
            "al murshid al muin",
            "piliers de la foi",
            "cours aqida en ligne",
          ],
          wordCount: 1400,
          about: [
            "Aqîda",
            "Ibn Âshir",
            "Al-Murshid al-Mu'în",
            "Piliers de la foi",
            "Croyance islamique",
          ],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment apprendre l'aqîda en ligne",
          description:
            "Étapes pour suivre le cours d'aqîda de l'Institut ISHES, basé sur le matn d'Ibn 'Âshir.",
          path: "/fr/cours-al-aqida",
          steps: [
            {
              name: "Comprendre ce qu'est l'aqîda",
              text: "L'aqîda est la science de la croyance musulmane : Allah, Ses messagers et les piliers de la foi.",
            },
            {
              name: "Étudier la partie de croyance d'Al-Murshid al-Mu'în",
              text: "Le matn d'Ibn 'Âshir sert de fil conducteur : attributs, prophètes, shahada, iman, piliers de l'Islam et ihsân.",
            },
            {
              name: "Suivre le direct du samedi et les replays",
              text: "Un cours par semaine pendant 4 mois, à 11h00, sur Zoom, avec supports et exercices.",
            },
            {
              name: "Relier la foi à la pratique",
              text: "À l'issue du parcours, l'étudiant sait expliquer sa croyance et la vivre avec plus de clarté.",
            },
          ],
        })}
      />

      <section className="pt-28 pb-8 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase">
              Croyance islamique · Ibn Âchir · Foi sunnite
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Cours d&apos;Aqîda en ligne
            </h1>
            <p className="text-gray-600 font-medium max-w-xl text-lg leading-relaxed">
              Comprends la <strong>foi musulmane</strong> avec clarté, à partir d&apos;
              <em>Al-Murshid al-Mu&apos;în</em> d&apos;Ibn &apos;Âshir : les attributs d&apos;Allah,
              les prophètes, les <strong>six piliers de la foi</strong>, les cinq piliers de l&apos;Islam
              et l&apos;<strong>ihsân</strong>.
            </p>
            <div className="pt-4">
              <Link
                href="/inscription?plan=al_aqida&audience=adulte"
                className="inline-flex items-center justify-center gap-2 bg-ishes-blue hover:bg-ishes-blue/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-blue/20 hover:-translate-y-1"
              >
                JE M&apos;INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-ishes-gold" />
                <span className="text-sm font-bold text-gray-700 leading-tight">Octobre 2026</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">1 cours / semaine<br/><span className="text-gray-500 font-medium">Samedi à 11h00</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">En direct<br/><span className="text-gray-500 font-medium">Zoom + Replays</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Hourglass className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Durée<br/><span className="text-gray-500 font-medium">4 mois</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Certification<br/><span className="text-gray-500 font-medium">Diplôme ISHES</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Tous les supports<br/><span className="text-gray-500 font-medium">inclus</span></span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] aspect-[474/668] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#140e08]">
              <Image
                src="/images/formations/ibn-ashir-cover.png"
                alt="Couverture d'Al-Murshid al-Mu'în d'Ibn 'Âshir, texte du cours d'aqîda — Institut ISHES"
                fill
                priority
                className="object-contain"
                sizes="320px"
              />
            </div>
          </div>
        </div>
      </section>

      <CourseCadenceNote>
        Dès octobre 2026, un cours d&apos;aqîda par semaine t&apos;attend le samedi à 11h00, en direct sur Zoom.
        Tu rates une séance : le replay reste disponible. Pendant 4 mois, tous les supports sont
        inclus, et le parcours se termine par le diplôme ISHES.
      </CourseCadenceNote>

      <section id="definition" className="pt-20 pb-12 px-6 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-serif text-ishes-blue font-black">Pourquoi étudier l&apos;aqîda ?</h2>
            <p className="text-lg text-gray-700 leading-relaxed font-bold">
              Tu crois en Allah. Saurais-tu expliquer, avec des mots justes, qui Il est, ce que signifie croire, et sur quoi repose ta foi ?
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              Beaucoup ont appris la croyance par morceaux : les anges, le destin, les prophètes, les attributs d&apos;Allah, sans jamais les avoir étudiés ensemble. Avec le temps, cette foi héritée laisse place aux doutes et aux discours contradictoires. L&apos;<strong>aqîda</strong> remet les fondations en ordre.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              Le cours vise une croyance claire : connaître Allah à travers Ses attributs, distinguer l&apos;essentiel de la foi, et vivre la religion avec plus de certitude et de sérénité.
            </p>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, label: "Attributs\nd'Allah" },
              { icon: ScrollText, label: "Prophètes\net messagers" },
              { icon: BadgeCheck, label: "Attestation\nde foi" },
              { icon: Shield, label: "Six piliers\nde la foi" },
              { icon: Landmark, label: "Cinq piliers\nde l'Islam" },
              { icon: Heart, label: "Ihsân" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#f2ece4] text-ishes-gold shadow-sm">
                  <item.icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-bold text-gray-800 whitespace-pre-line leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#EBE7DF]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 relative w-full max-w-[280px] mx-auto">
            <div className="absolute inset-4 bg-black/10 rounded-2xl rotate-3 shadow-2xl"></div>
            <div className="relative aspect-[474/668] w-full">
              <Image
                src="/images/formations/ibn-ashir-cover.png"
                alt="Al-Murshid al-Mu'în d'Ibn 'Âshir, ouvrage de référence du cours d'aqîda"
                fill
                sizes="280px"
                className="object-contain drop-shadow-2xl relative z-10"
              />
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-serif text-ishes-blue font-black">
              Le texte du cours :<br />
              <span className="text-ishes-gold">Al-Murshid al-Mu&apos;în d&apos;Ibn &apos;Âshir</span>
            </h2>
            <p className="text-lg text-gray-800 font-bold leading-relaxed">
              La formation suit la partie d&apos;<strong>aqîda</strong> d&apos;<strong>Al-Murshid al-Mu&apos;în</strong>, le matn en vers de l&apos;imam Ibn &apos;Âshir, référence de l&apos;enseignement au Maghreb.
            </p>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              Le même poème porte aussi le fiqh des adorations. Ici, on s&apos;arrête sur la croyance : ce qu&apos;il est obligatoire d&apos;affirmer au sujet d&apos;Allah et de Ses messagers, le sens de la shahada, les piliers de la foi et l&apos;excellence dans l&apos;adoration. L&apos;enseignant déplie le texte, verset après verset, avec le Coran et la Sounna.
            </p>
            <div className="pt-4 flex items-start gap-4 p-6 bg-white/60 rounded-xl">
              <BookOpen className="w-8 h-8 text-ishes-gold shrink-0" />
              <p className="text-sm font-bold text-gray-800">
                Un texte étudié depuis des siècles au Maghreb et en Afrique de l&apos;Ouest, composé à Fès par l&apos;imam &apos;Abd al-Wâhid Ibn &apos;Âshir (1582–1631).
                <br />
                <Link href="/fr/cours-fiqh-malikite/ibn-ashir" className="text-ishes-gold hover:underline font-black mt-2 inline-block text-[15px]">
                  Découvrir la vie de l&apos;imam Ibn &apos;Âshir →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programme" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-6">Ce que tu vas apprendre</h2>
        <p className="text-lg text-gray-600 font-medium max-w-3xl mb-16">
          Le parcours suit l&apos;ordre du matn. Chaque chapitre pose une notion, l&apos;explique en français, puis la relie à ce que tu vis : ta prière, tes questions, ta relation avec Allah.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
          <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-gray-200 -z-10"></div>
          {PROGRAMME_AQIDA.map((step) => (
            <div key={step.num} className="flex flex-col">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-sm border border-white ${step.color}`}>
                {step.num}
              </div>
              <h3 className="text-lg font-black text-ishes-blue mb-4 h-14 leading-tight">{step.title}</h3>
              <ul className="space-y-2">
                {step.items.map((item) => (
                  <li key={item} className="text-sm text-gray-600 font-medium flex items-start gap-2">
                    <span className="text-ishes-gold font-black mt-0.5">•</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: UserRound, title: "Tu te poses des questions", desc: "sur ce qu'est la foi en Islam, et tu veux des réponses posées." },
            { icon: BrainCircuit, title: "Tu entends tout et son contraire", desc: "sur Allah, le destin ou les prophètes, et cela te trouble." },
            { icon: BookOpen, title: "Tu veux une croyance claire", desc: "appuyée sur un texte classique, le Coran et la Sounna." },
            { icon: Heart, title: "Tu cherches une foi qui apaise", desc: "solide assez pour éclairer la prière, les choix et le cœur." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-8 h-8 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ishes-blue leading-tight">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100">
            <Image
              src="/images/formations/aqida-2.png"
              alt="Cours d'aqîda en direct sur Zoom — étude de la croyance à l'Institut ISHES"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Une pédagogie pour francophones</h2>
            <div className="space-y-6">
              {[
                "Étude du matn d'Ibn 'Âshir, référence de l'aqîda au Maghreb",
                "Explications progressives, accessibles sans bagage préalable",
                "Chaque notion reliée au Coran et à la Sounna",
                "Séances en direct, avec un temps de questions-réponses",
                "Supports pour réviser entre deux samedis",
                "Suivi pédagogique jusqu'au diplôme ISHES",
              ].map((text) => (
                <div key={text} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-ishes-gold shrink-0" />
                  <span className="text-lg font-medium text-ishes-dark">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-16">Ce qui est inclus</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { image: "/images/aqida_students.png", title: "En direct sur Zoom\n1 cours / semaine\nSamedi à 11h00" },
            { image: "/images/tajwid_exercises.png", title: "Exercices\net évaluations" },
            { image: "/images/aqida_hero.png", title: "Étude du matn\nd'Ibn 'Âshir, vers après vers" },
            { image: "/images/tajwid_whatsapp.png", title: "Groupe WhatsApp\nprivé et suivi" }
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col group overflow-hidden relative pb-6 transition-all hover:shadow-md">
              <div className="w-full h-40 relative mb-4">
                <Image src={item.image} alt={`${item.title.replace(/\n/g, " ")} — cours d'aqîda ISHES`} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <h3 className="font-bold text-ishes-blue text-sm whitespace-pre-line px-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Comment se déroule le programme ?</h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-ishes-gold/30 border-dashed"></div>

          <div className="grid lg:grid-cols-5 gap-8">
            {[
              { num: 1, icon: Calendar, title: "Tu t'inscris", desc: "Choisis ton mode de paiement et valide ton inscription." },
              { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès à la plateforme, aux supports et au groupe WhatsApp." },
              { num: 3, icon: Video, title: "Tu assistes aux séances", desc: "En direct sur Zoom, le samedi à 11h00. Replay si tu manques." },
              { num: 4, icon: PenTool, title: "Tu révises et tu es évalué", desc: "Exercices réguliers pour vérifier que la notion est comprise." },
              { num: 5, icon: Award, title: "Tu valides le diplôme", desc: "À la fin des 4 mois, après validation du parcours." }
            ].map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-ishes-dark text-white rounded-full flex items-center justify-center font-black text-xl mb-6 relative z-10 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <step.icon className="w-10 h-10 text-ishes-gold mb-4" />
                <h3 className="font-black text-ishes-blue mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-12">À la fin de cette formation, tu sauras</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, text: "Présenter les attributs d'Allah et ce qu'il est impossible de Lui attribuer" },
            { icon: Shield, text: "Expliquer les six piliers de la foi, un par un, avec leurs enjeux" },
            { icon: BadgeCheck, text: "Dire le sens de la shahada, des cinq piliers et de l'ihsân" },
            { icon: UserCheck, text: "Répondre aux confusions avec un cadre clair, tiré du texte" },
          ].map((item) => (
            <div key={item.text} className="bg-white rounded-xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm border border-gray-100">
              <item.icon className="w-10 h-10 text-ishes-gold" />
              <p className="font-bold text-ishes-dark text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center md:text-left space-y-4">
              <div className="text-5xl md:text-6xl font-black text-ishes-gold">399 €</div>
              <h3 className="text-lg font-medium text-gray-300">Formation complète — 4 mois</h3>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm font-medium">
                <Lock className="w-4 h-4 text-ishes-gold" />
                Paiement 100 % sécurisé
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 text-sm font-medium">
                <CreditCard className="w-4 h-4 text-ishes-gold" />
                Payable en plusieurs fois, sans frais
              </div>
            </div>
            <div className="space-y-4">
              {[
                "Samedi 11h00, en direct sur Zoom, dès octobre 2026",
                "Replays des séances",
                "Matn d'Ibn 'Âshir expliqué en français",
                "Supports, exercices et suivi",
                "Diplôme ISHES en fin de parcours",
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-200">{text}</span>
                </div>
              ))}
              <Link
                href="/inscription?plan=al_aqida&audience=adulte"
                className="mt-4 inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-5 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1 w-full"
              >
                JE M&apos;INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <article className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10 text-[15px] leading-relaxed text-gray-700">
          <header className="text-center">
            <p className="text-ishes-gold font-black uppercase tracking-[0.25em] text-xs mb-3">
              Guide · Aqîda
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight">
              L&apos;aqîda expliquée : Ibn &apos;Âshir, les attributs d&apos;Allah et les piliers de la foi
            </h2>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Qu&apos;est-ce que l&apos;aqîda ?</h3>
            <p>
              L&apos;<strong>aqîda</strong> (croyance, doctrine) est la science qui répond à une question simple et immense : que croit un musulman ? Elle porte sur Allah, sur Ses messagers, et sur ce que la révélation dit de l&apos;invisible. Dans la tradition sunnite enseignée au Maghreb, on l&apos;étudie avec un texte court, mémorisé, puis commenté par un enseignant. C&apos;est exactement le rôle d&apos;<em>Al-Murshid al-Mu&apos;în</em>.
            </p>
            <p>
              Étudier l&apos;<strong>aqîda en français</strong>, c&apos;est pouvoir dire qui est Allah, ce que signifie l&apos;attestation de foi, ce que recouvrent les <strong>six piliers de l&apos;iman</strong>, et comment la foi, la pratique et l&apos;ihsân se tiennent ensemble. Le hadith de Jibrîl, que le cours replace dans ce cadre, distingue ces trois degrés : l&apos;Islam, la foi, et l&apos;excellence.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Ibn &apos;Âshir et la croyance dans Al-Murshid al-Mu&apos;în
            </h3>
            <p>
              L&apos;imam <strong>&apos;Abd al-Wâhid Ibn &apos;Âshir</strong> (Fès, 1582–1631) a composé{" "}
              <strong>Al-Murshid al-Mu&apos;în &apos;alâ ad-darûrî min &apos;ulûm ad-dîn</strong>, « le guide qui aide vers l&apos;indispensable des sciences de la religion ». Le poème condense trois sciences : l&apos;<strong>aqîda</strong>, le <strong>fiqh mâlikite</strong> des adorations, et la spiritualité. Le{" "}
              <Link href="/fr/cours-al-aqida#programme" className="text-ishes-blue font-bold hover:underline">
                cours d&apos;aqîda ISHES
              </Link>{" "}
              suit la première. Le{" "}
              <Link href="/fr/cours-fiqh-malikite" className="text-ishes-blue font-bold hover:underline">
                cours de fiqh mâlikite
              </Link>{" "}
              suit la deuxième. Les deux lisent le même livre.
            </p>
            <p>
              Depuis des siècles, les étudiants du Maghreb et d&apos;Afrique de l&apos;Ouest apprennent ces vers, puis un professeur en ouvre le sens. La forme poétique aide à retenir. Elle ne dispense pas de l&apos;explication : un vers d&apos;aqîda tient en une ligne ce qu&apos;un cours met une séance à déployer. C&apos;est le travail de la formation.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Les treize attributs obligatoires</h3>
            <p>
              Le cœur du texte est la connaissance d&apos;Allah. Ibn &apos;Âshir y expose <strong>treize attributs obligatoires</strong>, et les contraires qu&apos;il est impossible de Lui attribuer. Les nommer, c&apos;est déjà entrer dans le cours :
            </p>
            <ol className="list-decimal pl-5 space-y-1 font-medium text-gray-800">
              <li>L&apos;existence (al-wujûd)</li>
              <li>L&apos;éternité sans commencement (al-qidam)</li>
              <li>La pérennité (al-baqâ&apos;)</li>
              <li>La dissemblance avec les créatures</li>
              <li>La subsistance par Soi-même</li>
              <li>L&apos;unicité (al-wahdâniyya)</li>
              <li>La vie (al-hayât)</li>
              <li>La science (al-&apos;ilm)</li>
              <li>La puissance (al-qudra)</li>
              <li>La volonté (al-irâda)</li>
              <li>L&apos;ouïe (as-sam&apos;)</li>
              <li>La vue (al-basar)</li>
              <li>La parole (al-kalâm)</li>
            </ol>
            <p>
              Chaque attribut a un contraire : le néant face à l&apos;existence, le commencement face à l&apos;éternité, la fin face à la pérennité, la ressemblance face à la transcendance, le besoin face à la richesse par Soi-même, la multiplicité face à l&apos;unicité, puis les contraires de la vie, de la science, de la puissance, de la volonté, de l&apos;ouïe, de la vue et de la parole. Le cours les prend un à un, en français, jusqu&apos;à ce que la formule devienne une compréhension.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Prophètes, shahada, foi et ihsân</h3>
            <p>
              Après Allah, le matn traite des <strong>prophètes et des messagers</strong> : les qualités qu&apos;il est obligatoire de leur reconnaître, et ce qu&apos;il est impossible de leur attribuer. Vient ensuite le sens de l&apos;<strong>attestation de foi</strong>. « Lâ ilâha illâ Allah » nie toute divinité en dehors d&apos;Allah et L&apos;affirme Lui seul. « Muhammad rasûl Allah » affirme le message, la transmission fidèle, et l&apos;obéissance à ce qu&apos;il a apporté.
            </p>
            <p>
              Les <strong>six piliers de la foi</strong> organisent le reste : croire en Allah, en Ses anges, en Ses livres, en Ses messagers, au Jour dernier, et au destin, son bien comme son mal. Les <strong>cinq piliers de l&apos;Islam</strong> — attestation, prière, zakat, jeûne, pèlerinage — y sont replacés comme les actes sur lesquels la croyance débouche. L&apos;<strong>ihsân</strong> ferme le parcours : adorer Allah comme si on Le voyait, et, puisqu&apos;on ne Le voit pas, savoir que Lui nous voit. La foi cesse d&apos;être une liste. Elle devient une présence.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Un cours d&apos;aqîda en ligne, pour francophones
            </h3>
            <p>
              L&apos;<strong>Institut ISHES</strong> donne cette formation à distance : un direct le <strong>samedi à 11h00</strong> sur Zoom, les replays, les supports, les exercices et le <strong>diplôme</strong>, sur <strong>4 mois</strong>, à <strong>399 €</strong>. Elle s&apos;adresse aux hommes et aux femmes, débutants compris. On la suit depuis la France, la Belgique, la Suisse, le Canada, le Maghreb, sans se déplacer à Toulouse.
            </p>
            <p>
              Pour la pratique des adorations selon la même école et le même auteur, enchaîne avec le{" "}
              <Link href="/fr/cours-fiqh-malikite" className="text-ishes-blue font-bold hover:underline">
                cours de Fiqh mâlikite
              </Link>
              . Pour la vie du Prophète ﷺ, la{" "}
              <Link href="/fr/cours-as-sirah" className="text-ishes-blue font-bold hover:underline">
                sîrah
              </Link>{" "}
              prolonge ce que l&apos;aqîda dit des messagers. L&apos;ensemble des parcours à distance est sur le{" "}
              <Link href="/fr/cours-a-distance" className="text-ishes-blue font-bold hover:underline">
                catalogue
              </Link>
              . Une question de niveau :{" "}
              <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
                l&apos;équipe répond sur WhatsApp
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <VitrineFaq
        eyebrow="FAQ Aqîda"
        title="Questions fréquentes : croyance, Ibn Âchir, cours en ligne"
        items={AQIDA_FAQS}
      />
    </div>
  );
}
