import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdministratifPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 flex-shrink-0 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" /> {/* Spacer for menu button */}
            <h1 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight truncate">Administratif</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-ishes-green p-[2px] bg-white cursor-pointer">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-xs md:text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-1">
          <div className="max-w-7xl mx-auto h-full">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-ishes-green/10 text-ishes-green rounded-3xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-ishes-dark mb-3">Module Administratif</h2>
              <p className="text-gray-400 max-w-md text-sm md:text-base font-medium">Cette page permettra de gérer les documents administratifs, conventions et dossiers d'inscription en toute simplicité.</p>
              <div className="mt-8 flex gap-3">
                <Button variant="ishes-outline" className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest">Voir les modèles</Button>
                <Button variant="ishes" className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest">Générer un document</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
