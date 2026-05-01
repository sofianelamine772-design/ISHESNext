"use client";

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Monitor, 
  Award, 
  ChevronRight,
  Globe,
  Wifi,
  Video,
  MousePointer2
} from 'lucide-react';

export default function CoursDistancePage() {
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
                <span className="text-ishes-green">Cours à Distance</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Globe className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  L'excellence ISHES partout dans le monde
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Apprenez d'où <br />
                <span className="text-ishes-green italic">vous voulez.</span>
              </h1>

              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0">
                Profitez de la qualité de nos enseignements sans contrainte géographique. Nos cours en ligne direct vous offrent une expérience interactive, structurée et humaine.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/program" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  VOIR LES COURS EN LIGNE
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <Monitor className="w-32 h-32 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4 px-6">
                    <h3 className="text-2xl font-black text-ishes-dark italic">"La technologie au service de la transmission."</h3>
                    <p className="text-gray-500 font-medium text-sm">Une plateforme stable et des outils pédagogiques modernes.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Wifi />, title: "Cours en Direct", desc: "Interagissez avec vos professeurs en temps réel pour une correction immédiate." },
              { icon: <Video />, title: "Replay Disponible", desc: "Accédez aux enregistrements de vos cours pour réviser à votre rythme." },
              { icon: <MousePointer2 />, title: "Espace Élève", desc: "Retrouvez vos supports PDF, devoirs et suivi sur notre plateforme." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-ishes-green/10 text-ishes-green rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-ishes-dark mb-4">{feature.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 px-6 bg-ishes-dark text-white rounded-[4rem] mx-6 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ishes-green/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black italic">Plus de 500 élèves nous font déjà confiance à distance.</h2>
          <p className="text-white/60 text-lg font-medium">Rejoignez une communauté dynamique et progressez sereinement.</p>
          <Link href="/program" className="inline-block bg-ishes-green hover:bg-ishes-green-hover text-white px-12 py-5 rounded-2xl font-black transition-all">
             DÉCOUVRIR LES PROGRAMMES
          </Link>
        </div>
      </section>

    </div>
  );
}
