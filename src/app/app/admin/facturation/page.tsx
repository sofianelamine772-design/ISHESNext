"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Search, Download, ChevronRight, CheckCircle2, 
  Calendar, X, Phone, Mail, History, GraduationCap, 
  AlertCircle, CreditCard, Filter
} from "lucide-react";
import { fetchPaymentsAction } from "@/app/actions/students";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

// Types
type Payment = {
   id: string;
   studentName: string;
   studentAvatar: string;
   email: string;
   phone: string;
   course: string;
   amount: string;
   date: string;
   status: "refuse" | "en_attente" | "paye";
   reason?: string;
   history: { date: string; amount: string; status: string }[];
};

export default function FacturationPage() {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState<"refuse" | "tous">("refuse");
   const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
   const [payments, setPayments] = useState<Payment[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const loadPayments = async () => {
         const result = await fetchPaymentsAction();
         if (result.success && result.data) {
            const formatted = result.data.map((p: any) => {
               const etudiant = Array.isArray(p.etudiants) ? p.etudiants[0] : p.etudiants;
               const inscription = Array.isArray(p.inscriptions) ? p.inscriptions[0] : p.inscriptions;
               const formation = Array.isArray(inscription?.classes) 
                  ? (Array.isArray(inscription.classes[0]?.formations) ? inscription.classes[0].formations[0] : inscription.classes[0]?.formations)
                  : (Array.isArray(inscription?.classes?.formations) ? inscription?.classes?.formations[0] : inscription?.classes?.formations);

               return {
                  id: p.id.slice(0, 8),
                  studentName: `${etudiant?.first_name || ''} ${etudiant?.last_name || ''}`.trim() || 'Inconnu',
                  studentAvatar: (etudiant?.first_name?.[0] || '') + (etudiant?.last_name?.[0] || '') || '?',
                  email: etudiant?.email || '',
                  phone: etudiant?.phone || '',
                  course: formation?.title || 'Formation',
                  amount: p.amount + " €",
                  date: new Date(p.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                  status: p.status === 'succeeded' ? 'paye' : p.status === 'failed' ? 'refuse' : 'en_attente',
                  reason: p.error_message || undefined,
                  history: []
               };
            });
            setPayments(formatted as Payment[]);
         }
         setLoading(false);
      };
      loadPayments();
   }, []);

   const filteredPayments = payments.filter(p => {
      const matchesSearch = p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "tous" || p.status === "refuse";
      return matchesSearch && matchesTab;
   });

   const totalRefused = payments.filter(p => p.status === "refuse").length;

   return (
      <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
         <AdminSidebar />

         {/* Main Content */}
         <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
            <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
               <div className="flex items-center gap-4">
                  <div className="w-10 lg:hidden" />
                  <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Facturation & Paiements</h1>
               </div>
               <div className="flex items-center gap-3 md:gap-6">
                  <Button variant="ishes-outline" size="sm" className="hidden sm:flex h-10">
                     <Download className="w-4 h-4 mr-1" /> <span className="hidden md:inline">Exporter Rapport</span>
                     <span className="md:hidden">Export</span>
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

                  {/* Header Stats / Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Paiements échoués</p>
                        <h3 className="text-2xl ishes-heading text-ishes-dark">{totalRefused}</h3>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-ishes-green/10 flex items-center justify-center text-ishes-green">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Toutes transactions</p>
                        <h3 className="text-2xl ishes-heading text-ishes-dark">{payments.length}</h3>
                      </div>
                    </div>
                    <div className="bg-ishes-dark p-6 rounded-3xl shadow-xl shadow-ishes-dark/10 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-ishes-green">
                        <Filter className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Filtrer par statut</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setActiveTab("refuse")}
                            className={cn(
                              "px-3 py-1 rounded-lg text-[10px] font-bold transition-all",
                              activeTab === "refuse" ? "bg-ishes-green text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                            )}
                          >
                            REFUSÉS
                          </button>
                          <button 
                            onClick={() => setActiveTab("tous")}
                            className={cn(
                              "px-3 py-1 rounded-lg text-[10px] font-bold transition-all",
                              activeTab === "tous" ? "bg-ishes-green text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                            )}
                          >
                            TOUS
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search & Main Table Card */}
                  <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                     <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <h2 className="text-xl ishes-heading text-ishes-dark">Historique des transactions</h2>
                        
                        <div className="relative w-full sm:w-auto">
                           <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                           <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Rechercher une facture..."
                              className="w-full sm:w-80 bg-gray-50/50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-ishes-green/5 focus:border-ishes-green transition-all font-medium"
                           />
                        </div>
                     </div>

                     {/* Table Content */}
                     <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                                 <th className="px-8 py-5 border-b border-gray-100">ID</th>
                                 <th className="px-8 py-5 border-b border-gray-100">Étudiant</th>
                                 <th className="px-8 py-5 border-b border-gray-100 text-center">Date</th>
                                 <th className="px-8 py-5 border-b border-gray-100 text-center">Montant</th>
                                 <th className="px-8 py-5 border-b border-gray-100 text-center">Statut</th>
                                 <th className="px-8 py-5 border-b border-gray-100">Motif</th>
                                 <th className="px-8 py-5 border-b border-gray-100 text-right">Action</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                               {loading ? (
                                  <tr>
                                     <td colSpan={7} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                           <div className="w-10 h-10 border-4 border-ishes-green border-t-transparent rounded-full animate-spin"></div>
                                           <p className="ishes-label text-ishes-green">Synchronisation avec Stripe...</p>
                                        </div>
                                     </td>
                                  </tr>
                               ) : filteredPayments.length > 0 ? (
                                  filteredPayments.map((payment) => (
                                     <tr key={payment.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-5 text-xs font-bold text-gray-400 tracking-tighter">#{payment.id}</td>
                                        <td className="px-8 py-5">
                                           <div className="flex items-center gap-3">
                                              <div className={cn(
                                                "w-9 h-9 rounded-xl flex items-center justify-center font-black text-[10px] shadow-sm transition-transform group-hover:scale-110",
                                                payment.status === 'refuse' ? 'bg-red-50 text-red-500' : 'bg-ishes-green/10 text-ishes-green'
                                              )}>
                                                 {payment.studentAvatar}
                                              </div>
                                              <div>
                                                 <div className="font-bold text-ishes-dark text-sm">{payment.studentName}</div>
                                                 <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">{payment.course}</div>
                                              </div>
                                           </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                           <span className="text-xs font-bold text-gray-500">{payment.date}</span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                           <span className="text-sm font-black text-ishes-dark">{payment.amount}</span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                           {payment.status === 'refuse' ? (
                                              <span className="px-3 py-1 bg-ishes-dark text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-ishes-dark/10">
                                                 REFUSÉ
                                              </span>
                                           ) : payment.status === 'paye' ? (
                                              <span className="px-3 py-1 bg-ishes-green text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-ishes-green/10">
                                                 PAYÉ
                                              </span>
                                           ) : (
                                              <span className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-yellow-500/10">
                                                 ATTENTE
                                              </span>
                                           )}
                                        </td>
                                        <td className="px-8 py-5">
                                           {payment.reason ? (
                                              <span className="text-[10px] font-bold text-red-500 italic max-w-[150px] truncate block">{payment.reason}</span>
                                           ) : (
                                              <span className="text-gray-200">——</span>
                                           )}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                           <button
                                              onClick={() => setSelectedPayment(payment)}
                                              className="w-8 h-8 rounded-full flex items-center justify-center text-ishes-dark/20 hover:text-ishes-green hover:bg-ishes-green/5 transition-all"
                                           >
                                              <ChevronRight className="w-5 h-5" />
                                           </button>
                                        </td>
                                     </tr>
                                  ))
                               ) : (
                                  <tr>
                                     <td colSpan={7} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center max-w-sm mx-auto">
                                          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                            <CheckCircle2 className="w-10 h-10 text-ishes-green/30" />
                                          </div>
                                          <h3 className="text-xl ishes-heading text-ishes-dark mb-2">Aucun incident détecté</h3>
                                          <p className="ishes-label text-[10px] md:text-xs opacity-40">
                                            {activeTab === 'refuse' 
                                              ? "Félicitations ! Aucun paiement n'a été refusé récemment."
                                              : "Aucune transaction ne correspond à vos critères de recherche."
                                            }
                                          </p>
                                        </div>
                                     </td>
                                  </tr>
                               )}
                           </tbody>
                        </table>
                     </div>
                  </div>

               </div>
            </div>
         </main>

         {/* Slide-Over Detail Panel */}
         {selectedPayment && (
            <>
               <div
                  className="fixed inset-0 bg-ishes-dark/40 backdrop-blur-sm z-[70] transition-opacity animate-in fade-in duration-300"
                  onClick={() => setSelectedPayment(null)}
               />
               <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-[80] transform flex flex-col transition-transform duration-500 ease-out border-l border-gray-100 animate-in slide-in-from-right overflow-hidden rounded-l-[3rem]">
                  
                  {/* Panel Header */}
                  <div className="bg-ishes-dark text-white p-10 relative overflow-hidden shrink-0">
                     <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-ishes-green blur-[120px] rounded-full" />
                     </div>
                     
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10">
                           <span className="text-[11px] font-black uppercase tracking-[0.4em] text-ishes-green">Détails de transaction</span>
                           <button onClick={() => setSelectedPayment(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                              <X className="w-5 h-5 text-white/40" />
                           </button>
                        </div>

                        <div className="flex items-center gap-6">
                           <div className="w-20 h-20 rounded-3xl bg-white p-1 shadow-2xl rotate-3">
                              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-[1.2rem] flex items-center justify-center font-black text-2xl text-ishes-dark">
                                 {selectedPayment.studentAvatar}
                              </div>
                           </div>
                           <div>
                              <h2 className="text-3xl ishes-heading text-white mb-1">{selectedPayment.studentName}</h2>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green bg-ishes-green/10 px-2 py-0.5 rounded">
                                  #{selectedPayment.id}
                                </span>
                                <span className="text-[10px] font-bold text-white/40">{selectedPayment.date}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Panel Content */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-10">
                     {/* Info Cards */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                          <p className="ishes-label text-[9px] opacity-40 mb-2">Statut Stripe</p>
                          <div className={cn(
                            "inline-flex px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase",
                            selectedPayment.status === 'refuse' ? 'bg-red-500 text-white' : 'bg-ishes-green text-white'
                          )}>
                            {selectedPayment.status === 'refuse' ? 'ÉCHOUÉ' : 'RÉUSSI'}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                          <p className="ishes-label text-[9px] opacity-40 mb-2">Montant</p>
                          <p className="text-xl ishes-heading text-ishes-dark">{selectedPayment.amount}</p>
                        </div>
                     </div>

                     {/* Contact */}
                     <div className="space-y-4">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-300">Coordonnées</h3>
                        <div className="space-y-3">
                           <div className="flex items-center gap-4 group">
                              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ishes-green/10 group-hover:text-ishes-green transition-colors">
                                <Phone className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-bold text-ishes-dark">{selectedPayment.phone}</span>
                           </div>
                           <div className="flex items-center gap-4 group">
                              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ishes-green/10 group-hover:text-ishes-green transition-colors">
                                <Mail className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-bold text-ishes-dark">{selectedPayment.email}</span>
                           </div>
                        </div>
                     </div>

                     {/* Incident Reason */}
                     {selectedPayment.status === 'refuse' && (
                        <div className="bg-ishes-dark rounded-[2rem] p-8 text-white relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10">
                              <AlertCircle className="w-12 h-12" />
                           </div>
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-ishes-green mb-4">Rapport d'erreur</h4>
                           <p className="text-sm font-medium text-white/80 leading-relaxed italic">
                             "{selectedPayment.reason || "Aucun motif spécifié par l'émetteur."}"
                           </p>
                        </div>
                     )}

                     {/* Timeline */}
                     <div className="space-y-6">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-300 flex items-center gap-2">
                           <History className="w-4 h-4" /> Parcours de paiement
                        </h3>
                        <div className="relative pl-6 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                           <div className="relative">
                              <div className={cn(
                                "absolute -left-[27px] top-1 w-[11px] h-[11px] rounded-full ring-4 ring-white shadow-sm",
                                selectedPayment.status === 'refuse' ? "bg-red-500" : "bg-ishes-green"
                              )} />
                              <div>
                                 <p className="text-xs font-black text-ishes-dark mb-1">Dernière tentative - {selectedPayment.date}</p>
                                 <p className="text-[10px] font-bold text-gray-400">Transaction #{selectedPayment.id}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Panel Footer */}
                  <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                     {selectedPayment.status === 'refuse' ? (
                        <>
                           <Button className="flex-1 bg-ishes-green hover:bg-ishes-green-hover shadow-xl shadow-ishes-green/20 h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-none">
                              Relancer l'élève
                           </Button>
                           <Button variant="ishes-outline" className="h-14 w-14 p-0 rounded-2xl flex items-center justify-center shrink-0">
                              <Mail className="w-5 h-5" />
                           </Button>
                        </>
                     ) : (
                        <Button className="flex-1 bg-ishes-dark hover:bg-ishes-dark-hover h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-none text-white">
                           Générer le reçu PDF
                        </Button>
                     )}
                  </div>
               </div>
            </>
         )}
      </div>
   );
}
