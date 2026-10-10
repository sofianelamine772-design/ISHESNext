import Link from 'next/link';
import { CourseCadenceNote } from "@/components/vitrine/CourseCadenceNote";
import { 
  Calendar, 
  Clock, 
  Award, 
  Hourglass,
  Gift,
  BookOpen,
  Heart,
  Users,
  CheckCircle2,
  Mail,
  PenTool,
  Lock,
  ArrowRight,
  Monitor,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ClipboardList,
  FileText,
  ScrollText,
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import {
  buildPageMetadata,
  courseJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

import {
  SciencesDuCoranGuideArticle,
  SCIENCES_GUIDE_FAQS,
} from "@/components/vitrine/SciencesDuCoranGuideArticle";

const PROGRAMME_SCIENCES = [
  {
    title: "Introduction aux Sciences du Coran et leur importance",
    desc: "Les ‘Ulûm al-Qur'ân regroupent le contexte, la transmission, les lectures et les méthodes qui éclairent le texte. Ce n'est pas une science unique, mais un ensemble de disciplines complémentaires.",
  },
  {
    title: "La Révélation : contexte, étapes et sagesses",
    desc: "De la grotte de Hirâ' et des premiers versets d'Al-‘Alaq (96:1-5) jusqu'à une révélation progressive d'environ 23 ans, entre période mecquoise et période médinoise.",
  },
  {
    title: "Le Prophète ﷺ et la transmission du Coran",
    desc: "Réception, récitation, explication et transmission : la Sîrah et les asbâb an-nuzûl aident à lire les versets dans leur situation, avec une méthode critique.",
  },
  {
    title: "Les Compagnons et la préservation du Coran",
    desc: "Mémorisation, enseignement et mise par écrit : une transmission à la fois orale et écrite, vécue comme une guidance et non comme un texte isolé.",
  },
  {
    title: "La compilation : du vivant du Prophète ﷺ aux califes",
    desc: "Collecte des feuillets sous Abû Bakr, puis recension et diffusion de copies de référence sous ‘Uthmân, pour unifier le cadre écrit de la récitation.",
  },
  {
    title: "Les sciences liées au Coran",
    desc: "Makkî / madanî, asbâb an-nuzûl, qirâ'ât, rasm al-mushaf, tafsîr, nâsikh et mansûkh, muhkam et mutashâbih, gharîb, waqf, tajwîd et balâgha.",
  },
  {
    title: "Le miracle du Coran",
    desc: "L'i‘jâz étudié par la langue, la rhétorique, la cohérence du message et la transmission — au-delà des listes de coïncidences numériques.",
  },
] as const;

const SCIENCES_FAQS = [
  {
    question: "Qu'apprend-on en Sciences du Coran à l'ISHES ?",
    answer:
      "L'histoire de la Révélation, le rôle du Prophète ﷺ et des Compagnons, la collecte et la transmission du texte, les grandes disciplines (‘Ulûm al-Qur'ân) et les enjeux liés aux manuscrits anciens — avec une pédagogie claire pour francophones.",
  },
  {
    question: "Combien coûte la formation ?",
    answer:
      "La formation complète dure 4 mois, à 399 €, avec 1 cours par semaine en direct sur Zoom, replays, supports et diplôme ISHES.",
  },
  {
    question: "Quand ont lieu les cours de Sciences du Coran ?",
    answer:
      "Un cours par semaine, le dimanche à 10h30, en direct sur Zoom, avec les replays. La formation dure 4 mois. Les supports de cours, l'attestation de suivi et le groupe WhatsApp sont inclus.",
  },
  {
    question: "Quel est le programme du cours de Sciences du Coran ?",
    answer:
      "Introduction aux ‘Ulûm al-Qur'ân, révélation (contexte, étapes et sagesses), transmission par le Prophète ﷺ, préservation par les Compagnons, compilation jusqu'aux califes, disciplines coraniques (mecquois et médinois, asbâb an-nuzûl, qirâ'ât) et miracle du Coran.",
  },
  ...SCIENCES_GUIDE_FAQS,
];

export const metadata = buildPageMetadata({
  title: "Cours Sciences du Coran en ligne | ISHES",
  description:
    "Cours en ligne de Sciences du Coran (4 mois, 399 €) : révélation sur 23 ans, Compagnons, compilation, ‘Ulûm al-Qur'ân et manuscrits. ISHES.",
  path: "/fr/cours-sciences-coran",
  keywords: [
    "sciences du coran",
    "cours sciences du coran en ligne",
    "histoire du livre d'allah",
    "histoire du coran",
    "ulum al quran",
    "ulum al quran en français",
    "révélation coran",
    "grotte de hira",
    "sourate al alaq",
    "makki madani",
    "mission prophetique",
    "compagnons transmission coran",
    "compilation coran abu bakr",
    "compilation coran uthman",
    "manuscrit birmingham",
    "palimpseste sanaa",
    "codex parisino-petropolitanus",
    "asbab an nuzul",
    "qiraat",
    "ijaz al quran",
    "ishes toulouse",
    "cours coran zoom",
  ],
  image: "/images/formations/sc-du-coran-dsita-1.png",
});

export default function CoursSciencesCoranPage() {
  const course = PROGRAMS_DATA["sciences_du_coran"];
  const videoUrl = course?.videoUrl;

  return (
    <>
      <JsonLd
        data={{
          ...courseJsonLd({
            name: "Cours de Sciences du Coran",
            description:
              "Formation en ligne de 4 mois (399 €), un cours par semaine le dimanche à 10h30 sur Zoom, avec replays. Histoire de la révélation, mission du Prophète, rôle des Compagnons, compilation sous Abû Bakr et ‘Uthmân, disciplines des ‘Ulûm al-Qur'ân et manuscrits anciens.",
            path: "/fr/cours-sciences-coran",
            price: "399",
            courseMode: "Online",
            workload: "P4M",
            image: "/images/formations/sc-du-coran-dsita-1.png",
          }),
          syllabusSections: PROGRAMME_SCIENCES.map((item) => ({
            "@type": "Syllabus",
            name: item.title,
            description: item.desc,
          })),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Sciences du Coran", path: "/fr/cours-sciences-coran" },
        ])}
      />
      <JsonLd data={faqJsonLd(SCIENCES_FAQS)} />

    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase">
              SCIENCE DU CORAN
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Les Sciences du Coran :{" "}
              <span className="text-ishes-gold">la fascinante histoire du Livre d&apos;ALLAH</span>
            </h1>
            <p className="text-gray-600 font-medium max-w-xl text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Guide pédagogique et formation : Révélation, Compagnons, préservation, manuscrits et
              miracle du Coran.
            </p>
            <p className="text-gray-600 font-medium max-w-xl leading-relaxed">
              Et si tu découvrais l&apos;histoire extraordinaire du Livre que tu récites ? Plonge au
              cœur de la révélation coranique et découvre comment le Coran a été révélé au
              Prophète ﷺ, transmis de génération en génération et préservé avec une fidélité
              exceptionnelle.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <Link 
                href="/inscription?plan=sciences_du_coran&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-[#c19b6c] hover:bg-[#a67b3f] text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-[#c19b6c]/20 hover:-translate-y-1"
              >
                JE M&apos;INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/fr/cours-sciences-coran/guide"
                className="inline-flex items-center justify-center gap-2 border border-[#c19b6c] text-[#c19b6c] hover:bg-[#c19b6c]/10 px-6 py-4 rounded-md text-[15px] font-black transition-all"
              >
                <FileText className="w-5 h-5" />
                Guide gratuit
              </Link>
              <a
                href="https://wa.me/33666033519?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20le%20cours%20de%20Sciences%20du%20Coran."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-ishes-blue hover:text-ishes-gold px-2 py-4 text-[15px] font-black transition-colors"
              >
                Une question ? Écrire sur WhatsApp
              </a>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-ishes-gold" />
                <span className="text-sm font-bold text-gray-700 leading-tight">Octobre 2026</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">1 cours / semaine<br/><span className="text-gray-500 font-medium">Dimanche à 10h30</span></span>
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
          
          <div className="flex-1 w-full">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-ishes-blue">
              {videoUrl ? (
                <iframe 
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image 
                  src="/images/formations/sc-du-coran-dsita-1.png" 
                  alt="Cours de sciences du Coran en ligne — Institut ISHES"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-4xl mx-auto pb-8">
        <div className="bg-ishes-blue text-white rounded-[2rem] px-8 py-10 md:px-12 text-center shadow-xl">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed" dir="rtl" lang="ar">
            إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ
          </p>
          <p className="mt-6 text-gray-200 font-medium leading-relaxed max-w-2xl mx-auto">
            « En vérité, c&apos;est Nous qui avons fait descendre le Rappel, et c&apos;est Nous qui
            en sommes gardien. »
          </p>
          <p className="mt-3 text-ishes-gold font-bold text-sm tracking-wide">
            Sourate Al-Hijr (15), verset 9
          </p>
        </div>
        <div className="mt-10 space-y-5 text-gray-700 font-medium leading-relaxed text-lg">
          <p>
            Découvre l&apos;amour immense que les Compagnons portaient à la Parole d&apos;ALLAH,
            leurs sacrifices et les efforts considérables qu&apos;ils ont déployés pour préserver
            ce trésor et le transmettre à toute la communauté.
          </p>
          <p>
            Parce que connaître l&apos;histoire du Coran, c&apos;est apprendre à mesurer sa valeur,
            à l&apos;aimer davantage et à lui donner la place qu&apos;il mérite dans ta vie.
          </p>
        </div>
      </section>

      <CourseCadenceNote>
        Dès octobre 2026, un cours par semaine a lieu le dimanche à 10h30, en direct sur Zoom,
        avec les replays. La formation dure 4 mois. Tous les supports sont inclus, et le diplôme
        ISHES vient clore le parcours.
      </CourseCadenceNote>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si tu veux...</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Comprendre l'histoire\net la transmission du Coran", desc: "Une révélation préservée génération\naprès génération." },
            { icon: BookOpen, title: "Approfondir tes connaissances\nsur les Sciences du Coran", desc: "Des bases solides expliquées\navec clarté." },
            { icon: Heart, title: "Renforcer ta relation avec\nle Livre d'ALLAH", desc: "Une lumière qui éclaire le cœur\net la vie." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-8 h-8 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ishes-blue whitespace-pre-line leading-tight">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm mt-3 whitespace-pre-line leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-24 px-6 bg-[#f2ece4] my-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
             <Image 
               src="/images/formations/sc-du-coran-distance-2.jpg" 
               alt="Étude des sciences du Coran en direct sur Zoom — Institut ISHES"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Pourquoi ce programme va tout changer ?</h2>
            <div className="space-y-6">
              {[
                "Le Coran devient une preuve vivante, pas seulement un texte récité",
                "Un héritage transmis avec une précision absolue",
                "Un miracle historique, linguistique et spirituel",
                "Une lumière témoignant de son origine divine",
                "Pédagogie claire, structurée et accessible"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#c19b6c] shrink-0" />
                  <span className="text-lg font-bold text-ishes-dark">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <p className="text-ishes-gold font-black text-xs uppercase tracking-[0.2em] mb-3">
          Pourquoi étudier les Sciences du Coran ?
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-6">
          Un savoir qui renforce ta foi et illumine ta vie
        </h2>
        <p className="text-gray-700 font-medium text-lg leading-relaxed">
          Étudier les Sciences du Coran, c&apos;est découvrir l&apos;histoire extraordinaire d&apos;un
          Livre révélé sur 23 années, transmis par le Prophète ﷺ, préservé par les Compagnons et
          maintenu authentique jusqu&apos;à aujourd&apos;hui. Ce cours te permet de mieux comprendre
          le contexte de ses versets, la sagesse de la Révélation et le miracle de sa préservation.
          Les manuscrits anciens — Birmingham, Sanaa, codex Parisino-petropolitanus — sont étudiés
          comme des témoins historiques, distingués de l&apos;affirmation de foi en la préservation
          (Coran 15:9).
        </p>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-ishes-gold font-black text-xs uppercase tracking-[0.2em] mb-3">
            Un programme riche et transformant
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce que tu vas apprendre</h2>
        </div>
        <ol className="grid md:grid-cols-2 gap-5">
          {PROGRAMME_SCIENCES.map((item, i) => (
            <li key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex gap-4">
              <span className="w-10 h-10 shrink-0 rounded-full bg-ishes-dark text-white font-black flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-black text-ishes-blue leading-snug">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-8">
          <Link href="#definition" className="inline-flex items-center gap-2 text-ishes-gold font-black hover:underline">
            Découvrir le programme détaillé <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#f2ece4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-ishes-gold font-black text-xs uppercase tracking-[0.2em] mb-3">
              À qui s&apos;adresse ce cours ?
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue max-w-3xl mx-auto">
              Une formation pour tous ceux qui souhaitent approfondir leur relation avec le Coran
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                title: "Comprendre la Révélation",
                desc: "Le contexte, les étapes et la sagesse d'un message descendu sur 23 années.",
              },
              {
                title: "Connaître le rôle des Compagnons",
                desc: "Leur engagement dans la mémorisation, la compilation et la préservation du Coran.",
              },
              {
                title: "Découvrir la mission du Prophète ﷺ",
                desc: "Son rôle dans la réception, la transmission et l'explication du Coran.",
              },
              {
                title: "Explorer le miracle du Coran",
                desc: "Sa langue, sa structure, sa préservation et les témoignages des manuscrits anciens.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-white shadow-sm">
                <h3 className="font-black text-ishes-blue mb-2">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <ul className="max-w-3xl mx-auto space-y-3">
            {[
              "Celles et ceux qui récitent le Coran et veulent en comprendre l'histoire",
              "Les personnes qui veulent renforcer leur foi et leur lien avec le Prophète ﷺ",
              "Les étudiants en sciences islamiques",
              "Toute personne qui souhaite apprendre de manière structurée et accessible, en français",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-ishes-dark font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#c19b6c] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-gray-600 font-medium mt-8">
            Supports de cours inclus · Attestation de suivi · Groupe WhatsApp dédié
          </p>
        </div>
      </section>

      {/* ─── CE QUI EST INCLUS ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-16">Ce qui est inclus</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {[
            { image: "/images/fiqh_book.png", icon: BookOpen, title: "Support\npédagogique" },
            { image: "/images/aqida_students.png", icon: Monitor, title: "Replays\nà vie" },
            { image: "/images/media__1785842143907.jpg", icon: Award, title: "Diplôme de fin\nde parcours" },
            { image: "/images/tajwid_exercises.png", icon: PenTool, title: "Exercices et\névaluations" },
            { image: "/images/tajwid_whatsapp.png", icon: Users, title: "Groupe WhatsApp\nprivé et suivi" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center overflow-hidden pb-6 group hover:shadow-md transition-shadow">
              <div className="w-full h-32 relative mb-8">
                 <Image src={item.image} alt={`${item.title} — Institut ISHES`} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 20vw" />
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#c19b6c] rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm">
                   <item.icon className="w-5 h-5 text-white" />
                 </div>
              </div>
              <h3 className="font-bold text-ishes-blue text-sm whitespace-pre-line px-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEROULEMENT ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Comment se déroule le programme ?</h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-[#c19b6c]/30 border-dashed"></div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {[
              { num: 1, icon: ClipboardList, title: "Tu t'inscris", desc: "Choisis ton mode de paiement et valide ton inscription." },
              { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès immédiat à la plateforme et au groupe WhatsApp." },
              { num: 3, icon: Monitor, title: "Tu assistes aux cours", desc: "Cours en direct sur Zoom chaque semaine." },
              { num: 4, icon: GraduationCap, title: "Tu participe aux examens", desc: "Participation aux examens pour valider tes acquis." },
              { num: 5, icon: Award, title: "Tu valides ton diplôme", desc: "À la fin des 4 mois après validation de ton parcours." }
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-ishes-dark text-white rounded-full flex items-center justify-center font-black text-xl mb-6 relative z-10 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <step.icon className="w-10 h-10 text-[#c19b6c] mb-4" />
                <h3 className="font-black text-ishes-blue mb-2 text-sm md:text-base">{step.title}</h3>
                <p className="text-xs text-gray-600 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── A LA FIN DE CETTE FORMATION ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue">À la fin de cette formation, tu sauras :</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 bg-[#f2ece4] rounded-2xl p-8">
           {[
             { icon: BookOpen, text: "Comprendre l'histoire\net la transmission du Coran" },
             { icon: ShieldCheck, text: "Reconnaître les preuves\nde son authenticité" },
             { icon: Sparkles, text: "Voir les miracles uniques\ndu Livre d'ALLAH" },
             { icon: Heart, text: "Renforcer ta relation\navec le Coran" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 max-w-[250px]">
               <item.icon className="w-8 h-8 text-[#c19b6c] shrink-0" />
               <span className="text-sm font-bold text-ishes-dark whitespace-pre-line leading-snug">{item.text}</span>
             </div>
           ))}
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-ishes-gold font-black text-xs uppercase tracking-[0.2em] mb-3">
            Ressources gratuites
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-4">
            Fiches pratiques Sciences du Coran
          </h2>
          <p className="text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Avant ou pendant le cursus, consulte nos guides en texte libre : idéal pour le
            référencement et pour approfondir l&apos;histoire du Livre d&apos;ALLAH.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/fr/cours-sciences-coran/guide"
            className="group bg-white border border-[#e6d5b8]/40 hover:border-ishes-gold/50 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md"
          >
            <FileText className="w-8 h-8 text-ishes-gold mb-4" />
            <h3 className="text-xl font-black text-ishes-blue group-hover:text-ishes-gold mb-2">
              Guide complet — Sciences du Coran
            </h3>
            <p className="text-gray-600 font-medium text-sm leading-relaxed mb-4">
              Révélation, Compagnons, collecte, disciplines (‘Ulûm al-Qur&apos;ân), manuscrits de
              Birmingham et Sanaa, miracle du Coran.
            </p>
            <span className="inline-flex items-center gap-2 text-ishes-gold font-bold text-sm">
              Lire la fiche <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/fr/cours-sciences-coran/frise-chronologique"
            className="group bg-white border border-[#e6d5b8]/40 hover:border-ishes-gold/50 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md"
          >
            <ScrollText className="w-8 h-8 text-ishes-gold mb-4" />
            <h3 className="text-xl font-black text-ishes-blue group-hover:text-ishes-gold mb-2">
              Frise chronologique de la Révélation
            </h3>
            <p className="text-gray-600 font-medium text-sm leading-relaxed mb-4">
              De 610 à la codification de l&apos;arabe : califats d&apos;Abû Bakr et ‘Uthmân,
              vocalisation, points distinctifs, qirâ&apos;ât.
            </p>
            <span className="inline-flex items-center gap-2 text-ishes-gold font-bold text-sm">
              Voir la frise <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <article className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto fiche-prose space-y-12">
          <SciencesDuCoranGuideArticle />
        </div>
      </article>

      {/* ─── PRICING BANNER ─── */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-10">
        <div className="bg-ishes-blue rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0 pr-0 md:pr-16 w-full md:w-auto">
            <div className="text-5xl md:text-6xl font-black text-[#c19b6c]">399 €</div>
            <h3 className="text-lg font-medium text-gray-300">Formation complète – 4 mois</h3>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto pl-0 md:pl-16">
            <Link 
              href="/inscription?plan=sciences_du_coran&audience=adulte" 
              className="inline-flex items-center justify-center gap-2 bg-[#c19b6c] hover:bg-[#a67b3f] text-white px-8 py-5 rounded-md text-[15px] font-black transition-all shadow-xl shadow-[#c19b6c]/20 hover:-translate-y-1 w-full"
            >
              JE M&apos;INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <Lock className="w-4 h-4 text-[#c19b6c]" />
              Paiement 100% sécurisé
            </div>
          </div>
          
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ Sciences du Coran"
        title="Questions fréquentes sur le cours"
        items={SCIENCES_FAQS}
      />

    </div>
    </>
  );
}
