import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, UserPlus, FileCheck } from "lucide-react";
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
              <div className="lg:col-span-3 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl ishes-heading text-ishes-dark">Derniers paiements</h3>
                  <Link href="/app/admin/facturation" className="ishes-label text-ishes-green hover:underline">Voir tout</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-ishes-dark/10">
                        <th className="ishes-label py-4 pr-6">Élève</th>
                        <th className="ishes-label py-4 px-6">Date</th>
                        <th className="ishes-label py-4 px-6 text-right">Montant</th>
                        <th className="ishes-label py-4 pl-6 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {/* Row 1 */}
                      <tr className="group hover:bg-ishes-green/5 transition-colors">
                        <td className="py-5 pr-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-ishes-dark text-white flex items-center justify-center font-black italic text-xs shadow-lg shadow-ishes-dark/10">AD</div>
                            <span className="ishes-heading text-sm text-ishes-dark">Ali Dupont</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 font-medium text-gray-400 text-sm">18 AVR 2024</td>
                        <td className="py-5 px-6 font-black italic text-ishes-dark text-right">150,00 €</td>
                        <td className="py-5 pl-6 text-right">
                          <span className="ishes-label text-[10px] bg-ishes-green text-white px-2.5 py-1 rounded-md">Complété</span>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="group hover:bg-ishes-green/5 transition-colors">
                        <td className="py-5 pr-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-ishes-dark text-white flex items-center justify-center font-black italic text-xs shadow-lg shadow-ishes-dark/10">SM</div>
                            <span className="ishes-heading text-sm text-ishes-dark">Sarah Martin</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 font-medium text-gray-400 text-sm">17 AVR 2024</td>
                        <td className="py-5 px-6 font-black italic text-ishes-dark text-right">450,00 €</td>
                        <td className="py-5 pl-6 text-right">
                          <span className="ishes-label text-[10px] bg-ishes-green text-white px-2.5 py-1 rounded-md">Complété</span>
                        </td>
                      </tr>
                      {/* Row 3 */}
                      <tr className="group hover:bg-ishes-green/5 transition-colors">
                        <td className="py-5 pr-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-ishes-dark text-white flex items-center justify-center font-black italic text-xs shadow-lg shadow-ishes-dark/10">KY</div>
                            <span className="ishes-heading text-sm text-ishes-dark">Karim Yeles</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 font-medium text-gray-400 text-sm">15 AVR 2024</td>
                        <td className="py-5 px-6 font-black italic text-ishes-dark text-right">150,00 €</td>
                        <td className="py-5 pl-6 text-right">
                          <span className="ishes-label text-[10px] bg-gray-200 text-gray-600 px-2.5 py-1 rounded-md">En attente</span>
                        </td>
                      </tr>
                      {/* Row 4 */}
                      <tr className="group hover:bg-ishes-green/5 transition-colors">
                        <td className="py-5 pr-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-ishes-dark text-white flex items-center justify-center font-black italic text-xs shadow-lg shadow-ishes-dark/10">FL</div>
                            <span className="ishes-heading text-sm text-ishes-dark">Fatima Larbi</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 font-medium text-gray-400 text-sm">14 AVR 2024</td>
                        <td className="py-5 px-6 font-black italic text-ishes-dark text-right">220,00 €</td>
                        <td className="py-5 pl-6 text-right">
                          <span className="ishes-label text-[10px] bg-ishes-green text-white px-2.5 py-1 rounded-md">Complété</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
