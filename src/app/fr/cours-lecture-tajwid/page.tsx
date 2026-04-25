"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Monitor, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Calendar,
  Video,
  ChevronRight,
  Info,
  Users,
  Heart,
  MessageCircle,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const LEVELS_DATA = {
  debutant: {
    title: "NIVEAU DÉBUTANT",
    availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
    description: "Les cours de Coran pour débutant servent d'introduction à la science du Tajwid et permettent d'acquérir une bonne prononciation des versets. Ces cours sont basés sur la méthode Nour Al Bayan, une pédagogie enseignée depuis plus de 16 ans. Nous ajoutons au cours de Tajwid un programme de Hifz des sourates Al Fatiha, ikhlass et Annas.",
    objectives: [
      "Introduction à la science du Tajwid",
      "Connaître les vertus d’apprendre et de réciter le Coran",
      "Apprendre à lire et réciter le Coran en langue arabe",
      "Apprentissage des lettres de l'alphabet arabe et leurs prononciations",
      "Lire des lettres et des mots avec fatha, dhamma et kasra",
      "El-isti’adhah et el-basmalah",
      "Sifat el-hourouf (traits distinctifs des sons arabes)",
      "Makharij el-hourouf (étude des points d'articulations)",
      "Tahaji (épellation), Shaddah, Tanwin",
      "Moudouds (allongement des voyelles)",
      "Règles de l'arrêt et l'enchainement",
      "Mémoriser et réciter la sourate el-Fatiha"
    ],
    pedagogy: [
      "Cours dispensé en français et en arabe",
      "Écoute et correction de la prononciation",
      "Exercices d’ordre pratique à travers le Coran",
      "Apprentissage adapté au niveau de l'élève",
      "Programme de mémorisation et de lecture hebdomadaire",
      "Lecture d'une page du Coran par semaine",
      "Enseignement par la méthode Nour Al Bayan",
      "Supports de cours : manuel Fath Arrahman"
    ],
    prerequisites: [
      "Pour les débutants",
      "Aucune connaissance préalable requise"
    ],
    schedules: {
      presentiel: [
        "Cours enfant : Dimanche de 11h00 à 12h00",
        "Cours femme : Samedi de 10h35 à 12h",
        "Cours homme : Dimanche de 11h à 12h",
        "Arabe & Tajwid Enfant : Mer/Sam/Dim (voir plus bas)"
      ],
      distance: [
        "Cours enfant : Jeudi de 18h30 à 19h30",
        "Cours femme : Vendredi de 18h30 à 19h30",
        "Cours homme : Vendredi de 20h15 à 21h15",
        "Note : Les cours seront enregistrés"
      ]
    }
  },
  "niveau1-2": {
    title: "NIVEAUX 1 ET 2",
    availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
    description: "Les cours de niveau intermédiaire ont pour objectifs d’approfondir les connaissances de lecture et de récitation du Coran en y introduisant des concepts clés. Basés sur la méthode Nour Al Bayan, ces cours garantissent des résultats considérables.",
    objectives: [
      "Apprendre à lire le Coran en arabe",
      "Rappel sur les vertus d’apprendre et de réciter le Coran",
      "Moufakhama (lettres emphatiques) et mouraqaqa (légères)",
      "Apprentissage du commencement, de l’arrêt et de la pause",
      "Apprendre les règles du noun sakina, mim sakina",
      "Moudouds (l'allongement des voyelles)",
      "Al-mutamaathilain, al-mutajaanisain, al-mutaqaaribain...",
      "Al-idgham (l'assimilation) et Ghunna (la nasalisation)",
      "Les lettres “lam” et “ra”",
      "La hamza al-wasl"
    ],
    pedagogy: [
      "Cours dispensé en français et en arabe",
      "Écoute et correction de la prononciation",
      "Correction individualisée à chaque séance",
      "Vérification de la non-régression des erreurs",
      "Lecture de 2 à 8 pages du Coran par semaine",
      "Enseignement par la méthode Nour Al Bayan",
      "Supports : manuel Fath Arrahman et Fath Arrabani"
    ],
    prerequisites: [
      "Avoir les acquis du niveau débutant",
      "Connaître les bases de lecture"
    ],
    schedules: {
      presentiel: [
        "Cours enfant : Dimanche de 11h00 à 12h00",
        "Cours femme : Samedi de 9h à 10h30",
        "Cours homme : Dimanche de 9h à 10h"
      ],
      distance: [
        "Cours enfant : Jeudi de 18h30 à 19h30",
        "Cours femme niv.1 : Lundi de 19h30 à 20h30",
        "Cours femme niv.2 : Vendredi de 18h30 à 19h30",
        "Cours homme : Vendredi de 19h10 à 20h10"
      ]
    }
  },
  "niveau3-4": {
    title: "NIVEAUX 3 ET 4",
    availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
    description: "Cours de Tajwid avancés destinés aux personnes souhaitant maîtriser la récitation Coranique, se perfectionner et transmettre leurs acquis (expliquer et corriger des personnes).",
    objectives: [
      "Maîtrise de la lecture du Coran en arabe",
      "Connaître les différents niveaux de lecture",
      "Notion sur l'assemblage du Saint Coran",
      "Approfondissement des acquis du Tajwid",
      "Statut juridique du el-isti'adhah et el-basmalah",
      "Makharijou el-hourouf (points d'articulation)",
      "Sifatou el-hourouf (les traits distinctifs des lettres)",
      "Arrêt et reprise de la lecture (symboles)"
    ],
    pedagogy: [
      "Exercices d’ordre pratique à travers le Coran",
      "Correction individualisée à chaque séance",
      "Vérification de la non-régression",
      "Lecture de 2 à 8 pages du Coran par semaine",
      "Supports avancés : Farid Ouyalize, Aymen Souaid",
      "Enseignement par la méthode Nour Al Bayan"
    ],
    prerequisites: [
      "Avoir les acquis du niveau intermédiaire",
      "Maîtrise fluide de la lecture"
    ],
    schedules: {
      presentiel: [
        "Cours adulte : Vendredi de 18h30 à 20h",
        "Cours enfant niv.3 : Samedi 9h-12h OU 13h30-16h30",
        "Cours enfant niv.4 : Samedi 13h30-16h30"
      ],
      distance: [
        "Cours femme : Vendredi de 18h45 à 19h30",
        "Cours homme : Vendredi de 19h10 à 20h10"
      ]
    }
  }
};

export default function CoursTajwidPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof LEVELS_DATA>('debutant');
  const currentLevel = LEVELS_DATA[activeTab];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#c8a96e] selection:text-white">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-6 px-6 overflow-hidden bg-[#fafafa]">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c8a96e]/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-[#c8a96e] transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#c8a96e]">Cours Tajwid</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#c8a96e]/10 rounded-full shadow-sm mb-2">
                <BookOpen className="w-4 h-4 text-[#c8a96e]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#c8a96e]">
                  Récitation & Science du Tajwid
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Cours de <span className="text-[#c8a96e]">récitation</span> <br />
                <span className="text-[#c8a96e] italic">du Coran</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <Link 
                    href="/inscription?plan=tajwid_standard" 
                    className="w-full bg-[#c8a96e] hover:bg-[#c8a96e]-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-[#c8a96e]/20 hover:-translate-y-1 active:scale-95 text-center"
                  >
                    INSCRIPTION ENFANT & ADULTE
                  </Link>
                  <div className="flex items-center justify-center lg:justify-start gap-4 px-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Users className="w-3 h-3" /> Pour tous les âges
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Search className="w-3 h-3" /> Test de niveau gratuit
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Possibilité de régler</p>
                   <p className="text-[#c8a96e] text-lg font-black italic text-nowrap">jusqu'à 10x sans frais</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#c8a96e]" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Présentiel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-[#c8a96e]" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">À distance</span>
                </div>
                <a href="https://www.youtube.com/@institutishes" target="_blank" className="flex items-center gap-2 group">
                  <svg className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-red-600 transition-colors">Nous suivre</span>
                </a>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[600px] h-[400px] bg-white rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
               <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/XqG1As5jHZA" 
                  title="ISHES Tajwid"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEVEL SELECTOR ─── */}
      <section className="py-2 bg-white sticky top-[80px] lg:top-[76px] z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center min-w-max gap-2 p-1 bg-gray-50 rounded-2xl">
            {[
              { id: 'debutant', label: 'DÉBUTANT' },
              { id: 'niveau1-2', label: 'NIVEAUX 1 & 2' },
              { id: 'niveau3-4', label: 'NIVEAUX 3 & 4' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof LEVELS_DATA)}
                className={`px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#c8a96e] shadow-lg ring-1 ring-gray-100' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEVEL CONTENT ─── */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="py-24 px-6 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-7 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    <Info className="w-3.5 h-3.5" /> {currentLevel.availability}
                  </div>
                  <h2 className="text-4xl font-black text-ishes-dark tracking-tight">{currentLevel.title}</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    {currentLevel.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#c8a96e] rounded-full" />
                        Objectifs
                      </h3>
                      <ul className="space-y-4">
                        {currentLevel.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#c8a96e] shrink-0 mt-0.5" />
                            <span className="text-gray-700 font-bold leading-relaxed">{obj}</span>
                          </li>
                        ))}
                      </ul>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#c8a96e] rounded-full" />
                        Pédagogie
                      </h3>
                      <ul className="space-y-4">
                        {currentLevel.pedagogy.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#c8a96e] shrink-0 mt-2" />
                            <span className="text-gray-700 font-bold leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="bg-[#101828] text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a96e]/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#c8a96e]/40 transition-all duration-500" />
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-[#c8a96e]" />
                      <h3 className="text-lg font-black uppercase tracking-widest">Prérequis</h3>
                    </div>
                    <ul className="space-y-4">
                      {currentLevel.prerequisites.map((p, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#c8a96e]" />
                          <span className="text-white/80 font-bold">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-[#c8a96e]" />
                    <h3 className="text-lg font-black text-ishes-dark uppercase tracking-widest">Horaires</h3>
                  </div>

                  <div className="space-y-8">
                    {currentLevel.schedules.presentiel && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c8a96e]">
                          <MapPin className="w-3 h-3" /> En présentiel
                        </div>
                        <div className="space-y-3">
                          {currentLevel.schedules.presentiel.map((s, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 font-bold text-gray-700 text-sm">
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentLevel.schedules.distance && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#101828]">
                          <Monitor className="w-3 h-3" /> À distance
                        </div>
                        <div className="space-y-3">
                          {currentLevel.schedules.distance.map((s, i) => (
                            <div key={i} className={`p-4 rounded-2xl border border-gray-100 font-bold text-sm ${s.includes('Note') ? 'bg-amber-50 text-amber-700 italic border-amber-100' : 'bg-gray-50 text-gray-700'}`}>
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ─── ARABE & TAJWID ENFANT SECTION ─── */}
      <section className="py-24 bg-[#fafafa] border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[4rem] p-12 md:p-20 border border-gray-100 shadow-xl shadow-gray-200/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a96e]/5 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8a96e]/10 text-[#c8a96e] rounded-full text-[10px] font-black uppercase tracking-widest">
                       Offre Spéciale Junior
                     </div>
                     <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-tight">
                       Arabe & Tajwid <br />
                       <span className="text-[#c8a96e] italic">pour enfant</span>.
                     </h2>
                     <p className="text-lg text-gray-500 font-medium leading-relaxed">
                        Un programme complet combinant l'apprentissage de la langue et de la récitation. Idéal pour une progression équilibrée et durable.
                     </p>
                     <Link href="/inscription?plan=arabe_coran_junior" className="inline-flex items-center gap-3 bg-[#c8a96e] text-white px-10 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c8a96e]/20">
                        Inscrire mon enfant
                     </Link>
                  </div>
                  <div className="grid gap-4">
                     <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Horaires disponibles</p>
                        <ul className="space-y-3">
                           {[
                             "Samedi : 9h00 - 12h00 OU 13h30 - 16h30",
                             "Dimanche : 9h00 - 12h00 OU 13h30 - 16h30",
                             "Mercredi : 13h30 - 16h30"
                           ].map((h, i) => (
                             <li key={i} className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                               <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
                               {h}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ─── CONTACT CALL SECTION ─── */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-[#101828] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#c8a96e]/5 blur-3xl rounded-full" />
               <div className="relative z-10 space-y-10">
                  <div className="w-20 h-20 bg-[#c8a96e] rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-[#c8a96e]/40 rotate-6 hover:rotate-0 transition-transform duration-500">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                    Besoin d'un <br /> renseignement ?
                  </h2>
                  <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
                    Nos conseillers pédagogiques sont à votre écoute pour vous orienter vers le meilleur programme.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link 
                      href="/contact" 
                      className="px-12 py-6 bg-white text-ishes-dark font-black text-xl rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      Cliquez ici
                    </Link>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                       <Heart className="w-5 h-5 text-[#c8a96e]" />
                       <span className="text-sm font-black uppercase tracking-widest">On vous rappelle</span>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SEO Keywords (Subtle) */}
      <section className="py-8 bg-white overflow-hidden opacity-20 hover:opacity-100 transition-opacity">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "livre tajwid", "tajwid al coran", "lecteur coranique", "apprendre à lire le coran", 
            "cours de tajwid en francais", "apprendre coran", "récitation coranique", "lecteurs de coran"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "livre tajwid", "tajwid al coran", "lecteur coranique", "apprendre à lire le coran", 
            "cours de tajwid en francais", "apprendre coran", "récitation coranique", "lecteurs de coran"
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
