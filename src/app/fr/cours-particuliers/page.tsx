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
  Target,
  UserCheck,
  Star,
  Sparkles,
  MessageCircle,
  Heart,
  Quote,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CoursParticuliersPage() {
  const features = [
    {
      title: "Programme Personnalisé",
      desc: "Un cursus créé sur-mesure pour répondre à vos besoins spécifiques et vos objectifs personnels.",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Enseignants Qualifiés",
      desc: "Des professeurs expérimentés travaillant individuellement avec chaque étudiant.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Rythme Adapté",
      desc: "Un calendrier convenu à l'avance qui s'adapte parfaitement à votre emploi du temps.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Certification",
      desc: "Délivrance d'un certificat à la fin de la formation validant vos acquis en Tajwid.",
      icon: <Award className="w-6 h-6" />
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
                <span className="text-ishes-green">Cours Particuliers</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ishes-green/10 rounded-full shadow-sm mb-2">
                <Users className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  Accompagnement Individuel VIP
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Cours de Coran <br />
                <span className="text-ishes-green italic">Particuliers</span>.
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto bg-[#101828] text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                >
                  DEMANDER UN DEVIS
                </Link>
                <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm font-black text-ishes-dark uppercase tracking-widest text-nowrap">Adultes & Enfants</p>
                   <p className="text-ishes-green text-lg font-black italic text-nowrap">À partir de débutant</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Uniquement à distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-ishes-green" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Programme 100% sur-mesure</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 flex flex-col justify-center items-center gap-8 relative overflow-hidden group text-center">
                  <div className="absolute top-0 left-0 w-full h-2 bg-ishes-green" />
                  <Sparkles className="w-24 h-24 text-ishes-green/20 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-black text-ishes-dark">Excellence & Proximité</h3>
                  <p className="text-gray-500 font-medium leading-relaxed italic">
                    "Une expérience d'apprentissage unique, centrée sur votre progression et votre épanouissement spirituel."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl font-black text-ishes-dark tracking-tight uppercase">Pourquoi choisir le particulier ?</h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                L'apprentissage individuel permet de lever les blocages plus rapidement et de progresser à votre propre rythme.
              </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {features.map((f, i) => (
               <div key={i} className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="text-ishes-green mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h4 className="text-lg font-black text-ishes-dark mb-4 uppercase tracking-tight">{f.title}</h4>
                  <p className="text-gray-500 font-bold leading-relaxed text-sm">{f.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* ─── CONTENT DETAILS ─── */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-xl border border-gray-100 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="w-16 h-16 bg-ishes-green/10 text-ishes-green rounded-2xl flex items-center justify-center">
                    <Quote className="w-8 h-8 rotate-180" />
                 </div>
                 <h2 className="text-4xl font-black text-ishes-dark leading-tight">Apprenez le Coran avec les meilleurs.</h2>
                 <p className="text-xl text-gray-500 font-medium leading-relaxed">
                   Vous cherchez à apprendre les règles du Tajwid pour vous permettre de lire le Noble Coran ? Nos cours sont destinés aux adultes et enfants de tous niveaux.
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="w-6 h-6 text-ishes-green shrink-0" />
                       <span className="font-bold text-gray-700">Dès le niveau débutant absolu</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="w-6 h-6 text-ishes-green shrink-0" />
                       <span className="font-bold text-gray-700">Préparation aux examens et Ijazas</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <CheckCircle2 className="w-6 h-6 text-ishes-green shrink-0" />
                       <span className="font-bold text-gray-700">Suivi rigoureux par WhatsApp</span>
                    </div>
                 </div>
              </div>
              <div className="bg-[#101828] rounded-[3rem] p-12 text-white relative overflow-hidden group">
                 <div className="absolute inset-0 bg-ishes-green/5 blur-3xl rounded-full scale-150 group-hover:bg-ishes-green/10 transition-colors" />
                 <div className="relative z-10 space-y-8">
                    <h3 className="text-3xl font-black">Prêt à commencer ?</h3>
                    <p className="text-white/60 font-medium leading-relaxed">
                      Contactez-nous dès maintenant pour organiser avec l'enseignant votre parcours d'apprentissage personnalisé.
                    </p>
                    <div className="pt-4">
                       <Link 
                         href="/contact" 
                         className="flex items-center justify-center gap-3 bg-ishes-green text-white py-5 rounded-2xl font-black text-lg hover:bg-ishes-green-hover transition-all shadow-xl shadow-ishes-green/20"
                       >
                         <MessageCircle className="w-6 h-6" />
                         Demander un Devis
                       </Link>
                    </div>
                    <p className="text-[10px] text-white/30 text-center uppercase tracking-[0.2em] font-black">
                      Réponse sous 24h ouvrées
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* SEO MARQUEE */}
      <section className="py-8 bg-white overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "cours particuliers coran", "tajwid sur mesure", "professeur coran prive", "apprentissage individuel", 
            "devis cours coran", "cours coran enfant prive", "ishes cours particuliers", "tajwid excellence"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
          {/* Duplicate */}
          {[
            "cours particuliers coran", "tajwid sur mesure", "professeur coran prive", "apprentissage individuel", 
            "devis cours coran", "cours coran enfant prive", "ishes cours particuliers", "tajwid excellence"
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
