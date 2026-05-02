"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, Search, Mail, Phone, MapPin, Calendar, CheckCircle2, GraduationCap, X, ChevronRight, Download, Plus, Loader2, AlertCircle, History, Terminal } from "lucide-react";
import { fetchStudentsAction, createStudentManualAction, updateStudentAction, fetchClassesAction, assignStudentToClassAction } from "@/app/actions/students";
import { LogoutButton } from "@/components/LogoutButton";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

// Types
type StudentDetail = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  dateJoined: string;
  enrolledClass: string;
  classType: "distanciel" | "presentiel";
  status: "actif" | "inactif" | "en_attente" | "en_attente_daffectation";
  parentName: string | null;
  address: string;
  lastPayment: string;
  paymentStatus: "a_jour" | "en_retard";
};

function EtudiantsContent() {
  const searchParams = useSearchParams();
  const studentIdFromUrl = searchParams.get("id");

  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScolariteModal, setShowScolariteModal] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [classSearchQuery, setClassSearchQuery] = useState("");
  const [targetClassId, setTargetClassId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    parent_first_name: "",
    parent_last_name: "",
    address: ""
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const result = await fetchStudentsAction();
      if (result.success && result.data) {
        const formatted = result.data.map((s: any) => {
          const latestInscription = s.inscriptions?.[0];
          return {
            id: s.id,
            name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || 'Sans nom',
            email: s.email,
            phone: s.phone || "Non renseigné",
            avatar: (s.first_name?.[0] || "") + (s.last_name?.[0] || ""),
            dateJoined: new Date(s.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
            enrolledClass: (Array.isArray(latestInscription?.classes) ? latestInscription?.classes[0]?.name : latestInscription?.classes?.name) || 
                           (Array.isArray(latestInscription?.formations) ? latestInscription?.formations[0]?.title : latestInscription?.formations?.title) || 
                           "Non affecté",
            classType: "distanciel" as const,
            status: latestInscription?.status || s.status || "en_attente",
            parentName: s.parent_first_name ? `${s.parent_first_name} ${s.parent_last_name || ''}`.trim() : null,
            address: s.address || "Adresse non renseignée",
            lastPayment: "N/A",
            paymentStatus: "a_jour" as const
          };
        });

        setStudents(formatted);
        if (formatted.length > 0 && !selectedStudentId) {
           if (studentIdFromUrl) {
             setSelectedStudentId(studentIdFromUrl);
           } else {
             setSelectedStudentId(formatted[0].id);
           }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreateStudent = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) return;
    setIsSubmitting(true);
    try {
      const result = await createStudentManualAction(formData);
      if (result.success) {
        setShowAddModal(false);
        resetForm();
        await fetchStudents();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStudent = async () => {
    if (!selectedStudentId || !formData.first_name) return;
    setIsSubmitting(true);
    try {
      const result = await updateStudentAction(selectedStudentId, formData);
      if (result.success) {
        setShowEditModal(false);
        await fetchStudents();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateScolarite = async () => {
    if (!selectedStudentId || !targetClassId) return;
    setIsSubmitting(true);
    try {
      const result = await assignStudentToClassAction(selectedStudentId, targetClassId);
      if (result.success) {
        setShowScolariteModal(false);
        await fetchStudents();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
      address: ""
    });
  };

  const openEditModal = () => {
    const s = students.find(x => x.id === selectedStudentId);
    if (!s) return;
    const names = s.name.split(' ');
    setFormData({
      first_name: names[0] || "",
      last_name: names.slice(1).join(' ') || "",
      email: s.email,
      phone: s.phone,
      parent_first_name: s.parentName?.split(' ')[0] || "",
      parent_last_name: s.parentName?.split(' ').slice(1).join(' ') || "",
      address: s.address
    });
    setShowEditModal(true);
  };

  const openScolariteModal = async () => {
    setShowScolariteModal(true);
    try {
      const res = await fetchClassesAction();
      if (res.success) setClasses(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.enrolledClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" /> {/* Spacer for menu button */}
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Base Étudiants</h1>
            <span className="hidden sm:inline-block px-3 py-1 bg-ishes-green/5 text-ishes-green text-[10px] font-black italic rounded-full border border-ishes-green/10">
              {students.length} INSCRITS
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Button variant="ishes" size="sm" className="h-10 px-4 md:px-6 rounded-xl border-none shadow-lg shadow-ishes-green/20" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-1" /> <span className="hidden md:inline">Inscrire Élève</span>
              <span className="md:hidden">Inscrire</span>
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

        {/* Dashboard Content - 2 Column Layout with Loading State */}
        <div className="flex-1 overflow-hidden flex relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-ishes-green animate-spin mb-4" />
              <p className="ishes-label animate-pulse">Chargement...</p>
            </div>
          )}

          {/* Left Pane - Students List */}
          <div className={cn(
            "w-full lg:w-[400px] bg-white border-r border-gray-50 flex flex-col shrink-0 relative z-0 transition-all duration-300",
            selectedStudentId && "hidden lg:flex"
          )}>
            <div className="p-4 border-b border-gray-50 bg-white/50 backdrop-blur-md sticky top-0 z-10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full bg-gray-50 border border-gray-50 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-ishes-green/5 shadow-sm transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`w-full text-left p-4 rounded-3xl transition-all border block mb-2 ${selectedStudentId === student.id
                      ? "bg-ishes-dark text-white shadow-xl shadow-ishes-dark/20 border-ishes-dark"
                      : "bg-white border-gray-50 hover:border-ishes-green/20 hover:shadow-lg hover:shadow-black/5"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex flex-shrink-0 items-center justify-center font-black italic text-sm shadow-sm
                        ${selectedStudentId === student.id ? 'bg-white text-ishes-dark' : 'bg-ishes-dark text-white'}
                      `}>
                        {student.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h3 className={`ishes-heading text-sm truncate ${selectedStudentId === student.id ? 'text-white' : 'text-ishes-dark'}`}>{student.name}</h3>
                          {student.status === "actif" && <span className="w-2 h-2 rounded-full bg-ishes-green"></span>}
                          {student.status !== "actif" && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                        </div>
                        <p className={`text-[10px] font-medium tracking-wider truncate mb-1 opacity-60 uppercase ${selectedStudentId === student.id ? 'text-white' : 'text-ishes-dark'}`}>{student.email}</p>
                        <div className="flex items-center gap-2">
                          <span className={`ishes-label text-[8px] px-2 py-0.5 rounded-md truncate ${selectedStudentId === student.id ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            {student.enrolledClass}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-10 px-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="font-bold text-gray-600">Aucun étudiant trouvé</p>
                  <p className="text-xs text-gray-400 mt-1">Modifiez vos critères de recherche</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Pane - Profile Detail */}
          <div className={cn(
            "flex-1 bg-gray-50/50 flex flex-col p-4 md:p-6 overflow-hidden relative transition-all duration-300",
            !selectedStudentId && "hidden lg:flex"
          )}>
            {selectedStudent ? (
              <div className="h-full bg-white rounded-3xl shadow-sm border border-gray-200 overflow-y-auto flex flex-col relative custom-scrollbar">

                {/* Profile Cover & Header */}
                <div className="h-24 bg-[#152233] relative rounded-t-[2.5rem] overflow-hidden shrink-0">
                   <div className="absolute inset-0 bg-gradient-to-r from-ishes-green/10 to-transparent"></div>
                  {/* Status Badge Top Right */}
                  <div className="absolute top-6 right-6 md:right-8 flex gap-2">
                    {selectedStudent.status === 'actif' && (
                      <span className="bg-ishes-green/10 backdrop-blur-md border border-ishes-green/20 text-ishes-green px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-[8px] md:text-[9px] font-black tracking-widest shadow-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3" /> <span className="hidden sm:inline">DOSSIER VALIDÉ</span>
                      </span>
                    )}
                    {selectedStudent.status !== 'actif' && (
                      <span className="bg-amber-400/10 backdrop-blur-md border border-amber-400/20 text-amber-400 px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-[8px] md:text-[9px] font-black tracking-widest shadow-sm flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> <span className="hidden sm:inline">EN ATTENTE</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-8 flex-1">
                  {/* Identity Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 md:-mt-20 mb-10 md:mb-12 gap-6 relative z-10">
                    <div className="flex items-end gap-4 md:gap-6">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem] md:rounded-[2rem] bg-white p-1 md:p-1.5 shadow-2xl shadow-[#152233]/10 border border-gray-100">
                        <div className="w-full h-full bg-[#152233] rounded-[1.3rem] md:rounded-[1.8rem] flex items-center justify-center text-2xl md:text-3xl font-black italic text-white">
                          {selectedStudent.avatar}
                        </div>
                      </div>
                      <div className="pb-1 md:pb-2">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-1 md:mb-2 block">Documentation Élève</span>
                        <h2 className="text-2xl md:text-4xl font-black text-white md:text-ishes-dark tracking-tight leading-none truncate max-w-[200px] md:max-w-none">{selectedStudent.name}</h2>
                        <p className="text-[8px] md:text-[10px] font-black tracking-widest text-ishes-green mt-2 md:mt-3 uppercase">Inscrit le {selectedStudent.dateJoined}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 md:gap-3 pb-1 md:pb-2">
                      <Button variant="ishes-outline" size="sm" className="flex-1 md:flex-none h-10 md:h-11 text-[10px] md:text-xs" onClick={openEditModal}>
                        MODIFIER
                      </Button>
                      <Button variant="ishes" size="sm" className="flex-1 md:flex-none h-10 md:h-11 shadow-ishes-green/20 text-[10px] md:text-xs">
                        <Mail className="w-4 h-4 mr-1 md:mr-2" /> Message
                      </Button>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                    {/* Contact Info Card */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-6 md:mb-8">
                         <div className="w-1 h-4 bg-ishes-green rounded-full"></div>
                         <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-ishes-green">Coordonnées</h3>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        {selectedStudent.parentName && (
                          <div className="flex flex-col p-4 bg-ishes-green/5 border border-ishes-green/10 rounded-2xl mb-2">
                            <span className="text-[8px] md:text-[9px] font-black text-ishes-green uppercase tracking-widest mb-1">Responsable Légal (Parent)</span>
                            <span className="ishes-heading text-base md:text-lg text-ishes-dark">{selectedStudent.parentName}</span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Email Personnel</span>
                          <span className="ishes-heading text-base md:text-lg text-ishes-dark truncate">{selectedStudent.email}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Téléphone</span>
                          <span className="ishes-heading text-base md:text-lg text-ishes-dark font-mono">{selectedStudent.phone}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Adresse de résidence</span>
                          <span className="ishes-heading text-xs md:text-sm text-ishes-dark leading-relaxed">{selectedStudent.address.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Scolarité Info Card */}
                    <div className="flex flex-col mt-4 lg:mt-0">
                      <div className="flex items-center gap-3 mb-6 md:mb-8">
                         <div className="w-1 h-4 bg-[#152233] rounded-full"></div>
                         <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#152233]">Scolarité</h3>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center justify-between group">
                           <div className="flex flex-col">
                             <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Formation Actuelle</span>
                             <span className="ishes-heading text-base md:text-lg text-ishes-green">{selectedStudent.enrolledClass}</span>
                           </div>
                           <Button variant="ghost" size="sm" className="ishes-label text-[9px] md:text-[10px] hover:bg-ishes-green/5 text-ishes-green" onClick={openScolariteModal}>MODIFIER</Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="flex flex-col">
                             <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Dernier Règlement</span>
                             <span className="ishes-heading text-xs md:text-sm text-ishes-dark">{selectedStudent.lastPayment}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Statut Financier</span>
                             <span className={`ishes-label text-[9px] md:text-[10px] mt-1 ${selectedStudent.paymentStatus === 'a_jour' ? 'text-ishes-green' : 'text-red-500'}`}>
                               {selectedStudent.paymentStatus === 'a_jour' ? 'À JOUR' : 'IMPAYÉ'}
                             </span>
                           </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Accès Rapides Actions */}
                  <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-100">
                    <h3 className="ishes-label opacity-40 mb-6 text-[10px]">Actions Administratives</h3>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      <Button variant="ishes-outline" className="flex-1 sm:flex-none h-11 md:h-12 px-4 md:px-6 text-[10px] md:text-xs">
                        <Download className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Certificat</span> Scolarité
                      </Button>
                      <Button variant="ishes-outline" className="flex-1 sm:flex-none h-11 md:h-12 px-4 md:px-6 text-[10px] md:text-xs">
                        <CreditCard className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Lien de</span> Paiement
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-100 text-center p-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-gray-200" />
                </div>
                <h3 className="text-xl md:text-2xl ishes-heading text-ishes-dark mb-2">Profil Étudiant</h3>
                <p className="ishes-label text-[10px] md:text-xs opacity-40 max-w-[200px] md:max-w-sm">Sélectionnez un étudiant pour visualiser son dossier complet.</p>
              </div>
            )}

            {/* Mobile close button / back button */}
            {selectedStudentId && (
              <button
                onClick={() => setSelectedStudentId(null)}
                className="lg:hidden absolute top-6 right-6 w-10 h-10 bg-ishes-dark text-white rounded-full flex items-center justify-center shadow-xl z-20 active:scale-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>


      {/* ADD STUDENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-ishes-dark tracking-tight">Nouveau Dossier Élève</h3>
                <p className="text-xs font-medium text-gray-400 mt-1">Saisissez manuellement les informations pour créer un compte.</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
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
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
              <Button variant="ishes-outline" className="flex-1 h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" onClick={() => setShowAddModal(false)}>Annuler</Button>
              <Button variant="ishes" className="flex-[2] h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" disabled={isSubmitting} onClick={handleCreateStudent}>
                {isSubmitting ? "Création..." : "Enregistrer le dossier"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-ishes-dark tracking-tight">Modifier le Dossier</h3>
                <p className="text-xs font-medium text-gray-400 mt-1">Mise à jour des informations personnelles de l'élève.</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prénom</label>
                    <input 
                      type="text" 
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom</label>
                    <input 
                      type="text" 
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
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Téléphone</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Legal Representative */}
              <div className="space-y-6 pt-4 border-t border-gray-50">
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
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
              <Button variant="ishes-outline" className="flex-1 h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" onClick={() => setShowEditModal(false)}>Annuler</Button>
              <Button variant="ishes" className="flex-[2] h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" disabled={isSubmitting} onClick={handleUpdateStudent}>
                {isSubmitting ? "Mise à jour..." : "Enregistrer les modifications"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SCOLARITE MODAL */}
      {showScolariteModal && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ishes-green/10 rounded-xl flex items-center justify-center text-ishes-green">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-ishes-dark tracking-tight">Modifier Scolarité</h3>
                </div>
                <button onClick={() => setShowScolariteModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sélectionner une nouvelle classe</label>
                
                {/* Search Bar for Classes */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Rechercher une classe ou formation..."
                    value={classSearchQuery}
                    onChange={(e) => setClassSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-xs font-bold"
                  />
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {classes
                    .filter(c => 
                      c.name.toLowerCase().includes(classSearchQuery.toLowerCase()) || 
                      c.formationTitle.toLowerCase().includes(classSearchQuery.toLowerCase())
                    )
                    .map((c) => (
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
                <Button variant="ishes-outline" className="flex-1 h-12 rounded-2xl" onClick={() => setShowScolariteModal(false)}>Annuler</Button>
                <Button variant="ishes" className="flex-[2] h-12 rounded-2xl" disabled={isSubmitting || !targetClassId} onClick={handleUpdateScolarite}>
                  {isSubmitting ? "Mise à jour..." : "Confirmer le changement"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EtudiantsPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-ishes-green animate-spin" />
      </div>
    }>
      <EtudiantsContent />
    </Suspense>
  );
}
