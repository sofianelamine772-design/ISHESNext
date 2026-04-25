"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";

export function HeroSection() {
  return (
    <main className="relative z-10 flex flex-col items-center text-center px-4 pt-28 sm:pt-32 md:pt-44 pb-20 min-h-screen">
      <ArabicBackground />

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-7"
      >
        <h1 className="text-[38px] sm:text-[52px] md:text-[72px] lg:text-[84px] font-black text-ishes-dark leading-[1.08] tracking-tight">
          L'excellence de <span className="text-[#c8a96e] italic">la</span><br />
          <span className="text-[#c8a96e] italic">langue arabe</span> à votre<br />
          portée.
        </h1>

        <p className="max-w-[620px] text-base sm:text-lg md:text-[20px] text-gray-500 leading-[1.7] font-medium">
          Institut de référence à Toulouse. Pédagogie certifiée CECRL pour une maîtrise complète, du niveau débutant à l'expertise.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button className="group flex items-center gap-3 bg-[#c8a96e] hover:bg-[#b0935b] text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all hover:-translate-y-0.5 shadow-xl shadow-[#c8a96e]/20">
            Voir nos cours
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </button>
          <button className="flex items-center justify-center bg-white border-2 border-[#c8a96e]/20 text-[#c8a96e] hover:border-[#c8a96e] hover:bg-[#c8a96e]/5 px-8 py-4 rounded-full text-[15px] font-bold transition-all hover:-translate-y-0.5 shadow-sm">
            Pré-inscription
          </button>
        </div>
      </motion.div>
    </main>
  );
}
