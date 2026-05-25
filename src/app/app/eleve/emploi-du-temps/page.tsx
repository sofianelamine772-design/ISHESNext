"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { CalendarDays, Clock, MapPin, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { fetchStudentTimetableAction } from "@/app/actions/students";
import Link from "next/link";

export default function EmploiDuTempsPage() {
  const { user } = useUser();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  useEffect(() => {
    const loadTimetable = async () => {
      if (!user) return;
      try {
        const email = user.emailAddresses?.[0]?.emailAddress;
        const result = await fetchStudentTimetableAction(user.id, email);
        if (result.success && result.data) {
          setEvents(result.data);
        }
      } catch (err) {
        console.error("Error loading timetable", err);
      } finally {
        setLoading(false);
      }
    };
    loadTimetable();
  }, [user]);

  return (
    <div className="space-y-10">
      {/* Calendar Header */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 transition-all border border-gray-100"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 transition-all border border-gray-100"><ChevronRight className="w-5 h-5" /></button>
           </div>
           <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Mon Emploi du Temps</h3>
        </div>
        <div className="flex gap-3">
           <span className="bg-[#086b51]/5 text-[#086b51] border border-[#086b51]/10 px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-full">Année En Cours</span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-20 flex flex-col items-center justify-center shadow-sm">
          <Loader2 className="w-10 h-10 text-[#086b51] animate-spin mb-4" />
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Chargement de votre planning...</p>
        </div>
      ) : events.length > 0 ? (
        /* Week Grid */
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          {days.map((day) => (
            <div key={day} className="space-y-6">
              <div className="text-center py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{day}</span>
              </div>
              
              <div className="space-y-4 min-h-[150px] md:min-h-[400px]">
                 {events.filter(e => e.day === day).map((event, idx) => (
                   <div key={idx} className={`p-5 rounded-2xl border ${event.color} space-y-3 shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-70">
                         <Clock className="w-3 h-3" /> {event.time}
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-tight leading-tight">{event.title}</h4>
                      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest opacity-60">
                         <MapPin className="w-3 h-3" /> {event.type}
                      </div>
                   </div>
                 ))}
                 {events.filter(e => e.day === day).length === 0 && (
                   <div className="h-24 md:h-full rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/20 flex items-center justify-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">Libre</div>
                 )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border border-gray-100 p-12 md:p-20 text-center shadow-xl max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#086b51]/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 bg-amber-50 text-[#c8a96e] border border-amber-100 rounded-3xl flex items-center justify-center mx-auto shadow-md">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">Affectation en cours</h3>
            <p className="text-gray-500 font-medium text-base leading-relaxed">
              Assalamou alaykoum, <span className="text-[#086b51] font-black">{user?.firstName}</span>. Votre place est bien réservée au sein de notre établissement ! 
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Notre équipe administrative est actuellement en train de valider vos informations de paiement et de vous affecter à votre classe en présentiel ou en distanciel. Dès que votre affectation sera validée, votre emploi du temps hebdomadaire complet s'affichera automatiquement sur cette page.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app/eleve" className="px-8 py-4 bg-[#086b51] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#086b51]/20 hover:bg-[#075f48] transition-all">
                Aller au Tableau de bord
              </Link>
              <Link href="/app/eleve/messagerie" className="px-8 py-4 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all">
                Contacter le secrétariat
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
