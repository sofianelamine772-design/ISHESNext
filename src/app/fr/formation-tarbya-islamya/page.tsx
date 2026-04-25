"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Monitor, 
  Baby, 
  BookOpen, 
  Award, 
  Heart,
  Sparkles,
  Calendar,
  ChevronRight,
  Info,
  Users,
  Search,
  MessageCircle,
  Theater,
  ScrollText,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TarbiyaIslamiyaPage() {
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
                <span className="text-ishes-green">Tarbiya Islamiya</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Heart className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Éducation à la Spiritualité Musulmane
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Préserver la <span className="text-ishes-green italic">Fitra</span> <br />
                de vos enfants.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription?plan=tarbiya_islamiya" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ENFANT
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Possibilité de régler</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">jusqu'à 10x sans frais</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">À distance uniquement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lundi 18h30 - 19h30</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <Sparkles className="w-32 h-32 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4 px-6">
                    <h3 className="text-2xl font-black text-ishes-dark italic">"Connaître son Créateur, l'aimer et vouloir Le satisfaire"</h3>
                    <p className="text-gray-500 font-medium">Une éducation du cœur pour un éveil spirituel durable.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Expert & Themes */}
            <div className="lg:col-span-7 space-y-16">
              <div className="bg-ishes-green/5 rounded-[3rem] p-8 md:p-12 border border-ishes-green/10 flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-24 h-24 bg-ishes-green rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-ishes-green/20 rotate-3">
                   <Award className="w-12 h-12 text-white" />
                 </div>
                 <div className="space-y-4 text-center md:text-left">
                   <h3 className="text-xl font-black text-ishes-dark uppercase tracking-tight">Une expertise reconnue</h3>
                   <p className="text-gray-600 font-medium leading-relaxed">
                     Cours enseigné par une professeure diplômée (Licence IESH Chateau Chinon), certifiée Nour Al Bayan et formée à la spiritualité à l'institut ARAB EL CORAN au Caire.
                   </p>
                 </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                  <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Thématiques abordées</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    "Adab El Majliss (règles et politesse)",
                    "Mérites et bienfaits des 5 piliers de l'Islam",
                    "Les 6 piliers de la foi et leur sens",
                    "Relation parents / enfants avec bienveillance",
                    "Évènements du calendrier (Ramadhan, Hajj...)",
                    "Hadiths sur le bon comportement (Adab)"
                  ].map((theme, i) => (
                    <div key={i} className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                      <div className="w-2 h-2 rounded-full bg-ishes-green group-hover:scale-150 transition-transform" />
                      <span className="text-gray-700 font-bold">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-amber-400 rounded-full" />
                  <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Pédagogie Active</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { icon: <BookOpen />, title: "Histoires racontées", desc: "Prophètes, Sahaba et Sira pour inspirer les enfants." },
                    { icon: <Theater />, title: "Mises en scène", desc: "Formes théâtrales pour incarner les valeurs apprises." },
                    { icon: <ScrollText />, title: "Sens profond", desc: "Aller au-delà de la forme pour toucher le cœur." },
                    { icon: <Users />, title: "Morale musulmane", desc: "Ancrer le comportement dans l'éthique prophétique." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h4 className="text-lg font-black text-ishes-dark">{item.title}</h4>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Practical Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#101828] text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-green/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-ishes-green" />
                    <h3 className="text-lg font-black uppercase tracking-widest">Prérequis</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-ishes-green" />
                      <span className="text-white/80 font-bold italic text-lg">À partir de 6 ans</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-ishes-green" />
                      <span className="text-white/80 font-bold">Niveaux Primaire / Collège</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-ishes-green" />
                  <h3 className="text-lg font-black text-ishes-dark uppercase tracking-widest">Horaire Unique</h3>
                </div>
                <div className="bg-ishes-green/5 p-8 rounded-3xl border border-ishes-green/10 text-center space-y-2">
                   <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Chaque semaine</p>
                   <p className="text-3xl font-black text-ishes-dark">Lundi</p>
                   <p className="text-ishes-green text-xl font-black">18h30 — 19h30</p>
                </div>
                <div className="flex items-center gap-2 justify-center text-xs font-bold text-gray-400 italic">
                  <Monitor className="w-4 h-4" /> Cours dispensés en ligne uniquement
                </div>
              </div>

              <div className="bg-ishes-green rounded-[3rem] p-10 text-white shadow-xl shadow-ishes-green/20 text-center space-y-6">
                 <h4 className="text-2xl font-black">Prêt à l'inscrire ?</h4>
                 <p className="text-white/80 font-bold text-sm leading-relaxed">
                   Offrez à votre enfant un cadre bienveillant pour s'épanouir spirituellement.
                 </p>
                 <Link 
                   href="/inscription?plan=tarbiya_islamiya" 
                   className="block w-full bg-white text-ishes-green py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                 >
                   Inscrire mon enfant
                 </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER SEO MARQUEE ─── */}
      <section className="py-8 bg-[#fafafa] overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "education des enfants", "école islamique france", "tarbiya islamiya", "spiritualité enfant", 
            "comportement musulman", "fitra enfant", "qisas el anbya", "histoire des prophètes"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate for loop */}
          {[
            "education des enfants", "école islamique france", "tarbiya islamiya", "spiritualité enfant", 
            "comportement musulman", "fitra enfant", "qisas el anbya", "histoire des prophètes"
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
