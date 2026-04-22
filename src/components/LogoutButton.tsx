
"use client";

import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <SignOutButton signOutOptions={{ redirectTo: "/sign-in" }}>
      <button className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:bg-white/5 hover:text-red-400 rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer border-none bg-transparent focus:outline-none">
        <LogOut className="w-4 h-4" /> 
        <span>Déconnexion</span>
      </button>
    </SignOutButton>
  );
}
