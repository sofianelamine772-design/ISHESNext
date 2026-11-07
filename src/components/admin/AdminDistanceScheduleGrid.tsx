"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getCurrentAcademicYear } from "@/lib/utils";
import {
  DISTANCE_WEEKLY_SCHEDULE,
  distanceScheduleToneClass,
  type DistanceScheduleSlot,
} from "@/lib/distance-schedule";
import { updateDistanceSlotTeacherAction } from "@/app/actions/students";
import { Edit2, Loader2 } from "lucide-react";

type AdminClass = {
  externalId?: number | null;
  formationTitle?: string | null;
  students?: unknown[];
  type?: string | null;
  name?: string | null;
  formationId?: string | null;
  formationSlug?: string | null;
  teacherName?: string | null;
};

function normalizeSlug(value?: string | null): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function inferSlugFromTitle(title?: string | null): string {
  const t = (title || "").toLowerCase();
  if (t.includes("tarbiya") || t.includes("éducation islamique") || t.includes("education islamique")) return "tarbiya_islamiya";
  if (t.includes("tajwid intensif")) return "tajwid_intensif";
  if (t.includes("tajwid") && t.includes("enfant")) return "tajwid_enfant_distance";
  if (t.includes("tajwid") && t.includes("standard")) return "tajwid_standard";
  if (t.includes("arabe") && t.includes("enfant")) return "arabe_enfant_distance";
  if (t.includes("civilisation") || t.includes("histoire arabo")) return "civilisation_arabo_musulmane";
  if (t.includes("fiqh")) return "fiqh_malikite";
  if (t.includes("spiritual")) return "spiritualite_islam";
  if (t.includes("sîra") || t.includes("sirah") || t.includes("sira")) return "as_sirah";
  if (t.includes("sciences du coran")) return "sciences_du_coran";
  if (t.includes("mémorisation") || t.includes("memorisation") || t.includes("hifz") || t.includes("hifdh") || t.includes("tilawa")) return "memoriser_coran";
    if (t.includes("formation") && t.includes("tajwid")) return "formation_enseignante_tajwid";
  if (t.includes("formation") && (t.includes("tarbya") || t.includes("tarbiya"))) return "formation_enseignante_tarbya";
  return normalizeSlug(title);
}

function matchedClassesForSlot(slot: DistanceScheduleSlot, classes: AdminClass[]): AdminClass[] {
  const byExt = new Set(slot.externalIds || []);
  const bySlug = new Set((slot.formationSlugs || []).map(normalizeSlug));
  if (byExt.size === 0 && bySlug.size === 0) return [];

  const matched: AdminClass[] = [];
  const seen = new Set<string>();
  for (const c of classes) {
    const key = `${c.externalId || ""}::${c.name || ""}::${c.formationTitle || ""}`;
    if (seen.has(key)) continue;
    const slug = normalizeSlug(c.formationSlug) || inferSlugFromTitle(c.formationTitle) || inferSlugFromTitle(c.name);
    const matchExt = c.externalId != null && byExt.has(c.externalId);
    const matchSlug = bySlug.size > 0 && bySlug.has(slug);
    if (matchExt || (matchSlug && byExt.size === 0)) {
      seen.add(key);
      matched.push(c);
    }
  }
  return matched;
}

function countForSlot(slot: DistanceScheduleSlot, classes: AdminClass[]): number {
  return matchedClassesForSlot(slot, classes).reduce((sum, c) => sum + (c.students?.length || 0), 0);
}

const LOCAL_TEACHERS_KEY = "ishes-distance-slot-teachers";

function readLocalTeachers(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LOCAL_TEACHERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeLocalTeacher(slotId: string, teacherName: string) {
  if (typeof window === "undefined") return;
  const next = { ...readLocalTeachers(), [slotId]: teacherName };
  window.localStorage.setItem(LOCAL_TEACHERS_KEY, JSON.stringify(next));
}

function resolveSlotTeacher(
  slot: DistanceScheduleSlot,
  classes: AdminClass[],
  localTeachers: Record<string, string>,
): string {
  const matched = matchedClassesForSlot(slot, classes);
  const fromDb = matched.map((c) => (c.teacherName || "").trim()).find(Boolean);
  if (fromDb) return fromDb;
  if (localTeachers[slot.id]?.trim()) return localTeachers[slot.id].trim();
  return slot.teacher || "";
}

function slotHasDbLink(slot: DistanceScheduleSlot): boolean {
  return Boolean(slot.externalIds?.length || slot.formationSlugs?.length);
}

export function AdminDistanceScheduleGrid({ classes }: { classes: AdminClass[] }) {
  const currentYear = getCurrentAcademicYear();
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [teacherMapping, setTeacherMapping] = useState<Record<string, string>>({});

  const distanceClasses = useMemo(
    () => (classes || []).filter((c) => c.type !== "presentiel"),
    [classes],
  );

  useEffect(() => {
    const localTeachers = readLocalTeachers();
    const next: Record<string, string> = {};
    for (const day of DISTANCE_WEEKLY_SCHEDULE) {
      for (const slot of day.slots) {
        next[slot.id] = resolveSlotTeacher(slot, distanceClasses, localTeachers);
      }
    }
    setTeacherMapping(next);
  }, [distanceClasses]);

  const dayTotals = useMemo(() => {
    return DISTANCE_WEEKLY_SCHEDULE.map((day) => ({
      id: day.id,
      total: day.slots.reduce((sum, slot) => sum + countForSlot(slot, distanceClasses), 0),
    }));
  }, [distanceClasses]);

  const handleStartEdit = (slot: DistanceScheduleSlot) => {
    setEditingId(slot.id);
    setEditValue(teacherMapping[slot.id] || slot.teacher || "");
  };

  const handleSave = async (slot: DistanceScheduleSlot) => {
    if (isSaving) return;
    setIsSaving(true);
    const teacherName = editValue.trim();
    try {
      if (slotHasDbLink(slot)) {
        const result = await updateDistanceSlotTeacherAction({
          externalIds: slot.externalIds,
          formationSlugs: slot.formationSlugs,
          teacherName,
        });
        if (!result.success) {
          writeLocalTeacher(slot.id, teacherName);
          setTeacherMapping((prev) => ({ ...prev, [slot.id]: teacherName }));
          alert("Professeur enregistré sur ce navigateur (aucune classe liée trouvée en base).");
          return;
        }
      }
      writeLocalTeacher(slot.id, teacherName);
      setTeacherMapping((prev) => ({ ...prev, [slot.id]: teacherName }));
    } catch {
      alert("Une erreur est survenue.");
    } finally {
      setIsSaving(false);
      setEditingId(null);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("print-area-distance");
    if (!element) return;

    setGeneratingPdf(true);
    try {
      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      const dataUrl = await toPng(element, {
        quality: 1,
        backgroundColor: "#ffffff",
        filter: (node: any) => {
          if (node.classList && node.classList.contains("no-print")) return false;
          return true;
        },
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [element.scrollWidth + 40, element.scrollHeight + 40],
      });

      pdf.addImage(dataUrl, "PNG", 20, 20, element.scrollWidth, element.scrollHeight);
      pdf.save(`Planning_Distanciel_ISHES_${currentYear.replace("/", "-")}.pdf`);
    } catch (err) {
      console.error("Erreur PDF distanciel:", err);
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6">
      <div id="print-area-distance" className="min-w-[1100px] bg-white p-4">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue uppercase tracking-tight">
              Planning distanciel · {currentYear}
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-1">
              Cours · Enseignants · Effectifs
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={generatingPdf}
            className="no-print flex items-center gap-2 bg-[#086b51] hover:bg-[#075c45] text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-sm transition-all disabled:opacity-50"
          >
            {generatingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Génération...
              </>
            ) : (
              "Télécharger en PDF"
            )}
          </button>
        </div>

        <div className="flex gap-3">
          {DISTANCE_WEEKLY_SCHEDULE.map((day) => {
            const dayTotal = dayTotals.find((d) => d.id === day.id)?.total || 0;
            return (
              <div
                key={day.id}
                className="flex-1 flex flex-col bg-white border-2 border-gray-100 rounded-3xl p-3 shadow-sm min-w-[150px]"
              >
                <div className="text-center py-3 bg-[#EEF4FF] rounded-2xl mb-4 border border-[#D5E4FF]">
                  <h3 className="font-black text-ishes-blue text-sm uppercase tracking-wide">{day.label}</h3>
                  <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-ishes-blue bg-white rounded-lg py-1 px-2 inline-block shadow-sm">
                    Total : {dayTotal}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  {day.slots.map((slot) => {
                    const count = countForSlot(slot, distanceClasses);
                    const isEditing = editingId === slot.id;
                    const teacherLabel = teacherMapping[slot.id] || slot.teacher || "";

                    return (
                      <div
                        key={slot.id}
                        className={`p-3 rounded-2xl border-2 flex flex-col text-left ${distanceScheduleToneClass(slot.tone)}`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-wide opacity-80 mb-1">
                          {slot.time}
                        </span>
                        <span className="text-[12px] font-black leading-snug mb-1">{slot.title}</span>

                        <div className="mb-2 relative flex items-center w-full group min-h-[18px]">
                          {isEditing ? (
                            <div className="flex items-center gap-2 w-full no-print">
                              <input
                                type="text"
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSave(slot);
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                onBlur={() => handleSave(slot)}
                                disabled={isSaving}
                                className="w-full text-left text-[11px] font-medium bg-white/70 border border-black/10 rounded px-1.5 py-0.5 text-black focus:outline-none focus:ring-1 focus:ring-black/20"
                                placeholder="Nom du professeur"
                              />
                              {isSaving && <Loader2 className="w-3 h-3 animate-spin text-black/50 shrink-0" />}
                            </div>
                          ) : (
                            <span
                              className="text-[11px] font-medium opacity-80 cursor-pointer flex items-center gap-1.5 hover:opacity-100 hover:underline decoration-black/20 underline-offset-2"
                              onClick={() => handleStartEdit(slot)}
                              title="Cliquez pour modifier le nom du professeur"
                            >
                              {teacherLabel || "Aucun prof"}
                              <Edit2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity no-print" />
                            </span>
                          )}
                        </div>

                        <div className="mt-auto text-sm font-black tracking-tight">
                          Effectif : {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-[11px] text-gray-400 font-medium">
          Cliquez sur le nom du professeur pour le modifier (comme en présentiel). Effectifs calculés depuis les inscriptions actives.
        </p>
      </div>
    </div>
  );
}
