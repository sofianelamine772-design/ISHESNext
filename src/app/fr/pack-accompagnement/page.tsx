"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Monitor, 
  BookOpen, 
  Award, 
  Calendar,
  ChevronRight,
  Info,
  Users,
  MessageCircle,
  Heart,
  Sparkles,
  Zap,
  Star,
  ShieldCheck,
  Smartphone,
  Gem,
  Gift
} from 'lucide-react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PackAccompagnementPage() {
  const benefits = [
    {
      title: "ISHES Ensemble",
      desc: "Vous intégrez une communauté privée d'étudiants partageant le même objectif : progresser vers ALLAH. Des rappels, défis spirituels et préparation aux grands rendez-vous (Ramadan, Dhoul Hijja...).",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Les Fondamentaux de la Spiritualité",
      desc: "Ce module exclusif de quatre séances vous permettra de revenir aux bases indispensables de l'éducation du cœur (purifier son intention, renforcer sa relation avec ALLAH, sincérité...).",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Lives privés & Questions / Réponses",
      desc: "Chaque mois, participez à un live privé animé par les fondateurs de l'Institut. Abordez des sujets de spiritualité et recevez des conseils adaptés à votre quotidien.",
      icon: <Monitor className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#008953]/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 pt-10 text-center">
           <nav className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              <Link href="/" className="hover:text-ishes-green transition-colors">Accueil</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-ishes-green">Pack Accompagnement</span>
           </nav>
           
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-ishes-green" />
              <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                Un espace privilégié
              </span>
           </div>

           <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-ishes-dark leading-[1.1] tracking-tight mb-8">
             Ne cheminez plus <br />
             <span className="text-ishes-green italic">seul</span> vers ALLAH.
           </h1>

           <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
             Apprendre une science religieuse est une immense faveur. Mais le véritable défi ne consiste pas seulement à acquérir des connaissances. Il consiste à les vivre, à persévérer malgré les baisses de motivation, à surmonter les épreuves et à continuer d'avancer vers ALLAH avec constance.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/inscription?plan=pack_accompagnement" 
                className="w-full sm:w-auto bg-[#101828] text-white px-12 py-6 rounded-2xl text-lg font-black transition-all shadow-xl hover:-translate-y-1 active:scale-95"
              >
                OBTENIR MON PACK
              </Link>
              <div className="bg-white/50 backdrop-blur-sm p-4 px-8 rounded-2xl border border-gray-100 flex flex-col items-center">
                 <p className="text-ishes-green text-3xl font-black italic tracking-tight uppercase">Offert</p>
                 <p className="text-[10px] font-black text-ishes-dark uppercase tracking-widest">Valeur réelle : 399 €</p>
              </div>
           </div>

           <div className="mt-16 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white/60 backdrop-blur-sm relative z-20">
             <iframe 
               className="w-full aspect-video bg-[#101828]"
               src="https://www.youtube.com/embed/GuP0DX_0mHg" 
               title="Présentation du Pack Accompagnement" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               referrerPolicy="strict-origin-when-cross-origin" 
               allowFullScreen
             ></iframe>
           </div>
        </div>
      </section>

      {/* ─── INTRO SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <h2 className="text-3xl md:text-5xl font-black text-ishes-dark tracking-tight">Un accompagnement pensé pour votre cheminement</h2>
           <p className="text-lg text-gray-500 font-medium leading-relaxed">
             C'est précisément pour répondre à ce besoin que l'Institut ISHES a créé le Pack Accompagnement. Bien plus qu'un complément de formation, il s'agit d'un espace privilégié destiné à accompagner chaque étudiant dans son évolution religieuse et spirituelle tout au long de l'année. Parce qu'un croyant n'a pas seulement besoin d'apprendre… il a aussi besoin d'être entouré, conseillé et soutenu.
           </p>
        </div>
      </section>

      {/* ─── BENEFITS GRID ─── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group">
                   <div className="w-12 h-12 rounded-2xl bg-ishes-green/10 text-ishes-green flex items-center justify-center mb-8 group-hover:bg-ishes-green group-hover:text-white transition-all">
                      {b.icon}
                   </div>
                   <h3 className="text-lg font-black text-ishes-dark mb-4 uppercase tracking-tight">{b.title}</h3>
                   <p className="text-gray-500 font-bold leading-relaxed text-sm">{b.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── WHY SECTION ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-[#101828] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-ishes-green/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-10">
                    <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">Une expérience qui dépasse le simple <span className="text-ishes-green">apprentissage</span></h2>
                    <p className="text-xl text-white/60 font-medium leading-relaxed">
                       À l'Institut ISHES, nous ne souhaitons pas uniquement transmettre des connaissances. Notre ambition est d'accompagner des femmes et des hommes dans leur cheminement vers ALLAH, afin que la science acquise devienne une lumière qui éclaire leur vie, leur famille et leur pratique religieuse.
                    </p>
                 </div>
                 <div className="bg-white rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <Gift className="w-32 h-32 text-ishes-green" />
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                       <ShieldCheck className="w-8 h-8 text-ishes-green" />
                       <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Une valeur exceptionnelle</h3>
                    </div>
                    <p className="text-gray-600 font-bold relative z-10">
                      Le Pack Accompagnement représente une valeur réelle de <strong className="text-ishes-dark text-lg">399 €</strong>.
                    </p>
                    <p className="text-gray-600 font-medium text-sm leading-relaxed relative z-10">
                      Afin que chaque étudiant puisse bénéficier de cet accompagnement essentiel, il est <strong>entièrement offert</strong> à toute personne inscrite à une formation de l'Institut ISHES qui souhaite en profiter.
                    </p>
                    <p className="text-ishes-green font-bold text-sm italic relative z-10">
                      Parce que nous croyons que le plus beau des enseignements est celui qui se poursuit bien après la fin du cours.
                    </p>
                    <div className="relative z-10 pt-4">
                      <Link href="/inscription?plan=pack_accompagnement" className="block w-full bg-ishes-green text-white py-5 rounded-2xl font-black text-center shadow-xl shadow-ishes-green/20">
                         Profiter de mon Pack Offert
                      </Link>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
