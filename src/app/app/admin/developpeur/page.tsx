"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Terminal, ShieldCheck, Activity, Zap, RefreshCw, 
  CheckCircle2, AlertCircle, ExternalLink, Database, 
  ChevronRight, Settings, Mail, Bell
} from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

export default function DeveloperPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [logs, setLogs] = useState<string>("");
  const [tests, setTests] = useState([
    { id: 'env', name: 'Variables d\'environnement', status: 'idle', message: 'Attente du test...' },
    { id: 'clerk_alignment', name: 'Alignement Clés Clerk', status: 'idle', message: 'Attente du test...' },
    { id: 'stripe_alignment', name: 'Alignement Clés Stripe', status: 'idle', message: 'Attente du test...' },
    { id: 'supabase_key_role', name: 'Rôle Clé Supabase', status: 'idle', message: 'Attente du test...' },
    { id: 'api', name: 'Connexion API Stripe', status: 'idle', message: 'Attente du test...' },
    { id: 'webhooks', name: 'Endpoint Webhooks', status: 'idle', message: 'Attente du test...' },
    { id: 'products', name: 'Connexion Supabase', status: 'idle', message: 'Attente du test...' },
    { id: 'database_schema', name: 'Tables de la base', status: 'idle', message: 'Attente du test...' },
    { id: 'clerk', name: 'Authentification Clerk', status: 'idle', message: 'Attente du test...' },
    { id: 'resend', name: 'Serveur E-mails Resend', status: 'idle', message: 'Attente du test...' },
    { id: 'webpush', name: 'Web Push VAPID', status: 'idle', message: 'Attente du test...' },
  ]);

  const runAllTests = async () => {
    setIsTesting(true);
    setLogs(`[${new Date().toLocaleTimeString()}] Lancement de la suite de diagnostics...\n`);
    
    // Set all to loading first
    setTests(prev => prev.map(t => ({ ...t, status: 'loading', message: 'Vérification en cours...' })));

    try {
      const res = await fetch('/api/admin/diagnostic');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur serveur (code ${res.status})`);
      }
      const data = await res.json();
      
      let logsReport = `[${new Date().toLocaleTimeString()}] Diagnostic terminé avec succès. Analyse des résultats :\n\n`;
      let hasErrors = false;

      setTests(prev => prev.map(t => {
        const result = data[t.id];
        if (result) {
          if (result.success) {
            logsReport += `✅ [${t.name}] : ${result.message}\n`;
          } else {
            hasErrors = true;
            logsReport += `❌ [${t.name}] ERREUR : ${result.message}\n`;
          }
          return {
            ...t,
            status: result.success ? 'success' : 'error',
            message: result.message
          };
        }
        hasErrors = true;
        logsReport += `⚠️ [${t.name}] ERREUR : Aucune donnée de diagnostic disponible.\n`;
        return {
          ...t,
          status: 'error',
          message: 'Aucune donnée de diagnostic disponible pour ce test.'
        };
      }));

      if (hasErrors) {
        logsReport += `\n⚠️ Attention : Certains diagnostics ont échoué. Veuillez vérifier vos configurations.`;
      } else {
        logsReport += `\n🎉 Parfait ! Tous les systèmes et services fonctionnent correctement.`;
      }
      setLogs(logsReport);

    } catch (err: any) {
      const errorMsg = err.message || err;
      setLogs(prev => prev + `❌ [CRITICAL_ERROR] Échec de la récupération des données : ${errorMsg}\n`);
      setTests(prev => prev.map(t => ({
        ...t,
        status: 'error',
        message: `${errorMsg}`
      })));
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#F8FAFC]">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" />
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Centre de Diagnostic</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Button variant="ishes-green" size="sm" onClick={runAllTests} disabled={isTesting} className="h-10 px-4 rounded-xl border-none shadow-lg shadow-ishes-green/20">
              <RefreshCw className={`w-4 h-4 md:mr-2 ${isTesting ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Lancer les tests</span>
              <span className="md:hidden">Tester</span>
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

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Test Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tests.map((test) => (
                    <div key={test.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                                    test.status === 'success' ? 'bg-ishes-green/10 text-ishes-green' :
                                    test.status === 'error' ? 'bg-red-50 text-red-500' :
                                    test.status === 'loading' ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'
                                )}>
                                    {test.id === 'env' && <Settings className="w-5 h-5" />}
                                    {test.id === 'api' && <Zap className="w-5 h-5" />}
                                    {test.id === 'webhooks' && <Activity className="w-5 h-5" />}
                                    {test.id === 'products' && <Database className="w-5 h-5" />}
                                    {test.id === 'database_schema' && <ShieldCheck className="w-5 h-5" />}
                                    {test.id === 'clerk' && <ShieldCheck className="w-5 h-5" />}
                                    {test.id === 'resend' && <Mail className="w-5 h-5" />}
                                    {test.id === 'webpush' && <Bell className="w-5 h-5" />}
                                    {test.id === 'clerk_alignment' && <ShieldCheck className="w-5 h-5" />}
                                    {test.id === 'stripe_alignment' && <Zap className="w-5 h-5" />}
                                    {test.id === 'supabase_key_role' && <Database className="w-5 h-5" />}
                                </div>
                                <div>
                                  <h4 className="font-black italic text-ishes-dark text-sm uppercase tracking-tight">{test.name}</h4>
                                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">{test.id}</p>
                                </div>
                            </div>
                            {test.status === 'success' && <CheckCircle2 className="w-5 h-5 text-ishes-green" />}
                            {test.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                            {test.status === 'loading' && <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />}
                        </div>
                        
                        <div className="bg-gray-50/50 rounded-xl p-3 mb-4">
                          <p className="text-[10px] font-bold text-gray-400 italic">"{test.message}"</p>
                        </div>

                        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                            <div className={cn(
                                "h-full transition-all duration-1000",
                                test.status === 'success' ? 'w-full bg-ishes-green' :
                                test.status === 'error' ? 'w-full bg-red-500' :
                                test.status === 'loading' ? 'w-1/2 bg-blue-500 animate-pulse' : 'w-0'
                            )}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Console des Logs d'Erreurs */}
            <div className="bg-[#0B0F19] rounded-[2rem] border border-gray-800 p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-ishes-green"></div>
              
              <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-xs font-mono text-gray-500 ml-2">console_erreurs.log</span>
                </div>
                {logs && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(logs);
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white bg-gray-900 border border-gray-850 hover:border-gray-700 px-3 py-1.5 h-auto rounded-lg transition-all"
                  >
                    Copier les logs
                  </Button>
                )}
              </div>

              <div className="font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto min-h-[120px] max-h-[300px] custom-scrollbar whitespace-pre-wrap select-all">
                {logs ? (
                  logs
                ) : (
                  <span className="text-gray-600 italic">
                    Console en attente de diagnostic. Cliquez sur "Lancer les tests" ci-dessus pour inspecter les détails et erreurs de l'application.
                  </span>
                )}
              </div>
            </div>

            {/* Extra Info */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                <h4 className="text-xl ishes-heading text-ishes-dark mb-8">Ressources Externes</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://dashboard.stripe.com/test/logs" target="_blank" className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-ishes-green/5 transition-all group border border-transparent hover:border-ishes-green/20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-ishes-green shadow-sm transition-colors">
                                <ExternalLink className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-black uppercase tracking-widest text-ishes-dark block">Logs Stripe</span>
                              <span className="text-[9px] font-bold text-gray-400">Suivi des requêtes</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="https://dashboard.stripe.com/test/webhooks" target="_blank" className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-ishes-green/5 transition-all group border border-transparent hover:border-ishes-green/20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-ishes-green shadow-sm transition-colors">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-black uppercase tracking-widest text-ishes-dark block">Webhooks</span>
                              <span className="text-[9px] font-bold text-gray-400">Config des événements</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
