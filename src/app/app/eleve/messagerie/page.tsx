"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Send, User, Loader2, Megaphone, CheckCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function MessageriePage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"private" | "general">("private");
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  useEffect(() => {
    // Auto-scroll vers le bas à chaque nouveau message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchData() {
    setLoading(true);
    try {
      // Messages privés : conversation bidirectionnelle entre l'élève et l'admin
      const res = await fetch(`/api/messages?type=chat&clerkId=${user?.id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } else {
        console.error("Erreur fetch messages:", await res.text());
      }

      // Annonces générales
      const annRes = await fetch(`/api/messages?type=announcements&userId=${user?.id}`);
      if (annRes.ok) {
        const annData = await annRes.json();
        setAnnouncements(Array.isArray(annData) ? annData : []);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage() {
    if (!newMessage.trim() || !user || sending) return;
    const content = newMessage.trim();
    setSending(true);

    // Affichage optimiste immédiat
    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      sender_id: user.id,
      receiver_id: 'admin_system',
      content,
      type: 'private',
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setNewMessage("");

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: user.id,
          receiver_id: 'admin_system',
          content,
          type: 'private',
        }),
      });

      if (!res.ok) {
        // Annuler l'affichage optimiste si erreur
        setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
        const errorData = await res.json().catch(() => ({}));
        console.error("Erreur envoi message:", errorData);
        alert(`Erreur : ${errorData.error || errorData.hint || 'Impossible d\'envoyer le message'}`);
      } else {
        // Rafraîchir pour récupérer le vrai message avec l'ID Supabase
        fetchData();
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-200px)] flex flex-col md:flex-row bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-xl shadow-gray-200/40">
      
      {/* Sidebar / Top Tabs */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col shrink-0 bg-white z-10">
        <div className="hidden md:block p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-medium focus:ring-2 focus:ring-[#086b51]/20 transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto">
          {/* Message Privé */}
          <button
            onClick={() => setActiveTab("private")}
            className={`flex-1 md:w-full p-3 md:p-5 flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4 cursor-pointer transition-all hover:bg-gray-50/80 text-left ${activeTab === "private" ? 'bg-emerald-50/50 border-b-4 md:border-b-0 md:border-l-4 border-[#086b51]' : 'border-b-4 md:border-b-0 md:border-l-4 border-transparent'}`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all ${activeTab === "private" ? 'bg-[#086b51] shadow-lg shadow-[#086b51]/30' : 'bg-gray-100'}`}>
              <User className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === "private" ? 'text-white' : 'text-gray-400'}`} />
            </div>
            <div className="hidden md:block flex-1 min-w-0">
              <h4 className="text-sm font-black text-gray-800 truncate uppercase tracking-tight">Message Privé</h4>
              <p className="text-xs text-gray-400 truncate font-medium mt-0.5">Administration ISHES</p>
            </div>
            <div className="md:hidden">
              <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Privé</h4>
            </div>
            {messages.length > 0 && (
              <span className="w-5 h-5 bg-[#086b51] text-white text-[9px] font-black rounded-full flex items-center justify-center shrink-0 ml-auto md:ml-0">
                {messages.length > 9 ? '9+' : messages.length}
              </span>
            )}
          </button>

          {/* Mail Général */}
          <button
            onClick={() => setActiveTab("general")}
            className={`flex-1 md:w-full p-3 md:p-5 flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4 cursor-pointer transition-all hover:bg-gray-50/80 text-left ${activeTab === "general" ? 'bg-emerald-50/50 border-b-4 md:border-b-0 md:border-l-4 border-[#086b51]' : 'border-b-4 md:border-b-0 md:border-l-4 border-transparent'}`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all ${activeTab === "general" ? 'bg-[#086b51] shadow-lg shadow-[#086b51]/30' : 'bg-gray-100'}`}>
              <Megaphone className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === "general" ? 'text-white' : 'text-gray-400'}`} />
            </div>
            <div className="hidden md:block flex-1 min-w-0">
              <h4 className="text-sm font-black text-gray-800 truncate uppercase tracking-tight">Mail Général</h4>
              <p className="text-xs text-gray-400 truncate font-medium mt-0.5">Annonces & Plannings</p>
            </div>
            <div className="md:hidden">
              <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Général</h4>
            </div>
            {announcements.length > 0 && (
              <span className="w-5 h-5 bg-[#086b51] text-white text-[9px] font-black rounded-full flex items-center justify-center shrink-0 ml-auto md:ml-0">
                {announcements.length > 9 ? '9+' : announcements.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Zone principale */}
      {activeTab === "private" ? (
        <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 md:px-8 md:py-5 bg-white border-b border-gray-100 flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 bg-[#086b51]/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-[#086b51]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">Administration</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">En ligne</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-[#086b51]" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-300">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-[1.5rem] md:rounded-3xl flex items-center justify-center">
                  <User className="w-8 h-8 md:w-10 md:h-10 opacity-30" />
                </div>
                <p className="font-black uppercase tracking-widest text-[10px] text-center">Aucun message pour le moment</p>
                <p className="text-xs text-gray-400 font-medium text-center px-4">Commencez la conversation avec l'administration</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isMe = msg.sender_id === user?.id;
                return (
                  <div key={msg.id || idx} className={`flex gap-2 md:gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`hidden md:flex w-8 h-8 rounded-xl items-center justify-center shrink-0 self-end ${isMe ? 'bg-[#086b51]' : 'bg-white border border-gray-100 shadow-sm'}`}>
                      <User className={`w-4 h-4 ${isMe ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    {/* Bulle */}
                    <div className={`max-w-[85%] md:max-w-xs lg:max-w-md xl:max-w-lg group`}>
                      <div className={`px-4 py-3 md:px-5 md:py-3.5 rounded-[1.25rem] md:rounded-2xl ${isMe ? 'bg-[#086b51] text-white rounded-br-sm' : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-sm'}`}>
                        <p className="text-[13px] md:text-sm leading-relaxed font-medium break-words">{msg.content}</p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1.5 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isMe && <CheckCheck className="w-3 h-3 text-gray-300" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="p-3 md:p-5 bg-white border-t border-gray-100 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="bg-gray-50 rounded-[1.25rem] md:rounded-[1.5rem] px-2 py-1.5 md:px-3 md:py-2 flex items-center gap-2 border border-gray-100 focus-within:border-[#086b51]/30 focus-within:ring-2 focus-within:ring-[#086b51]/10 transition-all">
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Votre message..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium px-2 py-2 placeholder:text-gray-400"
              />
              <button 
                onClick={handleSendMessage}
                disabled={sending || !newMessage.trim()}
                className="bg-[#086b51] text-white w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl shadow-md shadow-[#086b51]/20 hover:bg-[#075c45] hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 shrink-0"
              >
                {sending ? <Loader2 className="w-4 h-4 md:w-4 md:h-4 animate-spin" /> : <Send className="w-4 h-4 md:w-4 md:h-4 ml-0.5" />}
              </button>
            </div>
            <p className="hidden md:block text-[10px] text-gray-300 font-bold uppercase tracking-widest text-center mt-3">
              Appuyez sur Entrée pour envoyer
            </p>
          </div>
        </div>
      ) : (
        /* Mail Général */
        <div className="flex-1 bg-gray-50/30 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-4">
            <h2 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tight mb-4 md:mb-6">Annonces Générales</h2>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#086b51]" />
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-16 md:py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                <Megaphone className="w-10 h-10 md:w-12 md:h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] md:text-xs">Aucune annonce disponible</p>
              </div>
            ) : (
              announcements.map((ann, idx) => (
                <Link 
                  key={idx} 
                  href={`/app/eleve/messagerie/mail-general?id=${ann.id}`}
                  className="block bg-white p-5 md:p-7 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 md:mb-4">
                    <span className="self-start sm:self-auto bg-[#086b51]/10 text-[#086b51] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {ann.type === 'global' ? '📢 Annonce Globale' : '🎓 Classe'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {new Date(ann.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-black text-gray-800 uppercase tracking-tight group-hover:text-[#086b51] transition-colors mb-2 leading-snug">{ann.title || "Sans titre"}</h3>
                  <p className="text-[13px] md:text-sm text-gray-500 line-clamp-2 font-medium leading-relaxed">{ann.content}</p>
                  <div className="flex items-center gap-1.5 mt-4 md:mt-5">
                    <span className="text-[10px] font-black text-[#086b51] uppercase tracking-widest group-hover:gap-2 transition-all">Lire l'annonce →</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
