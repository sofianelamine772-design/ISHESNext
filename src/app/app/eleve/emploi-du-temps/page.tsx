"use client";

import { CalendarDays, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function EmploiDuTempsPage() {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const events = [
    { day: "Lun", time: "18:00 - 19:30", title: "Arabe Littéraire", type: "Distanciel (Zoom)", color: "bg-blue-50 border-blue-100 text-blue-700" },
    { day: "Mer", time: "14:00 - 15:30", title: "Tajwid Débutant", type: "Présentiel (Salle 4)", color: "bg-[#086b51]/10 border-[#086b51]/20 text-[#086b51]" },
    { day: "Sam", time: "10:00 - 11:30", title: "Atelier Culturel", type: "Présentiel (Grand Hall)", color: "bg-purple-50 border-purple-100 text-purple-700" },
  ];

  return (
    <div className="space-y-10">
      {/* Calendar Header */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 transition-all border border-gray-100"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 transition-all border border-gray-100"><ChevronRight className="w-5 h-5" /></button>
           </div>
           <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Mai 2024</h3>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2 bg-[#086b51] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#086b51]/20">Semaine</button>
           <button className="px-6 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gray-100 transition-all">Mois</button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-6">
        {days.map((day) => (
          <div key={day} className="space-y-6">
            <div className="text-center py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{day}</span>
            </div>
            
            <div className="space-y-4 min-h-[400px]">
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
               <div className="h-full rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
