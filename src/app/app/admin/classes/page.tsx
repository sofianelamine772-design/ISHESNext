"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, Monitor, School, Search, MoreVertical, Plus, ChevronRight, CreditCard, FileText, Loader2, X, Mail, Phone, Calendar, GraduationCap, AlertCircle, History, Download, Trash2, CheckCircle2, Terminal } from "lucide-react";
import { fetchClassesAction, fetchStudentByIdAction, createClassAction, fetchFormationsAction, fetchStudentsWaitingAssignmentAction, assignStudentToClassAction } from "@/app/actions/students";
import { LogoutButton } from "@/components/LogoutButton";

// Types
type Student = { id: string; name: string; email: string; avatar: string; dateJoined: string };
type ClassDetails = { id: string; name: string; type: "distanciel" | "presentiel"; students: Student[]; formationTitle?: string };

export default function AdminDashboard() {
  const [classes, setClasses] = useState<ClassDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [classSearchQuery, setClassSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [studentDetail, setStudentDetail] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // New states for modals
  const [showNewClassModal, setShowNewClassModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [formations, setFormations] = useState<any[]>([]);
  const [waitingStudents, setWaitingStudents] = useState<any[]>([]);
  const [newClassData, setNewClassData] = useState({ name: "", type: "distanciel" as "distanciel" | "presentiel", formation_id: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Transfer State
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [studentToTransfer, setStudentToTransfer] = useState<{id: string, name: string} | null>(null);
  const [targetClassId, setTargetClassId] = useState<string>("");

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const result = await fetchClassesAction();
      if (result.success && result.data) {
        setClasses(result.data);
        if (result.data.length > 0 && !selectedClassId) setSelectedClassId(result.data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

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

  const handleExportPDF = () => {
    if (!selectedClass) return;
    window.print(); // Simple and effective for now, optimized by CSS @media print
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
      {/* Sidebar - Admin */}
      <aside className="w-64 bg-[#152233] text-white flex flex-col flex-shrink-0 h-full">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/app" className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tight text-white">
              ISHEECOLE <span className="text-ishes-green text-sm not-italic align-top">PRO</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <Link href="/app/admin" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Vue d'ensemble
          </Link>
          <Link href="/app/admin/classes" className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold transition-colors">
            <BookOpen className="w-4 h-4 text-ishes-green" /> Formations & Classes
          </Link>
          <Link href="/app/admin/etudiants" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <Users className="w-4 h-4" /> Tous les Étudiants
          </Link>
          <Link href="/app/admin/facturation" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <CreditCard className="w-4 h-4" /> Facturation
          </Link>
          <Link href="/app/admin/administratif" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <FileText className="w-4 h-4" /> Administratif
          </Link>
          <Link href="/app/admin/developpeur" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <Terminal className="w-4 h-4" /> Développeur
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl ishes-heading text-ishes-dark">Formations & Classes</h1>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ishes" size="sm" className="h-10" onClick={openNewClassModal}>
              <Plus className="w-4 h-4 mr-1" /> Nouvelle Classe
            </Button>
            <div className="w-10 h-10 rounded-full border-2 border-ishes-green p-[2px] bg-white cursor-pointer shadow-lg shadow-ishes-green/10">
              <div className="w-full h-full bg-gray-50 rounded-full flex items-center justify-center font-black italic text-ishes-dark text-sm">
                AD
              </div>
            </div>
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
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 relative z-0">
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
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
              {/* Distanciel Section -> Formations */}
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-ishes-dark" />
                  </div>
                  <h3 className="ishes-label text-ishes-dark">Formations (Distanciel)</h3>
                  <span className="ml-auto bg-gray-100 text-ishes-dark text-[10px] font-black italic px-2 py-0.5 rounded-full">
                    {filteredDistancielClasses.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {filteredDistancielClasses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClassId(c.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all border ${selectedClassId === c.id
                        ? "bg-gray-100 border-gray-300 shadow-sm"
                        : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      <div className="font-semibold text-gray-800 mb-1">{c.formationTitle || c.name}</div>
                      <div className="flex items-center text-xs text-gray-500 gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {c.students.length} élèves inscrits
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Présentiel Section -> Classes */}
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-8 h-8 rounded-lg bg-ishes-green/10 flex items-center justify-center">
                    <School className="w-4 h-4 text-ishes-green" />
                  </div>
                  <h3 className="ishes-label">Classes (Présentiel)</h3>
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
                      <div className="font-semibold text-gray-800 mb-1">{c.name}</div>
                      <div className="flex items-center text-xs text-gray-500 gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {c.students.length} élèves inscrits
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane - Students Details */}
          <div className="flex-1 bg-gray-50/50 flex flex-col p-6 overflow-hidden">
            {selectedClass ? (
              <div className="h-full flex flex-col overflow-hidden">
                {/* Class Header */}
                <div className="pb-8 mb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${selectedClass.type === 'distanciel' ? 'bg-ishes-dark text-white shadow-ishes-dark/20' : 'bg-ishes-green text-white shadow-ishes-green/20'}`}>
                        {selectedClass.type === 'distanciel' ? <Monitor className="w-7 h-7" /> : <School className="w-7 h-7" />}
                      </div>
                      <div>
                        <span className="ishes-label mb-1 block">Gestion de classe</span>
                        <h2 className="text-3xl ishes-heading text-ishes-dark leading-none">{selectedClass.name}</h2>
                        <div className="flex items-center gap-3 mt-2">
                           <span className={`text-[10px] font-black uppercase italic px-2 py-0.5 rounded flex items-center gap-1.5 ${selectedClass.type === 'distanciel' ? 'bg-gray-100 text-gray-600' : 'bg-ishes-green-hover text-white'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedClass.type === 'distanciel' ? 'bg-gray-400' : 'bg-white'}`}></span>
                            Mode {selectedClass.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="ishes-outline" size="sm" className="h-10" onClick={handleExportPDF}>
                        Exporter PDF
                      </Button>
                      <Button variant="ishes" size="sm" className="h-10" onClick={openAddStudentModal}>
                        <Plus className="w-4 h-4 mr-1" /> Ajouter Élève
                      </Button>
                    </div>
                  </div>

                  {/* Search within class */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un élève..."
                        className="w-full bg-white border border-gray-100 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-ishes-green/5 shadow-sm transition-all font-medium"
                      />
                    </div>
                    <div className="ishes-label flex flex-col items-end">
                      <span className="text-gray-400">Total</span>
                      <span className="text-ishes-dark text-lg font-black italic">{filteredStudents?.length}</span>
                    </div>
                  </div>
                </div>

                {/* Students List */}
                <div className="flex-1 overflow-y-auto pt-4 space-y-4 custom-scrollbar">
                  {filteredStudents && filteredStudents.length > 0 ? (
                    <div className="grid gap-4">
                      {filteredStudents.map((student) => (
                        <div 
                          key={student.id} 
                          onClick={() => openStudentDetail(student.id)}
                          className="group bg-white p-5 rounded-3xl border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-0.5 transition-all flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-ishes-dark flex items-center justify-center font-black italic text-white text-lg shadow-lg shadow-ishes-dark/10 shrink-0">
                                {student.avatar}
                            </div>
                            <div>
                                <span className="ishes-label text-[9px] mb-0.5 block opacity-50">Étudiant</span>
                                <div className="text-lg ishes-heading text-ishes-dark leading-tight">{student.name}</div>
                                <div className="text-xs font-medium text-ishes-dark/40 tracking-wider font-mono">{student.email.toUpperCase()}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-8">
                            <div className="text-right hidden sm:block">
                              <div className="ishes-label text-[9px] mb-0.5 opacity-40">Inscription</div>
                              <div className="font-black italic text-ishes-dark text-sm">{student.dateJoined.toUpperCase()}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative group/menu">
                                  <button className="w-10 h-10 flex items-center justify-center text-ishes-dark/20 hover:text-ishes-green hover:bg-ishes-green/5 rounded-full transition-all">
                                      <MoreVertical className="w-5 h-5" />
                                  </button>
                                  {/* Quick Actions Dropdown */}
                                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setStudentToTransfer({id: student.id, name: student.name});
                                        setShowTransferModal(true);
                                      }}
                                      className="w-full px-4 py-2 text-left text-xs font-bold text-ishes-dark hover:bg-ishes-green/5 hover:text-ishes-green flex items-center gap-2"
                                    >
                                      <History className="w-3.5 h-3.5" /> Changer de classe
                                    </button>
                                    <button 
                                      className="w-full px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Désinscrire
                                    </button>
                                  </div>
                                </div>
                                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-300 group-hover:bg-ishes-green group-hover:text-white rounded-full transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <Users className="w-12 h-12 mb-4 text-gray-300" />
                      <p className="font-semibold text-gray-600">Aucun élève trouvé</p>
                      <p className="text-sm">Essayez de modifier votre recherche</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-200 text-center p-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune classe sélectionnée</h3>
                <p className="text-gray-500 max-w-sm">Sélectionnez une classe dans le menu de gauche pour afficher la liste de ses élèves.</p>
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
                  <div className="bg-[#152233] text-white p-8 relative overflow-hidden">
                     {/* Decorative Background Element */}
                     <div className="absolute -top-24 -right-24 w-64 h-64 bg-ishes-green/10 blur-[80px] rounded-full" />
                     
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ishes-green">Dossier Académique</span>
                           <div className="flex items-center gap-2 px-3 py-1.5 bg-ishes-green/10 border border-ishes-green/20 rounded-lg">
                              <span className="w-1.5 h-1.5 bg-ishes-green rounded-full animate-pulse"></span>
                              <span className="text-[10px] font-black text-ishes-green uppercase tracking-widest">
                                 {studentDetail.status === 'actif' ? 'Inscrit' : 'En attente'}
                              </span>
                           </div>
                        </div>

                        <div className="flex items-end gap-6">
                           <div className="w-24 h-24 rounded-[2rem] bg-white p-1 shadow-2xl">
                              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-[1.8rem] flex items-center justify-center font-black text-3xl text-[#152233]">
                                 {(studentDetail.first_name?.[0] || '') + (studentDetail.last_name?.[0] || '')}
                              </div>
                           </div>
                           <div className="flex-1 pb-2">
                              <h2 className="text-3xl font-black text-white tracking-tight mb-1">{studentDetail.first_name} {studentDetail.last_name}</h2>
                              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest italic">Membre depuis le {new Date(studentDetail.created_at).toLocaleDateString()}</p>
                           </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                           <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl font-bold text-[10px] uppercase tracking-widest h-11">
                              Accéder au Profil
                           </Button>
                           <Button className="flex-1 bg-white text-[#152233] hover:bg-gray-100 rounded-xl font-bold text-[10px] uppercase tracking-widest h-11 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5" /> Message
                           </Button>
                        </div>
                     </div>

                     <button onClick={() => { setSelectedStudentId(null); setStudentDetail(null); }} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-20">
                        <X className="w-5 h-5 text-white/40" />
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
                    onChange={(e) => setNewClassData({...newClassData, name: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-ishes-green/5 focus:border-ishes-green transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Formation associée</label>
                  <select 
                    value={newClassData.formation_id}
                    onChange={(e) => setNewClassData({...newClassData, formation_id: e.target.value})}
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
                      onClick={() => setNewClassData({...newClassData, type: 'distanciel'})}
                      className={`py-3 rounded-2xl border-2 font-bold text-xs transition-all ${newClassData.type === 'distanciel' ? 'border-ishes-green bg-ishes-green/5 text-ishes-green shadow-lg shadow-ishes-green/10' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'}`}
                    >
                      🖥️ Distanciel
                    </button>
                    <button 
                      onClick={() => setNewClassData({...newClassData, type: 'presentiel'})}
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
    </div>
  );
}
