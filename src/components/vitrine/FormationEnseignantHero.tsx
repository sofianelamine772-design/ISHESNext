"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

const formations = [
  {
    id: "nour-al-bayan",
    link: "/fr/formation-enseignant-tajwid",
    image: "/images/formations/arabe-enfant-distance-2.jpg",
    title: "Formation Enseignant de Tajwid",
    pricing: "Devis personnalisé",
  },
  {
    id: "tarbya-islamya",
    link: "/fr/formation-enseignant-tarbya",
    title: "Formation Enseignant Tarbya Islamiya",
    pricing: "Devis personnalisé",
  },
];

export function FormationEnseignantHero() {
  return (
    <>
      <section className="relative pt-44 pb-32 md:pt-56 md:pb-48 overflow-hidden">
        <ArabicBackground />
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] bg-ishes-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[95px] font-black text-ishes-dark leading-[0.9] tracking-tighter mb-10 uppercase"
            >
              <span className="block text-ishes-gold">DEVENEZ</span>
              <span className="text-ishes-dark whitespace-nowrap">ENSEIGNANT CERTIFIÉ</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-6">
                Transmettre avec légitimité, amour et pédagogie.
              </h2>
              <div className="space-y-4 text-lg text-gray-500 font-medium leading-relaxed">
                <p>
                  Vous aspirez à enseigner notre noble religion avec amour, légitimité et rigueur ? L&apos;Institut ISHES
                  vous forme à cette mission. Seul institut en France spécialisé dans la formation certifiante des
                  enseignants en Tarbiya Islamiyya et en Tajwid.
                </p>
                <p>Formation au service des associations, mosquées, écoles coraniques et familles.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left relative z-20"
            >
              {formations.map((f) => (
                <div
                  key={f.id}
                  className="bg-ishes-dark rounded-[2.5rem] p-10 border border-ishes-gold/20 shadow-xl hover:shadow-2xl hover:border-ishes-gold/40 hover:-translate-y-2 transition-all duration-500 group relative flex flex-col h-full overflow-hidden items-center text-center"
                >
                  {f.image && (
                    <>
                      <div className="absolute inset-0 z-0">
                        <img
                          src={f.image}
                          alt={`${f.title} — devenir enseignant du Coran, Institut ISHES`}
                          className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                        />
                      </div>
                      <div className="absolute inset-0 bg-ishes-dark/60 z-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ishes-dark via-transparent to-transparent z-0" />
                    </>
                  )}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-gold/5 rounded-bl-[100px] transition-transform group-hover:scale-110 z-0" />

                  <div className="relative z-10 flex flex-col h-full w-full justify-between gap-12">
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mt-4 group-hover:text-ishes-gold transition-colors uppercase">
                      {f.title}
                    </h3>
                    <div className="flex flex-col items-center gap-6 w-full">
                      <span className="text-xl font-black text-white">{f.pricing}</span>
                      <Link
                        href={f.link}
                        className="w-full py-4 rounded-2xl bg-ishes-gold text-white hover:brightness-95 font-black transition-all duration-300 text-sm uppercase tracking-widest text-center shadow-lg shadow-ishes-gold/20 hover:-translate-y-1 hover:shadow-xl"
                      >
                        Voir le programme
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-16 mb-16 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 text-center">
            <p className="text-4xl font-black text-ishes-blue mb-2">15+</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
              années d&apos;expérience dans la formation d&apos;enseignants
            </p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-100" />
          <div className="flex-1 text-center">
            <p className="text-4xl font-black text-ishes-blue mb-2">Méthode</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
              exclusive « Les Clés du Coran »
            </p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-100" />
          <div className="flex-1 text-center">
            <p className="text-4xl font-black text-ishes-blue mb-2">100%</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
              Accompagnement avant, pendant et après
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ishes-blue/5 py-16 border-y border-ishes-blue/10 relative overflow-hidden">
        <ArabicBackground />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-ishes-blue/10 text-ishes-blue rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-6 tracking-tight">
            Un projet pour enseigner ? Parlons-en.
          </h2>
          <p className="text-xl text-gray-500 font-medium mb-10">
            Nos conseillers pédagogiques vous orientent vers la formation enseignant adaptée (Tajwid ou Tarbiya),
            sans engagement.
          </p>
          <Link
            href="/contact"
            className="inline-flex bg-ishes-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#007044] transition-all hover:shadow-xl shadow-ishes-blue/20 hover:-translate-y-1"
          >
            Entretien gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
