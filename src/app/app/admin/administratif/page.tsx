import { Button } from "@/components/ui/button";
import { FileText, Download, Plus, Search, Filter, FileCheck, FileClock } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { UserButton } from "@clerk/nextjs";

export default function AdministratifPage() {
  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" />
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Administratif</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Button variant="ishes-outline" size="sm" className="hidden sm:flex h-10">
              <Download className="w-4 h-4 mr-1" /> <span className="hidden md:inline">Archiver tout</span>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 md:w-10 md:h-10 border-2 border-ishes-green p-[2px]"
                }
              }}
            />
          </div>
        </header>

        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-ishes-green/10 flex items-center justify-center text-ishes-green">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Documents validés</p>
                  <h3 className="text-2xl ishes-heading text-ishes-dark">124</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-500">
                  <FileClock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">En attente</p>
                  <h3 className="text-2xl ishes-heading text-ishes-dark">12</h3>
                </div>
              </div>
              <div className="bg-ishes-dark p-6 rounded-3xl shadow-xl shadow-ishes-dark/10 flex items-center justify-center">
                <Button className="w-full h-12 bg-ishes-green hover:bg-ishes-green-hover text-white rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center gap-2 border-none">
                  <Plus className="w-4 h-4" /> Nouveau document
                </Button>
              </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
              <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div>
                   <h2 className="text-xl ishes-heading text-ishes-dark">Gestion documentaire</h2>
                   <p className="text-xs font-bold text-gray-300 mt-1 uppercase tracking-widest">Conventions, factures et certificats</p>
                 </div>
                 
                 <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                       <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input
                          type="text"
                          placeholder="Rechercher..."
                          className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-ishes-green transition-all"
                       />
                    </div>
                    <Button variant="ishes-outline" className="w-12 h-12 p-0 rounded-2xl shrink-0">
                      <Filter className="w-5 h-5" />
                    </Button>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
                  <FileText className="w-10 h-10 text-ishes-green/20" />
                </div>
                <h3 className="text-xl ishes-heading text-ishes-dark mb-2">Aucun document à afficher</h3>
                <p className="ishes-label text-[10px] md:text-xs opacity-40 max-w-sm">
                  Le module administratif est prêt à recevoir vos fichiers. Utilisez le bouton "Nouveau document" pour commencer l'archivage.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button variant="ishes-outline" className="h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Voir les modèles
                  </Button>
                  <Button className="h-11 px-6 bg-ishes-dark text-white hover:bg-ishes-dark-hover rounded-xl text-[10px] font-black uppercase tracking-widest border-none">
                    Générer un PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
