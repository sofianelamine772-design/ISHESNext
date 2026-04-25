import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { HeroSection } from "@/components/vitrine/HeroSection";
import { StatsSection } from "@/components/vitrine/StatsSection";
import { TestimonialsMarquee } from "@/components/vitrine/TestimonialsMarquee";
import { SocialSection } from "@/components/vitrine/SocialSection";
import { ArabicBackground } from "@/components/ArabicBackground";

export const metadata: Metadata = {
  title: "ISHES - L'excellence de la langue arabe à Toulouse",
  description: "Découvrez l'Institut des Sciences Humaines et Spirituelles de Toulouse. Formation en langue arabe, sciences islamiques et tajwid. Pédagogie certifiée CECRL.",
  openGraph: {
    title: "ISHES - Institut des Sciences Humaines et Spirituelles",
    description: "Apprenez l'arabe et les sciences islamiques avec une pédagogie d'excellence à Toulouse et à distance.",
    images: ["/images/home-hero.png"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fafafa]">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-0 w-[600px] h-[600px] bg-gray-100/50 blur-[100px] rounded-full" />
      </div>

      {/* ─── HERO SECTION ─── */}
      {/* (HeroSection already has ArabicBackground internally) */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* ===== MINI FORMATION SECTION ===== */}
      <section className="bg-[#fafafa] py-12 border-b border-gray-100/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#fafafa] border border-gray-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-500">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                {["Sciences Islamiques", "Langue Arabe", "Tajwid"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-ishes-green/5 text-ishes-green text-[10px] font-black uppercase tracking-widest rounded-md border border-ishes-green/10">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-ishes-dark font-black text-2xl md:text-3xl mb-4 leading-tight">
                Formation à <span className="text-ishes-green italic">Toulouse</span> & <span className="text-[#c8a96e] italic">à distance</span>.
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
          </div>
        </div>
      </section>

      {/* ===== NOTRE INSTITUT SECTION (HAS ARABIC TEXT) ===== */}
      <section className="relative bg-[#fafafa] overflow-hidden py-24 md:py-32">
        <ArabicBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Visual Column */}
            <div className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/home-hero.png"
                alt="Institut ISHES"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-ishes-green/10 mix-blend-overlay" />
            </div>

            {/* Content Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-[2px] bg-ishes-green" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-ishes-green uppercase">Notre Institut</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-[1.1] tracking-tight mb-8">
                Un savoir qui transforme<br />
                <span className="text-ishes-green italic">chaque musulman.</span>
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                <p>
                  L'Institut des Sciences Humaines et Spirituelles de Toulouse est porté par un couple — également fondateur de l'école <strong className="text-ishes-dark">Transmettre</strong> —, forts de <strong className="text-ishes-dark">plus de 15 ans d'expérience</strong> dans l'enseignement.
                </p>
                <p>
                  Ils ont souhaité élargir l'accès à un véritable cheminement spirituel, en offrant à chacun la possibilité d'apprendre où qu'il se trouve, à son rythme.
                </p>
              </div>

              <div className="mt-12 relative pl-7 border-l-4 border-ishes-green">
                <p className="text-ishes-dark text-xl leading-relaxed font-bold italic">
                  "Notre mission : ouvrir les portes d'un savoir qui transforme, pour que chaque musulman puisse vivre sa religion avec conscience, équilibre et profondeur."
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ishes-green/10 flex items-center justify-center text-ishes-green">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-ishes-dark uppercase tracking-widest">Mr & Mme Latreche</div>
                  <div className="text-xs text-gray-400 font-bold">Fondateurs de l'ISHES</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGES SECTION ===== */}
      <section className="bg-[#fafafa] py-20 border-y border-gray-100/30">
        <TestimonialsMarquee />
      </section>

      {/* ===== RÉSEAUX SOCIAUX SECTION ===== */}
      <SocialSection />

    </div>
  );
}
