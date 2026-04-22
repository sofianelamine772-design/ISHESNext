"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, Search, Mail, Phone, MapPin, Calendar, CheckCircle2, GraduationCap, X, ChevronRight, Download, Plus, Loader2 } from "lucide-react";
import { fetchStudentsAction } from "@/app/actions/students";
import { LogoutButton } from "@/components/LogoutButton";

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

export default function EtudiantsPage() {
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
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
              enrolledClass: latestInscription?.formations?.title || "Non affecté",
              classType: "distanciel" as const, // Default, can be derived if needed
              status: latestInscription?.status || s.status || "en_attente",
              parentName: s.parent_first_name ? `${s.parent_first_name} ${s.parent_last_name || ''}`.trim() : null,
              address: "Adresse non renseignée",
              lastPayment: "N/A",
              paymentStatus: "a_jour" as const
            };
          });

          if (formatted.length > 0) {
            setStudents(formatted);
            setSelectedStudentId(formatted[0].id);
          } else {
            setStudents([]);
            setSelectedStudentId(null);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.enrolledClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId);

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
          <Link href="/app/admin/classes" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <BookOpen className="w-4 h-4" /> Formations & Classes
          </Link>
          <Link href="/app/admin/etudiants" className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold transition-colors">
            <Users className="w-4 h-4 text-ishes-green" /> Tous les Étudiants
          </Link>
          <Link href="/app/admin/facturation" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <CreditCard className="w-4 h-4" /> Facturation
          </Link>
          <Link href="/app/admin/administratif" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <FileText className="w-4 h-4" /> Administratif
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
            <h1 className="text-2xl ishes-heading text-ishes-dark">Base Étudiants</h1>
            <span className="px-3 py-1 bg-gray-50 text-ishes-dark text-[10px] font-black italic rounded-full border border-gray-100">
              {students.length} INSCRITS
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ishes" size="sm" className="h-10">
              <Plus className="w-4 h-4 mr-1" /> Inscrire Élève
            </Button>
            <div className="w-10 h-10 rounded-full border-2 border-ishes-green p-[2px] bg-white cursor-pointer shadow-lg shadow-ishes-green/10">
              <div className="w-full h-full bg-gray-50 rounded-full flex items-center justify-center font-black italic text-ishes-dark text-sm">
                AD
              </div>
            </div>
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
          <div className="w-[400px] bg-white border-r border-gray-50 flex flex-col shrink-0 relative z-0">
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
          <div className="flex-1 bg-gray-50/50 flex flex-col p-6 overflow-hidden relative">
            {selectedStudent ? (
              <div className="h-full bg-white rounded-3xl shadow-sm border border-gray-200 overflow-y-auto flex flex-col relative custom-scrollbar">

                {/* Profile Cover & Header */}
                <div className="h-32 bg-ishes-dark relative rounded-t-3xl overflow-hidden shrink-0">
                   <div className="absolute inset-0 bg-gradient-to-r from-ishes-green/20 to-transparent"></div>
                  {/* Status Badge Top Right */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {selectedStudent.status === 'actif' && (
                      <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-[10px] font-black italic shadow-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> DOSSIER VALIDÉ
                      </span>
                    )}
                    {selectedStudent.status !== 'actif' && (
                      <span className="bg-amber-400/20 backdrop-blur-md border border-amber-400/20 text-amber-400 px-3 py-1 rounded-full text-[10px] font-black italic shadow-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> EN ATTENTE
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-8 pb-8 flex-1">
                  {/* Identity Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-12 gap-6">
                    <div className="flex items-end gap-6">
                      <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-2xl shadow-black/10 border border-gray-50">
                        <div className="w-full h-full bg-ishes-dark rounded-2xl flex items-center justify-center text-4xl ishes-heading text-white">
                          {selectedStudent.avatar}
                        </div>
                      </div>
                      <div className="pb-2">
                        <span className="ishes-label mb-1 block opacity-40">Documentation Élève</span>
                        <h2 className="text-4xl ishes-heading text-ishes-dark leading-none">{selectedStudent.name}</h2>
                        <p className="text-sm font-black italic text-ishes-green mt-2">INSCRIT LE {selectedStudent.dateJoined.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pb-2">
                      <Button variant="ishes-outline" size="sm" className="h-11">
                        Modifier Infos
                      </Button>
                      <Button variant="ishes" size="sm" className="h-11 shadow-ishes-green/20">
                        <Mail className="w-4 h-4 mr-2" /> Message
                      </Button>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Info Card */}
                    <div className="flex flex-col">
                      <h3 className="ishes-label mb-8 bg-ishes-green text-white self-start px-3 py-1 rounded-md">Coordonnées</h3>
                      <div className="space-y-6">
                        <div className="flex flex-col">
                          <span className="ishes-label text-[9px] opacity-40 mb-1">Email Personnel</span>
                          <span className="ishes-heading text-lg text-ishes-dark">{selectedStudent.email}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ishes-label text-[9px] opacity-40 mb-1">Téléphone</span>
                          <span className="ishes-heading text-lg text-ishes-dark font-mono">{selectedStudent.phone}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ishes-label text-[9px] opacity-40 mb-1">Adresse de résidence</span>
                          <span className="ishes-heading text-sm text-ishes-dark">{selectedStudent.address.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Scolarité Info Card */}
                    <div className="flex flex-col">
                      <h3 className="ishes-label mb-8 bg-ishes-dark text-white self-start px-3 py-1 rounded-md">Scolarité</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between group">
                           <div className="flex flex-col">
                             <span className="ishes-label text-[9px] opacity-40 mb-1">Formation Actuelle</span>
                             <span className="ishes-heading text-lg text-ishes-green">{selectedStudent.enrolledClass}</span>
                           </div>
                           <Button variant="ghost" size="sm" className="ishes-label text-[10px] hover:bg-ishes-green/5">Modifier</Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="flex flex-col">
                             <span className="ishes-label text-[9px] opacity-40 mb-1">Dernier Règlement</span>
                             <span className="ishes-heading text-sm text-ishes-dark">{selectedStudent.lastPayment}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="ishes-label text-[9px] opacity-40 mb-1">Statut Financier</span>
                             <span className={`ishes-label text-[10px] mt-1 ${selectedStudent.paymentStatus === 'a_jour' ? 'text-ishes-green' : 'text-red-500'}`}>
                               {selectedStudent.paymentStatus === 'a_jour' ? 'COMPTE À JOUR' : 'IMPAYÉ'}
                             </span>
                           </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Accès Rapides Actions */}
                  <div className="mt-16 pt-12 border-t border-gray-100">
                    <h3 className="ishes-label opacity-40 mb-6">Actions Administratives</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="ishes-outline" className="h-12 px-6">
                        <Download className="w-4 h-4 mr-2" /> Certificat Scolarité
                      </Button>
                      <Button variant="ishes-outline" className="h-12 px-6">
                        <CreditCard className="w-4 h-4 mr-2" /> Envoyer Lien Paiement
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-100 text-center p-8">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Users className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-2xl ishes-heading text-ishes-dark mb-2">Profil Étudiant</h3>
                <p className="ishes-label opacity-40 max-w-sm">Sélectionnez un étudiant pour visualiser son dossier complet.</p>
              </div>
            )}

            {/* Mobile close button if needed */}
            {selectedStudent && (
              <button
                onClick={() => setSelectedStudentId(null)}
                className="lg:hidden absolute top-8 right-8 w-10 h-10 bg-ishes-dark text-white rounded-full flex items-center justify-center shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
