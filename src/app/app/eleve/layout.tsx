"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LogOut, 
  BookOpenText, 
  CalendarDays, 
  MessageSquareText, 
  GraduationCap,
  UserPlus,
  LayoutDashboard
} from "lucide-react";
import { useUser, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function EleveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const pathname = usePathname();

  const navItems = [
    { href: "/app/eleve", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/app/eleve/messagerie", label: "Messagerie", icon: MessageSquareText },
    { href: "/app/eleve/reinscription", label: "Réinscription", icon: UserPlus },
  ];

  const currentYear = new Date().getFullYear();
  const academicYear = new Date().getMonth() >= 7 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Etudiant (Desktop Only) */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 flex-col fixed inset-y-0 z-50">
        <div className="h-24 flex items-center px-8 border-b border-gray-100">
          <Link href="/app" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#086b51] rounded-xl flex items-center justify-center shadow-lg shadow-[#086b51]/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black italic tracking-tight text-[#086b51]">
              ISHEECOLE
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-[#086b51] text-white shadow-lg shadow-[#086b51]/20 translate-x-1" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100 mt-auto">
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 transition-all hover:bg-gray-100/50">
            <div className="flex items-center gap-3 min-w-0">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 rounded-xl shadow-sm border-2 border-white hover:scale-105 transition-transform",
                    userButtonTrigger: "focus:shadow-none focus:outline-none"
                  }
                }}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-gray-800 truncate">
                  {user?.firstName} {user?.lastName?.[0]}.
                </span>
                <span className="text-[10px] font-bold text-[#086b51] uppercase tracking-wider">Paramètres</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <SignOutButton>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                <LogOut className="w-4 h-4" /> Déconnexion
              </button>
            </SignOutButton>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:pl-72 pb-20 md:pb-0">
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              {navItems.find(i => i.href === pathname)?.label || "Espace Étudiant"}
            </h1>
            <p className="hidden md:block text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
              Bienvenue sur votre portail ISHES
            </p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
             <div className="bg-[#086b51]/5 text-[#086b51] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-[#086b51]/10">
                Année {academicYear}
             </div>
             <div className="md:hidden">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 rounded-lg shadow-sm border border-white",
                    }
                  }}
                />
             </div>
          </div>
        </header>

        <div className="p-4 md:p-10 flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-3 z-50 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? "text-[#086b51]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "text-[#086b51] drop-shadow-md" : ""}`} />
              <span className={`text-[9px] font-bold ${isActive ? "text-[#086b51]" : "text-gray-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
