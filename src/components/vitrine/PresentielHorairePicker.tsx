"use client";

import { isClassFull, type SlotStatusRow } from "@/lib/class-availability";
import { cn } from "@/lib/utils";

export type PresentielChoiceOption = {
  value: string;
  label: string;
  full?: boolean;
};

export type PresentielHoraireOption = {
  id: number;
  label: string;
};

export function PresentielChoicePicker({
  options,
  value,
  onChange,
  disabled,
  lockedPlaceholder,
  emptyPlaceholder = "Aucune option disponible",
  layout = "stack",
}: {
  options: PresentielChoiceOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  lockedPlaceholder: string;
  emptyPlaceholder?: string;
  layout?: "stack" | "inline";
}) {
  if (disabled) {
    return (
      <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-400 font-medium">
        {lockedPlaceholder}
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-400 font-medium">
        {emptyPlaceholder}
      </div>
    );
  }

  const allFull = options.every((opt) => opt.full);

  return (
    <div className="space-y-2">
      <div className={cn(
        layout === "inline"
          ? options.length <= 2 ? "grid grid-cols-2 gap-2" : "grid grid-cols-3 gap-2"
          : "space-y-2",
      )}>
        {options.map((opt) => {
          const full = Boolean(opt.full);
          const selected = !full && value === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              disabled={full}
              onClick={() => onChange(opt.value)}
              aria-disabled={full}
              className={cn(
                "w-full flex gap-3 rounded-xl border text-left text-sm font-semibold transition-all",
                layout === "inline"
                  ? "flex-col items-center justify-center text-center px-2 py-3 min-h-[4.75rem]"
                  : "items-center justify-between px-4 py-3.5",
                full && "bg-red-50 border-2 border-red-500 text-red-950 cursor-not-allowed",
                !full && selected && "border-ishes-blue bg-[#008953]/10 text-ishes-blue ring-2 ring-[#008953]/20",
                !full && !selected && "bg-white border-gray-200 text-gray-700 hover:border-ishes-blue",
              )}
            >
              <span className={cn("leading-snug", full && "line-through decoration-red-400")}>
                {opt.label}
              </span>
              {full ? (
                <span className="shrink-0 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                  Complet
                </span>
              ) : selected ? (
                <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-ishes-blue">
                  Choisi
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {allFull && (
        <p className="text-red-800 text-xs font-bold leading-relaxed bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          Formation complète — plus de places. Choisissez un autre jour ou un autre niveau.
        </p>
      )}
    </div>
  );
}

export function PresentielHorairePicker({
  options,
  slotsStatus,
  value,
  onChange,
  disabled,
  lockedPlaceholder,
  emptyPlaceholder = "Aucun horaire pour ce niveau",
}: {
  options: PresentielHoraireOption[];
  slotsStatus: SlotStatusRow[];
  value: string;
  onChange: (classId: string) => void;
  disabled?: boolean;
  lockedPlaceholder: string;
  emptyPlaceholder?: string;
}) {
  return (
    <PresentielChoicePicker
      options={options.map((opt) => ({
        value: String(opt.id),
        label: opt.label,
        full: isClassFull(slotsStatus, opt.id),
      }))}
      value={value}
      onChange={onChange}
      disabled={disabled}
      lockedPlaceholder={lockedPlaceholder}
      emptyPlaceholder={emptyPlaceholder}
    />
  );
}
