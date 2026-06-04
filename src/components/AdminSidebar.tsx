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
  MessageSquare,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/LogoutButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { label: "Vue d'ensemble", href: "/app/admin", icon: LayoutDashboard },
  { label: "Formations & Classes", href: "/app/admin/classes", icon: BookOpen },
  { label: "Messagerie & Com.", href: "/app/admin/communication", icon: MessageSquare },
  { label: "Tous les Étudiants", href: "/app/admin/etudiants", icon: Users },
  { label: "Facturation", href: "/app/admin/facturation", icon: CreditCard },
  { label: "Administratif", href: "/app/admin/administratif", icon: FileText },
  { label: "Développeur", href: "/app/admin/developpeur", icon: Terminal },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => {
    const arabicWatermarks = [
      { text: "ﷻ", size: "text-[160px]", top: "top-[2%]", right: "right-[-35px]", left: undefined, rotate: "rotate-[-10deg]", opacity: "opacity-[0.05]" },
      { text: "علم", size: "text-[100px]", top: "top-[25%]", left: "left-[-15px]", right: undefined, rotate: "rotate-[5deg]", opacity: "opacity-[0.045]" },
      { text: "نور", size: "text-[120px]", top: "top-[50%]", right: "right-[-25px]", left: undefined, rotate: "rotate-[15deg]", opacity: "opacity-[0.05]" },
      { text: "حكمة", size: "text-[95px]", top: "top-[75%]", left: "left-[-15px]", right: undefined, rotate: "rotate-[-8deg]", opacity: "opacity-[0.045]" },
    ];

    return (
      <div className="flex flex-col h-full bg-white text-ishes-dark relative overflow-hidden">
        {/* Arabic letters background watermark */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {arabicWatermarks.map((t, i) => (
            <span
              key={i}
              className={cn(
                "absolute leading-none font-serif font-black text-ishes-dark",
                t.size, t.top, t.left, t.right, t.rotate, t.opacity
              )}
              style={{ fontFamily: "serif" }}
            >
              {t.text}
            </span>
          ))}
        </div>

        <div className="h-20 flex items-center px-6 border-b border-ishes-dark/10 shrink-0 relative z-10">
          <Link href="/app" className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tight text-ishes-dark">
              ISHEECOLE <span className="text-ishes-green text-sm not-italic align-top">PRO</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
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
                    ? "bg-ishes-dark/10 border border-ishes-dark/15 text-ishes-dark shadow-sm"
                    : "text-ishes-dark/70 hover:bg-ishes-dark/5 hover:text-ishes-dark"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-ishes-green" : "")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ishes-dark/10 shrink-0 relative z-10">
          <LogoutButton className="flex items-center gap-3 px-4 py-3 w-full text-ishes-dark/70 hover:bg-ishes-dark/5 hover:text-red-600 rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer border-none bg-transparent focus:outline-none" />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden fixed top-5 left-6 z-[60]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <button className="p-2.5 bg-white border border-gray-200 text-ishes-dark rounded-xl shadow-sm active:scale-95 transition-transform">
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
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 text-ishes-dark flex-col flex-shrink-0 h-full">
        <SidebarContent />
      </aside>
    </>
  );
}
