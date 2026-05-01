import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Monitor, 
  BookOpen, 
  Award, 
  ChevronRight,
  GraduationCap,
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Cours d'Anglais | Maîtrisez la Langue Internationale | ISHES",
  description: "Développez vos compétences en anglais avec l'Institut ISHES. Des cours dynamiques pour adultes et enfants, axés sur la communication concrète.",
  keywords: "cours anglais toulouse, apprendre anglais, english classes, formation anglais ishes"
};

export default function CoursAnglaisPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-ishes-green transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-ishes-green">Cours d'Anglais</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-600/10 rounded-full shadow-sm mb-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  Ouverture Internationale
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Unlock your <br />
                <span className="text-ishes-green italic">Potential.</span>
              </h1>

              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0">
                Maîtrisez la langue anglaise pour vos projets professionnels ou personnels. Une méthode dynamique axée sur la communication concrète et le vocabulaire utile.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  DEMANDER DES INFOS
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Niveau</p>
                   <p className="text-ishes-green text-lg font-black italic">A1 à C1</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cours en direct</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
                  <Award className="w-32 h-32 text-blue-600/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4 px-6">
                    <h3 className="text-2xl font-black text-ishes-dark italic">"English is the bridge to global knowledge and opportunities."</h3>
                    <p className="text-gray-500 font-medium text-sm">Une pédagogie interactive et stimulante.</p>
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
                <h2 className="text-3xl font-black text-ishes-dark uppercase tracking-tight">Le programme d'anglais</h2>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Que vous soyez débutant ou que vous souhaitiez perfectionner votre anglais, nous adaptons notre contenu à vos besoins réels. Nos cours favorisent l'expression orale pour vous mettre en confiance.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Grammaire & Syntaxe",
                  "Conversation thématique",
                  "Compréhension orale",
                  "Anglais professionnel",
                  "Préparation examens",
                  "Coaching personnalisé"
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
                  <h3 className="text-lg font-black uppercase tracking-widest">Informations</h3>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <BookOpen className="w-8 h-8 text-ishes-green shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Supports Digitaux</h4>
                    <p className="text-gray-400 text-sm">Accès à une plateforme d'exercices en ligne 24/7.</p>
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
