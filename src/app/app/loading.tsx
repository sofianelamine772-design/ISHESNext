import { Loader2 } from "lucide-react";

export default function AppLoading() {
  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration to match the brand */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ishes-green/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center bg-white p-12 rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-100">
        <div className="w-20 h-20 bg-ishes-dark rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-ishes-dark/20 animate-pulse">
          <span className="text-2xl font-black italic tracking-tight text-white">
            ISHES
          </span>
        </div>
        
        <Loader2 className="w-10 h-10 text-ishes-green animate-spin mb-6" />
        
        <h2 className="text-2xl ishes-heading text-ishes-dark mb-2">
          Préparation de votre espace
        </h2>
        <p className="ishes-label text-gray-400 max-w-sm text-center">
          Synchronisation sécurisée de vos données avec ISHEECOLE PRO...
        </p>
      </div>
    </div>
  );
}
