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
  Gem
} from 'lucide-react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PackAccompagnementPage() {
  const benefits = [
    {
      title: "Groupe WhatsApp Privé",
      desc: "Un espace d'entraide et de motivation avec les autres étudiants et l'enseignant.",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: "Lives Mensuels",
      desc: "Des sessions de questions-réponses en direct pour lever tous vos doutes.",
      icon: <Monitor className="w-6 h-6" />
    },
    {
      title: "Module Spiritualité",
      desc: "Accès exclusif à des contenus sur l'éducation de l'âme pour booster votre foi.",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Accès Early Bird",
      desc: "Soyez prioritaire sur les inscriptions aux nouveaux modules et événements.",
      icon: <Zap className="w-6 h-6" />
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
              <Gem className="w-4 h-4 text-ishes-green" />
              <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                Le booster de votre réussite
              </span>
           </div>

           <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-ishes-dark leading-[1.1] tracking-tight mb-8">
             Maximisez votre <br />
             <span className="text-ishes-green italic font-serif">potentiel</span>.
           </h1>

           <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
             Le Pack Accompagnement est conçu pour ceux qui veulent aller plus loin. Plus de soutien, plus de proximité, et une immersion totale dans l'apprentissage.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/inscription?plan=pack_accompagnement" 
                className="w-full sm:w-auto bg-[#101828] text-white px-12 py-6 rounded-2xl text-lg font-black transition-all shadow-xl hover:-translate-y-1 active:scale-95"
              >
                PRENDRE LE PACK
              </Link>
              <div className="bg-white/50 backdrop-blur-sm p-4 px-8 rounded-2xl border border-gray-100 flex flex-col items-center">
                 <p className="text-ishes-green text-3xl font-black italic tracking-tight">49 €</p>
                 <p className="text-[10px] font-black text-ishes-dark uppercase tracking-widest">Par session</p>
              </div>
           </div>
        </div>
      </section>

      {/* ─── BENEFITS GRID ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">Ne restez plus <br /> <span className="text-ishes-green">seul</span> face à vos difficultés.</h2>
                    <p className="text-xl text-white/60 font-medium leading-relaxed">
                       L'apprentissage est un marathon. Avec le Pack Accompagnement, vous rejoignez une communauté soudée qui vous tire vers le haut chaque jour.
                    </p>
                    <div className="flex items-center gap-6">
                       <div className="flex -space-x-4">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-[#101828] bg-gray-700 flex items-center justify-center overflow-hidden">
                               <Users className="w-6 h-6 text-white/20" />
                            </div>
                          ))}
                       </div>
                       <p className="text-sm font-bold text-white/80">+200 étudiants nous ont rejoint</p>
                    </div>
                 </div>
                 <div className="bg-white rounded-[3rem] p-10 space-y-8 shadow-2xl">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="w-8 h-8 text-ishes-green" />
                       <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Inclus dans le pack</h3>
                    </div>
                    <ul className="space-y-4">
                       {[
                         "Réponses à vos questions en moins de 24h",
                         "Accès à la bibliothèque de ressources",
                         "Invitation aux séminaires exclusifs",
                         "Réductions sur la boutique ISHES"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-ishes-green" />
                            <span className="text-gray-700 font-bold">{item}</span>
                         </li>
                       ))}
                    </ul>
                    <Link href="/inscription" className="block w-full bg-ishes-green text-white py-5 rounded-2xl font-black text-center shadow-xl shadow-ishes-green/20">
                       Activer mon Pack
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto space-y-10">
           <div className="w-20 h-20 bg-ishes-green/10 text-ishes-green rounded-3xl flex items-center justify-center mx-auto">
             <Star className="w-10 h-10" />
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-ishes-dark tracking-tight">Investissez dans votre progression.</h2>
           <p className="text-xl text-gray-500 font-medium">
             Le savoir est précieux, l'accompagnement l'est tout autant. Donnez-vous les moyens de réussir votre cursus ISHES.
           </p>
           <div className="pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-gray-50 text-ishes-dark px-10 py-5 rounded-2xl font-black hover:bg-gray-100 transition-all border border-gray-100"
              >
                <MessageCircle className="w-5 h-5 text-ishes-green" />
                En savoir plus sur l'accompagnement
              </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
