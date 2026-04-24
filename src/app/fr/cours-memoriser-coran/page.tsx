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
  Library,
  GraduationCap,
  History
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoursMemoriserCoranPage() {
  const modules = [
    {
      title: "Module ou Année 1",
      subtitle: "Hizb Sabih",
      desc: "C'est la dernière partie du Coran dans laquelle se trouvent les sourates les plus courtes. Idéal pour commencer sereinement son voyage de mémorisation."
    },
    {
      title: "Module ou Année 2",
      subtitle: "Sourates Majeures",
      desc: "Mémorisation de Ayat Koursi, sourate el Moulk, el Waqi’a et sourate Yassine. Des piliers de la récitation quotidienne."
    },
    {
      title: "Module ou Année 3",
      subtitle: "Mémorisation Totale",
      desc: "Début de l'accompagnement vers la mémorisation du Saint Coran dans sa totalité pour les étudiants les plus engagés."
    }
  ];

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
                <span className="text-ishes-green">Cours Hifz</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Sparkles className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Mémorisation & Révision du Livre d'Allah
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Mémorisation <br />
                <span className="text-ishes-green italic">du Saint Coran</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ADULTE
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Possibilité de régler</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">jusqu'à 10x sans frais</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">À distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Dimanche 10h30 — 11h30</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 flex flex-col justify-center items-center gap-8 relative overflow-hidden group text-center">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <Library className="w-24 h-24 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <p className="text-xl text-gray-600 font-medium leading-relaxed">
                    "Un magnifique voyage au cœur du livre le plus lu et récité au monde."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-ishes-dark tracking-tight">Le mérite de mémoriser</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  La mémorisation du Saint Coran est une discipline maîtresse des sciences islamiques. C'est une adoration qui est très aimée du Tout miséricordieux.
                </p>
                <p className="text-gray-500 font-bold leading-relaxed">
                  L'étudiant se fera alors corriger les erreurs de lecture, tout en évoluant dans la mémorisation et la révision des sourates.
                </p>
              </div>
              <div className="bg-ishes-green/5 p-12 rounded-[3rem] border border-ishes-green/10 space-y-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-ishes-green text-white rounded-xl flex items-center justify-center">
                     <GraduationCap className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-black text-ishes-dark uppercase tracking-widest">Prérequis</h3>
                 </div>
                 <p className="text-ishes-dark font-bold leading-relaxed">
                   Il est nécessaire d'avoir suivi un cursus de Tajwid (règles de lecture), que ce soit à l'Institut ou ailleurs. Il n'est pas pertinent de mémoriser sans connaître les règles de lecture.
                 </p>
              </div>
           </div>

           <div className="space-y-12">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Programme de mémorisation</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {modules.map((module, idx) => (
                  <div key={idx} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-ishes-green/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-ishes-green/10 transition-colors" />
                    <div className="relative z-10 space-y-6">
                      <div className="text-ishes-green font-black uppercase tracking-widest text-xs">
                        {module.title}
                      </div>
                      <h4 className="text-2xl font-black text-ishes-dark">
                        {module.subtitle}
                      </h4>
                      <p className="text-gray-500 font-bold leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#101828] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ishes-green/5 blur-3xl rounded-full" />
            <div className="relative z-10 space-y-10">
              <div className="w-20 h-20 bg-ishes-green rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-ishes-green/40 rotate-6 hover:rotate-0 transition-transform duration-500">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Prêt pour ce <br /> magnifique voyage ?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/inscription" 
                  className="px-12 py-6 bg-white text-ishes-dark font-black text-xl rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  S'inscrire
                </Link>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                   <Heart className="w-5 h-5 text-ishes-green" />
                   <span className="text-sm font-black uppercase tracking-widest">On vous rappelle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-white overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "recitation du coran", "institut regles tajwid", "mémorisation coran", "hifz coran", 
            "révision coran", "cours de coran adulte", "spiritualité musulmane", "livre d'allah"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "recitation du coran", "institut regles tajwid", "mémorisation coran", "hifz coran", 
            "révision coran", "cours de coran adulte", "spiritualité musulmane", "livre d'allah"
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
