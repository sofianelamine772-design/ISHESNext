"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, ArrowRight, Play, Star, ShieldCheck, Zap, Heart, Users, Calendar, BookOpen, Eye, X, CalendarDays, Search } from "lucide-react";
import { PRESENTIEL_CLASSES, PresentielClass } from "@/lib/presentiel-data";


interface CourseDetailViewProps {
  course: any;
  id: string;
}

export function CourseDetailView({ course, id }: CourseDetailViewProps) {
  const pathname = usePathname();
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [slotsStatus, setSlotsStatus] = useState<any[]>([]);
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>("tous");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isEnfant = pathname?.includes("enfant") || id === "arabe_coran_junior" || id === "tarbiya_islamiya";
  const audience = isEnfant ? "enfant" : "adulte";

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

  const getPresentielClassesForCourse = (): PresentielClass[] => {
    if (id === "arabe_coran_junior") {
      return PRESENTIEL_CLASSES.filter(c => c.audience === "enfant");
    }
    if (id === "tajwid_standard") {
      return [
        {
          id: 0,
          niveau: "Tajwid (Standard) - Classe Générale",
          ageCondition: "Adulte",
          horaire: "Lundi 19h00",
          audience: "adulte",
          type: "mixte",
          jour: "lundi",
          periode: "soir",
          planId: "presentiel-global",
          slotKey: "lundi",
          niveauKey: "debutant"
        },
        ...PRESENTIEL_CLASSES.filter(c => c.audience === "adulte" && c.niveau.toLowerCase().includes("tajwid"))
      ];
    }
    if (id === "arabe_adulte") {
      return [
        {
          id: 0,
          niveau: "Arabe Littéraire - Classe Générale",
          ageCondition: "Adulte",
          horaire: "Mardi 19h00",
          audience: "adulte",
          type: "mixte",
          jour: "mardi",
          periode: "soir",
          planId: "presentiel-global",
          slotKey: "mardi",
          niveauKey: "debutant"
        },
        ...PRESENTIEL_CLASSES.filter(c => c.audience === "adulte" && c.niveau.toLowerCase().includes("arabe"))
      ];
    }
    return [];
  };

  const presentielClasses = getPresentielClassesForCourse();

  const filteredClasses = presentielClasses.filter(c => {
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
    <div className="min-h-screen bg-white font-sans text-[#101828]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-gradient-to-b from-green-50/50 to-white overflow-hidden relative">
         <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-green-100/50 rounded-full blur-[100px] -z-10"></div>

         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-100 rounded-full shadow-sm">
                  <span className="w-2 h-2 bg-[#008953] rounded-full animate-pulse"></span>
                  <span className="text-xs font-black uppercase tracking-widest text-[#008953]">{course.tag}</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                  {course.title}
               </h1>
               <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                  {course.hook}
               </p>
                <div className="flex flex-wrap gap-4 pt-4 text-center items-center">
                   <Link 
                      href={`/inscription?plan=${id}&audience=${audience}`}
                      className="px-10 py-5 bg-[#008953] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#008953]/20 hover:bg-[#007044] transition-all flex items-center gap-3 active:scale-95"
                   >
                      {audience === 'enfant' ? "Inscrire mon enfant" : "S'inscrire maintenant"} <ArrowRight className="w-6 h-6" />
                   </Link>
                   {course.videoUrl && (
                      <button className="px-10 py-5 bg-white border-2 border-gray-100 text-[#101828] font-black text-lg rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
                         <Play className="w-5 h-5 fill-current" /> Voir le teaser
                      </button>
                   )}
                   {course.flyerUrl && (
                      <button 
                         onClick={() => setIsFlyerOpen(true)}
                         className="px-10 py-5 bg-gradient-to-r from-[#c8a96e] to-[#b8985d] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#c8a96e]/20 hover:from-[#b8985d] hover:to-[#a8884d] transition-all flex items-center gap-3 active:scale-95"
                      >
                         <Eye className="w-5 h-5" /> 
                         {course.flyerUrl.toLowerCase().endsWith('.pdf') ? "Voir le Programme PDF" : "Voir le Flyer"}
                      </button>
                   )}
                </div>
               <div className="flex items-center gap-10 pt-4">
                  <div className="flex items-center gap-2">
                     <Users className="w-5 h-5 text-gray-400" />
                     <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Places limitées</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Calendar className="w-5 h-5 text-gray-400" />
                     <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Démarrage prochain</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 w-full max-w-[600px] h-[400px] bg-white rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
               {course.videoUrl ? (
                  <iframe 
                    className="w-full h-full"
                    src={course.videoUrl} 
                    title={course.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
               ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/40 to-transparent z-10"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1584281723351-93e18cd944f2?auto=format&fit=crop&q=80&w=800" 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                           <Play className="w-8 h-8 text-[#008953] ml-1 fill-current" />
                        </div>
                    </div>
                  </>
               )}
            </div>
         </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-white">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 border-y border-gray-100 py-12">
            <div className="flex items-center gap-6">
               <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="rounded-full" />
                     </div>
                  ))}
               </div>
               <div>
                  <div className="flex text-amber-400 gap-0.5">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Rejoint par +500 élèves</p>
               </div>
            </div>
            <div className="flex gap-12">
               <div className="text-center">
                  <h4 className="text-2xl font-black">98%</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Satisfaction</p>
               </div>
               <div className="text-center">
                  <h4 className="text-2xl font-black">CECRL</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Norme Certifiée</p>
               </div>
               <div className="text-center">
                  <h4 className="text-2xl font-black">Expert</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Professeurs</p>
               </div>
            </div>
         </div>
      </section>

      <section className="py-32 px-6 bg-[#FAFAFA]">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Pourquoi ce programme <br /> va tout <span className="text-[#008953]">changer.</span>
               </h2>
               <p className="text-lg text-gray-500 font-medium leading-relaxed whitespace-pre-wrap">
                  {course.description}
               </p>
               <div className="space-y-6">
                  {course.whyMe.map((item: string, i: number) => (
                     <div key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                           <CheckCircle2 className="w-4 h-4 text-[#008953]" />
                        </div>
                        <span className="text-lg font-bold text-gray-700">{item}</span>
                     </div>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {course.features.map((f: any, i: number) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                     <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors">
                        {i === 0 && <Zap className="w-6 h-6" />}
                        {i === 1 && <Heart className="w-6 h-6" />}
                        {i === 2 && <ShieldCheck className="w-6 h-6" />}
                        {i === 3 && <Users className="w-6 h-6" />}
                     </div>
                     <h4 className="font-black text-xl mb-3">{f.t}</h4>
                     <p className="text-sm text-gray-500 font-medium leading-relaxed">{f.d}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Full Program & Schedule (Conditional) */}
         {(course.fullProgram || course.horaires) && (
            <div className="mt-24 max-w-7xl mx-auto space-y-16">
               <div className="h-px bg-gray-100 w-full"></div>
               
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  {/* Left: Program */}
                  <div className="lg:col-span-8 space-y-12">
                     <div className="inline-flex items-center gap-3 px-4 py-2 bg-ishes-green/5 text-ishes-green rounded-xl border border-ishes-green/10">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Programme Détaillé</span>
                     </div>

                     <div className="grid md:grid-cols-1 gap-12">
                        {course.fullProgram?.preIslamique && (
                           <div className="space-y-6">
                              <h3 className="text-xl font-black text-ishes-dark flex items-center gap-3">
                                 <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs">01</span>
                                 La Période Pré-Islamique
                              </h3>
                              <div className="grid sm:grid-cols-2 gap-4">
                                 {course.fullProgram.preIslamique.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                                       <CheckCircle2 className="w-4 h-4 text-ishes-green shrink-0" />
                                       <span className="text-sm font-bold text-gray-600">{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {course.fullProgram?.mecquoise && (
                           <div className="space-y-6">
                              <h3 className="text-xl font-black text-ishes-dark flex items-center gap-3">
                                 <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs">02</span>
                                 La Période Mécquoise
                              </h3>
                              <div className="grid sm:grid-cols-2 gap-4">
                                 {course.fullProgram.mecquoise.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                                       <CheckCircle2 className="w-4 h-4 text-ishes-green shrink-0" />
                                       <span className="text-sm font-bold text-gray-600">{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {course.fullProgram?.medinoise && (
                           <div className="space-y-6">
                              <h3 className="text-xl font-black text-ishes-dark flex items-center gap-3">
                                 <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs">03</span>
                                 La Période Médinoise
                              </h3>
                              <div className="grid sm:grid-cols-2 gap-4">
                                 {course.fullProgram.medinoise.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                                       <CheckCircle2 className="w-4 h-4 text-ishes-green shrink-0" />
                                       <span className="text-sm font-bold text-gray-600">{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                        {course.fullProgram?.fondamentaux && (
                           <div className="space-y-6">
                              <h3 className="text-xl font-black text-ishes-dark flex items-center gap-3">
                                 <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs">★</span>
                                 Les Principes Fondamentaux
                              </h3>
                              <div className="grid sm:grid-cols-2 gap-4">
                                 {course.fullProgram.fondamentaux.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                                       <CheckCircle2 className="w-4 h-4 text-ishes-green shrink-0" />
                                       <span className="text-sm font-bold text-gray-600">{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                        {course.fullProgram?.deroulement && (
                           <div className="space-y-6">
                              <h3 className="text-xl font-black text-ishes-dark flex items-center gap-3">
                                 <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs">🚀</span>
                                 Déroulement de la Formation
                              </h3>
                              <div className="space-y-4">
                                 {course.fullProgram.deroulement.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-50 shadow-sm">
                                       <div className="w-6 h-6 rounded-full bg-ishes-green/10 flex items-center justify-center text-[10px] font-black text-ishes-green">{i+1}</div>
                                       <span className="text-base font-bold text-gray-600">{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {course.fullProgram?.objectifs && (
                           <div className="space-y-6">
                              <h3 className="text-xl font-black text-ishes-dark flex items-center gap-3">
                                 <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs">🎯</span>
                                 Objectifs Pédagogiques
                              </h3>
                              <div className="grid sm:grid-cols-1 gap-4">
                                 {course.fullProgram.objectifs.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                                       <CheckCircle2 className="w-5 h-5 text-ishes-green shrink-0" />
                                       <span className="text-base font-black text-ishes-dark">{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Right: Schedule */}
                  <div className="lg:col-span-4">
                     {course.horaires && (
                        <div className="sticky top-32 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8">
                           <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#c8a96e]/10 text-[#c8a96e] rounded-xl border border-[#c8a96e]/10">
                              <Calendar className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Horaires</span>
                           </div>
                           <h3 className="text-2xl font-black text-ishes-dark">Sessions disponibles</h3>
                           <div className="space-y-4">
                              {course.horaires.map((h: string, i: number) => (
                                 <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <span className="text-sm font-black text-gray-700">{h}</span>
                                    <div className="w-2 h-2 rounded-full bg-ishes-green animate-pulse"></div>
                                 </div>
                              ))}
                           </div>
                           <p className="text-xs text-gray-400 font-medium leading-relaxed italic">
                              Les horaires sont donnés à titre indicatif et peuvent être ajustés selon les groupes.
                           </p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         )}
      </section>

      {/* DETAILED PRESENTIEL SCHEDULER SECTION */}
      {presentielClasses.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50/50 rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl overflow-hidden">
            {/* Background ornaments */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8a96e]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />

            {/* Header info */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#c8a96e]/10 text-[#c8a96e] rounded-xl border border-[#c8a96e]/10 mb-4">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Planning & Créneaux
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight tracking-tight uppercase">
                  Organisation de la <br />
                  <span className="text-[#c8a96e] italic">formation en présentiel.</span>
                </h2>
                <p className="text-sm text-gray-400 font-medium mt-2 max-w-xl">
                  {id === "arabe_coran_junior"
                    ? "Voici l'organisation détaillée de nos 25 classes pour enfants (4 à 15 ans) à Toulouse. Filtrez par jour ou recherchez le niveau de votre enfant."
                    : "Voici l'organisation de nos classes en présentiel pour adultes à Toulouse, y compris les sessions du week-end dédiées aux Femmes."
                  }
                </p>
              </div>

              {/* Day filter tabs */}
              <div className="flex flex-wrap gap-2 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/50 self-start lg:self-end">
                {(id === "arabe_coran_junior"
                  ? ["tous", "mercredi", "samedi", "dimanche"]
                  : ["tous", "lundi", "mardi", "samedi", "dimanche"]
                ).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDayFilter(day)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      selectedDayFilter === day
                        ? "bg-white text-[#c8a96e] shadow-sm font-bold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {day === "tous" ? "Tous" : day}
                  </button>
                ))}
              </div>
            </div>

            {/* Search filter bar */}
            <div className="relative z-10 mb-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une classe, un niveau, un âge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c8a96e]/20 focus:border-[#c8a96e] text-sm font-medium transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((c) => {
                const status = getSlotStatus(c.slotKey);
                const isFull = status?.est_plein;
                const regUrl = `/inscription?plan=${c.planId}&slot=${c.slotKey}&classId=${c.id}&audience=${c.audience}`;

                return (
                  <div
                    key={c.id}
                    className={`group relative flex flex-col justify-between p-6 bg-white border rounded-[2rem] transition-all hover:shadow-xl hover:-translate-y-1 duration-300 ${
                      isFull 
                        ? "border-gray-100 opacity-80" 
                        : "border-gray-100/80 hover:border-[#c8a96e]/40 shadow-sm"
                    }`}
                  >
                    {/* Badge index */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-gray-300 tracking-wider">
                        {c.id === 0 ? "CLASSE GÉNÉRALE" : `CLASSE N°${c.id < 10 ? `0${c.id}` : c.id}`}
                      </span>
                      {isFull ? (
                        <div className="flex items-center gap-1.5 text-red-500 font-black uppercase text-[8px] bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Complet
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-green-600 font-black uppercase text-[8px] bg-green-50 px-2.5 py-1 rounded-lg border border-green-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Disponible
                        </div>
                      )}
                    </div>

                    {/* Level and details */}
                    <div className="mb-6">
                      <h4 className="text-lg font-black text-ishes-dark leading-snug tracking-tight mb-2 group-hover:text-[#c8a96e] transition-colors">
                        {c.niveau}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-400">
                        <span className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                          👶 {c.ageCondition}
                        </span>
                        <span className="bg-[#c8a96e]/5 border border-[#c8a96e]/10 text-[#c8a96e] px-2 py-1 rounded-md uppercase tracking-wider font-extrabold">
                          ⏰ {c.horaire}
                        </span>
                      </div>
                    </div>

                    {/* Registration button */}
                    <Link
                      href={regUrl}
                      className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-center shadow-md transition-all ${
                        isFull
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                          : "bg-[#c8a96e] text-white hover:bg-[#b0935b] shadow-[#c8a96e]/10"
                      }`}
                    >
                      {isFull ? "Session Complète" : (c.audience === 'enfant' ? "Inscrire mon enfant" : "S'inscrire")}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Empty state within scheduler */}
            {filteredClasses.length === 0 && (
              <div className="relative z-10 text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium text-sm">
                  Aucune classe trouvée pour vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#101828] to-[#1a2b42] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="relative z-10 space-y-10">
               <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                  Prêt à commencer <br /> l'aventure ?
               </h2>
               <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
                  Rejoignez des centaines d'étudiants et transformez votre relation avec la langue arabe dès aujourd'hui.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link 
                     href={`/inscription?plan=${id}&audience=${audience}`}
                     className="px-12 py-6 bg-[#008953] text-white font-black text-xl rounded-2xl shadow-2xl shadow-[#008953]/20 hover:scale-105 active:scale-95 transition-all"
                  >
                     {audience === 'enfant' ? "Inscrire mon enfant" : "Je m'inscris maintenant"}
                  </Link>
                  <p className="text-white/40 text-sm font-black uppercase tracking-[0.2em]">
                     Prix de la session: {course.price}
                  </p>
               </div>
            </div>
         </div>
      </section>
      {/* Lightbox Modal for Flyer */}
      {isFlyerOpen && course.flyerUrl && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative max-w-4xl w-full h-[85vh] bg-transparent rounded-3xl overflow-hidden flex flex-col items-center justify-center">
               <button 
                  onClick={() => setIsFlyerOpen(false)}
                  className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-colors cursor-pointer"
               >
                  <X className="w-6 h-6" />
               </button>
                {course.flyerUrl.toLowerCase().endsWith('.pdf') ? (
                   <iframe 
                      src={course.flyerUrl} 
                      className="w-[90vw] md:w-full h-[75vh] md:h-full rounded-2xl border-0 bg-white"
                      title="Descriptif de la formation PDF"
                   ></iframe>
                ) : (
                   <img 
                      src={course.flyerUrl} 
                      alt="Flyer de la formation" 
                      className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                   />
                )}
            </div>
         </div>
      )}
    </div>
  );
}
