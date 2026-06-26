"use client";

import { useState, useEffect } from "react";
import { UserPlus, CheckCircle2, ArrowRight, ShieldCheck, CreditCard, Sparkles, Loader2, RotateCcw, AlertCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { fetchStudentCertificateDataAction } from "@/app/actions/students";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { getNextAcademicYear } from "@/lib/utils";

function getNextLevel(className: string): string | null {
  if (!className) return null;
  const upper = className.toUpperCase();
  
  if (upper.includes("PRÉPARATOIRE 1") || upper.includes("PREPARATOIRE 1")) return "Préparatoire 2ème année";
  if (upper.includes("PRÉPARATOIRE 2") || upper.includes("PREPARATOIRE 2")) return "Élémentaire Débutant 1";
  if (upper.includes("DÉBUTANT 1") || upper.includes("DEBUTANT 1")) return "Élémentaire 1+";
  if (upper.includes("ÉLÉMENTAIRE 1+") || upper.includes("ELEMENTAIRE 1+")) return "Élémentaire 2";
  if (upper.includes("ÉLÉMENTAIRE 2") || upper.includes("ELEMENTAIRE 2")) return "Élémentaire 3";
  if (upper.includes("ÉLÉMENTAIRE 3") || upper.includes("ELEMENTAIRE 3")) return "Élémentaire 4";
  if (upper.includes("ÉLÉMENTAIRE 4") || upper.includes("ELEMENTAIRE 4")) return "Élémentaire 5";
  if (upper.includes("ÉLÉMENTAIRE 5") || upper.includes("ELEMENTAIRE 5")) return "Élémentaire 6";
  if (upper.includes("ÉLÉMENTAIRE 6") || upper.includes("ELEMENTAIRE 6")) return "Élémentaire 7";
  if (upper.includes("ÉLÉMENTAIRE 7") || upper.includes("ELEMENTAIRE 7")) return null; // Fin de cursus

  if (upper.includes("FEMME DÉBUTANTE") || upper.includes("FEMME DEBUTANTE")) return "Femme intermédiaire";
  if (upper.includes("FEMME INTERMÉDIAIRE") || upper.includes("FEMME INTERMEDIAIRE")) return null; 

  return null;
}

export default function ReinscriptionPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [childrenData, setChildrenData] = useState<any[]>([]);
  const [activeChildId, setActiveChildId] = useState<string | null>(null);
  const [courseChoice, setCourseChoice] = useState<"next" | "same">("same");
  const isSuccess = searchParams.get("success") === "true";

  useEffect(() => {
    if (user?.id) {
      const loadData = async () => {
        try {
          const res = await fetchStudentCertificateDataAction({
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.primaryPhoneNumber?.phoneNumber || ""
          });
          
          if (res.success && res.data && res.data.length > 0) {
            const presentielData = res.data.filter((d: any) => d !== null && d?.classType === 'presentiel');
            const enriched = presentielData.map((d: any) => {
              const prog = Object.values(PROGRAMS_DATA).find((p: any) => p.title.trim().toLowerCase() === d?.formationTitle?.trim().toLowerCase());
              return {
                ...d,
                price: prog?.price || "349€",
                nextYear: getNextAcademicYear(),
                nextLevelTitle: getNextLevel(d?.className || "")
              };
            });
            setChildrenData(enriched);
            if (enriched.length > 0) {
              setActiveChildId(enriched[0].id);
            }
          }
        } catch (err) {
          console.error("Error loading reinscription data:", err);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [user]);

  const activeCourse = childrenData.find(c => c.id === activeChildId);

  const handlePayment = async () => {
    if (!activeCourse) return;
    try {
      setPaying(true);
      const chosenTitle = activeCourse.nextLevelTitle || activeCourse.formationTitle;
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formationId: "", // Laissé vide, le webhook trouvera la formation grâce au titre ou au fallback
          studentId: activeCourse.id, // ID exact de l'étudiant à renouveler
          price: activeCourse.price,
          formationTitle: chosenTitle + " (Réinscription)",
          nextLevelTitle: chosenTitle,
          year: activeCourse.nextYear,
          isRenewal: true,
          email: user?.primaryEmailAddress?.emailAddress
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
          <p className="text-gray-400 font-medium max-w-md">Bienvenue pour cette nouvelle année à l'ISHES. Votre dossier a été mis à jour automatiquement pour l'année prochaine.</p>
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
      
      {/* ─── CHILDREN SELECTOR (FRATRIE) ─── */}
      {childrenData.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {childrenData.map((child) => (
            <button
              key={child.id}
              onClick={() => setActiveChildId(child.id)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                activeChildId === child.id 
                  ? "bg-[#086b51] text-white" 
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                activeChildId === child.id ? "bg-white/20" : "bg-gray-100 text-gray-400"
              }`}>
                {child.firstName?.[0] || ""}
              </div>
              {child.firstName} {child.lastName}
            </button>
          ))}
        </div>
      )}

      {!activeCourse ? (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
          <AlertCircle className="w-12 h-12 text-gray-300" />
          <h2 className="text-xl font-bold text-gray-800">Aucune réinscription possible</h2>
          <p className="text-gray-500 text-sm max-w-md">
            La réinscription en ligne est actuellement réservée aux élèves en formation présentielle. Si vous êtes concerné(e) et que vous ne voyez pas votre cursus, veuillez contacter l'administration.
          </p>
        </div>
      ) : !activeCourse.nextLevelTitle ? (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
          <AlertCircle className="w-12 h-12 text-gray-300" />
          <h2 className="text-xl font-bold text-gray-800">Fin de cursus ou niveau indéfini</h2>
          <p className="text-gray-500 text-sm max-w-md">
            Vous avez atteint le dernier niveau de votre cursus ou votre classe n'a pas de niveau suivant défini ({activeCourse.className}). La réinscription automatique n'est pas disponible.
          </p>
        </div>
      ) : (
        <>
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
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#20d8a4]">Année {activeCourse.nextYear}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-100 to-gray-500">
                    {activeCourse.nextLevelTitle}
                  </h3>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white/5 rounded-[1.5rem] border border-white/10 w-full sm:w-max">
                  <button 
                    onClick={() => setCourseChoice("same")}
                    className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${courseChoice === 'same' ? 'bg-[#086b51] text-white shadow-lg shadow-[#086b51]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <RotateCcw className="w-3 h-3" />
                    Renouveler pour {activeCourse.nextYear}
                  </button>
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
                    {activeCourse.price.replace('€', '').trim()}
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
        </>
      )}
    </div>
  );
}
