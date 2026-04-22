"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Heart, Mail, ShieldCheck, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ConseilSpiritualitePage() {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-ishes-green selection:text-white pb-32">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-ishes-green/[0.03] to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#c8a96e]/10 text-[#c8a96e] rounded-full mb-8 border border-[#c8a96e]/20"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Accompagnement Spirituel</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-ishes-dark leading-[1.05] tracking-tight mb-8"
            >
              Éclairez votre <span className="text-ishes-green italic">cheminement</span> intérieur.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-500 font-medium leading-[1.8] max-w-3xl mx-auto"
            >
              L’Institut ISHES vous accompagne dans votre quête de sens. Nos conseillers en spiritualité musulmane sont à votre écoute pour vous aider à approfondir votre foi, peu importe vos interrogations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            
            {/* Left: SEO Text & Context */}
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-black text-ishes-dark mb-6 tracking-tight">Questions relatives à la spiritualité</h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                   La spiritualité musulmane est un voyage personnel qui nécessite parfois un éclairage extérieur. À l'Institut ISHES, nous croyons que chaque question mérite une réponse empreinte de bienveillance et de savoir. 
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-medium mt-4">
                   Que vous soyez confronté à des doutes, à une recherche de profondeur ou simplement au besoin de mieux structurer votre pratique quotidienne, nos enseignants sont présents pour vous orienter.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <BookOpen />, text: "Comment mieux comprendre les fondements de l'Islam ?" },
                  { icon: <Sparkles />, text: "Saisir le sens profond des adorations religieuses." },
                  { icon: <Heart />, text: "Améliorer sa pratique au quotidien pour qu'elle ait un sens." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-14 h-14 rounded-2xl bg-ishes-green/10 text-ishes-green flex items-center justify-center shrink-0 group-hover:bg-ishes-green group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <p className="text-lg font-bold text-ishes-dark leading-tight">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Card */}
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex"
            >
              <div className="bg-ishes-dark rounded-[3rem] p-10 md:p-16 text-white w-full flex flex-col justify-center relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-ishes-green opacity-10 rounded-full blur-[80px]" />
                
                <h3 className="text-3xl font-black mb-8 relative z-10 leading-tight">Obtenir un conseil <br /> par email</h3>
                
                <p className="text-gray-400 text-lg font-medium mb-10 relative z-10">
                  Vous pouvez contacter nos enseignants en spiritualité musulmane qui essaieront de vous orienter dans votre cheminement.
                </p>

                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-3 bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[16px] font-bold transition-all hover:scale-105 shadow-xl shadow-ishes-green/20 relative z-10 group"
                >
                  Contacter un conseiller
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="mt-12 flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 relative z-10">
                  <ShieldCheck className="w-6 h-6 text-ishes-green shrink-0 mt-1" />
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    Ces informations servent à répondre aux demandes des utilisateurs et ne sont pas utilisées ni transmises pour du démarchage.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FAQ / SEO BOTTOM --- */}
      <section className="bg-white py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <MessageCircle className="w-12 h-12 text-ishes-green mx-auto mb-8 opacity-20" strokeWidth={1} />
          <h2 className="text-3xl font-black text-ishes-dark mb-10 tracking-tight">Une écoute bienveillante</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h4 className="font-bold text-ishes-dark mb-4">Pourquoi demander conseil ?</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Le cheminement spirituel est un processus continu. Avoir un interlocuteur formé permet de mettre des mots sur ses ressentis et d'ajuster sa pratique de manière équilibrée et authentique.</p>
            </div>
            <div>
              <h4 className="font-bold text-ishes-dark mb-4">Confidentialité</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Toutes vos interrogations sont traitées avec la plus grande discrétion. Nos enseignants respectent une charte éthique de confidentialité absolue pour chaque étudiant.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
