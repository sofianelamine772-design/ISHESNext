"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, BookOpenText, CalendarDays, MessageSquareText, GraduationCap } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function EleveDashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Etudiant */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <Link href="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#086b51] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black italic tracking-tight text-[#086b51]">
              ISHEECOLE
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#086b51]/10 text-[#086b51] rounded-lg text-sm font-semibold transition-colors">
            <BookOpenText className="w-4 h-4" /> Mes Cours
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <CalendarDays className="w-4 h-4" /> Emploi du temps
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <MessageSquareText className="w-4 h-4" /> Messagerie
          </a>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <SignOutButton>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg text-sm font-medium transition-colors">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </SignOutButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-gray-800">Espace Étudiant</h1>
          <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden relative shadow-sm bg-gray-100 flex items-center justify-center">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Avatar étudiant" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-gray-400">{(user?.firstName?.[0] || 'U')}</span>
              )}
            </div>
            <div className="flex flex-col hidden md:flex">
              <span className="text-sm font-bold text-gray-800 leading-none mb-1">
                {user?.firstName} {user?.lastName?.[0]}.
              </span>
              <span className="text-[10px] font-bold text-[#086b51] uppercase tracking-wider leading-none">Étudiant Actif</span>
            </div>
          </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-emerald-50 text-[#086b51] rounded-2xl flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Espace Étudiant en construction</h2>
            <p className="text-gray-500 max-w-md">La structure (Sidebar latérale blanche, Topbar) est prête. Cet espace affichera bientôt les cours et l'évolution de l'élève.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
