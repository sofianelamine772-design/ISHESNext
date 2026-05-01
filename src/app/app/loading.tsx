import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex flex-col items-center justify-center z-[9999]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-ishes-green/20 border-t-ishes-green rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-black text-ishes-green italic">ISHES</span>
        </div>
      </div>
      <p className="mt-6 text-sm font-black text-ishes-dark uppercase tracking-[0.3em] animate-pulse">
        Chargement de votre espace...
      </p>
    </div>
  );
}
