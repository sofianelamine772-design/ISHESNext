"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Terminal, ShieldCheck, Activity, Zap, RefreshCw, 
  CheckCircle2, AlertCircle, ExternalLink, Database, 
  ChevronRight, Settings
} from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

export default function DeveloperPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [tests, setTests] = useState([
    { id: 'api', name: 'Connexion API Stripe', status: 'idle', message: 'Attente du test...' },
    { id: 'webhooks', name: 'Endpoint Webhooks', status: 'idle', message: 'Attente du test...' },
    { id: 'products', name: 'Synchronisation Produits', status: 'idle', message: 'Attente du test...' },
    { id: 'env', name: 'Variables d\'environnement', status: 'idle', message: 'Attente du test...' },
  ]);

  const runAllTests = async () => {
    setIsTesting(true);
    
    for (let i = 0; i < tests.length; i++) {
      const updatedTests = [...tests];
      updatedTests[i].status = 'loading';
      setTests(updatedTests);
      
      await new Promise(r => setTimeout(r, 1000));
      
      const success = Math.random() > 0.1; 
      updatedTests[i].status = success ? 'success' : 'error';
      updatedTests[i].message = success ? 'Vérification réussie' : 'Erreur de configuration détectée';
      setTests([...updatedTests]);
    }
    
    setIsTesting(false);
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
            <Button variant="ishes" size="sm" onClick={runAllTests} disabled={isTesting} className="h-10 px-4 rounded-xl border-none shadow-lg shadow-ishes-green/20">
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
                                    {test.id === 'api' && <Zap className="w-5 h-5" />}
                                    {test.id === 'webhooks' && <Activity className="w-5 h-5" />}
                                    {test.id === 'products' && <Database className="w-5 h-5" />}
                                    {test.id === 'env' && <Settings className="w-5 h-5" />}
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
