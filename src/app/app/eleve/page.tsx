"use client";

import { GraduationCap, ArrowRight, Smartphone, Share, PlusSquare, BookOpen, ShieldCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function EleveDashboard() {
  const { user } = useUser();

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* ─── SIMPLIFIED WELCOME ─── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Assalamou alaykoum,<br />
            <span className="text-[#086b51] italic">
              {user?.firstName} {user?.lastName}
            </span>
          </h2>
          <p className="text-gray-400 font-medium mt-4 text-lg">
            Heureux de vous retrouver pour votre apprentissage.
          </p>
        </div>
        <Link 
          href="/app/eleve/reinscription"
          className="bg-[#086b51] text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#086b51]/20"
        >
          Finaliser ma réinscription <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ─── QUICK STATUS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center gap-8 shadow-sm">
            <div className="w-20 h-20 bg-emerald-50 text-[#086b51] rounded-[2rem] flex items-center justify-center shrink-0">
               <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
               <div className="text-4xl font-black text-gray-900">Validé</div>
               <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Statut du dossier</div>
            </div>
         </div>
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center gap-8 shadow-sm">
            <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-[2rem] flex items-center justify-center shrink-0">
               <PlusSquare className="w-10 h-10" />
            </div>
            <div>
               <div className="text-4xl font-black text-gray-900">2024</div>
               <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Année académique</div>
            </div>
         </div>
      </div>

      {/* ─── IPHONE TUTORIAL SECTION ─── */}
      <div className="bg-ishes-dark rounded-[3.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-white pointer-events-none">
          <Smartphone className="w-64 h-64" strokeWidth={1} />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 p-12 md:p-20 items-center">
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-ishes-green"></div>
              <span className="text-ishes-green text-[10px] font-black uppercase tracking-[0.3em]">Astuce Mobile</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              Installez l'application<br />
              <span className="text-ishes-green italic">sur votre iPhone.</span>
            </h3>
            
            <p className="text-white/60 font-medium text-lg leading-relaxed">
              Accédez à vos cours en un clic, directement depuis votre écran d'accueil, sans passer par Safari.
            </p>

            <div className="space-y-6 pt-4">
              {[
                { step: "01", text: "Ouvrez Safari et appuyez sur l'icône de partage (en bas).", icon: Share },
                { step: "02", text: "Faites défiler et choisissez 'Sur l'écran d'accueil'.", icon: PlusSquare },
                { step: "03", text: "Appuyez sur 'Ajouter' en haut à droite.", icon: ArrowRight },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ishes-green font-black text-sm transition-all group-hover:bg-ishes-green group-hover:text-white group-hover:scale-110">
                    {item.step}
                  </div>
                  <p className="text-white/80 font-bold text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-inner border border-white/5">
            <Image 
              src="/images/iphone-tutorial.png"
              alt="Tutoriel iPhone PWA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
