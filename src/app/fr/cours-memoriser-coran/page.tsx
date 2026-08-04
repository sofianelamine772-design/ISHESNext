import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  BookOpen,
  Heart,
  Star,
  Users,
  Mail,
  PenTool,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Mémorisation du Coran | Hifz & Révision | ISHES",
  description: "Mémorisez le Livre d'Allah à votre rythme avec un suivi personnalisé. Correction rigoureuse et programme de révision (Mouraja'a) structuré.",
  keywords: "mémorisation coran, hifz coran, apprendre coran, révision coran, ishes toulouse"
};

export default function CoursMemoriserCoranPage() {
  const course = PROGRAMS_DATA["memoriser_coran"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-ishes-gold selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase">
              SCIENCE DU CORAN
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-dark leading-[1.1] tracking-tight">
              Mémorisation / Lecture du Coran avec la Tilawa
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed">
              Accompagnement personnalisé pour mémoriser et lire le Livre d'Allah à votre rythme.
            </p>
            <div className="pt-4">
              <Link 
                href="/inscription?plan=memoriser_coran&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1"
              >
                JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-gray-200 mt-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark">Début<br/><span className="text-gray-500 font-medium">mi-octobre</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark">Cours<br/><span className="text-gray-500 font-medium">2 X par semaine<br/>Mercredi 19h30 & Dimanche 12h00</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark">Cours en direct<br/><span className="text-gray-500 font-medium">sur Zoom</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark">Diplôme<br/><span className="text-gray-500 font-medium">de fin de parcours</span></span>
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
                  src="/images/ai_pro.png" 
                  alt="Mémorisation du Coran"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── POUR QUI ─── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: "Tu as validé le Tajwid", desc: "avec notre institut ou un autre" },
            { icon: BookOpen, title: "Tu as déjà essayé seul", desc: "ou avec une connaissance, sans résultat" },
            { icon: Heart, title: "Tu veux mémoriser", desc: "le Coran avec une méthode efficace" },
            { icon: Star, title: "Tu cherches une routine", desc: "spirituelle stable et accompagnée" }
          ].map((item, i) => (
            <div key={i} className="bg-[#fafafa] rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow border border-gray-100 hover:border-ishes-gold/20">
              <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-8 h-8 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ishes-dark whitespace-pre-line leading-tight">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm mt-2 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-24 px-6 bg-[#fafafa] my-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
             <Image 
               src="/images/tajwid_students.png" 
               alt="Cours en direct sur Zoom"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Pourquoi ce programme va tout changer ?</h2>
            <div className="space-y-6">
              {[
                "Mémorisation progressive adaptée à votre rythme",
                "Révisions régulières pour une mémorisation solide",
                "Récitation accompagnée et corrections détaillées",
                "Suivi pédagogique personnalisé",
                "Accompagnement bienveillant et motivant"
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
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-16">Ce qui est inclus</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { image: "/images/tajwid_students.png", title: "Cours en direct\n2 X par semaine\nMercredi 19h30\n& Dimanche 12h00" },
            { image: "/images/tajwid_exercises.png", title: "Exercices\net examens" },
            { image: "/images/tilawa_quran.png", title: "Mémorisation guidée\net révisions régulières" },
            { image: "/images/tajwid_whatsapp.png", title: "Groupe WhatsApp\nprivé et suivi" }
          ].map((item, i) => (
            <div key={i} className="bg-[#fafafa] rounded-2xl shadow-sm border border-gray-100 flex flex-col group overflow-hidden relative pb-6 transition-all hover:shadow-md">
              <div className="w-full h-40 relative mb-4">
                 <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <h3 className="font-bold text-ishes-dark text-sm whitespace-pre-line px-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEROULEMENT ─── */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-[#fafafa] rounded-[3rem]">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Comment se déroule le programme ?</h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-ishes-gold/30 border-dashed"></div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {[
              { num: 1, icon: Calendar, title: "Tu t'inscris", desc: "Choisis ton mode de paiement et valide ton inscription." },
              { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès immédiat à la plateforme et au groupe WhatsApp." },
              { num: 3, icon: Video, title: "Tu assistes aux cours", desc: "Cours en direct sur Zoom 2 fois par semaine." },
              { num: 4, icon: PenTool, title: "Tu participes aux examens", desc: "Évaluations régulières pour suivre ta progression." },
              { num: 5, icon: Award, title: "Tu valides tes sourates", desc: "À la fin des 4 mois après validation des sourates." }
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-ishes-dark text-white rounded-full flex items-center justify-center font-black text-xl mb-6 relative z-10 border-4 border-[#fafafa] shadow-lg group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <step.icon className="w-10 h-10 text-ishes-gold mb-4" />
                <h3 className="font-black text-ishes-dark mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING BANNER ─── */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <div className="text-5xl md:text-6xl font-black text-ishes-gold">399 €</div>
            <h3 className="text-lg font-medium text-gray-300">Formation complète – 4 mois</h3>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <Link 
              href="/inscription?plan=memoriser_coran&audience=adulte" 
              className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-10 py-5 rounded-md text-[16px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1 w-full md:w-auto"
            >
              JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <Lock className="w-4 h-4 text-ishes-gold" />
              Paiement 100% sécurisé – Payable en 3X sans frais
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
