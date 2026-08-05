"use client";

import { motion } from "framer-motion";
import { BookOpen, Building2, Monitor, Map, Users, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

export default function NotreHistoirePage() {
  const timeline = [
    { year: "2010", icon: BookOpen, title: <>Études des sciences religieuses Égypte<br/>Ouverture des premières classes de Coran et Tajwid enfants et adultes de l'Institut ISHES.</> },
    { year: "2013", icon: Building2, title: "Ouverture de l'école primaire musulmane Transmettre à Toulouse." },
    { year: "2020", icon: Monitor, title: "Ouverture de l'Institut ISHES à distance." },
    { year: "2022", icon: Map, title: "Enseignement des Sciences religieuses et spirituelles à distance." },
    { year: "Aujourd'hui", icon: Users, title: "Des milliers d'élèves formés et des centaines d'enseignants." },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-0">
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-[#fafafa]">
        <ArabicBackground />
        
        {/* Faded Background Image */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-70">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa]/90 to-transparent z-10 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent z-10" />
          
          <Image 
            src="/images/ai_medina.png" 
            alt="Médina"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-ishes-gold font-black uppercase tracking-widest text-xs block mb-4">NOTRE HISTOIRE</span>
            
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-ishes-dark leading-[1.05] tracking-tight mb-8">
              Tout a commencé par une <span className="text-ishes-gold">soif d’apprendre…</span>
            </h1>
            
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-px bg-ishes-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
            </div>

            <p className="text-lg text-[#3d4b60] font-medium leading-relaxed max-w-md">
              ISHES a été fondé par Oustadha Rachida et Oustadh Riad, un couple ayant parcouru le chemin de la recherche des sciences religieuses, avec la conviction qu’un savoir authentique transforme les cœurs avant de transformer les vies.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="pt-12 pb-24 bg-[#fcfaf7] relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-dark mb-24">16 années d'engagement et de développement</h2>
          
          <div className="relative">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-ishes-gold/30 z-0 origin-left"
            ></motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
              {timeline.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="flex flex-col items-center relative group"
                >
                  <div className="w-24 h-24 rounded-full bg-[#fdfaf5] border border-ishes-gold/30 shadow-md flex items-center justify-center text-ishes-gold mb-6 relative group-hover:bg-ishes-gold group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-8 h-8" />
                    <div className="absolute -bottom-[38px] w-4 h-4 bg-ishes-gold rounded-full border-[3px] border-[#fcfaf7] shadow-sm hidden md:block group-hover:scale-150 transition-transform duration-300"></div>
                  </div>
                  <h3 className="text-xl font-black text-ishes-gold mb-4 mt-6 md:mt-2 group-hover:text-ishes-dark transition-colors duration-300">{item.year}</h3>
                  <p className="text-sm text-gray-600 font-medium px-2 leading-relaxed">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Nos fondateurs</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
              <div className="w-12 h-px bg-ishes-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Oustedha Rachida */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#f9f5f0] rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col sm:flex-row h-full"
            >
              <div className="w-full sm:w-[45%] h-64 sm:h-auto relative shrink-0">
                <Image src="/images/OustedhaRahida.jpeg" alt="Oustedha Rachida" fill className="object-cover" />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center flex-1 bg-gradient-to-l from-[#f9f5f0] to-[#f4ebe1]/50">
                <h3 className="text-2xl font-black text-ishes-dark mb-1">Oustedha Rachida</h3>
                <div className="text-ishes-gold text-sm font-bold mb-8">Co-fondatrice & Directrice de l'Institut</div>
                <ul className="space-y-4">
                  {[
                    "Formatrice d'enseignants en Tarbiya Islamiya",
                    "Diplômée en sciences religieuses",
                    "Experte en accompagnement spirituel et éducatif"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-800 leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Oustedh Riad */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#f9f5f0] rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col sm:flex-row h-full"
            >
              <div className="w-full sm:w-[45%] h-64 sm:h-auto relative shrink-0">
                <Image src="/images/oustedhRyad.jpeg" alt="Oustedh Riad" fill className="object-cover" />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center flex-1 bg-gradient-to-l from-[#f9f5f0] to-[#f4ebe1]/50">
                <h3 className="text-2xl font-black text-ishes-dark mb-1">Oustedh Riad</h3>
                <div className="text-ishes-gold text-sm font-bold mb-8">Co-fondateur et Dirigeant</div>
                <ul className="space-y-4">
                  {[
                    "Formateur d’enseignant de Tajwid",
                    "Responsable communication",
                    "Spécialiste du Tajwid (IJAZA Jazaria)"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-800 leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL SECTION */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-ishes-dark">Un parcours commun, une vision partagée</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
              <div className="w-12 h-px bg-ishes-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
            </div>
          </div>
          
          <div className="rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-[45%] h-64 md:h-auto relative bg-gray-200">
              <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop" alt="Notre équipe" fill className="object-cover" />
            </div>
            <div className="w-full md:w-[55%] bg-[#0c1f2e] p-12 md:p-16 flex flex-col justify-center text-white relative overflow-hidden">
              <ArabicBackground />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">Une question sur notre institut ?</h3>
                <p className="text-white/80 font-medium mb-10 max-w-sm">Notre équipe est là pour t'accompagner et répondre à toutes tes questions.</p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Link href="https://wa.me/33666033519" target="_blank" className="bg-ishes-gold hover:bg-[#b0935b] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-3 w-full sm:w-auto justify-center">
                    <img src="/images/whatsapp-logo.avif" alt="WhatsApp" className="w-6 h-6 rounded-full object-cover" />
                    Nous contacter sur WhatsApp
                  </Link>
                  <span className="text-sm font-medium text-white/70">Réponse rapide et personnalisée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
