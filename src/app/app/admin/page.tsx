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

          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center text-center px-4">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-ishes-blue/70 mb-6">
              ISHEECOLE PRO
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-[1.15] tracking-tight">
              Bienvenue sur le logiciel de gestion de{" "}
              <span className="text-ishes-blue">ISHES</span>
            </h2>
            <p className="mt-6 text-sm md:text-base text-black/70 font-medium max-w-md leading-relaxed">
              Formations, élèves, facturation et administratif — tout est accessible depuis le menu.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
