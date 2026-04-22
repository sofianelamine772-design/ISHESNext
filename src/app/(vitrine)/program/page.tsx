"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Monitor, Clock, BookOpen, Users, Award, Star, User, Baby } from "lucide-react";

type Program = {
  id: string;
  title: string;
  subtitle: string;
  tagText: string;
  tagColor: string;
  durationText: string;
  features: string[];
  price: string;
  priceSub: string;
  isRecommended?: boolean;
  type: "presentiel" | "distanciel";
  audience: "adulte" | "enfant";
};

const PROGRAMS: Program[] = [
  {
    id: "tajwid_standard",
    title: "Tajwid (Standard)",
    subtitle: "Apprends à lire le Coran correctement en respectant les règles de Tajwid. Méthode progressive.",
    tagText: "STANDARD",
    tagColor: "bg-green-100 text-green-700",
    durationText: "8 mois",
    features: [
      "Lecture correcte",
      "Application des règles",
      "Fluidité & Prononciation",
      "Suivi WhatsApp"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "presentiel",
    audience: "adulte"
  },
  {
    id: "tajwid_intensif",
    title: "Tajwid Intensif",
    subtitle: "3 mois pour transformer ta lecture du Coran. Ce que d'autres mettent 2 ans à maîtriser.",
    tagText: "INTENSIF",
    tagColor: "bg-orange-100 text-orange-700",
    durationText: "3 mois",
    features: [
      "Méthode intensive",
      "Lecture rapide",
      "Autonomie totale",
      "Coaching audio"
    ],
    price: "649 €",
    priceSub: "/ SESSION",
    isRecommended: true,
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "fiqh_malikite",
    title: "Fiqh Mâlikite",
    subtitle: "Maîtrisez les actes d'adoration selon l'école de l'Imam Mâlik. Étude du Matn Ibn Achir.",
    tagText: "DROIT",
    tagColor: "bg-indigo-100 text-indigo-700",
    durationText: "9 mois",
    features: [
      "Pureté & Prière",
      "Jeûne & Zakat",
      "Pèlerinage (Hajj)",
      "Preuves (Dalila)"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "sciences_du_coran",
    title: "Sciences du Coran",
    subtitle: "Découvrez l'histoire de la révélation et de la préservation du Livre Saint. Module passionnant.",
    tagText: "HISTOIRE",
    tagColor: "bg-amber-100 text-amber-700",
    durationText: "5 mois",
    features: [
      "Processus de Révélation",
      "Compilation (Mushaf)",
      "Lectures & Lecteurs",
      "Inimitabilité (I'jaz)"
    ],
    price: "249 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "sciences_islamiques",
    title: "Sciences Islamiques",
    subtitle: "Fiqh Malikite, Sîrah, Arabe et Sciences du Coran. Un socle de connaissances solide et authentique.",
    tagText: "SAVOIR",
    tagColor: "bg-purple-100 text-purple-700",
    durationText: "8 mois",
    features: [
      "Fiqh & Aqida",
      "Vie du Prophète (PSL)",
      "Compréhension du Coran",
      "Arabe Littéraire"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "arabe_coran_junior",
    title: "Arabe & Coran Junior",
    subtitle: "Méthode ludique pour les 6-15 ans. Arabe, Coran, Tajwid et Éducation Islamique.",
    tagText: "JUNIOR",
    tagColor: "bg-pink-100 text-pink-700",
    durationText: "Annuel",
    features: [
      "Pédagogie adaptée",
      "Section Ados spécifique",
      "Éducation islamique",
      "WhatsApp parent"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "enfant"
  },
  {
    id: "pack_accompagnement",
    title: "Pack Accompagnement",
    subtitle: "Groupe WhatsApp, lives mensuels et module spiritualité exclusif pour booster ton parcours.",
    tagText: "SOUTIEN",
    tagColor: "bg-blue-100 text-blue-700",
    durationText: "Accompagnement",
    features: [
      "Vivre au quotidien",
      "Groupe d'entraide",
      "Cours de spiritualité",
      "Accès Early Bird"
    ],
    price: "49 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  }
];

export default function ProgrammesPage() {
  const [activeMode, setActiveMode] = useState<"presentiel" | "distanciel">("distanciel");
  const [activeAudience, setActiveAudience] = useState<"adulte" | "enfant">("adulte");

  const filteredPrograms = PROGRAMS.filter((p) => p.type === activeMode && p.audience === activeAudience);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white pb-24">


      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-16">
         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
               <div className="text-[#008953] font-black tracking-widest text-xs uppercase mb-6">
                  Nos Formations
               </div>
               <h1 className="text-5xl md:text-6xl font-black text-[#101828] leading-[1.1] tracking-tight mb-6">
                  Choisissez votre <br />
                  <span className="text-[#008953] italic">mode d'apprentissage.</span>
               </h1>
               <p className="text-xl text-gray-500 font-medium">
                  Que vous soyez à Toulouse ou ailleurs, nous avons le programme idéal pour votre progression.
               </p>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-auto">
               {/* Mode Toggle Switch (Présentiel / Distanciel) */}
               <div className="bg-gray-100 p-1.5 rounded-3xl flex items-center shadow-inner shrink-0 w-full sm:min-w-[320px] overflow-hidden">
                  <button
                     onClick={() => setActiveMode("presentiel")}
                     className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                        activeMode === "presentiel"
                           ? "bg-white text-[#008953] shadow-lg shadow-black/5 transform scale-100"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <MapPin className="w-4 h-4" /> Présentiel
                  </button>
                  <button
                     onClick={() => setActiveMode("distanciel")}
                     className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                        activeMode === "distanciel"
                           ? "bg-white text-[#008953] shadow-lg shadow-black/5 transform scale-100"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <Monitor className="w-4 h-4" /> Distanciel
                  </button>
               </div>

               {/* Audience Toggle Switch (Adulte / Enfant) */}
               <div className="bg-gray-100 p-1.5 rounded-3xl flex items-center shadow-inner shrink-0 w-full sm:min-w-[320px] overflow-hidden">
                  <button
                     onClick={() => setActiveAudience("adulte")}
                     className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                        activeAudience === "adulte"
                           ? "bg-white text-[#008953] shadow-lg shadow-black/5 transform scale-100"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <User className="w-4 h-4" /> Adulte
                  </button>
                  <button
                     onClick={() => setActiveAudience("enfant")}
                     className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                        activeAudience === "enfant"
                           ? "bg-white text-[#008953] shadow-lg shadow-black/5 transform scale-100"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <Baby className="w-4 h-4" /> Enfant
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gray-100 max-w-7xl mx-auto mb-16"></div>

      {/* PROGRAMS GRID */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
               <div 
                  key={program.id} 
                  className={`flex flex-col relative rounded-[2rem] bg-white transition-all hover:shadow-xl ${
                     program.isRecommended 
                        ? "border-[3px] border-[#00603A] shadow-md" 
                        : "border border-gray-100 shadow-sm"
                  }`}
               >
                  {/* RECOMMENDED BADGE */}
                  {program.isRecommended && (
                     <div className="bg-[#00603A] text-white text-xs font-bold uppercase tracking-widest text-center py-2.5 rounded-t-[1.8rem] flex items-center justify-center gap-2">
                        <Star className="w-3.5 h-3.5 fill-white" /> Recommandé
                     </div>
                  )}

                  <div className="p-8 flex-1 flex flex-col">
                     {/* TAGS ROW */}
                     <div className="flex items-center justify-between mb-8">
                        <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase ${program.tagColor}`}>
                           {program.tagText}
                        </span>
                        <span className="text-xs font-bold text-gray-400">
                           {program.durationText}
                        </span>
                     </div>

                     {/* TITLE & DESC */}
                     <h2 className="text-2xl font-black text-[#101828] mb-4 tracking-tight">{program.title}</h2>
                     <p className="text-sm text-gray-500 leading-relaxed min-h-[60px] mb-8 font-medium">
                        {program.subtitle}
                     </p>

                     {/* ICONS GRID (Mocked identical to image) */}
                     <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-[#008953]" />
                           <span className="text-xs font-bold text-gray-400">1h30/sem</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <BookOpen className="w-4 h-4 text-[#008953]" />
                           <span className="text-xs font-bold text-gray-400">Manuel inclus</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Users className="w-4 h-4 text-[#008953]" />
                           <span className="text-xs font-bold text-gray-400">Max 12</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Award className="w-4 h-4 text-[#008953]" />
                           <span className="text-xs font-bold text-gray-400 uppercase">Certifié</span>
                        </div>
                     </div>

                     {/* FEATURES LIST */}
                     <div className="space-y-4 mb-10 flex-1">
                        {program.features.map((feature, idx) => (
                           <div key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#008953] shrink-0" />
                              <span className="text-sm text-gray-700 font-bold">{feature}</span>
                           </div>
                        ))}
                     </div>

                     {/* PRICE & CTA */}
                     <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-50">
                        <div className="flex items-end justify-between mb-1">
                           <div>
                              <div className="text-3xl font-black text-[#101828] tracking-tight">{program.price}</div>
                              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                 {program.priceSub}
                              </div>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 font-black text-[10px] tracking-widest uppercase">
                           <Link 
                              href={`/program/${program.id}`}
                              className="flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 py-3.5 rounded-xl transition-all shadow-sm"
                           >
                              Plus d'info
                           </Link>
                           <Link 
                              href={`/inscription?plan=${program.id}`}
                              className="flex items-center justify-center bg-[#008953] text-white hover:bg-[#007044] py-3.5 rounded-xl shadow-md transition-all"
                           >
                              S'inscrire
                           </Link>
                        </div>
                     </div>
                  </div>

               </div>
            ))}
         </div>
         {filteredPrograms.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-gray-100">
               <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune formation disponible</h3>
               <p className="text-gray-500">
                  Il n'y a pas encore de formation pour le mode {activeMode === "presentiel" ? "Présentiel" : "Distanciel"} 
                  et le public {activeAudience === "adulte" ? "Adulte" : "Enfant"}.
               </p>
            </div>
         )}
      </section>

    </div>
  );
}
