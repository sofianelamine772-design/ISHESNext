import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  BookOpen,
  Heart,
  Users,
  CheckCircle2,
  Mail,
  PenTool,
  Lock,
  ArrowRight,
  Monitor,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Sciences du Coran | Histoire & Révélation | ISHES",
  description: "Découvrez l'histoire de la révélation, de la compilation et de la transmission du Livre Saint. Une formation diplômante de l'Institut ISHES.",
  keywords: "sciences du coran, histoire coran, révélation, compilation coran, ishes toulouse, sciences islamiques, cours coran",
};

export default function CoursSciencesCoranPage() {
  const course = PROGRAMS_DATA["sciences_du_coran"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase">
              SCIENCE DU CORAN
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Science <br /> du Coran
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-xl leading-relaxed border-l-2 border-ishes-gold pl-4">
              Découvrez l'histoire vivante du Livre d'ALLAH.
            </p>
            <div className="pt-4">
              <Link 
                href="/inscription?plan=sciences_du_coran&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-[#c19b6c] hover:bg-[#a67b3f] text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-[#c19b6c]/20 hover:-translate-y-1"
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
                <span className="text-xs font-bold text-ishes-dark">Horaire<br/><span className="text-gray-500 font-medium">Samedi 10h30</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-ishes-gold" />
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
                  alt="Science du Coran"
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
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Ce cours est fait pour toi si tu veux...</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Comprendre l'histoire\net la transmission du Coran", desc: "Une révélation préservée génération\naprès génération." },
            { icon: BookOpen, title: "Approfondir tes connaissances\nsur les Sciences du Coran", desc: "Des bases solides expliquées\navec clarté." },
            { icon: Heart, title: "Renforcer ta relation avec\nle Livre d'ALLAH", desc: "Une lumière qui éclaire le cœur\net la vie." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-8 h-8 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ishes-dark whitespace-pre-line leading-tight">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm mt-3 whitespace-pre-line leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-24 px-6 bg-[#f2ece4] my-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
             <Image 
               src="/images/fiqh_students.png" 
               alt="Zoom Étude"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Pourquoi ce programme va tout changer ?</h2>
            <div className="space-y-6">
              {[
                "Le Coran devient une preuve vivante, pas seulement un texte récité",
                "Un héritage transmis avec une précision absolue",
                "Un miracle historique, linguistique et spirituel",
                "Une lumière témoignant de son origine divine",
                "Pédagogie claire, structurée et accessible"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#c19b6c] shrink-0" />
                  <span className="text-lg font-bold text-ishes-dark">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CE QUI EST INCLUS ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-16">Ce qui est inclus</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {[
            { image: "/images/fiqh_book.png", icon: BookOpen, title: "Support\npédagogique" },
            { image: "/images/aqida_students.png", icon: Monitor, title: "Replays\nà vie" },
            { image: "/images/media__1785842143907.jpg", icon: Award, title: "Diplôme de fin\nde parcours" },
            { image: "/images/tajwid_exercises.png", icon: PenTool, title: "Exercices et\névaluations" },
            { image: "/images/tajwid_whatsapp.png", icon: Users, title: "Groupe WhatsApp\nprivé et suivi" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center overflow-hidden pb-6 group hover:shadow-md transition-shadow">
              <div className="w-full h-32 relative mb-8">
                 <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 20vw" />
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#c19b6c] rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm">
                   <item.icon className="w-5 h-5 text-white" />
                 </div>
              </div>
              <h3 className="font-bold text-ishes-dark text-sm whitespace-pre-line px-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEROULEMENT ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Comment se déroule le programme ?</h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-[#c19b6c]/30 border-dashed"></div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {[
              { num: 1, icon: ClipboardList, title: "Tu t'inscris", desc: "Choisis ton mode de paiement et valide ton inscription." },
              { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès immédiat à la plateforme et au groupe WhatsApp." },
              { num: 3, icon: Monitor, title: "Tu assistes aux cours", desc: "Cours en direct sur Zoom chaque semaine." },
              { num: 4, icon: GraduationCap, title: "Tu participe aux examens", desc: "Participation aux examens pour valider tes acquis." },
              { num: 5, icon: Award, title: "Tu valides ton diplôme", desc: "À la fin des 4 mois après validation de ton parcours." }
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-ishes-dark text-white rounded-full flex items-center justify-center font-black text-xl mb-6 relative z-10 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <step.icon className="w-10 h-10 text-[#c19b6c] mb-4" />
                <h3 className="font-black text-ishes-dark mb-2 text-sm md:text-base">{step.title}</h3>
                <p className="text-xs text-gray-600 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── A LA FIN DE CETTE FORMATION ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-dark">À la fin de cette formation, tu sauras :</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 bg-[#f2ece4] rounded-2xl p-8">
           {[
             { icon: BookOpen, text: "Comprendre l'histoire\net la transmission du Coran" },
             { icon: ShieldCheck, text: "Reconnaître les preuves\nde son authenticité" },
             { icon: Sparkles, text: "Voir les miracles uniques\ndu Livre d'ALLAH" },
             { icon: Heart, text: "Renforcer ta relation\navec le Coran" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 max-w-[250px]">
               <item.icon className="w-8 h-8 text-[#c19b6c] shrink-0" />
               <span className="text-sm font-bold text-ishes-dark whitespace-pre-line leading-snug">{item.text}</span>
             </div>
           ))}
        </div>
      </section>

      {/* ─── PRICING BANNER ─── */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-10">
        <div className="bg-ishes-blue rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0 pr-0 md:pr-16 w-full md:w-auto">
            <div className="text-5xl md:text-6xl font-black text-[#c19b6c]">399 €</div>
            <h3 className="text-lg font-medium text-gray-300">Formation complète – 4 mois</h3>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto pl-0 md:pl-16">
            <Link 
              href="/inscription?plan=sciences_du_coran&audience=adulte" 
              className="inline-flex items-center justify-center gap-2 bg-[#c19b6c] hover:bg-[#a67b3f] text-white px-8 py-5 rounded-md text-[15px] font-black transition-all shadow-xl shadow-[#c19b6c]/20 hover:-translate-y-1 w-full"
            >
              JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <Lock className="w-4 h-4 text-[#c19b6c]" />
              Paiement 100% sécurisé
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
