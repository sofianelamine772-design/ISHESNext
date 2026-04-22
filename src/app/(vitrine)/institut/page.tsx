import { Metadata } from "next";
import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import { InstitutHero } from "@/components/vitrine/InstitutHero";
import { InstitutManifesto } from "@/components/vitrine/InstitutManifesto";
import { InstitutFacilities } from "@/components/vitrine/InstitutFacilities";

export const metadata: Metadata = {
  title: "L'Institut ISHES - Un écosystème spirituel à Toulouse",
  description: "Découvrez notre institut au cœur de Toulouse. Un espace conçu pour la sérénité et l'apprentissage des sciences humaines et spirituelles.",
};

export default function InstitutPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-ishes-green selection:text-white">
      
      {/* --- HERO SECTION: CINEMATIC --- */}
      <InstitutHero />

      {/* --- THE MANIFESTO --- */}
      <InstitutManifesto />

      {/* --- THE FACILITIES --- */}
      <InstitutFacilities />

      {/* --- THE CALL TO VISIT --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f8f8f8] rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative border border-gray-100">
             <div className="absolute top-0 right-0 w-[50%] h-full bg-[#eeeeee] skew-x-12 translate-x-20 -z-0" />
             
             <div className="max-w-xl relative z-10">
                <span className="text-ishes-green font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Prendre rendez-vous</span>
                <h2 className="text-5xl md:text-7xl font-black text-ishes-dark leading-[0.95] tracking-tighter mb-8 italic">
                   NOTRE <br /> MAISON.
                </h2>
                <p className="text-xl text-gray-500 font-medium mb-12">
                   L'institut est situé au 15 rue des Sciences à Toulouse. Nous vous accueillons pour une visite guidée et un café de bienvenue.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                   <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-ishes-dark text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-ishes-dark/20 flex items-center justify-center gap-3">
                      Lancer l'itinéraire <MapPin className="w-4 h-4 text-ishes-green" />
                   </a>
                   <Link href="/contact" className="bg-white border border-gray-200 text-ishes-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all flex items-center justify-center">
                      Réserver une visite
                   </Link>
                </div>
             </div>

             <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 h-full">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                   <h6 className="font-black text-ishes-dark text-xs uppercase tracking-widest mb-4 opacity-30">Horaires</h6>
                   <ul className="space-y-2 text-sm font-bold text-gray-600">
                      <li className="flex justify-between"><span>LUN - VEN</span> <span>9H - 21H</span></li>
                      <li className="flex justify-between"><span>SAMEDI</span> <span>10H - 18H</span></li>
                      <li className="flex justify-between text-gray-300"><span>DIMANCHE</span> <span>FERMÉ</span></li>
                   </ul>
                </div>
                <div className="bg-ishes-green p-8 rounded-3xl shadow-lg shadow-ishes-green/20 text-white flex flex-col justify-between">
                   <Navigation className="w-8 h-8 opacity-50" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">MÉTRO</p>
                      <p className="text-lg font-black leading-none">LIGNE A <br /> RÉPUBLIQUE</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
