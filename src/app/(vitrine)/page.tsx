export const dynamic = 'force-static';

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { HeroSection } from "@/components/vitrine/HeroSection";
import { StatsSection } from "@/components/vitrine/StatsSection";
import { SocialSection } from "@/components/vitrine/SocialSection";
import { ArabicBackground } from "@/components/ArabicBackground";
import { DynamicTestimonials } from "@/components/vitrine/DynamicTestimonials";
import { InstitutVideo } from "@/components/vitrine/InstitutVideo";
import { NewHomeSections } from "@/components/vitrine/NewHomeSections";
import { NewsletterSection } from "@/components/vitrine/NewsletterSection";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";

function CursusCardArt({
  src,
  alt,
  tone,
}: {
  src: string;
  alt: string;
  tone: "blue" | "green" | "gold" | "violet";
}) {
  const wash = {
    blue: "from-[#1e3a5f]/35 via-transparent to-[#0f2924]/40",
    green: "from-[#0f2924]/30 via-transparent to-[#1a3d32]/40",
    gold: "from-[#c8a063]/25 via-transparent to-[#8a6a32]/35",
    violet: "from-[#3d2a4d]/30 via-transparent to-[#1e1530]/40",
  }[tone];

  return (
    <div className="w-full h-28 rounded-xl mb-3 relative overflow-hidden bg-[#0f2924]">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${wash}`} />
      <svg
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id={`star-${tone}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path
              d="M14 2 L16.5 9.5 L24 10 L18 15 L20 23 L14 18.5 L8 23 L10 15 L4 10 L11.5 9.5 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
            />
            <circle cx="14" cy="14" r="2.2" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="100" fill={`url(#star-${tone})`} />
      </svg>
      <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

const HOME_FAQS = [
  {
    question: "Que signifie ISHES et qu’enseigne l’Institut ISHES ?",
    answer:
      "ISHES signifie Institut des Sciences Humaines et Spirituelles. L’Institut ISHES enseigne la langue arabe aux adultes et aux enfants, la lecture du Coran et le Tajwid, le Fiqh mâlikite (adorations selon l’école de l’imam Mâlik) et la Tarbiya islamique (éducation spirituelle). Il forme aussi des enseignants de Tajwid et de Tarbiya Islamiyya. Les cours existent en présentiel à Toulouse et à distance, en direct sur Zoom avec replays.",
  },
  {
    question: "Comment apprendre l’islam en ligne en français avec un vrai enseignant ?",
    answer:
      "À l’Institut ISHES, apprendre l’islam en ligne se fait en français, en direct sur Zoom, avec un enseignant qui corrige et répond aux questions. Chaque séance est enregistrée : le replay vidéo est disponible dès la fin du cours. Un groupe WhatsApp de classe permet de poser ses questions entre deux séances et de recevoir les annonces. Ce n’est pas une bibliothèque de vidéos, c’est un cursus suivi.",
  },
  {
    question: "Quels critères pour choisir un institut de sciences religieuses en ligne ?",
    answer:
      "Un institut de sciences religieuses en ligne fiable se reconnaît à des enseignants identifiés, un programme structuré (arabe, Coran, Fiqh, Tarbiya), des cours en direct avec replays et un suivi réel. L’Institut ISHES réunit ces critères et ajoute un ancrage physique à Toulouse, un groupe WhatsApp par classe et le Pack Accompagnement avec lives et communauté, pour ne pas apprendre seul devant un écran.",
  },
  {
    question: "L’Institut ISHES est-il uniquement à Toulouse ?",
    answer:
      "Non. L’Institut ISHES est implanté à Toulouse pour les cours en présentiel, mais la majorité des formations se suivent à distance, partout en francophonie. Arabe, Tajwid, Fiqh mâlikite et Tarbiya islamique sont proposés en ligne, en direct sur Zoom, avec replays et suivi pédagogique. Vous pouvez donc étudier avec ISHES depuis n’importe quelle ville de France ou de l’étranger.",
  },
  {
    question: "Comment se déroulent les cours en direct de l’Institut ISHES ?",
    answer:
      "Les cours à distance de l’Institut ISHES ont lieu en direct sur Zoom, avec l’enseignant et le groupe. Si vous manquez une séance, le replay vidéo est disponible dès la fin du cours. Le suivi pédagogique continue dans le groupe WhatsApp de la classe : questions, annonces, échanges entre camarades. Des supports pédagogiques, comme Les Clés du Coran pour le Tajwid, accompagnent la progression.",
  },
  {
    question: "Peut-on ajouter le Pack Accompagnement à n’importe quelle formation ISHES ?",
    answer:
      "Oui. Le Pack Accompagnement est proposé pour tout achat d’une formation de l’Institut ISHES, au tarif de 49 € (valeur annoncée de 399 €). Il donne accès à la communauté privée, aux lives exclusifs et à un suivi spirituel personnalisé, afin de ne pas cheminer seul. Les détails complets sont présentés sur la page dédiée au Pack Accompagnement.",
  },
  {
    question: "Les cours de l’Institut ISHES sont-ils pour les adultes ou pour les enfants ?",
    answer:
      "Les deux. L’Institut ISHES propose des cours d’arabe et de Coran pour les enfants, en présentiel à Toulouse et à distance, avec une pédagogie adaptée à leur âge. Les adultes disposent de cursus complets : langue arabe, lecture et Tajwid, Fiqh mâlikite, Tarbiya islamique et formations d’enseignants. Les familles peuvent ainsi inscrire parents et enfants dans le même institut.",
  },
  {
    question: "Faut-il savoir lire l’arabe pour commencer à l’Institut ISHES ?",
    answer:
      "Non. Plusieurs parcours de l’Institut ISHES partent de zéro : le cours de langue arabe pour adultes débute par la lecture et l’écriture, et la formation de lecture et Tajwid progresse étape par étape jusqu’à l’application des règles dans le Moushaf. Les cours de Fiqh mâlikite et de Tarbiya islamique sont donnés en français. Un entretien gratuit permet de choisir le bon point de départ.",
  },
  {
    question: "Quelle différence entre le Fiqh mâlikite et la Tarbiya islamique enseignés à l’ISHES ?",
    answer:
      "Le Fiqh mâlikite étudie les règles des adorations selon l’école de l’imam Mâlik : purification, prière, zakat, jeûne et pèlerinage, à partir d’Al-Murshid al-Mu’în d’Ibn Âchir. La Tarbiya islamique porte sur l’éducation spirituelle : purification de l’âme (Tazkiyat an-Nafs) et bon comportement. Le premier répond à « comment pratiquer », le second à « comment cheminer ». Les deux cursus sont proposés en ligne par l’Institut ISHES.",
  },
  {
    question: "Que trouve-t-on sur la chaîne YouTube de l’Institut ISHES ?",
    answer:
      "La chaîne YouTube de l’Institut ISHES publie régulièrement des rappels spirituels (Tarbiya), des explications simplifiées de jurisprudence (Fiqh) et des conseils pour la lecture du Coran (Tajwid). C’est un contenu islamique gratuit, pensé pour accompagner le quotidien entre deux cours. Il complète les formations en direct sans les remplacer.",
  },
];

export const metadata = buildPageMetadata({
  title: "Institut ISHES — Sciences religieuses en ligne, Arabe & Tajwid",
  description:
    "Institut de sciences religieuses en ligne et à Toulouse : arabe, Tajwid, Fiqh mâlikite. Parmi les instituts de science religieuse en français, ISHES propose enseignants, direct, replays et Pack Accompagnement.",
  path: "/",
  keywords: [
    "institut ishes",
    "meilleurs instituts de science religieuse en ligne",
    "institut de sciences religieuses en ligne",
    "sciences religieuses en ligne",
    "cours arabe toulouse",
    "cours tajwid",
    "fiqh malikite",
    "cours fiqh malikite",
    "sciences islamiques toulouse",
    "apprendre le coran en ligne",
    "apprendre la religion en ligne",
    "institut islamique en ligne",
  ],
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fafafa]">
      <JsonLd data={faqJsonLd(HOME_FAQS)} />
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-0 w-[600px] h-[600px] bg-gray-100/50 blur-[100px] rounded-full" />
      </div>

      {/* ─── HERO SECTION ─── */}
      {/* (HeroSection already has ArabicBackground internally) */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      <NewHomeSections />

      {/* ===== NOS PROGRAMMES PHARES (FLOATING CARDS) ===== */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-br from-ishes-blue to-[#112521] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-full bg-[#152233] rounded-l-full -z-10 translate-x-1/3 blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
          
          <div className="flex-1 space-y-5 z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Nos cursus<br/><span className="text-ishes-gold">d&apos;excellence</span></h2>
            <p className="text-base text-gray-300 font-medium max-w-lg leading-relaxed">
              À l&apos;Institut ISHES, apprenez l&apos;islam en français : <strong className="text-white">cours d&apos;arabe</strong>, <strong className="text-white">Tajwid</strong> et lecture du Coran, <strong className="text-white">Fiqh mâlikite</strong> et <strong className="text-white">Tarbiya islamique</strong>. Formations en ligne (Zoom, replays) et en présentiel à Toulouse, avec un enseignant et un suivi réel.
            </p>
            <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed">
              Chaque programme est progressif : des bases jusqu&apos;à une pratique plus sûre — récitation, adorations selon l&apos;école de l&apos;imam Mâlik, langue du Coran et éducation spirituelle.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href="/fr/cours-fiqh-malikite" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Fiqh Mâlikite
              </Link>
              <Link href="/fr/cours-lecture-tajwid" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Lecture & Tajwid
              </Link>
              <Link href="/fr/formation-tarbya-islamya" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Tarbya Islamya
              </Link>
              <Link href="/fr/cours-arabe-adulte" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Langue Arabe
              </Link>
            </div>
            <div className="pt-2">
              <Link href="/inscription" className="inline-flex items-center gap-2 text-ishes-gold font-bold text-sm hover:underline">
                Voir toutes les modalités d&apos;inscription <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pb-8 sm:pb-0">
             {/* Card 1: Fiqh */}
             <Link href="/fr/cours-fiqh-malikite" className="bg-white rounded-2xl shadow-xl transform -rotate-2 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[0_16px_40px_rgba(198,168,116,0.28)] transition-all duration-300 p-4 flex flex-col group border border-gray-100 z-20">
                <CursusCardArt
                  src="/images/formations/fiqh-distance-1.png"
                  alt="Cours de Fiqh mâlikite — Institut ISHES"
                  tone="blue"
                />
                <h3 className="text-base font-black text-ishes-blue mb-1 group-hover:text-ishes-gold transition-colors">Fiqh Mâlikite</h3>
                <p className="text-xs text-gray-500 font-medium leading-snug">Comprendre les règles de tes adorations (Prière, Zakat, Jeûne...)</p>
                <div className="mt-auto pt-3 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
             </Link>

             {/* Card 2: Tajwid */}
             <Link href="/fr/cours-lecture-tajwid" className="bg-white rounded-2xl shadow-xl transform rotate-2 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_16px_40px_rgba(198,168,116,0.28)] transition-all duration-300 p-4 flex flex-col group border border-gray-100 z-10 sm:translate-y-6">
                <CursusCardArt
                  src="/images/formations/tajwid-standar-1.jpg"
                  alt="Cours de lecture et Tajwid — Institut ISHES"
                  tone="green"
                />
                <h3 className="text-base font-black text-ishes-blue mb-1 group-hover:text-ishes-gold transition-colors">Lecture & Tajwid</h3>
                <p className="text-xs text-gray-500 font-medium leading-snug">Apprendre à lire le Saint Coran avec perfection et éloquence.</p>
                <div className="mt-auto pt-3 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
             </Link>

             {/* Card 3: Tarbya */}
             <Link href="/fr/formation-tarbya-islamya" className="bg-white rounded-2xl shadow-xl transform rotate-1 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_16px_40px_rgba(198,168,116,0.28)] transition-all duration-300 p-4 flex flex-col group border-t-4 border-ishes-gold z-30">
                <CursusCardArt
                  src="/images/formations/tarbya-islamya-distance-1.jpg"
                  alt="Formation Tarbya Islamya — Institut ISHES"
                  tone="gold"
                />
                <h3 className="text-base font-black text-ishes-blue mb-1 group-hover:text-ishes-gold transition-colors">Tarbya Islamya</h3>
                <p className="text-xs text-gray-500 font-medium leading-snug">Éducation spirituelle, purification de l&apos;âme et bon comportement.</p>
                <div className="mt-auto pt-3 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
             </Link>

             {/* Card 4: Langue Arabe */}
             <Link href="/fr/cours-arabe-adulte" className="bg-white rounded-2xl shadow-xl transform -rotate-1 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[0_16px_40px_rgba(198,168,116,0.28)] transition-all duration-300 p-4 flex flex-col group border border-gray-100 z-20 sm:translate-y-6">
                <CursusCardArt
                  src="/images/formations/arabe-ditanvce-1.png"
                  alt="Cours de langue arabe — Institut ISHES"
                  tone="violet"
                />
                <h3 className="text-base font-black text-ishes-blue mb-1 group-hover:text-ishes-gold transition-colors">Langue Arabe</h3>
                <p className="text-xs text-gray-500 font-medium leading-snug">Maîtriser la langue du Coran : lecture, écriture et expression.</p>
                <div className="mt-auto pt-3 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
             </Link>
          </div>

        </div>
      </section>

      {/* ===== ZOOM & WHATSAPP SECTION ===== */}
      <section className="pt-24 pb-8 border-b border-gray-100/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-ishes-blue leading-tight mb-6">
              Un apprentissage <span className="text-ishes-gold ">interactif</span> & un suivi <span className="text-ishes-gold ">continu</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">Où que vous soyez, profitez d'une expérience d'apprentissage immersive et d'une communauté soudée.</p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
            {/* Zoom Card */}
            <div className="flex-1 flex flex-col items-center text-center p-6 sm:p-10 bg-[#f9f5f0] border border-ishes-gold/10 rounded-3xl sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 w-full group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center mb-6 sm:mb-8 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500">
                <img src="/images/Zoom-Logo.png" alt="Cours en direct sur Zoom — Institut ISHES" className="h-10 object-contain" />
              </div>
              <h4 className="text-2xl font-black text-ishes-blue mb-4 tracking-tight">Cours en direct & Replays</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">Suivez nos formations à distance de chez vous. Si vous manquez un cours, le <strong className="text-ishes-blue">replay vidéo</strong> est disponible dès la fin de chaque séance.</p>
            </div>

            {/* WhatsApp Card */}
            <div className="flex-1 flex flex-col items-center text-center p-6 sm:p-10 bg-[#f9f5f0] border border-ishes-gold/10 rounded-3xl sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 w-full group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center mb-6 sm:mb-8 rotate-[3deg] group-hover:rotate-0 transition-transform duration-500">
                <img src="/images/whatsapp-logo.avif" alt="Contacter l'Institut ISHES sur WhatsApp" className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-full" />
              </div>
              <h4 className="text-2xl font-black text-ishes-blue mb-4 tracking-tight">Suivi pédagogique</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">Intégrez le <strong className="text-[#25D366]">groupe WhatsApp de la classe</strong>. Posez vos questions, recevez les annonces et échangez avec vos camarades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PACK ACCOMPAGNEMENT CTA ===== */}
      <section className="py-8 relative overflow-hidden border-b border-gray-100/30">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fef2f2] text-[#ef4444] rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm border border-[#fef2f2]">
            <Gift className="w-3.5 h-3.5" />
            Offre Exceptionnelle
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-ishes-blue leading-tight mb-6">
            Le Pack <span className="text-ishes-gold ">Accompagnement</span>
          </h2>

          <div className="bg-[#f9f5f0]/80 border border-ishes-gold/20 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto mb-10 shadow-sm backdrop-blur-sm">
            <p className="text-ishes-dark font-black text-lg md:text-xl mb-3">
              🎉 <span className="text-ishes-blue">POUR SEULEMENT 49€</span> (Valeur de 399€) pour tout achat d'une de nos formations !
            </p>
            <p className="text-gray-500 font-medium text-[15px] md:text-[16px] leading-relaxed">
              Ne cheminez plus seul vers ALLAH. En rejoignant ISHES, vous débloquez immédiatement un accès à notre communauté privée, nos lives exclusifs et notre suivi spirituel personnalisé.
            </p>
          </div>

          <Link
            href="/fr/pack-accompagnement"
            className="inline-flex items-center gap-3 bg-ishes-gold text-white px-10 py-4 rounded-full text-[15px] font-black uppercase tracking-widest transition-all shadow-sm hover:-translate-y-1 hover:shadow-xl hover:brightness-95 active:scale-95 group"
          >
            Découvrir le Pack
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>


      {/* ===== YOUTUBE SHORTS & SEO SECTION ===== */}
      <section className="py-24 bg-[#0a192f] text-white relative overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-ishes-gold/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Rejoignez notre chaîne <span className="text-red-500">YouTube</span>
            </h2>
            <div className="space-y-4 text-gray-300 font-medium text-[15px] leading-relaxed">
              <p>
                L'apprentissage continue au-delà des salles de classe. Sur notre chaîne YouTube, nous partageons régulièrement des rappels spirituels (Tarbiya), des explications simplifiées de jurisprudence (Fiqh) et des conseils pour la lecture du Coran (Tajwid).
              </p>
              <p>
                Abonnez-vous pour profiter d'un <strong>contenu islamique gratuit, authentique et de haute qualité</strong>, pensé pour vous accompagner au quotidien dans votre foi et votre pratique religieuse.
              </p>
            </div>
            <a 
              href="https://www.youtube.com/@ishes_toulouse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-[15px] font-black transition-all shadow-lg shadow-red-600/30 hover:-translate-y-1 mt-4"
            >
              DÉCOUVRIR NOS VIDÉOS <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="flex-1 w-full grid grid-cols-3 gap-4 sm:gap-6">
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <iframe 
                src="https://www.youtube.com/embed/OSl6Xx3yrBk?autoplay=1&mute=1&loop=1&playlist=OSl6Xx3yrBk&controls=0&showinfo=0" 
                className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                allow="autoplay; encrypted-media" 
                frameBorder="0"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform translate-y-8 hover:translate-y-4 hover:scale-105 transition-all duration-300 z-10">
              <iframe 
                src="https://www.youtube.com/embed/IhbjCvavh4M?autoplay=1&mute=1&loop=1&playlist=IhbjCvavh4M&controls=0&showinfo=0" 
                className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                allow="autoplay; encrypted-media" 
                frameBorder="0"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <iframe 
                src="https://www.youtube.com/embed/m_0P8XGmBG0?autoplay=1&mute=1&loop=1&playlist=m_0P8XGmBG0&controls=0&showinfo=0" 
                className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                allow="autoplay; encrypted-media" 
                frameBorder="0"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== TÉMOIGNAGES SECTION ===== */}
      <DynamicTestimonials />

      {/* ===== SEO TEXT BLOCK (visible) ===== */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-8 text-center">
            ISHES : Votre institut de langue arabe et de sciences islamiques
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-gray-600 text-[15px] leading-relaxed text-justify">
            <div className="space-y-4">
              <p>
                L&apos;<strong>Institut des Sciences Humaines et Spirituelles (ISHES)</strong> est une référence pour approfondir la religion musulmane. Que vous cherchiez des <strong>cours d&apos;arabe à Toulouse</strong> ou que vous préfériez <strong>apprendre l&apos;arabe en ligne</strong>, notre institut propose une pédagogie adaptée aux adultes comme aux enfants, pour maîtriser la langue du Coran avec fluidité.
              </p>
              <p>
                Plongez au cœur des sciences islamiques avec nos cursus spécialisés. Nous enseignons le <strong>Fiqh Mâlikite</strong> (jurisprudence selon l&apos;école de l&apos;Imam Malik), basé sur des textes de référence comme <em>Al-Murshid al-Mu&apos;in</em> de l&apos;Imam Ibn &apos;Ashir : purification, prière, Zakat, jeûne et pèlerinage.
              </p>
            </div>
            
            <div className="space-y-4">
              <p>
                Pour perfectionner la récitation, notre <strong>formation de lecture et Tajwid</strong> offre un suivi pour lire le Coran avec justesse. L&apos;ISHES propose aussi une formation des enseignants en <strong>Tarbiya Islamiyya</strong> et en Tajwid.
              </p>
              <p>
                Notre mission dépasse la théorie : spiritualité, purification de l&apos;âme (Tazkiyat an-Nafs), communauté bienveillante, cours en direct, supports pédagogiques et replays. Découvrez nos <strong>cours de sciences islamiques à distance ou en présentiel</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER (compacte, avant la FAQ) ===== */}
      <NewsletterSection />

      <VitrineFaq
        eyebrow="FAQ"
        title="Questions fréquentes sur l'Institut ISHES"
        intro="Apprendre l’islam en ligne en français ou à Toulouse : ce qu’il faut savoir sur l’institut, ses cours et son accompagnement."
        items={HOME_FAQS}
      />

      {/* ===== RÉSEAUX SOCIAUX SECTION ===== */}
      <SocialSection />

    </div>
  );
}
