"use client";

import { useMemo, useRef, useState } from "react";

export const EMAIL_SUBJECT_SUGGESTIONS = [
  "Rentrée Institut 2026/2027",
  "Fournitures scolaires",
  "Vacances scolaire 2026/27",
  "Fête de fin d'année Institut ISHES",
  "Réunion parents/profs",
  "Relance impayé",
];

type EmailSubjectAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
};

export function EmailSubjectAutocomplete({
  value,
  onChange,
  placeholder = "Ex: Rentrée Institut 2026/2027",
  inputClassName,
}: EmailSubjectAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return EMAIL_SUBJECT_SUGGESTIONS;
    return EMAIL_SUBJECT_SUGGESTIONS.filter((item) => item.toLowerCase().includes(q));
  }, [value]);

  const exactMatch = EMAIL_SUBJECT_SUGGESTIONS.some(
    (item) => item.toLowerCase() === value.trim().toLowerCase()
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        autoComplete="off"
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setOpen(false), 120);
        }}
        className={inputClassName}
      />
      {open && matches.length > 0 && !exactMatch && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden">
          {matches.map((item) => (
            <button
              key={item}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (blurTimer.current) clearTimeout(blurTimer.current);
                onChange(item);
                setOpen(false);
              }}
              className="w-full text-left px-5 py-3 text-sm font-bold text-ishes-dark hover:bg-emerald-50/70 hover:text-[#086b51] transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {EMAIL_SUBJECT_SUGGESTIONS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
              value === item
                ? "bg-[#086b51] text-white border-[#086b51]"
                : "bg-white text-gray-400 border-gray-200 hover:border-[#086b51]/40 hover:text-[#086b51]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
