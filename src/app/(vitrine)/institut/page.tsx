"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Users, Clock, BookOpen, Award, CheckCircle2, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArabicBackground } from "@/components/ArabicBackground";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Définition rigoureuse du type pour éviter les erreurs TypeScript
interface ProgramSlot {
  id: string;
  day: string;
  time: string;
}

interface PresentielProgram {
  id: string;
  formationId: string;
  title: string;
  subtitle: string;
  durationText: string;
  day?: string; // Optionnel pour les enfants
  audience: 'adulte' | 'enfant';
  features: string[];
  price: string;
  priceSub: string;
  link: string;
  slots?: ProgramSlot[]; // Optionnel pour les adultes
}

const presentielPrograms: PresentielProgram[] = [
  {
    id: "tajwid-standard",
    formationId: "presentiel-global",
    title: "Tajwid (Standard)",
    subtitle: "Apprends à lire le Coran correctement en respectant les règles de Tajwid.",
    durationText: "Lundi 19h00",
    day: "Lundi",
    audience: "adulte",
    features: ["Lecture correcte", "Application des règles", "Fluidité", "Suivi WhatsApp"],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-lecture-tajwid"
  },
  {
    id: "arabe-adulte",
    formationId: "presentiel-global",
    title: "Arabe Littéraire",
    subtitle: "Maîtrisez la langue arabe moderne, de l'alphabet à la conversation.",
    durationText: "Mardi 19h00",
    day: "Mardi",
    audience: "adulte",
    features: ["Lecture & Écriture", "Conversation", "Grammaire", "Immersion"],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-arabe-adulte"
  },
  {
    id: "enfant-mercredi-presentiel",
    formationId: "presentiel-global",
    title: "Scolarité Enfants",
    subtitle: "Mercredi : Arabe, Coran & Tajwid. Pédagogie active pour les 4-15 ans.",
    durationText: "Mercredi 14h-17h",
    day: "Mercredi",
    audience: "enfant",
    features: ["Enseignement direct", "Activités ludiques", "Vie d'institut", "Ateliers"],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-arabe-enfant"
  },
  {
    id: "enfant-samedi-presentiel",
    formationId: "presentiel-global",
    title: "Scolarité Enfants",
    subtitle: "Samedi : Arabe, Coran & Tajwid. Pédagogie active pour les 4-15 ans.",
    durationText: "Samedi 09h-12h",
    day: "Samedi",
    audience: "enfant",
    features: ["Enseignement direct", "Activités ludiques", "Vie d'institut", "Ateliers"],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-arabe-enfant"
  },
  {
    id: "enfant-dimanche-presentiel",
    formationId: "presentiel-global",
    title: "Scolarité Enfants",
    subtitle: "Dimanche : Arabe, Coran & Tajwid. Pédagogie active pour les 4-15 ans.",
    durationText: "Dimanche 11h30-14h30",
    day: "Dimanche",
    audience: "enfant",
    features: ["Enseignement direct", "Activités ludiques", "Vie d'institut", "Ateliers"],
    price: "349 €",
    priceSub: "/ SESSION",
    link: "/fr/cours-arabe-enfant"
  }
];

export default function InstitutPage() {
  const router = useRouter();
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({});
  const [slotsStatus, setSlotsStatus] = useState<any[]>([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/classes/status');
        const data = await res.json();
        if (!data.error) setSlotsStatus(data);
      } catch (err) {
        console.error("Failed to fetch slots status", err);
      }
    };
    fetchStatus();
  }, []);

  const getSlotStatus = (day?: string) => {
    if (!day) return null;
    return slotsStatus.find(s => s.day_of_week?.toLowerCase() === day.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-[#c8a96e] selection:text-white">
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
            <span className="text-[#c8a96e] font-black uppercase tracking-[0.25em] text-xs mb-4 block">Formations sur site</span>
            <h2 className="text-4xl md:text-6xl font-black text-ishes-dark leading-none tracking-tight mb-6 uppercase">
              L'excellence du savoir <br />
              <span className="text-[#c8a96e] italic">en direct.</span>
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
                onClick={() => router.push(program.link)}
                className="cursor-pointer group relative flex flex-col rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#c8a96e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-5 sm:p-6 flex-1 flex flex-col relative z-20">
                  {/* TAGS ROW */}
                  <div className="flex items-center justify-between mb-4">
                     <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase bg-[#c8a96e]/10 text-[#c8a96e]">
                        PRÉSENTIEL
                     </span>
                     <span className="px-3 py-1 bg-[#c8a96e]/10 text-[#c8a96e] rounded-full text-[10px] font-black tracking-wider uppercase flex items-center gap-1 border border-[#c8a96e]/20">
                        <span>📅</span> {program.durationText}
                     </span>
                  </div>

                  {/* TITLE & DESC */}
                  <div>
                    <h2 className="text-xl font-black text-[#152233] mb-2 tracking-tight leading-[1.1]">
                      {program.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 font-medium">
                      {program.subtitle}
                    </p>
                  </div>

                  {/* ICONS GRID */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-[#c8a96e]/10 transition-colors">
                        <Clock className="w-4 h-4 text-[#c8a96e]" />
                      </div>
                      <span className="text-[11px] font-black text-[#c8a96e]">{program.durationText}</span>
                    </div>
                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-[#c8a96e]/10 transition-colors">
                        <BookOpen className="w-4 h-4 text-[#c8a96e]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">Manuel inclus</span>
                    </div>
                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover/icon:bg-[#c8a96e]/10 transition-colors">
                        <Users className="w-4 h-4 text-[#c8a96e]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">Max 20</span>
                    </div>
                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-9 h-9 rounded-xl bg-ishes-dark flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#c8a96e]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Certifié</span>
                    </div>
                  </div>

                  {/* FEATURES LIST */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3 mb-4">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 py-1">
                        <div className="mt-1 w-3.5 h-3.5 rounded-full bg-[#c8a96e]/10 flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-2.5 h-2.5 text-[#c8a96e]" />
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-600 font-bold leading-tight">{feature}</span>
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
                    
                    {program.day && (
                      <div className="mb-2">
                        {getSlotStatus(program.day)?.est_plein ? (
                          <div className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] bg-red-50 px-3 py-2 rounded-xl">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Session Complète
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-green-600 font-black uppercase text-[10px] bg-green-50 px-3 py-2 rounded-xl">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Places Disponibles
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        href={program.link}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 py-3.5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest"
                      >
                        Infos
                      </Link>
                      <Link 
                        href={`/inscription?plan=${program.formationId}&slot=${program.day?.toLowerCase() || ''}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`flex items-center justify-center py-3.5 rounded-2xl shadow-lg transition-all font-black text-[10px] uppercase tracking-widest hover:-translate-y-1 active:scale-95 ${
                          getSlotStatus(program.day)?.est_plein
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                            : "bg-[#c8a96e] text-white hover:bg-[#b0935b] shadow-[#c8a96e]/20"
                        }`}
                      >
                        {getSlotStatus(program.day)?.est_plein ? "COMPLET" : (program.audience === 'enfant' ? "Inscrire" : "S'inscrire")}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TEST DE POSITIONNEMENT CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 border border-ishes-dark/5 shadow-2xl shadow-ishes-dark/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a96e]/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#c8a96e]/10 transition-colors duration-700" />
            
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#c8a96e]/10 rounded-[2.5rem] flex items-center justify-center shrink-0">
                <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-[#c8a96e]" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <span className="text-[#c8a96e] font-black uppercase tracking-[0.2em] text-[10px] mb-3 block">Orientation pédagogique</span>
                <h3 className="text-2xl md:text-3xl font-black text-ishes-dark mb-4 uppercase">Test de positionnement <span className="text-[#c8a96e] italic">Enfants</span></h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-8">
                  Un doute sur le niveau de votre enfant ? Notre test interactif vous aide à choisir entre le niveau <strong className="text-ishes-dark">Débutant</strong> ou <strong className="text-ishes-dark">1+</strong> en moins de 2 minutes.
                </p>
                <Link 
                  href="/test-positionnement" 
                  className="inline-flex items-center gap-3 bg-ishes-dark text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all hover:-translate-y-1 shadow-xl shadow-ishes-dark/20"
                >
                  Démarrer le test gratuit <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

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
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
               <span className="absolute -top-10 -right-10 text-[400px] leading-none font-bold text-white">ﷻ</span>
             </div>
             
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
                <div className="absolute inset-0 pointer-events-none border-[12px] border-ishes-dark/20 rounded-[2.5rem]"></div>
             </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
