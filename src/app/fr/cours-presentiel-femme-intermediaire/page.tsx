import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Calendar, Hourglass, UserRound, Award,
  BookOpen, MessageSquare, Sparkles, CheckCircle2,
  Lock, Book, BookA, Pen, Edit, MonitorPlay, MessageCircle, FileText,
  Heart, Star, ArrowRight, Tag, CreditCard, BookMarked, TrendingUp,
  Search
} from 'lucide-react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArabicBackground } from "@/components/ArabicBackground";

export const metadata: Metadata = {
  title: "Cours Présentiel Femme Intermédiaire | Arabe & Tajwid | ISHES",
  description: "Formation en présentiel pour femmes de niveau intermédiaire combinant l'arabe littéraire et le Tajwid à Toulouse. Cursus académique et spirituel 100% femme.",
  keywords: "cours arabe femme intermediaire, cours tajwid femme toulouse, perfectionnement arabe femme, ishes"
};

export default function CoursPresentielFemmeIntermediairePage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#C69C6D] selection:text-white pb-32">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#fcfaf8] pt-28 pb-6 relative border-b border-gray-100">
        <ArabicBackground />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#C69C6D] bg-[#C69C6D]/10 px-4 py-2 rounded-full uppercase tracking-widest mb-8 border border-[#C69C6D]/20">
              <MapPin className="w-4 h-4" />
              PRÉSENTIEL TOULOUSE • 100% FEMME
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black text-ishes-blue leading-[1.1] tracking-tight mb-4 flex items-center gap-4">
              <span>🧕 Arabe & Tajwid</span>
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif text-ishes-blue mb-8">
              — Femme Intermédiaire
            </h2>
            <p className="text-xl font-bold text-gray-600 mb-10 leading-relaxed max-w-lg">
              Perfectionner son arabe littéraire et approfondir sa récitation du Coran de manière fluide.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/inscription?plan=femme-intermediaire-presentiel&audience=adulte" 
                className="w-full sm:w-auto bg-[#C69C6D] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#b0885c] transition-all shadow-xl shadow-[#C69C6D]/20 hover:-translate-y-1"
              >
                S'inscrire maintenant <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#programme" 
                className="w-full sm:w-auto bg-white text-[#0a192f] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 transition-all hover:-translate-y-1 shadow-sm"
              >
                Voir le programme <BookOpen className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[500px] border-4 border-white">
            <Image src="/images/formations/presentiel-femme-interlediare-1.png" alt="Femme Intermédiaire ISHES" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#0a192f]/10" />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer pointer-events-auto group">
                <div className="w-0 h-0 border-y-[14px] border-y-transparent border-l-[22px] border-l-[#0a192f] ml-2 group-hover:border-l-[#C69C6D] transition-colors"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h3 className="text-sm font-black text-ishes-blue uppercase tracking-[0.2em] mb-12 relative inline-block">
          DÉROULEMENT PRATIQUE DE LA FORMATION
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#C69C6D] rounded-full"></div>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
          <div className="flex flex-col items-center lg:border-r border-gray-100 last:border-0">
            <MapPin className="w-10 h-10 text-[#0a192f] mb-4" strokeWidth={1.5} />
            <span className="font-bold text-[#0a192f] text-sm md:text-base leading-snug text-center">Présentiel<br />à Toulouse</span>
          </div>
          <div className="flex flex-col items-center lg:border-r border-gray-100 last:border-0">
            <Calendar className="w-10 h-10 text-[#0a192f] mb-4" strokeWidth={1.5} />
            <span className="font-bold text-[#0a192f] text-sm md:text-base leading-snug text-center">Tous les samedis<br />de 9h00 à 12h00</span>
          </div>
          <div className="flex flex-col items-center lg:border-r border-gray-100 last:border-0">
            <Hourglass className="w-10 h-10 text-[#0a192f] mb-4" strokeWidth={1.5} />
            <span className="font-bold text-[#0a192f] text-sm md:text-base leading-snug text-center">Durée :<br />9 mois</span>
          </div>
          <div className="flex flex-col items-center lg:border-r border-gray-100 last:border-0">
            <UserRound className="w-10 h-10 text-[#0a192f] mb-4" strokeWidth={1.5} />
            <span className="font-bold text-[#0a192f] text-sm md:text-base leading-snug text-center">Réservé<br />aux femmes</span>
          </div>
          <div className="flex flex-col items-center lg:border-r border-gray-100 last:border-0">
            <BookMarked className="w-10 h-10 text-[#0a192f] mb-4" strokeWidth={1.5} />
            <span className="font-bold text-[#0a192f] text-sm md:text-base leading-snug text-center">Supports pédagogiques<br />certifiés</span>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-10 h-10 text-[#0a192f] mb-4" strokeWidth={1.5} />
            <span className="font-bold text-[#0a192f] text-sm md:text-base leading-snug text-center">Diplôme de réussite<br />en fin de formation</span>
          </div>
        </div>
      </div>

      {/* Pour Qui Section */}
      <div className="bg-[#fcfaf8] py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-sm font-black text-center text-ishes-blue uppercase tracking-[0.2em] mb-16 relative inline-block left-1/2 -translate-x-1/2">
            CE COURS EST FAIT POUR TOI SI...
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#C69C6D] rounded-full"></div>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: "/images/ai_femmes.png", icon: <Heart className="w-6 h-6" />, title: "Tu veux approfondir ton lien avec ALLAH", text: "et vivre une connexion plus profonde à travers la compréhension du Coran et Sa parole." },
              { img: "/images/ai_arabe.png", icon: <BookOpen className="w-6 h-6" />, title: "Tu souhaites maîtriser la langue arabe", text: "pour comprendre les textes islamiques et t'exprimer avec justesse et confiance." },
              { img: "/images/ai_quran.png", icon: <Star className="w-6 h-6" />, title: "Tu veux perfectionner ta récitation", text: "en appliquant les règles avancées du Tajwid avec fluidité et assurance." },
              { img: "/images/ai_spirit.png", icon: <Sparkles className="w-6 h-6" />, title: "Tu veux investir en toi", text: "dans une formation sérieuse et structurée qui élève ta spiritualité et ton savoir au quotidien." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 relative border-b border-gray-100">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                  <div className="absolute -bottom-7 left-6 w-14 h-14 bg-[#0a192f] rounded-2xl rotate-3 flex items-center justify-center text-[#C69C6D] border-4 border-white shadow-lg">
                    <div className="-rotate-3">{item.icon}</div>
                  </div>
                </div>
                <div className="p-8 pt-12 flex-1 flex flex-col">
                  <h4 className="font-black text-ishes-blue text-lg mb-3 leading-snug">{item.title}</h4>
                  <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progression Section */}
      <div id="programme" className="max-w-6xl mx-auto px-6 py-24">
        <h3 className="text-sm font-black text-center text-ishes-blue uppercase tracking-[0.2em] mb-20 relative inline-block left-1/2 -translate-x-1/2">
          UNE PROGRESSION SIMPLE ET RASSURANTE
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#C69C6D] rounded-full"></div>
        </h3>
        <div className="relative">
          {/* Line connecting steps */}
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-[#C69C6D]/20 hidden lg:block"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {[
              { num: "1", title: "Étape 1", desc: "Consolidation de la récitation et correction individuelle du Tajwid. Revue des règles essentielles.", icon: <TrendingUp className="w-7 h-7 text-[#C69C6D]" /> },
              { num: "2", title: "Étape 2", desc: "Introduction aux bases de la grammaire arabe (Nahw) appliquées au Coran.", icon: <span className="text-2xl font-black text-[#C69C6D] leading-none">خ</span> },
              { num: "3", title: "Étape 3", desc: "Analyse linguistique et traduction guidée de sourates sélectionnées.", icon: <div className="relative"><BookOpen className="w-7 h-7 text-[#C69C6D]"/><Search className="w-4 h-4 text-[#0a192f] absolute -bottom-1 -right-1"/></div> },
              { num: "4", title: "Étape 4", desc: "Récitation fluide avec mise en pratique des règles de grammaire et de sens.", icon: <BookOpen className="w-7 h-7 text-[#C69C6D]" /> }
            ].map((step, i) => (
              <div key={i} className="flex flex-col relative group">
                <div className="w-10 h-10 bg-[#C69C6D] text-white rounded-full flex items-center justify-center font-black text-lg mb-6 relative z-10 mx-auto shadow-lg shadow-[#C69C6D]/30 group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-[#C69C6D]/10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex-1 text-center flex flex-col items-center gap-5 hover:shadow-xl hover:border-[#C69C6D]/30 transition-all">
                  <div className="w-16 h-16 bg-[#fcfaf8] rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-ishes-blue text-lg mb-3">{step.title}</h4>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pourquoi Ce Programme Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-[2rem] overflow-hidden h-[400px] lg:h-[600px] shadow-2xl border-8 border-[#fcfaf8]">
            <Image src="/images/formations/femme-presentiel-inter-2.jpg" alt="Pourquoi ce programme" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/40 to-transparent" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[#C69C6D] font-black text-xs tracking-[0.2em] uppercase mb-4">POURQUOI CE PROGRAMME ?</span>
            <h3 className="text-4xl md:text-5xl font-black text-ishes-blue mb-8 leading-tight">Un cursus complet<br />et différent</h3>
            
            <div className="space-y-5 text-gray-600 font-medium mb-10 text-lg">
              <p>Ce programme unique relie la grammaire et la récitation pour te permettre de comprendre le Coran, pas seulement le lire.</p>
              <p>À l'institut ISHES, tu progresses dans les deux en même temps grâce à une pédagogie conçue spécialement pour les francophones.</p>
            </div>
            
            <div className="bg-[#fdfbf9] border-l-4 border-[#C69C6D] p-6 rounded-r-2xl shadow-sm flex items-start gap-4 mb-12">
              <Sparkles className="w-6 h-6 text-[#C69C6D] shrink-0 mt-0.5" />
              <p className="text-[#0a192f] font-black text-lg leading-snug">
                Un seul cursus. Une seule progression. Deux compétences essentielles.
              </p>
            </div>

            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">NOTRE APPROCHE</h4>
            <div className="space-y-8">
              {[
                { title: "Méthode progressive et éprouvée", text: "Un parcours étape par étape pour des bases solides et durables." },
                { title: "Pédagogie active et bienveillante", text: "Récits, échanges, jeux éducatifs et mises en scène." },
                { title: "Suivi et corrections personnalisées", text: "Chaque élève reçoit un accompagnement adapté." },
                { title: "Un cadre 100% féminin", text: "Un environnement serein, motivant et propice à l'apprentissage." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-6 h-6 rounded-full bg-[#C69C6D]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C69C6D]" />
                  </div>
                  <div>
                    <h5 className="font-black text-ishes-blue text-base mb-1.5">{item.title}</h5>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inclus Section */}
      <div className="bg-[#fcfaf8] py-24 border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-sm font-black text-center text-ishes-blue uppercase tracking-[0.2em] mb-16 relative inline-block left-1/2 -translate-x-1/2">
            CE QUI EST INCLUS
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#C69C6D] rounded-full"></div>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-12 gap-x-6 text-center">
            {[
              { icon: <MonitorPlay className="w-8 h-8" strokeWidth={1.5} />, text: "Cours en présentiel" },
              { icon: <Edit className="w-8 h-8" strokeWidth={1.5} />, text: "Exercices et activités" },
              { icon: <FileText className="w-8 h-8" strokeWidth={1.5} />, text: "Évaluations régulières" },
              { icon: <MessageSquare className="w-8 h-8" strokeWidth={1.5} />, text: "Corrections individuelles" },
              { icon: <UserRound className="w-8 h-8" strokeWidth={1.5} />, text: "Suivi pédagogique personnalisé" },
              { icon: <MessageCircle className="w-8 h-8" strokeWidth={1.5} />, text: "Groupe WhatsApp privé par classe" },
              { icon: <Award className="w-8 h-8" strokeWidth={1.5} />, text: "Diplôme de réussite" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#C69C6D] shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-[#0a192f] leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Sticky Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a192f] text-white z-50 py-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#C69C6D]/20 rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-[#C69C6D]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tarif</span>
              <span className="text-2xl lg:text-3xl font-black text-[#C69C6D]">649 €</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10"></div>
            <div className="hidden md:flex items-center gap-4">
              <div className="w-10 h-10 bg-[#C69C6D]/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#C69C6D]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Paiement facilité</span>
                <span className="text-sm lg:text-base font-bold text-white">5 x 79,80 € sans frais</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
            <Link 
              href="/inscription?plan=femme-intermediaire-presentiel&audience=adulte" 
              className="w-full md:w-auto bg-[#C69C6D] text-white px-8 lg:px-12 py-3.5 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-[#b0885c] transition-all uppercase tracking-widest text-sm shadow-lg shadow-[#C69C6D]/20 hover:scale-[1.02]"
            >
              JE M'INSCRIS MAINTENANT <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 mt-2.5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">
              <Lock className="w-3 h-3" /> Paiement 100% sécurisé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
