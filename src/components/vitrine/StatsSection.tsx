"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function StatsSection() {
  const avatars = [
    "https://images.unsplash.com/photo-1534308143481-c5509e24d271?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative z-10 w-full max-w-5xl mx-auto mt-[-20vh] md:mt-[-15vh] mb-20 md:mb-28 pt-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 items-center"
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
          {avatars.map((url, i) => (
            <div key={i} className="w-11 h-11 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative shadow-sm hover:scale-110 transition-transform cursor-pointer z-10 hover:z-20">
              <Image src={url} alt="Avatar étudiant" fill className="object-cover" sizes="44px" />
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
  );
}
