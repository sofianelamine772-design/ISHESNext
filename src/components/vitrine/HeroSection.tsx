"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Trophy, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArabicBackground } from "@/components/ArabicBackground";

export function HeroSection() {
  return (
    <main className="relative z-10 w-full overflow-hidden bg-[#fafafa]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image src="/images/ai_medina.png" alt="Medina Background" fill className="object-cover" priority />
      </div>
      <ArabicBackground />

      <div className="max-w-[90rem] mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="flex flex-col items-center justify-center relative z-10">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl flex flex-col items-center text-center"
          >
            <h1 className="text-[42px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-black text-[#0a192f] leading-[1.05] tracking-tight">
              Apprenez votre religion avec confiance.
              <span className="block text-ishes-blue mt-2">
                Rapprochez-vous d'ALLAH avec une science authentique.
              </span>
            </h1>

            <p className="max-w-[750px] text-base md:text-lg text-gray-600 leading-relaxed font-medium mt-8">
              Depuis plus de 16 ans, l'Institut ISHES accompagne les francophones dans l'apprentissage de la langue arabe, du Coran et des sciences islamiques grâce à une pédagogie reconnue alliant science, spiritualité et accompagnement.
            </p>

            {/* Badge */}
            <div className="flex items-center gap-4 bg-[#f9f5f0] border border-[#C69C6D]/20 p-5 rounded-2xl mt-10 max-w-[600px] shadow-sm text-left">
              <Trophy className="text-[#C69C6D] w-8 h-8 shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-bold text-[#0a192f] leading-snug">
                Le seul institut spécialisé dans la formation des enseignants en Tarbiya Islamiyya et Tajwid en France.
              </p>
              <Award className="text-[#C69C6D] w-8 h-8 shrink-0" strokeWidth={1.5} />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-10 w-full sm:w-auto">
              <Link href="/program" className="bg-[#0a192f] text-white px-8 py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-[#0f2547] transition-all shadow-md group">
                Découvrir nos formations 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/program" className="bg-white border-2 border-gray-200 text-[#0a192f] px-8 py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:border-gray-300 transition-colors group">
                Trouver mon parcours 
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
