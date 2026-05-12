"use client";

import { BookOpen, Search, Filter } from "lucide-react";

export default function MesCoursPage() {
  const cours = [
    { title: "Arabe Littéraire - Niveau 1", prof: "Prof. Latreche", progress: 65, nextCours: "Lundi 18:00" },
    { title: "Tajwid - Débutant", prof: "Prof. Ahmed", progress: 40, nextCours: "Mercredi 14:00" },
  ];

  return (
    <div className="space-y-10">
      {/* Header Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher un cours..." 
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-[#086b51]/20 transition-all"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">
              <Filter className="w-4 h-4" /> Filtres
           </button>
        </div>
      </div>

      {/* Cours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cours.map((c, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] border border-gray-100 p-10 hover:shadow-2xl hover:shadow-gray-200/40 transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-[#086b51]/10 text-[#086b51] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="bg-emerald-50 text-[#086b51] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                En cours
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight leading-tight">{c.title}</h3>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">{c.prof}</p>
            
            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-gray-400">Progression</span>
                  <span className="text-[#086b51]">{c.progress}%</span>
               </div>
               <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#086b51] rounded-full transition-all duration-1000" 
                    style={{ width: `${c.progress}%` }}
                  />
               </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-gray-50">
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  Prochain cours : {c.nextCours}
               </div>
               <button className="text-[#086b51] font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                  Accéder <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
