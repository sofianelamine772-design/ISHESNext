export const dynamic = 'force-static';

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Users, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/vitrine/HeroSection";
import { StatsSection } from "@/components/vitrine/StatsSection";
import { SocialSection } from "@/components/vitrine/SocialSection";
import { ArabicBackground } from "@/components/ArabicBackground";
import { DynamicTestimonials } from "@/components/vitrine/DynamicTestimonials";

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
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-0 w-[600px] h-[600px] bg-gray-100/50 blur-[100px] rounded-full" />
      </div>

      {/* ─── HERO SECTION ─── */}
      {/* (HeroSection already has ArabicBackground internally) */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* ===== EMOTIONAL / JOURNEY SECTION (MINIMALIST & LIGHT) ===== */}
      <section className="bg-[#fcfbf9] py-24 relative overflow-hidden">
        {/* Subtle geometric pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#008953 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header (Le Problème) */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            {/* Les 3 mots d'ordre */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="px-5 py-2 bg-white border border-gray-200/60 rounded-full text-xs font-black text-gray-600 shadow-sm uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8b7355]" /> Légitimité
              </span>
              <span className="px-5 py-2 bg-white border border-gray-200/60 rounded-full text-xs font-black text-gray-600 shadow-sm uppercase tracking-widest flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#c8a96e]" /> Spiritualité
              </span>
              <span className="px-5 py-2 bg-white border border-gray-200/60 rounded-full text-xs font-black text-gray-600 shadow-sm uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-[#4a7c59]" /> Accompagnement
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2d3748] leading-[1.15] mb-6 tracking-tight">
              Tu veux avancer dans ta relation avec ALLAH… mais sans cadre, tu stagnes.
            </h2>
            <p className="text-gray-600 font-medium text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              À l’Institut ISHES, nous te proposons des cours structurés, encadrés par des enseignants expérimentés, avec un suivi réel pour transformer ta relation avec ALLAH.
            </p>

            {/* Nouveau Bloc "Le Problème" */}
            <div className="mt-12 max-w-3xl mx-auto bg-[#fcfaf7] p-8 md:p-10 rounded-[2.5rem] border border-[#f5f0e6] text-left shadow-sm relative overflow-hidden">
               <h3 className="text-xs font-black text-[#8b7355] tracking-widest uppercase mb-6 inline-block bg-[#f0e6d2]/50 px-4 py-1.5 rounded-full">Le Problème</h3>
               <p className="text-[#2d3748] font-black text-xl md:text-3xl leading-snug mb-6">
                 Aujourd’hui, beaucoup veulent apprendre…<br/>
                 <span className="font-medium text-gray-500 text-lg md:text-xl">mais sans cadre, sans méthode et sans accompagnement.</span>
               </p>
               
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                 <div className="text-gray-500 font-medium text-lg">
                   <strong className="text-[#8b7355] uppercase tracking-wider text-xs block mb-1">Résultat</strong>
                   <span className="text-[#2d3748] font-bold">Tu avances seul… puis tu t’arrêtes.</span>
                 </div>
               </div>
               
               <p className="text-[#2d3748] font-black text-lg md:text-xl flex items-start sm:items-center gap-4 bg-[#f2f7f4] p-6 rounded-2xl border border-[#e0ece5]">
                 <span className="text-2xl shrink-0 mt-1 sm:mt-0">👉</span> 
                 <span><strong className="text-[#4a7c59]">Sans accompagnement</strong>, il n’y a pas de progression durable.</span>
               </p>
            </div>
          </div>

          {/* === LA SOLUTION ISHES === */}
          <div className="max-w-7xl mx-auto mt-24">
            <div className="text-center mb-16">
              <span className="px-5 py-2 rounded-full bg-ishes-green/10 text-ishes-green text-xs font-black uppercase tracking-widest border border-ishes-green/20">Notre Approche</span>
              <h3 className="text-3xl md:text-5xl font-black text-ishes-dark mt-6 tracking-tight">Une solution pensée pour chacun</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
              
              {/* Carte 1 : Adulte */}
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b7355]/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
                
                <div className="text-4xl mb-6 relative z-10">👤</div>
                <h4 className="text-2xl font-black text-ishes-dark mb-1 relative z-10">Adulte</h4>
                <div className="text-[#8b7355] text-xs font-black uppercase tracking-widest mb-8 relative z-10">Solution ISHES</div>
                
                <p className="text-gray-500 font-medium leading-relaxed mb-8 relative z-10 h-14">
                  Pour les frères et sœurs en quête de science religieuse.
                </p>

                <div className="space-y-5 relative z-10 border-t border-gray-100 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#8b7355]/10 flex items-center justify-center text-[#8b7355]">
                      <ShieldCheck strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700">Structure & Cadre</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#8b7355]/10 flex items-center justify-center text-[#8b7355]">
                      <Users strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700">Accompagnement</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#8b7355]/10 flex items-center justify-center text-[#8b7355]">
                      <Heart strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700">Pédagogie Adaptée</span>
                  </div>
                </div>

                <div className="relative z-10 text-center mt-8">
                  <Link href="/programmes" className="inline-block w-full py-4 px-6 rounded-2xl bg-ishes-dark text-white font-black hover:bg-[#1a202c] transition-all hover:scale-[1.02] shadow-md">
                    Découvrir nos cours
                  </Link>
                </div>
              </div>

              {/* Carte 2 : Parent (Enfant) - HIGHLIGHTED */}
              <div className="bg-gradient-to-b from-[#c8a96e] to-[#a88a53] rounded-[2.5rem] p-8 lg:p-10 border border-[#c8a96e] shadow-2xl hover:shadow-[#c8a96e]/30 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden md:-mt-4 md:mb-4">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                
                <div className="text-4xl mb-6 relative z-10">🧑🧒</div>
                <h4 className="text-2xl font-black text-white mb-1 relative z-10">Parent (Enfant)</h4>
                <div className="text-white/70 text-xs font-black uppercase tracking-widest mb-8 relative z-10">Solution ISHES</div>
                
                <p className="text-white/80 font-medium leading-relaxed mb-8 relative z-10 h-14">
                  Pour transmettre la religion et les valeurs à la nouvelle génération.
                </p>

                <div className="space-y-5 relative z-10 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                      <ShieldCheck strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white">Structure & Cadre</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                      <Users strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white">Accompagnement</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                      <Heart strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white">Pédagogie Adaptée</span>
                  </div>
                </div>

                <div className="relative z-10 text-center mt-8">
                  <Link href="/programmes" className="inline-block w-full py-4 px-6 rounded-2xl bg-white text-[#c8a96e] font-black hover:bg-gray-50 transition-all hover:scale-[1.02] shadow-lg">
                    Découvrir nos cours
                  </Link>
                </div>
              </div>

              {/* Carte 3 : Futur enseignant */}
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a96e]/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
                
                <div className="text-4xl mb-6 relative z-10">👩‍🏫</div>
                <h4 className="text-2xl font-black text-ishes-dark mb-1 relative z-10">Enseignant</h4>
                <div className="text-[#c8a96e] text-xs font-black uppercase tracking-widest mb-8 relative z-10">Solution ISHES</div>
                
                <p className="text-gray-500 font-medium leading-relaxed mb-8 relative z-10 h-14">
                  Pour se former, se légitimer et enseigner à son tour.
                </p>

                <div className="space-y-5 relative z-10 border-t border-gray-100 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#c8a96e]/10 flex items-center justify-center text-[#c8a96e]">
                      <ShieldCheck strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700">Structure & Cadre</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#c8a96e]/10 flex items-center justify-center text-[#c8a96e]">
                      <Users strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700">Accompagnement</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#c8a96e]/10 flex items-center justify-center text-[#c8a96e]">
                      <Heart strokeWidth={2} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700">Pédagogie Adaptée</span>
                  </div>
                </div>

                <div className="relative z-10 text-center mt-8">
                  <Link href="/programmes" className="inline-block w-full py-4 px-6 rounded-2xl bg-ishes-dark text-white font-black hover:bg-[#1a202c] transition-all hover:scale-[1.02] shadow-md">
                    Découvrir nos cours
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== MINI FORMATION SECTION ===== */}
      <section className="bg-[#fafafa] py-4 border-b border-gray-100/30">
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

      {/* ===== ZOOM & WHATSAPP SECTION ===== */}
      <section className="bg-white py-16 border-b border-gray-100/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-dark leading-tight mb-4">
              Un apprentissage <span className="text-[#0b5cff] italic">interactif</span> & un suivi <span className="text-[#25D366] italic">continu</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">Où que vous soyez, profitez d'une expérience d'apprentissage immersive et d'une communauté soudée.</p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
            {/* Zoom Card */}
            <div className="flex-1 flex flex-col items-center text-center p-10 bg-[#fafafa] border-2 border-blue-50 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#0b5cff]/30 transition-all w-full">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-8 rotate-[-3deg] hover:rotate-0 transition-transform">
                <img src="/images/Zoom-Logo.png" alt="Zoom" className="h-10 object-contain" />
              </div>
              <h4 className="text-2xl font-black text-ishes-dark mb-4 tracking-tight">Cours en direct & Replays</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">Suivez nos formations à distance de chez vous. Si vous manquez un cours, le <strong className="text-[#0b5cff]">replay vidéo</strong> est disponible dès la fin de chaque séance.</p>
            </div>

            {/* WhatsApp Card */}
            <div className="flex-1 flex flex-col items-center text-center p-10 bg-[#fafafa] border-2 border-green-50 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#25D366]/30 transition-all w-full">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-8 rotate-[3deg] hover:rotate-0 transition-transform">
                <img src="/images/whatsapp-logo.avif" alt="WhatsApp" className="h-14 w-14 object-cover rounded-full" />
              </div>
              <h4 className="text-2xl font-black text-ishes-dark mb-4 tracking-tight">Suivi & Entraide par Classe</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">Intégrez un <strong className="text-[#25D366]">groupe WhatsApp exclusif</strong> pour votre classe. Posez vos questions, recevez les annonces et échangez avec vos camarades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NOTRE INSTITUT SECTION (HAS ARABIC TEXT) ===== */}
      <section className="relative bg-[#fafafa] overflow-hidden pt-10 md:pt-14 pb-24 md:pb-32">
        <ArabicBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

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

            {/* Visual Column */}
            <div className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/institut-ishes-accueil-hero.png"
                alt="Institut ISHES"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-ishes-green/10 mix-blend-overlay" />
            </div>

          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGES SECTION ===== */}
      <DynamicTestimonials />

      {/* ===== RÉSEAUX SOCIAUX SECTION ===== */}
      <SocialSection />

    </div>
  );
}
