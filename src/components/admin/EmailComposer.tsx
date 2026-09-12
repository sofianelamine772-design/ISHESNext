"use client";

import { useEffect, useRef } from "react";
import { AlignCenter, Bold, Heading2, Italic, Paperclip, Palette, X } from "lucide-react";

const COLORS = [
  { label: "Marine", value: "#0a192f" },
  { label: "Or", value: "#C69C6D" },
  { label: "Vert", value: "#086b51" },
  { label: "Rouge", value: "#dc2626" },
  { label: "Orange", value: "#b45309" },
  { label: "Gris", value: "#555555" },
];

const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx,.csv";

type EmailComposerProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  attachments?: File[];
  onAttachmentsChange?: (files: File[]) => void;
};

function applyFormat(command: string, value: string | undefined, editor: HTMLDivElement | null, onChange: (html: string) => void) {
  if (!editor) return;
  editor.focus();
  document.execCommand(command, false, value);
  onChange(editor.innerHTML);
}

export function EmailComposer({ value, onChange, placeholder, attachments = [], onAttachmentsChange }: EmailComposerProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (value === "" && editorRef.current.innerHTML !== "") {
      editorRef.current.innerHTML = "";
    }
  }, [value]);

  const addTitle = () => {
    applyFormat("formatBlock", "h2", editorRef.current, onChange);
    applyFormat("justifyCenter", undefined, editorRef.current, onChange);
  };

  const addFiles = (list: FileList | null) => {
    if (!onAttachmentsChange || !list) return;
    const next = [...attachments];
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) break;
      if (file.size > MAX_FILE_BYTES) {
        alert(`« ${file.name} » dépasse 5 Mo.`);
        continue;
      }
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      next.push(file);
    }
    onAttachmentsChange(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
        <ToolbarButton title="Titre centré" onClick={addTitle}>
          <Heading2 className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Centrer"
          onClick={() => applyFormat("justifyCenter", undefined, editorRef.current, onChange)}
        >
          <AlignCenter className="w-3.5 h-3.5" />
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
        {onAttachmentsChange ? (
          <>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              type="button"
              title="Ajouter une pièce jointe"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="ml-auto inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#086b51] bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Paperclip className="w-3.5 h-3.5" />
              Joindre
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_TYPES}
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </>
        ) : null}
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
        className="min-h-[160px] px-5 py-4 text-sm font-medium text-gray-800 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:font-medium [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-[#0a192f] [&_h2]:mt-1 [&_h2]:mb-2 [&_h2]:text-center"
      />
      {onAttachmentsChange ? (
        <div className="px-3 py-2 bg-white border-t border-gray-100 flex flex-wrap items-center gap-2">
          {attachments.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[10px] font-bold text-gray-400 hover:text-[#086b51] uppercase tracking-widest"
            >
              PDF, image, Word ou Excel — 3 fichiers max, 5 Mo chacun
            </button>
          ) : (
            attachments.map((file, index) => (
              <span
                key={`${file.name}-${index}`}
                className="inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-600"
              >
                <Paperclip className="w-3 h-3 shrink-0 text-[#086b51]" />
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  title="Retirer"
                  onClick={() => onAttachmentsChange(attachments.filter((_, i) => i !== index))}
                  className="p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
      ) : null}
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

export async function filesToEmailAttachments(files: File[]) {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<{ filename: string; contentType: string; content: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = String(reader.result || "");
            resolve({
              filename: file.name,
              contentType: file.type || "application/octet-stream",
              content: result.includes(",") ? result.split(",")[1] : result,
            });
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        }),
    ),
  );
}
