"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, BookOpen, Star, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

const products = [
  {
    id: "chahada",
    title: "LA CHAHADA, le chemin de son cœur",
    subtitle: "HISTOIRES ET MORALES POUR COMPRENDRE LÂ ILÂHA ILLA ALLAH",
    description: "Donnez du sens à votre foi à travers des histoires vraies et morales inspirantes pour vous aider à vous connecter à ALLAH ﷻ.",
    image: "/images/livre_chahada.jpg",
    price: "19.90 €",
    tag: "Best-seller"
  },
  {
    id: "mohammed",
    title: "Mohammed ﷺ le Messager d'ALLAH ﷻ",
    subtitle: "UNE BIOGRAPHIE ACCESSIBLE POUR DÉCOUVRIR SA NOBLE VIE",
    description: "Cette étape propose de découvrir la seconde partie de l’attestation de foi : MOHAMMAD ﷺ Le Messager d’ALLAHﷻ, par l’étude de la Sîrah du Prophète ﷺ.",
    image: "/images/livre_sirah.png",
    price: "22.50 €",
    tag: "Must-have"
  },
  {
    id: "ramadan",
    title: "Mon Ramadan Planner",
    subtitle: "POUR ENFANTS : 30 JOURS DE SUIVI QUOTIDIEN",
    description: "De bonnes actions (Coran, prière, dhikr, dou'a...) et de bilans pour mieux comprendre et réussir son Ramadan.",
    image: "/images/livre_ramadan.png",
    price: "15.00 €",
    tag: "Nouveauté"
  },
  {
    id: "invocation",
    title: "Carnet d’invocation",
    subtitle: "VOTRE COMPAGNON D’APPRENTISSAGE AU QUOTIDIEN",
    description: "Conçu avec des invocations en arabe, phonétique et traduction française pour vous accompagner chaque jour.",
    image: "/images/livre_invocation.jpg",
    price: "12.90 €",
    tag: "Essentiel"
  }
];

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-ishes-green selection:text-white">
      <ArabicBackground />
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 lg:pt-48 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-ishes-green/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="ishes-label mb-4 block">Éditions ISHES</span>
            <h1 className="ishes-heading text-5xl md:text-8xl text-ishes-dark mb-6">
              LA BOUTIQUE <br />
              <span className="text-ishes-green italic font-serif">spirituelle.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Des supports pédagogiques et inspirants pour accompagner votre cheminement et celui de vos enfants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PRODUCTS GRID --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row gap-8 items-center md:items-start bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
              >
                {/* Product Image */}
                <div className="w-full md:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-black/10 shrink-0 relative">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-ishes-dark text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="flex-1 flex flex-col h-full justify-between py-2">
                  <div>
                    <h2 className="ishes-heading text-2xl text-ishes-dark mb-2 group-hover:text-ishes-green transition-colors leading-tight">
                      {product.title}
                    </h2>
                    <p className="ishes-label text-[10px] text-ishes-green mb-4 leading-tight opacity-80">
                      {product.subtitle}
                    </p>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <span className="ishes-heading text-xl text-ishes-dark">
                      {product.price}
                    </span>
                    <Button variant="ishes" className="h-12 px-6 gap-2">
                      Acheter en ligne <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INFO BANNER --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ishes-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            <div className="relative z-10 max-w-xl">
               <h2 className="ishes-heading text-4xl md:text-5xl mb-6">L'excellence au service du <span className="text-ishes-green italic">Savoir.</span></h2>
               <p className="text-white/60 font-medium text-lg leading-relaxed">
                 Toutes nos éditions sont relues et validées par nos enseignants pour garantir une transmission fidèle et adaptée.
               </p>
            </div>
            <div className="relative z-10 flex gap-8">
               <div className="text-center">
                  <div className="text-4xl ishes-heading text-ishes-green mb-1">100%</div>
                  <div className="ishes-label text-[8px] opacity-40">Authentique</div>
               </div>
               <div className="text-center">
                  <div className="text-4xl ishes-heading text-ishes-green mb-1">+5k</div>
                  <div className="ishes-label text-[8px] opacity-40">Lecteurs</div>
               </div>
               <div className="text-center">
                  <div className="text-4xl ishes-heading text-ishes-green mb-1">4.9/5</div>
                  <div className="ishes-label text-[8px] opacity-40">Avis Clients</div>
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
