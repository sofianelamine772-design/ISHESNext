"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Wifi, Library, MapPin, Users, Sun, Heart, CheckCircle2, Navigation, Clock, Calendar, ArrowRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

export default function InstitutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans selection:bg-ishes-green selection:text-white">
      <ArabicBackground />
      
      {/* --- HERO SECTION: CINEMATIC --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img 
            src="/images/campus.png" 
            alt="ISHES Institut" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-white" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >

            <h1 className="text-6xl md:text-[120px] font-black text-white leading-[0.9] tracking-tighter mb-10 overflow-hidden">
              <motion.span 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                L'INSTITUT <br /> 
                <span className="text-ishes-green italic font-serif">notre essence.</span>
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Plus qu’un campus, un écosystème conçu pour élever l’esprit et nourrir l’intellect au cœur de la Ville Rose.
            </motion.p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-12 left-12 hidden lg:block">
          <div className="text-[10px] font-black text-ishes-dark uppercase tracking-[0.5em] rotate-90 origin-left">
            ISHES TOULOUSE • INSTITUT FONDÉ EN 2024
          </div>
        </div>
      </section>

      {/* --- THE MANIFESTO --- */}
      <section className="bg-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
           <img src="/logo.png" className="w-[600px] grayscale" alt="" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-end">
            <div className="space-y-12">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  <h2 className="text-ishes-dark font-black text-4xl md:text-6xl leading-[1.1] tracking-tight">
                    L’architecture au <br />
                    <span className="text-ishes-green">service du sens.</span>
                  </h2>
               </motion.div>
               <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6 text-gray-500 text-xl font-medium leading-relaxed"
               >
                  <p>
                    Chaque courbe, chaque matériau et chaque source de lumière ont été sélectionnés pour créer un environnement de "Sakinah" (sérénité). 
                  </p>
                  <p>
                    Nous croyons que l'espace physique influence profondément la qualité de l'apprentissage spirituel. C'est pourquoi nous avons troqué les salles de classe traditionnelles pour des espaces de vie polyvalents et inspirants.
                  </p>
               </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl"
               >
                 <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
               </motion.div>
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl mt-12"
               >
                 <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE FACILITIES --- */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-x-12 gap-y-16">
            {[
              { icon: <Wifi />, title: "Fibre Ultra-Rapide", desc: "Connectivité totale." },
              { icon: <Coffee />, title: "Salon de Thé", desc: "Hospitalité & échanges." },
              { icon: <Sun />, title: "Puits de Lumière", desc: "Éclairage naturel constant." },
              { icon: <Heart />, title: "Espace Prière", desc: "Sérénité & recueillement." },
              { icon: <Clock />, title: "Accès Étendu", desc: "Ouvert jusqu'à 21h." },
              { icon: <Calendar />, title: "Évènements", desc: "Conférences hebdomadaires." },
              { icon: <MapPin />, title: "Tram/Métro", desc: "À 2min de la station." },
              { icon: <Navigation />, title: "Parking Sécurisé", desc: "Réservé aux étudiants." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl text-ishes-dark shrink-0">
                  {f.icon}
                </div>
                <div>
                   <h5 className="font-black text-ishes-dark text-sm uppercase tracking-widest mb-1">{f.title}</h5>
                   <p className="text-gray-400 font-medium text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE CALL TO VISIT --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f8f8f8] rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative border border-gray-100">
             <div className="absolute top-0 right-0 w-[50%] h-full bg-[#eeeeee] skew-x-12 translate-x-20 -z-0" />
             
             <div className="max-w-xl relative i-ishes-dark relative z-10">
                <span className="text-ishes-green font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Prendre rendez-vous</span>
                <h2 className="text-5xl md:text-7xl font-black text-ishes-dark leading-[0.95] tracking-tighter mb-8 italic">
                   NOTRE <br /> MAISON.
                </h2>
                <p className="text-xl text-gray-500 font-medium mb-12">
                   L'institut est situé au 15 rue des Sciences à Toulouse. Nous vous accueillons pour une visite guidée et un café de bienvenue.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                   <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-ishes-dark text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-ishes-dark/20 flex items-center justify-center gap-3">
                      Lancer l'itinéraire <MapPin className="w-4 h-4 text-ishes-green" />
                   </a>
                   <Link href="/contact" className="bg-white border border-gray-200 text-ishes-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all flex items-center justify-center">
                      Réserver une visite
                   </Link>
                </div>
             </div>

             <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 h-full">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                   <h6 className="font-black text-ishes-dark text-xs uppercase tracking-widest mb-4 opacity-30">Horaires</h6>
                   <ul className="space-y-2 text-sm font-bold text-gray-600">
                      <li className="flex justify-between"><span>LUN - VEN</span> <span>9H - 21H</span></li>
                      <li className="flex justify-between"><span>SAMEDI</span> <span>10H - 18H</span></li>
                      <li className="flex justify-between text-gray-300"><span>DIMANCHE</span> <span>FERMÉ</span></li>
                   </ul>
                </div>
                <div className="bg-ishes-green p-8 rounded-3xl shadow-lg shadow-ishes-green/20 text-white flex flex-col justify-between">
                   <Navigation className="w-8 h-8 opacity-50" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">MÉTRO</p>
                      <p className="text-lg font-black leading-none">LIGNE A <br /> RÉPUBLIQUE</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
