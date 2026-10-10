import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CIVILISATION_ENROLL } from "@/lib/civilisation-savants";

export function CivilisationCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row flex-wrap gap-3 ${className}`}>
      <Link
        href={CIVILISATION_ENROLL}
        className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:brightness-95 text-white font-black px-6 py-4 rounded-2xl transition-all"
      >
        Je m&apos;inscris à la formation
        <ArrowRight className="w-5 h-5" />
      </Link>
      <Link
        href="/fr/contact"
        className="inline-flex items-center justify-center gap-2 bg-ishes-blue hover:bg-[#007044] text-white font-black px-6 py-4 rounded-2xl transition-all"
      >
        <MessageCircle className="w-5 h-5" />
        Nous contacter
      </Link>
    </div>
  );
}
