export const dynamic = 'force-static';

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Users, Sparkles, BookHeart, Gift } from "lucide-react";
import { HeroSection } from "@/components/vitrine/HeroSection";
import { StatsSection } from "@/components/vitrine/StatsSection";
import { SocialSection } from "@/components/vitrine/SocialSection";
import { ArabicBackground } from "@/components/ArabicBackground";
import { DynamicTestimonials } from "@/components/vitrine/DynamicTestimonials";
import { InstitutVideo } from "@/components/vitrine/InstitutVideo";
import { NewHomeSections } from "@/components/vitrine/NewHomeSections";

export const metadata: Metadata = {
  title: "ISHES - L'excellence de la langue arabe à Toulouse",
  description: "Découvrez l'Institut des Sciences Humaines et Spirituelles de Toulouse. Formation en langue arabe, sciences islamiques et tajwid. Pédagogie certifiée CECRL.",
  openGraph: {
    title: "ISHES - Institut des Sciences Humaines et Spirituelles",
    description: "Apprenez l'arabe et les sciences islamiques avec une pédagogie d'excellence à Toulouse et à distance.",
    images: ["/images/institut-ishes-accueil-hero.png"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fafafa]">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-0 w-[600px] h-[600px] bg-gray-100/50 blur-[100px] rounded-full" />
      </div>

      {/* ─── HERO SECTION ─── */}
      {/* (HeroSection already has ArabicBackground internally) */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      <NewHomeSections />



      {/* ===== ZOOM & WHATSAPP SECTION ===== */}
      <section className="pt-24 pb-8 border-b border-gray-100/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight mb-6">
              Un apprentissage <span className="text-ishes-gold font-serif">interactif</span> & un suivi <span className="text-ishes-gold font-serif">continu</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">Où que vous soyez, profitez d'une expérience d'apprentissage immersive et d'une communauté soudée.</p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
            {/* Zoom Card */}
            <div className="flex-1 flex flex-col items-center text-center p-6 sm:p-10 bg-[#f9f5f0] border border-ishes-gold/10 rounded-3xl sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 w-full group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center mb-6 sm:mb-8 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500">
                <img src="/images/Zoom-Logo.png" alt="Zoom" className="h-10 object-contain" />
              </div>
              <h4 className="text-2xl font-black text-ishes-dark mb-4 tracking-tight">Cours en direct & Replays</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">Suivez nos formations à distance de chez vous. Si vous manquez un cours, le <strong className="text-ishes-blue">replay vidéo</strong> est disponible dès la fin de chaque séance.</p>
            </div>

            {/* WhatsApp Card */}
            <div className="flex-1 flex flex-col items-center text-center p-6 sm:p-10 bg-[#f9f5f0] border border-ishes-gold/10 rounded-3xl sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 w-full group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center mb-6 sm:mb-8 rotate-[3deg] group-hover:rotate-0 transition-transform duration-500">
                <img src="/images/whatsapp-logo.avif" alt="WhatsApp" className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-full" />
              </div>
              <h4 className="text-2xl font-black text-ishes-dark mb-4 tracking-tight">Suivi pédagogique</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">Intégrez le <strong className="text-[#25D366]">groupe WhatsApp de la classe</strong>. Posez vos questions, recevez les annonces et échangez avec vos camarades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PACK ACCOMPAGNEMENT CTA ===== */}
      <section className="py-8 relative overflow-hidden border-b border-gray-100/30">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fef2f2] text-[#ef4444] rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm border border-[#fef2f2]">
            <Gift className="w-3.5 h-3.5" />
            Offre Exceptionnelle
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight mb-6">
            Le Pack <span className="text-ishes-gold font-serif">Accompagnement</span>
          </h2>

          <div className="bg-[#f9f5f0]/80 border border-ishes-gold/20 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto mb-10 shadow-sm backdrop-blur-sm">
            <p className="text-ishes-dark font-black text-lg md:text-xl mb-3">
              🎉 <span className="text-ishes-blue">100% OFFERT</span> (Valeur de 399€) pour tout achat d'une de nos formations !
            </p>
            <p className="text-gray-500 font-medium text-[15px] md:text-[16px] leading-relaxed">
              Ne cheminez plus seul vers ALLAH. En rejoignant ISHES, vous débloquez immédiatement un accès gratuit à notre communauté privée, nos lives exclusifs et notre suivi spirituel personnalisé.
            </p>
          </div>

          <Link
            href="/fr/pack-accompagnement"
            className="inline-flex items-center gap-3 bg-ishes-gold text-white px-10 py-4 rounded-full text-[15px] font-black uppercase tracking-widest transition-all shadow-sm hover:-translate-y-1 hover:shadow-xl hover:brightness-95 active:scale-95 group"
          >
            Découvrir le Pack
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>


      {/* ===== TÉMOIGNAGES SECTION ===== */}
      <DynamicTestimonials />

      {/* ===== RÉSEAUX SOCIAUX SECTION ===== */}
      <SocialSection />

    </div>
  );
}
