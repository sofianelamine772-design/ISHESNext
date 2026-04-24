"use client";

import React, { useState } from 'react';
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
  Star,
  Sparkles,
  Map,
  History,
  Compass,
  Tent,
  BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoursAsSirahPage() {
  const [activePeriod, setActivePeriod] = useState('mecquoise');

  const periods = {
    pre: {
      title: "Période Pré-Islamique",
      items: [
        "Mariage des parents du Prophète ﷺ",
        "Un enfant bénit : Naissance & Enfance",
        "Mort des parents de Mohamed ﷺ",
        "Voyage en Syrie & rencontre du moine Bahira",
        "Jeunesse avant la prophétie (Al-Amîn)",
        "Mariage avec Khadija (RA)"
      ]
    },
    mecquoise: {
      title: "Période Mécquoise",
      items: [
        "La Révélation au mont Hira",
        "L'appel secret & les premiers musulmans",
        "L'appel public & les persécutions",
        "Conversion de 'Umar et de Hamza",
        "Le boycott des Banu Hashim",
        "L'année de la tristesse",
        "Le voyage nocturne (Isra wal Mi'raj)",
        "Les serments d'Al-Aqabah",
        "L'émigration vers Médine (Hijra)"
      ]
    },
    medinoise: {
      title: "Période Médinoise",
      items: [
        "Construction de la Mosquée & Fraternité",
        "La bataille de Badr & Ohoud",
        "Le pacte de Houdeybiya",
        "Diffusion aux grands empires",
        "Conquête de la Mecque",
        "L'expédition de Tabuk",
        "Le pèlerinage d'adieu",
        "La maladie & le retour vers Allah ﷺ"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#008953]/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-ishes-green transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-ishes-green">Vie du Prophète ﷺ</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Sparkles className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  As-Sîrah An-Nabawiyya
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                La vie du <br />
                <span className="text-ishes-green italic">meilleur des hommes</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ADULTE
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Enseignement à distance</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">Lanterne de notre cheminement</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sîrah 1 & 2 : Samedi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Direct Interactif</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 flex flex-col justify-center items-center gap-8 relative overflow-hidden group text-center">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <Compass className="w-24 h-24 text-ishes-green/20 group-hover:rotate-180 transition-transform duration-1000" />
                  <p className="text-xl text-gray-600 font-medium leading-relaxed italic">
                    "Mohamed ﷺ est la meilleure créature que la Terre ait portée. Sa vie regorge d’enseignements et de vertus."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl font-black text-ishes-dark tracking-tight">Parcourir son histoire</h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                De sa naissance à la sortie de son âme ﷺ, découvrez les étapes clés de la mission prophétique.
              </p>
           </div>

           <div className="flex justify-center mb-16">
              <div className="inline-flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                {[
                  { id: 'pre', label: 'Pré-Islam', icon: <History className="w-4 h-4" /> },
                  { id: 'mecquoise', label: 'Mécquoise', icon: <Tent className="w-4 h-4" /> },
                  { id: 'medinoise', label: 'Médinoise', icon: <Map className="w-4 h-4" /> }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePeriod(p.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activePeriod === p.id ? 'bg-white text-ishes-green shadow-md border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                ))}
              </div>
           </div>

           <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-20 border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-ishes-green/5 rounded-full blur-3xl -mr-32 -mt-32" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePeriod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12 relative z-10"
                >
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-ishes-dark">{periods[activePeriod].title}</h3>
                    <div className="w-20 h-1.5 bg-ishes-green rounded-full" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {periods[activePeriod].items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-lg bg-ishes-green/10 text-ishes-green flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-ishes-green group-hover:text-white transition-all">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-gray-600 font-bold leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </section>

      {/* ─── INFO & SCHEDULE ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-[#101828] text-white rounded-[3rem] p-12 md:p-16 space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-ishes-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-4">
                     <Clock className="w-8 h-8 text-ishes-green" />
                     <h3 className="text-2xl font-black uppercase tracking-widest">Horaires Samedi</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center space-y-2">
                       <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Sirah Niveau 1</p>
                       <p className="text-3xl font-black">10:00</p>
                    </div>
                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center space-y-2">
                       <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Sirah Niveau 2</p>
                       <p className="text-3xl font-black">11:00</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[3rem] p-12 md:p-16 border border-gray-100 shadow-sm space-y-10 flex flex-col justify-center">
               <div className="flex items-center gap-4">
                  <Award className="w-8 h-8 text-ishes-green" />
                  <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-widest">Notre Mission</h3>
               </div>
               <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  Il est de notre devoir de connaître sa vie qui nous servira de lanterne dans notre cheminement et permettra de créer un lien spirituel fort avec lui ﷺ.
               </p>
               <Link 
                  href="/inscription" 
                  className="inline-flex items-center justify-center bg-ishes-green text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-ishes-green-hover transition-all shadow-xl shadow-ishes-green/20"
               >
                  M'inscrire au cursus
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-white overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "la biographie du prophète", "as sirah", "vie de mohamed", "histoire de l'islam", 
            "compagnons du prophète", "hijra médine", "bataille de badr", "sermon d'adieu"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "la biographie du prophète", "as sirah", "vie de mohamed", "histoire de l'islam", 
            "compagnons du prophète", "hijra médine", "bataille de badr", "sermon d'adieu"
          ].map((kw, i) => (
            <span key={i+"-2"} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
