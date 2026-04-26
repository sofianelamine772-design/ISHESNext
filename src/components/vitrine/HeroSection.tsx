"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

export function HeroSection() {
  return (
    <main className="relative z-10 flex flex-col items-center text-center px-4 pt-28 sm:pt-32 md:pt-44 pb-12">
      <ArabicBackground />

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-7"
      >
        <h1 className="text-[38px] sm:text-[52px] md:text-[72px] lg:text-[84px] font-black text-ishes-dark leading-[1.08] tracking-tight">
          L'excellence de <span className="text-ishes-green italic">la</span><br />
          <span className="text-ishes-green italic">langue arabe</span> et des<br />
          <span className="bg-[#c8a96e] text-white italic px-1.5 py-0 rounded-none sm:inline-flex sm:items-center sm:h-[1.1em] sm:align-bottom inline box-decoration-clone">sciences islamiques</span> à<br />
          votre portée.
        </h1>

        <p className="max-w-[620px] text-base sm:text-lg md:text-[20px] text-gray-500 leading-[1.7] font-medium">
          Institut de référence à Toulouse. Pédagogie certifiée CECRL pour une maîtrise complète, du niveau débutant à l'expertise.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-0">
          <Link href="/program" className="group flex items-center justify-center gap-3 w-64 bg-ishes-green hover:bg-ishes-green-hover text-white py-5 rounded-full text-[17px] font-bold transition-all hover:-translate-y-0.5 shadow-xl shadow-ishes-green/20">
            Distanciel
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
          <Link href="/program" className="group flex items-center justify-center gap-3 w-64 bg-white border-2 border-[#c8a96e]/20 text-[#c8a96e] hover:border-[#c8a96e] hover:bg-[#c8a96e]/5 py-5 rounded-full text-[17px] font-bold transition-all hover:-translate-y-0.5 shadow-sm">
            Présentiel
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
