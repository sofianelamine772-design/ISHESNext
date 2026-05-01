import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-ishes-green/20 border-t-ishes-green rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-[10px] font-black text-ishes-dark uppercase tracking-[0.2em] animate-pulse">
        Accès à votre espace élève...
      </p>
    </div>
  );
}
