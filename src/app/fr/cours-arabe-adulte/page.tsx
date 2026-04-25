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
  Languages,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const LEVELS_DATA = {
  debutant: {
    title: "NIVEAU DÉBUTANT",
    availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
    description: "Des cours pour adulte débutant avec comme objectif une initiation à la langue arabe moderne enseignée, écrite et lue dans tout le monde arabe. Idéal pour ceux qui partent de zéro.",
    objectives: [
      "Acquérir les bases du système graphique arabe",
      "Maîtrise de l'alphabet et des signes vocaliques",
      "Lecture de phrases faciles et de textes vocalisés",
      "Comprendre un message oral sur un sujet simple",
      "Parler de soi et de son entourage",
      "Écrire des expressions et des phrases sans modèle"
    ],
    grammar: [
      "Les verbes au passé",
      "Le pluriel",
      "L’annexion",
      "Les prépositions",
      "Les démonstratifs",
      "Le féminin et le masculin"
    ],
    pedagogy: [
      "Exercices de lecture et d'écriture intensifs",
      "Mise en place de réflexes de lecture fluide",
      "Exercices de prononciation avec correction",
      "Apprentissage du vocabulaire contextuel"
    ],
    prerequisites: [
      "Pour les débutants complets",
      "Aucune connaissance préalable requise"
    ],
    schedules: {
      presentiel: [
        "Cours femme : Samedi de 9h à 10h30",
        "Cours homme : Dimanche de 12h à 13h"
      ],
      distance: [
        "Cours femme : Jeudi de 19h30 à 20h30",
        "Cours homme : Vendredi de 19h à 20h",
        "Note : Les cours seront enregistrés"
      ]
    }
  },
  "niveau1-2": {
    title: "NIVEAUX 1 ET 2",
    availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
    description: "Ces cours de niveau intermédiaire, destinés aux adultes qui ont déjà des bases, permettent d'approfondir leurs connaissances et d'entrer dans la pratique de la langue.",
    objectives: [
      "Acquérir du vocabulaire de la vie courante",
      "Maîtriser les nombres et les prépositions de lieu",
      "Tenir une conversation sur des sujets quotidiens",
      "Former des phrases grammaticalement correctes",
      "Maîtriser l’orthographe et les règles de base",
      "Maîtriser les verbes au singulier"
    ],
    grammar: [
      "Les verbes au singulier",
      "Le pluriel des mots",
      "Les prépositions",
      "Les nombres",
      "Notions de grammaire simples"
    ],
    pedagogy: [
      "Cours dispensé totalement en arabe",
      "Exercices de dialogue prof-élèves",
      "Révisions constantes du vocabulaire",
      "Utilisation du livre 'Al Arabiya Bayna Yadayk'"
    ],
    prerequisites: [
      "Connaître l'alphabet arabe",
      "Avoir des bases en lecture et écriture",
      "Avoir les acquis du niveau débutant"
    ],
    schedules: {
      presentiel: [
        "Cours femme : Samedi de 9h à 12h",
        "Cours homme : Dimanche de 10h à 11h"
      ],
      distance: [
        "Cours femme Niv.1 : Jeudi 19h30-20h30",
        "Cours femme Niv.2 : Mardi 18h30-20h",
        "Cours homme Niv.1 : Vendredi 20h10-21h10"
      ]
    }
  },
  "niveau3-4": {
    title: "NIVEAUX 3 ET 4",
    availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
    description: "Cours de langue arabe de niveau avancé pour renforcer ses connaissances et maîtriser les règles essentielles de grammaire, lecture et écriture complexe.",
    objectives: [
      "Tenir une conversation fluide sur différents thèmes",
      "Connaissance des règles essentielles de grammaire",
      "Maîtriser les verbes au singulier et au pluriel",
      "Produire des expressions écrites structurées",
      "Lire un livre simple traitant d’un thème donné",
      "Comprendre un discours simple en arabe"
    ],
    grammar: [
      "Les verbes au singulier et pluriel",
      "Le verbe 'mâdi' sous ses six formes",
      "Notions de grammaire avancées"
    ],
    pedagogy: [
      "Immersion totale en langue arabe",
      "Amélioration de la syntaxe et de la prononciation",
      "Attention particulière sur les tournures de phrases",
      "Utilisation du livre 'Al Arabiya Bayna Yadayk'"
    ],
    prerequisites: [
      "Maîtrise de la lecture et de l'écriture",
      "Avoir les acquis du niveau intermédiaire"
    ],
    schedules: {
      presentiel: [
        "Cours femme : Samedi de 9h à 12h",
        "Cours homme : Mercredi 18h-20h & Samedi 17h-20h"
      ],
      distance: [
        "Cours femme Niv.3 : Lundi de 20h à 21h30"
      ]
    }
  },
  "niveau5": {
    title: "NIVEAUX 5 ET +",
    availability: "DISPONIBLE EN PRÉSENTIEL UNIQUEMENT",
    description: "Cours de niveau supérieur pour obtenir un niveau courant et maîtriser des règles complexes, incluant l'analyse du Coran et les sciences de l'éloquence.",
    objectives: [
      "Tenir une conversation en arabe courant",
      "Analyse grammaticale du Coran et de textes",
      "Notions de base en sciences du Sarf et Balagha",
      "Lire n'importe quel livre religieux ou général",
      "Produire des écrits complexes et structurés",
      "Comprendre des discours thématiques profonds"
    ],
    grammar: [
      "Les verbes au moudari’",
      "Les masdar des verbes",
      "Sciences du Sarf (déclinaison)",
      "Notions de grammaire complexes"
    ],
    pedagogy: [
      "Exercices à la maison avec correction détaillée",
      "Focus sur l'expression orale et écrite avancée",
      "Analyse de textes littéraires et religieux",
      "Utilisation avancée de 'Al Arabiya Bayna Yadayk'"
    ],
    prerequisites: [
      "Excellentes bases en grammaire et lecture",
      "Avoir les acquis du niveau avancé"
    ],
    schedules: {
      presentiel: [
        "Cours femme : Samedi de 9h à 12h",
        "Cours homme : Jeudi 18h-20h & Samedi 15h-17h"
      ],
      distance: null
    }
  }
};

export default function CoursArabeAdultePage() {
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
                <span className="text-[#c8a96e]">Cours arabe adulte</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#c8a96e]/10 rounded-full shadow-sm mb-2">
                <Languages className="w-4 h-4 text-[#c8a96e]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#c8a96e]">
                  Langue Arabe Moderne & Littéraire
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Apprendre <span className="text-[#c8a96e]">l'arabe</span> <br />
                <span className="text-[#c8a96e] italic">pour les adultes</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-[#c8a96e] hover:bg-[#c8a96e]-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-[#c8a96e]/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION ENFANT & ADULTE
                </Link>
                <div className="text-center lg:text-left">
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
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#c8a96e]" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mixte Homme / Femme</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-[#c8a96e]/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#c8a96e]" />
                  <Languages className="w-32 h-32 text-[#c8a96e]/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-black text-ishes-dark">Méthode Communicative</h3>
                    <p className="text-gray-500 font-medium">Une approche basée sur l'échange et la pratique réelle de la langue.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { icon: <MessageSquare className="w-4 h-4" />, text: "Oral" },
                      { icon: <BookOpen className="w-4 h-4" />, text: "Écrit" },
                      { icon: <Award className="w-4 h-4" />, text: "Grammaire" },
                      { icon: <Users className="w-4 h-4" />, text: "Dialogues" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-[#c8a96e]">{item.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{item.text}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEVEL SELECTOR ─── */}
      <section className="py-2 bg-white sticky top-[80px] lg:top-[76px] z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center min-w-max gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
            {[
              { id: 'debutant', label: 'DÉBUTANT' },
              { id: 'niveau1-2', label: 'NIVEAUX 1 & 2' },
              { id: 'niveau3-4', label: 'NIVEAUX 3 & 4' },
              { id: 'niveau5', label: 'NIVEAUX 5 +' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof LEVELS_DATA)}
                className={`px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#c8a96e] shadow-lg shadow-black/5 ring-1 ring-gray-100' 
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
          transition={{ duration: 0.4 }}
          className="py-24 px-6 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-7 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">
                    <Info className="w-3.5 h-3.5" /> {currentLevel.availability}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-ishes-dark tracking-tight">{currentLevel.title}</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    {currentLevel.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#c8a96e] rounded-full" />
                        <h3 className="text-xl font-black text-ishes-dark uppercase tracking-tight">Objectifs</h3>
                      </div>
                      <ul className="space-y-4">
                        {currentLevel.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#c8a96e] shrink-0 mt-0.5" />
                            <span className="text-gray-700 font-bold leading-relaxed">{obj}</span>
                          </li>
                        ))}
                      </ul>
                   </div>

                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-amber-400 rounded-full" />
                        <h3 className="text-xl font-black text-ishes-dark uppercase tracking-tight">Grammaire</h3>
                      </div>
                      <ul className="space-y-4">
                        {currentLevel.grammar.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2" />
                            <span className="text-gray-700 font-bold leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>

                <div className="bg-gray-50 rounded-[3rem] p-10 md:p-14 border border-gray-100">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-1.5 h-8 bg-[#c8a96e] rounded-full" />
                    <h3 className="text-xl font-black text-ishes-dark uppercase tracking-tight">Pédagogie</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {currentLevel.pedagogy.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                          <span className="text-xs font-black text-[#c8a96e]">{i + 1}</span>
                        </div>
                        <p className="text-sm text-gray-500 font-bold leading-relaxed">{item}</p>
                      </div>
                    ))}
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

                <div className="bg-[#c8a96e] rounded-[3rem] p-10 text-white shadow-xl shadow-[#c8a96e]/20">
                   <h4 className="text-2xl font-black mb-4">Rejoignez-nous</h4>
                   <p className="text-white/80 font-bold text-sm mb-8 leading-relaxed">
                     L'apprentissage d'une langue est un voyage. Commencez le vôtre avec une méthode éprouvée et une communauté bienveillante.
                   </p>
                   <Link 
                     href="/inscription" 
                     className="block w-full text-center bg-white text-[#c8a96e] py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                   >
                     S'inscrire
                   </Link>
                </div>
              </div>

            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 bg-[#fafafa] border-t border-gray-100">
         <div className="max-w-3xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-4xl font-black text-ishes-dark">Besoin d'un renseignement ?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link href="/contact" className="w-full sm:w-auto bg-ishes-dark text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#c8a96e] transition-all shadow-xl">
                  Cliquez ici
               </Link>
               <div className="flex items-center gap-3 px-8 py-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#c8a96e] animate-pulse" />
                  <span className="font-black text-ishes-dark uppercase tracking-widest">On vous rappelle</span>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
