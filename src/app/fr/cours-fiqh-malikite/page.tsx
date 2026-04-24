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
  Scale,
  ShieldCheck,
  BookMarked,
  Sparkles,
  MessageCircle,
  Heart,
  Zap,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function FiqhMalikitePage() {
  const chapters = [
    { title: "Kitab At-Tahara", desc: "Étude approfondie de la purification : l'eau, les ablutions (Woudou), le Ghousl et le Tayammoum." },
    { title: "Kitab As-Salah", desc: "Les piliers, obligations et sounnan de la prière. La prière en groupe et le voyageur." },
    { title: "Kitab Az-Zakat", desc: "Comprendre les règles de l'aumône légale et ses bénéficiaires." },
    { title: "Kitab As-Siyam", desc: "Le jeûne du Ramadan : conditions, annulations et compensations." },
    { title: "Kitab Al-Hajj", desc: "Introduction aux rites du pèlerinage à la Maison Sacrée d'Allah." }
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
                <span className="text-ishes-green">Fiqh Mâlikite</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Scale className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Jurisprudence & Pratique
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Maîtrisez votre <br />
                <span className="text-ishes-green italic">pratique religieuse</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/inscription" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95"
                >
                  S'INSCRIRE AU CURSUS
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest text-nowrap">Étude du Matn Ibn Achir</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap text-nowrap">Droit Mâlikite Authentique</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Uniquement à distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cursus de 9 mois</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 flex flex-col justify-center items-center gap-8 relative overflow-hidden group text-center text-nowrap">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <BookMarked className="w-24 h-24 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-black text-ishes-dark italic">"Celui à qui Allah veut du bien, <br /> Il lui accorde la compréhension de la religion."</h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Hadith rapporté par Al-Boukhari</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAM SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-ishes-dark tracking-tight uppercase">Le socle de votre adoration</h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  L'étude du Fiqh (jurisprudence) est une obligation pour tout musulman afin de pratiquer ses actes d'adoration conformément aux prescriptions divines.
                </p>
                <div className="grid gap-4">
                   <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <ShieldCheck className="w-6 h-6 text-ishes-green" />
                      <span className="font-bold text-gray-700">Apprentissage des preuves (Dala'il)</span>
                   </div>
                   <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <Zap className="w-6 h-6 text-ishes-green" />
                      <span className="font-bold text-gray-700">Focus sur la pratique quotidienne</span>
                   </div>
                </div>
              </div>
              <div className="space-y-8 bg-ishes-green/5 p-12 rounded-[3rem] border border-ishes-green/10">
                 <h3 className="text-xl font-black text-ishes-dark uppercase tracking-widest">Le Matn Ibn Achir</h3>
                 <p className="text-gray-500 font-medium leading-relaxed">
                   Ce poème didactique est la référence incontournable pour débuter l'étude du Fiqh Mâlikite. Il résume avec clarté et précision les piliers de la religion.
                 </p>
                 <Link href="/inscription" className="inline-flex items-center gap-2 text-ishes-green font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                    Découvrir le programme complet <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>
           </div>

           <div className="space-y-12">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-ishes-green rounded-full" />
                <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-tight text-nowrap">Chapitres étudiés</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chapters.map((chap, idx) => (
                  <div key={idx} className="bg-white p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full -mr-12 -mt-12 group-hover:bg-ishes-green/5 transition-colors" />
                    <h4 className="text-lg font-black text-ishes-dark mb-4 uppercase tracking-tight">{chap.title}</h4>
                    <p className="text-gray-500 font-bold leading-relaxed text-sm">{chap.desc}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── SCHEDULE & INFO ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
             <div className="lg:col-span-7 bg-white rounded-[3rem] p-12 md:p-16 border border-gray-100 shadow-sm space-y-10 flex flex-col justify-center">
                <div className="flex items-center gap-4">
                   <Star className="w-8 h-8 text-ishes-green" />
                   <h3 className="text-2xl font-black text-ishes-dark uppercase tracking-widest">Points Forts</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Pédagogie</p>
                      <p className="text-ishes-dark font-bold leading-relaxed">Explications claires et structurées adaptées aux francophones.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Interactivité</p>
                      <p className="text-ishes-dark font-bold leading-relaxed">Temps dédié aux questions-réponses à chaque fin de cours.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Supports</p>
                      <p className="text-ishes-dark font-bold leading-relaxed">Envoi des schémas récapitulatifs après chaque chapitre.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Replay</p>
                      <p className="text-ishes-dark font-bold leading-relaxed">Accès illimité aux enregistrements des séances.</p>
                   </div>
                </div>
             </div>

             <div className="lg:col-span-5 bg-[#101828] text-white rounded-[3rem] p-12 md:p-16 space-y-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-ishes-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 space-y-10">
                   <div className="flex items-center gap-4">
                      <Calendar className="w-8 h-8 text-ishes-green" />
                      <h3 className="text-2xl font-black uppercase tracking-widest">Informations</h3>
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Fréquence</p>
                         <p className="text-3xl font-black">1 Cours / Semaine</p>
                      </div>
                      <div className="w-full h-px bg-white/10" />
                      <div className="space-y-2">
                         <p className="text-ishes-green font-black uppercase tracking-widest text-[10px]">Règlement</p>
                         <p className="text-3xl font-black italic">10x sans frais</p>
                         <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Soit 34.90 € / mois</p>
                      </div>
                   </div>
                   <Link 
                     href="/inscription" 
                     className="block w-full bg-ishes-green text-white py-5 rounded-2xl font-black text-center hover:bg-ishes-green-hover transition-all"
                   >
                     M'inscrire maintenant
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto space-y-10">
           <div className="w-20 h-20 bg-ishes-green/10 text-ishes-green rounded-3xl flex items-center justify-center mx-auto">
             <MessageCircle className="w-10 h-10" />
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-ishes-dark tracking-tight">Adorez Allah avec science.</h2>
           <p className="text-xl text-gray-500 font-medium">
             Ne laissez plus de place au doute dans votre prière et votre jeûne. Rejoignez notre promotion pour une année de savoir structuré.
           </p>
           <div className="pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-gray-50 text-ishes-dark px-10 py-5 rounded-2xl font-black hover:bg-gray-100 transition-all border border-gray-100"
              >
                Poser une question
                <ChevronRight className="w-5 h-5 text-ishes-green" />
              </Link>
           </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-white overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "fiqh malikite", "droit musulman", "matn ibn achir", "ecole imam malik", 
            "jurisprudence priere", "regles du jeune", "zakat malikite", "ishes fiqh"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "fiqh malikite", "droit musulman", "matn ibn achir", "ecole imam malik", 
            "jurisprudence priere", "regles du jeune", "zakat malikite", "ishes fiqh"
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
