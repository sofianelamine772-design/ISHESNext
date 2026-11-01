"use client";

import { useState } from "react";
import { AdminScheduleGrid } from "@/components/admin/AdminScheduleGrid";
import { AdminDistanceScheduleGrid } from "@/components/admin/AdminDistanceScheduleGrid";

export function AdminPlanningTabs({ classes }: { classes: any[] }) {
  const [mode, setMode] = useState<"presentiel" | "distanciel">("presentiel");

  return (
    <div className="space-y-6">
      <div className="no-print grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl max-w-md">
        <button
          type="button"
          onClick={() => setMode("presentiel")}
          className={`py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
            mode === "presentiel"
              ? "bg-white text-ishes-blue shadow-sm"
              : "text-gray-500 hover:text-ishes-dark"
          }`}
        >
          Planning présentiel
        </button>
        <button
          type="button"
          onClick={() => setMode("distanciel")}
          className={`py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
            mode === "distanciel"
              ? "bg-white text-ishes-blue shadow-sm"
              : "text-gray-500 hover:text-ishes-dark"
          }`}
        >
          Planning distanciel
        </button>
      </div>

      {mode === "presentiel" ? (
        <AdminScheduleGrid classes={classes} />
      ) : (
        <AdminDistanceScheduleGrid classes={classes} />
      )}
    </div>
  );
}
