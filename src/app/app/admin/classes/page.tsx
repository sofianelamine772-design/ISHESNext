"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, Monitor, School, Search, MoreVertical, Plus, ChevronRight, CreditCard, FileText } from "lucide-react";
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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { fetchClassesAction } = await import("@/app/actions/students");
        const result = await fetchClassesAction();
        if (result.success && result.data) {
          setClasses(result.data);
          if (result.data.length > 0) setSelectedClassId(result.data[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

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
            <Button variant="ishes" size="sm" className="h-10">
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
        <div className="flex-1 overflow-hidden flex">
          {/* Left Pane - Classes List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0">
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
                      <Button variant="ishes-outline" size="sm" className="h-10">
                        Exporter PDF
                      </Button>
                      <Button variant="ishes" size="sm" className="h-10">
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
                        <div key={student.id} className="group bg-white p-5 rounded-3xl border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-0.5 transition-all flex items-center justify-between cursor-pointer">
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
                                <button className="w-10 h-10 flex items-center justify-center text-ishes-dark/20 hover:text-ishes-green hover:bg-ishes-green/5 rounded-full transition-all">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
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
    </div>
  );
}
