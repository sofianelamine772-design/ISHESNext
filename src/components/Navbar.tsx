"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Programmes", href: "/program" },
  { name: "Formation Enseignant", href: "/formation-enseignant" },
  { name: "L'Institut", href: "/institut" },
  { name: "Boutique", href: "/boutique" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="w-full fixed top-0 lg:top-4 z-50 px-0 lg:px-4 pointer-events-none">
        <div className="max-w-[1200px] mx-auto pointer-events-auto bg-white/90 backdrop-blur-md h-20 lg:h-[72px] flex items-center justify-between px-6 lg:px-6 lg:rounded-full border-b lg:border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-all">

          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center transition-transform hover:scale-105 active:scale-95">
              <div className="relative h-10 md:h-12 w-32 md:w-36">
                <Image
                  src="/logo.png"
                  alt="ISHES Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1.5 relative" onMouseLeave={() => setHoveredIndex(null)}>
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative px-3 py-2 text-[16px] font-bold tracking-tight transition-colors z-10 whitespace-nowrap ${hoveredIndex === idx ? "text-[#008953]" : "text-gray-500"
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
            <Link href="/app" className="hidden lg:flex items-center justify-center px-6 py-2.5 rounded-full text-[15px] uppercase tracking-[0.15em] font-black text-gray-600 hover:text-[#008953] hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all active:scale-95">
              Connexion
            </Link>
            <Link href="/program" className="hidden sm:block bg-[#008953] hover:bg-[#007044] text-white px-7 py-2.5 rounded-full text-[16px] uppercase tracking-wider font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#008953]/20 border border-transparent">
              S'inscrire
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="xl:hidden p-2 text-[#101828] hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-20 left-0 right-0 z-50 xl:hidden mx-3"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">
                <nav className="flex flex-col py-3">
                  {navLinks.map((link, idx) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-6 py-4 text-[15px] font-bold text-gray-700 hover:text-[#008953] hover:bg-[#008953]/5 transition-colors border-b border-gray-50 last:border-0"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex flex-col gap-4">
                  <Link
                    href="/app"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center text-gray-700 py-3.5 rounded-xl text-[13px] font-black uppercase tracking-widest bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-all active:scale-95"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/program"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center bg-[#008953] hover:bg-[#007044] text-white py-3.5 rounded-xl text-[14px] font-black uppercase tracking-widest transition-all shadow-lg shadow-[#008953]/20"
                  >
                    S'inscrire maintenant
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
