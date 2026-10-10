import type { ReactNode } from "react";

/** Court texte sous les pastilles d'horaire : le rythme du cours, en phrases. */
export function CourseCadenceNote({ children }: { children: ReactNode }) {
  return (
    <section className="px-6 max-w-7xl mx-auto pt-8" aria-label="Rythme du cours">
      <div className="max-w-3xl border-l-2 border-ishes-gold pl-5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-ishes-gold mb-2">
          En pratique
        </p>
        <p className="text-gray-700 font-medium leading-relaxed">{children}</p>
      </div>
    </section>
  );
}
