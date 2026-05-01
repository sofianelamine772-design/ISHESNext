import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, UserPlus, FileCheck, Terminal } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminOverview() {
  // Fetch stats directly on the server (much faster)
  const { count: totalStudents } = await supabaseAdmin
    .from('etudiants')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      {/* Sidebar - Admin */}
      <aside className="w-64 bg-[#152233] text-white flex flex-col flex-shrink-0 h-full">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/app" className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tight text-white">
              ISHEECOLE <span className="text-ishes-green text-sm not-italic align-top">PRO</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <Link href="/app/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold transition-colors">
            <LayoutDashboard className="w-4 h-4 text-ishes-green" /> Vue d'ensemble
          </Link>
          <Link href="/app/admin/classes" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <BookOpen className="w-4 h-4" /> Formations & Classes
          </Link>
          <Link href="/app/admin/etudiants" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <Users className="w-4 h-4" /> Tous les Étudiants
          </Link>
          <Link href="/app/admin/facturation" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <CreditCard className="w-4 h-4" /> Facturation
          </Link>
          <Link href="/app/admin/administratif" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <FileText className="w-4 h-4" /> Administratif
          </Link>
          <Link href="/app/admin/developpeur" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <Terminal className="w-4 h-4" /> Développeur
          </Link>

        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl ishes-heading text-ishes-dark">Vue d'ensemble</h1>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ishes-outline" size="sm" className="h-10">
              <FileText className="w-4 h-4 mr-1" /> Exporter Rapport
            </Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10 border-2 border-ishes-green p-[2px]"
                }
              }}
            />
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Card 1 */}
              <div className="group relative">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1">Élèves inscrits</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-4xl ishes-heading text-ishes-dark">{totalStudents || 0}</h3>
                    <span className="text-[10px] font-black italic text-ishes-green bg-ishes-green/5 px-2 py-0.5 rounded mb-1">+12%</span>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-green rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1">Revenus (Ce mois)</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-4xl ishes-heading text-ishes-dark">42,5K€</h3>
                    <span className="text-[10px] font-black italic text-ishes-green bg-ishes-green/5 px-2 py-0.5 rounded mb-1">+5.2%</span>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-dark rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1">Revenus (Année)</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-4xl ishes-heading text-ishes-dark">385K€</h3>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-green rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative">
                <div className="flex flex-col">
                  <p className="ishes-label text-ishes-green mb-1">Dossiers finalisés</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-4xl ishes-heading text-ishes-dark">89%</h3>
                    <span className="text-[10px] font-black italic text-gray-400 bg-gray-50 px-2 py-0.5 rounded mb-1">-2%</span>
                  </div>
                  <div className="mt-4 h-1 w-12 bg-ishes-dark rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>

            {/* Middle Section: Recent Activity / Payments */}
            {/* Middle Section: Recent Activity / Payments */}
            {/* Sales Overview Chart Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
              <div className="flex flex-col mb-12">
                <h3 className="text-2xl ishes-heading text-ishes-dark">Aperçu des Ventes</h3>
                <p className="text-sm font-medium text-gray-400 mt-1">Visualisation de vos revenus ce mois-ci.</p>
              </div>

              {/* Chart Container */}
              <div className="relative h-64 w-full mt-8">
                <div className="absolute inset-0 flex items-end justify-between gap-4">
                  {[
                    { month: 'Jan', value: 35 },
                    { month: 'Fev', value: 55 },
                    { month: 'Mar', value: 42 },
                    { month: 'Avr', value: 78 },
                    { month: 'Mai', value: 85 },
                    { month: 'Jun', value: 68 },
                    { month: 'Jul', value: 48 },
                    { month: 'Aou', value: 58 },
                    { month: 'Sep', value: 72 },
                    { month: 'Oct', value: 52 },
                    { month: 'Nov', value: 64 },
                    { month: 'Dec', value: 80 },
                  ].map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-4 group">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 bg-ishes-dark text-white text-[10px] font-bold rounded shadow-xl pointer-events-none">
                        {item.value}K€
                      </div>
                      
                      {/* Bar */}
                      <div 
                        className="w-full bg-[#E0E7FF] group-hover:bg-[#C7D2FE] transition-all duration-500 rounded-t-xl rounded-b-lg relative overflow-hidden"
                        style={{ height: `${item.value}%` }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      
                      {/* Label */}
                      <span className="text-[10px] font-black uppercase tracking-tight text-gray-400 group-hover:text-ishes-dark transition-colors">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Horizontal lines (Background) */}
                <div className="absolute inset-0 -z-10 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full border-t border-dashed border-gray-300"></div>
                  <div className="w-full border-t border-dashed border-gray-300"></div>
                  <div className="w-full border-t border-dashed border-gray-300"></div>
                  <div className="w-full border-t border-dashed border-gray-300"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
