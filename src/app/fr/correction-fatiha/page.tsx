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
  Star,
  Zap,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Heart,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CorrectionFatihaPage() {
  const objectives = [
    "Parce qu'il n'y a pas de prière sans la Fatiha !",
    "Parce que la Fatiha a ses conditions de validité !",
    "Parce qu'après chaque Fatiha il faut lire une sourate.",
    "Apprendre la prononciation correcte de chaque lettre.",
    "Corriger les 3 dernières sourates (Ikhlass, Falaq, Nas).",
    "Acquérir le minimum vital pour une pratique valide."
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
                <span className="text-ishes-green">Correction al Fatiha</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Star className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  La base fondamentale de la Prière
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Corriger <br />
                <span className="text-ishes-green italic">Al Fatiha</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  S'INSCRIRE GRATUITEMENT
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Offert par l'Institut</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">Fatiha & 3 dernières sourates</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">En ligne (Zoom)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Dimanche 10:00 — 11:00</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <svg className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-red-600 transition-colors">Vidéo explicative</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[600px] h-[400px] bg-white rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
               <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/Kjn_SbSTpYo" 
                  title="Correction al Fatiha"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-ishes-dark tracking-tight uppercase">Pourquoi corriger ?</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  La récitation de la sourate El Fatiha occupe une place sacrée. Elle est le pilier de chaque prière, qu'elle soit obligatoire ou surérogatoire.
                </p>
                <p className="text-gray-500 font-bold leading-relaxed">
                  Allah a choisi la langue arabe pour Son Livre. Il nous est donc demandé d'apprendre le minimum pour réciter correctement les versets qui valident nos actes d'adoration.
                </p>
              </div>
              <div className="bg-[#101828] text-white p-12 rounded-[3rem] border border-white/5 space-y-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-green/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-ishes-green/40 transition-all duration-700" />
                 <div className="flex items-center gap-3">
                   <ShieldCheck className="w-6 h-6 text-ishes-green" />
                   <h3 className="text-xl font-black uppercase tracking-widest">Engagement Gratuit</h3>
                 </div>
                 <p className="text-white/60 font-medium leading-relaxed">
                   Étant donné son caractère obligatoire, l'Institut ISHES vous propose de corriger la Fatiha et les trois dernières sourates de manière complètement gratuite.
                 </p>
                 <div className="pt-4">
                    <Link href="/inscription" className="inline-flex items-center gap-2 text-ishes-green font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                      Réserver ma place <ChevronRight className="w-4 h-4" />
                    </Link>
                 </div>
              </div>
           </div>

           <div className="space-y-12">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Objectifs du module</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {objectives.map((obj, idx) => (
                  <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-ishes-green/5 text-ishes-green flex items-center justify-center shrink-0 mb-6 group-hover:bg-ishes-green group-hover:text-white transition-colors">
                      <Zap className="w-5 h-5" />
                    </div>
                    <p className="text-ishes-dark font-black leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── INFO & SESSION ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
             <div className="lg:col-span-7 bg-white rounded-[3rem] p-12 md:p-16 border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                   <GraduationCap className="w-10 h-10 text-ishes-green" />
                   <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Méthodologie</h3>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-ishes-green" />
                      <span className="font-bold text-gray-700">Approche basée sur la méthode Nour Al Bayan</span>
                   </div>
                   <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-ishes-green" />
                      <span className="font-bold text-gray-700">Focus sur les points d'articulation (Makharij)</span>
                   </div>
                   <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-ishes-green" />
                      <span className="font-bold text-gray-700">Correction individuelle en petit groupe</span>
                   </div>
                </div>
             </div>

             <div className="lg:col-span-5 bg-ishes-green text-white rounded-[3rem] p-12 md:p-16 space-y-10 relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-3xl rounded-full scale-150" />
                <div className="relative z-10 space-y-10 text-center">
                   <div className="flex items-center justify-center gap-4">
                      <Calendar className="w-8 h-8 text-white" />
                      <h3 className="text-2xl font-black uppercase tracking-widest">Session</h3>
                   </div>
                   <div className="space-y-4">
                      <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Prochain Direct</p>
                      <p className="text-4xl font-black">Dimanche</p>
                      <p className="text-white text-2xl font-black italic">10:00 — 11:00</p>
                   </div>
                   <Link 
                     href="/inscription" 
                     className="block w-full bg-[#101828] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                   >
                     M'inscrire au module
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
             <Heart className="w-10 h-10" />
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-ishes-dark tracking-tight">Une Fatiha parfaite pour une prière valide.</h2>
           <p className="text-xl text-gray-500 font-medium">
             Ne laissez plus le doute s'installer dans votre pratique. Rejoignez-nous pour une heure de correction fraternelle et gratuite.
           </p>
           <div className="pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-gray-50 text-ishes-dark px-10 py-5 rounded-2xl font-black hover:bg-gray-100 transition-all border border-gray-100"
              >
                <MessageCircle className="w-5 h-5 text-ishes-green" />
                Besoin de renseignements ?
              </Link>
           </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-[#fafafa] overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "correction al fatiha", "prononciation fatiha", "cours coran gratuit", "nour al bayan", 
            "prière valide islam", "sourates courtes", "tajwid fatiha", "institut ishes"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "correction al fatiha", "prononciation fatiha", "cours coran gratuit", "nour al bayan", 
            "prière valide islam", "sourates courtes", "tajwid fatiha", "institut ishes"
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
