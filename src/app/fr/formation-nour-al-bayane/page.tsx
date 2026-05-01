import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Monitor, 
  BookOpen, 
  Award, 
  ChevronRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Formation Nour Al Bayane | Lecture Accélérée Coran | ISHES",
  description: "Maîtrisez la lecture du Coran avec la méthode Nour Al Bayane. Une approche pédagogique éprouvée pour lire avec fluidité en un temps record.",
  keywords: "nour al bayane, méthode lecture coran, apprendre lire arabe, tajwid accéléré, ishes"
};

export default function NourAlBayanePage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ishes-green/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-ishes-green transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-ishes-green">Nour Al Bayane</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Sparkles className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Méthode de Lecture Accélérée
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                La Clé de la <br />
                <span className="text-ishes-green italic">Récitation.</span>
              </h1>

              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0">
                Maîtrisez la lecture du Coran avec la célèbre méthode Nour Al Bayane. Une approche pédagogique révolutionnaire pour lire avec fluidité et précision en un temps record.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription?plan=tajwid_standard" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  S'INSCRIRE À LA FORMATION
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Type de cours</p>
                   <p className="text-ishes-green text-lg font-black italic">Accéléré</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Disponible à distance</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <BookOpen className="w-32 h-32 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4 px-6">
                    <h3 className="text-2xl font-black text-ishes-dark italic">"Nour Al Bayane : illuminer le chemin de la lecture coranique."</h3>
                    <p className="text-gray-500 font-medium text-sm">Une méthode adoptée par des millions de personnes dans le monde.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-ishes-dark uppercase tracking-tight">Le concept Nour Al Bayane</h2>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Cette méthode repose sur une décomposition phonétique rigoureuse des mots coraniques. Elle permet à l'apprenant de construire sa lecture brique par brique, garantissant ainsi qu'aucune règle de Tajwid ne soit ignorée.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Étude des Harakats (voyelles)",
                  "Maîtrise des points de sortie",
                  "Liaisons & Prolongements",
                  "Règles du Noon & Meem",
                  "Lecture fluide du Mushaf",
                  "Méthode interactive"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-ishes-green shrink-0" />
                    <span className="text-gray-700 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#101828] text-white rounded-[3rem] p-10 shadow-2xl space-y-8">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-ishes-green" />
                  <h3 className="text-lg font-black uppercase tracking-widest">Résultats</h3>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <Award className="w-8 h-8 text-ishes-green shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Autonomie Totale</h4>
                    <p className="text-gray-400 text-sm">Lire n'importe quel verset du Coran sans aide extérieure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
