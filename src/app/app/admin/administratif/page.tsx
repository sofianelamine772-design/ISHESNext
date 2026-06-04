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
                <h3 className="text-xl ishes-heading text-ishes-dark mb-2">Bientôt disponible</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
