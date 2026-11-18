import { Metadata } from 'next';
import { absoluteUrl, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import Link from 'next/link';
import { CourseCadenceNote } from "@/components/vitrine/CourseCadenceNote";
import { 
  Calendar, 
  Clock, 
  Monitor, 
  Award, 
  Hourglass,
  Users,
  BookOpen,
  CheckCircle2,
  Gift,
  CreditCard,
  Lock,
  ArrowRight,
  PlayCircle,
  Tag,
  Heart,
  Star,
  Layers
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/formation-tarbya-islamya") },
  openGraph: {
    url: absoluteUrl("/fr/formation-tarbya-islamya"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Tarbiya Islamiya | Éducation Spirituelle & Éveil du Cœur | ISHES",
  description: "Accompagnez l'éveil spirituel de votre enfant avec nos cours de Tarbiya Islamiya. Une pédagogie ludique pour ancrer les valeurs et l'amour d'Allah.",
  keywords: "éducation islamique enfant, tarbiya islamiya, cours islam junior, adab enfant, ishes toulouse"
};

const TARBIYA_FAQS = [
  {
    question: "Qu’est-ce que la Tarbiya Islamiyya pour les enfants ?",
    answer:
      "La Tarbiya Islamiyya est l’éducation islamique du cœur et du comportement : apprendre à l’enfant à connaître et aimer Allah et Son Messager ﷺ, à comprendre les piliers de l’islam et de la foi, à connaître les histoires des Prophètes et à adopter un bon comportement (adab) au quotidien. À l’Institut ISHES, ce cours en ligne s’appuie sur le Coran et la Sunna, avec une pédagogie faite de récits, de jeux et de mises en scène.",
  },
  {
    question: "À partir de quel âge un enfant peut-il suivre le cours de Tarbiya Islamiyya en ligne ?",
    answer:
      "À partir de 6 ans. Les enfants sont répartis en groupes adaptés selon les âges et les niveaux, pour que les récits, les échanges et les activités correspondent à leur compréhension. Aucune connaissance préalable n’est demandée : le cours construit progressivement la personnalité musulmane de l’enfant sur 8 mois, à raison d’une séance par semaine.",
  },
  {
    question: "Que signifie « préserver la Fitra » dans l’éducation islamique de l’enfant ?",
    answer:
      "La Fitra est la disposition naturelle et pure qu’Allah a placée dans le cœur de chaque enfant. Dans un monde saturé de distractions, la Tarbiya Islamiyya cherche à préserver cette pureté plutôt qu’à la laisser s’éroder : nourrir l’amour d’Allah, apprendre à Le craindre et à Le satisfaire, et aider l’enfant à construire une relation saine avec son Créateur, avant même d’accumuler des connaissances.",
  },
  {
    question: "Quel est le programme du cours d’éducation islamique pour enfants ISHES ?",
    answer:
      "Le programme complet et progressif couvre l’aqîda adaptée aux enfants, les piliers de l’islam et de la foi, les histoires des Prophètes, les bonnes actions et le bon comportement (adab), les invocations et le dhikr, avec des révisions et des évaluations régulières. Chaque thème est abordé par des récits vivants, des échanges et des mises en scène pour que l’enfant comprenne et retienne.",
  },
  {
    question: "Comment se déroule le cours de Tarbiya Islamiyya à distance ?",
    answer:
      "Le cours a lieu une fois par semaine, le lundi à 18h30, en direct sur Zoom, à partir d’octobre 2026, pendant 8 mois. Les replays sont accessibles à vie, ce qui permet de rattraper une séance manquée, et chaque classe dispose d’un groupe WhatsApp privé pour le suivi avec l’enseignante. Les enfants participent activement : questions, jeux, récits et activités interactives.",
  },
  {
    question: "Combien coûte la formation Tarbiya Islamiyya et peut-on payer en plusieurs fois ?",
    answer:
      "La formation complète de 8 mois coûte 399 €, payables en une fois ou en 5 fois 79,80 € sans frais, avec un paiement 100 % sécurisé en ligne. Ce tarif inclut les cours en direct, les replays à vie, le suivi WhatsApp et les évaluations. L’inscription se fait directement sur le site, en choisissant le plan Tarbiya Islamiyya pour enfant.",
  },
  {
    question: "Comment les parents suivent-ils la progression de leur enfant en Tarbiya ?",
    answer:
      "Par le groupe WhatsApp privé de la classe, où l’enseignante partage le suivi, et par les évaluations régulières qui ponctuent le programme. Les parents peuvent aussi revoir les replays avec leur enfant pour prolonger le cours à la maison. L’accompagnement est pensé pour être bienveillant et motivant, afin que l’enfant progresse sereinement et prenne plaisir à apprendre sa religion.",
  },
  {
    question: "Quelle différence entre la Tarbiya Islamiyya et un cours d’arabe ou de Tajwid pour enfant ?",
    answer:
      "Le cours d’arabe apprend la langue, le Tajwid apprend à lire et réciter le Coran. La Tarbiya Islamiyya, elle, éduque le cœur et le comportement : croyance, amour d’Allah, histoires des Prophètes, adab et invocations, enseignés en français. Les trois se complètent : beaucoup de familles ISHES associent la Tarbiya du lundi à un cours de Tajwid ou d’arabe le mardi ou le jeudi.",
  },
  {
    question: "Qui enseigne le cours de Tarbiya Islamiyya en ligne ?",
    answer:
      "Une professeure diplômée en sciences islamiques, titulaire d’une ijaza dans la méthode Nour Al Bayan et formée au Caire, expérimentée dans la pédagogie de l’enfant. Son enseignement est basé sur le Coran et la Sunna et s’appuie sur des récits vivants, des exemples concrets du quotidien et un cadre éducatif positif, pour faire aimer la religion et donner envie de progresser.",
  },
];

export default function FormationTarbyaPage() {
  const course = PROGRAMS_DATA["tarbiya_islamiya"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      <JsonLd data={faqJsonLd(TARBIYA_FAQS)} />

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f2ece4] px-4 py-1.5 rounded-full">
              <Heart className="w-4 h-4 text-ishes-dark" fill="currentColor" />
              <span className="text-ishes-dark font-black text-xs tracking-[0.15em] uppercase">
                ÉVEIL DU CŒUR
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Tarbiya Islamiyya
            </h1>
            <h2 className="text-xl md:text-2xl text-[#b88c4d] font-bold leading-snug">
              Éduquer le cœur, préserver la Fitra,<br/>
              aimer ALLAH et Le satisfaire.
            </h2>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed">
              Un cours essentiel pour accompagner votre enfant dans la construction de sa personnalité musulmane, à la lumière du Coran et de la Sunna.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/inscription?plan=tarbiya_islamiya&audience=enfant" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-dark hover:bg-ishes-dark/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-dark/20 hover:-translate-y-1"
              >
                Je m'inscris maintenant <ArrowRight className="w-5 h-5" />
              </Link>
              {videoUrl && (
                <Link 
                  href={videoUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold/10 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
                >
                  <PlayCircle className="w-5 h-5" /> Voir le teaser
                </Link>
              )}
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
                  src="/images/formations/tarbya-islamya-distance-1.jpg" 
                  alt="Formation Tarbiya Islamiyya en ligne — Institut ISHES"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>

        {/* ─── INFO BAR ─── */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-6 pt-12 mt-12 border-t border-gray-200 w-full">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Début<br/><span className="text-gray-500 font-medium capitalize tracking-normal">Octobre 2026</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">1 cours / semaine<br/><span className="text-gray-500 font-medium capitalize tracking-normal">Lundi à 18h30</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">En direct sur Zoom<br/><span className="text-gray-500 font-medium capitalize tracking-normal">+ Replays à vie</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Hourglass className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Durée<br/><span className="text-gray-500 font-medium capitalize tracking-normal">8 mois</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Programme<br/><span className="text-gray-500 font-medium capitalize tracking-normal">complet</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Groupe WhatsApp<br/><span className="text-gray-500 font-medium capitalize tracking-normal">privé par classe</span></span>
          </div>
        </div>
      </section>

      <CourseCadenceNote>
        Dès octobre 2026, un cours par semaine, le lundi à 18h30, en direct sur Zoom, avec les
        replays à vie. Le programme complet dure 8 mois, et chaque classe a son groupe WhatsApp
        privé.
      </CourseCadenceNote>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: "Tu veux que ton enfant\ngrandisse avec des valeurs\nislamiques solides." },
            { icon: Heart, title: "Tu souhaites l'aider à\naimer ALLAH et Son\nMessager ﷺ dès son\nplus jeune âge." },
            { icon: BookOpen, title: "Tu veux qu'il apprenne à\nfaire les bons choix et à\navoir une belle adab\nau quotidien." },
            { icon: Star, title: "Tu recherches un cadre\nbienveillant et motivant\npour l'accompagner\ndans sa tarbiya." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-10 h-10 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-ishes-blue whitespace-pre-line leading-relaxed">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Pourquoi ce programme va tout changer ?</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-100">
             <Image 
               src="/images/formations/tarbya-islamya-distance-2.jpg" 
               alt="Cahier pédagogique Tarbiya Islamiyya — Institut ISHES"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-8">
            {[
              { 
                title: "Un enseignement basé sur le Coran et la Sunna", 
                desc: "Contenus authentiques pour une éducation équilibrée et conforme à l'Islam." 
              },
              { 
                title: "Des récits vivants et inspirants", 
                desc: "Histoires des Prophètes, des Compagnons et des enfants vertueux pour ancrer les valeurs." 
              },
              { 
                title: "Une pédagogie active et interactive", 
                desc: "Jeux, mises en scène, échanges et activités ludiques pour apprendre en s'amusant." 
              },
              { 
                title: "Des objectifs du cœur clairs", 
                desc: "Aimer ALLAH, Le craindre, Le satisfaire et avoir un bon comportement avec les gens." 
              },
              { 
                title: "Un accompagnement bienveillant", 
                desc: "Suivi personnalisé via WhatsApp et évaluations régulières pour progresser sereinement." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-7 h-7 text-ishes-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[17px] font-black text-ishes-blue mb-1">{item.title}</h3>
                  <p className="text-[15px] font-medium text-gray-600 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWO BANNERS BLOCK ─── */}
      <section className="py-12 px-6 max-w-7xl mx-auto mb-8">
        <div className="bg-[#f5f6f8] rounded-[2rem] p-8 md:p-12 shadow-sm grid md:grid-cols-2 gap-8 md:gap-16 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-8 h-8 text-ishes-gold" />
            </div>
            <div>
              <h3 className="font-black text-ishes-blue text-lg mb-4 leading-tight uppercase tracking-wide">UN PROGRAMME COMPLET ET PROGRESSIF</h3>
              <ul className="text-sm font-medium text-ishes-dark leading-relaxed space-y-2">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Aqidah adaptée aux enfants</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Les piliers de l'Islam et de la foi</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Les histoires des Prophètes</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Les bonnes actions et le bon comportement (Adab)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Les invocations et le Dhikr</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Révisions et évaluations régulières</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start relative">
            {/* Divider line for desktop */}
            <div className="hidden md:block absolute left-[-2rem] top-0 bottom-0 w-px bg-gray-300"></div>
            
            <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shrink-0 text-ishes-gold">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-black text-ishes-blue text-lg mb-4 leading-tight uppercase tracking-wide">FORMATION CLÉ EN MAIN</h3>
              <p className="text-sm font-medium text-ishes-dark leading-relaxed">
                Nous t'accompagnons à chaque étape pour offrir à ton enfant une expérience d'apprentissage complète, fluide et motivante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ Tarbiya Islamiyya"
        title="Éducation islamique des enfants en ligne : âge, programme, Fitra et parents"
        intro="Les questions des parents avant d’inscrire leur enfant au cours de Tarbiya Islamiyya à distance de l’Institut ISHES."
        items={TARBIYA_FAQS}
      />

      {/* ─── PRICING BANNER ─── */}
      <section className="py-8 px-6 max-w-[80rem] mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-6 md:p-8 shadow-2xl text-white relative overflow-hidden flex flex-wrap md:flex-nowrap items-center gap-6 justify-between">
          
          <div className="flex items-center gap-4 border-r border-white/20 pr-8 md:pr-16">
            <Tag className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-300">Tarif</p>
              <h3 className="text-3xl md:text-4xl font-black text-ishes-gold mt-0.5">399 €</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 pl-4 md:pl-0">
            <CreditCard className="w-10 h-10 text-ishes-gold shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-300">Paiement facilité</p>
              <h3 className="text-lg font-black text-white mt-0.5 leading-snug">5 x 79,80 € sans frais</h3>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <Link 
              href="/inscription?plan=tarbiya_islamiya&audience=enfant" 
              className="inline-flex items-center justify-center gap-2 bg-[#b88c4d] hover:bg-[#a67b3f] text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-lg hover:-translate-y-1 w-full md:w-auto"
            >
              JE M'INSCRIS MAINTENANT <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <Lock className="w-3 h-3 text-ishes-gold" />
              Paiement 100% sécurisé
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
