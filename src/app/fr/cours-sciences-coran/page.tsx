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
  History,
  ShieldCheck,
  FileText,
  GraduationCap,
  MessageCircle,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoursSciencesCoranPage() {
  const chapters = [
    "Les Sciences du Coran : définition, naissance et développement",
    "La Révélation du Coran (Wahiy)",
    "L'assemblage du Coran à travers les âges",
    "L'arrangement du Coran (Sourates & Versets)",
    "La graphie du Coran (Rasm al-Mashaf)",
    "La science du Mecquois et du Médinois",
    "Les récits du Coran (Qisas)",
    "Les serments dans le Coran",
    "Les causes de la Révélation (Asbab an-Nuzul)",
    "Les 7 harf (variantes) de la Révélation",
    "Les lectures et les lecteurs (Al Qira-at)",
    "Al-Mouhkam et Al-Moutachabih",
    "L'inimitabilité (I’jaz) du Coran",
    "L'exégèse et les exégètes (Tafsir)",
    "La traduction du Coran",
    "Les versets abrogeants et abrogés (Nasikh wal-Mansukh)"
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
                <span className="text-ishes-green">Sciences du Coran</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <History className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Histoire & Transmission du Texte Sacré
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                La passionnante <br />
                <span className="text-ishes-green italic">histoire du Coran</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ADULTE
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Module de 5 mois</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">Distanciel uniquement</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Public Adulte Francophone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">En direct sur Zoom</span>
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
                  src="https://www.youtube.com/embed/NGiWynfi1ac" 
                  title="Sciences du Coran"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRESENTATION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-ishes-dark tracking-tight">Présentation du module</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  Ce cours est dédié aux étudiants francophones qui souhaitent comprendre comment le Coran a été révélé, retranscrit, compilé, arrangé et transmis jusqu'à nous par voies écrite et orale.
                </p>
                <div className="p-6 bg-ishes-green/5 rounded-3xl border border-ishes-green/10">
                   <p className="text-ishes-dark font-bold">
                     Il permet d'acquérir des connaissances fondamentales et impératives pour mieux comprendre le Livre d'Allah.
                   </p>
                </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                  <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Contenu Pédagogique</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                  {chapters.map((chapter, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-1 group-hover:bg-ishes-green group-hover:border-ishes-green transition-all">
                        <span className="text-[10px] font-black text-gray-400 group-hover:text-white">{i + 1}</span>
                      </div>
                      <span className="text-gray-700 font-bold leading-snug">{chapter}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="bg-[#101828] text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-green/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-ishes-green/40 transition-all duration-500" />
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-ishes-green" />
                    <h3 className="text-lg font-black uppercase tracking-widest">Infos Pratiques</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-ishes-green" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 font-black uppercase tracking-widest">Public</p>
                        <p className="text-lg font-bold">Adultes francophones</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-ishes-green" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 font-black uppercase tracking-widest">Pré-requis</p>
                        <p className="text-lg font-bold">Aucun</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-ishes-green" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 font-black uppercase tracking-widest">Horaires</p>
                        <p className="text-lg font-bold">Dimanche 9h30 — 10h30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-ishes-green" />
                  <h3 className="text-lg font-black text-ishes-dark uppercase tracking-widest">Examen & Diplôme</h3>
                </div>
                <p className="text-gray-500 font-bold leading-relaxed">
                  Une évaluation à la fin du module sera donnée avec la délivrance d’un diplôme de l'Institut ISHES (pour une note supérieure à 10/20), attestant de la validation du module.
                </p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                  <span className="text-ishes-green font-black text-2xl">DIPLÔME ISHES</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── OBJECTIVES ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black text-ishes-dark">Objectifs de fin d'étude</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Ce que vous maîtriserez après ces 5 mois d'apprentissage intensif.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <History className="w-8 h-8" />, 
                title: "Contexte Historique", 
                desc: "Mieux appréhender le contexte de la révélation et le rôle des compagnons." 
              },
              { 
                icon: <ShieldCheck className="w-8 h-8" />, 
                title: "Préservation du Texte", 
                desc: "Comprendre les méthodologies pour préserver le Livre Saint de toute falsification." 
              },
              { 
                icon: <FileText className="w-8 h-8" />, 
                title: "Retranscription & Unité", 
                desc: "Apprécier la manière dont le Coran a été unifié pour souder la communauté." 
              }
            ].map((obj, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                <div className="w-16 h-16 bg-ishes-green/5 text-ishes-green rounded-2xl flex items-center justify-center mb-8 group-hover:bg-ishes-green group-hover:text-white transition-colors">
                  {obj.icon}
                </div>
                <h3 className="text-xl font-black text-ishes-dark mb-4">{obj.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-white rounded-[4rem] p-12 md:p-20 text-center border border-gray-100 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-ishes-green" />
             <div className="space-y-10 relative z-10">
                <h3 className="text-2xl md:text-4xl font-black text-ishes-dark italic leading-tight">
                  « En vérité c'est Nous qui avons fait descendre le Coran, <br />
                  et c'est Nous qui en sommes gardien. »
                </h3>
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">— Sourate Al-Hijr, verset 9</p>
                <div className="text-3xl md:text-5xl font-arabic text-ishes-green leading-relaxed">
                  إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#101828] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ishes-green/5 blur-3xl rounded-full" />
            <div className="relative z-10 space-y-10">
              <div className="w-20 h-20 bg-ishes-green rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-ishes-green/40 rotate-6 hover:rotate-0 transition-transform duration-500">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Prêt à découvrir <br /> l'histoire du Coran ?
              </h2>
              <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
                Rejoignez notre prochain module de 5 mois et transformez votre regard sur le texte sacré.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/inscription" 
                  className="px-12 py-6 bg-white text-ishes-dark font-black text-xl rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  S'inscrire maintenant
                </Link>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                   <Heart className="w-5 h-5 text-ishes-green" />
                   <span className="text-sm font-black uppercase tracking-widest">On vous rappelle</span>
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
            "al aqida", "lecture et récitation du coran", "sciences du coran", "histoire du coran", 
            "révélation coranique", "compilation du coran", "tafsir coran", "miracle du coran"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "al aqida", "lecture et récitation du coran", "sciences du coran", "histoire du coran", 
            "révélation coranique", "compilation du coran", "tafsir coran", "miracle du coran"
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
