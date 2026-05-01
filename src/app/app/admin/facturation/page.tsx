"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, BookOpen, Settings, CreditCard, FileText, Search, AlertCircle, TrendingDown, ArrowUpRight, CheckCircle2, ChevronRight, Download, MailWarning, Phone, Mail, History, Calendar, X, GraduationCap, Terminal } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import { fetchPaymentsAction } from "@/app/actions/students";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";

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
               // Handle Supabase potential array responses for joins
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
      <div className="min-h-screen bg-[#F8FAFC] flex relative overflow-hidden">
         <AdminSidebar />

         {/* Main Content */}
         <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto z-10 custom-scrollbar">
            <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 flex-shrink-0 shadow-sm sticky top-0 z-10">
               <div className="flex items-center gap-4">
                  <div className="w-10 lg:hidden" /> {/* Spacer for menu button */}
                  <h1 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight truncate">Facturation & Paiements</h1>
               </div>
               <div className="flex items-center gap-3 md:gap-6">
                  <Button variant="outline" className="hidden sm:flex rounded-full shadow-sm font-semibold border-gray-200 bg-white hover:bg-gray-50 items-center gap-2">
                     <Download className="w-4 h-4" /> Exporter <span className="hidden md:inline">Csv</span>
                  </Button>
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-ishes-green p-[2px] bg-white cursor-pointer">
                     <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-xs md:text-sm">
                        AD
                     </div>
                  </div>
               </div>
            </header>

            <div className="p-4 md:p-8">
               <div className="max-w-7xl mx-auto space-y-8">

                  {/* Filters & Table */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                     <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Tabs */}
                        <div className="flex p-1 bg-gray-100 rounded-xl">
                           <button
                              onClick={() => setActiveTab("refuse")}
                              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'refuse' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                           >
                              Paiements refusés ({totalRefused})
                           </button>
                           <button
                              onClick={() => setActiveTab("tous")}
                              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'tous' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                           >
                              Toutes les transactions
                           </button>
                        </div>

                        {/* Search */}
                        <div className="relative w-full sm:w-auto">
                           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                           <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Identifiant, nom de l'élève..."
                              className="w-full sm:w-80 bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ishes-green/20 focus:border-ishes-green transition-all font-medium"
                           />
                        </div>
                     </div>

                     {/* Table */}
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                           <thead>
                              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                                 <th className="px-6 py-4 font-bold border-b border-gray-100">ID Facture</th>
                                 <th className="px-6 py-4 font-bold border-b border-gray-100">Élève</th>
                                 <th className="px-6 py-4 font-bold border-b border-gray-100">Date</th>
                                 <th className="px-6 py-4 font-bold border-b border-gray-100">Montant</th>
                                 <th className="px-6 py-4 font-bold border-b border-gray-100">Statut</th>
                                 <th className="px-6 py-4 font-bold border-b border-gray-100">Motif (Si échoué)</th>
                                 <th className="px-6 py-4 font-bold border-b border-gray-100 text-right">Actions</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100">
                              {loading ? (
                                 <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                       <div className="flex flex-col items-center gap-2">
                                          <div className="w-8 h-8 border-4 border-ishes-green border-t-transparent rounded-full animate-spin"></div>
                                          <p className="font-bold text-gray-500">Chargement des transactions...</p>
                                       </div>
                                    </td>
                                 </tr>
                              ) : filteredPayments.length > 0 ? (
                                 filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                       <td className="px-6 py-5 text-sm font-semibold text-gray-500">#{payment.id}</td>
                                       <td className="px-6 py-5">
                                          <div className="flex items-center gap-3">
                                             <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${payment.status === 'refuse' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {payment.studentAvatar}
                                             </div>
                                             <div>
                                                <div className="font-bold text-gray-900 text-sm">{payment.studentName}</div>
                                                <div className="text-xs text-gray-500">{payment.course}</div>
                                             </div>
                                          </div>
                                       </td>
                                       <td className="px-6 py-5 text-sm text-gray-600">{payment.date}</td>
                                       <td className="px-6 py-5 font-black text-gray-900">{payment.amount}</td>
                                       <td className="px-6 py-5">
                                          {payment.status === 'refuse' ? (
                                             <span className="px-2.5 py-1 bg-black text-white border border-black rounded-lg text-xs font-bold inline-flex items-center">
                                                Refusé
                                             </span>
                                          ) : payment.status === 'paye' ? (
                                             <span className="px-2.5 py-1 bg-ishes-green/10 text-ishes-green border border-ishes-green/20 rounded-lg text-xs font-bold inline-flex items-center">
                                                Complété
                                             </span>
                                          ) : (
                                             <span className="px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg text-xs font-bold inline-flex items-center">
                                                En attente
                                             </span>
                                          )}
                                       </td>
                                       <td className="px-6 py-5 text-sm">
                                          {payment.reason ? (
                                             <span className="text-red-500 font-medium">{payment.reason}</span>
                                          ) : (
                                             <span className="text-gray-300">-</span>
                                          )}
                                       </td>
                                       <td className="px-6 py-5 text-right">
                                          <Button
                                             onClick={() => setSelectedPayment(payment)}
                                             variant="ghost"
                                             size="sm"
                                             className="font-semibold text-ishes-green hover:text-ishes-green-hover hover:bg-ishes-green/10"
                                          >
                                             Voir <ChevronRight className="w-4 h-4 ml-1" />
                                          </Button>
                                       </td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                       <CheckCircle2 className="w-12 h-12 mx-auto text-green-200 mb-3" />
                                       <p className="font-semibold text-gray-600">Aucun paiement refusé trouvé !</p>
                                       <p className="text-sm mt-1">Tout semble en ordre.</p>
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
               {/* Background Overlay */}
               <div
                  className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity"
                  onClick={() => setSelectedPayment(null)}
               />
               {/* Slide-Over Drawer */}
               <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 transform flex flex-col transition-transform duration-300 ease-in-out border-l border-gray-200">
                  {/* Drawer Header */}
                  <div className="bg-[#152233] text-white p-8 relative overflow-hidden">
                     {/* Decorative Background Element */}
                     <div className="absolute -top-24 -right-24 w-64 h-64 bg-ishes-green/10 blur-[80px] rounded-full" />
                     
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ishes-green">Documentation élève</span>
                           <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                              <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                              <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                                 {selectedPayment.status === 'paye' ? 'Complété' : selectedPayment.status === 'refuse' ? 'Échoué' : 'En attente'}
                              </span>
                           </div>
                        </div>

                        <div className="flex items-end gap-6">
                           <div className="w-24 h-24 rounded-[2rem] bg-white p-1 shadow-2xl">
                              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-[1.8rem] flex items-center justify-center font-black text-3xl text-[#152233]">
                                 {selectedPayment.studentAvatar}
                              </div>
                           </div>
                           <div className="flex-1 pb-2">
                              <h2 className="text-3xl font-black text-white tracking-tight mb-1">{selectedPayment.studentName}</h2>
                              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">ID Facture #{selectedPayment.id}</p>
                           </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                           <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl font-bold text-[10px] uppercase tracking-widest h-11">
                              Modifier Infos
                           </Button>
                           <Button className="flex-1 bg-white text-[#152233] hover:bg-gray-100 rounded-xl font-bold text-[10px] uppercase tracking-widest h-11 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5" /> Message
                           </Button>
                        </div>
                     </div>

                     <button onClick={() => setSelectedPayment(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-20">
                        <X className="w-5 h-5 text-white/40" />
                     </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8">
                     {/* Contact Details */}
                     <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Coordonnées de l'élève</h3>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">{selectedPayment.phone}</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">{selectedPayment.email}</span>
                           </div>
                        </div>
                     </div>

                     {/* Course Details & Payment Error */}
                     <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                           <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 text-ishes-green">
                                 <GraduationCap className="w-5 h-5" />
                                 <h4 className="font-bold text-gray-800">Scolarité concernée</h4>
                              </div>
                              <span className="font-black text-lg text-gray-900">{selectedPayment.amount}</span>
                           </div>
                           <p className="text-sm text-gray-600 mb-4 font-medium">{selectedPayment.course}</p>
                           {selectedPayment.status === 'refuse' && (
                              <div className="bg-black border border-gray-800 rounded-xl p-4 mt-2">
                                 <div className="flex items-center gap-2 mb-1">
                                    <AlertCircle className="w-4 h-4 text-white" />
                                    <span className="font-bold text-white text-sm">Paiement Échoué</span>
                                 </div>
                                 <p className="text-sm text-gray-400">Motif renvoyé par Stripe : <strong className="font-bold text-white">{selectedPayment.reason}</strong></p>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* History */}
                     <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <History className="w-4 h-4" /> Historique des paiements
                        </h3>
                        <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-gray-200">
                           {/* Current Transaction */}
                           <div className="relative pl-8">
                              <div className={`absolute left-0 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center ${selectedPayment.status === 'refuse' ? 'bg-black' : 'bg-ishes-green'}`}></div>
                              <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                                 <div className="flex justify-between text-sm mb-1">
                                    <span className="font-bold text-gray-800">{selectedPayment.date}</span>
                                    <span className="font-bold">{selectedPayment.amount}</span>
                                 </div>
                                 <p className={`text-xs font-semibold ${selectedPayment.status === 'refuse' ? 'text-black' : 'text-ishes-green'}`}>
                                    {selectedPayment.status === 'refuse' ? 'Tenu en échec' : 'Complété'}
                                 </p>
                              </div>
                           </div>

                           {/* Past successful transactions */}
                           {selectedPayment.history.map((hist, idx) => (
                              <div key={idx} className="relative pl-8">
                                 <div className="absolute left-0 w-6 h-6 rounded-full border-4 border-white bg-ishes-green flex items-center justify-center"></div>
                                 <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                                    <div className="flex justify-between text-sm mb-1">
                                       <span className="font-semibold text-gray-600">{hist.date}</span>
                                       <span className="font-bold text-gray-700">{hist.amount}</span>
                                    </div>
                                    <p className="text-xs font-semibold text-ishes-green">Complété</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                     {selectedPayment.status === 'refuse' ? (
                        <>
                           <Button className="flex-1 bg-ishes-green hover:bg-ishes-green-hover shadow-md font-bold rounded-xl text-sm border-none">
                              Relancer par Email
                           </Button>
                           <Button variant="outline" className="flex-1 border-gray-300 font-bold rounded-xl text-sm hover:bg-black hover:text-white">
                              Copier le lien
                           </Button>
                        </>
                     ) : (
                        <Button className="flex-1 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 shadow-sm font-bold rounded-xl text-sm">
                           Générer la facture
                        </Button>
                     )}
                  </div>
               </div>
            </>
         )}

         <div className="p-4 border-t border-white/10 shrink-0 hidden prose-sidebar-footer">
            <LogoutButton />
         </div>
      </div>
   );
}
