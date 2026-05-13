"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, GraduationCap, Users, Calendar, ArrowRight, ShieldCheck, Sparkles, Clock, BookOpen, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArabicBackground } from "@/components/ArabicBackground";
import Image from "next/image";

const presentielPrograms = [
  {
    id: "tajwid_standard",
    title: "Tajwid (Standard)",
    subtitle: "Apprends à lire le Coran correctement en respectant les règles de Tajwid. Méthode progressive.",
    tagText: "STANDARD",
    tagColor: "bg-[#c8a96e]/10 text-[#c8a96e] border-[#c8a96e]/20",
    durationText: "8 mois",
    features: [
      "Lecture correcte",
      "Application des règles",
      "Fluidité & Prononciation",
      "Suivi WhatsApp"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-lecture-tajwid"
  },
  {
    id: "arabe_adulte",
    title: "Arabe Littéraire (Adulte)",
    subtitle: "Maîtrisez la langue arabe moderne, de l'alphabet à la conversation courante. Méthode immersive.",
    tagText: "LANGUE",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
    durationText: "9 mois",
    features: [
      "Lecture & Écriture",
      "Conversation réelle",
      "Grammaire & Syntaxe",
      "Immersion totale"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-arabe-adulte"
  },
  {
    id: "arabe_coran_junior",
    title: "Arabe & Coran Junior",
    subtitle: "Immersion totale et pédagogie active en présentiel pour les 6-15 ans à Toulouse.",
    tagText: "JUNIOR",
    tagColor: "bg-pink-50 text-pink-700 border-pink-100",
    durationText: "Annuel",
    features: [
      "Enseignement direct",
      "Activités ludiques",
      "Vie d'institut",
      "Ateliers pratiques"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-arabe-enfant"
  },
  {
    id: "tajwid_enfant",
    title: "Tajwid (Enfant)",
    subtitle: "Apprends à lire le Coran correctement dès le plus jeune âge. Méthode ludique.",
    tagText: "ENFANT",
    tagColor: "bg-[#c8a96e]/10 text-[#c8a96e] border-[#c8a96e]/20",
    durationText: "Annuel",
    features: [
      "Lecture correcte",
      "Pédagogie adaptée",
      "Mémorisation facile",
      "Suivi parents"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-arabe-enfant"
  }
];

export default function InstitutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-#c8a96e selection:text-white">
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
              <span className="text-[#c8a96e] italic">présentiel.</span>
            </h1>
            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Un lieu d'apprentissage privilégié à Toulouse pour approfondir vos connaissances et cheminer ensemble.
            </p>
            <a href="#formations" className="inline-flex items-center gap-3 bg-[#c8a96e] text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-[#b0935b] transition-all hover:-translate-y-1 shadow-2xl shadow-[#c8a96e]/20">
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
            <span className="text-#c8a96e font-black uppercase tracking-[0.25em] text-xs mb-4 block">Formations sur site</span>
            <h2 className="text-4xl md:text-6xl font-black text-ishes-dark leading-none tracking-tight mb-6 uppercase">
              L'excellence du savoir <br />
              <span className="text-#c8a96e italic">en direct.</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Pour ceux qui privilégient le contact direct avec l'enseignant, l'émulation collective et la rigueur d'un cadre académique moderne.
            </p>
          </div>

          {/* Formations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
            {presentielPrograms.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative flex flex-col rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#c8a96e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Overlay Link for the whole card - NOW TOP LAYER but below buttons */}
                <Link href={program.link} className="absolute inset-0 z-25 rounded-[2rem]" />
                
                <div className="p-5 sm:p-6 flex-1 flex flex-col relative">
                  {/* TAGS ROW */}
                  <div className="flex items-center justify-end mb-10 relative z-20">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <Clock className="w-3.5 h-3.5" /> {program.durationText}
                    </div>
                  </div>

                  {/* TITLE & DESC */}
                  <div className="relative z-20">
                    <h2 className="text-xl font-black text-[#152233] mb-2 tracking-tight leading-[1.1]">
                      {program.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 font-medium">
                      {program.subtitle}
                    </p>
                  </div>

                  {/* ICONS GRID */}
                  <div className="grid grid-cols-2 gap-6 mb-6 relative z-20">
                    <div className="flex items-center gap-3 group/icon">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-[#c8a96e]/10 transition-colors">
                        <Clock className="w-5 h-5 text-[#c8a96e]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">1h30/sem</span>
                    </div>
                    <div className="flex items-center gap-3 group/icon">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-[#c8a96e]/10 transition-colors">
                        <BookOpen className="w-5 h-5 text-[#c8a96e]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">Manuel inclus</span>
                    </div>
                    <div className="flex items-center gap-3 group/icon">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-[#c8a96e]/10 transition-colors">
                        <Users className="w-5 h-5 text-[#c8a96e]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">Max 12</span>
                    </div>
                    <div className="flex items-center gap-3 group/icon">
                      <div className="w-10 h-10 rounded-xl bg-ishes-dark flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#c8a96e]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Certifié</span>
                    </div>
                  </div>

                  {/* FEATURES LIST */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3 mb-6 relative z-20">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 py-1">
                        <div className="mt-1 w-4 h-4 rounded-full bg-[#c8a96e]/10 flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-3 h-3 text-[#c8a96e]" />
                        </div>
                        <span className="text-[11px] sm:text-xs text-gray-600 font-bold leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* PRICE & CTA */}
                  <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-gray-100 relative z-30">
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-black text-[#152233] tracking-tighter">{program.price}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {program.priceSub}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Link 
                        href={program.link}
                        className="flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 py-4.5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest"
                      >
                        En savoir plus
                      </Link>
                      <Link 
                        href={`/inscription?plan=${program.id}`}
                        className="flex items-center justify-center bg-[#c8a96e] text-white hover:bg-[#b0935b] py-4.5 rounded-2xl shadow-lg shadow-[#c8a96e]/20 transition-all font-black text-[10px] uppercase tracking-widest hover:-translate-y-1 active:scale-95"
                      >
                        S'inscrire
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- THE CALL TO VISIT & MAP --- */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-ishes-dark rounded-[3.5rem] p-4 md:p-8 flex flex-col lg:flex-row items-stretch gap-8 overflow-hidden relative shadow-2xl"
          >
             {/* Background Decoration */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
               <span className="absolute -top-10 -right-10 text-[400px] leading-none font-bold text-white">ﷻ</span>
             </div>
             
             {/* Content Column */}
             <div className="relative z-10 flex-1 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-[1px] bg-[#c8a96e]"></div>
                  <span className="text-[#c8a96e] font-black uppercase tracking-[0.3em] text-[10px]">Prendre rendez-vous</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8 uppercase">
                   NOTRE <br /> <span className="text-[#c8a96e] italic">institut.</span>
                </h2>

                <div className="space-y-6 mb-12">
                   <p className="text-xl text-white/60 font-medium">
                      Situé au <strong className="text-white">41 Boulevard de Thibaud, 31100 Toulouse</strong>, notre espace de formation est ouvert sur rendez-vous.
                   </p>
                   
                   {/* Opening Hours Minimalist */}
                   <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm max-w-md">
                      <div className="grid grid-cols-2 gap-4 text-[11px] font-bold tracking-wider uppercase">
                         <div className="text-white/40">Mercredi</div>
                         <div className="text-[#c8a96e] text-right">14h — 17h</div>
                         <div className="text-white/40">Samedi</div>
                         <div className="text-[#c8a96e] text-right">9h — 12h / 13h30 — 16h30</div>
                         <div className="text-white/40">Dimanche</div>
                         <div className="text-[#c8a96e] text-right">11h30 — 15h</div>
                      </div>
                   </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                   <a 
                     href="https://maps.google.com/?q=41+Boulevard+de+Thibaud+31100+Toulouse" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="bg-[#c8a96e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#b0935b] transition-all hover:-translate-y-1 shadow-xl shadow-[#c8a96e]/20 flex items-center justify-center gap-3"
                   >
                      Lancer l'itinéraire <MapPin className="w-4 h-4 text-white" />
                   </a>
                   <Link href="/contact" className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all flex items-center justify-center">
                      Réserver une visite
                   </Link>
                </div>
             </div>

             {/* Map Column */}
             <div className="relative z-10 lg:flex-[1.2] min-h-[500px] lg:min-h-auto rounded-[2.5rem] overflow-hidden border border-white/5">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.8761405060413!2d1.38550137683402!3d43.54660305924716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aeb7a7e937d53d%3A0xe7a5c86c125e1975!2s41%20Bd%20de%20Thibaud%2C%2031100%20Toulouse!5e0!3m2!1sfr!2sfr!4v1715367800000!5m2!1sfr!2sfr"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(0.9)' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
                {/* Map Overlay Frame */}
                <div className="absolute inset-0 pointer-events-none border-[12px] border-ishes-dark/20 rounded-[2.5rem]"></div>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
