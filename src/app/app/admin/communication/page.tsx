"use client";

import { useState, useEffect, useRef } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { MessageSquare, Send, Loader2, CheckCircle2, Inbox, Search, Globe, Users, Lock, ChevronRight, Trash2, History, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { fetchClassesAction, fetchStudentsAction } from "@/app/actions/students";
import { cn } from "@/lib/utils";
import { EmailComposer, filesToEmailAttachments } from "@/components/admin/EmailComposer";
import { ClerkInviteRelaunch } from "@/components/admin/ClerkInviteRelaunch";
import { EmailHistory } from "@/components/admin/EmailHistory";
import { EmailSubjectAutocomplete } from "@/components/admin/EmailSubjectAutocomplete";
import { htmlToPlainText, looksLikeHtml } from "@/lib/email-html";

export default function AdminCommunicationPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "send" | "history">("inbox");
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
  const [replyAttachments, setReplyAttachments] = useState<File[]>([]);
  const [replySending, setReplySending] = useState(false);
  const replyFileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Send state
  const [broadcastType, setBroadcastType] = useState<"class" | "global" | "private">("global");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [formatFilter, setFormatFilter] = useState<"all" | "presentiel" | "distanciel">("all");
  const [classSearch, setClassSearch] = useState("");
  const [classFilterFormat, setClassFilterFormat] = useState<"all" | "presentiel" | "distanciel">("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

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
    setReplyAttachments([]);

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

  async function handleDeleteChatHistory() {
    if (!selectedChat) return;
    if (!confirm("Voulez-vous vraiment supprimer tout l'historique avec cet élève ? Cette action est irréversible.")) return;

    try {
      const res = await fetch(`/api/messages?studentId=${selectedChat.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setChatMessages([]);
        fetchConversations();
        setSelectedChat(null);
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur système.");
    }
  }

  async function handleReply() {
    if ((!replyContent.trim() && replyAttachments.length === 0) || !selectedChat || replySending) return;
    const files = replyAttachments;
    const names = files.map((f) => f.name).join(', ');
    const content = replyContent.trim() || (names ? `Pièce jointe : ${names}` : '');
    setReplyContent("");
    setReplyAttachments([]);
    setReplySending(true);

    // Optimiste
    const optimistic = { id: `tmp-${Date.now()}`, sender_id: 'admin_system', receiver_id: selectedChat.id, content, created_at: new Date().toISOString() };
    setChatMessages(prev => [...prev, optimistic]);

    try {
      const body: Record<string, unknown> = {
        sender_id: 'admin_system',
        receiver_id: selectedChat.id,
        content,
        type: 'private',
      };
      if (files.length > 0) {
        body.attachments = await filesToEmailAttachments(files);
      }
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
    if (!htmlToPlainText(content).trim()) return;
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
      if (broadcastType === 'class' && selectedClasses.length === 0) {
        alert('Veuillez sélectionner au moins une classe.');
        setLoading(false);
        return;
      }

      if (title) body.title = title;
      if (broadcastType === 'private') body.receiver_id = selectedStudent;
      if (broadcastType === 'class') {
        body.target_class_ids = selectedClasses;
      }
      if (broadcastType === 'global') {
        body.format = formatFilter;
      }
      if (attachments.length > 0) {
        body.attachments = await filesToEmailAttachments(attachments);
      }

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const payload = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccess(true);
        setContent(""); setTitle(""); setAttachments([]); setSelectedStudent(""); setSelectedClasses([]); setFormatFilter("all");
        setTimeout(() => setSuccess(false), 4000);
        fetchConversations();
        if (payload.emailWarning) {
          alert(payload.emailWarning);
        } else if (typeof payload.emailsQueued === 'number') {
          alert(`Message enregistré. ${payload.emailsQueued} e-mail(s) en cours d'envoi aux familles.`);
        }
      } else {
        alert(`Erreur : ${payload.error || 'Impossible d\'envoyer'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau pendant l'envoi. Vérifie l'historique avant de renvoyer, le message a peut-être déjà été pris en compte.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden text-ishes-dark">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0 z-10 sticky top-0 gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="w-10 lg:hidden shrink-0" /> {/* Spacer for menu button */}
            <h1 className="text-lg md:text-2xl ishes-heading text-ishes-blue font-black uppercase tracking-tight truncate">Communication</h1>
          </div>
          <div className="flex p-1 bg-gray-100 rounded-2xl shrink-0">
            <button onClick={() => { setActiveTab("inbox"); fetchConversations(); }} className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "inbox" ? 'bg-white text-ishes-dark shadow-sm' : 'text-gray-400'}`}>
              <Inbox className="w-4 h-4 hidden sm:block" /> Inbox
            </button>
            <button onClick={() => setActiveTab("send")} className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "send" ? 'bg-white text-ishes-dark shadow-sm' : 'text-gray-400'}`}>
              <Send className="w-4 h-4 hidden sm:block" /> Envoi
            </button>
            <button onClick={() => setActiveTab("history")} className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "history" ? 'bg-white text-ishes-dark shadow-sm' : 'text-gray-400'}`}>
              <History className="w-4 h-4 hidden sm:block" /> Historique
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {activeTab === "inbox" ? (
            <div className="flex-1 flex overflow-hidden">
              {/* Liste conversations */}
              <div className={cn("w-full lg:w-80 border-r border-gray-100 bg-white flex flex-col shrink-0 transition-all duration-300", selectedChat && "hidden lg:flex")}>
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
              <div className={cn("flex-1 bg-gray-50/30 flex flex-col overflow-hidden transition-all duration-300", !selectedChat && "hidden lg:flex")}>
                {selectedChat ? (
                  <>
                    <div className="p-4 md:p-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <button 
                          onClick={() => setSelectedChat(null)}
                          className="lg:hidden p-1.5 md:p-2 -ml-1 md:-ml-2 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-100 hover:bg-gray-50 text-ishes-blue shrink-0"
                        >
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
                        </button>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#086b51] text-white rounded-lg md:rounded-xl flex items-center justify-center font-black text-xs md:text-sm shrink-0">
                          {(selectedChat.first_name?.[0] || selectedChat.email?.[0] || '?').toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs md:text-sm font-black text-ishes-blue uppercase tracking-tight truncate">
                            {[selectedChat.first_name, selectedChat.last_name].filter(Boolean).join(' ') || selectedChat.email || "Utilisateur sans nom"}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                            <span className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">Élève ISHES</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDeleteChatHistory}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 h-auto rounded-full shrink-0"
                        title="Supprimer l'historique"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
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
                                  {looksLikeHtml(msg.content) ? (
                                    <div className="[&_a]:underline" dangerouslySetInnerHTML={{ __html: msg.content }} />
                                  ) : msg.content}
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

                    <div className="p-4 bg-white border-t border-gray-100 shrink-0 space-y-2">
                      {replyAttachments.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {replyAttachments.map((file, index) => (
                            <span key={`${file.name}-${index}`} className="inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-600">
                              <Paperclip className="w-3 h-3 shrink-0 text-[#086b51]" />
                              <span className="truncate">{file.name}</span>
                              <button type="button" title="Retirer" onClick={() => setReplyAttachments(replyAttachments.filter((_, i) => i !== index))} className="p-0.5 rounded-full hover:bg-gray-200 text-gray-400">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-2xl px-4 py-2 flex items-center gap-3 border border-gray-100 focus-within:border-[#086b51]/30 focus-within:ring-2 focus-within:ring-[#086b51]/10 transition-all">
                        <input
                          ref={replyFileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx,.csv"
                          className="hidden"
                          onChange={(e) => {
                            const list = e.target.files;
                            if (!list) return;
                            const next = [...replyAttachments];
                            for (const file of Array.from(list)) {
                              if (next.length >= 3) break;
                              if (file.size > 5 * 1024 * 1024) {
                                alert(`« ${file.name} » dépasse 5 Mo.`);
                                continue;
                              }
                              next.push(file);
                            }
                            setReplyAttachments(next);
                            e.target.value = "";
                          }}
                        />
                        <button
                          type="button"
                          title="Joindre un fichier"
                          onClick={() => replyFileInputRef.current?.click()}
                          className="w-9 h-9 rounded-xl text-[#086b51] bg-white border border-gray-100 flex items-center justify-center hover:bg-emerald-50 shrink-0"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
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
                          disabled={replySending || (!replyContent.trim() && replyAttachments.length === 0)}
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
          ) : activeTab === "history" ? (
            <EmailHistory />
          ) : (
            /* Nouvel Envoi */
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">
              <div className="max-w-3xl mx-auto mb-6">
                <ClerkInviteRelaunch />
              </div>
              <div className="max-w-3xl mx-auto bg-white rounded-3xl md:rounded-[3rem] border border-gray-100 p-6 md:p-12 shadow-sm space-y-8 md:space-y-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#086b51]" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#086b51]">Nouveau Message</h3>
                </div>

                {/* Type d'envoi */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
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

                {broadcastType === 'global' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Filtre par Format</label>
                    <select value={formatFilter} onChange={(e) => setFormatFilter(e.target.value as any)} className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold">
                      <option value="all">Tous les élèves (Présentiel & Distanciel)</option>
                      <option value="presentiel">Uniquement les élèves en Présentiel</option>
                      <option value="distanciel">Uniquement les élèves en Distanciel</option>
                    </select>
                  </div>
                )}

                {broadcastType === 'class' && (
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sélectionnez vos classes</label>
                    
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-4">
                      {/* Filtres */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="text" 
                            placeholder="Rechercher une classe..." 
                            value={classSearch}
                            onChange={(e) => setClassSearch(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-[#086b51]/20 transition-all" 
                          />
                        </div>
                        <div className="flex bg-white border border-gray-200 rounded-xl p-1 shrink-0">
                           <button 
                             onClick={() => setClassFilterFormat("all")}
                             className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${classFilterFormat === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                           >Tous</button>
                           <button 
                             onClick={() => setClassFilterFormat("presentiel")}
                             className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${classFilterFormat === 'presentiel' ? 'bg-[#086b51] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                           >Présentiel</button>
                           <button 
                             onClick={() => setClassFilterFormat("distanciel")}
                             className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${classFilterFormat === 'distanciel' ? 'bg-[#086b51] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                           >Distanciel</button>
                        </div>
                      </div>

                      {/* Liste des classes avec checkboxes */}
                      <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                        {classes
                          .filter(c => classFilterFormat === 'all' || c.type === classFilterFormat)
                          .filter(c => c.name?.toLowerCase().includes(classSearch.toLowerCase()))
                          .map(c => (
                            <label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedClasses.includes(c.id) ? 'border-[#086b51] bg-emerald-50/30' : 'border-gray-200 bg-white hover:border-[#086b51]/30'}`}>
                               <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${selectedClasses.includes(c.id) ? 'bg-[#086b51] border-[#086b51]' : 'border-gray-300 bg-white'}`}>
                                 {selectedClasses.includes(c.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                               </div>
                               <input 
                                 type="checkbox" 
                                 className="hidden" 
                                 checked={selectedClasses.includes(c.id)}
                                 onChange={(e) => {
                                   if (e.target.checked) setSelectedClasses([...selectedClasses, c.id]);
                                   else setSelectedClasses(selectedClasses.filter(id => id !== c.id));
                                 }}
                               />
                               <div>
                                 <div className="text-sm font-bold text-gray-900">{c.name}</div>
                                 <div className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">{c.type === 'presentiel' ? '🏢 Présentiel' : '💻 Distanciel'}</div>
                               </div>
                            </label>
                        ))}
                        {classes.filter(c => classFilterFormat === 'all' || c.type === classFilterFormat).filter(c => c.name?.toLowerCase().includes(classSearch.toLowerCase())).length === 0 && (
                          <div className="text-center p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Aucune classe trouvée
                          </div>
                        )}
                      </div>
                      
                      {selectedClasses.length > 0 && (
                         <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                           <span className="text-[10px] font-bold text-[#086b51] uppercase tracking-widest">
                             {selectedClasses.length} classe{selectedClasses.length > 1 ? 's' : ''} · {classes.filter((c) => selectedClasses.includes(c.id)).reduce((n, c) => n + (c.students?.length || 0), 0)} élève{(classes.filter((c) => selectedClasses.includes(c.id)).reduce((n, c) => n + (c.students?.length || 0), 0)) > 1 ? 's' : ''}
                           </span>
                           <button onClick={() => setSelectedClasses([])} className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors">Tout désélectionner</button>
                         </div>
                      )}
                    </div>
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

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Titre du message</label>
                  <EmailSubjectAutocomplete
                    value={title}
                    onChange={setTitle}
                    inputClassName="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#086b51]/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contenu du message</label>
                  <EmailComposer
                    value={content}
                    onChange={setContent}
                    attachments={attachments}
                    onAttachmentsChange={setAttachments}
                    placeholder="Écrivez votre message. Utilisez gras, italique, titre centré, couleurs et le bouton Joindre pour une pièce jointe."
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  {success && (
                    <div className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Message envoyé et archivé !
                    </div>
                  )}
                  <div className="flex-1" />
                  <Button
                    onClick={handleSendBroadcast}
                    disabled={loading || !htmlToPlainText(content).trim()}
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
