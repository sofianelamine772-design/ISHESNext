import { Metadata } from 'next';
import { absoluteUrl, courseJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
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
  MessageCircle,
  BarChart3,
  CheckCircle2,
  Gift,
  CreditCard,
  Lock,
  ArrowRight,
  PlayCircle,
  Tag
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

const ARABE_ADULTE_FAQS = [
  {
    question: "Peut-on apprendre l’arabe à l’âge adulte en partant de zéro ?",
    answer:
      "Oui. Le cours d’arabe adulte de l’Institut ISHES commence par l’alphabet et s’adresse aux grands débutants francophones. Aucune connaissance préalable n’est demandée : chaque étape, de la reconnaissance des lettres à la lecture puis à la conversation, est pensée pour un adulte qui n’a jamais étudié la langue. La progression est régulière, en direct sur Zoom, avec des replays pour réviser entre deux séances.",
  },
  {
    question: "Combien de temps faut-il pour apprendre l’arabe littéraire avec ce cours ?",
    answer:
      "La formation d’arabe littéraire pour adultes dure 8 mois, à raison d’un cours en direct par semaine. Sur cette période, l’objectif est de passer de l’alphabet à la lecture fluide, à l’écriture et à la compréhension de phrases du quotidien et de textes simples. La maîtrise complète de la langue demande plusieurs années ; ce parcours pose des bases solides et l’autonomie nécessaire pour continuer ensuite.",
  },
  {
    question: "Quel jour et à quelle heure a lieu le cours d’arabe adulte en ligne ?",
    answer:
      "Le cours a lieu le vendredi à 19h30, en direct sur Zoom, pour les frères, à partir de janvier 2027. Chaque séance est enregistrée : si tu ne peux pas être présent, le replay reste accessible pendant toute la formation. Les supports (manuel PDF, exercices, audios et vidéos) sont consultables à tout moment, et un groupe WhatsApp privé par classe prolonge l’échange entre deux vendredis.",
  },
  {
    question: "Quelle différence entre arabe littéraire et arabe dialectal : lequel apprend-on ici ?",
    answer:
      "Le cours enseigne l’arabe littéraire (al-fusha), la langue du Coran, des hadiths et des livres de sciences islamiques, comprise dans tout le monde arabe. Les dialectes (marocain, algérien, égyptien…) varient d’un pays à l’autre et ne permettent pas de lire les textes religieux. En apprenant l’arabe littéraire, tu accèdes directement aux sources et tu comprends ensuite plus facilement n’importe quel dialecte.",
  },
  {
    question: "Faut-il apprendre l’arabe pour comprendre le Coran ?",
    answer:
      "Comprendre le Coran dans sa langue d’origine change profondément la lecture et la prière. Une traduction reste une interprétation ; l’arabe permet de saisir le sens des versets, des invocations et des hadiths sans intermédiaire. C’est précisément l’objectif du cours d’arabe adulte de l’Institut ISHES : donner aux francophones une autonomie progressive face aux textes religieux, en reliant chaque notion de vocabulaire et de grammaire à des exemples concrets.",
  },
  {
    question: "Le cours d’arabe pour adultes aborde-t-il la grammaire et l’expression orale ?",
    answer:
      "Oui, les deux. Les séances travaillent la lecture, l’écriture, la compréhension et l’expression orale à travers des exercices concrets et des mises en situation du quotidien. Les notions de grammaire sont introduites progressivement, au service de la compréhension, et non comme une liste de règles abstraites. L’objectif est de pouvoir comprendre et parler arabe dans des situations courantes tout en accédant aux textes.",
  },
  {
    question: "Combien coûte le cours d’arabe en ligne pour adulte et peut-on payer en plusieurs fois ?",
    answer:
      "Le tarif de la formation d’arabe adulte est de 649 € pour les 8 mois, avec la possibilité de régler en 5 fois 129,80 € sans frais. Le prix inclut les cours en direct sur Zoom, les replays, le manuel pédagogique en PDF, les supports et exercices, les enregistrements audio et vidéo, le suivi pédagogique et le diplôme ISHES en fin de parcours. Le paiement en ligne est sécurisé.",
  },
  {
    question: "Peut-on suivre ce cours d’arabe depuis Toulouse ou ailleurs en France ?",
    answer:
      "Oui. Le cours d’arabe adulte se suit entièrement à distance, en direct sur Zoom, depuis Toulouse comme depuis n’importe quelle ville de France, de Belgique, de Suisse ou d’ailleurs. L’Institut ISHES est basé à Toulouse et y propose aussi des cours en présentiel ; cette formation d’arabe littéraire pour adultes, elle, est pensée pour être accessible à tous les francophones, où qu’ils vivent.",
  },
  {
    question: "Que reçoit-on à la fin de la formation d’arabe littéraire ISHES ?",
    answer:
      "Les élèves qui valident le parcours reçoivent le diplôme de l’Institut ISHES. Au-delà du diplôme, l’objectif concret est de savoir lire et écrire l’arabe avec aisance, de comprendre des textes simples et des passages du Coran, et d’échanger en arabe littéraire dans des situations courantes. Le suivi pédagogique tout au long des 8 mois et le groupe WhatsApp de classe aident à ne pas décrocher.",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/cours-arabe-adulte") },
  openGraph: {
    url: absoluteUrl("/fr/cours-arabe-adulte"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Cours d'Arabe Littéraire (Adulte) | ISHES",
  description: "Maîtrisez la langue arabe moderne. De l'alphabet à la conversation courante avec une méthode immersive et des professeurs qualifiés.",
  keywords: "cours arabe adulte, apprendre arabe toulouse, arabe littéraire, al arabiya bayna yadayk, ishes"
};

export default function CoursArabeAdultePage() {
  const course = PROGRAMS_DATA["arabe_adulte"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      <JsonLd
        data={courseJsonLd({
          name: "Cours d'Arabe Littéraire (Adulte)",
          description:
            "Maîtrisez la langue arabe moderne. De l'alphabet à la conversation courante avec une méthode immersive.",
          path: "/fr/cours-arabe-adulte",
          price: course?.price || "399",
          courseMode: "Online",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Arabe Adulte", path: "/fr/cours-arabe-adulte" },
        ])}
      />
      <JsonLd data={faqJsonLd(ARABE_ADULTE_FAQS)} />

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f2ece4] px-4 py-1.5 rounded-full">
              <BookOpen className="w-4 h-4 text-ishes-gold" />
              <span className="text-ishes-dark font-black text-xs tracking-[0.15em] uppercase">
                LANGUE & COMMUNICATION
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Apprenez l'arabe <br />
              et comprenez <br />
              enfin le Coran.
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Formation complète en langue arabe adaptée aux francophones, du niveau débutant jusqu'à la compréhension des textes.
            </p>
            
            <h2 className="text-ishes-blue font-black text-sm uppercase tracking-widest pt-4">
              Formation Arabe Littéraire (Adultes)
            </h2>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/inscription?plan=arabe_adulte&audience=adulte" 
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
                  src="/images/formations/arabe-ditanvce-1.png" 
                  alt="Cours d'arabe pour adultes — comprendre le Coran avec l'Institut ISHES"
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
            <span className="text-sm font-bold text-gray-700 leading-tight">Janvier 2027</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-[12px] font-bold text-gray-700 leading-tight">Vendredi à 19h30 (frères)</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">En direct sur Zoom</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Hourglass className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Durée<br/><span className="text-gray-500 font-medium capitalize tracking-normal">8 mois</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Diplôme reconnu<br/><span className="text-gray-500 font-medium capitalize tracking-normal">ISHES</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Groupe WhatsApp<br/><span className="text-gray-500 font-medium capitalize tracking-normal">privé par classe</span></span>
          </div>
        </div>
      </section>

      <CourseCadenceNote>
        Dès janvier 2027, le cours a lieu le vendredi à 19h30 pour les frères, en direct sur Zoom.
        Le parcours dure 8 mois, avec un groupe WhatsApp privé par classe, et se conclut par le
        diplôme ISHES.
      </CourseCadenceNote>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, title: "Tu veux apprendre\nl'arabe littéraire depuis\nle début de manière\nclaire et progressive." },
            { icon: MessageCircle, title: "Tu souhaites pouvoir\ncomprendre et parler\narabe dans des situations\ndu quotidien." },
            { icon: BookOpen, title: "Tu veux comprendre\ndavantage ta religion\nen accédant directement\naux textes." },
            { icon: BarChart3, title: "Tu cherches une méthode\nadaptée aux francophones\npour apprendre efficacement\net avec sérénité." }
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
               src="/images/formations/arabe-distance-2.png" 
               alt="Manuels de langue arabe pour adultes — Institut ISHES"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-8">
            {[
              { 
                title: "Une méthode progressive et adaptée aux francophones", 
                desc: "De l'alphabet à la conversation, chaque étape est pensée pour te faire avancer avec confiance." 
              },
              { 
                title: "Des cours interactifs et pratiques", 
                desc: "Apprends à lire, comprendre, écrire et parler à travers des exercices concrets et des mises en situation." 
              },
              { 
                title: "Une équipe pédagogique bienveillante", 
                desc: "Des enseignants expérimentés à ton écoute pour t'accompagner et répondre à toutes tes questions." 
              },
              { 
                title: "Replays et suivi personnalisé", 
                desc: "Révise à ton rythme grâce aux replays et bénéficie d'un suivi pédagogique tout au long de ta formation." 
              },
              { 
                title: "Une connexion plus profonde à ta religion", 
                desc: "Comprends directement le Coran, les invocations et les enseignements islamiques sans intermédiaire." 
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
              <h3 className="font-black text-ishes-blue text-lg mb-4 leading-tight uppercase tracking-wide">TOUS LES SUPPORTS NUMÉRIQUES</h3>
              <ul className="text-sm font-medium text-ishes-dark leading-relaxed space-y-2">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Manuel pédagogique complet (PDF)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Supports de cours et exercices</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Enregistrements audio et vidéos</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Accès aux replays pendant toute la formation</li>
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
                Nous t'accompagnons à chaque étape pour t'offrir une expérience d'apprentissage complète, fluide et motivante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ Arabe adulte"
        title="Questions fréquentes sur le cours d’arabe pour adultes en ligne"
        intro="Apprendre l’arabe littéraire à l’âge adulte, de l’alphabet à la compréhension du Coran : horaires, durée, tarif et méthode."
        items={ARABE_ADULTE_FAQS}
      />

      {/* ─── PRICING BANNER ─── */}
      <section className="py-8 px-6 max-w-[80rem] mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-6 md:p-8 shadow-2xl text-white relative overflow-hidden flex flex-wrap md:flex-nowrap items-center gap-6 justify-between">

          <div className="flex items-center gap-4 border-r border-white/20 pr-8 md:pr-16">
            <Tag className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-300">Tarif</p>
              <h3 className="text-3xl md:text-4xl font-black text-ishes-gold mt-0.5">649 €</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 pl-4 md:pl-0">
            <CreditCard className="w-10 h-10 text-ishes-gold shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-300">Paiement facilité</p>
              <h3 className="text-lg font-black text-white mt-0.5 leading-snug">5 x 129,80 € sans frais</h3>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <Link 
              href="/inscription?plan=arabe_adulte&audience=adulte" 
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
