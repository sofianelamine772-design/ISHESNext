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
      {/* Header section */}
      <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-[#086b51]">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-[#086b51]/10 text-[#086b51] rounded-[2rem] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-2">Dossier Validé</h2>
            <p className="text-gray-500 font-medium">
              Félicitations {user?.firstName}, vous avez validé votre année <span className="text-[#086b51] font-bold">{currentCourse.year}</span>. 
              Vous pouvez maintenant passer au niveau supérieur.
            </p>
          </div>
        </div>
      </div>

      {/* Main Reinscription Card */}
      <div className="bg-ishes-dark rounded-[3.5rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#086b51]/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-ishes-green text-[10px] font-black uppercase tracking-[0.3em]">Votre Prochaine Étape</span>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                {currentCourse.nextLevel}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 rounded-full bg-ishes-green/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-ishes-green" />
                </div>
                <span className="text-sm font-medium">Places réservées prioritairement</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 rounded-full bg-ishes-green/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-ishes-green" />
                </div>
                <span className="text-sm font-medium">Accès immédiat aux nouveaux supports</span>
              </div>
            </div>

            <div className="pt-6">
               <div className="text-5xl font-black text-white mb-2">{currentCourse.price}</div>
               <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Frais d'inscription inclus</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-center text-xs">Paiement Sécurisé</h4>
            
            <div className="space-y-4">
               <button 
                onClick={handlePayment}
                disabled={paying}
                className="w-full bg-ishes-green hover:bg-ishes-green-hover text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-ishes-green/20 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {paying ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-5 h-5" /> Payer en une fois</>}
               </button>
               <button 
                onClick={handlePayment}
                disabled={paying}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  Payer en 3x sans frais
               </button>
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
               <div className="flex items-center gap-2 opacity-30">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Stripe Secure Payment</span>
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
