"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArabicBackground } from "@/components/ArabicBackground";

export function InstitutHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <ArabicBackground />
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
        <Image 
          src="/images/campus.png" 
          alt="ISHES Institut" 
          fill
          priority
          className="object-cover scale-110"
          sizes="100vw"
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
  );
}
