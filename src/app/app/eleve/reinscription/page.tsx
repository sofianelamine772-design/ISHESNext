"use client";

import { useState, useEffect } from "react";
import { UserPlus, CheckCircle2, ArrowRight, ShieldCheck, CreditCard, Sparkles, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function ReinscriptionPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const isSuccess = searchParams.get("success") === "true";

  useEffect(() => {
    // Simulation de la récupération de la formation actuelle depuis Supabase
    const timer = setTimeout(() => {
      setCurrentCourse({
        id: "00000000-0000-0000-0000-000000000001", // ID fictif pour le test
        title: "Arabe Littéraire - Niveau 1",
        nextLevel: "Arabe Littéraire - Niveau 2",
        price: "349€",
        status: "Terminé avec succès",
        year: "2023-2024"
      });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    try {
      setPaying(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formationId: currentCourse.id,
          price: currentCourse.price,
          formationTitle: currentCourse.nextLevel,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Une erreur est survenue lors du lancement du paiement.');
    } finally {
      setPaying(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-8 text-center">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-gray-900 uppercase">Réinscription Réussie !</h2>
          <p className="text-gray-400 font-medium max-w-md">Bienvenue pour cette nouvelle année à l'ISHES. Votre dossier a été mis à jour automatiquement.</p>
        </div>
        <button 
          onClick={() => window.location.href = '/app/eleve'}
          className="bg-[#086b51] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#086b51]/20"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#086b51] animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Analyse de votre dossier académique...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Main Reinscription Card - Premium Redesign */}
      <div className="relative rounded-[3.5rem] p-12 md:p-16 shadow-2xl overflow-hidden group">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#111c18] z-0"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#086b51] rounded-full blur-[120px] opacity-20 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c8a96e] rounded-full blur-[120px] opacity-10 translate-x-1/3 translate-y-1/3 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-0 pointer-events-none"></div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#086b51]/20 border border-[#086b51]/30 text-[#086b51] backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#20d8a4]">Votre Prochaine Étape</span>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-100 to-gray-500">
                {currentCourse.nextLevel}
              </h3>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-gray-300 transform transition-transform hover:translate-x-2 duration-300">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#086b51] to-[#044a37] flex items-center justify-center shadow-lg shadow-[#086b51]/30 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold tracking-wide">Places réservées prioritairement</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 transform transition-transform hover:translate-x-2 duration-300 delay-75">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#086b51] to-[#044a37] flex items-center justify-center shadow-lg shadow-[#086b51]/30 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold tracking-wide">Accès immédiat aux nouveaux supports</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col items-start">
               <div className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl flex items-start gap-1">
                 {currentCourse.price.replace('€', '')}
                 <span className="text-3xl text-[#c8a96e] mt-1">€</span>
               </div>
               <div className="mt-2 inline-flex items-center gap-2">
                 <div className="h-[1px] w-8 bg-gradient-to-r from-[#c8a96e] to-transparent"></div>
                 <p className="text-[#c8a96e] text-[10px] font-black uppercase tracking-[0.2em]">Frais d'inscription inclus</p>
               </div>
            </div>
          </div>

          <div className="relative group/card">
            <div className="absolute inset-0 bg-gradient-to-b from-[#086b51] to-[#c8a96e] rounded-[3rem] blur-2xl opacity-20 group-hover/card:opacity-40 transition-opacity duration-500 -z-10"></div>
            <div className="bg-[#ffffff]/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-12 space-y-8 relative z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-white/20 transition-colors duration-500">
              <div className="flex flex-col items-center gap-2 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-black uppercase tracking-[0.3em] text-[11px]">Paiement Sécurisé</h4>
              </div>
              
              <div className="space-y-4">
                 <button 
                  onClick={handlePayment}
                  disabled={paying}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#086b51] to-[#0a8f6b] text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-[#086b51]/40 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                 >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    {paying ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Payer en une fois</>}
                 </button>
                 
                 <div className="relative flex items-center py-2">
                   <div className="flex-grow border-t border-white/10"></div>
                   <span className="flex-shrink-0 mx-4 text-white/30 text-[9px] font-bold uppercase tracking-widest">ou</span>
                   <div className="flex-grow border-t border-white/10"></div>
                 </div>

                 <button 
                  onClick={handlePayment}
                  disabled={paying}
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all border border-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    Payer en 3x sans frais
                 </button>
              </div>

              <div className="flex flex-col items-center gap-4 pt-6 mt-6 border-t border-white/10">
                 <div className="flex items-center gap-2 text-white/40">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Transaction Chiffrée par Stripe</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Info Blocks */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-gray-50/50 rounded-3xl border border-gray-100 flex gap-6 items-start">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6 text-[#086b51]" />
           </div>
           <div>
              <h5 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-2">Processus Simplifié</h5>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">Votre dossier est déjà complet. Le paiement valide instantanément votre place pour l'année prochaine.</p>
           </div>
        </div>
        <div className="p-8 bg-gray-50/50 rounded-3xl border border-gray-100 flex gap-6 items-start">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <UserPlus className="w-6 h-6 text-[#086b51]" />
           </div>
           <div>
              <h5 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-2">Priorité d'inscription</h5>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">En tant qu'ancien élève, vous bénéficiez d'une priorité sur les nouveaux inscrits jusqu'au 31 août.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
