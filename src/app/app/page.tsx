"use client";

import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AppLogin() {
  return (
    <div className="min-h-screen bg-[#f7fbfa] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background glow effects matching the image */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="bg-white w-full max-w-md rounded-2xl p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 z-10 relative flex flex-col items-center">
        
        {/* Logo block */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#086b51] rounded-[14px] flex items-center justify-center shadow-lg shadow-emerald-700/20 mb-4">
            <GraduationCap className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black italic tracking-tight text-[#086b51] leading-none mb-2">
            ISHEECOLE
          </h1>
          <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 text-center uppercase leading-relaxed">
            Intelligence Strategy<br />
            High Excellence School
          </p>
        </div>

        {/* Form fields */}
        <div className="w-full space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold tracking-[0.1em] text-gray-500 uppercase">
              Identifiant Email
            </label>
            <Input 
              type="email" 
              placeholder="nom@exemple.com" 
              className="h-12 bg-gray-50/50 border-gray-200 focus-visible:ring-[#086b51]"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold tracking-[0.1em] text-gray-500 uppercase">
              Mot de passe
            </label>
            <Input 
              type="password" 
              className="h-12 bg-gray-50/50 border-gray-200 focus-visible:ring-[#086b51]"
            />
          </div>

          <div className="pt-2">
            <Link href="/app/accueil-eleve" className="w-full">
              <Button className="w-full h-12 bg-[#086b51] hover:bg-[#065440] text-white font-bold tracking-wide rounded-lg text-sm shadow-md transition-all">
                ESPACE ÉTUDIANT
              </Button>
            </Link>
          </div>

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink-0 mx-4 text-[9px] font-bold text-gray-300 uppercase">ou</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <div>
            <Link href="/app/admin" className="w-full">
              <Button variant="outline" className="w-full h-12 bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold tracking-wide rounded-lg text-[13px] transition-all uppercase">
                Portail Administration
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center space-y-1">
          <p className="text-[9px] font-bold tracking-widest text-[#086b51] uppercase">
            Plateforme Sécurisée
          </p>
          <p className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
            © 2026 ISHEECOLE - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
}
