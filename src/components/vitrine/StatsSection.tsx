"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

function CountUp({ end, duration = 2, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      
      if (elapsed < duration) {
        const progress = 1 - Math.pow(1 - elapsed / duration, 4);
        setCount(Math.floor(progress * end));
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function StatsSection() {
  const avatars = [
    "https://api.dicebear.com/7.x/notionists/svg?seed=20&backgroundColor=e2e8f0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=21&backgroundColor=e2e8f0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=22&backgroundColor=e2e8f0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=23&backgroundColor=e2e8f0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=24&backgroundColor=e2e8f0"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative z-10 w-full max-w-4xl mx-auto mb-8 md:mb-12 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-8 items-center"
    >
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="text-[44px] leading-tight font-black text-ishes-dark mb-1">
          <CountUp end={6000} prefix="+" />
        </span>
        <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">Élèves formés</span>
      </div>

      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="text-[44px] leading-tight font-black text-ishes-dark mb-1">
          <CountUp end={16} suffix=" ans" />
        </span>
        <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">Expertise</span>
      </div>

      <div className="flex flex-col items-center sm:items-end justify-center w-full">
        <div className="flex -space-x-3">
          {avatars.map((url, i) => (
            <div key={i} className="w-11 h-11 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative shadow-sm hover:scale-110 transition-transform cursor-pointer z-10 hover:z-20">
              <img src={url} alt="Avatar étudiant" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center sm:items-end mt-2">
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
