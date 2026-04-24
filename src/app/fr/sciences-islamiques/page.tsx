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
  Library,
  Compass,
  ScrollText,
  GraduationCap,
  Sparkles,
  MessageCircle,
  Star,
  Users,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SciencesIslamiquesPage() {
  const modules = [
    { title: "Fiqh Mâlikite", desc: "Apprendre les bases des actes d'adoration (Prière, Jeûne, Zakat) selon l'école de l'Imam Mâlik." },
    { title: "Sîrah", desc: "Étude de la vie du Prophète ﷺ pour en tirer des modèles de comportement et de spiritualité." },
    { title: "Arabe Littéraire", desc: "Initiation ou perfectionnement à la langue du Coran pour une compréhension directe." },
    { title: "Sciences du Coran", desc: "Comprendre l'histoire du texte sacré, sa révélation et sa transmission." },
    { title: "Al-'Aqîda", desc: "Ancrer sa foi à travers l'étude des fondements de la croyance sunnite." }
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
                <span className="text-ishes-green">Sciences Islamiques</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Library className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Un socle de savoir complet
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Le cursus des <br />
                <span className="text-ishes-green italic">fondamentaux</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-[#101828] text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                >
                  S'INSCRIRE AU CURSUS
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Cursus pluridisciplinaire</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">4 matières essentielles</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Public Adulte</span>
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
                  <ScrollText className="w-24 h-24 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-black text-ishes-dark">Savoir & Sagesse</h3>
                  <p className="text-gray-500 font-medium leading-relaxed italic">
                    "Un programme structuré pour acquérir une compréhension authentique et profonde de l'Islam."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULES GRID ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl font-black text-ishes-dark tracking-tight uppercase">Un programme complet</h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                Ce cursus regroupe les piliers du savoir islamique pour vous offrir une vision globale et cohérente.
              </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {modules.map((m, i) => (
               <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-ishes-green/10 text-ishes-green flex items-center justify-center mb-6 group-hover:bg-ishes-green group-hover:text-white transition-all">
                     <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-ishes-dark mb-4 uppercase tracking-tight">{m.title}</h4>
                  <p className="text-gray-500 font-bold leading-relaxed text-sm">{m.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* ─── HIGHLIGHT SECTION ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-xl border border-gray-100 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="flex items-center gap-4">
                    <Compass className="w-10 h-10 text-ishes-green" />
                    <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Pourquoi ce cursus ?</h3>
                 </div>
                 <p className="text-xl text-gray-500 font-medium leading-relaxed">
                   Beaucoup d'étudiants se perdent dans des apprentissages disparates. Les Sciences Islamiques à l'ISHES offrent une méthodologie rigoureuse et une progression logique.
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="w-6 h-6 text-ishes-green" />
                       <span className="font-bold text-gray-700">Enseignants diplômés des grandes universités</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="w-6 h-6 text-ishes-green" />
                       <span className="font-bold text-gray-700">Supports de cours exclusifs fournis</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="w-6 h-6 text-ishes-green" />
                       <span className="font-bold text-gray-700">Test d'évaluation en fin de module</span>
                    </div>
                 </div>
              </div>
              <div className="bg-[#101828] text-white rounded-[3rem] p-12 space-y-8">
                 <h4 className="text-2xl font-black italic">"Le savoir est une lumière qu'Allah place dans le cœur."</h4>
                 <div className="w-full h-px bg-white/10" />
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Durée</p>
                       <p className="text-2xl font-black">8 Mois</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Sessions</p>
                       <p className="text-2xl font-black">Direct Zoom</p>
                    </div>
                 </div>
                 <Link href="/inscription" className="block w-full bg-ishes-green text-white py-5 rounded-2xl font-black text-center shadow-xl shadow-ishes-green/20">
                    Réserver ma place
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-white overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "sciences islamiques", "fiqh", "sirah", "arabe", "aqida", "hadith", 
            "institut islamique france", "ishes savoir", "etudes islamiques adulte"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "sciences islamiques", "fiqh", "sirah", "arabe", "aqida", "hadith", 
            "institut islamique france", "ishes savoir", "etudes islamiques adulte"
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
