import { Metadata } from "next";
import { ProgramContent } from "@/components/vitrine/ProgramContent";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Programmes - Institut ISHES Toulouse & Distance",
  description: "Découvrez nos formations en langue arabe, sciences islamiques et tajwid. Programmes adaptés pour adultes et enfants, en présentiel à Toulouse ou à distance.",
};

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#008953] selection:text-white pb-24 overflow-hidden">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-ishes-green animate-spin" />
        </div>
      }>
        <ProgramContent />
      </Suspense>
    </div>
  );
}
