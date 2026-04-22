"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function InstitutManifesto() {
  return (
    <section className="bg-white py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
         <Image src="/logo.png" width={600} height={200} className="grayscale" alt="" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-end">
          <div className="space-y-12">
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
             >
                <h2 className="text-ishes-dark font-black text-4xl md:text-6xl leading-[1.1] tracking-tight">
                  L’architecture au <br />
                  <span className="text-ishes-green">service du sens.</span>
                </h2>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6 text-gray-500 text-xl font-medium leading-relaxed"
             >
                <p>
                  Chaque courbe, chaque matériau et chaque source de lumière ont été sélectionnés pour créer un environnement de "Sakinah" (sérénité). 
                </p>
                <p>
                  Nous croyons que l'espace physique influence profondément la qualité de l'apprentissage spirituel. C'est pourquoi nous avons troqué les salles de classe traditionnelles pour des espaces de vie polyvalents et inspirants.
                </p>
             </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl relative"
             >
               <Image 
                 src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop" 
                 alt="Learning space" 
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 50vw, 25vw"
               />
             </motion.div>
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl mt-12 relative"
             >
               <Image 
                 src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                 alt="Inspiring interior" 
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 50vw, 25vw"
               />
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
