"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-green selection:text-white">

      {/* BG decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-ishes-green/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <ArabicBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-44 pb-32">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="ishes-label text-ishes-green mb-5 block">Nous contacter</span>
          <h1 className="ishes-heading text-6xl md:text-[90px] text-ishes-dark leading-none mb-8">
            PARLONS-<br />
            <span className="text-ishes-green italic font-serif">nous.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-xl mx-auto leading-relaxed">
            Notre équipe est disponible pour répondre à toutes vos questions sur nos formations et inscription.
          </p>
        </motion.div>

        {/* ═══════ DEUX BRANCHES ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >

          {/* PRÉSENTIEL */}
          <div className="group relative overflow-hidden bg-white rounded-[2.5rem] border border-gray-100 p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="mb-8">
              <span className="ishes-label text-[10px] text-ishes-green bg-ishes-green/5 px-3 py-1 rounded-md">Présentiel — Toulouse</span>
            </div>
            <h2 className="ishes-heading text-3xl text-ishes-dark mb-2">Institut ISHES</h2>
            <p className="ishes-heading text-xl text-ishes-green mb-6">PRÉSENTIEL</p>
            
            {/* Numéro */}
            <a href="tel:+33768652091" className="flex items-center gap-4 mb-8 group/phone">
              <div className="w-16 h-16 rounded-2xl bg-ishes-dark flex items-center justify-center shrink-0 shadow-lg shadow-ishes-dark/20 group-hover/phone:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <span className="ishes-label text-[9px] opacity-40 block mb-0.5">Appelez-nous</span>
                <span className="ishes-heading text-2xl text-ishes-dark group-hover/phone:text-ishes-green transition-colors">+33 7 68 65 20 91</span>
              </div>
            </a>

            {/* Horaires */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <span className="ishes-label text-[9px] opacity-40 block mb-4">Horaires d'ouverture</span>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="ishes-heading text-sm text-ishes-dark">MERCREDI</span>
                  <span className="font-black italic text-ishes-green text-sm">14h — 17h</span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex justify-between items-center">
                  <span className="ishes-heading text-sm text-ishes-dark">SAMEDI</span>
                  <span className="font-black italic text-ishes-green text-sm">9h — 12h / 13h30 — 16h30</span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex justify-between items-center">
                  <span className="ishes-heading text-sm text-ishes-dark">DIMANCHE</span>
                  <span className="font-black italic text-ishes-green text-sm">11h30 — 15h</span>
                </div>
              </div>
            </div>
          </div>

          {/* DISTANCE (WhatsApp) */}
          <div className="group relative overflow-hidden bg-white rounded-[2.5rem] border border-gray-100 p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="mb-8">
              <span className="ishes-label text-[10px] text-white bg-ishes-dark px-3 py-1 rounded-md">Distance — 24h/24h</span>
            </div>
            <h2 className="ishes-heading text-3xl text-ishes-dark mb-2">Institut ISHES</h2>
            <p className="ishes-heading text-xl text-ishes-green mb-6">DISTANCE</p>
            
            {/* Numéro */}
            <a href="tel:+33666033519" className="flex items-center gap-4 mb-8 group/phone">
              <div className="w-16 h-16 rounded-2xl bg-ishes-dark flex items-center justify-center shrink-0 shadow-lg shadow-ishes-dark/20 group-hover/phone:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <span className="ishes-label text-[9px] opacity-40 block mb-0.5">Appelez-nous</span>
                <span className="ishes-heading text-2xl text-ishes-dark group-hover/phone:text-ishes-green transition-colors">+33 6 66 03 35 19</span>
              </div>
            </a>

            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/33666033519" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/wa flex items-center gap-5 bg-[#25D366] hover:bg-[#1fad55] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/20 hover:-translate-y-0.5"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <span className="ishes-heading text-xl text-white">WHATSAPP</span>
                <p className="font-bold text-white/70 text-sm">Contactez-nous 24h/24h</p>
              </div>
              <svg className="w-6 h-6 text-white/50 ml-auto group-hover/wa:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

        </motion.div>

        {/* ═══════ RÉSEAUX SOCIAUX ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {[
            {
              label: "Facebook", value: "Institut ISHES",
              href: "https://www.facebook.com/people/Institut-des-Sciences-Humaines-et-Spirituelles/100064820028202/",
              bg: "bg-[#f0f4ff]", hoverBg: "group-hover:bg-[#1877F2]",
              icon: <svg viewBox="0 0 24 24" className="w-14 h-14 fill-[#1877F2] group-hover:fill-white transition-colors duration-300"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            },
            {
              label: "Instagram", value: "@institutishes",
              href: "https://www.instagram.com/institutishes/",
              bg: "bg-[#fff0f5]", hoverBg: "group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7]",
              icon: <svg viewBox="0 0 24 24" className="w-14 h-14 fill-[#ee2a7b] group-hover:fill-white transition-colors duration-300"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.6.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            },
            {
              label: "TikTok", value: "@institutishes",
              href: "https://www.tiktok.com/@institutishes",
              bg: "bg-gray-50", hoverBg: "group-hover:bg-black",
              icon: <svg viewBox="0 0 24 24" className="w-14 h-14 fill-gray-800 group-hover:fill-white transition-colors duration-300"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
            },
            {
              label: "YouTube", value: "@institutishes",
              href: "https://www.youtube.com/@institutishes",
              bg: "bg-[#fff5f5]", hoverBg: "group-hover:bg-[#FF0000]",
              icon: <svg viewBox="0 0 24 24" className="w-14 h-14 fill-[#FF0000] group-hover:fill-white transition-colors duration-300"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            }
          ].map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white rounded-[2rem] border border-gray-100 p-6 flex flex-col items-center gap-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${ch.hoverBg}`} />
              <div className={`relative z-10 w-20 h-20 shrink-0 rounded-2xl ${ch.bg} group-hover:bg-transparent flex items-center justify-center transition-all duration-300`}>
                {ch.icon}
              </div>
              <span className="relative z-10 ishes-heading text-base md:text-xl text-ishes-dark group-hover:text-white transition-colors">
                {ch.label}
              </span>
              <span className="relative z-10 ishes-label text-[9px] text-gray-400 group-hover:text-white/60 transition-colors">
                {ch.value}
              </span>
            </a>
          ))}
        </motion.div>

        {/* ═══════ ADRESSE ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ishes-dark rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <span className="absolute -top-10 -right-10 text-[280px] leading-none font-serif">ﷻ</span>
          </div>
          <div className="relative z-10">
            <span className="ishes-label text-ishes-green mb-3 block">Nous trouver</span>
            <h2 className="ishes-heading text-4xl md:text-5xl text-white leading-none mb-4">
              TOULOUSE
            </h2>
            <p className="text-white/40 font-medium text-lg">41 Boulevard de Thibaud, 31100 Toulouse</p>
          </div>
          <a
            href="https://maps.google.com/?q=41+Boulevard+de+Thibaud+Toulouse"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 flex items-center gap-3 bg-ishes-green hover:bg-ishes-green/90 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:shadow-xl hover:shadow-ishes-green/30 hover:-translate-y-1"
          >
            Ouvrir dans Maps
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>

      </div>
    </div>
  );
}
