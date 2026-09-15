import React from "react";
import { PRESENTIEL_CLASSES } from "@/lib/presentiel-data";

type ClassStats = {
  externalId: number;
  count: number;
};

export function AdminScheduleGrid({ classes }: { classes: any[] }) {
  // Map class count by externalId
  const countsByExtId: Record<number, number> = {};
  classes.forEach(c => {
    if (c.externalId) {
      countsByExtId[c.externalId] = c.students?.length || 0;
    }
  });

  const columns = [
    { id: "mercredi_après-midi", label: "Mercredi après-midi", time: "13h30 – 16h30" },
    { id: "samedi_matin", label: "Samedi matin", time: "9h00 – 12h00" },
    { id: "samedi_après-midi", label: "Samedi après-midi", time: "13h30 – 16h30" },
    { id: "dimanche_matin", label: "Dimanche matin", time: "9h00 – 12h00" },
    { id: "dimanche_après-midi", label: "Dimanche après-midi", time: "13h30 – 16h30" },
  ];

  const getColorClass = (niveauKey: string) => {
    if (niveauKey.includes("maternel")) return "bg-[#8CED80] text-[#1E5C15] border-[#72D664]";
    if (niveauKey.includes("elementaire_1")) return "bg-[#FF8878] text-[#7A1C10] border-[#E86756]";
    if (niveauKey === "elementaire_2") return "bg-[#5FE1D5] text-[#116660] border-[#42C8BC]";
    if (niveauKey === "elementaire_2_plus") return "bg-[#58AAFC] text-[#15467A] border-[#3D8FDF]";
    if (niveauKey === "elementaire_3" || niveauKey === "elementaire_4" || niveauKey.includes("femme")) {
      return "bg-[#FF83C6] text-[#7A134F] border-[#DF62A6]";
    }
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6">
      <div className="min-w-[1000px]">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue uppercase tracking-tight">Année 2026/2027</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-1">Schéma des effectifs par classe</p>
        </div>

        <div className="flex gap-4">
          {columns.map(col => {
            // Find all classes for this column
            const colClasses = PRESENTIEL_CLASSES.filter(c => `${c.jour}_${c.periode}` === col.id);
            // Calculate total students in this column
            const colTotal = colClasses.reduce((sum, c) => sum + (countsByExtId[c.id] || 0), 0);

            return (
              <div key={col.id} className="flex-1 flex flex-col bg-white border-2 border-gray-100 rounded-3xl p-3 shadow-sm min-w-[200px]">
                {/* Column Header */}
                <div className="text-center py-3 bg-[#EEF4FF] rounded-2xl mb-4 border border-[#D5E4FF]">
                  <h3 className="font-black text-ishes-blue text-sm">{col.label}</h3>
                  <p className="text-[#3A78DF] font-bold text-xs mt-0.5">{col.time}</p>
                  <div className="mt-2 text-[11px] font-black uppercase tracking-widest text-ishes-blue bg-white rounded-lg py-1 px-2 inline-block shadow-sm">
                    Total : {colTotal} élève{colTotal > 1 ? 's' : ''}
                  </div>
                </div>

                {/* Classes in Column */}
                <div className="flex flex-col gap-3 flex-1">
                  {colClasses.map(c => {
                    const count = countsByExtId[c.id] || 0;
                    return (
                      <div 
                        key={c.id} 
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02] ${getColorClass(c.niveauKey)}`}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-tight mb-1 opacity-90 leading-tight">
                          {c.niveau}
                          {c.ageCondition && c.ageCondition !== "Femme" && ` (${c.ageCondition})`}
                        </span>
                        <div className="text-xl font-black tracking-tighter">
                          {count} <span className="text-sm font-bold opacity-80 tracking-normal uppercase">élève{count > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
