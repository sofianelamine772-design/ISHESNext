"use client";

import React, { useState, useEffect } from "react";
import { PRESENTIEL_CLASSES } from "@/lib/presentiel-data";
import { getCurrentAcademicYear } from "@/lib/utils";
import { updateClassTeacherAction } from "@/app/actions/students";
import { Loader2, Edit2 } from "lucide-react";

export function AdminScheduleGrid({ classes }: { classes: any[] }) {
  const currentYear = getCurrentAcademicYear();
  
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

  // DEFAULT FALLBACK MAPPING
  const DEFAULT_TEACHER_MAPPING: Record<number, string> = {
    1: "Hasnia", 2: "Hasnia", 3: "Lyna", 4: "Fatiha", 5: "Ines", 
    6: "Lyhna", 7: "Souheila", 8: "Emna", 9: "Emna", 10: "Khadija", 
    11: "Salima", 12: "Selima", 13: "Sanae", 14: "Fatiha", 15: "Sanae", 
    16: "Souheila", 17: "Emna", 18: "Sanae", 19: "Fatiha", 20: "Fatiha", 
    21: "Sanae", 22: "Khadija", 23: "Khadija", 24: "Moufida", 25: "Moufida"
  };

  // Local state to track currently edited teacher
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [teacherMapping, setTeacherMapping] = useState<Record<number, string>>(DEFAULT_TEACHER_MAPPING);

  // Initialize teacher mapping from DB when component loads or props change
  useEffect(() => {
    const newMapping = { ...DEFAULT_TEACHER_MAPPING };
    classes.forEach(c => {
      if (c.externalId && c.teacherName) {
        newMapping[c.externalId] = c.teacherName;
      }
    });
    setTeacherMapping(newMapping);
  }, [classes]);

  const handleStartEdit = (externalId: number) => {
    setEditingId(externalId);
    setEditValue(teacherMapping[externalId] || "");
  };

  const handleSave = async (externalId: number) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const result = await updateClassTeacherAction(externalId, editValue.trim());
      if (result.success) {
        setTeacherMapping(prev => ({ ...prev, [externalId]: editValue.trim() }));
      } else {
        alert("Erreur: " + result.error);
      }
    } catch (err) {
      alert("Une erreur est survenue.");
    } finally {
      setIsSaving(false);
      setEditingId(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 20px; }
          .no-print { display: none !important; }
          input { border: none !important; background: transparent !important; }
        }
      `}} />
      
      <div id="print-area" className="min-w-[1000px] bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue uppercase tracking-tight">Année {currentYear}</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-1">Schéma des effectifs par classe</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="no-print bg-[#086b51] hover:bg-[#075c45] text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-sm transition-all"
          >
            Télécharger en PDF
          </button>
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
                    const isEditing = editingId === c.id;

                    return (
                      <div 
                        key={c.id} 
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02] ${getColorClass(c.niveauKey)}`}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-tight mb-1 opacity-90 leading-tight">
                          {c.niveau}
                          {c.ageCondition && c.ageCondition !== "Femme" && ` (${c.ageCondition})`}
                        </span>
                        
                        <div className="mb-2 relative flex items-center justify-center w-full group">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSave(c.id);
                                  if (e.key === 'Escape') setEditingId(null);
                                }}
                                onBlur={() => handleSave(c.id)}
                                disabled={isSaving}
                                className="w-24 text-center text-xs font-medium bg-white/50 border border-black/10 rounded px-1 py-0.5 text-black focus:outline-none focus:ring-1 focus:ring-black/20"
                              />
                              {isSaving && <Loader2 className="w-3 h-3 animate-spin text-black/50" />}
                            </div>
                          ) : (
                            <span 
                              className="text-xs font-medium opacity-80 cursor-pointer flex items-center gap-1.5 hover:opacity-100 hover:underline decoration-black/20 underline-offset-2 no-print-interactive"
                              onClick={() => handleStartEdit(c.id)}
                              title="Cliquez pour modifier le nom du professeur"
                            >
                              {teacherMapping[c.id] || "Aucun prof"}
                              <Edit2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity no-print" />
                            </span>
                          )}
                        </div>

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
