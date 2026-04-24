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
  Zap,
  Target,
  ShieldCheck,
  ZapOff,
  Star,
  GraduationCap,
  Sparkles,
  BookMarked,
  MessageCircle,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoursTajwidIntensifPage() {
  const [activeTab, setActiveTab] = useState('program');

  const fathRahman = [
    "Introduction à la science du Tajwid",
    "Lettres de l'alphabet & prononciations",
    "Basmalah & Isti’edha",
    "Tafkhim & Tarqiq (Emphase)",
    "Fatha, Dhamma, Kasra",
    "Med Tabi’y (Allongements)",
    "Soukoun, Qalqala & Hams",
    "Tanwin (Doublement)",
    "Shaddah (Dédoublement)",
    "Med Moutasil & Mounfasil",
    "Lem Qamariya & Chamsiya"
  ];

  const fathRabbani = [
    "Règles du Noun Sakina & Tanwin",
    "Règles du Mim Sakina",
    "Mim & Noun Mouchedded",
    "Différents types de Moudoud",
    "Al-Mutamathilayn / Mutajanissayn",
    "Al-Mutaqaribayn / Mutabaa’idain",
    "Al-Idgham (Assimilation)",
    "Ghunna (Nasalisation)",
    "Les lettres ل et ر",
    "La Hamza al-Wasl"
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-orange-500">Tajwid Intensif</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-orange-500/10 rounded-full shadow-sm mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                  Devenez Autonome en seulement 3 mois
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Le défi <br />
                <span className="text-orange-500 italic">Tajwid Intensif</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-orange-500/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ADULTE
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Gagnez 2 ans d'étude</p>
                   <p className="text-orange-500 text-lg font-black italic text-nowrap">Seulement 3 mois</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">3 fois / semaine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">8 élèves max / classe</span>
                </div>
                <a href="https://www.youtube.com/@institutishes" target="_blank" className="flex items-center gap-2 group">
                  <svg className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-red-600 transition-colors">Voir la vidéo</span>
                </a>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[600px] h-[400px] bg-white rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
               <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/-iK_W9Pm3DE" 
                  title="Tajwid Intensif"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENTS ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-black text-ishes-dark tracking-tight uppercase">Un engagement mutuel</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto italic">
              "Destiné à toutes les personnes de bonne volonté mais overbookées."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Our Engagement */}
            <div className="bg-[#101828] text-white rounded-[3rem] p-10 md:p-16 space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
               <div className="space-y-4">
                 <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center mb-6">
                   <ShieldCheck className="w-6 h-6" />
                 </div>
                 <h3 className="text-3xl font-black uppercase">Notre engagement</h3>
                 <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Ce que nous vous garantissons</p>
               </div>
               <ul className="space-y-6">
                 {[
                   "8 élèves maximum par classe",
                   "3 séances en ligne par semaine",
                   "Disponibilité hors heures de cours",
                   "Tous les chapitres du Tajwid vus",
                   "Certificat par professeur diplômé"
                 ].map((eng, i) => (
                   <li key={i} className="flex items-center gap-4 group">
                     <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors">
                       <CheckCircle2 className="w-4 h-4 text-orange-500 group-hover:text-white" />
                     </div>
                     <span className="font-bold text-white/80">{eng}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Your Engagement */}
            <div className="bg-orange-500 text-white rounded-[3rem] p-10 md:p-16 space-y-10 shadow-2xl shadow-orange-500/20">
               <div className="space-y-4">
                 <div className="w-12 h-12 bg-white text-orange-500 rounded-xl flex items-center justify-center mb-6">
                   <Target className="w-6 h-6" />
                 </div>
                 <h3 className="text-3xl font-black uppercase">Votre engagement</h3>
                 <p className="text-white/20 font-bold uppercase tracking-widest text-xs">La clé de votre succès</p>
               </div>
               <ul className="space-y-6">
                 {[
                   "Présence à toutes les leçons",
                   "Exercices faits en temps et en heure",
                   "Participation aux examens",
                   "Volonté et rigueur constante",
                   "Rattrapage immédiat en cas d'absence"
                 ].map((eng, i) => (
                   <li key={i} className="flex items-center gap-4 group">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                       <CheckCircle2 className="w-4 h-4 text-white" />
                     </div>
                     <span className="font-bold text-white">{eng}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING SAVINGS ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
           <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-gray-100 shadow-xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />
              <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Star className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-ishes-dark">Économisez du temps & de l'argent</h2>
              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-gray-500 font-bold leading-relaxed">
                  Un cursus classique de 3 ans coûte en moyenne 560€. <br />
                  Nous vous proposons de condenser ces 3 années en <span className="text-orange-500 underline decoration-2 underline-offset-4">seulement 3 mois</span>.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
                   <div className="space-y-2">
                     <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Prix Session</p>
                     <p className="text-5xl font-black text-ishes-dark tracking-tight">500 €</p>
                   </div>
                   <div className="w-px h-12 bg-gray-100 hidden md:block" />
                   <div className="space-y-2">
                     <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Frais Inscription</p>
                     <p className="text-3xl font-black text-gray-400">30 €</p>
                   </div>
                </div>
                <div className="bg-orange-500/5 p-6 rounded-2xl border border-orange-500/10">
                   <p className="text-orange-600 font-black text-lg italic">"Le temps a énormément plus de valeur que l'argent."</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* ─── PROGRAM ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-ishes-dark uppercase tracking-tight">Le Programme</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Méthode Nour Al Bayan & Fath Rabbani</p>
            </div>
            <div className="hidden sm:flex bg-gray-100 p-1.5 rounded-2xl">
               <button 
                  onClick={() => setActiveTab('program')}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'program' ? 'bg-white text-orange-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Chapitres
               </button>
               <button 
                  onClick={() => setActiveTab('pedagogy')}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'pedagogy' ? 'bg-white text-orange-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Pédagogie
               </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
             <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'program' ? (
                    <motion.div 
                      key="program"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid md:grid-cols-2 gap-12"
                    >
                      <div className="space-y-8">
                         <div className="flex items-center gap-3">
                           <BookMarked className="w-6 h-6 text-orange-500" />
                           <h4 className="text-xl font-black uppercase tracking-tight">Support Fath Rahman</h4>
                         </div>
                         <div className="space-y-4">
                           {fathRahman.map((item, i) => (
                             <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                               <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40 group-hover:bg-orange-500 group-hover:scale-150 transition-all" />
                               <span className="text-gray-700 font-bold text-sm">{item}</span>
                             </div>
                           ))}
                         </div>
                      </div>

                      <div className="space-y-8">
                         <div className="flex items-center gap-3">
                           <Sparkles className="w-6 h-6 text-orange-500" />
                           <h4 className="text-xl font-black uppercase tracking-tight">Support Fath Rabbani</h4>
                         </div>
                         <div className="space-y-4">
                           {fathRabbani.map((item, i) => (
                             <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                               <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40 group-hover:bg-orange-500 group-hover:scale-150 transition-all" />
                               <span className="text-gray-700 font-bold text-sm">{item}</span>
                             </div>
                           ))}
                         </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="pedagogy"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-12"
                    >
                       <div className="grid sm:grid-cols-2 gap-8">
                          {[
                            { title: "Bilingue", desc: "Cours dispensé en français et en arabe pour une immersion totale." },
                            { title: "Correction Directe", desc: "Écoute attentive et correction personnalisée de votre prononciation." },
                            { title: "Pratique Réelle", desc: "Exercices d'ordre pratique à travers les versets du Saint Coran." },
                            { title: "Accompagnement", desc: "Programme de mémorisation et de lecture hebdomadaire par élève." }
                          ].map((p, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                               <h5 className="text-lg font-black text-ishes-dark">{p.title}</h5>
                               <p className="text-gray-500 font-bold leading-relaxed text-sm">{p.desc}</p>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#101828] text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/30 transition-all duration-500" />
                   <div className="relative z-10 space-y-8 text-center">
                      <Calendar className="w-12 h-12 text-orange-500 mx-auto" />
                      <div className="space-y-2">
                         <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Session Hebdomadaire</p>
                         <p className="text-4xl font-black">Lundi</p>
                         <p className="text-orange-500 text-2xl font-black italic">19:00 — 21:00</p>
                      </div>
                      <p className="text-xs font-bold text-white/30 italic">+ 2 sessions interactives en semaine</p>
                   </div>
                </div>

                <div className="bg-orange-500 rounded-[3rem] p-10 text-white shadow-xl shadow-orange-500/20 text-center space-y-6">
                   <h4 className="text-2xl font-black">Prêt à relever le défi ?</h4>
                   <p className="text-white/80 font-bold text-sm leading-relaxed">
                     Rejoignez un petit groupe de 8 personnes et maîtrisez le Tajwid en un temps record.
                   </p>
                   <Link 
                     href="/inscription" 
                     className="block w-full bg-white text-orange-500 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                   >
                     M'inscrire au cursus
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-[#fafafa] overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "cours de tajwid intensif", "apprendre le coran rapidement", "autonomie coran", "nour al bayan", 
            "tajwid al coran", "cours coran adulte en ligne", "prononciation coran", "institut ishes"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "cours de tajwid intensif", "apprendre le coran rapidement", "autonomie coran", "nour al bayan", 
            "tajwid al coran", "cours coran adulte en ligne", "prononciation coran", "institut ishes"
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
