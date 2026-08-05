import { Metadata } from "next";
import { BoutiqueHero } from "@/components/vitrine/BoutiqueHero";
import { BoutiqueProducts } from "@/components/vitrine/BoutiqueProducts";

export const metadata: Metadata = {
  title: "Boutique ISHES - Supports pédagogiques et spirituels",
  description: "Découvrez les éditions ISHES : livres, planners et carnets pour accompagner votre cheminement spirituel et celui de vos enfants.",
};

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-ishes-blue selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <BoutiqueHero />

      {/* --- PRODUCTS GRID --- */}
      <BoutiqueProducts />



    </div>
  );
}
