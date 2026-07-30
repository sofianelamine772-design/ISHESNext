"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavLink = {
  name: string;
  href: string;
  subLinks?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { name: "Notre histoire", href: "/notre-histoire" },
  { name: "Boutique", href: "/boutique" },
  { name: "Nos formations", href: "/program" },
  { name: "Devenir enseignant", href: "/formation-enseignant" },
  { name: "Pack accompagnement", href: "/pack-accompagnement" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSublinksOpen, setMobileSublinksOpen] = useState<Record<string, boolean>>({});

  const toggleMobileSublink = (name: string) => {
    setMobileSublinksOpen(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <>
      <header className="w-full fixed top-0 xl:top-4 z-50 px-0 xl:px-4 pointer-events-none">
        <div className="max-w-[1440px] mx-auto pointer-events-auto bg-white h-20 xl:h-[72px] flex items-center justify-between px-6 xl:px-4 xl:rounded-full border-b xl:border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-all">

          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center transition-transform hover:scale-105 active:scale-95">
              <div className="flex items-center justify-center h-10 md:h-12 w-32 md:w-36">
                <Image
                  src="/logo.png"
                  alt="ISHES Logo"
                  width={144}
                  height={48}
                  priority
                  className="object-contain max-h-full max-w-full scale-[1.35] md:scale-[1.65]"
                />
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2 relative" onMouseLeave={() => setHoveredIndex(null)}>
            {navLinks.map((link, idx) => (
              <div key={link.name} className="relative group" onMouseEnter={() => setHoveredIndex(idx)}>
                <Link
                  href={link.href}
                  className={`relative px-2 xl:px-3 py-2 text-[15px] 2xl:text-[16px] font-bold tracking-tight transition-colors z-10 whitespace-nowrap flex items-center gap-1 ${hoveredIndex === idx ? "text-ishes-gold" : "text-gray-500"
                    }`}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown className="w-4 h-4 opacity-50" />}
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-ishes-gold/[0.08] border border-ishes-gold/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>

                {/* Dropdown for sublinks */}
                {link.subLinks && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-gray-100 py-2 w-48 relative overflow-hidden">
                      {link.subLinks.map(subLink => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className="block px-4 py-2.5 text-[15px] font-bold text-gray-600 hover:text-ishes-gold hover:bg-gray-50 transition-colors text-center"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-4">
            <Link href="/app" className="hidden xl:flex items-center justify-center px-4 xl:px-6 py-2.5 rounded-full text-[14px] 2xl:text-[15px] uppercase tracking-[0.15em] font-black text-gray-600 hover:text-ishes-gold hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all active:scale-95">
              Connexion
            </Link>
            <Link href="/program" className="bg-ishes-gold hover:brightness-95 text-white px-5 sm:px-8 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-[15px] 2xl:text-[16px] uppercase tracking-wider font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-ishes-gold/20 border border-transparent pointer-events-auto flex items-center justify-center text-center">
              S'inscrire
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="xl:hidden p-2 text-[#101828] hover:bg-gray-100 rounded-full transition-colors pointer-events-auto"
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
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-20 left-0 right-0 z-50 lg:hidden mx-3"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-100px)]">
                <div className="overflow-y-auto flex-1">
                  <nav className="flex flex-col py-3">
                    {navLinks.map((link, idx) => (
                      <div key={link.name} className="flex flex-col border-b border-gray-50 last:border-0">
                        <div className="flex items-center justify-between px-6 py-4">
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-[15px] font-bold text-gray-700 hover:text-ishes-blue transition-colors flex-1"
                          >
                            {link.name}
                          </Link>
                          {link.subLinks && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleMobileSublink(link.name);
                              }}
                              className="p-2 -mr-2 text-gray-400 hover:text-ishes-blue transition-colors"
                            >
                              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileSublinksOpen[link.name] ? 'rotate-180 text-ishes-blue' : ''}`} />
                            </button>
                          )}
                        </div>
                        
                        {link.subLinks && (
                          <AnimatePresence>
                            {mobileSublinksOpen[link.name] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-gray-50/50"
                              >
                                {link.subLinks.map(subLink => (
                                  <Link
                                    key={subLink.name}
                                    href={subLink.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-10 py-3.5 text-[14px] font-semibold text-gray-600 hover:text-ishes-blue hover:bg-gray-100/50 transition-colors border-t border-gray-100/50 first:border-0"
                                  >
                                    {subLink.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
                <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex flex-col gap-4 mt-auto">
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
                    className="w-full flex items-center justify-center bg-ishes-blue hover:bg-[#007044] text-white py-3.5 rounded-xl text-[14px] font-black uppercase tracking-widest transition-all shadow-lg shadow-ishes-blue/20"
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
