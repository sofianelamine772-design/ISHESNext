"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#fafafa] overflow-hidden px-6">
      {/* Si ArabicBackground a besoin d'être en position absolue, il l'est déjà généralement, mais on le garde sous les autres éléments */}
      <div className="absolute inset-0 z-0 opacity-50">
        <ArabicBackground />
      </div>
      
      {/* Glow effects pour un style premium */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ishes-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-ishes-blue/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-2xl shadow-ishes-gold/10 border border-gray-100 mb-8"
        >
          <Compass className="w-12 h-12 text-ishes-gold animate-pulse" strokeWidth={1.5} />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-ishes-blue mb-4 drop-shadow-sm"
        >
          404
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-black text-ishes-dark mb-6"
        >
          Oups ! Vous vous êtes égaré...
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-lg text-gray-500 mb-12 max-w-md font-medium"
        >
          La page que vous cherchez n&apos;existe pas, a été déplacée ou n&apos;est plus disponible. Retrouvez votre chemin vers la page d&apos;accueil.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-ishes-blue text-white rounded-2xl text-lg font-bold overflow-hidden shadow-xl shadow-ishes-blue/20 hover:shadow-2xl hover:shadow-ishes-blue/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-ishes-gold/0 via-ishes-gold/30 to-ishes-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Retour à l'accueil</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
