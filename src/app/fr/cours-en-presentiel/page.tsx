"use client";

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  MapPin, 
  Users, 
  Award, 
  ChevronRight,
  Coffee,
  Calendar,
  Building2
} from 'lucide-react';

export default function CoursPresentielPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-ishes-green transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-ishes-green">Cours en Présentiel</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-400/10 rounded-full shadow-sm mb-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                  Institut ISHES Toulouse
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Vivez l'Institut <br />
                <span className="text-ishes-green italic">en Direct.</span>
              </h1>

              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0">
                L'apprentissage en présentiel offre une immersion totale et un contact direct avec vos professeurs. Rejoignez nos locaux à Toulouse pour une expérience humaine et spirituelle unique.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/program" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  DÉCOUVRIR LES COURS SUR PLACE
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-amber-400/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-amber-500" />
                  <Building2 className="w-32 h-32 text-amber-500/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4 px-6">
                    <h3 className="text-2xl font-black text-ishes-dark italic">"La proximité est la clé de la transmission du cœur."</h3>
                    <p className="text-gray-500 font-medium text-sm">Des locaux équipés et une ambiance fraternelle.</p>
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
              { icon: <Users />, title: "Vie de Groupe", desc: "Étudiez au sein d'une communauté soudée et encourageante." },
              { icon: <Calendar />, title: "Horaires Fixes", desc: "Un cadre structuré pour une assiduité et une progression garanties." },
              { icon: <Coffee />, title: "Moments Fraternels", desc: "Échangez avec les professeurs et élèves lors des pauses conviviales." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-amber-400/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-ishes-dark mb-4">{feature.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER SEO MARQUEE ─── */}
      <section className="py-8 bg-[#fafafa] overflow-hidden opacity-30 mb-20">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "ishes toulouse", "cours arabe toulouse", "tajwid presentiel", "institut islamique toulouse", 
            "école arabe toulouse", "coran toulouse", "sciences islamiques toulouse"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
