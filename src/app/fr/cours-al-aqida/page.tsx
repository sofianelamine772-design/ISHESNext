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
  ShieldCheck,
  Compass,
  ScrollText,
  Star,
  Library
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoursAlAqidaPage() {
  const program = [
    "La croyance en Allah ﷻ",
    "La croyance au Prophète Mohamed ﷺ",
    "La croyance au Saint Coran",
    "La croyance au monde invisible (Anges, Djinns...)",
    "La croyance à l'au-delà (Jour dernier)",
    "La croyance en la prédestination (Qadar)"
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
                <span className="text-ishes-green">Cours de 'Aqîda</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Compass className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Fondements de la Foi Musulmane
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                La foi sunnite <br />
                <span className="text-ishes-green italic">Al-'Aqîda</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  INSCRIPTION COURS ADULTE
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest">Enseignement à distance</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">Disponible immédiatement</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Samedi 12h00 — 13h00</span>
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
                  <h3 className="text-2xl font-black text-ishes-dark">Étude de la Tahawiya</h3>
                  <p className="text-gray-500 font-medium leading-relaxed italic">
                    "L'ouvrage indispensable pour celui qui veut connaître la foi sunnite de l'Islam."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-ishes-dark tracking-tight">Présentation du cours</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  L'imam Tahawi al-Hanafi est l'un des plus éminents savants de l'école juridique Hanafite. Son œuvre principale, <span className="text-ishes-green italic font-bold">El ‘Aqidatou at Tahawiya</span>, n'a cessé d'être commentée par les plus grands savants depuis le 4ème siècle de l'hégire.
                </p>
                <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                  <p className="text-gray-600 font-bold leading-relaxed">
                    Dans ce livre, l’imam explicite la croyance du musulman et l’impact des paroles et des actes sur sa foi. C'est un incontournable pour ancrer ses connaissances théologiques sur des bases authentiques.
                  </p>
                </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                  <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight">Programme d'étude</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {program.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all group">
                      <div className="w-8 h-8 rounded-xl bg-ishes-green/5 text-ishes-green flex items-center justify-center shrink-0 group-hover:bg-ishes-green group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 font-bold">{item}</span>
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
                      <Library className="w-6 h-6 text-ishes-green" />
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
                          <Calendar className="w-5 h-5 text-ishes-green" />
                        </div>
                        <div>
                          <p className="text-xs text-white/40 font-black uppercase tracking-widest">Horaires</p>
                          <p className="text-lg font-bold">Samedi 12h00 — 13h00</p>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="bg-ishes-green rounded-[3rem] p-10 text-white shadow-xl shadow-ishes-green/20 text-center space-y-6">
                  <h4 className="text-2xl font-black">Besoin d'aide ?</h4>
                  <p className="text-white/80 font-bold text-sm leading-relaxed">
                    Possibilité de régler jusqu'à 10x sans frais pour l'ensemble de nos cursus.
                  </p>
                  <Link 
                    href="/contact" 
                    className="block w-full bg-white text-ishes-green py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                    Contacter l'institut
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
            "la biographie du prophète", "histoire du coran", "la foi musulmane", "al-aqida", 
            "la tahawiya", "fondements de l'islam", "cours aqida en ligne", "ishes aqida"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "la biographie du prophète", "histoire du coran", "la foi musulmane", "al-aqida", 
            "la tahawiya", "fondements de l'islam", "cours aqida en ligne", "ishes aqida"
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
