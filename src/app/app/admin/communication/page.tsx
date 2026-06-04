"use client";

import { useState, useEffect, useRef } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { MessageSquare, Send, User, Loader2, CheckCircle2, Inbox, Search, Globe, Users, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { fetchClassesAction, fetchStudentsAction } from "@/app/actions/students";

export default function AdminCommunicationPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "send">("inbox");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Inbox state
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replySending, setReplySending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Send state
  const [broadcastType, setBroadcastType] = useState<"class" | "global" | "private">("global");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchStudentsAndClasses();
    fetchConversations();

    // Auto-refresh pour simuler le temps réel
    const interval = setInterval(() => {
      if (activeTab === "inbox") {
        fetchConversations();
      }
    }, 15000); // toutes les 15 secondes

    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  async function fetchStudentsAndClasses() {
    try {
      const classesResult = await fetchClassesAction();
      if (classesResult.success && classesResult.data) {
        setClasses(classesResult.data);
      }
      const studentsResult = await fetchStudentsAction();
      if (studentsResult.success && studentsResult.data) {
        setStudents(studentsResult.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  async function fetchConversations() {
    try {
      const res = await fetch('/api/messages?type=conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data || []);
      } else {
        console.error("fetchConversations error:", await res.text());
      }
    } catch (err) {
      console.error("fetchConversations catch error:", err);
    }
  }

  async function openChat(student: any) {
    setSelectedChat(student);
    setChatLoading(true);
    setChatMessages([]);

    // Mettre à jour l'UI localement pour enlever le badge non lu
    setConversations(prev => prev.map(c =>
      c.id === student.id ? { ...c, unread_count: 0 } : c
    ));

    try {
      const res = await fetch(`/api/messages?type=chat&clerkId=${student.id}`);
      if (res.ok) {
        const data = await res.json();
        setChatMessages(data || []);
      } else {
        console.error("openChat error:", await res.text());
      }
    } catch (err) {
      console.error("openChat catch error:", err);
    } finally {
      setChatLoading(false);
    }
  }

  async function handleReply() {
    if (!replyContent.trim() || !selectedChat || replySending) return;
    const content = replyContent.trim();
    setReplyContent("");
    setReplySending(true);

    // Optimiste
    const optimistic = { id: `tmp-${Date.now()}`, sender_id: 'admin_system', receiver_id: selectedChat.id, content, created_at: new Date().toISOString() };
    setChatMessages(prev => [...prev, optimistic]);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: 'admin_system',
          receiver_id: selectedChat.id,
          content,
          type: 'private',
        }),
      });
      if (res.ok) {
        openChat(selectedChat); // rafraîchir
      } else {
        setChatMessages(prev => prev.filter(m => m.id !== optimistic.id));
        const err = await res.json().catch(() => ({}));
        console.error("Erreur réponse:", err);
      }
    } finally {
      setReplySending(false);
    }
  }

  async function handleSendBroadcast() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const body: any = {
        sender_id: 'admin_system',
        content,
        type: broadcastType,
      };
      if (broadcastType === 'private' && !selectedStudent) {
        alert('Veuillez sélectionner un élève.');
        setLoading(false);
        return;
      }
      if (broadcastType === 'class' && !selectedClass) {
        alert('Veuillez sélectionner une classe.');
        setLoading(false);
        return;
      }

      if (broadcastType !== 'private' && title) body.title = title;
      if (broadcastType === 'private') body.receiver_id = selectedStudent;
      if (broadcastType === 'class') body.target_class_id = selectedClass;

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSuccess(true);
        setContent(""); setTitle(""); setSelectedStudent(""); setSelectedClass("");
        setTimeout(() => setSuccess(false), 3000);
        fetchConversations();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Erreur : ${err.error || 'Impossible d\'envoyer'}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden text-ishes-dark">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0">
          <h1 className="text-2xl ishes-heading text-ishes-dark font-black uppercase tracking-tight">Communication</h1>
          <div className="flex p-1 bg-gray-100 rounded-2xl">
            <button onClick={() => { setActiveTab("inbox"); fetchConversations(); }} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "inbox" ? 'bg-white text-ishes-dark shadow-sm' : 'text-gray-400'}`}>
              <Inbox className="w-4 h-4" /> Boîte de réception
            </button>
            <button onClick={() => setActiveTab("send")} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "send" ? 'bg-white text-ishes-dark shadow-sm' : 'text-gray-400'}`}>
              <Send className="w-4 h-4" /> Nouvel Envoi
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {activeTab === "inbox" ? (
            <div className="flex-1 flex overflow-hidden">
              {/* Liste conversations */}
              <div className="w-80 border-r border-gray-100 bg-white flex flex-col shrink-0">
                <div className="p-5 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input type="text" placeholder="Rechercher..." className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-[#086b51]/10" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="p-10 text-center">
                      <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                      <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Aucune discussion</p>
                      <p className="text-gray-300 text-[9px] font-medium mt-1">Les élèves qui vous écrivent apparaîtront ici</p>
                    </div>
                  ) : (
                    conversations.map((conv) => {
                      const displayName = [conv.first_name, conv.last_name].filter(Boolean).join(' ') || conv.email || "Utilisateur sans nom";
                      const initials = (conv.first_name?.[0] || conv.email?.[0] || '?').toUpperCase();

                      return (
                        <button
                          key={conv.id}
                          onClick={() => openChat(conv)}
                          className={`w-full p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all text-left border-l-4 ${selectedChat?.id === conv.id ? 'bg-emerald-50/30 border-[#086b51]' : 'border-transparent'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm ${selectedChat?.id === conv.id ? 'bg-[#086b51] text-white' : 'bg-gray-100 text-gray-500'}`}>
                              {initials}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className={`text-sm font-black truncate uppercase tracking-tight ${(conv.unread_count > 0 || conv.has_unread) ? 'text-black' : 'text-ishes-dark'}`}>{displayName}</h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Élève</p>
                            </div>
                          </div>
                          {(conv.unread_count > 0 || conv.has_unread) && (
                            <div className="bg-emerald-100 text-[#086b51] border border-emerald-200 text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm shrink-0 uppercase tracking-widest">
                              {conv.unread_count > 0 ? `${conv.unread_count} message${conv.unread_count > 1 ? 's' : ''}` : 'Nouveau'}
                            </div>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Zone de chat */}
              <div className="flex-1 bg-gray-50/30 flex flex-col overflow-hidden">
                {selectedChat ? (
                  <>
                    <div className="p-5 bg-white border-b border-gray-100 flex items-center gap-4 shrink-0">
                      <div className="w-10 h-10 bg-[#086b51] text-white rounded-xl flex items-center justify-center font-black text-sm">
                        {(selectedChat.first_name?.[0] || selectedChat.email?.[0] || '?').toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-ishes-dark uppercase tracking-tight">
                          {[selectedChat.first_name, selectedChat.last_name].filter(Boolean).join(' ') || selectedChat.email || "Utilisateur sans nom"}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Élève ISHES</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                      {chatLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="w-7 h-7 animate-spin text-[#086b51]" />
                        </div>
                      ) : chatMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-300">
                          <MessageSquare className="w-12 h-12 opacity-20" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Début de la conversation</p>
                        </div>
                      ) : (
                        chatMessages.map((msg, i) => {
                          const isAdmin = msg.sender_id === 'admin_system';
                          return (
                            <div key={msg.id || i} className={`flex gap-2.5 ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 self-end ${isAdmin ? 'bg-[#086b51] text-white' : 'bg-gray-200 text-gray-600'}`}>
                                {isAdmin ? 'A' : (selectedChat.first_name?.[0] || '?')}
                              </div>
                              <div className="max-w-sm">
                                <div className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${isAdmin ? 'bg-ishes-dark text-white rounded-br-md shadow-lg shadow-ishes-dark/10' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-md shadow-sm'}`}>
                                  {msg.content}
                                </div>
                                <span className={`text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1 block px-1 ${isAdmin ? 'text-right' : 'text-left'}`}>
                                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                      <div className="bg-gray-50 rounded-2xl px-4 py-2 flex items-center gap-3 border border-gray-100 focus-within:border-[#086b51]/30 focus-within:ring-2 focus-within:ring-[#086b51]/10 transition-all">
                        <input
                          type="text"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleReply()}
                          placeholder={`Répondre à ${selectedChat.first_name}...`}
                          className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-2 placeholder:text-gray-400"
                          autoFocus
                        />
                        <button
                          onClick={handleReply}
                          disabled={replySending || !replyContent.trim()}
                          className="w-9 h-9 bg-[#086b51] text-white rounded-xl flex items-center justify-center shadow-md shadow-[#086b51]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 shrink-0"
                        >
                          {replySending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                    <MessageSquare className="w-16 h-16 mb-4 opacity-10" />
                    <p className="font-black uppercase tracking-[0.2em] text-[10px]">Sélectionnez une discussion</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Nouvel Envoi */
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-3xl mx-auto bg-white rounded-[3rem] border border-gray-100 p-12 shadow-sm space-y-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#086b51]" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#086b51]">Nouveau Message</h3>
                </div>

                {/* Type d'envoi */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'global', label: 'Tout l\'Institut', icon: Globe, desc: 'Tous les élèves' },
                    { value: 'class', label: 'Par Classe', icon: Users, desc: 'Une classe précise' },
                    { value: 'private', label: 'Élève précis', icon: Lock, desc: 'Un seul élève' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setBroadcastType(opt.value as any)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all ${broadcastType === opt.value ? 'border-[#086b51] bg-emerald-50/40 shadow-md shadow-[#086b51]/10' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <opt.icon className={`w-5 h-5 mb-2 ${broadcastType === opt.value ? 'text-[#086b51]' : 'text-gray-400'}`} />
                      <div className={`text-[11px] font-black uppercase tracking-tight ${broadcastType === opt.value ? 'text-[#086b51]' : 'text-gray-600'}`}>{opt.label}</div>
                      <div className="text-[9px] font-medium text-gray-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                {broadcastType === 'class' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Choisir la Classe</label>
                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold">
                      <option value="">Sélectionner...</option>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                )}

                {broadcastType === 'private' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Choisir l'Élève</label>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold">
                      <option value="">Sélectionner...</option>
                      {students.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
                    </select>
                  </div>
                )}

                {broadcastType !== 'private' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Titre de l'annonce</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Rappel Vacances Scolaires" className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#086b51]/20 transition-all" />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contenu du message</label>
                  <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Écrivez votre message ici..." className="w-full bg-gray-50 border-gray-100 rounded-2xl py-5 px-6 text-sm font-medium resize-none focus:ring-2 focus:ring-[#086b51]/20 transition-all" />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  {success && (
                    <div className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Message envoyé avec succès !
                    </div>
                  )}
                  <div className="flex-1" />
                  <Button
                    onClick={handleSendBroadcast}
                    disabled={loading || !content.trim()}
                    className="bg-[#086b51] hover:bg-[#075c45] text-white px-12 py-7 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-[#086b51]/20"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Envoyer le message"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
