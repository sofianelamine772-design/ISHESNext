import { Button } from "@/components/ui/button";
import { Download, Search, Filter } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { UserButton } from "@clerk/nextjs";
import { AdminScheduleGrid } from "@/components/admin/AdminScheduleGrid";
import { fetchClassesAction } from "@/app/actions/students";

export const dynamic = 'force-dynamic';

export default async function AdministratifPage() {
  const classesResult = await fetchClassesAction();
  const classes = classesResult.success ? (classesResult.data || []) : [];

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" />
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-blue truncate">Administratif</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Button variant="ishes-outline" size="sm" className="hidden sm:flex h-10">
              <Download className="w-4 h-4 mr-1" /> <span className="hidden md:inline">Archiver tout</span>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 md:w-10 md:h-10 border-2 border-ishes-blue p-[2px]"
                }
              }}
            />
          </div>
        </header>

        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Main Content Card */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-50/50">
                 <div>
                   <h2 className="text-xl ishes-heading text-ishes-blue">Gestion documentaire & Effectifs</h2>
                   <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Vue d'ensemble de l'institut</p>
                 </div>
                 
                 <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                       <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input
                          type="text"
                          placeholder="Rechercher..."
                          className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-ishes-blue transition-all shadow-sm"
                       />
                    </div>
                    <Button variant="ishes-outline" className="w-12 h-12 p-0 rounded-2xl shrink-0 bg-white shadow-sm border-gray-200">
                      <Filter className="w-5 h-5" />
                    </Button>
                 </div>
              </div>

              <div className="p-6 md:p-8">
                 <AdminScheduleGrid classes={classes} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
