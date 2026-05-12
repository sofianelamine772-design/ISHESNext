"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Megaphone, Calendar, FileText, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default function MailGeneralPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [announcement, setAnnouncement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  async function fetchAnnouncement() {
    setLoading(true);
    try {
      const { data } = await supabaseAdmin
        .from('messages')
        .select('*')
        .eq('id', id)
        .single();
      if (data) setAnnouncement(data);
    } catch (err) {
      console.error("Error fetching announcement:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-[#086b51]" /></div>;
  }

  if (!announcement) {
    return <div className="text-center py-20">Annonce introuvable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link 
        href="/app/eleve/messagerie" 
        className="flex items-center gap-2 text-gray-400 hover:text-gray-800 font-bold text-xs uppercase tracking-widest transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à la messagerie
      </Link>

      <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/40">
        {/* Header Image/Pattern */}
        <div className="h-48 bg-[#086b51] relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Megaphone className="w-64 h-64 -rotate-12 translate-x-20" strokeWidth={1} />
           </div>
           <Megaphone className="w-16 h-16 text-white relative z-10" />
        </div>

        <div className="p-10 md:p-16 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#086b51]/10 text-[#086b51] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {announcement.type === 'global' ? 'Annonce Globale' : 'Annonce de Classe'}
              </span>
              <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                Publié le {new Date(announcement.created_at).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tight">
              {announcement.title}
            </h1>
          </div>

          <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg whitespace-pre-wrap">
             {announcement.content}
          </div>

          {/* Attachments Placeholder */}
          <div className="bg-gray-50 rounded-3xl p-8 space-y-6 border border-gray-100">
             <h4 className="text-gray-800 font-black text-sm uppercase tracking-widest flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#086b51]" /> Pièces jointes
             </h4>
             <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Aucune pièce jointe pour cette annonce.</div>
          </div>

          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#086b51]/10 flex items-center justify-center text-[#086b51]">
                   <Calendar className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-sm font-black text-gray-800 uppercase tracking-tight">Support Administratif</div>
                   <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Institut ISHES</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
