export const dynamic = 'force-static';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Users, Sparkles, BookHeart, Gift, BookOpen, Video } from "lucide-react";
import { HeroSection } from "@/components/vitrine/HeroSection";
import { StatsSection } from "@/components/vitrine/StatsSection";
import { SocialSection } from "@/components/vitrine/SocialSection";
import { ArabicBackground } from "@/components/ArabicBackground";
import { DynamicTestimonials } from "@/components/vitrine/DynamicTestimonials";
import { InstitutVideo } from "@/components/vitrine/InstitutVideo";
import { NewHomeSections } from "@/components/vitrine/NewHomeSections";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { INSTITUT_CONTACT_FAQS } from "@/lib/institut-contact";

const HOME_FAQS = [
  ...INSTITUT_CONTACT_FAQS,
  {
    question: "Quels cours propose l'Institut ISHES ?",
    answer:
      "L'Institut ISHES propose des cours d'arabe (adultes et enfants), de Tajwid et lecture du Coran, de Fiqh mâlikite, d'Aqîda, de Sîrah, de Tarbiya islamique, ainsi que des formations d'enseignants. Les cursus sont disponibles en présentiel à Toulouse et à distance.",
  },
  {
    question: "Où apprendre la religion en ligne avec un vrai institut ?",
    answer:
      "L'Institut ISHES propose d'apprendre l'islam en français, en ligne et à Toulouse : arabe, Tajwid, Fiqh mâlikite et sciences islamiques. Le Pack Accompagnement ajoute une communauté, des lives et un suivi pour ne pas rester seul devant l'écran.",
  },
  {
    question: "Quels sont les meilleurs instituts de science religieuse en ligne ?",
    answer:
      "Les meilleurs instituts de science religieuse en ligne allient enseignants identifiés, programme (arabe, Coran, Fiqh), cours en direct et suivi. ISHES est un institut de sciences religieuses à Toulouse et à distance, avec Pack Accompagnement, lives et communauté — pas une simple plateforme de vidéos.",
  },
  {
    question: "Y a-t-il un cours de Fatiha gratuit avec un professeur ?",
    answer:
      "Oui. L'Institut ISHES propose un cours de Fatiha 100 % gratuit, avec un professeur : correction d'Al-Fatiha et des 3 dernières sourates, en ligne, plus un groupe WhatsApp. Inscription sans frais sur ishes.fr/fr/correction-fatiha.",
  },
  {
    question: "Proposez-vous un cours de Fiqh mâlikite ?",
    answer:
      "Oui. L'Institut ISHES propose un cours de Fiqh mâlikite en ligne, en français, basé sur le Matn Ibn Âchir (Al-Murshid al-Mu'în) : purification, prière, zakat, jeûne et hajj. Formation de 4 mois, en direct avec replays.",
  },
  {
    question: "Les cours à distance sont-ils en direct ?",
    answer:
      "Oui. La plupart des formations à distance se déroulent en direct sur Zoom, avec des replays accessibles. Un suivi pédagogique et des supports (dont Les Clés du Coran pour le Tajwid) accompagnent la progression.",
  },
  {
    question: "Puis-je commencer le Tajwid sans savoir lire l'arabe ?",
    answer:
      "Oui. Le parcours Tajwid Standard est conçu pour les adultes débutants, y compris ceux qui ne savent pas encore lire l'arabe. La méthode progresse étape par étape jusqu'à l'application des règles dans le Moushaf.",
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
      <section className="py-24 px-6 bg-gradient-to-br from-ishes-blue to-[#112521] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-full bg-[#152233] rounded-l-full -z-10 translate-x-1/3 blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="flex-1 space-y-8 z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Nos cursus<br/><span className="text-ishes-gold">d'excellence</span></h2>
            <p className="text-lg text-gray-300 font-medium max-w-lg leading-relaxed">
              Découvrez nos programmes structurés pour vous accompagner dans votre cheminement. Chaque cursus est pensé pour vous offrir les clés fondamentales de votre religion.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/fr/cours-fiqh-malikite" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Fiqh Mâlikite
              </Link>
              <Link href="/fr/cours-lecture-tajwid" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Lecture & Tajwid
              </Link>
              <Link href="/fr/formation-tarbya-islamya" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Tarbya Islamya
              </Link>
              <Link href="/fr/cours-arabe-adulte" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-bold transition-all border border-white/20 hover:border-ishes-gold">
                Langue Arabe
              </Link>
            </div>
            <div className="pt-6">
              <Link href="/inscription" className="inline-flex items-center gap-2 text-ishes-gold font-bold hover:underline">
                Voir toutes les modalités d'inscription <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 pb-16 sm:pb-0">
             {/* Card 1: Fiqh */}
             <Link href="/fr/cours-fiqh-malikite" className="bg-white rounded-2xl shadow-2xl transform -rotate-3 hover:-translate-y-4 hover:-rotate-1 hover:shadow-[0_20px_50px_rgba(198,168,116,0.3)] transition-all duration-300 p-6 flex flex-col group border border-gray-100 z-20">
                <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl mb-6 relative overflow-hidden">
                  <BookHeart className="absolute bottom-[-10px] right-[-10px] w-16 h-16 text-blue-200 opacity-50" />
                </div>
                <h3 className="text-xl font-black text-ishes-blue mb-2 group-hover:text-ishes-gold transition-colors">Fiqh Mâlikite</h3>
                <p className="text-sm text-gray-500 font-medium">Comprendre les règles de tes adorations (Prière, Zakat, Jeûne...)</p>
                <div className="mt-auto pt-6 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
             </Link>

             {/* Card 2: Tajwid */}
             <Link href="/fr/cours-lecture-tajwid" className="bg-white rounded-2xl shadow-2xl transform rotate-3 hover:-translate-y-4 hover:rotate-1 hover:shadow-[0_20px_50px_rgba(198,168,116,0.3)] transition-all duration-300 p-6 flex flex-col group border border-gray-100 z-10 sm:translate-y-12">
                <div className="w-full h-24 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl mb-6 relative overflow-hidden">
                  <Sparkles className="absolute bottom-[-10px] right-[-10px] w-16 h-16 text-green-200 opacity-50" />
                </div>
                <h3 className="text-xl font-black text-ishes-blue mb-2 group-hover:text-ishes-gold transition-colors">Lecture & Tajwid</h3>
                <p className="text-sm text-gray-500 font-medium">Apprendre à lire le Saint Coran avec perfection et éloquence.</p>
                <div className="mt-auto pt-6 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
             </Link>

             {/* Card 3: Tarbya */}
             <Link href="/fr/formation-tarbya-islamya" className="bg-white rounded-2xl shadow-2xl transform rotate-2 hover:-translate-y-4 hover:rotate-0 hover:shadow-[0_20px_50px_rgba(198,168,116,0.3)] transition-all duration-300 p-6 flex flex-col group border-t-4 border-ishes-gold z-30">
                <div className="w-full h-24 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl mb-6 relative overflow-hidden">
                  <ShieldCheck className="absolute bottom-[-10px] right-[-10px] w-16 h-16 text-amber-200 opacity-50" />
                </div>
                <h3 className="text-xl font-black text-ishes-blue mb-2 group-hover:text-ishes-gold transition-colors">Tarbya Islamya</h3>
                <p className="text-sm text-gray-500 font-medium">Éducation spirituelle, purification de l'âme et bon comportement.</p>
                <div className="mt-auto pt-6 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
             </Link>

             {/* Card 4: Langue Arabe */}
             <Link href="/fr/cours-arabe-adulte" className="bg-white rounded-2xl shadow-2xl transform -rotate-2 hover:-translate-y-4 hover:-rotate-1 hover:shadow-[0_20px_50px_rgba(198,168,116,0.3)] transition-all duration-300 p-6 flex flex-col group border border-gray-100 z-20 sm:translate-y-12">
                <div className="w-full h-24 bg-gradient-to-r from-purple-50 to-fuchsia-100 rounded-xl mb-6 relative overflow-hidden">
                  <BookOpen className="absolute bottom-[-10px] right-[-10px] w-16 h-16 text-purple-200 opacity-50" />
                </div>
                <h3 className="text-xl font-black text-ishes-blue mb-2 group-hover:text-ishes-gold transition-colors">Langue Arabe</h3>
                <p className="text-sm text-gray-500 font-medium">Maîtriser la langue du Coran : lecture, écriture et expression.</p>
                <div className="mt-auto pt-6 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-ishes-gold group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight className="w-5 h-5" />
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

      <VitrineFaq
        eyebrow="FAQ"
        title="Questions fréquentes sur l'Institut ISHES"
        items={HOME_FAQS}
      />

      {/* ===== RÉSEAUX SOCIAUX SECTION ===== */}
      <SocialSection />

    </div>
  );
}
