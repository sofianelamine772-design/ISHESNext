"use client";

import { motion } from "framer-motion";
import { ArabicBackground } from "@/components/ArabicBackground";

export function BoutiqueHero() {
  return (
    <section className="relative pt-32 lg:pt-48 pb-24 overflow-hidden">
      <ArabicBackground />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-ishes-green/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="ishes-label mb-4 block">Éditions ISHES</span>
          <h1 className="ishes-heading text-5xl md:text-8xl text-ishes-dark mb-6">
            LA BOUTIQUE <br />
            <span className="text-ishes-green italic font-serif">spirituelle.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Des supports pédagogiques et inspirants pour accompagner votre cheminement et celui de vos enfants.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
