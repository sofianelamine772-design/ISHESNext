import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, UserPlus, FileCheck } from "lucide-react";

export default function AdminOverview() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar - Admin */}
      <aside className="w-64 bg-[#152233] text-white flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/app" className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tight text-white">
              ISHEECOLE <span className="text-ishes-green text-sm not-italic align-top">PRO</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <Link href="/app/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold transition-colors">
            <LayoutDashboard className="w-4 h-4 text-ishes-green" /> Vue d'ensemble
          </Link>
          <Link href="/app/admin/classes" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors">
            <BookOpen className="w-4 h-4" /> Gestion des Classes
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

        <div className="p-4 border-t border-white/10">
          <Link href="/app" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-red-400 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <LogOut className="w-4 h-4" /> Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Vue d'ensemble</h1>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="outline" className="rounded-full shadow-sm font-semibold border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Exporter le rapport
            </Button>
            <div className="w-10 h-10 rounded-full border-2 border-ishes-green p-[2px] bg-white cursor-pointer">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Élèves inscrits</p>
                    <h3 className="text-3xl font-black text-gray-800">1,248</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +12%
                  </span>
                  <span className="text-gray-400 font-medium">ce mois-ci</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Revenus (Ce mois)</p>
                    <h3 className="text-3xl font-black text-gray-800">42,500 €</h3>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +5.2%
                  </span>
                  <span className="text-gray-400 font-medium">vs mois dernier</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Revenus (Année)</p>
                    <h3 className="text-3xl font-black text-gray-800">385,200 €</h3>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">
                    <TrendingUp className="w-3.5 h-3.5" /> En avance
                  </span>
                  <span className="text-gray-400 font-medium">sur l'objectif</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Dossiers finalisés</p>
                    <h3 className="text-3xl font-black text-gray-800">89%</h3>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <FileCheck className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-md">
                    <ArrowDownRight className="w-3.5 h-3.5" /> -2%
                  </span>
                  <span className="text-gray-400 font-medium">étudiants relancés</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Recent Activity / Payments */}
            {/* Middle Section: Recent Activity / Payments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                 <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-black text-gray-800">Derniers paiements reçus</h3>
                    <Link href="/app/admin/facturation" className="text-sm font-bold text-blue-600 hover:text-blue-700">Tout voir</Link>
                 </div>
                 <div className="flex-1 p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-bold border-b border-gray-100">Élève</th>
                          <th className="px-6 py-4 font-bold border-b border-gray-100">Date</th>
                          <th className="px-6 py-4 font-bold border-b border-gray-100">Montant</th>
                          <th className="px-6 py-4 font-bold border-b border-gray-100">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {/* Row 1 */}
                        <tr className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">AD</div>
                                 <span className="font-bold text-gray-800 text-sm">Ali Dupont</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-500">18 Avr 2024</td>
                           <td className="px-6 py-4 font-black text-gray-800">150,00 €</td>
                           <td className="px-6 py-4">
                              <span className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-200 rounded-lg text-xs font-bold inline-flex items-center">
                                 Complété
                              </span>
                           </td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">SM</div>
                                 <span className="font-bold text-gray-800 text-sm">Sarah Martin</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-500">17 Avr 2024</td>
                           <td className="px-6 py-4 font-black text-gray-800">450,00 €</td>
                           <td className="px-6 py-4">
                              <span className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-200 rounded-lg text-xs font-bold inline-flex items-center">
                                 Complété
                              </span>
                           </td>
                        </tr>
                        {/* Row 3 */}
                        <tr className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">KY</div>
                                 <span className="font-bold text-gray-800 text-sm">Karim Yeles</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-500">15 Avr 2024</td>
                           <td className="px-6 py-4 font-black text-gray-800">150,00 €</td>
                           <td className="px-6 py-4">
                              <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-xs font-bold inline-flex items-center">
                                 En attente
                              </span>
                           </td>
                        </tr>
                         {/* Row 4 */}
                         <tr className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">FL</div>
                                 <span className="font-bold text-gray-800 text-sm">Fatima Larbi</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-500">14 Avr 2024</td>
                           <td className="px-6 py-4 font-black text-gray-800">220,00 €</td>
                           <td className="px-6 py-4">
                              <span className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-200 rounded-lg text-xs font-bold inline-flex items-center">
                                 Complété
                              </span>
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
