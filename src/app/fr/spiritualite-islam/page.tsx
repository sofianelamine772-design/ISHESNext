import { Metadata } from 'next';
import { absoluteUrl, SITE_URL, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import Link from 'next/link';
import { CourseCadenceNote } from "@/components/vitrine/CourseCadenceNote";
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  Hourglass,
  Heart,
  UserRound,
  Sprout,
  Scale,
  Mail,
  PenTool,
  CheckCircle2,
  Lock,
  CreditCard,
  ArrowRight,
  Eye
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { DistancielPrice } from "@/components/vitrine/DistancielPrice";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/spiritualite-islam") },
  title: "Spiritualité Musulmane | Éducation de l'Âme & Purification | ISHES",
  description: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
  keywords: "spiritualité islam, éducation de l'ame, purification du coeur, tazkiya, paix intérieure islam, cours islam, ishes",
  openGraph: {
    title: "Spiritualité Musulmane | Éducation de l'Âme & Purification | ISHES",
    description: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
    url: `${SITE_URL}/fr/spiritualite-islam`,
    type: "website",
    images: [
      {
        url: "/images/spiritualite-musulmane-flyer.jpeg",
        width: 1200,
        height: 630,
        alt: "Spiritualité Musulmane - Institut ISHES"
      }
    ]
  }
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Spiritualité Musulmane",
  "description": "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
  "provider": {
    "@type": "Organization",
    "name": "Institut ISHES",
    "sameAs": SITE_URL
  },
  "offers": {
    "@type": "Offer",
    "price": "399",
    "priceCurrency": "EUR",
    "category": "Paid"
  }
};

const SPIRITUALITE_FAQS = [
  {
    question: "Qu’est-ce que la spiritualité en islam ?",
    answer:
      "La spiritualité musulmane est le cœur vivant de l’islam : ce qui nourrit l’âme, apaise le cœur et donne du sens à la relation avec Allah, au-delà de la pratique extérieure. Elle repose sur le Coran et la Sunna, sur le rappel d’Allah (dhikr), sur la science religieuse qui guide l’adoration et sur un travail concret de purification de soi. Le cours de l’Institut ISHES l’enseigne en français, en direct sur Zoom, sur 4 mois.",
  },
  {
    question: "Que signifie tazkiya, ou tazkiyat an-nafs, la purification de l’âme ?",
    answer:
      "Tazkiyat an-nafs désigne la purification et l’éducation de l’âme : connaître son propre fonctionnement (corps et âme), identifier ses failles et les corriger méthodiquement pour se rapprocher d’Allah. Ce n’est pas une théorie : c’est un travail sur soi au quotidien, appuyé sur les sources authentiques. Le cours de spiritualité musulmane ISHES consacre une partie du programme aux outils de la tazkiya.",
  },
  {
    question: "Comment purifier son cœur concrètement selon l’islam ?",
    answer:
      "En reliant la science et la pratique : apprendre à connaître Allah, saisir le sens profond de chaque acte d’adoration, fréquenter les assises de rappel, puis identifier ses défauts et avancer pas à pas vers une meilleure version de soi-même. Le cours propose une méthode progressive et des réflexions contemporaines pour apaiser les doutes et ancrer le travail sur soi dans la vie réelle, sans quitter le monde.",
  },
  {
    question: "Quel est le programme du cours de spiritualité musulmane en ligne ?",
    answer:
      "Le cursus de 4 mois aborde les assises de rappel (dhikr) et leur impact sur le cœur, l’importance de la science religieuse pour guider l’adoration, le Coran et la Sunna comme fondement spirituel, les finalités spirituelles des cinq piliers de l’islam et des six piliers de la foi, la relation de soumission confiante entre le serviteur et son Créateur, et la connaissance de soi avec les outils de la tazkiya.",
  },
  {
    question: "Faut-il connaître l’arabe ou avoir étudié la théologie pour suivre le cours de spiritualité ?",
    answer:
      "Non. Aucun niveau préalable en théologie ou en langue arabe n’est requis. Le cours est ouvert aux débutants qui découvrent la spiritualité, aux étudiants en sciences islamiques qui veulent relier théorie et pratique, et à toute personne en quête de sens. L’enseignement est donné en français par une professeure diplômée en sciences islamiques, avec un support pédagogique après chaque séance.",
  },
  {
    question: "Comment se déroule le cours de spiritualité musulmane à distance ?",
    answer:
      "Le cours démarre en janvier 2027 et dure 4 mois, avec une séance par semaine le samedi à 10h30, en direct sur Zoom. Les replays restent accessibles en permanence, un support pédagogique est envoyé après chaque séance et un groupe WhatsApp privé permet de poser ses questions tout au long de la formation. Le parcours se termine par un diplôme de fin de parcours ISHES, après validation des examens.",
  },
  {
    question: "Combien coûte le cours de spiritualité musulmane et comment le payer ?",
    answer:
      "La formation complète de 4 mois coûte 399 €, payable en 3 fois sans frais, avec un paiement 100 % sécurisé en ligne. Ce tarif comprend les cours en direct du samedi, les replays permanents, les supports après chaque séance, l’accompagnement par WhatsApp et le diplôme de fin de parcours. L’inscription se fait directement sur le site de l’Institut ISHES.",
  },
  {
    question: "Quelle différence entre le cours de spiritualité musulmane et le cours d’aqîda ?",
    answer:
      "L’aqîda enseigne ce que le musulman doit croire : les attributs d’Allah, les prophètes, les piliers de la foi. La spiritualité musulmane travaille le cœur qui porte cette croyance : intention, dhikr, sens intérieur des adorations, purification de l’âme et relation vivante avec Allah. L’une structure la foi, l’autre la fait vivre. Les deux cours ISHES se suivent à distance et se complètent naturellement.",
  },
  {
    question: "Pourquoi associer science religieuse et purification du cœur ?",
    answer:
      "Parce que l’une sans l’autre déséquilibre le croyant. L’imam Al-Ghazâlî rappelait que la science sans purification du cœur est une preuve contre soi, non une lumière. Le cours allie donc rigueur de la science religieuse, spiritualité, réflexion personnelle et travail concret sur soi, pour vivre une foi plus consciente, plus profonde et plus apaisée, dans un monde où beaucoup ressentent un vide intérieur malgré la pratique.",
  },
];

export default function SpiritualiteIslamPage() {
  const course = PROGRAMS_DATA["spiritualite_islam"];
  const videoUrl = course?.videoUrl;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <JsonLd data={faqJsonLd(SPIRITUALITE_FAQS)} />
      <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
        
        {/* ─── HERO SECTION ─── */}
        <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-ishes-blue font-black text-sm tracking-[0.2em] uppercase flex items-center gap-2">
                <Award className="w-4 h-4 text-ishes-gold" />
                ÉDUCATION DE L'ÂME
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
                Spiritualité <br />
                Musulmane
              </h1>
              <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
                L'éducation de l'âme et le rapprochement d'ALLAH.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link 
                  href="/inscription?plan=spiritualite_islam&audience=adulte" 
                  className="inline-flex items-center justify-center gap-2 bg-ishes-dark hover:bg-ishes-dark/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-dark/20 hover:-translate-y-1"
                >
                  JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-gray-200 mt-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-ishes-gold" />
                  <span className="text-xs font-bold text-ishes-dark">Début<br/><span className="text-gray-500 font-medium">Janvier 2027</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-ishes-gold" />
                  <span className="text-xs font-bold text-ishes-dark">1 x par semaine<br/><span className="text-gray-500 font-medium">Samedi 10h30</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-ishes-gold" />
                  <span className="text-xs font-bold text-ishes-dark">En direct<br/><span className="text-gray-500 font-medium">sur Zoom</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-ishes-gold" />
                  <span className="text-xs font-bold text-ishes-dark">Diplôme<br/><span className="text-gray-500 font-medium">de fin de parcours</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Hourglass className="w-5 h-5 text-ishes-gold" />
                  <span className="text-xs font-bold text-ishes-dark">Durée<br/><span className="text-gray-500 font-medium">4 mois</span></span>
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
                    src="/images/formations/spiritualite-distance.png" 
                    alt="Cours de spiritualité musulmane en ligne — Institut ISHES"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <CourseCadenceNote>
          Le cours démarre en janvier 2027. Un rendez-vous par semaine, le samedi à 10h30, en direct
          sur Zoom. Le parcours dure 4 mois et se termine par un diplôme de fin de parcours.
        </CourseCadenceNote>

        {/* ─── POUR QUI ─── */}
        <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si...</h2>
            <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Tu sens que ta foi", desc: "a besoin d'être nourrie au-delà des simples connaissances." },
              { icon: UserRound, title: "Tu souhaites retrouver", desc: "une relation plus profonde avec ALLAH." },
              { icon: Sprout, title: "Tu veux apprendre à", desc: "purifier ton cœur et à travailler sur toi de manière concrète." },
              { icon: Scale, title: "Tu recherches une", desc: "spiritualité équilibrée, authentique et enracinée dans le Coran et la Sunna." }
            ].map((item, i) => (
              <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
                <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                  <item.icon className="w-8 h-8 text-ishes-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-ishes-blue whitespace-pre-line leading-tight">{item.title}</h3>
                  <p className="text-gray-600 font-medium text-sm mt-2 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── POURQUOI DIFFERENT ─── */}
        <section className="py-24 px-6 bg-white my-12">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100">
               <Image 
                 src="/images/formations/spiritualite-distance-2.jpg" 
                 alt="Cours de spiritualité musulmane en direct sur Zoom — Institut ISHES"
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
            </div>
            <div className="space-y-10">
              <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Pourquoi ce programme va tout changer ?</h2>
              <div className="space-y-6">
                {[
                  "Une session complète de 4 mois d'apprentissage",
                  "Enseignement vivant et progressif",
                  "Réflexions spirituelles et contemporaines",
                  "Support pédagogique inclus après chaque séance",
                  "Accompagnement et réponses aux questions tout au long de la formation",
                  "Replay accessible en permanence"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-ishes-gold shrink-0" />
                    <span className="text-lg font-medium text-ishes-dark">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CE QUI EST INCLUS ─── */}
        <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-16">Ce qui est inclus</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { image: "/images/tajwid_students.png", title: "En direct sur Zoom\n1 x par semaine\nSamedi 10h30" },
              { image: "/images/tajwid_exercises.png", title: "Support pédagogique\naprès chaque séance" },
              { image: "/images/tilawa_quran.png", title: "Replay accessibles\nen permanence" },
              { image: "/images/tajwid_whatsapp.png", title: "Groupe WhatsApp\nprivé et suivi" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col group overflow-hidden relative pb-6 transition-all hover:shadow-md">
                <div className="w-full h-40 relative mb-4">
                   <Image src={item.image} alt={`${item.title} — Institut ISHES`} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
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
            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-ishes-gold/30 border-dashed"></div>
            
            <div className="grid lg:grid-cols-5 gap-8">
              {[
                { num: 1, icon: Calendar, title: "Tu t'inscris", desc: "Choisis ton mode de paiement et valide ton inscription." },
                { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès immédiat à la plateforme et au groupe WhatsApp." },
                { num: 3, icon: Video, title: "Tu assistes aux séances", desc: "En direct sur Zoom 1 fois par semaine." },
                { num: 4, icon: PenTool, title: "Tu participes activement", desc: "Questions, échanges et activités pour une meilleure compréhension." },
                { num: 5, icon: Award, title: "Tu valides ton diplôme", desc: "À la fin des 4 mois après validation des examens." }
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
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

        <VitrineFaq
          eyebrow="FAQ spiritualité musulmane"
          title="Spiritualité en islam et tazkiya : purifier son cœur, progresser, se former en ligne"
          intro="Les réponses aux questions sur la spiritualité musulmane, la purification de l’âme et le cours à distance de l’Institut ISHES."
          items={SPIRITUALITE_FAQS}
        />

        {/* ─── PRICING BANNER ─── */}
        <section className="py-12 px-6 max-w-6xl mx-auto mb-10 mt-12">
          <div className="bg-ishes-dark rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Section Gauche : Prix */}
            <div className="text-center md:text-left space-y-2 flex-1 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
              <div className="text-5xl md:text-6xl font-black text-ishes-gold"><DistancielPrice price={399} slug="spiritualite_islam" originalClassName="text-2xl md:text-3xl" /></div>
              <h3 className="text-lg font-medium text-gray-300">Formation complète – 4 mois</h3>
            </div>

            {/* Section Milieu : Payable en 3X */}
            <div className="flex-1 flex items-center justify-center md:justify-start gap-4 px-0 md:px-8 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
              <CreditCard className="w-10 h-10 text-ishes-gold" />
              <span className="text-lg font-medium text-gray-200">Payable en 3X <br/> sans frais</span>
            </div>

            {/* Section Droite : Bouton et sécurité */}
            <div className="flex flex-col items-center md:items-end gap-4 flex-1">
              <Link 
                href="/inscription?plan=spiritualite_islam&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-5 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1 w-full"
              >
                JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Lock className="w-4 h-4 text-ishes-gold" />
                Paiement 100% sécurisé
              </div>
            </div>
            
          </div>
        </section>

      </div>
    </>
  );
}
