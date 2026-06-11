"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, MapPin, Monitor, Clock, BookOpen, Users, Award, Star, User, Baby, Search, CalendarDays } from "lucide-react";
import { PRESENTIEL_CLASSES } from "@/lib/presentiel-data";


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
  day?: string;
  formationId?: string;
  slotId?: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "femme-debutante-presentiel",
    formationId: "presentiel-global",
    title: "FEMME DEBUTANTE : Arabe + Tajwid",
    subtitle: "Formation en présentiel combinant l'apprentissage de la langue arabe et les règles de Tajwid (pas d'option séparée).",
    tagText: "PRÉSENTIEL",
    tagColor: "bg-[#c8a96e]/10 text-[#c8a96e]",
    durationText: "Samedi matin 9h-12h",
    features: ["Arabe & Tajwid combinés", "Réservé aux Femmes", "Niveau Débutante", "Samedi matin (9h-12h)"],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "presentiel",
    audience: "adulte",
    day: "Samedi"
  },
  {
    id: "femme-intermediaire-presentiel",
    formationId: "presentiel-global",
    title: "FEMME INTERMEDIAIRE : Arabe + Tajwid",
    subtitle: "Formation en présentiel combinant le perfectionnement en arabe et la récitation du Tajwid (pas d'option séparée).",
    tagText: "PRÉSENTIEL",
    tagColor: "bg-[#c8a96e]/10 text-[#c8a96e]",
    durationText: "Dimanche matin 9h-12h",
    features: ["Arabe & Tajwid combinés", "Réservé aux Femmes", "Niveau Intermédiaire", "Dimanche matin (9h-12h)"],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "presentiel",
    audience: "adulte",
    day: "Dimanche"
  },
  {
    id: "enfant-mercredi-presentiel",
    formationId: "presentiel-global",
    title: "Scolarité Enfants",
    subtitle: "Mercredi : Arabe, Coran & Tajwid. Pédagogie active pour les 4-15 ans.",
    tagText: "PRÉSENTIEL",
    tagColor: "bg-[#c8a96e]/10 text-[#c8a96e]",
    durationText: "Mercredi 13h30-16h30",
    features: ["Enseignement direct", "Activités ludiques", "Vie d'institut", "Ateliers"],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "presentiel",
    audience: "enfant",
    day: "Mercredi"
  },
  {
    id: "enfant-samedi-presentiel",
    formationId: "presentiel-global",
    title: "Scolarité Enfants",
    subtitle: "Samedi : Arabe, Coran & Tajwid. Pédagogie active pour les 4-15 ans.",
    tagText: "PRÉSENTIEL",
    tagColor: "bg-[#c8a96e]/10 text-[#c8a96e]",
    durationText: "Samedi 9h-12h / 13h30-16h30",
    features: ["Enseignement direct", "Activités ludiques", "Vie d'institut", "Ateliers"],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "presentiel",
    audience: "enfant",
    day: "Samedi"
  },
  {
    id: "enfant-dimanche-presentiel",
    formationId: "presentiel-global",
    title: "Scolarité Enfants",
    subtitle: "Dimanche : Arabe, Coran & Tajwid. Pédagogie active pour les 4-15 ans.",
    tagText: "PRÉSENTIEL",
    tagColor: "bg-[#c8a96e]/10 text-[#c8a96e]",
    durationText: "Dimanche 9h-12h / 13h30-16h30",
    features: ["Enseignement direct", "Activités ludiques", "Vie d'institut", "Ateliers"],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "presentiel",
    audience: "enfant",
    day: "Dimanche"
  },
  {
    id: "tajwid_standard",
    title: "Tajwid (Standard)",
    subtitle: "Apprends à lire le Coran à distance avec un suivi personnalisé. Progresser de chez soi.",
    tagText: "STANDARD",
    tagColor: "bg-green-100 text-green-700",
    durationText: "8 mois",
    features: [
      "Cours en ligne direct",
      "Accès aux replays",
      "Correction audio",
      "Suivi WhatsApp"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
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
    price: "399 €",
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
    id: "sciences_hadith",
    title: "Sciences du Hadith",
    subtitle: "Comprendre la parole du Prophète (ﷺ) et les efforts des savants pour sa préservation.",
    tagText: "AUTHENTICITÉ",
    tagColor: "bg-teal-100 text-teal-700",
    durationText: "10 mois",
    features: [
      "Étude de la Sunnah",
      "Science des rapporteurs",
      "Authentification",
      "Cours interactifs"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "memoriser_coran",
    title: "Mémorisation du Coran",
    subtitle: "Accompagnement personnalisé pour mémoriser le Livre d'Allah à votre rythme.",
    tagText: "HIFZ",
    tagColor: "bg-amber-100 text-amber-700",
    durationText: "Annuel",
    features: [
      "Correction lecture",
      "Révision suivie",
      "Progression par Hizb",
      "Soutien spirituel"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "al_aqida",
    title: "Al-'Aqîda",
    subtitle: "Étude de la Tahawiya pour comprendre les fondements de la foi musulmane sunnite.",
    tagText: "FOI",
    tagColor: "bg-green-100 text-green-700",
    durationText: "9 mois",
    features: [
      "Étude de la Tahawiya",
      "Fondements de la foi",
      "Monde invisible",
      "Cours hebdomadaire"
    ],
    price: "250 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "as_sirah",
    title: "Sîrah An-Nabawiyya",
    subtitle: "Découvrez la vie du Prophète ﷺ, de sa naissance à Médine, un guide pour l'humanité.",
    tagText: "BIOGRAPHIE",
    tagColor: "bg-amber-100 text-amber-700",
    durationText: "Annuel",
    features: [
      "Période Mécquoise",
      "Période Médinoise",
      "Enseignements & Vertus",
      "Lien spirituel"
    ],
    price: "250 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "spiritualite_islam",
    title: "Spiritualité Musulmane",
    subtitle: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam.",
    tagText: "ÉDUCATION",
    tagColor: "bg-purple-100 text-purple-700",
    durationText: "4 mois",
    features: [
      "Éducation de l'âme",
      "Purification du cœur",
      "Session de 4 mois",
      "Paiement en 4 fois"
    ],
    price: "399 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "correction_fatiha",
    title: "Correction al Fatiha",
    subtitle: "Corrigez la lecture de la Fatiha et des 3 dernières sourates. Module offert.",
    tagText: "OFFERT",
    tagColor: "bg-green-100 text-green-700",
    durationText: "Session",
    features: [
      "Fatiha & 3 sourates",
      "Validité de la prière",
      "Prononciation correcte",
      "Totalement gratuit"
    ],
    price: "0 €",
    priceSub: "GRATUIT",
    type: "distanciel",
    audience: "adulte"
  },
  {
    id: "cours_particuliers",
    title: "Cours Particuliers",
    subtitle: "Apprentissage individuel du Coran et Tajwid pour adultes et enfants.",
    tagText: "SUR-MESURE",
    tagColor: "bg-purple-100 text-purple-700",
    durationText: "À la carte",
    features: [
      "Programme 100% solo",
      "Rythme personnalisé",
      "Tous niveaux",
      "Adultes & Enfants"
    ],
    price: "Sur Devis",
    priceSub: "PERSONNALISÉ",
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
    id: "tajwid_standard",
    title: "Tajwid (Enfant)",
    subtitle: "Cours de Tajwid en ligne pour enfants. Apprendre et réciter de chez soi.",
    tagText: "ENFANT",
    tagColor: "bg-green-100 text-green-700",
    durationText: "Annuel",
    features: [
      "Cours en direct",
      "Interactivité",
      "Progression douce",
      "Suivi WhatsApp"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "enfant"
  },
  {
    id: "tarbiya_islamiya",
    title: "Tarbiya Islamiya",
    subtitle: "Éveil du cœur et amour d'Allah. Un cours pour préserver la Fitra de vos enfants.",
    tagText: "SPIRITUALITÉ",
    tagColor: "bg-amber-100 text-amber-700",
    durationText: "Annuel",
    features: [
      "Professeure diplômée",
      "Pédagogie active",
      "Éveil spirituel",
      "À partir de 6 ans"
    ],
    price: "249 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "enfant"
  },

  {
    id: "arabe_adulte",
    title: "Arabe Littéraire (Adulte)",
    subtitle: "Apprenez l'arabe de chez vous avec des professeurs natifs et une méthode interactive.",
    tagText: "LANGUE",
    tagColor: "bg-blue-100 text-blue-700",
    durationText: "9 mois",
    features: [
      "Cours en direct",
      "Accès aux replays",
      "Supports numériques",
      "Suivi personnalisé"
    ],
    price: "349 €",
    priceSub: "/ SESSION",
    type: "distanciel",
    audience: "adulte"
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

export function ProgramContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeMode, setActiveMode] = useState<"presentiel" | "distanciel">("distanciel");
  const [activeAudience, setActiveAudience] = useState<"adulte" | "enfant">("adulte");
  const [slotsStatus, setSlotsStatus] = useState<any[]>([]);
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>("tous");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/classes/status');
        const data = await res.json();
        if (!data.error) setSlotsStatus(data);
      } catch (err) {
        console.error("Failed to fetch slots status", err);
      }
    };
    fetchStatus();
  }, []);

  const getSlotStatus = (day?: string) => {
    if (!day) return null;
    return slotsStatus.find(s => s.day_of_week?.toLowerCase() === day.toLowerCase());
  };

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "presentiel" || mode === "distanciel") {
      setActiveMode(mode);
    }
  }, [searchParams]);

  const filteredPrograms = PROGRAMS.filter((p) => p.type === activeMode && p.audience === activeAudience);

  useEffect(() => {
    setSelectedDayFilter("tous");
    setSearchQuery("");
  }, [activeAudience, activeMode]);

  const filteredPresentielClasses = PRESENTIEL_CLASSES.filter(c => {
    if (c.audience !== activeAudience) return false;

    if (selectedDayFilter !== "tous" && c.jour !== selectedDayFilter) return false;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchNiveau = c.niveau.toLowerCase().includes(query);
      const matchHoraire = c.horaire.toLowerCase().includes(query);
      const matchAge = c.ageCondition.toLowerCase().includes(query);
      return matchNiveau || matchHoraire || matchAge;
    }

    return true;
  });

  return (
    <>
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 overflow-hidden">
         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl relative">
                {/* USER SKETCH CLEAN MANGA BUBBLE (Desktop only) */}
                <div className="hidden lg:block absolute -right-64 top-[-50px] z-20 w-[240px] h-[240px]">
                  <Image 
                    src="/images/bulle-manga-pedagogique-ishes.png" 
                    alt="Manga Bubble" 
                    fill 
                    sizes="240px"
                    className="object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-center p-8 pr-10 pb-16 font-sans">
                    <p className="text-[#101828] text-xs font-black uppercase tracking-widest leading-relaxed">
                      Sélectionnez ici <br /> pour choisir <br /> la formation !
                    </p>
                  </div>
                </div>

               <div className={`font-black tracking-widest text-xs uppercase mb-6 ${activeMode === "presentiel" ? "text-[#c8a96e]" : "text-[#008953]"}`}>
                  Nos Formations
               </div>
               <h1 className="text-[32px] sm:text-5xl md:text-6xl font-black text-[#101828] leading-[1.1] tracking-tight mb-6">
                  Choisissez votre <br />
                  <span className={`italic ${activeMode === "presentiel" ? "text-[#c8a96e]" : "text-[#008953]"}`}>mode d'apprentissage.</span>
               </h1>
               <p className="text-lg sm:text-xl text-gray-500 font-medium">
                  Que vous soyez à Toulouse ou ailleurs, nous avons le programme idéal pour votre progression.
               </p>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-auto relative">
               {/* Mode Toggle Switch (Présentiel / Distanciel) */}
               <div className="bg-gray-100 p-1 rounded-3xl flex items-center shadow-inner shrink-0 w-full sm:min-w-[320px] overflow-hidden">
                  <button
                     onClick={() => setActiveMode("presentiel")}
                     className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                        activeMode === "presentiel"
                           ? "bg-white text-[#c8a96e] shadow-lg shadow-black/5 transform scale-100"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <MapPin className="w-4 h-4" /> Présentiel
                  </button>
                  <button
                     onClick={() => setActiveMode("distanciel")}
                     className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                        activeMode === "distanciel"
                           ? "bg-white text-[#008953] shadow-lg shadow-black/5 transform scale-100"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <Monitor className="w-4 h-4" /> Distanciel
                  </button>
               </div>

               {/* Audience Toggle Switch (Adulte / Enfant) */}
               <div className="bg-gray-100 p-1 rounded-3xl flex items-center shadow-inner shrink-0 w-full sm:min-w-[320px] overflow-hidden">
                  <button
                     onClick={() => setActiveAudience("adulte")}
                     className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                        activeAudience === "adulte"
                           ? "bg-white text-[#008953] shadow-lg shadow-black/5 transform scale-100"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <User className="w-4 h-4" /> Adulte
                  </button>
                  <button
                     onClick={() => setActiveAudience("enfant")}
                     className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
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
      <div className="w-full h-px bg-gray-100 max-w-7xl mx-auto mb-16 px-6"></div>

      {/* PROGRAMS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => {
               const isPresentiel = program.type === "presentiel";
               const accentColor = isPresentiel ? "text-[#c8a96e]" : "text-[#008953]";
               const btnColor = isPresentiel ? "bg-[#c8a96e] hover:bg-[#b0935b]" : "bg-[#008953] hover:bg-[#007044]";

                const infoUrl = 
                  (program.id === 'tajwid_standard' || program.id === 'tajwid-standard-presentiel') ? '/fr/cours-lecture-tajwid' : 
                  program.id === 'tajwid_intensif' ? '/fr/cours-tajwid-intensif' :
                  (program.id === 'arabe_adulte' || program.id === 'arabe-adulte-presentiel') ? '/fr/cours-arabe-adulte' : 
                  (program.id === 'femme-debutante-presentiel' || program.id === 'femme-intermediaire-presentiel') ? '/fr/cours-en-presentiel' :
                  (program.id === 'arabe_coran_junior' || program.id.includes('enfant')) ? '/fr/cours-arabe-enfant' : 
                  program.id === 'tarbiya_islamiya' ? '/fr/formation-tarbya-islamya' :
                  program.id === 'sciences_du_coran' ? '/fr/cours-sciences-coran' :
                  program.id === 'sciences_hadith' ? '/fr/cours-sciences-hadith' :
                  program.id === 'memoriser_coran' ? '/fr/cours-memoriser-coran' :
                  program.id === 'al_aqida' ? '/fr/cours-al-aqida' :
                  program.id === 'as_sirah' ? '/fr/cours-as-sirah' :
                  program.id === 'spiritualite_islam' ? '/fr/spiritualite-islam' :
                  program.id === 'correction_fatiha' ? '/fr/correction-fatiha' :
                  program.id === 'cours_particuliers' ? '/fr/cours-particuliers' :
                  program.id === 'fiqh_malikite' ? '/fr/cours-fiqh-malikite' :
                  program.id === 'sciences_islamiques' ? '/fr/sciences-islamiques' :
                  program.id === 'pack_accompagnement' ? '/fr/pack-accompagnement' :
                  `/program/${program.id}`;

               return (
                <div 
                   key={program.id} 
                   onClick={() => router.push(infoUrl)}
                   className={`cursor-pointer flex flex-col relative rounded-[2rem] bg-white transition-all hover:shadow-2xl hover:-translate-y-1.5 duration-300 ${
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

                   <div className="p-5 sm:p-6 flex-1 flex flex-col">
                       {/* TAGS ROW */}
                       <div className="flex items-center justify-between mb-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase ${program.tagColor || "bg-[#008953]/10 text-[#008953]"}`}>
                             {program.tagText || (isPresentiel ? "Présentiel" : "A distance")}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase flex items-center gap-1 border ${
                            isPresentiel 
                              ? "bg-[#00603A]/10 text-[#00603A] border-[#00603A]/20" 
                              : "bg-blue-50 text-blue-700 border-blue-100"
                          }`}>
                             <span>📅</span> {program.durationText}
                          </span>
                       </div>

                      {/* TITLE & DESC */}
                      <h2 className="text-xl font-black text-[#101828] mb-2 tracking-tight">{program.title}</h2>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-auto mb-4 font-medium">
                         {program.subtitle}
                      </p>

                      {/* ICONS GRID */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                         <div className="flex items-center gap-2">
                            <Clock className={`w-3.5 h-3.5 ${accentColor}`} />
                            <span className="text-[10px] font-bold text-gray-400">{isPresentiel ? program.durationText : "1h30/sem"}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <BookOpen className={`w-3.5 h-3.5 ${accentColor}`} />
                            <span className="text-[10px] font-bold text-gray-400">Manuel inclus</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <Users className={`w-3.5 h-3.5 ${accentColor}`} />
                            <span className="text-[10px] font-bold text-gray-400">Max 20</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <Award className={`w-3.5 h-3.5 ${accentColor}`} />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Certifié</span>
                         </div>
                      </div>

                      {/* FEATURES LIST */}
                      <div className="grid grid-cols-2 gap-x-2 gap-y-3 mb-4">
                         {program.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                               <CheckCircle2 className={`w-4 h-4 ${accentColor} shrink-0 mt-0.5`} />
                               <span className="text-xs sm:text-sm text-gray-700 font-bold leading-tight">{feature}</span>
                            </div>
                         ))}
                      </div>

                      {/* PRICE & CTA */}
                      <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-gray-50">
                         <div className="flex items-end justify-between mb-1">
                            <div>
                               <div className="text-3xl font-black text-[#101828] tracking-tight">{program.price}</div>
                               <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                  {program.priceSub}
                               </div>
                                {program.price !== "0 €" && program.price !== "Sur Devis" && program.price !== "GRATUIT" && (
                                   <div className="text-[10px] font-bold text-[#008953] uppercase tracking-wide mt-1.5 flex items-center gap-1">
                                      <span>💳</span> Paiement en 1x, 3x ou 5x
                                   </div>
                                )}
                                {isPresentiel && (
                                 <div className="mb-2 mt-2">
                                   {getSlotStatus(program.day)?.est_plein ? (
                                     <div className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] bg-red-50 px-3 py-2 rounded-xl border border-red-100">
                                       <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                       Session Complète
                                     </div>
                                   ) : (
                                     <div className="flex items-center gap-2 text-green-600 font-black uppercase text-[10px] bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                                       <div className="w-2 h-2 rounded-full bg-green-500" />
                                       Places Disponibles
                                     </div>
                                   )}
                                 </div>
                               )}
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-2 sm:gap-3 font-black text-[9px] sm:text-[10px] tracking-widest uppercase">
                            <Link 
                               href={infoUrl}
                               onClick={(e) => e.stopPropagation()}
                               className="flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 py-3.5 rounded-xl transition-all shadow-sm"
                            >
                               Info
                            </Link>
                            {isPresentiel ? (
                              <Link 
                                href={`/inscription?plan=presentiel-global&slot=${program.day?.toLowerCase()}&audience=${program.audience}`}
                                onClick={(e) => e.stopPropagation()}
                                className={`flex items-center justify-center ${btnColor} text-white py-3.5 rounded-xl shadow-md transition-all ${
                                  getSlotStatus(program.day)?.est_plein ? "opacity-50 pointer-events-none grayscale" : ""
                                }`}
                              >
                                {getSlotStatus(program.day)?.est_plein 
                                  ? "COMPLET" 
                                  : (program.audience === 'enfant' ? "Inscrire mon enfant" : "S'inscrire")
                                }
                              </Link>
                            ) : (
                              <Link 
                                href={`/inscription?plan=${program.id}&audience=${program.audience}`}
                                onClick={(e) => e.stopPropagation()}
                                className={`flex items-center justify-center ${btnColor} text-white py-3.5 rounded-xl shadow-md transition-all`}
                              >
                                S'inscrire
                              </Link>
                            )}
                         </div>
                      </div>
                   </div>

                </div>
              );
            })}
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


    </>
  );
}
