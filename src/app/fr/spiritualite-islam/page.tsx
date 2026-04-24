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
  Leaf,
  GraduationCap,
  Star,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SpiritualiteIslamPage() {
  const principles = [
    "Les 5 piliers de l'Islam",
    "Les 6 piliers de la Foi",
    "Améliorer sa foi au quotidien",
    "Connaissance approfondie de la religion",
    "Harmonie entre l'âme et le corps",
    "Relation spirituelle avec Allah"
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
                <span className="text-ishes-green">Spiritualité Musulmane</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Heart className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Éducation de l'âme & Quête de Sens
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Éveiller son <br />
                <span className="text-ishes-green italic">intériorité</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  S'INSCRIRE GRATUITEMENT
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Cursus offert</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">Uniquement à distance</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Accessible à tous</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Zoom en direct</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 flex flex-col justify-center items-center gap-8 relative overflow-hidden group text-center">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <Leaf className="w-24 h-24 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <p className="text-xl text-gray-600 font-medium leading-relaxed italic">
                    "La spiritualité musulmane représente le noyau de l'Islam, l'âme de la religion."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-ishes-dark tracking-tight">L'éducation de l'âme (Rouh)</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  Comme tout être vivant à une âme qui anime et rend vie au corps physique, nous avons une essence appelée "Rouh" qui fait de nous ce que nous sommes.
                </p>
                <div className="p-8 bg-ishes-green/5 rounded-[2.5rem] border border-ishes-green/10">
                   <p className="text-ishes-dark font-bold leading-relaxed">
                     Ce cours est destiné à toute personne intéressée, musulmane ou non, en quête de paix et de sens dans sa vie. Une introduction pratique et accessible à tous les niveaux.
                   </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <Star />, title: "Harmonie", desc: "Âme et corps" },
                   { icon: <Heart />, title: "Bienveillance", desc: "Vers les créatures" },
                   { icon: <Zap />, title: "Paix intérieure", desc: "Quête de sens" },
                   { icon: <CheckCircle2 />, title: "Authentique", desc: "Préceptes profonds" }
                 ].map((item, i) => (
                   <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-3 hover:bg-white hover:shadow-xl transition-all group">
                     <div className="text-ishes-green group-hover:scale-110 transition-transform">{item.icon}</div>
                     <h4 className="font-black text-ishes-dark uppercase tracking-widest text-xs">{item.title}</h4>
                     <p className="text-gray-400 font-bold text-[10px]">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-12">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Principes fondamentaux</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {principles.map((principle, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-ishes-green/5 text-ishes-green flex items-center justify-center shrink-0 group-hover:bg-ishes-green group-hover:text-white transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-bold">{principle}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── EXPERTISE & SCHEDULE ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
             <div className="lg:col-span-7 bg-white rounded-[3rem] p-12 md:p-16 border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                   <GraduationCap className="w-10 h-10 text-ishes-green" />
                   <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Une enseignante dédiée</h3>
                </div>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  Notre enseignante est diplômée en sciences islamiques. Elle est disponible pour répondre à vos questions et vous aider à mieux comprendre les concepts abordés.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                   <div className="bg-ishes-green/5 px-6 py-3 rounded-full text-ishes-green font-bold text-sm">Diplôme Supérieur</div>
                   <div className="bg-ishes-green/5 px-6 py-3 rounded-full text-ishes-green font-bold text-sm">Approche Bienveillante</div>
                   <div className="bg-ishes-green/5 px-6 py-3 rounded-full text-ishes-green font-bold text-sm">Session Q&A</div>
                </div>
             </div>

             <div className="lg:col-span-5 bg-[#101828] text-white rounded-[3rem] p-12 md:p-16 space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-ishes-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 space-y-10">
                   <div className="flex items-center gap-4">
                      <Calendar className="w-8 h-8 text-ishes-green" />
                      <h3 className="text-2xl font-black uppercase tracking-widest">Horaires</h3>
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Cours Femmes</p>
                         <p className="text-3xl font-black">Samedi — 09:30</p>
                      </div>
                      <div className="w-full h-px bg-white/10" />
                      <div className="space-y-2">
                         <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Cours Hommes</p>
                         <p className="text-3xl font-black">Dimanche — 09:30</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
           <div className="w-20 h-20 bg-ishes-green/10 text-ishes-green rounded-3xl flex items-center justify-center mx-auto shadow-xl">
             <MessageCircle className="w-10 h-10" />
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-ishes-dark tracking-tight">Commencez votre voyage</h2>
           <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
             Rejoignez notre cursus gratuit et découvrez les clés d'une vie spirituelle épanouie.
           </p>
           <div className="pt-6">
              <Link 
                href="/inscription" 
                className="px-12 py-6 bg-ishes-green text-white font-black text-xl rounded-2xl shadow-2xl hover:bg-ishes-green-hover transition-all"
              >
                Inscription Gratuite
              </Link>
           </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-white overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "spiritualité musulmane", "éducation de l'âme", "paix intérieure islam", "5 piliers de l'islam", 
            "6 piliers de la foi", "ishes spiritualité", "cours islam gratuit", "éveil spirituel"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "spiritualité musulmane", "éducation de l'âme", "paix intérieure islam", "5 piliers de l'islam", 
            "6 piliers de la foi", "ishes spiritualité", "cours islam gratuit", "éveil spirituel"
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
