import Link from "next/link";
import { LogOut, Video, PlayCircle, FileText, MessageCircle, GraduationCap } from "lucide-react";

export default function AccueilEleve() {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#152233] rounded-lg flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black italic tracking-tight text-[#152233]">
            ISHEE<span className="text-ishes-green">COLE</span>
          </span>
        </div>
        <Link href="/app" className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 hover:text-gray-600 transition-colors uppercase">
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-4 py-12">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-white shadow-xl shadow-gray-200/50 flex items-center justify-center overflow-hidden mb-2">
            <img 
               src="https://i.pravatar.cc/150?u=a042581f4e290267041" 
               alt="Profil" 
               className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-1">
             <h1 className="text-4xl md:text-[50px] font-black tracking-tight text-[#152233] leading-tight">
               Bonjour <span className="text-[#086b51]">Sofiane Elamine</span>,
             </h1>
             <p className="text-gray-400 text-lg font-medium italic">
               Voici votre interface élève ISHEECOLE.
             </p>
          </div>
          
          <div className="bg-gray-100 text-gray-500 rounded-full px-5 py-2 text-[10px] uppercase font-black tracking-widest mt-4">
             ARABE ADULTS (STANDARD)
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Card 1: Accès Direct */}
          <Link href="/app/eleve" className="group">
             <div className="bg-[#152233] rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-2xl shadow-gray-200 hover:scale-[1.02] transition-transform duration-300 h-[140px]">
                <div className="w-16 h-16 rounded-2xl bg-[#24334a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2c3d5a] transition-colors">
                   <Video className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                   <h2 className="text-white text-xl font-black italic tracking-wide mb-1">ACCÈS DIRECT</h2>
                   <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">Rejoindre le cours ZOOM</p>
                </div>
             </div>
          </Link>

          {/* Card 2: Mes Replays */}
          <Link href="/app/eleve" className="group">
             <div className="bg-white rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-xl shadow-gray-100/80 border border-gray-50 hover:scale-[1.02] transition-transform duration-300 h-[140px]">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                   <PlayCircle className="w-8 h-8 text-[#086b51]" />
                </div>
                <div>
                   <h2 className="text-[#152233] text-xl font-black italic tracking-wide mb-1">MES REPLAYS</h2>
                   <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">Visionner les cours passés</p>
                </div>
             </div>
          </Link>

          {/* Card 3: Supports PDF */}
          <Link href="/app/eleve" className="group">
             <div className="bg-white rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-xl shadow-gray-100/80 border border-gray-50 hover:scale-[1.02] transition-transform duration-300 h-[140px]">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                   <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                   <h2 className="text-[#152233] text-xl font-black italic tracking-wide mb-1">SUPPORTS PDF</h2>
                   <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">Manuels & exercices</p>
                </div>
             </div>
          </Link>

          {/* Card 4: Groupe Classe */}
          <Link href="/app/eleve" className="group">
             <div className="bg-white rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-xl shadow-gray-100/80 border border-gray-50 hover:scale-[1.02] transition-transform duration-300 h-[140px]">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                   <MessageCircle className="w-8 h-8 text-green-500" />
                </div>
                <div>
                   <h2 className="text-[#152233] text-xl font-black italic tracking-wide mb-1">GROUPE CLASSE</h2>
                   <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">Échanger sur WhatsApp</p>
                </div>
             </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-300 uppercase">
          Propulsé par ISHEECOLE Management
        </span>
      </footer>
    </div>
  );
}
