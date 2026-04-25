import { Loader2, LayoutDashboard, BookOpen, Users, CreditCard, FileText, LogOut } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      {/* Skeleton Sidebar - Admin */}
      <aside className="w-64 bg-[#152233] text-white flex flex-col flex-shrink-0 h-full">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 opacity-50">
            <span className="text-xl font-black italic tracking-tight text-white">
              ISHEECOLE <span className="text-ishes-green text-sm not-italic align-top">PRO</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {/* Skeleton Nav Items */}
          {[LayoutDashboard, BookOpen, Users, CreditCard, FileText].map((Icon, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg opacity-50">
              <Icon className="w-4 h-4" /> 
              <div className="h-4 bg-white/20 rounded w-24 animate-pulse"></div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0 opacity-50">
           <div className="flex items-center gap-3 px-4 py-3">
              <LogOut className="w-4 h-4" />
              <div className="h-4 bg-white/20 rounded w-20"></div>
           </div>
        </div>
      </aside>

      {/* Main Content Loading Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="flex items-center gap-6">
            <div className="h-10 bg-gray-100 rounded w-32 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </header>

        <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
          {/* Central Loader */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-black/5 flex items-center justify-center mb-6">
               <Loader2 className="w-10 h-10 text-ishes-green animate-spin" />
            </div>
            <h2 className="text-xl ishes-heading text-ishes-dark mb-2">Chargement des données</h2>
            <p className="ishes-label text-gray-400">Connexion à la base de données ISHEECOLE...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
