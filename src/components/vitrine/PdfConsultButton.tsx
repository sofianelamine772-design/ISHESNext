"use client";

import { useEffect, useState } from "react";

/** Ouvre le PDF dans une fenêtre de lecture, sans quitter la page. */
export function PdfConsultButton({ href, title }: { href: string; title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg border border-ishes-blue px-4 py-2.5 text-sm font-black text-ishes-blue hover:bg-ishes-blue hover:text-white transition-colors"
      >
        Consulter sur la page
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-[#071724]/85 pt-24 px-3 pb-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="bg-white h-full rounded-xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-100">
              <p className="font-black text-ishes-blue text-sm">{title}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-ishes-blue px-3 py-1.5 text-sm font-bold text-ishes-blue"
              >
                Fermer
              </button>
            </div>
            <iframe title={title} src={href} className="flex-1 w-full border-0" />
          </div>
        </div>
      )}
    </>
  );
}
