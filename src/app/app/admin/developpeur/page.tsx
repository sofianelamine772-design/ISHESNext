"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  LayoutDashboard, Users, BookOpen, CreditCard, FileText, 
  Terminal, ShieldCheck, Activity, Zap, RefreshCw, 
  CheckCircle2, AlertCircle, ExternalLink, Globe, Database, Settings
} from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";

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
    
    // Simuler des tests pour l'exemple (on pourrait appeler une action serveur réelle)
    for (let i = 0; i < tests.length; i++) {
      const updatedTests = [...tests];
      updatedTests[i].status = 'loading';
      setTests(updatedTests);
      
      await new Promise(r => setTimeout(r, 1000));
      
      const success = Math.random() > 0.1; // 90% de succès pour la démo
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
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 lg:hidden" /> {/* Spacer for menu button */}
            <h1 className="text-xl md:text-2xl ishes-heading text-ishes-dark truncate">Centre de Diagnostic</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ishes" size="sm" onClick={runAllTests} disabled={isTesting} className="h-10 px-4">
              <RefreshCw className={`w-4 h-4 md:mr-2 ${isTesting ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Lancer les tests</span>
              <span className="md:hidden">Tester</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-8">
            

            {/* Test Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tests.map((test) => (
                    <div key={test.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    test.status === 'success' ? 'bg-ishes-green/10 text-ishes-green' :
                                    test.status === 'error' ? 'bg-red-50 text-red-500' :
                                    test.status === 'loading' ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'
                                }`}>
                                    {test.id === 'api' && <Zap className="w-5 h-5" />}
                                    {test.id === 'webhooks' && <Activity className="w-5 h-5" />}
                                    {test.id === 'products' && <Database className="w-5 h-5" />}
                                    {test.id === 'env' && <Settings className="w-5 h-5" />}
                                </div>
                                <h4 className="font-black italic text-ishes-dark text-sm uppercase tracking-tight">{test.name}</h4>
                            </div>
                            {test.status === 'success' && <CheckCircle2 className="w-5 h-5 text-ishes-green" />}
                            {test.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                            {test.status === 'loading' && <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />}
                        </div>
                        <p className="text-xs font-medium text-gray-400 mb-4">{test.message}</p>
                        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-500 ${
                                test.status === 'success' ? 'w-full bg-ishes-green' :
                                test.status === 'error' ? 'w-full bg-red-500' :
                                test.status === 'loading' ? 'w-1/2 bg-blue-500 animate-pulse' : 'w-0'
                            }`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Extra Info */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8">
                <h4 className="ishes-heading text-ishes-dark mb-6">Liens de débogage</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://dashboard.stripe.com/test/logs" target="_blank" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-ishes-green/5 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 group-hover:text-ishes-green shadow-sm">
                                <ExternalLink className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-ishes-dark">Logs Stripe</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                    </a>
                    <a href="https://dashboard.stripe.com/test/webhooks" target="_blank" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-ishes-green/5 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 group-hover:text-ishes-green shadow-sm">
                                <Zap className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-ishes-dark">Webhooks Config</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                    </a>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
