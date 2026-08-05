import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Monitor, 
  Award, 
  Hourglass,
  Presentation,
  BookOpen,
  Shield,
  Heart,
  CheckCircle2,
  Gift,
  Lock,
  ArrowRight,
  PlayCircle,
  GraduationCap,
  BrainCircuit,
  CreditCard,
  Check
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Formation Enseignant de Tajwid | ISHES",
  description: "Apprendre à enseigner le Tajwid avec une méthode éprouvée et devenir un véritable pédagogue.",
  keywords: "enseigner tajwid, professeur coran, formation enseignant tajwid, ishes"
};

export default function FormationEnseignantTajwidPage() {
  const course = PROGRAMS_DATA["formation_enseignante_tajwid"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-ishes-gold" />
              <span className="text-ishes-dark font-black text-xs tracking-[0.15em] uppercase">
                PROFESSIONNALISATION
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Formation <br />
              Enseignant <br />
              de Tajwid
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Apprendre à enseigner le Tajwid avec une méthode éprouvée et devenir un véritable pédagogue.
            </p>
            <div className="w-12 h-0.5 bg-transparent my-4"></div>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/inscription?plan=formation_enseignante_tajwid&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-dark hover:bg-ishes-dark/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-dark/20 hover:-translate-y-1"
              >
                Je m'inscris maintenant <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold/10 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
              >
                <PlayCircle className="w-5 h-5" /> Voir le teaser
              </button>
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
                  src="/images/formations/enseignant-tajwid-1.jpg" 
                  alt="Formation Enseignant de Tajwid"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>

        {/* ─── INFO BAR ─── */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-ishes-gold" />
            <span className="text-sm font-bold text-gray-700 leading-tight">Octobre 2026</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">2 cours / semaine<br/><span className="text-gray-500 font-medium">Lundi & Jeudi - 19h30</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">En direct<br/><span className="text-gray-500 font-medium">Zoom + Replays</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Certification<br/><span className="text-gray-500 font-medium">Formation Enseignant ISHES</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Hourglass className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Durée<br/><span className="text-gray-500 font-medium">4 à 5 mois</span></span>
          </div>
        </div>
      </section>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Presentation, title: "Tu souhaites enseigner\nle Tajwid avec une\nméthode pédagogique\néprouvée." },
            { icon: BookOpen, title: "Tu maîtrises déjà la\nrécitation mais tu ne\nsais pas encore comment\ntransmettre efficacement\nton savoir." },
            { icon: Shield, title: "Tu veux obtenir une\nvéritable légitimité pour\nenseigner dans une mosquée,\nune association ou une école." },
            { icon: Heart, title: "Tu recherches un\naccompagnement sérieux\npour devenir un enseignant\ncompétent, bienveillant\net structuré." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-10 h-10 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-ishes-dark whitespace-pre-line leading-relaxed">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LES 3 MODULES ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Les 3 modules de la formation</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Module 1 */}
          <div className="bg-[#fcfbf9] rounded-2xl p-8 border border-[#e8dccb] shadow-sm hover:shadow-md transition-shadow relative group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-[#e8dccb] rounded-full flex items-center justify-center text-ishes-dark font-black text-lg">
                1
              </div>
              <BookOpen className="w-8 h-8 text-ishes-gold opacity-50" />
            </div>
            <h3 className="text-xl font-black text-ishes-dark mb-4 leading-tight">
              Apprendre à enseigner<br/>le Tajwid avec la méthode<br/>Les Clés du Coran
            </h3>
            <p className="text-gray-600 font-medium text-sm leading-relaxed mt-auto">
              Maîtrisez la méthode pédagogique pas à pas pour transmettre les règles du Tajwid avec clarté et impact.
            </p>
          </div>

          {/* Module 2 */}
          <div className="bg-[#fcfbf9] rounded-2xl p-8 border border-[#e8dccb] shadow-sm hover:shadow-md transition-shadow relative group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-[#e8dccb] rounded-full flex items-center justify-center text-ishes-dark font-black text-lg">
                2
              </div>
              <BrainCircuit className="w-8 h-8 text-ishes-gold opacity-50" />
            </div>
            <h3 className="text-xl font-black text-ishes-dark mb-4 leading-tight">
              Les méthodologies<br/>d'apprendre à apprendre
            </h3>
            <p className="text-gray-600 font-medium text-sm leading-relaxed mt-auto">
              Découvrez comment aider vos élèves à progresser efficacement, à mémoriser durablement et à développer de bonnes habitudes d'apprentissage.
            </p>
          </div>

          {/* Module 3 */}
          <div className="bg-[#fcfbf9] rounded-2xl p-8 border border-[#e8dccb] shadow-sm hover:shadow-md transition-shadow relative group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-[#e8dccb] rounded-full flex items-center justify-center text-ishes-dark font-black text-lg">
                3
              </div>
              <Check className="w-8 h-8 text-ishes-gold opacity-50" />
            </div>
            <h3 className="text-xl font-black text-ishes-dark mb-4 leading-tight">
              Vérification de votre<br/>niveau de Tajwid
            </h3>
            <p className="text-gray-600 font-medium text-sm leading-relaxed mt-auto">
              Évaluez et perfectionnez votre propre récitation pour enseigner avec justesse et transmettre en toute confiance.
            </p>
          </div>

        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Pourquoi cette formation va tout changer ?</h2>
        </div>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-100">
             <Image 
               src="/images/formations/enseignant-tajwid-2.png" 
               alt="Les clés du Coran et appel Zoom"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-6">
            {[
              "Enseigner demande une méthode, pas seulement des connaissances.",
              "Vous apprendrez à construire une progression pédagogique claire et efficace.",
              "Vous saurez expliquer chaque règle simplement selon le niveau de vos élèves.",
              "Vous découvrirez comment corriger sans décourager ni mettre l'élève en difficulté.",
              "Vous serez accompagné par des formateurs ayant plus de quinze ans d'expérience.",
              "À l'issue de la formation, vous repartirez avec une méthode directement applicable dans vos cours."
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-7 h-7 text-ishes-gold shrink-0 mt-0.5" />
                <p className="text-[16px] font-bold text-ishes-dark leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING BANNER ─── */}
      <section className="py-8 px-6 max-w-[80rem] mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-6 md:p-10 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
          
          <div className="flex items-center gap-6">
            <Gift className="w-12 h-12 text-ishes-gold shrink-0" />
            <div>
              <h3 className="text-2xl font-black text-white leading-tight">Formation complète</h3>
              <p className="text-sm font-medium text-gray-300 mt-1">3 modules — Octobre 2026</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 w-full md:w-auto">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-ishes-gold">Sur Devis</h3>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payable jusqu'à 10x</p>
                <p className="text-sm font-black text-white">sans frais</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
              <Link 
                href="/inscription?plan=formation_enseignante_tajwid&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-[#b88c4d] hover:bg-[#a67b3f] text-white px-8 py-4 rounded-md text-[14px] font-black transition-all shadow-lg hover:-translate-y-1 w-full md:w-auto"
              >
                JE M'INSCRIS MAINTENANT <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                <Lock className="w-3 h-3 text-ishes-gold" />
                Paiement 100% sécurisé
              </div>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
