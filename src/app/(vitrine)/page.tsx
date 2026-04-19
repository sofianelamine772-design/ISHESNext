"use client";

import { motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";


import { useState } from "react";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fafafa]">
      {/* Background decoration: Soft global gradient map behind */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-0 w-[600px] h-[600px] bg-gray-100/50 blur-[100px] rounded-full" />
      </div>



      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 pt-16 md:pt-28 pb-24 text-center">
        
        {/* Very subtle Arabic calligraphy watermark */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
           <span className="text-[250px] md:text-[400px] leading-none font-serif font-bold text-ishes-dark transform rotate-[-3deg]">عربية</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto relative z-10 space-y-8"
        >
          {/* Main Headline */}
          <h1 className="text-[42px] sm:text-5xl md:text-[80px] font-black text-ishes-dark leading-[1.05] tracking-tight whitespace-normal md:whitespace-nowrap">
            L'excellence de <span className="text-ishes-green italic pr-2">la</span><br />
            <span className="text-ishes-green italic pr-2">langue arabe</span> à votre<br />
            portée.
          </h1>

          {/* Subheadline */}
          <p className="max-w-[700px] mx-auto text-lg md:text-[22px] text-gray-500 leading-[1.6] font-medium px-4">
            Institut de référence à Toulouse. Pédagogie certifiée CECRL pour<br className="hidden md:block" /> une maîtrise complète, du niveau débutant à l'expertise.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="group flex items-center gap-3 bg-ishes-green hover:bg-ishes-green-hover text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all transform hover:-translate-y-0.5 shadow-xl shadow-ishes-green/20">
              Voir nos cours
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
            <button className="flex items-center justify-center bg-white border-2 border-[rgba(8,107,81,0.2)] text-ishes-green hover:border-ishes-green hover:bg-ishes-green/5 px-8 py-4 rounded-full text-[15px] font-bold transition-all transform hover:-translate-y-0.5 shadow-sm">
              Pré-inscription
            </button>
          </div>
        </motion.div>

        {/* Stats & Trust Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto mt-24 md:mt-32 pt-14 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 items-center"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[44px] leading-tight font-black text-ishes-dark mb-1">1300+</span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">Étudiants</span>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[44px] leading-tight font-black text-ishes-dark mb-1">12</span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">Enseignants</span>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[44px] leading-tight font-black text-ishes-dark mb-1">15 ans</span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">Expertise</span>
          </div>

          <div className="flex flex-col items-center md:items-end justify-center w-full">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-11 h-11 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative shadow-sm hover:scale-110 transition-transform cursor-pointer z-10 hover:z-20">
                  <img src={`https://i.pravatar.cc/100?img=${i + 31}`} alt="Avatar étudiant" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center md:items-end mt-2">
              <div className="flex gap-1 text-[#f5b82e] text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mt-1">Rejoignez-nous!</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="#" className="group flex items-center gap-3">
          <div className="hidden md:flex items-center justify-center bg-[#152233] text-white px-5 py-3 rounded-lg shadow-2xl text-[10px] font-bold tracking-[0.15em] relative transition-transform group-hover:-translate-y-1">
            CONTACTEZ-NOUS SUR WHATSAPP
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-l-[6px] border-l-[#152233] border-y-[6px] border-y-transparent"></div>
          </div>
          <div className="bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.35)] transition-all group-hover:-translate-y-1 group-hover:scale-105">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>
        </a>
      </div>

    </div>
  );
}
