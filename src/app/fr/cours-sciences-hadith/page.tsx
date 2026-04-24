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
  ScrollText,
  ShieldCheck,
  Search,
  BookMarked
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoursSciencesHadithPage() {
  const curriculum = [
    {
      title: "Fondements de la Sunnah",
      items: ["Définition technique et terminologique", "Les parties de la Sunnah (paroles, actes, approbations)", "Source de législation et de pensée"]
    },
    {
      title: "Histoire & Transmission",
      items: ["Sunnah des Compagnons et d'Ahl-ul-bayt", "Enregistrement historique des Hadiths", "L'invention des hadiths et la lutte contre l'innovation"]
    },
    {
      title: "Sunnah & Coran",
      items: ["Rapport entre les deux sources", "Particularisation et restriction", "Abrogation et explication du global"]
    },
    {
      title: "Science du Rapporteur",
      items: ["Besoin de la science du rapporteur", "Al Jarh wal Ta'dil (Détraction et accréditation)", "Qualités et distinctions des rapporteurs"]
    },
    {
      title: "Classification & Analyse",
      items: ["Division du hadith (Unique/Multiple)", "Classification selon la chaîne (Morsal...)", "Résolution des oppositions apparentes"]
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
                <span className="text-ishes-green">Sciences du Hadith</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <BookMarked className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Préservation du Verbe Prophétique
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Les sciences <br />
                <span className="text-ishes-green italic">du Hadith</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ADULTE
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Cursus de 10 mois</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">Distanciel uniquement</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Public Adulte</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Direct interactif</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 flex flex-col justify-center items-center gap-8 relative overflow-hidden group text-center">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <ScrollText className="w-24 h-24 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <p className="text-xl text-gray-600 font-medium leading-relaxed italic">
                    "Découvrez comment la parole du dernier Messager d'ALLAH (ﷺ) est arrivée jusqu'à nous à travers les siècles."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DESCRIPTION SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-ishes-dark tracking-tight">Comprendre l'authenticité</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  La science du hadith est la discipline qui a pour intérêt la parole du prophète Mohamed (ﷺ). Nous découvrirons ensemble quelles sont les différentes catégories de hadith et également quels efforts nos grands savants ont déployé afin de préserver l'authenticité du verbe prophétique.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <ShieldCheck />, title: "Authenticité", desc: "Méthodes de vérification" },
                   { icon: <Award />, title: "Ijazah", desc: "Transmission certifiée" },
                   { icon: <Users />, title: "Rapporteurs", desc: "Étude des chaînes" },
                   { icon: <Search />, title: "Analyse", desc: "Critique scientifique" }
                 ].map((item, i) => (
                   <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-3">
                     <div className="text-ishes-green">{item.icon}</div>
                     <h4 className="font-black text-ishes-dark uppercase tracking-widest text-xs">{item.title}</h4>
                     <p className="text-gray-400 font-bold text-[10px]">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-12">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Programme détaillé</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {curriculum.map((section, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-ishes-green/5 text-ishes-green flex items-center justify-center mb-6 group-hover:bg-ishes-green group-hover:text-white transition-colors">
                      <span className="text-sm font-black">{idx + 1}</span>
                    </div>
                    <h4 className="text-lg font-black text-ishes-dark mb-6">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-ishes-green shrink-0 mt-1.5" />
                          <span className="text-sm text-gray-500 font-bold leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── INFO & SCHEDULE ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
             <div className="bg-[#101828] text-white rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-ishes-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 space-y-8">
                   <div className="flex items-center gap-4">
                      <Calendar className="w-8 h-8 text-ishes-green" />
                      <h3 className="text-2xl font-black uppercase tracking-widest">Horaire</h3>
                   </div>
                   <div className="space-y-2">
                      <p className="text-5xl font-black">Mardi</p>
                      <p className="text-ishes-green text-3xl font-black italic">19h30 — 20h30</p>
                   </div>
                   <p className="text-white/40 font-bold max-w-sm">
                     Cours hebdomadaire en direct sur notre plateforme. Replays disponibles pour chaque séance.
                   </p>
                </div>
             </div>

             <div className="bg-ishes-green rounded-[3rem] p-12 md:p-16 text-white text-center space-y-8 shadow-2xl shadow-ishes-green/20">
                <h3 className="text-4xl font-black tracking-tight">Besoin d'un renseignement ?</h3>
                <p className="text-white/80 font-bold text-lg leading-relaxed">
                  Nos conseillers sont disponibles pour répondre à toutes vos questions sur ce cursus de 10 mois.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <Link href="/contact" className="w-full sm:w-auto bg-white text-ishes-dark px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl">
                    Cliquez ici
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="font-black uppercase tracking-widest text-xs">On vous rappelle</span>
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
            "cours de récitation du coran", "histoire du coran", "sciences du hadith", "authentification hadith", 
            "boukhari muslim", "sunnah prophétique", "terminologie hadith", "jarh wa ta'dil"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "cours de récitation du coran", "histoire du coran", "sciences du hadith", "authentification hadith", 
            "boukhari muslim", "sunnah prophétique", "terminologie hadith", "jarh wa ta'dil"
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
