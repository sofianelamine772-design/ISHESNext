import { Metadata } from "next";
import { BoutiqueHero } from "@/components/vitrine/BoutiqueHero";
import { BoutiqueProducts } from "@/components/vitrine/BoutiqueProducts";

export const metadata: Metadata = {
  title: "Boutique ISHES - Supports pédagogiques et spirituels",
  description: "Découvrez les éditions ISHES : livres, planners et carnets pour accompagner votre cheminement spirituel et celui de vos enfants.",
};

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-ishes-green selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <BoutiqueHero />

      {/* --- PRODUCTS GRID --- */}
      <BoutiqueProducts />

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
