import { AdminSidebar } from "@/components/AdminSidebar";
import { UserButton } from "@clerk/nextjs";
import { ArabicBackground } from "@/components/ArabicBackground";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar relative">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" />
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-blue truncate">Accueil</h1>
          </div>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9 md:w-10 md:h-10 border-2 border-ishes-blue p-[2px]",
              },
            }}
          />
        </header>

        <div className="relative flex-1 flex items-center justify-center p-6 md:p-10">
          <ArabicBackground />

          <div className="relative z-10 w-full max-w-3xl aspect-square max-h-[min(85vw,70vh)] bg-gradient-to-br from-[#0F172A] via-[#152233] to-[#086b51] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-white/10 flex flex-col items-center justify-center text-center px-8 md:px-16 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-ishes-gold/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-6 md:inset-8 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] pointer-events-none" />

            <p className="relative text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-ishes-gold mb-6">
              ISHEECOLE PRO
            </p>
            <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.15] tracking-tight max-w-xl">
              Bienvenue sur le logiciel de gestion de{" "}
              <span className="text-ishes-gold">ISHES</span>
            </h2>
            <p className="relative mt-6 text-sm md:text-base text-white/65 font-medium max-w-md leading-relaxed">
              Formations, élèves, facturation et administratif — tout est accessible depuis le menu.
            </p>
            <div className="relative mt-10 h-1 w-16 bg-ishes-gold rounded-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
