"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, Heading2, Palette } from "lucide-react";

const COLORS = [
  { label: "Marine", value: "#0a192f" },
  { label: "Or", value: "#C69C6D" },
  { label: "Vert", value: "#086b51" },
  { label: "Rouge", value: "#dc2626" },
  { label: "Orange", value: "#b45309" },
  { label: "Gris", value: "#555555" },
];

type EmailComposerProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function applyFormat(command: string, value: string | undefined, editor: HTMLDivElement | null, onChange: (html: string) => void) {
  if (!editor) return;
  editor.focus();
  document.execCommand(command, false, value);
  onChange(editor.innerHTML);
}

export function EmailComposer({ value, onChange, placeholder }: EmailComposerProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (value === "" && editorRef.current.innerHTML !== "") {
      editorRef.current.innerHTML = "";
    }
  }, [value]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden focus-within:ring-2 focus-within:ring-[#086b51]/20 transition-all">
      <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 bg-white border-b border-gray-100">
        <ToolbarButton
          title="Gras"
          onClick={() => applyFormat("bold", undefined, editorRef.current, onChange)}
        >
          <Bold className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Italique"
          onClick={() => applyFormat("italic", undefined, editorRef.current, onChange)}
        >
          <Italic className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Titre"
          onClick={() => applyFormat("formatBlock", "h2", editorRef.current, onChange)}
        >
          <Heading2 className="w-3.5 h-3.5" />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1 mr-1">
          <Palette className="w-3 h-3" /> Couleur
        </span>
        {COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            title={color.label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("foreColor", color.value, editorRef.current, onChange)}
            className="w-5 h-5 rounded-full border border-black/10 hover:scale-110 transition-transform"
            style={{ backgroundColor: color.value }}
          />
        ))}
        <label className="ml-1 w-5 h-5 rounded-full border border-dashed border-gray-300 overflow-hidden cursor-pointer" title="Couleur personnalisée">
          <input
            type="color"
            className="opacity-0 w-full h-full cursor-pointer"
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => applyFormat("foreColor", e.target.value, editorRef.current, onChange)}
          />
        </label>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Contenu du message"
        data-placeholder={placeholder || "Écrivez votre message ici..."}
        onInput={() => {
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        onPaste={(e) => {
          e.preventDefault();
          const text = e.clipboardData.getData("text/plain");
          document.execCommand("insertText", false, text);
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        className="min-h-[160px] px-5 py-4 text-sm font-medium text-gray-800 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:font-medium [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-[#0a192f] [&_h2]:mt-1 [&_h2]:mb-2"
      />
    </div>
  );
}

function ToolbarButton({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#086b51] flex items-center justify-center transition-colors"
    >
      {children}
    </button>
  );
}
