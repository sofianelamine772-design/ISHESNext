"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, Search, Mail, Phone, MapPin, Calendar, CheckCircle2, GraduationCap, X, ChevronRight, Download, Plus } from "lucide-react";

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
  status: "actif" | "inactif" | "en_attente";
  address: string;
  lastPayment: string;
  paymentStatus: "a_jour" | "en_retard";
};

// Mock Data
const MOCK_STUDENTS: StudentDetail[] = [
  { id: "s1", name: "Ali Dupont", email: "ali.dupont@email.com", phone: "+33 6 12 34 56 78", avatar: "AD", dateJoined: "12 Septembre 2023", enrolledClass: "Arabe Niveau 1", classType: "distanciel", status: "actif", address: "15 Rue de Paris, 75011", lastPayment: "18 Avr 2024", paymentStatus: "a_jour" },
  { id: "s2", name: "Sarah Martin", email: "sarah.m@email.com", phone: "+33 6 23 45 67 89", avatar: "SM", dateJoined: "14 Septembre 2023", enrolledClass: "Arabe Niveau 1", classType: "distanciel", status: "actif", address: "42 Avenue Jean Jaurès, 69007 Lyon", lastPayment: "17 Avr 2024", paymentStatus: "a_jour" },
  { id: "s3", name: "Karim Yeles", email: "kyeles@email.com", phone: "+33 6 34 56 78 90", avatar: "KY", dateJoined: "15 Septembre 2023", enrolledClass: "Arabe Niveau 1", classType: "distanciel", status: "en_attente", address: "8 Rue des Lilas, 13008 Marseille", lastPayment: "15 Avr 2024", paymentStatus: "en_retard" },
  { id: "s4", name: "Mohamed Benali", email: "m.benali@email.com", phone: "+33 6 45 67 89 01", avatar: "MB", dateJoined: "10 Septembre 2023", enrolledClass: "Arabe Niveau 2", classType: "distanciel", status: "actif", address: "120 Boulevard de la Villette, 75019 Paris", lastPayment: "01 Avr 2024", paymentStatus: "a_jour" },
  { id: "s6", name: "Fatima Larbi", email: "fatima.l@email.com", phone: "+33 6 56 78 90 12", avatar: "FL", dateJoined: "08 Septembre 2023", enrolledClass: "Arabe Niveau 1", classType: "presentiel", status: "actif", address: "5 Allée des Peupliers, 93100 Montreuil", lastPayment: "14 Avr 2024", paymentStatus: "a_jour" },
  { id: "s7", name: "Omar Bouzid", email: "omar.b@email.com", phone: "+33 6 67 89 01 23", avatar: "OB", dateJoined: "09 Septembre 2023", enrolledClass: "Arabe Niveau 1", classType: "presentiel", status: "actif", address: "78 Rue Nationale, 59000 Lille", lastPayment: "05 Avr 2024", paymentStatus: "a_jour" },
  { id: "s10", name: "Nassim Ziani", email: "nassim.z@email.com", phone: "+33 6 78 90 12 34", avatar: "NZ", dateJoined: "05 Septembre 2023", enrolledClass: "Coran Débutant", classType: "presentiel", status: "inactif", address: "34 Impasse verte, 31000 Toulouse", lastPayment: "10 Jan 2024", paymentStatus: "en_retard" },
];

export default function EtudiantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.enrolledClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar - Admin */}
      <aside className="w-64 bg-[#152233] text-white flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/app" className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tight text-white">
              ISHEECOLE <span className="text-ishes-green text-sm not-italic align-top">PRO</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <Link href="/app/admin" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Vue d'ensemble
          </Link>
          <Link href="/app/admin/classes" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <BookOpen className="w-4 h-4" /> Gestion des Classes
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

        <div className="p-4 border-t border-white/10">
          <Link href="/app" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-red-400 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <LogOut className="w-4 h-4" /> Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Base Étudiants</h1>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold border border-gray-200">
              {MOCK_STUDENTS.length} inscrits
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md font-semibold flex items-center gap-2">
              <Plus className="w-4 h-4" /> Inscrire un élève
            </Button>
            <div className="w-10 h-10 rounded-full border-2 border-ishes-green p-[2px] bg-white cursor-pointer">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Split */}
        <div className="flex-1 overflow-hidden flex">
          
          {/* Left Pane - Students List */}
          <div className="w-[400px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0 relative z-0">
            <div className="p-4 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par nom, email, classe..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border block ${
                      selectedStudentId === student.id
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full border flex flex-shrink-0 items-center justify-center font-black text-sm
                        ${selectedStudentId === student.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-600 border-gray-200'}
                      `}>
                        {student.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <h3 className="font-bold text-gray-900 truncate">{student.name}</h3>
                           {student.status === "actif" && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                           {student.status === "en_attente" && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                           {student.status === "inactif" && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                        </div>
                        <p className="text-xs text-gray-500 truncate mb-1.5">{student.email}</p>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md truncate">
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
              <div className="h-full bg-white rounded-3xl shadow-sm border border-gray-200 overflow-y-auto flex flex-col relative">
                
                {/* Profile Cover & Header */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative rounded-t-3xl">
                   {/* Status Badge Top Right */}
                   <div className="absolute top-4 right-4">
                      {selectedStudent.status === 'actif' && (
                        <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Dossier validé
                        </span>
                      )}
                      {selectedStudent.status === 'en_attente' && (
                        <span className="bg-amber-500/80 backdrop-blur-md border border-amber-400/50 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          En attente
                        </span>
                      )}
                   </div>
                </div>

                <div className="px-8 pb-8 relative flex-1">
                   {/* Avatar overlapping cover */}
                   <div className="flex justify-between items-end -mt-12 mb-6">
                      <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-md border border-gray-100">
                         <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-3xl font-black text-gray-700">
                           {selectedStudent.avatar}
                         </div>
                      </div>
                      <div className="flex gap-3">
                         <Button variant="outline" className="rounded-xl shadow-sm border-gray-200 hover:bg-gray-50">
                           Éditer le profil
                         </Button>
                         <Button className="rounded-xl shadow-sm bg-blue-600 hover:bg-blue-700">
                           <Mail className="w-4 h-4 mr-2" /> Contacter
                         </Button>
                      </div>
                   </div>

                   {/* Identity Name */}
                   <div className="mb-8">
                      <h2 className="text-3xl font-black text-gray-900 tracking-tight">{selectedStudent.name}</h2>
                      <p className="text-gray-500 font-medium">Inscrit le {selectedStudent.dateJoined}</p>
                   </div>

                   {/* Information Grid */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Contact Info Card */}
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Coordonnées</h3>
                         <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-700">
                               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                 <Mail className="w-4 h-4 text-blue-500" />
                               </div>
                               <span className="font-medium text-sm">{selectedStudent.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                 <Phone className="w-4 h-4 text-green-500" />
                               </div>
                               <span className="font-medium text-sm">{selectedStudent.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                 <MapPin className="w-4 h-4 text-red-500" />
                               </div>
                               <span className="font-medium text-sm">{selectedStudent.address}</span>
                            </div>
                         </div>
                      </div>

                      {/* Scolarité Info Card */}
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Scolarité & Paiements</h3>
                         <div className="space-y-4">
                            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                               <div className="flex items-center gap-3 text-gray-700">
                                 <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                   <GraduationCap className="w-4 h-4 text-indigo-500" />
                                 </div>
                                 <div className="text-sm">
                                    <p className="font-bold">{selectedStudent.enrolledClass}</p>
                                    <p className="text-xs text-gray-500 capitalize">{selectedStudent.classType}</p>
                                 </div>
                               </div>
                               <Button size="sm" variant="ghost" className="text-blue-600 text-xs font-bold p-2 h-auto hover:bg-blue-50">Changer</Button>
                            </div>

                            <div className="flex items-start gap-3 mt-4">
                               <div className="flex-1 space-y-1 text-sm">
                                  <div className="flex justify-between text-gray-500">
                                    <span>Dernier paiement</span>
                                    <span className="font-bold text-gray-800">{selectedStudent.lastPayment}</span>
                                  </div>
                                  <div className="flex justify-between items-center pt-2">
                                    <span className="text-gray-500">Statut financier</span>
                                    {selectedStudent.paymentStatus === 'a_jour' ? (
                                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">À jour</span>
                                    ) : (
                                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">En retard</span>
                                    )}
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                   </div>

                   {/* Accès Rapides Actions */}
                   <div className="mt-8">
                       <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Actions rapides</h3>
                       <div className="flex flex-wrap gap-3">
                           <Button variant="outline" className="rounded-xl border-gray-200 font-semibold gap-2">
                              <Download className="w-4 h-4" /> Certificat de scolarité
                           </Button>
                           <Button variant="outline" className="rounded-xl border-gray-200 font-semibold gap-2">
                              <CreditCard className="w-4 h-4" /> Envoyer lien de paiement
                           </Button>
                       </div>
                   </div>

                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-200 text-center p-8">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">Profil Étudiant</h3>
                <p className="text-gray-500/80 max-w-sm font-medium">Sélectionnez un étudiant dans la liste de gauche pour consulter son dossier complet.</p>
              </div>
            )}
            
            {/* Close detail pane on mobile (hypothetical functionality) */}
            {selectedStudent && (
              <button 
                onClick={() => setSelectedStudentId(null)}
                className="lg:hidden absolute top-10 right-10 w-10 h-10 bg-black/10 backdrop-blur text-white rounded-full flex items-center justify-center"
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
