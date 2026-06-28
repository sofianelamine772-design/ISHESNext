"use client";

import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, Search, Mail, Phone, MapPin, Calendar, CheckCircle2, GraduationCap, X, ChevronRight, Download, Plus, Loader2, AlertCircle, History, Terminal, Send, Trash2, ExternalLink } from "lucide-react";
import { fetchStudentsAction, createStudentManualAction, updateStudentAction, deleteStudentAction, fetchClassesAction, assignStudentToClassAction, fetchPaymentsByStudentAction, sendPaymentReminderAction } from "@/app/actions/students";
import { LogoutButton } from "@/components/LogoutButton";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { getCurrentAcademicYear, getNextAcademicYear } from "@/lib/utils";

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
  status: "actif" | "inactif" | "en_attente" | "en_attente_daffectation" | "valide";
  parentName: string | null;
  address: string;
  lastPayment: string;
  paymentStatus: "a_jour" | "en_retard";
  classId?: string | null;
};

function EtudiantsContent() {
  const searchParams = useSearchParams();
  const studentIdFromUrl = searchParams.get("id");

  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  // Only current and next academic year
  const currentAcademicYear = getCurrentAcademicYear();
  const nextAcademicYear = getNextAcademicYear();
  const academicYearOptions = [currentAcademicYear, nextAcademicYear];
  const [selectedYear, setSelectedYear] = useState<string>(currentAcademicYear);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScolariteModal, setShowScolariteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageSending, setMessageSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [classSearchQuery, setClassSearchQuery] = useState("");
  const [targetClassId, setTargetClassId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const [isDeletingStudent, setIsDeletingStudent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [popupMsg, setPopupMsg] = useState<{ title: string, desc: string, type: 'success' | 'error' } | null>(null);

  // Pagination for DOM performance
  const [visibleCount, setVisibleCount] = useState(50);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    payment_status: "en_attente",
    payment_method: "virement",
    amount_paid: "150"
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const result = await fetchStudentsAction(selectedYear);
      if (result.success && result.data) {
        const formatted = result.data.map((s: any) => {
          const latestInscription = 
            s.inscriptions?.find((ins: any) => ins.academic_year === selectedYear && (ins.status === 'actif' || ins.status === 'valide')) ||
            s.inscriptions?.find((ins: any) => ins.academic_year === selectedYear) ||
            s.inscriptions?.find((ins: any) => ins.status === 'actif' || ins.status === 'valide') ||
            s.inscriptions?.[0];

          const getCleanEmail = (e: string) => {
            if (!e) return "";
            const parts = e.split('@');
            if (parts.length !== 2) return e;
            const username = parts[0].split('+')[0];
            return `${username}@${parts[1]}`;
          };

          return {
            id: s.id,
            name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || (s.email ? s.email.split('@')[0] : 'Sans nom'),
            email: s.email ? getCleanEmail(s.email) : "",
            phone: s.phone || "Non renseigné",
            avatar: ((s.first_name?.[0] || "") + (s.last_name?.[0] || "")).toUpperCase() || (s.email ? s.email[0].toUpperCase() : "?"),
            dateJoined: new Date(s.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
            enrolledClass:
              (Array.isArray(latestInscription?.formations) ? latestInscription?.formations[0]?.title : latestInscription?.formations?.title) ||
              (Array.isArray(latestInscription?.classes)
                ? (Array.isArray(latestInscription.classes[0]?.formations) ? latestInscription.classes[0].formations[0]?.title : latestInscription.classes[0]?.formations?.title)
                : (Array.isArray(latestInscription?.classes?.formations) ? latestInscription.classes.formations[0]?.title : latestInscription?.classes?.formations?.title)
              ) ||
              (Array.isArray(latestInscription?.classes) ? latestInscription?.classes[0]?.name : latestInscription?.classes?.name) ||
              "Non affecté",
            classType: "distanciel" as const,
            status: s.status || "en_attente",
            parentName: null,
            address: s.address || "Adresse non renseignée",
            lastPayment: latestInscription?.paid_status === 'paye' ? "Stripe" : "Aucun",
            paymentStatus: (latestInscription?.paid_status === 'paye' || s.id.startsWith('manual_')) ? "a_jour" as const : "en_retard" as const,
            classId: latestInscription?.class_id || null
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
  }, [selectedYear]);

  const fetchStudentPayments = async (studentId: string) => {
    setLoadingPayments(true);
    try {
      const result = await fetchPaymentsByStudentAction(studentId);
      if (result.success && result.data) {
        setPayments(result.data);
      } else {
        setPayments([]);
      }
    } catch (err) {
      console.error("Failed to load payments", err);
      setPayments([]);
    } finally {
      setLoadingPayments(false);
    }
  };

  useEffect(() => {
    if (selectedStudentId) {
      fetchStudentPayments(selectedStudentId);
    } else {
      setPayments([]);
    }
  }, [selectedStudentId]);

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
        await fetchStudentPayments(selectedStudentId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendPaymentReminder = async () => {
    if (!selectedStudentId) return;
    setIsSendingReminder(true);
    try {
      const result = await sendPaymentReminderAction(selectedStudentId);
      if (result.success) {
        if (result.warning) {
          setPopupMsg({ title: "Invitation Envoyée !", desc: result.warning, type: "success" });
        } else {
          setPopupMsg({ title: "Succès !", desc: "L'email de relance (et l'invitation de connexion Clerk si besoin) a été envoyé avec succès à l'étudiant.", type: "success" });
        }
      } else {
        setPopupMsg({ title: "Erreur d'envoi", desc: result.error || "Avez-vous vérifié votre domaine sur Resend ?", type: "error" });
      }
    } catch (err: any) {
      console.error(err);
      setPopupMsg({ title: "Erreur inattendue", desc: "Une erreur est survenue lors de l'envoi de la relance.", type: "error" });
    } finally {
      setIsSendingReminder(false);
    }
  };

  const executeDeleteStudent = async () => {
    if (!selectedStudentId) return;
    setIsDeletingStudent(true);
    try {
      const result = await deleteStudentAction(selectedStudentId);
      if (result.success) {
        setStudents(students.filter(s => s.id !== selectedStudentId));
        setSelectedStudentId(null);
        setShowDeleteConfirm(false);
        setPopupMsg({ title: "Élève supprimé", desc: "L'élève a été définitivement supprimé du système.", type: "success" });
      } else {
        setShowDeleteConfirm(false);
        setPopupMsg({ title: "Erreur de suppression", desc: result.error || "Impossible de supprimer cet élève.", type: "error" });
      }
    } catch (err: any) {
      console.error(err);
      setShowDeleteConfirm(false);
      setPopupMsg({ title: "Erreur", desc: "Une erreur est survenue.", type: "error" });
    } finally {
      setIsDeletingStudent(false);
    }
  };

  const handleDeleteStudent = () => {
    setShowDeleteConfirm(true);
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

  const fetchChatHistory = async (studentId: string) => {
    setChatLoading(true);
    try {
      const res = await fetch(`/api/messages?type=chat&clerkId=${studentId}`);
      if (res.ok) {
        const data = await res.json();
        setChatHistory(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Erreur chargement chat:", err);
    } finally {
      setChatLoading(false);
    }
  };

  const openChat = (student: StudentDetail) => {
    setSelectedStudentId(student.id);
    setMessageContent("");
    setMessageSent(false);
    setChatHistory([]);
    setShowMessageModal(true);
    fetchChatHistory(student.id);
  };

  const handleSendMessageToStudent = async () => {
    if (!selectedStudent || !messageContent.trim()) return;
    setMessageSending(true);
    const content = messageContent.trim();
    setMessageContent("");
    // Affichage optimiste immédiat
    const optimistic = { id: `tmp-${Date.now()}`, sender_id: 'admin_system', receiver_id: selectedStudent.id, content, created_at: new Date().toISOString(), type: 'private' };
    setChatHistory(prev => [...prev, optimistic]);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: 'admin_system',
          receiver_id: selectedStudent.id,
          content,
          type: 'private',
        }),
      });
      if (res.ok) {
        // Rafraîchir le vrai historique
        fetchChatHistory(selectedStudent.id);
      } else {
        setChatHistory(prev => prev.filter(m => m.id !== optimistic.id));
      }
    } catch (err) {
      console.error("Erreur envoi:", err);
      setChatHistory(prev => prev.filter(m => m.id !== optimistic.id));
    } finally {
      setMessageSending(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      payment_status: "en_attente",
      payment_method: "virement",
      amount_paid: "150"
    });
  };

  const openEditModal = () => {
    const s = students.find(x => x.id === selectedStudentId);
    if (!s) return;
    const names = s.name.split(' ');
    const hasPaid = payments.some(p => p.status === 'paid' || p.status === 'payé');
    setFormData({
      first_name: names[0] || "",
      last_name: names.slice(1).join(' ') || "",
      email: s.email,
      phone: s.phone,
      address: s.address,
      payment_status: hasPaid ? 'a_jour' : 'en_attente',
      payment_method: "liquide",
      amount_paid: "150",
      _original_payment_status: hasPaid ? 'a_jour' : 'en_attente'
    } as any);
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

  const filteredStudents = useMemo(() => {
    return students.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.enrolledClass.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const visibleStudents = useMemo(() => filteredStudents.slice(0, visibleCount), [filteredStudents, visibleCount]);

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const { exportAllStudentsDataAction } = await import("@/app/actions/students");
      const result = await exportAllStudentsDataAction();
      if (result.success && result.data) {
        const headers = ["ID", "Prénom", "Nom", "Email", "Téléphone", "Statut", "Rôle", "Formations", "Total Payé (€)", "ID Paiements Stripe", "Date d'inscription"];
        const rows = result.data.map((s: any) => {
          const formations = Array.isArray(s.inscriptions) ? s.inscriptions.map((i: any) => i.formations?.title).filter(Boolean).join(" | ") : "";
          const totalPaid = Array.isArray(s.paiements) ? s.paiements.filter((p: any) => p.status === "paid" || p.status === "payé" || p.status === "succeeded").reduce((acc: number, p: any) => acc + (p.amount || 0), 0) : 0;
          const stripeIds = Array.isArray(s.paiements) ? s.paiements.map((p: any) => p.stripe_session_id).filter(Boolean).join(" | ") : "";
          const dateStr = s.created_at ? new Date(s.created_at).toLocaleDateString('fr-FR') : "";

          return [
            s.id,
            s.first_name || "",
            s.last_name || "",
            s.email || "",
            s.phone || "",
            s.status || "",
            s.role || "",
            formations,
            totalPaid,
            stripeIds,
            dateStr
          ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
        });

        const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `export_etudiants_ishes_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        setPopupMsg({ title: "Erreur", desc: "Impossible de récupérer les données pour l'export.", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setPopupMsg({ title: "Erreur", desc: "Une erreur est survenue lors de l'export.", type: "error" });
    } finally {
      setIsExporting(false);
    }
  };

  const selectedStudent = useMemo(() => students.find(s => s.id === selectedStudentId), [students, selectedStudentId]);

  const getBaseEmail = (email: string) => {
    if (!email) return "";
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const username = parts[0].split('+')[0];
    return `${username}@${parts[1]}`.toLowerCase();
  };

  const familyMembers = useMemo(() => {
    if (!selectedStudent) return [];
    const baseEmail = getBaseEmail(selectedStudent.email);
    return students.filter(s =>
      s.id !== selectedStudent.id &&
      getBaseEmail(s.email) === baseEmail &&
      selectedStudent.phone &&
      s.phone &&
      selectedStudent.phone !== "Non renseigné" &&
      s.phone !== "Non renseigné" &&
      selectedStudent.phone === s.phone
    );
  }, [selectedStudent, students]);

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
            <Button
              onClick={handleExportCSV}
              disabled={isExporting}
              variant="outline"
              className="h-9 text-xs flex items-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">Exporter (CSV)</span>
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
              <div className="mt-3">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ishes-green/50 focus:border-ishes-green font-semibold text-gray-700"
                >
                  <option value={currentAcademicYear}>Année Scolaire {currentAcademicYear}</option>
                  <option value={nextAcademicYear}>Année Scolaire {nextAcademicYear}</option>
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {filteredStudents.length > 0 ? (
                <>
                  {visibleStudents.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`w-full text-left p-4 rounded-3xl transition-all border block mb-2 ${selectedStudentId === student.id
                        ? "bg-white text-ishes-dark shadow-lg shadow-black/5 border-gray-200 ring-1 ring-gray-900/5"
                        : "bg-white border-gray-50 hover:border-gray-200 hover:shadow-md hover:shadow-black/5"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex flex-shrink-0 items-center justify-center font-black italic text-sm shadow-sm
                          ${selectedStudentId === student.id ? 'bg-ishes-dark text-white' : 'bg-ishes-dark/10 text-ishes-dark'}
                        `}>
                          {student.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h3 className="ishes-heading text-sm truncate text-ishes-dark">{student.name}</h3>
                            {(student.status === "en_attente") && <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/20" />}
                            {(student.status === "actif" || student.status === "valide") && <div className="w-2 h-2 rounded-full bg-ishes-green shadow-lg shadow-ishes-green/20" />}
                          </div>
                          <p className="text-[10px] font-medium tracking-wider truncate mb-1 opacity-65 uppercase text-ishes-dark">{student.email}</p>
                          <div className="flex items-center gap-2">
                            <span className={`ishes-label text-[8px] px-2 py-0.5 rounded-md truncate ${selectedStudentId === student.id ? 'bg-ishes-dark/10 text-ishes-dark' : 'bg-gray-50 text-gray-400'}`}>
                              {student.enrolledClass || "Non assigné"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  {visibleCount < filteredStudents.length && (
                    <div className="pt-2 pb-6">
                      <Button
                        variant="ishes-outline"
                        className="w-full h-10 rounded-2xl text-[10px]"
                        onClick={() => setVisibleCount(v => v + 50)}
                      >
                        Afficher plus d'étudiants ({filteredStudents.length - visibleCount} restants)
                      </Button>
                    </div>
                  )}
                </>
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
                <div className="h-24 bg-white border-b border-gray-50 relative rounded-t-[2.5rem] overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-ishes-green/10 to-transparent"></div>
                </div>

                <div className="px-6 md:px-8 pb-8 flex-1">
                  {/* Identity Header */}
                  <div className="flex flex-col xl:flex-row xl:items-end justify-between -mt-16 md:-mt-20 mb-10 md:mb-12 gap-6 relative z-10">
                    <div className="flex items-end gap-4 md:gap-6 flex-1 min-w-0">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem] md:rounded-[2rem] bg-white p-1 md:p-1.5 shadow-xl shadow-black/5 border border-gray-100 shrink-0">
                        <div className="w-full h-full bg-gray-50 border border-gray-100 rounded-[1.3rem] md:rounded-[1.8rem] flex items-center justify-center text-2xl md:text-3xl font-black italic text-ishes-dark">
                          {selectedStudent.avatar}
                        </div>
                      </div>
                      <div className="pb-1 md:pb-2 min-w-0 flex-1">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-ishes-dark/70 mb-1 md:mb-2 block">Documentation Élève</span>
                        <h2 className="text-2xl md:text-4xl font-black text-ishes-dark tracking-tight leading-snug">{selectedStudent.name}</h2>
                        <p className="text-[8px] md:text-[10px] font-black tracking-widest text-ishes-green mt-2 md:mt-3 uppercase">Inscrit le {selectedStudent.dateJoined}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 md:gap-3 pb-1 md:pb-2 shrink-0 flex-wrap justify-end">
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none h-10 md:h-11 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 text-[10px] md:text-xs" onClick={handleDeleteStudent} disabled={isDeletingStudent}>
                        {isDeletingStudent ? <Loader2 className="w-4 h-4 mr-1 md:mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-1 md:mr-2" />} Désinscrire
                      </Button>
                      <Button variant="ishes-outline" size="sm" className="flex-1 md:flex-none h-10 md:h-11 text-[10px] md:text-xs" onClick={openEditModal}>
                        MODIFIER
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none h-10 md:h-11 text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 text-[10px] md:text-xs" onClick={handleSendPaymentReminder} disabled={isSendingReminder}>
                        {isSendingReminder ? <Loader2 className="w-4 h-4 mr-1 md:mr-2 animate-spin" /> : <AlertCircle className="w-4 h-4 mr-1 md:mr-2" />} Relance
                      </Button>
                      <Button variant="ishes-outline" size="sm" className="flex-1 md:flex-none h-10 md:h-11 shadow-black/5 text-[10px] md:text-xs" onClick={() => openChat(selectedStudent)}>
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
                        {familyMembers.length > 0 && (
                          <div className="flex flex-col p-4 bg-gray-50 border border-gray-100 rounded-2xl mb-2">
                            <span className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Membres de la Famille</span>
                            <div className="space-y-1">
                              {familyMembers.map((m) => (
                                <div key={m.id} className="text-xs font-bold text-ishes-dark flex items-center justify-between">
                                  <span>{m.name}</span>
                                  <span className="text-[9px] font-normal text-gray-400 font-mono">({m.enrolledClass})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between group">
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Email Personnel</span>
                            <span className="ishes-heading text-base md:text-lg text-ishes-dark truncate block" title={selectedStudent.email}>
                              {selectedStudent.email}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="ishes-label text-[9px] md:text-[10px] hover:bg-ishes-green/5 text-ishes-green shrink-0 ml-2" 
                            onClick={openEditModal}
                          >
                            MODIFIER
                          </Button>
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
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-ishes-dark">Scolarité</h3>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center justify-between group">
                          <div className="flex flex-col">
                            <span className="ishes-label text-[8px] md:text-[9px] opacity-40 mb-1">Formation Actuelle</span>
                            {selectedStudent.classId ? (
                              <Link
                                href={`/app/admin/classes?classId=${selectedStudent.classId}&studentId=${selectedStudent.id}`}
                                className="ishes-heading text-base md:text-lg text-ishes-green hover:underline flex items-center gap-1.5 font-bold group/link"
                              >
                                {selectedStudent.enrolledClass}
                                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                              </Link>
                            ) : (
                              <span className="ishes-heading text-base md:text-lg text-gray-400">{selectedStudent.enrolledClass}</span>
                            )}
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

                  {/* Fratrie / Membres de la famille */}
                  {familyMembers.length > 0 && (
                    <div className="mt-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2">
                          <Users className="w-4 h-4" /> Membres de la famille ({familyMembers.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {familyMembers.map((member) => (
                          <div
                            key={member.id}
                            onClick={() => setSelectedStudentId(member.id)}
                            className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-purple-100 transition-colors"
                          >
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-purple-700 shadow-sm border border-purple-100 shrink-0">
                              {member.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-ishes-dark text-sm truncate">{member.name}</h4>
                              <p className="text-[10px] text-gray-500 truncate">{member.enrolledClass}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-purple-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Facturation & Règlements */}
                  <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-4 bg-ishes-green rounded-full"></div>
                      <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-ishes-green flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Facturation & Historique des règlements
                      </h3>
                    </div>

                    {loadingPayments ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-ishes-green animate-spin mr-2" />
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Chargement des paiements...</span>
                      </div>
                    ) : payments.length > 0 ? (
                      <div className="space-y-4">
                        {payments.map((payment: any) => {
                          const paymentDate = new Date(payment.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'long', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          });
                          const amountFormatted = new Intl.NumberFormat('fr-FR', {
                            style: 'currency', currency: payment.currency || 'EUR'
                          }).format(payment.amount);
                          const isFamily = payment.isFamilyPayment && payment.familyMembers?.length > 0;
                          const membersCount = payment.familyMembersCount || 1;

                          return (
                            <div key={payment.id} className={`border rounded-2xl p-5 flex flex-col gap-3 ${payment.status === 'succeeded'
                              ? 'bg-ishes-green/[0.03] border-ishes-green/15'
                              : 'bg-red-50 border-red-100'
                              }`}>
                              {/* En-tête */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${payment.status === 'succeeded'
                                    ? 'bg-ishes-green/10 text-ishes-green border border-ishes-green/10'
                                    : 'bg-red-50 text-red-500 border border-red-100'
                                    }`}>
                                    <CreditCard className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-black text-ishes-dark">
                                      {payment.inscriptions?.formations?.title || 'Règlement Formation'}
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                                      Reçu le {paymentDate}
                                    </div>
                                    {isFamily && (
                                      <div className="flex items-center gap-1.5 mt-1.5">
                                        <Users className="w-3 h-3 text-blue-500" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                                          Règlement familial — {membersCount} élève{membersCount > 1 ? 's' : ''}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-sm font-black text-ishes-dark">{amountFormatted}</div>
                                  <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-black uppercase rounded-lg tracking-wider ${payment.status === 'succeeded'
                                    ? 'bg-ishes-green/10 text-ishes-green'
                                    : 'bg-red-100 text-red-600'
                                    }`}>
                                    {payment.status === 'succeeded' ? 'Réglé' : 'Échoué'}
                                  </span>
                                </div>
                              </div>

                              {/* Élèves couverts */}
                              {isFamily && (
                                <div className="border-t border-gray-100 pt-3 space-y-2">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                    Élèves couverts par ce règlement
                                  </p>
                                  {payment.familyMembers.map((member: any) => {
                                    const ins = member.inscription;
                                    const isResilie = ins?.status === 'resilie' || ins?.status === 'annule';
                                    const isPaid = ins?.paid_status === 'paye';
                                    return (
                                      <div
                                        key={member.id}
                                        className={`flex items-center justify-between px-3 py-2 rounded-xl ${isResilie ? 'bg-red-50 border border-red-100' : 'bg-white border border-gray-100'
                                          }`}
                                      >
                                        <div className="flex items-center gap-2">
                                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[8px] font-black ${isResilie ? 'bg-red-100 text-red-600' : 'bg-ishes-green/10 text-ishes-green'
                                            }`}>
                                            {member.firstName?.[0]}{member.lastName?.[0]}
                                          </div>
                                          <div>
                                            <span className="text-[11px] font-bold text-ishes-dark">
                                              {member.firstName} {member.lastName}
                                            </span>
                                            {ins?.formations?.title && (
                                              <span className="text-[9px] text-gray-400 ml-1">— {ins.formations.title}</span>
                                            )}
                                          </div>
                                        </div>
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${isResilie
                                          ? 'bg-red-500 text-white'
                                          : isPaid
                                            ? 'bg-ishes-green text-white'
                                            : 'bg-yellow-400 text-white'
                                          }`}>
                                          {isResilie ? 'Résilié' : isPaid ? 'Réglé' : 'En attente'}
                                        </span>
                                      </div>
                                    );
                                  })}
                                  <p className="text-[9px] text-gray-400 italic pt-1 leading-relaxed">
                                    💡 Ce règlement de <strong>{amountFormatted}</strong> couvre <strong>{membersCount} élève{membersCount > 1 ? 's' : ''}</strong>.
                                    En cas de résiliation d’un élève, le paiement reste enregistré pour la famille.
                                  </p>
                                </div>
                              )}

                              {/* ID Stripe */}
                              <div className="text-[9px] text-gray-300 font-mono truncate">
                                ID: {payment.stripe_session_id}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400">
                        <CreditCard className="w-10 h-10 mx-auto mb-3 opacity-30 text-gray-400" />
                        <p className="font-bold text-gray-600 text-xs uppercase tracking-wider">Aucun règlement enregistré</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Cet élève n’a pas encore effectué de paiements.
                        </p>
                      </div>
                    )}
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
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom</label>
                    <input
                      type="text"
                      placeholder="Ex: Diallo"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Téléphone</label>
                    <input
                      type="tel"
                      placeholder="06 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
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
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                )}
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
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom</label>
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Téléphone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>



              {/* FACTURATION / PAIEMENT */}
              <div className="space-y-6 pt-4 border-t border-gray-50">
                <h4 className="text-[10px] font-black tracking-widest uppercase text-ishes-green">Facturation & Paiement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Statut du paiement</label>
                    <select
                      value={formData.payment_status}
                      onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                      disabled={(formData as any)._original_payment_status === 'a_jour'}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold appearance-none disabled:opacity-50"
                    >
                      <option value="en_attente">En attente de paiement</option>
                      <option value="a_jour">Règlement Effectué (Payé)</option>
                    </select>
                  </div>

                  {formData.payment_status === 'a_jour' && (formData as any)._original_payment_status === 'en_attente' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Moyen de paiement</label>
                      <select
                        value={formData.payment_method}
                        onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold appearance-none"
                      >
                        <option value="virement">🏦 Virement bancaire</option>
                        <option value="liquide">💵 Espèces / Liquide</option>
                      </select>
                    </div>
                  )}
                </div>

                {formData.payment_status === 'a_jour' && (formData as any)._original_payment_status === 'en_attente' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Montant perçu (EUR)</label>
                    <input
                      type="number"
                      placeholder="Ex: 150"
                      value={formData.amount_paid}
                      onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-ishes-green transition-all text-sm font-bold"
                    />
                  </div>
                )}
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

      {/* MESSAGE MODAL */}
      {showMessageModal && selectedStudent && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#086b51]/10 rounded-2xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#086b51]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-ishes-dark tracking-tight">Message à {selectedStudent.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{selectedStudent.email}</p>
                </div>
              </div>
              <button onClick={() => setShowMessageModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {messageSent ? (
                <div className="flex flex-col items-center py-10 gap-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#086b51]" />
                  </div>
                  <p className="font-black text-[#086b51] uppercase tracking-widest text-sm">Message envoyé !</p>
                  <p className="text-xs text-gray-400 font-medium">{selectedStudent.name} le recevra dans sa messagerie.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Votre message</label>
                    <textarea
                      rows={5}
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder={`Écrivez votre message à ${selectedStudent.name}...`}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#086b51]/30 focus:ring-2 focus:ring-[#086b51]/10 transition-all text-sm font-medium resize-none"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ishes-outline" className="flex-1 h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]" onClick={() => setShowMessageModal(false)}>Annuler</Button>
                    <Button
                      variant="ishes"
                      className="flex-[2] h-12 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#086b51]/20"
                      disabled={messageSending || !messageContent.trim()}
                      onClick={handleSendMessageToStudent}
                    >
                      {messageSending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi...</> : <><Mail className="w-4 h-4 mr-2" />Envoyer</>}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHAT DRAWER */}
      {showMessageModal && selectedStudent && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Overlay */}
          <div className="flex-1 bg-ishes-dark/40 backdrop-blur-sm" onClick={() => setShowMessageModal(false)} />

          {/* Drawer */}
          <div className="w-full max-w-md bg-white flex flex-col h-full shadow-2xl">
            {/* Header */}
            <div className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 bg-[#086b51]/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-[#086b51]">{selectedStudent.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-ishes-dark tracking-tight truncate">{selectedStudent.name}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Élève · {selectedStudent.enrolledClass}</span>
                </div>
              </div>
              <button onClick={() => setShowMessageModal(false)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
              {chatLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-[#086b51]" />
                </div>
              ) : chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-300">
                  <Mail className="w-12 h-12 opacity-20" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Aucun échange pour le moment</p>
                  <p className="text-xs font-medium text-gray-400">Commencez la conversation ci-dessous</p>
                </div>
              ) : (
                chatHistory.map((msg, idx) => {
                  const isAdmin = msg.sender_id === 'admin_system';
                  return (
                    <div key={msg.id || idx} className={`flex gap-2.5 ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 self-end ${isAdmin ? 'bg-[#086b51] text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                        {isAdmin ? 'A' : selectedStudent.avatar}
                      </div>
                      <div className={`max-w-[75%]`}>
                        <div className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${isAdmin
                          ? 'bg-[#086b51] text-white rounded-br-md shadow-md shadow-[#086b51]/20'
                          : 'bg-white text-gray-700 border border-gray-100 rounded-bl-md shadow-sm'
                          }`}>
                          {msg.content}
                        </div>
                        <span className={`text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1 block px-1 ${isAdmin ? 'text-right' : 'text-left'
                          }`}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="bg-gray-50 rounded-2xl px-4 py-2 flex items-center gap-3 border border-gray-100 focus-within:border-[#086b51]/30 focus-within:ring-2 focus-within:ring-[#086b51]/10 transition-all">
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessageToStudent()}
                  placeholder={`Message à ${selectedStudent.name.split(' ')[0]}...`}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-2 placeholder:text-gray-400"
                  autoFocus
                />
                <button
                  onClick={handleSendMessageToStudent}
                  disabled={messageSending || !messageContent.trim()}
                  className="w-9 h-9 bg-[#086b51] text-white rounded-xl flex items-center justify-center shadow-md shadow-[#086b51]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 shrink-0"
                >
                  {messageSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden border border-gray-100 text-center flex flex-col items-center p-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-black text-ishes-dark mb-2">Désinscrire l'élève ?</h3>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer définitivement cet élève ? Cette action est irréversible et supprimera tout son historique (y compris son accès).
            </p>
            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1 rounded-xl h-12 border-gray-200 text-gray-600 font-bold" onClick={() => setShowDeleteConfirm(false)}>
                Annuler
              </Button>
              <Button variant="destructive" className="flex-1 rounded-xl h-12 font-bold" onClick={executeDeleteStudent} disabled={isDeletingStudent}>
                {isDeletingStudent ? <Loader2 className="w-5 h-5 animate-spin" /> : "Supprimer"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM ALERT MODAL */}
      {popupMsg && (
        <div className="fixed inset-0 bg-ishes-dark/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4" onClick={() => setPopupMsg(null)}>
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden border border-gray-100 text-center flex flex-col items-center p-8" onClick={e => e.stopPropagation()}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${popupMsg.type === 'success' ? 'bg-emerald-50' : 'bg-red-50'}`}>
              {popupMsg.type === 'success' ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-500" />
              )}
            </div>
            <h3 className="text-xl font-black text-ishes-dark mb-2">{popupMsg.title}</h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              {popupMsg.desc}
            </p>
            <Button variant={popupMsg.type === 'success' ? 'ishes' : 'outline'} className="w-full rounded-xl h-12 font-black tracking-widest uppercase text-xs" onClick={() => setPopupMsg(null)}>
              Compris
            </Button>
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
