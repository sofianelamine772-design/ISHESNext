"use client";

import { motion } from "framer-motion";
import { Coffee, Wifi, Sun, Heart, Clock, Calendar, MapPin, Navigation } from "lucide-react";

const facilities = [
  { icon: <Wifi />, title: "Fibre Ultra-Rapide", desc: "Connectivité totale." },
  { icon: <Coffee />, title: "Salon de Thé", desc: "Hospitalité & échanges." },
  { icon: <Sun />, title: "Puits de Lumière", desc: "Éclairage naturel constant." },
  { icon: <Heart />, title: "Espace Prière", desc: "Sérénité & recueillement." },
  { icon: <Clock />, title: "Accès Étendu", desc: "Ouvert jusqu'à 21h." },
  { icon: <Calendar />, title: "Évènements", desc: "Conférences hebdomadaires." },
  { icon: <MapPin />, title: "Tram/Métro", desc: "À 2min de la station." },
  { icon: <Navigation />, title: "Parking Sécurisé", desc: "Réservé aux étudiants." }
];

export function InstitutFacilities() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-x-12 gap-y-16">
          {facilities.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl text-ishes-dark shrink-0">
                {f.icon}
              </div>
              <div>
                 <h5 className="font-black text-ishes-dark text-sm uppercase tracking-widest mb-1">{f.title}</h5>
                 <p className="text-gray-400 font-medium text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
