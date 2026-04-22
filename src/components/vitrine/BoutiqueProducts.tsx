"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

export function BoutiqueProducts() {
  return (
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
                <Image 
                  src={product.image} 
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 30vw, 20vw"
                />
                <div className="absolute top-3 left-3 z-10">
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
  );
}
