"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Programmes", href: "/program" },
  { name: "Formation Enseignant", href: "#" },
  { name: "L'Institut", href: "#" },
  { name: "Campus", href: "#" },
  { name: "Boutique", href: "#" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="w-full absolute top-0 lg:top-4 z-50 px-0 lg:px-4 pointer-events-none">
      <div className="max-w-[1200px] mx-auto pointer-events-auto bg-white/95 lg:bg-white/80 lg:backdrop-blur-xl h-20 lg:h-[72px] flex items-center justify-between px-6 lg:px-6 lg:rounded-full border-b lg:border border-gray-100 lg:border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-all">
        
        <div className="flex-shrink-0">
          <Link href="/" className="group flex flex-col items-center gap-0.5">
            <span className="text-xl md:text-[22px] font-black tracking-[0.02em] text-[#101828] leading-none transition-transform group-hover:scale-105">
              ISHES
            </span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            />
          </Link>
        </div>

        <nav className="hidden xl:flex items-center gap-1.5 relative" onMouseLeave={() => setHoveredIndex(null)}>
          {navLinks.map((link, idx) => (
            <Link 
              key={link.name} 
              href={link.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={`relative px-4 py-2 text-[13px] font-bold tracking-wide transition-colors z-10 ${
                hoveredIndex === idx ? "text-[#008953]" : "text-gray-500"
              }`}
            >
              {link.name}
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="navHoverPill"
                  className="absolute inset-0 bg-[#008953]/[0.08] border border-[#008953]/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/program" className="hidden sm:block bg-[#008953] hover:bg-[#007044] text-white px-6 py-2.5 rounded-full text-[13px] uppercase tracking-wider font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#008953]/20 border border-transparent">
            S'inscrire
          </Link>
          <button className="xl:hidden p-2 text-[#101828] hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
