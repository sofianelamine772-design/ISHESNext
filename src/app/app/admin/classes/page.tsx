"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, Monitor, School, Search, MoreVertical, Plus, ChevronRight, CreditCard, FileText, Loader2, X, Mail, Phone, Calendar, GraduationCap, AlertCircle, History, Trash2, CheckCircle2, Terminal, MessageSquare, ExternalLink, Save } from "lucide-react";
import { fetchClassesAction, fetchStudentByIdAction, createClassAction, fetchFormationsAction, fetchStudentsWaitingAssignmentAction, assignStudentToClassAction, updateClassWhatsappAction, createStudentManualAction } from "@/app/actions/students";
import { LogoutButton } from "@/components/LogoutButton";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn, getCurrentAcademicYear, getNextAcademicYear } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

// Types
type Student = { id: string; name: string; email: string; avatar: string; dateJoined: string };
type ClassDetails = { id: string; name: string; type: "distanciel" | "presentiel"; students: Student[]; formationTitle?: string; capacity_limit: number; whatsappLink?: string | null };

export default function AdminDashboard() {
  const [classes, setClasses] = useState<ClassDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showAddStudentManualModal, setShowAddStudentManualModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    parent_first_name: "",
    parent_last_name: "",
    address: "",
    payment_status: "en_attente",
    payment_method: "virement",
    amount_paid: "150"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [classSearchQuery, setClassSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [studentDetail, setStudentDetail] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>(getCurrentAcademicYear());
  const [selectedClassType, setSelectedClassType] = useState<string>("tout");

  // New states for modals
  const [showNewClassModal, setShowNewClassModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [formations, setFormations] = useState<any[]>([]);
  const [waitingStudents, setWaitingStudents] = useState<any[]>([]);
  const [newClassData, setNewClassData] = useState({ name: "", type: "distanciel" as "distanciel" | "presentiel", formation_id: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WhatsApp State
  const [whatsappInput, setWhatsappInput] = useState("");
  const [savingWhatsapp, setSavingWhatsapp] = useState(false);
  const [whatsappSaved, setWhatsappSaved] = useState(false);

  // Transfer State
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [studentToTransfer, setStudentToTransfer] = useState<{ id: string, name: string } | null>(null);
  const [targetClassId, setTargetClassId] = useState<string>("");

  // Contact Class State
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleSendClassEmail = async () => {
    if (!selectedClassId || !contactMessage.trim()) return;
    setContactSending(true);
    setContactSuccess(false);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: "admin_system",
          content: contactMessage.trim(),
          type: "class",
          title: contactSubject.trim() || undefined,
          target_class_id: selectedClassId,
        }),
      });

      if (res.ok) {
        setContactSuccess(true);
        setContactMessage("");
        setContactSubject("");
        setTimeout(() => setShowContactModal(false), 2000);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Erreur : ${err.error || "Impossible d'envoyer"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de l'envoi.");
    } finally {
      setContactSending(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      parent_first_name: "",
      parent_last_name: "",
      address: "",
      payment_status: "en_attente",
      payment_method: "virement",
      amount_paid: "150"
    });
  };

  const handleCreateStudentManual = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !selectedClassId) return;
    setIsSubmitting(true);
    try {
      // 1. On crée le dossier élève manuellement
      const result = await createStudentManualAction(formData);
      if (result.success && result.data) {
        // 2. On l'affecte directement à la classe sélectionnée
        const assignResult = await assignStudentToClassAction(result.data.id, selectedClassId);
        if (assignResult.success) {
          setShowAddStudentManualModal(false);
          resetForm();
          // 3. On rafraîchit les classes pour afficher le nouvel élève
          await fetchClasses();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const result = await fetchClassesAction(selectedYear);
      if (result.success && result.data) {
        setClasses(result.data);
        if (result.data.length > 0 && !selectedClassId) setSelectedClassId(result.data[0].id);
        // Sync the WhatsApp input with the first class or keep current
        const currentClass = result.data.find((c: ClassDetails) => c.id === selectedClassId);
        if (currentClass) setWhatsappInput(currentClass.whatsappLink || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [selectedYear]);

  const handleCreateClass = async () => {
    if (!newClassData.name || !newClassData.formation_id) return;
    setIsSubmitting(true);
    try {
      const result = await createClassAction(newClassData);
      if (result.success) {
        setShowNewClassModal(false);
        setNewClassData({ name: "", type: "distanciel", formation_id: "" });
        await fetchClasses();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddStudentModal = async () => {
    setShowAddStudentModal(true);
    try {
      const result = await fetchStudentsWaitingAssignmentAction();
      if (result.success && result.data) {
        setWaitingStudents(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStudentToClass = async (studentId: string) => {
    if (!selectedClassId) return;
    setIsSubmitting(true);
    try {
      const result = await assignStudentToClassAction(studentId, selectedClassId);
      if (result.success) {
        await fetchClasses();
        // Refresh waiting students list
        const updatedWaiting = await fetchStudentsWaitingAssignmentAction();
        if (updatedWaiting.success && updatedWaiting.data) {
          setWaitingStudents(updatedWaiting.data);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openNewClassModal = async () => {
    setShowNewClassModal(true);
    try {
      const result = await fetchFormationsAction();
      if (result.success && result.data) {
        setFormations(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveWhatsapp = async () => {
    if (!selectedClass) return;
    setSavingWhatsapp(true);
    setWhatsappSaved(false);
    try {
      const result = await updateClassWhatsappAction(selectedClass.id, whatsappInput);
      if (result.success) {
        setWhatsappSaved(true);
        // Update local state
        setClasses(prev => prev.map(c => c.id === selectedClass.id ? { ...c, whatsappLink: whatsappInput || null } : c));
        setTimeout(() => setWhatsappSaved(false), 3000);

        // Envoyer un message automatique à toute la classe
        if (whatsappInput) {
          const fullLink = whatsappInput.startsWith('http') ? whatsappInput : `https://chat.whatsapp.com/${whatsappInput}`;
          
          await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sender_id: 'admin_system',
              type: 'class',
              target_class_ids: [selectedClass.id],
              title: "Nouveau lien WhatsApp pour votre classe",
              content: `As-salâmu 'alaykum,\n\nLe lien d'accès au groupe WhatsApp de votre classe a été mis à jour :\n\n${fullLink}\n\nMerci de le rejoindre dès que possible pour ne manquer aucune information importante.`
            })
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingWhatsapp(false);
    }
  };

  const handleTransferStudent = async () => {
    if (!studentToTransfer || !targetClassId) return;
    setIsSubmitting(true);
    try {
      const result = await assignStudentToClassAction(studentToTransfer.id, targetClassId);
      if (result.success) {
        setShowTransferModal(false);
        setStudentToTransfer(null);
        setTargetClassId("");
        await fetchClasses();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openStudentDetail = async (id: string) => {
    setSelectedStudentId(id);
    setLoadingDetail(true);
    try {
      const result = await fetchStudentByIdAction(id);
      if (result.success) {
        setStudentDetail(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const distancielClasses = classes.filter((c) => c.type === "distanciel");
  const presentielClasses = classes.filter((c) => c.type === "presentiel");

  // Sync whatsapp input when selected class changes
  const selectedClassWhatsapp = classes.find(c => c.id === selectedClassId)?.whatsappLink ?? "";
  useEffect(() => {
    setWhatsappInput(selectedClassWhatsapp || "");
    setWhatsappSaved(false);
  }, [selectedClassId]);

  const filteredDistancielClasses = distancielClasses.filter(c =>
    (c.name + (c.formationTitle || '')).toLowerCase().includes(classSearchQuery.toLowerCase())
  );

  const filteredPresentielClasses = presentielClasses.filter(c =>
    (c.name + (c.formationTitle || '')).toLowerCase().includes(classSearchQuery.toLowerCase())
  );

  const selectedClass = classes.find((c) => c.id === selectedClassId);

  // Filter students based on search
  const filteredStudents = selectedClass?.students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" /> {/* Spacer for menu button */}
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Formations & Classes</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Button variant="ishes-green" size="sm" className="h-10 px-4 md:px-6" onClick={openNewClassModal}>
              <Plus className="w-4 h-4 mr-1" /> <span className="hidden md:inline">Nouvelle Classe</span>
              <span className="md:hidden">Nouv.</span>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 md:w-10 md:h-10 border-2 border-ishes-green p-[2px]"
                }
              }}
            />
          </div>
        </header>

        {/* Dashboard Content - 2 Column Layout */}
        <div className="flex-1 overflow-hidden flex relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-ishes-green animate-spin mb-4" />
              <p className="ishes-label animate-pulse">Chargement des classes...</p>
            </div>
          )}

          {/* Left Pane - Classes List */}
          <div className={cn(
            "w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 relative z-0 transition-all duration-300",
            selectedClassId && "hidden lg:flex"
          )}>
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={classSearchQuery || ""}
                  onChange={(e) => setClassSearchQuery(e.target.value)}
                  placeholder="Rechercher une classe..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ishes-green/50 focus:border-ishes-green transition-all"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-1/2 bg-white border border-gray-200 rounded-lg px-2 py-2.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ishes-green/50 focus:border-ishes-green font-semibold text-gray-700"
                >
                  <option value={getCurrentAcademicYear()}>Année Scolaire {getCurrentAcademicYear()}</option>
                  <option value={getNextAcademicYear()}>Année Scolaire {getNextAcademicYear()}</option>
                </select>
                <select 
                  value={selectedClassType} 
                  onChange={(e) => setSelectedClassType(e.target.value)}
                  className="w-1/2 bg-white border border-gray-200 rounded-lg px-2 py-2.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ishes-green/50 focus:border-ishes-green font-semibold text-gray-700"
                >
                  <option value="tout">Tous types</option>
                  <option value="presentiel">Présentiel</option>
                  <option value="distanciel">Distanciel</option>
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
              {/* Distanciel Section -> Formations */}
              {(selectedClassType === "tout" || selectedClassType === "distanciel") && (
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-ishes-dark" />
                  </div>
                  <h3 className="ishes-label text-ishes-dark text-[10px] md:text-xs">Formations (Distanciel)</h3>
                  <span className="ml-auto bg-gray-100 text-ishes-dark text-[10px] font-black italic px-2 py-0.5 rounded-full">
                    {filteredDistancielClasses.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {filteredDistancielClasses.map((c) => {
                    const n = (c.formationTitle || c.name).toLowerCase();
                    const isAdult = !(n.includes('enfant') || n.includes('junior') || n.includes('tarbiya') || n.includes('prépa') || n.includes('élémentaire'));

                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedClassId(c.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all border ${
                          selectedClassId === c.id
                            ? (isAdult ? "bg-ishes-green/10 border-ishes-green/20 shadow-sm" : "bg-gray-100 border-gray-300 shadow-sm")
                            : (isAdult ? "bg-ishes-green/5 border-ishes-green/10 hover:bg-ishes-green/10 hover:border-ishes-green/20" : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50")
                          }`}
                      >
                      <div className="font-semibold text-gray-800 mb-1 text-sm">{c.formationTitle || c.name}</div>
                      <div className="flex items-center text-[10px] text-gray-500 gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {c.students.length} élèves inscrits
                      </div>
                    </button>
                    );
                  })}
                </div>
              </div>
              )}

              {/* Présentiel Section -> Classes */}
              {(selectedClassType === "tout" || selectedClassType === "presentiel") && (
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-8 h-8 rounded-lg bg-ishes-green/10 flex items-center justify-center">
                    <School className="w-4 h-4 text-ishes-green" />
                  </div>
                  <h3 className="ishes-label text-[10px] md:text-xs">Classes (Présentiel)</h3>
                  <span className="ml-auto bg-ishes-green text-white text-[10px] font-black italic px-2 py-0.5 rounded-full">
                    {filteredPresentielClasses.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {filteredPresentielClasses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClassId(c.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all border ${selectedClassId === c.id
                        ? "bg-ishes-green/10 border-ishes-green/20 shadow-sm"
                        : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      <div className="font-semibold text-gray-800 mb-1 text-sm">{c.name}</div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 gap-1.5">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> {c.students.length} inscrits
                        </div>
                        <div className="font-black italic text-ishes-green">
                          {c.students.length}/{c.capacity_limit}
                        </div>
                      </div>
                      {/* Capacity Bar */}
                      <div className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-500",
                            (c.students.length / c.capacity_limit) > 0.9 ? "bg-red-500" : "bg-ishes-green"
                          )}
                          style={{ width: `${Math.min(100, (c.students.length / c.capacity_limit) * 100)}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Right Pane - Students Details */}
          <div className={cn(
            "flex-1 bg-gray-50/50 flex flex-col p-4 md:p-6 overflow-hidden transition-all duration-300 relative",
            !selectedClassId && "hidden lg:flex"
          )}>
            {selectedClass ? (
              <div className="h-full flex flex-col overflow-hidden">
                {/* Class Header */}
                <div className="pb-6 md:pb-8 mb-4 border-b border-gray-100">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-6 md:mb-8 gap-6">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform shrink-0 ${selectedClass.type === 'distanciel' ? 'bg-ishes-dark text-white shadow-ishes-dark/20' : 'bg-ishes-green text-white shadow-ishes-green/20'}`}>
                        {selectedClass.type === 'distanciel' ? <Monitor className="w-6 h-6 md:w-7 md:h-7" /> : <School className="w-6 h-6 md:w-7 md:h-7" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="ishes-label mb-1 block text-[10px]">Gestion de classe</span>
                        <h2 className="text-xl md:text-2xl xl:text-3xl ishes-heading text-ishes-dark leading-snug break-words">{selectedClass.name}</h2>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <span className={`text-[8px] md:text-[10px] font-black uppercase italic px-2 py-0.5 rounded flex items-center gap-1.5 ${selectedClass.type === 'distanciel' ? 'bg-gray-100 text-gray-600' : 'bg-ishes-green-hover text-white'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedClass.type === 'distanciel' ? 'bg-gray-400' : 'bg-white'}`}></span>
                            Mode {selectedClass.type}
                          </span>
                          <span className="text-[10px] font-black text-ishes-dark italic bg-white border border-gray-100 px-2 py-0.5 rounded shadow-sm">
                            Capacité : {selectedClass.students.length} / {selectedClass.capacity_limit}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 md:flex-none h-10 text-[10px] md:text-xs border-amber-600 text-amber-600 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-1.5"
                        onClick={() => {
                          setContactSuccess(false);
                          setShowContactModal(true);
                        }}
                      >
                        <Mail className="w-4 h-4" /> <span>Contacter la classe</span>
                      </Button>
                      <Button variant="ishes-outline" size="sm" className="flex-1 md:flex-none h-10 text-[10px] md:text-xs" onClick={openAddStudentModal}>
                        <Users className="w-4 h-4 md:mr-1" /> <span className="hidden sm:inline">Affecter Élève</span>
                        <span className="sm:hidden text-[10px]">Affecter</span>
                      </Button>
                      <Button variant="ishes-green" size="sm" className="flex-1 md:flex-none h-10 text-[10px] md:text-xs" onClick={() => setShowAddStudentManualModal(true)}>
                        <Plus className="w-4 h-4 md:mr-1" /> <span className="hidden sm:inline">Créer Élève</span>
                        <span className="sm:hidden text-[10px]">Créer</span>
                      </Button>
                    </div>
                  </div>

                  {/* WhatsApp Group Link Editor – Présentiel only */}
                  {selectedClass.type === 'presentiel' && (
                    <div className="mb-6 p-4 bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                        <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Groupe WhatsApp de la classe</span>
                        {selectedClass.whatsappLink && (
                          <a href={selectedClass.whatsappLink} target="_blank" rel="noopener noreferrer"
                            className="ml-auto text-[10px] font-bold text-[#25D366] hover:underline flex items-center gap-1">
                            Voir le groupe <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={whatsappInput !== "" ? whatsappInput : (selectedClassWhatsapp || "")}
                          onChange={(e) => setWhatsappInput(e.target.value)}
                          onFocus={(e) => { if (!whatsappInput) setWhatsappInput(selectedClassWhatsapp || ""); }}
                          placeholder="https://chat.whatsapp.com/..."
                          className="flex-1 px-3 py-2.5 bg-white border border-[#25D366]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] font-mono transition-all"
                        />
                        <button
                          onClick={handleSaveWhatsapp}
                          disabled={savingWhatsapp}
                          className={cn(
                            "px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all",
                            whatsappSaved
                              ? "bg-[#25D366] text-white"
                              : "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                          )}
                        >
                          {savingWhatsapp ? <Loader2 className="w-4 h-4 animate-spin" /> : whatsappSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                          {whatsappSaved ? "Sauvegardé" : "Enregistrer"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Search within class */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un élève..."
                        className="w-full bg-white border border-gray-100 rounded-full pl-12 pr-6 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-4 focus:ring-ishes-green/5 shadow-sm transition-all font-medium"
                      />
                    </div>
                    <div className="ishes-label flex flex-col items-end shrink-0">
                      <span className="text-[10px] text-gray-400">Total</span>
                      <span className="text-ishes-dark text-base md:text-lg font-black italic leading-none">{filteredStudents?.length}</span>
                    </div>
                  </div>
                </div>

                {/* Students List */}
                <div className="flex-1 overflow-y-auto pt-2 md:pt-4 space-y-4 custom-scrollbar">
                  {filteredStudents && filteredStudents.length > 0 ? (
                    <div className="grid gap-3 md:gap-4">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.id}
                          onClick={() => openStudentDetail(student.id)}
                          className="group bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-0.5 transition-all flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-3 md:gap-5 min-w-0">
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-ishes-dark flex items-center justify-center font-black italic text-white text-sm md:text-lg shadow-lg shadow-ishes-dark/10 shrink-0">
                              {student.avatar}
                            </div>
                            <div className="min-w-0">
                              <span className="ishes-label text-[8px] md:text-[9px] mb-0.5 block opacity-50">Étudiant</span>
                              <div className="text-sm md:text-lg ishes-heading text-ishes-dark leading-tight truncate">{student.name}</div>
                              <div className="text-[10px] font-medium text-ishes-dark/40 tracking-wider font-mono truncate hidden sm:block">{student.email.toUpperCase()}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 md:gap-8 shrink-0">
                            <div className="text-right hidden md:block">
                              <div className="ishes-label text-[9px] mb-0.5 opacity-40">Inscription</div>
                              <div className="font-black italic text-ishes-dark text-sm">{student.dateJoined.toUpperCase()}</div>
                            </div>
                            <div className="flex items-center gap-2">

                              <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-gray-50 text-gray-300 group-hover:bg-ishes-green group-hover:text-white rounded-full transition-all">
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                      <Users className="w-12 h-12 mb-4 text-gray-300" />
                      <p className="font-semibold text-gray-600">Aucun élève trouvé</p>
                      <p className="text-sm">Essayez de modifier votre recherche</p>
                    </div>
                  )}
                </div>

                {/* Mobile Back Button */}
                <button
                  onClick={() => setSelectedClassId(null)}
                  className="lg:hidden absolute top-6 right-6 w-10 h-10 bg-ishes-dark text-white rounded-full flex items-center justify-center shadow-xl z-20 active:scale-90 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-sm border border-gray-100 text-center p-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune classe sélectionnée</h3>
                <p className="text-gray-500 text-xs md:text-sm max-w-xs md:max-w-sm">Sélectionnez une classe dans le menu de gauche pour afficher la liste de ses élèves.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Slide-Over Detail Panel */}
      {selectedStudentId && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => {
              setSelectedStudentId(null);
              setStudentDetail(null);
            }}
          />
          {/* Slide-Over Drawer */}
          <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 transform flex flex-col transition-transform duration-300 ease-in-out border-l border-gray-200">
            {loadingDetail ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-ishes-green animate-spin mb-4" />
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Récupération du dossier...</p>
              </div>
            ) : studentDetail && (
              <>
                {/* Drawer Header */}
                <div className="bg-white border-b border-gray-100 text-ishes-dark p-8 relative overflow-hidden">
                  {/* Decorative Background Element */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-gray-50 blur-[80px] rounded-full" />

                  <div className="relative z-10">

                    <div className="flex items-end gap-6">
                      <div className="w-24 h-24 rounded-[2rem] bg-white p-1 shadow-xl shadow-black/5 border border-gray-100">
                        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-[1.8rem] flex items-center justify-center font-black text-3xl text-ishes-dark">
                          {(studentDetail.first_name?.[0] || '') + (studentDetail.last_name?.[0] || '')}
                        </div>
                      </div>
                      <div className="flex-1 pb-2">
                        <h2 className="text-3xl font-black text-ishes-dark tracking-tight mb-1">{studentDetail.first_name} {studentDetail.last_name}</h2>
                        <p className="text-ishes-dark/70 text-[10px] font-bold uppercase tracking-widest italic">Membre depuis le {new Date(studentDetail.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <Link href={`/app/admin/etudiants?id=${selectedStudentId}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-white border border-gray-200 text-ishes-dark hover:bg-gray-50 rounded-xl font-bold text-[10px] uppercase tracking-widest h-11">
                          Accéder au Profil
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <button onClick={() => { setSelectedStudentId(null); setStudentDetail(null); }} className="absolute top-4 right-4 p-2 hover:bg-ishes-dark/10 rounded-full transition-colors z-20">
                    <X className="w-5 h-5 text-ishes-dark/45" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 custom-scrollbar">
                  {/* Parent Information if exists */}
                  {(studentDetail.parent_first_name || studentDetail.parent_last_name) && (
                    <div className="bg-ishes-green/5 rounded-2xl p-5 border border-ishes-green/10 space-y-4">
                      <h3 className="text-[10px] font-black text-ishes-green uppercase tracking-widest">Responsable Légal</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-ishes-green/10">
                          <Users className="w-4 h-4 text-ishes-green" />
                        </div>
                        <span className="text-sm font-bold text-ishes-dark italic">{studentDetail.parent_first_name} {studentDetail.parent_last_name}</span>
                      </div>
                    </div>
                  )}

                  {/* Contact Details */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coordonnées</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 font-mono">{studentDetail.phone || 'Non renseigné'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{studentDetail.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Courses Section */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Scolarité Actuelle
                    </h3>
                    <div className="space-y-3">
                      {studentDetail.inscriptions?.map((ins: any, idx: number) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                          <div>
                            <div className="text-xs font-black text-ishes-dark mb-1">{ins.formations?.title}</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{ins.classes?.name || 'Session en cours'}</div>
                          </div>
                          <span className="px-2 py-1 bg-ishes-green/10 text-ishes-green text-[9px] font-black uppercase rounded-lg">
                            {ins.status === 'actif' ? 'Validé' : 'En attente'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}


      {/* NEW CLASS MODAL */}
      {showNewClassModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 transform transition-all scale-100">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ishes-green/10 rounded-xl flex items-center justify-center text-ishes-green">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-ishes-dark tracking-tight">Nouvelle Classe</h3>
                </div>
                <button onClick={() => setShowNewClassModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nom de la classe</label>
                  <input
                    type="text"
                    placeholder="Ex: Session 2026-A"
                    value={newClassData.name}
                    onChange={(e) => setNewClassData({ ...newClassData, name: e.target.value })}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-ishes-green/5 focus:border-ishes-green transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Formation associée</label>
                  <select
                    value={newClassData.formation_id}
                    onChange={(e) => setNewClassData({ ...newClassData, formation_id: e.target.value })}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-ishes-green/5 focus:border-ishes-green transition-all font-medium text-sm appearance-none"
                  >
                    <option value="">Sélectionner une formation</option>
                    {formations.map(f => (
                      <option key={f.id} value={f.id}>{f.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mode d'enseignement</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setNewClassData({ ...newClassData, type: 'distanciel' })}
                      className={`py-3 rounded-2xl border-2 font-bold text-xs transition-all ${newClassData.type === 'distanciel' ? 'border-ishes-green bg-ishes-green/5 text-ishes-green shadow-lg shadow-ishes-green/10' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'}`}
                    >
                      🖥️ Distanciel
                    </button>
                    <button
                      onClick={() => setNewClassData({ ...newClassData, type: 'presentiel' })}
                      className={`py-3 rounded-2xl border-2 font-bold text-xs transition-all ${newClassData.type === 'presentiel' ? 'border-ishes-green bg-ishes-green/5 text-ishes-green shadow-lg shadow-ishes-green/10' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'}`}
                    >
                      🕌 Présentiel
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-3">
                <Button variant="ishes-outline" className="flex-1 h-12 rounded-2xl" onClick={() => setShowNewClassModal(false)}>Annuler</Button>
                <Button variant="ishes" className="flex-[2] h-12 rounded-2xl" disabled={isSubmitting} onClick={handleCreateClass}>
                  {isSubmitting ? "Création..." : "Créer la classe"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-black text-ishes-dark tracking-tight">Affecter des élèves</h3>
                <button onClick={() => setShowAddStudentModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs font-medium text-gray-400">Élèves en attente d'affectation pour cette session.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
              {waitingStudents.length > 0 ? (
                waitingStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-ishes-green/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-ishes-dark rounded-xl flex items-center justify-center text-white font-black italic text-xs">
                        {(student.first_name?.[0] || '') + (student.last_name?.[0] || '')}
                      </div>
                      <div>
                        <div className="font-bold text-ishes-dark text-sm">{student.first_name} {student.last_name}</div>
                        <div className="text-[10px] text-gray-400 font-mono uppercase">{student.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddStudentToClass(student.id)}
                      disabled={isSubmitting}
                      className="w-10 h-10 bg-white text-ishes-green border border-ishes-green/20 rounded-xl flex items-center justify-center hover:bg-ishes-green hover:text-white transition-all shadow-sm"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-gray-400">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-bold">Aucun élève en attente</p>
                  <p className="text-xs max-w-[200px] mx-auto mt-2 leading-relaxed italic">Tous les élèves inscrits ont déjà été affectés à une classe.</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100">
              <Button variant="ishes-outline" className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" onClick={() => setShowAddStudentModal(false)}>Fermer</Button>
            </div>
          </div>
        </div>
      )}

      {/* TRANSFER STUDENT MODAL */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ishes-green/10 rounded-xl flex items-center justify-center text-ishes-green">
                    <History className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-ishes-dark tracking-tight">Transférer l'élève</h3>
                </div>
                <button onClick={() => setShowTransferModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Élève sélectionné</p>
                <p className="text-sm font-bold text-ishes-dark italic">{studentToTransfer?.name}</p>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Choisir la nouvelle classe</label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {classes.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setTargetClassId(c.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${targetClassId === c.id ? 'border-ishes-green bg-ishes-green/5 shadow-lg shadow-ishes-green/10' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div>
                        <div className={`text-xs font-black uppercase tracking-tight ${targetClassId === c.id ? 'text-ishes-green' : 'text-ishes-dark'}`}>{c.name}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{c.formationTitle}</div>
                      </div>
                      {targetClassId === c.id && <CheckCircle2 className="w-4 h-4 text-ishes-green" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex gap-3">
                <Button variant="ishes-outline" className="flex-1 h-12 rounded-2xl" onClick={() => setShowTransferModal(false)}>Annuler</Button>
                <Button variant="ishes" className="flex-[2] h-12 rounded-2xl" disabled={isSubmitting || !targetClassId} onClick={handleTransferStudent}>
                  {isSubmitting ? "Transfert..." : "Confirmer le transfert"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL STUDENT REGISTRATION MODAL */}
      {showAddStudentManualModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-ishes-dark tracking-tight">Nouveau Dossier Élève</h3>
                <p className="text-xs font-medium text-gray-400 mt-1">Créez et inscrivez un élève directement dans cette classe.</p>
              </div>
              <button onClick={() => setShowAddStudentManualModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {/* Personal Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-ishes-green rounded-full"></div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ishes-green">Informations Personnelles</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prénom</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Omar"
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Diallo"
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="omar@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Téléphone</label>
                    <input 
                      type="tel" 
                      placeholder="06 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Legal Representative */}
              <div className="space-y-6 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-ishes-dark rounded-full"></div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ishes-dark">Responsable Légal (Optionnel)</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prénom du parent</label>
                    <input 
                      type="text" 
                      value={formData.parent_first_name}
                      onChange={(e) => setFormData({...formData, parent_first_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-dark transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom du parent</label>
                    <input 
                      type="text" 
                      value={formData.parent_last_name}
                      onChange={(e) => setFormData({...formData, parent_last_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-dark transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2 pt-4 border-t border-gray-50">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Adresse complète</label>
                <input 
                  type="text" 
                  placeholder="123 Rue de la Paix, Paris"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                />
              </div>

              {/* Règlement Manuel Section */}
              <div className="space-y-6 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                   <div className="w-1 h-4 bg-ishes-green rounded-full"></div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ishes-green">Statut du Règlement & Paiement</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Statut Financier</label>
                    <select
                      value={formData.payment_status}
                      onChange={(e) => setFormData({...formData, payment_status: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold appearance-none"
                    >
                      <option value="en_attente">En attente de paiement</option>
                      <option value="a_jour">Règlement Effectué (Payé)</option>
                    </select>
                  </div>

                  {formData.payment_status === 'a_jour' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Moyen de paiement</label>
                      <select
                        value={formData.payment_method}
                        onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold appearance-none"
                      >
                        <option value="virement">🏦 Virement bancaire</option>
                        <option value="liquide">💵 Espèces / Liquide</option>
                      </select>
                    </div>
                  )}
                </div>

                {formData.payment_status === 'a_jour' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Montant perçu (EUR)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 150"
                      value={formData.amount_paid}
                      onChange={(e) => setFormData({...formData, amount_paid: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
              <Button variant="ishes-outline" className="flex-1 h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" onClick={() => setShowAddStudentManualModal(false)}>Annuler</Button>
              <Button variant="ishes" className="flex-[2] h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" disabled={isSubmitting} onClick={handleCreateStudentManual}>
                {isSubmitting ? "Création..." : "Enregistrer et affecter"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT CLASS MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 transform transition-all scale-100">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-ishes-dark tracking-tight">Message à la classe</h3>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      Envoyé par e-mail à tous les élèves de la classe
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowContactModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedClass && (
                <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Classe destinataire</p>
                  <p className="text-sm font-bold text-ishes-dark">{selectedClass.name}</p>
                  <p className="text-[10px] text-gray-500 mt-1 italic">
                    💡 {selectedClass.students.length} élève{selectedClass.students.length > 1 ? 's' : ''} recevront cet e-mail.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Titre de l'e-mail / Objet</label>
                  <input
                    type="text"
                    placeholder="Ex: Rappel de cours / Changement de salle"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-ishes-green/5 focus:border-ishes-green transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contenu du message</label>
                  <textarea
                    rows={6}
                    placeholder="Saisissez votre message ici..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-ishes-green/5 focus:border-ishes-green transition-all font-medium text-sm resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                {contactSuccess && (
                  <div className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> E-mails envoyés avec succès !
                  </div>
                )}
                <div className="flex-1" />
                <div className="flex gap-3 shrink-0">
                  <Button variant="ishes-outline" className="h-12 rounded-2xl px-6" onClick={() => setShowContactModal(false)}>
                    Annuler
                  </Button>
                  <Button
                    variant="ishes"
                    className="h-12 rounded-2xl px-8 bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={contactSending || !contactMessage.trim()}
                    onClick={handleSendClassEmail}
                  >
                    {contactSending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Envoyer"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
