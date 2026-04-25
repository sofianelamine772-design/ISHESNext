"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Monitor, 
  Baby, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Calendar,
  Music,
  Gamepad2,
  Video,
  ChevronRight,
  Info,
  Users
} from 'lucide-react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';

export default function CoursArabeEnfantPage() {
  const [activeTab, setActiveTab] = useState('debutant');

  const levels = {
    debutant: {
      title: "NIVEAU DÉBUTANT",
      availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
      description: "Le cours de langue arabe pour enfant débutant se fait en immersion. Il permet de les familiariser à la langue et a pour but de leur faire aimer son apprentissage. Un test d'évaluation facultatif peut être réalisé en début d'année par l'enseignant(e) afin de déterminer le niveau d'apprentissage le plus adapté.",
      objectives: [
        "Apprentissage de l'alphabet arabe",
        "Les couleurs, les saisons, les chiffres (1 à 10), les 5 sens, les formes géométriques",
        "Thèmes : soi, l'école, la famille, la maison, la ville, la météo, la date",
        "Courtes douas et sourates du Coran"
      ],
      grammar: [
        "Règles de salutation et de politesse",
        "Sensibilisation aux pronoms personnels",
        "Les nombres (de 1 à 10)"
      ],
      pedagogy: [
        "Gagner la confiance des enfants et s'assurer de leur assiduité",
        "Les familiariser avec la langue arabe avec un vocabulaire simple, clair et court",
        "Favoriser les différentes facettes de la langue : écoute, écrit, oral, etc.",
        "Apprentissage de l’alphabet à travers des coloriages et des jeux",
        "Utilisation de supports de cours : manuels, vidéos-projections, etc.",
        "Enseignement en utilisant certains principes de la méthode Montessori"
      ],
      prerequisites: [
        "Enseignement présentiel : à partir de 4 ans",
        "Enseignement à distance : à partir de 7 ans",
        "Pour les débutants"
      ],
      schedules: {
        presentiel: [
          "Mercredi : 13h30 à 16h30",
          "Samedi : 9h à 12h OU 13h30 à 16h30",
          "Dimanche : 9h à 12h OU 13h30 à 16h30"
        ],
        distance: [
          "Arabe : Mardi de 18h30 à 19h30",
          "Tajwid : Jeudi de 18h30 à 19h30",
          "Note : Les cours seront enregistrés"
        ]
      }
    },
    "niveau1-2": {
      title: "NIVEAUX 1 ET 2",
      availability: "DISPONIBLE À DISTANCE ET EN PRÉSENTIEL",
      description: "Des cours pour consolider les bases acquises du niveau débutant et s'initier aux règles de grammaire, d'écriture et de lecture.",
      objectives: [
        "Consolider les bases de lecture et d'écriture (alphabet, signes vocaliques, règles de lecture, écriture des chiffres de 1 à 20)",
        "Parler de soi (se présenter, parler de son âge et sa nationalité)",
        "Comprendre un dialogue élémentaire",
        "Identifier des mots dans un énoncé",
        "Recopier des mots et des phrases écrites",
        "Mettre des mots et des phrases en ordre",
        "Écrire des mots et des phrases dictées",
        "Apprendre des chansons"
      ],
      grammar: [
        "La phrase simple",
        "Les verbes au présent du singulier",
        "Les pronoms personnels",
        "Les pronoms possessifs",
        "L'interrogatif",
        "Les nombres (de 1 à 20)"
      ],
      pedagogy: [
        "Exercices de lecture et d'écriture",
        "Exercices de prononciation avec correction",
        "Apprentissage du vocabulaire à partir des textes étudiés",
        "Utilisation de supports de cours : livre Granada niveau 1"
      ],
      prerequisites: [
        "Connaître l'alphabet arabe",
        "Avoir les acquis du niveau débutant"
      ],
      schedules: {
        presentiel: [
          "Mercredi : 13h30 à 16h30",
          "Samedi : 9h à 12h OU 13h30 à 16h30",
          "Dimanche : 9h à 12h OU 13h30 à 16h30"
        ],
        distance: [
          "Mardi de 18h30 à 19h30",
          "Note : Les cours seront enregistrés"
        ]
      }
    },
    "niveau3-4": {
      title: "NIVEAUX 3 ET 4",
      availability: "DISPONIBLE EN PRÉSENTIEL UNIQUEMENT",
      description: "Des cours avancés pour les enfants ayant des connaissances de l'arabe pour améliorer la pratique de l'oral, la lecture, l'écriture et la grammaire.",
      objectives: [
        "Savoir se présenter en faisant une brève synthèse",
        "Parler de ses goûts, de ses activités et de ses choix",
        "Comprendre un dialogue simple",
        "S’exprimer et prendre part à une discussion simple sur un sujet donné",
        "Lire à haute voix des expressions courantes",
        "Comprendre l’essentiel dans différents écrits simples et concis",
        "Remplir un questionnaire simple"
      ],
      grammar: [
        "Les verbes au passé, présent et futur",
        "Les pronoms personnels",
        "Les pronoms possessifs",
        "Les prépositions",
        "Les interrogatifs",
        "Les nombres",
        "La négation",
        "L’interpellation"
      ],
      pedagogy: [
        "Exercices de lecture et d'écriture",
        "Exercices de mise en situation proche de la vie de tous les jours",
        "Attention particulière sur l’intonation, le rythme, la prononciation et la vocalisation",
        "Apprentissage du vocabulaire et de la grammaire au fur et à mesure des cours"
      ],
      prerequisites: [
        "Connaître les bases de lecture et d'écriture",
        "Avoir les acquis du niveau intermédiaire"
      ],
      schedules: {
        presentiel: [
          "Niveau 3 : Samedi 9h-12h OU 13h30-16h30",
          "Niveau 4 : Samedi 13h30-16h30"
        ],
        distance: null
      }
    },
    niveau5: {
      title: "NIVEAUX 5 ET +",
      availability: "DISPONIBLE EN PRÉSENTIEL UNIQUEMENT",
      description: "Des cours supérieurs pour les enfants ayant des connaissances de l'arabe pour atteindre un niveau courant et améliorer la pratique de l'oral, la lecture, l'écriture et la grammaire.",
      objectives: [
        "Savoir présenter des personnes (famille, entourage, etc.)",
        "Parler de la vie quotidienne",
        "Décrire ses centres d’intérêts",
        "Comprendre un dialogue",
        "Lire et comprendre des textes simples",
        "Écrire des notes simples"
      ],
      grammar: [
        "La phrase verbale",
        "La phrase nominale",
        "Les verbes à tous les temps",
        "Le singulier, le pluriel et le duel",
        "Le masculin et féminin",
        "Le sujet, le COD et COI",
        "Les pronoms personnels"
      ],
      pedagogy: [
        "Exercices de lecture et d'écriture",
        "Exercices de mise en situation proche de la vie de tous les jours",
        "Attention particulière sur l’intonation, le rythme, la prononciation et la vocalisation",
        "Apprentissage du vocabulaire et de la grammaire au fur et à mesure des cours"
      ],
      prerequisites: [
        "Avoir des connaissances en lecture et écriture",
        "Avoir les acquis du niveau avancé"
      ],
      schedules: {
        presentiel: [
          "Dimanche de 13h30 à 16h30"
        ],
        distance: null
      }
    }
  };

  const currentLevel = levels[activeTab as keyof typeof levels];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white">
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#008953]/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <nav className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-ishes-green transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-ishes-green">Cours arabe enfant</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Baby className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Formation en arabe maternelle
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Cours d'arabe <br />
                <span className="text-ishes-green italic">pour les enfants</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link 
                  href="/inscription?plan=arabe_coran_junior" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ENFANT
                </Link>
                <div className="flex flex-col items-center sm:items-start">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">
                     Possibilité de régler
                   </p>
                   <p className="text-ishes-green text-lg font-black italic">
                     jusqu'à 10x sans frais
                   </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
                    <MapPin className="w-5 h-5 text-ishes-green" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Présentiel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
                    <Monitor className="w-5 h-5 text-ishes-green" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">À distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
                    <Clock className="w-5 h-5 text-ishes-green" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">3h / semaine</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <Baby className="w-32 h-32 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-black text-ishes-dark">Pédagogie Positive</h3>
                    <p className="text-gray-500 font-medium">Une méthode qui fait aimer la langue arabe à travers le jeu et l'immersion.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { icon: <Music className="w-4 h-4" />, text: "Chansons" },
                      { icon: <Gamepad2 className="w-4 h-4" />, text: "Jeux" },
                      { icon: <Video className="w-4 h-4" />, text: "Vidéos" },
                      { icon: <BookOpen className="w-4 h-4" />, text: "Manuels" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-ishes-green">{item.icon}</div>
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
      <section className="py-12 bg-white sticky top-20 z-40 border-b border-gray-100">
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
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-ishes-green shadow-lg shadow-black/5 ring-1 ring-gray-100' 
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
              
              {/* Left Column: Info & Objectives */}
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
                        <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                        <h3 className="text-xl font-black text-ishes-dark uppercase tracking-tight">Objectifs</h3>
                      </div>
                      <ul className="space-y-4">
                        {currentLevel.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-ishes-green shrink-0 mt-0.5" />
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
                    <div className="w-1.5 h-8 bg-[#008953] rounded-full" />
                    <h3 className="text-xl font-black text-ishes-dark uppercase tracking-tight">Pédagogie</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {currentLevel.pedagogy.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                          <span className="text-xs font-black text-ishes-green">{i + 1}</span>
                        </div>
                        <p className="text-sm text-gray-500 font-bold leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Prerequisites & Schedules */}
              <div className="lg:col-span-5 space-y-8">
                {/* Prerequisites Card */}
                <div className="bg-[#101828] text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-green/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-ishes-green/40 transition-all duration-500" />
                  
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-ishes-green" />
                      <h3 className="text-lg font-black uppercase tracking-widest">Prérequis</h3>
                    </div>
                    <ul className="space-y-4">
                      {currentLevel.prerequisites.map((p, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-ishes-green" />
                          <span className="text-white/80 font-bold">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Schedules Card */}
                <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-ishes-green" />
                    <h3 className="text-lg font-black text-ishes-dark uppercase tracking-widest">Horaires</h3>
                  </div>

                  <div className="space-y-8">
                    {currentLevel.schedules.presentiel && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ishes-green">
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

                    {currentLevel.schedules?.distance && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#101828]">
                          <Monitor className="w-3 h-3" /> À distance
                        </div>
                        <div className="space-y-3">
                          {(currentLevel.schedules.distance as string[]).map((s, i) => (
                            <div key={i} className={`p-4 rounded-2xl border border-gray-100 font-bold text-sm ${s.includes('Note') ? 'bg-amber-50 text-amber-700 italic border-amber-100' : 'bg-gray-50 text-gray-700'}`}>
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-ishes-green rounded-[3rem] p-10 text-white shadow-xl shadow-ishes-green/20">
                   <h4 className="text-2xl font-black mb-4">Réservez sa place</h4>
                   <p className="text-white/80 font-bold text-sm mb-8 leading-relaxed">
                     Les groupes sont limités à 12 enfants pour garantir une qualité d'apprentissage optimale.
                   </p>
                   <Link 
                     href="/inscription?plan=arabe_coran_junior" 
                     className="block w-full text-center bg-white text-ishes-green py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                   >
                     S'inscrire
                   </Link>
                </div>
              </div>

            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ─── FOOTER NOTE SECTION ─── */}
      <section className="py-24 bg-[#fafafa] border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-black text-ishes-dark">Pourquoi choisir l'ISHES pour votre enfant ?</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Nous ne nous contentons pas d'enseigner une langue. Nous transmettons un héritage, une culture et une identité avec bienveillance et rigueur. Nos professeurs sont formés spécifiquement aux besoins des jeunes apprenants.
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ishes-green/10 flex items-center justify-center text-ishes-green">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-700">Pédagogie certifiée CECRL</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ishes-green/10 flex items-center justify-center text-ishes-green">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-700">Accompagnement personnalisé</span>
                    </div>
                  </div>
               </div>
               <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">En savoir plus</p>
                  <p className="text-lg font-bold text-gray-700 leading-relaxed italic">
                    "NIVEAU DÉBUTANT DISPONIBLE À DISTANCE ET EN PRÉSENTIEL : Le cours de langue arabe pour enfant débutant se fait en immersion pour les familiariser à la langue."
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-ishes-green font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
                    Une question ? Contactez-nous <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
               </div>
            </div>
         </div>
      </section>

      <Navbar />
      <Footer />
    </div>
  );
}
