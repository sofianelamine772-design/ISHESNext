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

      {/* ===== EMOTIONAL / JOURNEY SECTION (MINIMALIST & LIGHT) ===== */}
      <section className="bg-[#fafafa] py-32 relative overflow-hidden">
        {/* Subtle geometric pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-ishes-blue) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header (Le Problème) */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            {/* Les 3 mots d'ordre */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="px-5 py-2 bg-white border border-gray-200/60 rounded-full text-xs font-black text-gray-600 shadow-sm uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-ishes-gold" /> Légitimité
              </span>
              <span className="px-5 py-2 bg-white border border-gray-200/60 rounded-full text-xs font-black text-gray-600 shadow-sm uppercase tracking-widest flex items-center gap-2">
                <Heart className="w-4 h-4 text-ishes-gold" /> Spiritualité
              </span>
              <span className="px-5 py-2 bg-white border border-gray-200/60 rounded-full text-xs font-black text-gray-600 shadow-sm uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-[#4a7c59]" /> Accompagnement
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ishes-dark leading-[1.15] mb-6 tracking-tight">
              Tu veux avancer dans ta relation avec ALLAH… mais sans cadre, tu stagnes.
            </h2>
            <p className="text-gray-600 font-medium text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              À l’Institut ISHES, nous te proposons des cours structurés, encadrés par des enseignants expérimentés, avec un suivi réel pour transformer ta relation avec ALLAH.
            </p>

            {/* Nouveau Bloc "Le Problème" */}
            <div className="mt-12 max-w-3xl mx-auto bg-[#f9f5f0] p-8 md:p-10 rounded-[2.5rem] border border-ishes-gold/10 text-left shadow-sm relative overflow-hidden">
              <h3 className="text-xs font-black text-ishes-gold tracking-widest uppercase mb-6 inline-block bg-[#f0e6d2]/50 px-4 py-1.5 rounded-full">Le Problème</h3>
              <p className="text-ishes-dark font-black text-xl md:text-3xl leading-snug mb-6">
                Aujourd’hui, beaucoup veulent apprendre…<br />
                <span className="font-medium text-gray-500 text-lg md:text-xl">mais sans cadre, sans méthode et sans accompagnement.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-gray-500 font-medium text-lg">
                  <strong className="text-ishes-gold uppercase tracking-wider text-xs block mb-1">Résultat</strong>
                  <span className="text-ishes-dark font-bold text-ishes-gold italic font-serif text-2xl">Tu avances seul… puis tu t’arrêtes.</span>
                </div>
              </div>

              <p className="text-ishes-dark font-black text-lg md:text-xl flex items-start sm:items-center gap-4 bg-ishes-blue/5 p-6 rounded-[2rem] border border-ishes-blue/10">
                <span className="text-2xl shrink-0 mt-1 sm:mt-0">👉</span>
                <span><strong className="text-ishes-blue">Sans accompagnement</strong>, il n’y a pas de progression durable.</span>
              </p>
            </div>
          </div>

          {/* === LES 3 PILIERS ISHES === */}
          <div className="max-w-7xl mx-auto mt-20 mb-12 px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Carte 1 */}
              <div className="bg-[#f9f5f0] border border-ishes-gold/10 rounded-[2rem] p-6 flex flex-col sm:flex-row gap-5 items-start transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 shrink-0 rounded-full bg-ishes-blue flex items-center justify-center text-white shadow-sm">
                  <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-ishes-dark mb-2">1. Légitimité & Expertise</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Plus de 16 ans d'expérience, une méthode pédagogique éprouvée et reconnue en France pour la formation des enseignants.
                  </p>
                  <Link href="/institut" className="inline-flex items-center gap-1.5 text-xs font-bold text-ishes-dark hover:text-ishes-blue transition-colors group">
                    Découvrir notre histoire
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Carte 2 */}
              <div className="bg-[#f9f5f0] border border-ishes-gold/10 rounded-[2rem] p-6 flex flex-col sm:flex-row gap-5 items-start transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 shrink-0 rounded-full bg-ishes-gold flex items-center justify-center text-white shadow-sm">
                  <BookHeart className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-ishes-dark mb-2">2. Spiritualité & Transformation</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Nous formons le cœur et l'esprit pour comprendre le sens profond des enseignements et purifier son âme (Tazkiyat an-nafs).
                  </p>
                  <Link href="/conseil-spiritualite" className="inline-flex items-center gap-1.5 text-xs font-bold text-ishes-dark hover:text-ishes-blue transition-colors group">
                    En savoir plus
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Carte 3 */}
              <div className="bg-[#f9f5f0] border border-ishes-gold/10 rounded-[2rem] p-6 flex flex-col sm:flex-row gap-5 items-start transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 shrink-0 rounded-full bg-ishes-blue flex items-center justify-center text-white shadow-sm">
                  <Users className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-ishes-dark mb-2">3. Accompagnement Permanent</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Groupes WhatsApp, lives, replays, suivi personnalisé, réponses aux questions et conseils tout au long de votre parcours.
                  </p>
                  <Link href="/fr/pack-accompagnement" className="inline-flex items-center gap-1.5 text-xs font-bold text-ishes-dark hover:text-ishes-blue transition-colors group">
                    Découvrir l'accompagnement
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* === LA SOLUTION ISHES === */}
          <div className="max-w-7xl mx-auto mt-24">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-5xl font-black text-ishes-dark tracking-tight">Une solution pensée pour chacun : enfant, adulte, enseignant</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-10">

              {/* Carte 1 : Adulte */}
              <div className="bg-[#f9f5f0] rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-gold/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>

                <div className="text-4xl mb-6 relative z-10">👤</div>
                <h4 className="text-2xl font-black text-ishes-dark mb-4 relative z-10">Adulte</h4>

                <p className="text-gray-500 font-medium leading-relaxed mb-8 relative z-10 flex-grow">
                  Pour les frères et sœurs en quête de science religieuse.
                </p>

                <div className="relative z-10 text-center mt-auto pt-4 border-t border-gray-100">
                  <Link href="/program" className="inline-block w-full py-4 px-6 rounded-2xl bg-ishes-dark text-white font-black hover:bg-gray-900 transition-all hover:scale-[1.02] shadow-md">
                    Découvrir nos cours
                  </Link>
                </div>
              </div>

              {/* Carte 2 : Enfant / Adolescent - HIGHLIGHTED */}
              <div className="bg-[#f9f5f0] rounded-[2.5rem] p-8 lg:p-10 border-2 border-ishes-gold shadow-[0_8px_30px_rgb(200,169,110,0.15)] hover:shadow-[0_20px_40px_rgb(200,169,110,0.25)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden md:-mt-4 md:mb-4 flex flex-col h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-ishes-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-110"></div>

                <div className="text-4xl mb-6 relative z-10">🧑🧒</div>
                <h4 className="text-2xl font-black text-ishes-dark mb-4 relative z-10">Enfant / Adolescent</h4>

                <p className="text-gray-500 font-medium leading-relaxed mb-8 relative z-10 flex-grow">
                  Pour transmettre la religion et les valeurs à la nouvelle génération.
                </p>

                <div className="relative z-10 text-center mt-auto pt-4 border-t border-gray-100">
                  <Link href="/program" className="inline-block w-full py-4 px-6 rounded-2xl bg-ishes-gold text-white font-black hover:bg-[#b59659] transition-all hover:scale-[1.02] shadow-lg shadow-ishes-gold/30">
                    Découvrir nos cours
                  </Link>
                </div>
              </div>

              {/* Carte 3 : Futur enseignant */}
              <div className="bg-[#f9f5f0] rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-gold/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>

                <div className="text-4xl mb-6 relative z-10">👩‍🏫</div>
                <h4 className="text-2xl font-black text-ishes-dark mb-4 relative z-10">Enseignant</h4>

                <p className="text-gray-500 font-medium leading-relaxed mb-8 relative z-10 flex-grow">
                  Pour se former, se légitimer et enseigner à son tour.
                </p>

                <div className="relative z-10 text-center mt-auto pt-4 border-t border-gray-100">
                  <Link href="/formation-enseignant" className="inline-block w-full py-4 px-6 rounded-2xl bg-ishes-dark text-white font-black hover:bg-gray-900 transition-all hover:scale-[1.02] shadow-md">
                    Découvrir nos cours
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* ===== ZOOM & WHATSAPP SECTION ===== */}
      <section className="pt-24 pb-8 border-b border-gray-100/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight mb-6">
              Un apprentissage <span className="text-ishes-gold italic font-serif">interactif</span> & un suivi <span className="text-ishes-gold italic font-serif">continu</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">Où que vous soyez, profitez d'une expérience d'apprentissage immersive et d'une communauté soudée.</p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
            {/* Zoom Card */}
            <div className="flex-1 flex flex-col items-center text-center p-10 bg-[#f9f5f0] border border-ishes-gold/10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 w-full group">
              <div className="w-24 h-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center mb-8 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500">
                <img src="/images/Zoom-Logo.png" alt="Zoom" className="h-10 object-contain" />
              </div>
              <h4 className="text-2xl font-black text-ishes-dark mb-4 tracking-tight">Cours en direct & Replays</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">Suivez nos formations à distance de chez vous. Si vous manquez un cours, le <strong className="text-ishes-blue">replay vidéo</strong> est disponible dès la fin de chaque séance.</p>
            </div>

            {/* WhatsApp Card */}
            <div className="flex-1 flex flex-col items-center text-center p-10 bg-[#f9f5f0] border border-ishes-gold/10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 w-full group">
              <div className="w-24 h-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center mb-8 rotate-[3deg] group-hover:rotate-0 transition-transform duration-500">
                <img src="/images/whatsapp-logo.avif" alt="WhatsApp" className="h-14 w-14 object-cover rounded-full" />
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
            Le Pack <span className="text-ishes-gold italic font-serif">Accompagnement</span>
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

      {/* ===== NOTRE INSTITUT SECTION (HAS ARABIC TEXT) ===== */}
      <section className="relative overflow-hidden pt-8 pb-24 md:pb-32">
        <ArabicBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Content Column */}
            <div>
              <div className="flex items-center gap-2 mb-8 mt-6">
                <div className="w-12 h-px bg-ishes-gold"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-[1.1] tracking-tight mb-8">
                Un savoir qui transforme<br />
                <span className="text-ishes-gold italic font-serif">chaque musulman.</span>
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                <p>
                  L'Institut des Sciences Humaines et Spirituelles de Toulouse est porté par un couple — également fondateur de l'école <strong className="text-ishes-dark">Transmettre</strong> —, forts de <strong className="text-ishes-dark">plus de 15 ans d'expérience</strong> dans l'enseignement.
                </p>
                <p>
                  Ils ont souhaité élargir l'accès à un véritable cheminement spirituel, en offrant à chacun la possibilité d'apprendre où qu'il se trouve, à son rythme.
                </p>
              </div>

              <div className="mt-12 relative pl-7 border-l-4 border-ishes-blue">
                <p className="text-ishes-dark text-xl leading-relaxed font-bold italic">
                  "Notre mission : ouvrir les portes d'un savoir qui transforme, pour que chaque musulman puisse vivre sa religion avec conscience, équilibre et profondeur."
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ishes-blue/10 flex items-center justify-center text-ishes-blue">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-ishes-dark uppercase tracking-widest">Mr & Mme Latreche</div>
                  <div className="text-xs text-gray-400 font-bold">Fondateurs de l'ISHES</div>
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <InstitutVideo />

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
