"use client";

import { cn } from "@/lib/utils";
import type { CourseModalityFilter } from "@/lib/course-modality";

const OPTIONS: { id: CourseModalityFilter; label: string }[] = [
  { id: "tous", label: "Tout" },
  { id: "distanciel", label: "Distanciel" },
  { id: "presentiel", label: "Présentiel" },
];

export function ModalityFilter({
  value,
  onChange,
  compact = false,
  counts,
}: {
  value: CourseModalityFilter;
  onChange: (value: CourseModalityFilter) => void;
  compact?: boolean;
  counts?: Partial<Record<CourseModalityFilter, number>>;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 w-full overflow-hidden border border-gray-200 bg-white",
        compact ? "rounded-xl" : "rounded-2xl",
      )}
      role="group"
      aria-label="Filtrer tout, distanciel ou présentiel"
    >
      {OPTIONS.map((option, index) => {
        const active = value === option.id;
        const count = counts?.[option.id];
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "font-black tracking-widest transition-all",
              compact ? "px-2 py-2 text-[10px]" : "px-4 py-2.5 text-[11px]",
              index > 0 && "border-l border-gray-200",
              active
                ? option.id === "presentiel"
                  ? "bg-orange-500 text-white"
                  : option.id === "distanciel"
                    ? "bg-blue-600 text-white"
                    : "bg-ishes-blue text-white"
                : "bg-white text-gray-500 hover:bg-gray-50",
            )}
          >
            {option.label}
            {typeof count === "number" ? ` · ${count}` : ""}
          </button>
        );
      })}
    </div>
  );
}
