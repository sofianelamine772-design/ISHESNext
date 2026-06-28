"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, ChevronRight, CheckCircle2, 
  Calendar, X, Phone, Mail, History, 
  AlertCircle, CreditCard, Users, GraduationCap, UserCheck
} from "lucide-react";
import { fetchPaymentsAction, sendPaymentReminderWithLinkAction } from "@/app/actions/students";
import { Loader2 } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
type FamilyMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  inscription?: {
    status: string;
    paid_status: string;
    formations?: { title: string };
    classes?: { name: string; type: string };
  };
};

type Payment = {
  id: string;
  rawId: string;
  etudiantId?: string;
  payerName: string;
  payerAvatar: string;
  email: string;
  phone: string;
  course: string;
  amount: string;
  date: string;
  status: "refuse" | "en_attente" | "paye";
  reason?: string;
  familyMembers: FamilyMember[];
  isFamilyPayment: boolean;
};

export default function FacturationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"refuse" | "tous">("refuse");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const [popupMsg, setPopupMsg] = useState<{title: string, desc: string, type: "success"|"error"} | null>(null);

  useEffect(() => {
    const loadPayments = async () => {
      const result = await fetchPaymentsAction();
      if (result.success && result.data) {
        const formatted = result.data.map((p: any) => {
          const etudiant = Array.isArray(p.etudiants) ? p.etudiants[0] : p.etudiants;
          const inscription = Array.isArray(p.inscriptions) ? p.inscriptions[0] : p.inscriptions;
          const formation = inscription?.formations;

          const familyMembers: FamilyMember[] = p.familyMembers || [];
          const isFamilyPayment = familyMembers.length > 0;

          return {
            id: p.id.slice(0, 8),
            rawId: p.id,
            etudiantId: etudiant?.id || '',
            payerName: `${etudiant?.first_name || ''} ${etudiant?.last_name || ''}`.trim() || 'Inconnu',
            payerAvatar: ((etudiant?.first_name?.[0] || '') + (etudiant?.last_name?.[0] || '')) || '?',
            email: etudiant?.email || '',
            phone: etudiant?.phone || '',
            course: formation?.title || 'Formation',
            amount: p.amount + " €",
            date: new Date(p.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
            status: p.status === 'succeeded' ? 'paye' : p.status === 'failed' ? 'refuse' : 'en_attente',
            reason: p.error_message || undefined,
            familyMembers,
            isFamilyPayment,
          };
        });
        setPayments(formatted as Payment[]);
      }
      setLoading(false);
    };
    loadPayments();
  }, []);

  const filteredPayments = payments.filter(p => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = p.payerName.toLowerCase().includes(searchLower) ||
      p.id.toLowerCase().includes(searchLower) ||
      p.email.toLowerCase().includes(searchLower) ||
      p.familyMembers.some(m =>
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchLower)
      );
    const matchesTab = activeTab === "tous" || p.status === "refuse";
    return matchesSearch && matchesTab;
  });

  
  const handleRelance = async (paymentId: string) => {
    try {
      setIsSendingReminder(true);
      const res = await sendPaymentReminderWithLinkAction(paymentId);
      if (res.success) {
        setPopupMsg({ title: "Relance envoyée !", desc: "L'e-mail de relance contenant le lien de paiement a bien été envoyé.", type: "success" });
      } else {
        setPopupMsg({ title: "Erreur d'envoi", desc: res.error || "Une erreur est survenue.", type: "error" });
      }
    } catch (err: any) {
      setPopupMsg({ title: "Erreur inattendue", desc: "Impossible d'envoyer la relance.", type: "error" });
    } finally {
      setIsSendingReminder(false);
      setTimeout(() => setPopupMsg(null), 5000);
    }
  };

  const totalRefused = payments.filter(p => p.status === "refuse").length;
  const totalAmount = payments
    .filter(p => p.status === "paye")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);
  const familyPayments = payments.filter(p => p.isFamilyPayment).length;

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" />
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Facturation & Paiements</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 md:w-10 md:h-10 border-2 border-ishes-green p-[2px]" } }} />
          </div>
        </header>

        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* ── Stats ───────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Paiements échoués */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Échoués</p>
                  <h3 className="text-2xl ishes-heading text-ishes-dark">{totalRefused}</h3>
                </div>
              </div>

              {/* Toutes transactions */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-ishes-green/10 flex items-center justify-center text-ishes-green shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Transactions</p>
                  <h3 className="text-2xl ishes-heading text-ishes-dark">{payments.length}</h3>
                </div>
              </div>

              {/* Paiements familiaux */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Familiaux</p>
                  <h3 className="text-2xl ishes-heading text-ishes-dark">{familyPayments}</h3>
                </div>
              </div>

              {/* Revenus */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Encaissé</p>
                  <h3 className="text-2xl ishes-heading text-ishes-dark">{totalAmount.toFixed(0)} €</h3>
                </div>
              </div>
            </div>

            {/* ── Filtres ─────────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par nom, email, ID..."
                  className="w-full sm:w-96 bg-white border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-ishes-green/5 focus:border-ishes-green transition-all font-medium shadow-sm"
                />
              </div>
              <div className="flex gap-2">
                {(["refuse", "tous"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-5 py-2.5 rounded-2xl text-[11px] font-black tracking-widest transition-all",
                      activeTab === tab
                        ? "bg-ishes-green text-white shadow-xl shadow-ishes-green/20 scale-105"
                        : "bg-white text-gray-400 border border-gray-100 hover:border-ishes-green/20 hover:text-ishes-dark"
                    )}
                  >
                    {tab === "refuse" ? "REFUSÉS" : "TOUS"}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Table ───────────────────────────────────────────────── */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 md:px-8 py-5 border-b border-gray-50">
                <h2 className="text-xl ishes-heading text-ishes-dark">Historique des règlements</h2>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                  {filteredPayments.length} transaction{filteredPayments.length !== 1 ? 's' : ''} — 
                  les paiements familiaux couvrent tous les enfants inscrits
                </p>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                      <th className="px-6 py-4 border-b border-gray-100">ID</th>
                      <th className="px-6 py-4 border-b border-gray-100">Payeur</th>
                      <th className="px-6 py-4 border-b border-gray-100">Enfants couverts</th>
                      <th className="px-6 py-4 border-b border-gray-100 text-center">Date</th>
                      <th className="px-6 py-4 border-b border-gray-100 text-center">Montant</th>
                      <th className="px-6 py-4 border-b border-gray-100 text-center">Statut</th>
                      <th className="px-6 py-4 border-b border-gray-100 text-right">Détail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-ishes-green border-t-transparent rounded-full animate-spin" />
                            <p className="ishes-label text-ishes-green">Chargement des transactions...</p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <tr
                          key={payment.rawId}
                          className="hover:bg-gray-50/30 transition-colors group cursor-pointer"
                          onClick={() => setSelectedPayment(payment)}
                        >
                          {/* ID */}
                          <td className="px-6 py-5 text-xs font-bold text-gray-400 tracking-tighter whitespace-nowrap">
                            #{payment.id}
                          </td>

                          {/* Payeur */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center font-black text-[10px] shadow-sm shrink-0 transition-transform group-hover:scale-110",
                                payment.status === 'refuse' ? 'bg-red-50 text-red-500' : 'bg-ishes-green/10 text-ishes-green'
                              )}>
                                {payment.payerAvatar}
                              </div>
                              <div>
                                <div className="font-bold text-ishes-dark text-sm whitespace-nowrap">{payment.payerName}</div>
                                <div className="text-[10px] font-medium text-gray-400 truncate max-w-[160px]">{payment.email}</div>
                              </div>
                            </div>
                          </td>

                          {/* Enfants couverts */}
                          <td className="px-6 py-5">
                            {payment.isFamilyPayment ? (
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {payment.familyMembers.slice(0, 3).map((m, i) => (
                                    <div
                                      key={m.id}
                                      title={`${m.firstName} ${m.lastName}`}
                                      className="w-7 h-7 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-[9px] font-black text-blue-600 shadow-sm"
                                    >
                                      {m.firstName?.[0]}{m.lastName?.[0]}
                                    </div>
                                  ))}
                                  {payment.familyMembers.length > 3 && (
                                    <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] font-black text-gray-500">
                                      +{payment.familyMembers.length - 3}
                                    </div>
                                  )}
                                </div>
                                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg whitespace-nowrap">
                                  {payment.familyMembers.length} enfant{payment.familyMembers.length > 1 ? 's' : ''}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <UserCheck className="w-3.5 h-3.5 text-gray-300" />
                                <span className="text-[10px] font-medium text-gray-300">Individuel</span>
                              </div>
                            )}
                          </td>

                          {/* Date */}
                          <td className="px-6 py-5 text-center whitespace-nowrap">
                            <span className="text-xs font-bold text-gray-500">{payment.date}</span>
                          </td>

                          {/* Montant */}
                          <td className="px-6 py-5 text-center">
                            <span className="text-sm font-black text-ishes-dark">{payment.amount}</span>
                          </td>

                          {/* Statut */}
                          <td className="px-6 py-5 text-center">
                            {payment.status === 'refuse' ? (
                              <span className="px-3 py-1 bg-red-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">REFUSÉ</span>
                            ) : payment.status === 'paye' ? (
                              <span className="px-3 py-1 bg-ishes-green text-white rounded-lg text-[9px] font-black uppercase tracking-widest">RÉGLÉ</span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">ATTENTE</span>
                            )}
                          </td>

                          {/* Action */}
                          <td className="px-6 py-5 text-right">
                            <div className="w-8 h-8 rounded-full inline-flex items-center justify-center text-ishes-dark/20 group-hover:text-ishes-green group-hover:bg-ishes-green/5 transition-all">
                              <ChevronRight className="w-5 h-5" />
                            </div>
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
                                : "Aucune transaction ne correspond à vos critères."}
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

      {/* ── Popup / Toast ────────────────────────────────────────────── */}
      {popupMsg && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${popupMsg.type === 'success' ? 'bg-ishes-green/10 text-ishes-green' : 'bg-red-50 text-red-500'}`}>
              {popupMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-ishes-dark">{popupMsg.title}</h4>
              <p className="text-[11px] font-medium text-gray-500 mt-0.5 leading-relaxed">{popupMsg.desc}</p>
            </div>
            <button onClick={() => setPopupMsg(null)} className="ml-auto text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}


      {/* ── Slide-Over Détail ────────────────────────────────────────────── */}
      {selectedPayment && (
        <>
          <div
            className="fixed inset-0 bg-ishes-dark/40 backdrop-blur-sm z-[70] transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedPayment(null)}
          />
          <div className="fixed inset-y-0 right-0 w-full sm:w-[650px] bg-white shadow-2xl z-[80] flex flex-col transition-transform duration-500 ease-out border-l border-gray-100 animate-in slide-in-from-right overflow-hidden rounded-l-[3rem]">

            {/* Panel Header */}
            <div className="bg-white border-b border-gray-100 text-ishes-dark p-10 relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-ishes-green blur-[120px] rounded-full" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-ishes-green">
                    {selectedPayment.isFamilyPayment ? 'Règlement Familial' : 'Détails de transaction'}
                  </span>
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-gray-50 p-1 shadow-md border border-gray-100 shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-[1.2rem] flex items-center justify-center font-black text-2xl text-ishes-dark">
                        {selectedPayment.payerAvatar}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl ishes-heading text-ishes-dark mb-1">{selectedPayment.payerName}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green bg-ishes-green/10 px-2 py-0.5 rounded">
                          #{selectedPayment.id}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">{selectedPayment.date}</span>
                        {selectedPayment.isFamilyPayment && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {selectedPayment.familyMembers.length} enfant{selectedPayment.familyMembers.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedPayment.etudiantId && (
                    <Link href={`/app/admin/etudiants?id=${selectedPayment.etudiantId}`} className="shrink-0">
                      <Button variant="outline" className="h-10 px-5 rounded-2xl text-xs font-black uppercase tracking-widest bg-white text-ishes-dark hover:bg-gray-50 border border-gray-200">
                        Voir Profil
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">

              {/* Statut + Montant */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                  <p className="ishes-label text-[9px] opacity-40 mb-2">Statut</p>
                  <div className={cn(
                    "inline-flex px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase",
                    selectedPayment.status === 'refuse' ? 'bg-red-500 text-white' : 'bg-ishes-green text-white'
                  )}>
                    {selectedPayment.status === 'refuse' ? 'ÉCHOUÉ' : 'RÉGLÉ'}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                  <p className="ishes-label text-[9px] opacity-40 mb-2">Montant</p>
                  <p className="text-2xl ishes-heading text-ishes-dark">{selectedPayment.amount}</p>
                </div>
              </div>

              {/* Coordonnées payeur */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-300">Payeur</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ishes-green/10 group-hover:text-ishes-green transition-colors shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-ishes-dark">{selectedPayment.phone || '—'}</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ishes-green/10 group-hover:text-ishes-green transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-ishes-dark">{selectedPayment.email || '—'}</span>
                  </div>
                </div>
              </div>

              {/* ── Enfants couverts ─────────────────────────────────── */}
              {selectedPayment.isFamilyPayment && (
                <div className="space-y-4">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-300 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Enfants couverts par ce règlement
                  </h3>
                  <div className="space-y-3">
                    {selectedPayment.familyMembers.map((member) => {
                      const isPaid = member.inscription?.paid_status === 'paye';
                      return (
                        <div
                          key={member.id}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-2xl border transition-all",
                            isPaid
                              ? "bg-ishes-green/5 border-ishes-green/20"
                              : "bg-orange-50 border-orange-200"
                          )}
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1 pr-2">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center font-black text-[11px] shrink-0",
                              isPaid ? "bg-ishes-green text-white" : "bg-orange-100 text-orange-600"
                            )}>
                              {member.firstName?.[0]}{member.lastName?.[0]}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-black text-ishes-dark text-sm truncate">
                                {member.firstName} {member.lastName}
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium truncate">
                                {member.inscription?.formations?.title || 'Formation'} — {member.inscription?.classes?.name || ''}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 shrink-0">
                            <span className={cn(
                              "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg whitespace-nowrap",
                              isPaid ? "bg-ishes-green text-white" : "bg-orange-500 text-white"
                            )}>
                              {isPaid ? 'RÉGLÉ' : 'EN ATTENTE'}
                            </span>
                            <Link href={`/app/admin/etudiants?id=${member.id}`}>
                              <Button variant="outline" size="sm" className="h-8 px-3 rounded-xl border-gray-250 text-[10px] font-black uppercase tracking-wider text-ishes-dark hover:bg-gray-100">
                                Profil
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium bg-gray-50 rounded-xl p-3 border border-gray-100">
                    💡 Ce règlement unique de <strong>{selectedPayment.amount}</strong> couvre l'inscription de{' '}
                    <strong>{selectedPayment.familyMembers.length} enfant{selectedPayment.familyMembers.length > 1 ? 's' : ''}</strong>.
                  </p>
                </div>
              )}

              {/* Motif d'échec */}
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
              <div className="space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-300 flex items-center gap-2">
                  <History className="w-4 h-4" /> Parcours de paiement
                </h3>
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                  <div className="relative">
                    <div className={cn(
                      "absolute -left-[27px] top-1 w-[11px] h-[11px] rounded-full ring-4 ring-white shadow-sm",
                      selectedPayment.status === 'refuse' ? "bg-red-500" : "bg-ishes-green"
                    )} />
                    <div>
                      <p className="text-xs font-black text-ishes-dark mb-1">
                        {selectedPayment.status === 'paye' ? 'Règlement confirmé' : 'Tentative échouée'} — {selectedPayment.date}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400">Transaction #{selectedPayment.id}</p>
                      {selectedPayment.isFamilyPayment && (
                        <p className="text-[10px] font-bold text-blue-400 mt-0.5">
                          Couvre {selectedPayment.familyMembers.length} inscription{selectedPayment.familyMembers.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4">
              {selectedPayment.status === 'refuse' ? (
                <>
                  <Button disabled={isSendingReminder} onClick={() => handleRelance(selectedPayment.rawId)} className="flex-1 bg-ishes-green hover:bg-ishes-green-hover shadow-xl shadow-ishes-green/20 h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-none">
{isSendingReminder ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Relancer la famille
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
