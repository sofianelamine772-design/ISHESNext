"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArabicBackground } from "@/components/ArabicBackground";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fafafa]">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-0 w-[600px] h-[600px] bg-gray-100/50 blur-[100px] rounded-full" />
      </div>

      {/* ─── HERO SECTION ─── */}
      {/*
        Structure solide :
        - Navbar = absolute, h-20 (80px) mobile / top-4 + h-[72px] desktop (~88px)
        - pt-28 mobile = 112px → dépasse bien la navbar + respiration
        - pas de justify-center → le contenu commence en haut, centré horizontalement
        - min-h-screen pour que la section prenne tout l'écran
      */}
      <main className="relative z-10 flex flex-col items-center text-center px-4 pt-28 sm:pt-32 md:pt-44 pb-20 min-h-screen">

      <ArabicBackground />

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-7"
        >
          <h1 className="text-[38px] sm:text-[52px] md:text-[72px] lg:text-[84px] font-black text-ishes-dark leading-[1.08] tracking-tight">
            L'excellence de <span className="text-ishes-green italic">la</span><br />
            <span className="text-ishes-green italic">langue arabe</span> à votre<br />
            portée.
          </h1>

          <p className="max-w-[620px] text-base sm:text-lg md:text-[20px] text-gray-500 leading-[1.7] font-medium">
            Institut de référence à Toulouse. Pédagogie certifiée CECRL pour une maîtrise complète, du niveau débutant à l'expertise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button className="group flex items-center gap-3 bg-ishes-green hover:bg-ishes-green-hover text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all hover:-translate-y-0.5 shadow-xl shadow-ishes-green/20">
              Voir nos cours
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
            <button className="flex items-center justify-center bg-white border-2 border-ishes-green/20 text-ishes-green hover:border-ishes-green hover:bg-ishes-green/5 px-8 py-4 rounded-full text-[15px] font-bold transition-all hover:-translate-y-0.5 shadow-sm">
              Pré-inscription
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl mx-auto mt-20 md:mt-28 pt-12 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 items-center"
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
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-11 h-11 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative shadow-sm hover:scale-110 transition-transform cursor-pointer z-10 hover:z-20">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 31}`} alt="Avatar étudiant" fill className="object-cover" />
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
      </main>

      {/* ===== MINI FORMATION SECTION ===== */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#fafafa] border border-gray-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-500"
          >
            <div className="max-w-2xl text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                {["Sciences Islamiques", "Langue Arabe", "Tajwid"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-ishes-green/5 text-ishes-green text-[10px] font-black uppercase tracking-widest rounded-md border border-ishes-green/10">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-ishes-dark font-black text-2xl md:text-3xl mb-4 leading-tight">
                Formation à <span className="text-ishes-green italic">Toulouse</span> & <span className="text-ishes-dark italic">à distance</span>.
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">
                Nous proposons des formations basées sur Toulouse. Certaines formations sont disponibles en <strong className="text-ishes-dark">présentiel</strong> sur Toulouse, d'autres en <strong className="text-ishes-dark">distanciel</strong>.
              </p>
            </div>
            <Link 
              href="/program" 
              className="group flex items-center gap-3 bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-bold transition-all shadow-xl shadow-ishes-green/20 shrink-0 hover:-translate-y-1"
            >
              Voir nos formations
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== NOTRE INSTITUT SECTION (Split Visual) ===== */}
      <section className="relative bg-white overflow-hidden py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Column */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl group"
            >
              <Image 
                src="/images/home-hero.png" 
                alt="Institut ISHES" 
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ishes-green/10 mix-blend-overlay" />
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-[2px] bg-ishes-green" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-ishes-green uppercase">Notre Institut</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-[1.1] tracking-tight mb-8">
                Un savoir qui transforme<br />
                <span className="text-ishes-green italic">chaque musulman.</span>
              </h2>

              {/* Body */}
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                <p>
                  L'Institut des Sciences Humaines et Spirituelles de Toulouse est porté par un couple — également fondateur de l'école <strong className="text-ishes-dark">Transmettre</strong> —, forts de <strong className="text-ishes-dark">plus de 15 ans d'expérience</strong> dans l'enseignement.
                </p>
                <p>
                  Ils ont souhaité élargir l'accès à un véritable cheminement spirituel, en offrant à chacun la possibilité d'apprendre où qu'il se trouve, à son rythme.
                </p>
              </div>

              {/* Mission Quote */}
              <div className="mt-12 relative pl-7 border-l-4 border-ishes-green">
                <p className="text-ishes-dark text-xl leading-relaxed font-bold italic">
                  "Notre mission : ouvrir les portes d'un savoir qui transforme, pour que chaque musulman puisse vivre sa religion avec conscience, équilibre et profondeur."
                </p>
              </div>

              {/* Founder Signature */}
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ishes-green/10 flex items-center justify-center text-ishes-green">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-ishes-dark uppercase tracking-widest">Mr & Mme Latreche</div>
                  <div className="text-xs text-gray-400 font-bold">Fondateurs de l'ISHES</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGES SECTION ===== */}
      <section className="bg-[#fafafa] border-t border-gray-100 py-20 md:py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-ishes-green/10 text-ishes-green text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6">
              Approuvé par la communauté
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight">
              Ce que nos <span className="text-ishes-green italic">étudiants</span> pensent.
            </h2>
          </motion.div>
        </div>

        {/* Scrolling rows */}
        <div className="flex flex-col gap-5">
          {/* Row 1 — scroll left */}
          <div className="flex gap-5 w-max animate-[marquee_80s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {[
              { name: "Fanny Vincent", role: "Parent d'élève", text: "Pédagogie excellente, explications simples. Les enfants adorent les cours à distance." },
              { name: "Abdoullah M.", role: "Étudiant", text: "Efficace, sérieux et très professionnel. Je recommande vivement pour progresser vite." },
              { name: "Sarah L.", role: "Étudiante", text: "La méthode Nour Al Bayan est incroyable. On apprend à lire très rapidement !" },
              { name: "Fatmaa Elbechir", role: "Étudiante", text: "Un institut d'exception. Une référence pour l'apprentissage. Professeurs bienveillants et qualifiés." },
              { name: "Karim B.", role: "Étudiant", text: "Les cours de Fiqh malikite sont très bien structurés. J'apprends énormément chaque semaine." },
              { name: "Nadia S.", role: "Étudiante", text: "Je suis bluffée par la qualité des enseignants. La Spiritualité musulmane est enseignée avec profondeur." },
              { name: "Youssef A.", role: "Parent d'élève", text: "Mes enfants progressent vraiment vite en arabe. L'équipe est toujours disponible et à l'écoute." },
              { name: "Amira T.", role: "Étudiante", text: "La formation à distance est très bien pensée. Le contenu est riche et très bien présenté." },
              // duplicate for seamless loop
              { name: "Fanny Vincent", role: "Parent d'élève", text: "Pédagogie excellente, explications simples. Les enfants adorent les cours à distance." },
              { name: "Abdoullah M.", role: "Étudiant", text: "Efficace, sérieux et très professionnel. Je recommande vivement pour progresser vite." },
              { name: "Sarah L.", role: "Étudiante", text: "La méthode Nour Al Bayan est incroyable. On apprend à lire très rapidement !" },
              { name: "Fatmaa Elbechir", role: "Étudiante", text: "Un institut d'exception. Une référence pour l'apprentissage. Professeurs bienveillants et qualifiés." },
              { name: "Karim B.", role: "Étudiant", text: "Les cours de Fiqh malikite sont très bien structurés. J'apprends énormément chaque semaine." },
              { name: "Nadia S.", role: "Étudiante", text: "Je suis bluffée par la qualité des enseignants. La Spiritualité musulmane est enseignée avec profondeur." },
              { name: "Youssef A.", role: "Parent d'élève", text: "Mes enfants progressent vraiment vite en arabe. L'équipe est toujours disponible et à l'écoute." },
              { name: "Amira T.", role: "Étudiante", text: "La formation à distance est très bien pensée. Le contenu est riche et très bien présenté." },
            ].map((t, i) => (
              <div key={i} className="w-[300px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
                <div className="flex gap-1 text-[#f5b82e] text-sm">{"★★★★★"}</div>
                <p className="text-gray-500 text-[13px] leading-[1.75] flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-ishes-green flex items-center justify-center text-white text-[13px] font-black shrink-0">
                    {t.name[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-bold text-ishes-dark leading-none mb-0.5">{t.name}</p>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-ishes-green uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — scroll right */}
          <div className="flex gap-5 w-max animate-[marquee-reverse_100s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {[
              { name: "Imane R.", role: "Étudiante", text: "Le cours de Sîrah du Prophète ﷺ m'a vraiment touchée. Enseigné avec passion et rigueur." },
              { name: "Hassan D.", role: "Étudiant", text: "Grâce à ISHES, j'ai enfin compris les bases du Tajwid. Méthode claire et progressive." },
              { name: "Leila M.", role: "Étudiante", text: "Je recommande à 100%. Les enseignants sont compétents et très pédagogues." },
              { name: "Omar K.", role: "Parent d'élève", text: "Mon fils a fait d'énormes progrès en lecture du Coran. Merci à toute l'équipe ISHES !" },
              { name: "Soraya H.", role: "Étudiante", text: "La Tarbya Islamya m'a aidée à retrouver un équilibre spirituel dans ma vie quotidienne." },
              { name: "Bilal N.", role: "Étudiant", text: "Cours sérieux, contenu enrichissant. On sent que les fondateurs ont mis le cœur à l'ouvrage." },
              { name: "Zineb F.", role: "Étudiante", text: "ISHES est une vraie perle. Des connaissances profondes transmises avec bienveillance." },
              { name: "Rachid O.", role: "Parent d'élève", text: "Mes filles adorent leurs cours. La progression est rapide et bien encadrée." },
              // duplicate
              { name: "Imane R.", role: "Étudiante", text: "Le cours de Sîrah du Prophète ﷺ m'a vraiment touchée. Enseigné avec passion et rigueur." },
              { name: "Hassan D.", role: "Étudiant", text: "Grâce à ISHES, j'ai enfin compris les bases du Tajwid. Méthode claire et progressive." },
              { name: "Leila M.", role: "Étudiante", text: "Je recommande à 100%. Les enseignants sont compétents et très pédagogues." },
              { name: "Omar K.", role: "Parent d'élève", text: "Mon fils a fait d'énormes progrès en lecture du Coran. Merci à toute l'équipe ISHES !" },
              { name: "Soraya H.", role: "Étudiante", text: "La Tarbya Islamya m'a aidée à retrouver un équilibre spirituel dans ma vie quotidienne." },
              { name: "Bilal N.", role: "Étudiant", text: "Cours sérieux, contenu enrichissant. On sent que les fondateurs ont mis le cœur à l'ouvrage." },
              { name: "Zineb F.", role: "Étudiante", text: "ISHES est une vraie perle. Des connaissances profondes transmises avec bienveillance." },
              { name: "Rachid O.", role: "Parent d'élève", text: "Mes filles adorent leurs cours. La progression est rapide et bien encadrée." },
            ].map((t, i) => (
              <div key={i} className="w-[300px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
                <div className="flex gap-1 text-[#f5b82e] text-sm">{"★★★★★"}</div>
                <p className="text-gray-500 text-[13px] leading-[1.75] flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-ishes-green flex items-center justify-center text-white text-[13px] font-black shrink-0">
                    {t.name[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-bold text-ishes-dark leading-none mb-0.5">{t.name}</p>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-ishes-green uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RÉSEAUX SOCIAUX SECTION ===== */}
      <section className="bg-white border-t border-gray-100 py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-bold tracking-[0.3em] text-ishes-green uppercase mb-4">Communauté</p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-3">
              Rejoignez-nous sur les réseaux
            </h2>
            <p className="text-gray-400 text-[15px] mb-16">
              Suivez notre actualité, nos cours et nos publications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/Institut-des-Sciences-Humaines-et-Spirituelles/100064820028202/"
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 w-full sm:w-auto"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-[#f0f4ff] group-hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-[#1877F2]/25 group-hover:-translate-y-2">
                  <svg className="w-14 h-14 md:w-16 md:h-16 fill-[#1877F2] group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-gray-500 group-hover:text-[#1877F2] transition-colors">Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/institutishes/"
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 w-full sm:w-auto"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-[#fff0f5] group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-[#ee2a7b]/25 group-hover:-translate-y-2">
                  <svg className="w-14 h-14 md:w-16 md:h-16 fill-[#ee2a7b] group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.6.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-gray-500 group-hover:text-[#ee2a7b] transition-colors">Instagram</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@institutishes"
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 w-full sm:w-auto"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gray-50 group-hover:bg-black flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-black/20 group-hover:-translate-y-2">
                  <svg className="w-14 h-14 md:w-16 md:h-16 fill-gray-800 group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors">TikTok</span>
              </a>

            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
