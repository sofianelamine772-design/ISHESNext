"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  FileText, 
  Terminal,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/LogoutButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { label: "Vue d'ensemble", href: "/app/admin", icon: LayoutDashboard },
  { label: "Formations & Classes", href: "/app/admin/classes", icon: BookOpen },
  { label: "Tous les Étudiants", href: "/app/admin/etudiants", icon: Users },
  { label: "Facturation", href: "/app/admin/facturation", icon: CreditCard },
  { label: "Administratif", href: "/app/admin/administratif", icon: FileText },
  { label: "Développeur", href: "/app/admin/developpeur", icon: Terminal },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#152233] text-white">
      <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
        <Link href="/app" className="flex items-center gap-2">
          <span className="text-xl font-black italic tracking-tight text-white">
            ISHEECOLE <span className="text-ishes-green text-sm not-italic align-top">PRO</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                isActive 
                  ? "bg-white/10 border border-white/10 text-white" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-ishes-green" : "")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <LogoutButton />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden fixed top-5 left-6 z-[60]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger 
            render={
              <button className="p-2.5 bg-ishes-dark text-white rounded-xl shadow-xl shadow-ishes-dark/20 active:scale-95 transition-transform">
                <Menu className="w-5 h-5" />
              </button>
            }
          />
          <SheetContent side="left" className="p-0 border-none w-72">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#152233] text-white flex-col flex-shrink-0 h-full">
        <SidebarContent />
      </aside>
    </>
  );
}
