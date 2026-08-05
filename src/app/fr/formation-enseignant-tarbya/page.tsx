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
  BrainCircuit
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Formation Enseignant Tarbya Islamiyya | ISHES",
  description: "Transmettre les valeurs de l'Islam avec pédagogie et former la génération musulmane de demain.",
  keywords: "enseigner islam, professeur education islamique, formation enseignant tarbya, ishes"
};

export default function FormationEnseignantTarbyaPage() {
  const course = PROGRAMS_DATA["formation_enseignante_tarbya"];
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
              Tarbya Islamiyya
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Transmettre les valeurs de l'Islam avec pédagogie et former la génération musulmane de demain.
            </p>
            <div className="w-12 h-0.5 bg-transparent my-4"></div>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/inscription?plan=formation_enseignante_tarbya&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-dark hover:bg-ishes-dark/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-dark/20 hover:-translate-y-1"
              >
                JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
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
                  src="/images/ai_pro.png" 
                  alt="Formation Enseignant Tarbya Islamiyya"
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
            <span className="text-xs font-bold text-ishes-dark leading-tight">2 cours / semaine<br/><span className="text-gray-500 font-medium">Mardi et vendredi</span></span>
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
            <span className="text-xs font-bold text-ishes-dark leading-tight">Certification<br/><span className="text-gray-500 font-medium">Formation Enseignant ISHES</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Tous les supports<br/><span className="text-gray-500 font-medium">inclus</span></span>
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
            { icon: Presentation, title: "Tu souhaites enseigner\nl'éducation islamique\naux enfants avec\nméthode et impact." },
            { icon: BookOpen, title: "Tu maîtrises déjà\ndes connaissances\nreligieuses mais tu ne\nsais pas comment les\ntransmettre." },
            { icon: Shield, title: "Tu veux obtenir une\nvéritable légitimité pour\nenseigner dans une\nmosquée, une association\nou une école." },
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

      {/* ─── LES 2 MODULES ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Les 2 modules de la formation</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Module 1 */}
          <div className="bg-ishes-dark rounded-2xl p-8 md:p-12 shadow-xl flex flex-col sm:flex-row gap-8 relative overflow-hidden group">
            <div className="flex flex-col items-center sm:items-start shrink-0">
              <div className="text-5xl font-black text-white mb-2">01</div>
              <div className="w-10 h-1 bg-ishes-gold"></div>
            </div>
            <div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-ishes-dark">
                <Presentation className="w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-black text-white mb-4 leading-tight">Enseigner l'éducation islamique<br/>(Tarbya Islamiyya)</h3>
              <p className="text-gray-300 font-medium text-sm leading-relaxed">
                Apprends à structurer et animer des cours complets : fondements de la spiritualité, piliers de l'Islam, récits des Prophètes, adorations, éthique, adab et calendrier musulman. Une pédagogie vivante basée sur les histoires et des valeurs concrètes.
              </p>
            </div>
          </div>

          {/* Module 2 */}
          <div className="bg-[#cdad75] rounded-2xl p-8 md:p-12 shadow-xl flex flex-col sm:flex-row gap-8 relative overflow-hidden group">
            <div className="flex flex-col items-center sm:items-start shrink-0">
              <div className="text-5xl font-black text-white mb-2">02</div>
              <div className="w-10 h-1 bg-white"></div>
            </div>
            <div>
              <div className="w-12 h-12 bg-ishes-dark rounded-full flex items-center justify-center mb-6 shadow-md text-white">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-black text-ishes-dark mb-4 leading-tight">Les méthodologies<br/>d'apprendre à apprendre</h3>
              <p className="text-ishes-dark/80 font-medium text-sm leading-relaxed">
                Découvre des approches efficaces pour aider les enfants à mémoriser, comprendre et appliquer ce qu'ils apprennent. Gestion de classe, motivation, activités interactives, gestion des conflits et accompagnement personnalisé.
              </p>
            </div>
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
               src="/images/tajwid_students.png" 
               alt="Livres Tarbya Islamiyya et appel Zoom"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-6">
            {[
              "Une pédagogie claire, structurée et adaptée aux enfants d'aujourd'hui.",
              "Des méthodes concrètes pour transmettre les valeurs avec amour et sagesse.",
              "Des outils prêts à l'emploi pour animer des cours captivants et interactifs.",
              "Un accompagnement par des formateurs expérimentés et bienveillants.",
              "À l'issue de la formation, tu repartiras avec une assurance et une légitimité pour enseigner avec impact."
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-7 h-7 text-ishes-gold shrink-0 mt-0.5" />
                <p className="text-[17px] font-bold text-ishes-dark leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWO BANNERS BLOCK ─── */}
      <section className="py-6 px-6 max-w-7xl mx-auto mb-8">
        <div className="bg-[#f5f6f8] rounded-[2rem] p-8 md:p-12 shadow-sm grid md:grid-cols-2 gap-8 md:gap-16 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-14 h-14 bg-ishes-dark rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7 text-ishes-gold" />
            </div>
            <div>
              <h4 className="font-black text-ishes-dark tracking-widest text-sm uppercase mb-1">FORMATION CLÉ EN MAIN</h4>
              <h3 className="font-bold text-ishes-dark text-xl mb-3 leading-tight">Tous les supports sont inclus</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Cours, manuels, fiches, activités, modèles de leçons et ressources prêtes à utiliser.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start relative">
            {/* Divider line for desktop */}
            <div className="hidden md:block absolute left-[-2rem] top-0 bottom-0 w-px bg-gray-300"></div>
            
            <div className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center shrink-0 shadow-sm text-ishes-gold">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-ishes-dark text-xl mb-3 leading-tight mt-1">TOUT EST PRÊT POUR VOUS</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Contenu, outils, méthodes et accompagnement : vous n'avez plus qu'à enseigner avec confiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING BANNER ─── */}
      <section className="py-8 px-6 max-w-[80rem] mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-6 md:p-8 shadow-2xl text-white relative overflow-hidden flex flex-wrap md:flex-nowrap items-center gap-6">
          
          <div className="flex items-center gap-4 flex-1 border-r border-white/10 pr-6 min-w-[200px]">
            <Calendar className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-300">Début de la formation</p>
              <h3 className="text-sm font-black text-white mt-0.5">Octobre 2026</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 border-r border-white/10 px-6 min-w-[200px]">
            <Clock className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-300">2 cours / semaine</p>
              <h3 className="text-sm font-black text-white mt-0.5 leading-snug">Lundi, Jeudi & Vendredi<br/>à 20h00</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 border-r border-white/10 px-6 min-w-[150px]">
            <Hourglass className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-300">Durée</p>
              <h3 className="text-sm font-black text-white mt-0.5">4 mois</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 border-r border-white/10 px-6 min-w-[200px]">
            <BookOpen className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-300">2 modules complets</p>
              <h3 className="text-sm font-black text-white mt-0.5">Tous les supports<br/>inclus</h3>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 pl-6 w-full md:w-auto mt-4 md:mt-0">
            <Link 
              href="/inscription?plan=formation_enseignante_tarbya&audience=adulte" 
              className="inline-flex items-center justify-center gap-2 bg-[#b88c4d] hover:bg-[#a67b3f] text-white px-8 py-3 rounded-md text-[14px] font-black transition-all shadow-lg hover:-translate-y-1 w-full md:w-auto"
            >
              JE M'INSCRIS MAINTENANT <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
              <Lock className="w-3 h-3 text-white" />
              Paiement 100% sécurisé
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
