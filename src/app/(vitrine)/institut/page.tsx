"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, GraduationCap, Users, Calendar, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArabicBackground } from "@/components/ArabicBackground";
import Image from "next/image";

const presentielCourses = [
  {
    title: "LANGUE ARABE",
    audience: "Adultes & Enfants",
    desc: "Apprenez à parler, lire et écrire l'arabe littéraire dans des classes à taille humaine propices à l'échange.",
    schedule: "Mercredi & Samedi"
  },
  {
    title: "CORAN & TAJWID",
    audience: "Tous niveaux",
    desc: "Perfectionnez votre récitation en présentiel avec des enseignants qualifiés appliquant la méthode Nour Al Bayan.",
    schedule: "Samedi & Dimanche"
  },
  {
    title: "TARBYA ISLAMIYA",
    audience: "Enfants 6 - 15 ans",
    desc: "L'éveil spirituel et l'éthique musulmane transmis aux jeunes générations avec bienveillance et pédagogie active.",
    schedule: "Mercredi"
  }
];

export default function InstitutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-green selection:text-white">
      <Navbar />

      {/* --- HERO CINEMATIC --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <ArabicBackground />
        <div className="absolute inset-0">
          <Image 
            src="/images/campus.png" 
            alt="ISHES Institut Toulouse" 
            fill
            priority
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ishes-dark/70 via-ishes-dark/40 to-[#fafafa]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-[100px] font-black text-white leading-[0.95] tracking-tight mb-8 uppercase">
              L'INSTITUT <br />
              <span className="text-ishes-green italic">présentiel.</span>
            </h1>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Un lieu d'apprentissage privilégié à Toulouse pour approfondir vos connaissances et cheminer ensemble.
            </p>
            <a href="#formations" className="inline-flex items-center gap-3 bg-[#008953] text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-[#007044] transition-all hover:-translate-y-1 shadow-2xl shadow-[#008953]/20">
              Explorer nos cours
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- LE PÔLE PRÉSENTIEL --- */}
      <section className="py-24 relative overflow-hidden" id="formations">
        <ArabicBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-ishes-green font-black uppercase tracking-[0.25em] text-xs mb-4 block">Formations sur site</span>
            <h2 className="text-4xl md:text-6xl font-black text-ishes-dark leading-none tracking-tight mb-6 uppercase">
              L'excellence du savoir <br />
              <span className="text-ishes-green italic">en direct.</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Pour ceux qui privilégient le contact direct avec l'enseignant, l'émulation collective et la rigueur d'un cadre académique moderne.
            </p>
          </div>

          {/* Formations Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {presentielCourses.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-ishes-green uppercase tracking-widest bg-ishes-green/5 px-3 py-1 rounded-md">
                      {c.audience}
                    </span>
                    <GraduationCap className="w-6 h-6 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-black text-ishes-dark mb-4 tracking-tight uppercase">{c.title}</h3>
                  <p className="text-gray-500 font-bold leading-relaxed text-sm mb-6">{c.desc}</p>
                </div>
                
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-black text-ishes-dark">
                  <span className="uppercase tracking-wider opacity-40">Horaires</span>
                  <span className="italic text-ishes-green">{c.schedule}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- THE CALL TO VISIT --- */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ishes-dark rounded-[3.5rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-2xl">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
               <span className="absolute -top-10 -right-10 text-[280px] leading-none font-bold">ﷻ</span>
             </div>
             
             <div className="max-w-xl relative z-10 text-white">
                <span className="text-ishes-green font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Prendre rendez-vous</span>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8 uppercase">
                   NOTRE <br /> <span className="text-ishes-green italic">institut.</span>
                </h2>
                <p className="text-xl text-white/60 font-medium mb-12">
                   Situé au <strong className="text-white">41 Boulevard de Thibaud, 31100 Toulouse</strong>, notre espace de formation est ouvert sur rendez-vous.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                   <a 
                     href="https://maps.google.com/?q=41+Boulevard+de+Thibaud+31100+Toulouse" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="bg-[#008953] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#007044] transition-all hover:-translate-y-1 shadow-xl shadow-[#008953]/20 flex items-center justify-center gap-3"
                   >
                      Lancer l'itinéraire <MapPin className="w-4 h-4 text-white" />
                   </a>
                   <Link href="/contact" className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all flex items-center justify-center">
                      Réserver une visite
                   </Link>
                </div>
             </div>

             <div className="relative z-10 flex-1 grid grid-cols-2 gap-6 w-full lg:w-auto">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/5 text-white">
                   <h6 className="font-black text-ishes-green text-xs uppercase tracking-widest mb-6 opacity-80">Horaires d'ouverture</h6>
                   <ul className="space-y-4 text-xs font-bold text-white/80">
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>MERCREDI</span> <span className="italic text-ishes-green">14h — 17h</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>SAMEDI</span> <span className="italic text-ishes-green">9h — 12h<br/>13h30 — 16h30</span></li>
                      <li className="flex justify-between"><span>DIMANCHE</span> <span className="italic text-ishes-green">11h30 — 15h</span></li>
                   </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/5 text-white flex flex-col justify-between">
                   <Navigation className="w-8 h-8 text-ishes-green opacity-80" />
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">ACCÈS DIRECT</p>
                      <p className="text-base font-black leading-tight uppercase tracking-tight">Zone <br /> Thibaud</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
