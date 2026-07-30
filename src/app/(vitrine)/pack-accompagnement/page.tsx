"use client";

import { motion } from "framer-motion";
import { Users, Heart, TrendingUp, ShieldCheck, MessageCircle, BookOpen, Scale, Calendar, Video, FileCheck, Phone, Mail, Gift, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

const heroFeatures = [
  { icon: Users, title: "Une communauté bienveillante", desc: "Avancez entouré et motivé" },
  { icon: Heart, title: "Un soutien au quotidien", desc: "Des réponses, des conseils et des rappels utiles" },
  { icon: TrendingUp, title: "Une motivation constante", desc: "Pour pratiquer, progresser et rester sur le droit chemin" },
  { icon: ShieldCheck, title: "Une connexion à l'essentiel", desc: "Rappels, spiritualité et bonnes actions" }
];

const includedFeatures = [
  { icon: MessageCircle, title: "Groupe WhatsApp exclusif", desc: "Intégrez un groupe privé bienveillant avec les apprenants et l'équipe pédagogique." },
  { icon: BookOpen, title: "Enseignements réguliers", desc: "Des rappels, conseils et enseignements sur les actualités et la pratique religieuse." },
  { icon: Scale, title: "Réponses juridiques", desc: "Posez vos questions, recevez des réponses claires de nos enseignants qualifiés." },
  { icon: Heart, title: "Motivation au quotidien", desc: "Des messages inspirants pour vous encourager à pratiquer les bonnes actions." },
  { icon: Calendar, title: "Calendrier musulman", desc: "Rappels des dates importantes, événements et bonnes actions du calendrier islamique." },
  { icon: Video, title: "Lives exclusifs", desc: "Des sessions en direct sur des thématiques de spiritualité musulmane." }
];

const steps = [
  { icon: FileCheck, title: "Vous vous inscrivez à une formation", desc: "Le Pack Accompagnement est automatiquement inclus avec votre inscription." },
  { icon: Users, title: "Vous êtes ajouté(e) au groupe WhatsApp", desc: "Recevez toutes les informations et commencez à bénéficier des rappels et conseils." },
  { icon: MessageCircle, title: "Vous posez vos questions et échangez", desc: "Nos enseignants et la communauté répondent et vous soutiennent au quotidien." },
  { icon: Video, title: "Vous participez aux lives", desc: "Assistez aux sessions en direct et approfondissez votre spiritualité." },
  { icon: TrendingUp, title: "Vous progressez chaque jour", desc: "Restez motivé, entouré et avancez vers vos objectifs avec constance." }
];

export default function PackAccompagnementPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-blue selection:text-white pb-0">
      {/* HERO SECTION */}
      <section className="relative pt-44 pb-32 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-[#fafafa] to-[#f4eee6]">
        <ArabicBackground />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-ishes-gold font-black uppercase tracking-widest text-sm mb-4 block">
                Inclus avec chaque inscription
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-ishes-dark leading-[1.1] tracking-tight mb-6">
                Le Pack Accompagnement ISHES, <span className="text-ishes-gold italic font-serif">inclus avec chaque formation.</span>
              </h1>
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-lg">
                Un accompagnement annuel exclusif d'une valeur de 399 € pour ne jamais cheminer seul dans la quête de la science et de la proximité d'Allah.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
            >
              {heroFeatures.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-ishes-gold/20 flex items-center justify-center text-ishes-gold">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-black text-ishes-dark leading-tight">{feat.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-snug">{feat.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-md mx-auto"
          >
            {/* Phone Mockup with floating elements */}
            <div className="relative z-10 bg-white p-4 rounded-[40px] shadow-2xl border-4 border-gray-100 flex flex-col h-[500px]">
              {/* Phone Header */}
              <div className="bg-ishes-dark text-white rounded-3xl p-4 flex items-center gap-3 shadow-md mb-4 shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Image src="/icon.png" alt="ISHES" width={24} height={24} className="rounded-full" />
                </div>
                <div>
                  <div className="font-bold text-sm">ISHES Accompagnement</div>
                  <div className="text-xs text-white/70">En ligne</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 px-2 no-scrollbar">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-700 font-medium">
                    <span className="font-bold text-ishes-dark block mb-1">Rappel du jour</span>
                    La meilleure des actions est celle qui dure, même si elle est petite. 🌱
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-ishes-gold/20 flex items-center justify-center text-ishes-gold shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="bg-[#fdfaf5] border border-ishes-gold/20 rounded-2xl rounded-tl-none p-3 text-sm text-gray-700 font-medium w-full shadow-sm">
                    <span className="font-bold text-ishes-gold block mb-1">Calendrier musulman</span>
                    1 Dhou al-Hijjah 1445
                  </div>
                </div>

                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="bg-ishes-blue text-white rounded-2xl rounded-tr-none p-3 text-sm font-medium">
                    Qu'Allah accepte nos œuvres.
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-700 font-medium">
                    <span className="font-bold text-ishes-dark block mb-1">Question juridique</span>
                    Réponse de notre enseignant concernant votre question...
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="mt-4 bg-gray-50 rounded-full py-3 px-4 flex items-center gap-2 border border-gray-100 shrink-0">
                <Search className="w-4 h-4 text-gray-400" />
                <div className="text-sm text-gray-400 font-medium flex-1">Message...</div>
              </div>
            </div>

            {/* Value Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 z-20 bg-ishes-dark text-white p-8 rounded-3xl shadow-2xl border border-white/10 max-w-[200px]">
              <div className="text-xs font-black uppercase tracking-widest text-ishes-gold mb-2">Valeur réelle</div>
              <div className="text-5xl font-black mb-4">399 €</div>
              <div className="text-sm font-medium leading-snug">INCLUS POUR 1 AN avec chaque inscription à une formation</div>
              <div className="mt-6 w-12 h-12 rounded-full border border-ishes-gold/30 flex items-center justify-center mx-auto text-ishes-gold">
                <Gift className="w-6 h-6" />
              </div>
            </div>
            
            <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-gradient-to-tr from-ishes-gold/20 to-transparent blur-3xl rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* 6 FEATURES GRID */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-16">
            Tout ce qui est inclus dans votre Pack Accompagnement
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {includedFeatures.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-8 border-2 border-transparent hover:border-ishes-gold/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-ishes-dark text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ishes-gold transition-all duration-300">
                  <feat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-ishes-dark mb-3">{feat.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER COMMUNITY */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto bg-ishes-dark rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl">
          <ArabicBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-ishes-dark via-ishes-dark/95 to-transparent z-0"></div>
          
          <div className="relative z-10 flex-1 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
              Vous n'êtes pas seul.<br />
              <span className="text-ishes-gold italic">Vous faites partie d'une communauté qui vous élève.</span>
            </h2>
            <p className="text-lg text-white/80 font-medium leading-relaxed">
              ISHES vous accompagne dans votre cheminement avec des enseignants à l'écoute et une communauté unie autour de la science et de la pratique.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <div className="w-32 h-32 rounded-full border border-ishes-gold/30 bg-white/5 flex items-center justify-center text-ishes-gold backdrop-blur-md">
              <Users className="w-12 h-12" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-20">Comment ça fonctionne ?</h2>
          
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-gray-300 z-0"></div>
            
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-24 h-24 rounded-full bg-white shadow-xl border-4 border-[#fafafa] flex items-center justify-center text-ishes-gold mb-6 relative">
                    <step.icon className="w-10 h-10" />
                    <div className="absolute -bottom-3 bg-ishes-dark text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-ishes-dark mb-3 leading-tight">{step.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed px-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REINSURANCE BOX */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex items-center gap-6 md:w-1/2">
            <div className="w-24 h-24 rounded-full bg-ishes-dark text-white flex items-center justify-center shrink-0">
              <Gift className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-ishes-dark mb-2 leading-tight">Un accompagnement d'une valeur de 399 €, offert avec chaque formation.</h3>
              <p className="text-gray-500 font-medium">Parce que votre réussite est notre mission.</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-32 bg-gray-100"></div>
          
          <div className="md:w-1/2 w-full">
            <div className="text-sm font-black text-ishes-gold uppercase tracking-widest mb-6">Déjà inclus, sans frais supplémentaires</div>
            <ul className="space-y-4">
              {["1 an d'accompagnement", "Accès immédiat après votre inscription", "Renouvelé tant que vous restez inscrit à une formation"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-ishes-dark shrink-0" />
                  <span className="text-gray-700 font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="absolute top-8 right-8 text-ishes-gold opacity-20 hidden lg:block">
            <BadgeCheck className="w-32 h-32" />
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 px-6 mb-12">
        <div className="max-w-5xl mx-auto bg-ishes-dark rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <ArabicBackground />
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-ishes-gold shrink-0">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Une question ? Besoin d'aide ?</h3>
              <p className="text-white/70 font-medium text-sm max-w-md">Notre équipe est là pour vous accompagner avant, pendant et après votre formation.</p>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link 
              href="https://wa.me/33621430935" 
              target="_blank"
              className="flex items-center justify-center gap-3 bg-ishes-gold hover:bg-[#b0935b] text-white px-6 py-4 rounded-xl font-bold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Nous contacter sur WhatsApp
            </Link>
            <Link 
              href="mailto:contact@ishes.fr" 
              className="flex items-center justify-center gap-3 bg-transparent hover:bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl font-bold transition-colors"
            >
              <Mail className="w-5 h-5" />
              Nous écrire par email
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
