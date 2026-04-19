"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, Monitor, School, Search, MoreVertical, Plus, ChevronRight, CreditCard, FileText } from "lucide-react";

// Types
type Student = { id: string; name: string; email: string; avatar: string; dateJoined: string };
type ClassDetails = { id: string; name: string; type: "distanciel" | "presentiel"; students: Student[] };

// Mock Data
const MOCK_CLASSES: ClassDetails[] = [
  {
    id: "d1",
    name: "Arabe Niveau 1",
    type: "distanciel",
    students: [
      { id: "s1", name: "Ali Dupont", email: "ali.dupont@email.com", avatar: "AD", dateJoined: "12 Sept 2023" },
      { id: "s2", name: "Sarah Martin", email: "sarah.m@email.com", avatar: "SM", dateJoined: "14 Sept 2023" },
      { id: "s3", name: "Karim Yeles", email: "kyeles@email.com", avatar: "KY", dateJoined: "15 Sept 2023" },
    ],
  },
  {
    id: "d2",
    name: "Arabe Niveau 2",
    type: "distanciel",
    students: [
      { id: "s4", name: "Mohamed Benali", email: "m.benali@email.com", avatar: "MB", dateJoined: "10 Sept 2023" },
      { id: "s5", name: "Leila Haddad", email: "leila.h@email.com", avatar: "LH", dateJoined: "12 Sept 2023" },
    ],
  },
  {
    id: "p1",
    name: "Arabe Niveau 1",
    type: "presentiel",
    students: [
      { id: "s6", name: "Fatima Larbi", email: "fatima.l@email.com", avatar: "FL", dateJoined: "08 Sept 2023" },
      { id: "s7", name: "Omar Bouzid", email: "omar.b@email.com", avatar: "OB", dateJoined: "09 Sept 2023" },
      { id: "s8", name: "Youssef Nouri", email: "y.nouri@email.com", avatar: "YN", dateJoined: "11 Sept 2023" },
      { id: "s9", name: "Amina Kacem", email: "amina.k@email.com", avatar: "AK", dateJoined: "11 Sept 2023" },
    ],
  },
  {
    id: "p2",
    name: "Coran Débutant",
    type: "presentiel",
    students: [
      { id: "s10", name: "Nassim Ziani", email: "nassim.z@email.com", avatar: "NZ", dateJoined: "05 Sept 2023" },
    ],
  },
];

export default function AdminDashboard() {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(MOCK_CLASSES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [classSearchQuery, setClassSearchQuery] = useState("");

  const distancielClasses = MOCK_CLASSES.filter((c) => c.type === "distanciel");
  const presentielClasses = MOCK_CLASSES.filter((c) => c.type === "presentiel");

  const filteredDistancielClasses = distancielClasses.filter(c =>
    c.name.toLowerCase().includes(classSearchQuery.toLowerCase())
  );

  const filteredPresentielClasses = presentielClasses.filter(c =>
    c.name.toLowerCase().includes(classSearchQuery.toLowerCase())
  );

  const selectedClass = MOCK_CLASSES.find((c) => c.id === selectedClassId);

  // Filter students based on search
  const filteredStudents = selectedClass?.students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Link href="/app/admin/classes" className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold transition-colors">
            <BookOpen className="w-4 h-4 text-ishes-green" /> Gestion des Classes
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
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Gestion des Classes</h1>
          </div>
          <div className="flex items-center gap-6">
            <Button className="bg-ishes-green hover:bg-green-600 text-white rounded-full shadow-md shadow-green-500/20 font-semibold flex items-center gap-2">
              <Plus className="w-4 h-4" /> Nouvelle Classe
            </Button>
            <div className="w-10 h-10 rounded-full border-2 border-ishes-green p-[2px] bg-white cursor-pointer">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content - 2 Column Layout */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Pane - Classes List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-0">
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

            <div className="flex-1 overflow-y-auto p-4 space-y-8">
              {/* Distanciel Section */}
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Distanciel</h3>
                  <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {filteredDistancielClasses.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {filteredDistancielClasses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClassId(c.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all border ${
                        selectedClassId === c.id
                          ? "bg-blue-50 border-blue-200 shadow-sm"
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

              {/* Présentiel Section */}
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <School className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Présentiel</h3>
                  <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {filteredPresentielClasses.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {filteredPresentielClasses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClassId(c.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all border ${
                        selectedClassId === c.id
                          ? "bg-green-50 border-green-200 shadow-sm"
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
              <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Class Header */}
                <div className="p-6 border-b border-gray-100 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedClass.type === 'distanciel' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-600'}`}>
                        {selectedClass.type === 'distanciel' ? <Monitor className="w-6 h-6" /> : <School className="w-6 h-6" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-gray-800">{selectedClass.name}</h2>
                        <p className="text-sm text-gray-500 capitalize flex items-center gap-1.5 mt-0.5">
                          <span className={`w-2 h-2 rounded-full ${selectedClass.type === 'distanciel' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                          Classe en {selectedClass.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="rounded-full shadow-sm hover:bg-gray-50 font-semibold border-gray-200">
                         Exporter PDF
                      </Button>
                      <Button className="rounded-full bg-gray-900 text-white hover:bg-gray-800 shadow-md font-semibold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Ajouter Élève
                      </Button>
                    </div>
                  </div>

                  {/* Search within class */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un élève dans cette classe..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all font-medium"
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-500 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
                      {filteredStudents?.length} élève(s)
                    </div>
                  </div>
                </div>

                {/* Students List */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
                  {filteredStudents && filteredStudents.length > 0 ? (
                    <div className="grid gap-3">
                      {filteredStudents.map((student) => (
                        <div key={student.id} className="group bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center font-bold text-gray-600 text-sm shrink-0">
                              {student.avatar}
                            </div>
                            <div>
                              <div className="font-bold text-gray-800">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Inscrit le</div>
                              <div className="font-semibold text-sm text-gray-700">{student.dateJoined}</div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
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
    </div>
  );
}
