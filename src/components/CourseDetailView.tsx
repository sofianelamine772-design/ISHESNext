"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Play, Star, ShieldCheck, Zap, Heart, Users, Calendar } from "lucide-react";

interface CourseDetailViewProps {
  course: any;
  id: string;
}

export function CourseDetailView({ course, id }: CourseDetailViewProps) {
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
               <div className="flex flex-wrap gap-4 pt-4">
                  <Link 
                     href={`/inscription?plan=${id}`}
                     className="px-10 py-5 bg-[#008953] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#008953]/20 hover:bg-[#007044] transition-all flex items-center gap-3 active:scale-95"
                  >
                     S'inscrire maintenant <ArrowRight className="w-6 h-6" />
                  </Link>
                  <button className="px-10 py-5 bg-white border-2 border-gray-100 text-[#101828] font-black text-lg rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
                     <Play className="w-5 h-5 fill-current" /> Voir le teaser
                  </button>
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
               <p className="text-lg text-gray-500 font-medium leading-relaxed">
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
      </section>

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
                     href={`/inscription?plan=${id}`}
                     className="px-12 py-6 bg-[#008953] text-white font-black text-xl rounded-2xl shadow-2xl shadow-[#008953]/20 hover:scale-105 active:scale-95 transition-all"
                  >
                     Je m'inscris maintenant
                  </Link>
                  <p className="text-white/40 text-sm font-black uppercase tracking-[0.2em]">
                     Prix de la session: {course.price}
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
