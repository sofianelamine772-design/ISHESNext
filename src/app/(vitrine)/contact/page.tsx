import { Metadata } from "next";
import { ContactContent } from "@/components/vitrine/ContactContent";

export const metadata: Metadata = {
  title: "Contactez l'Institut ISHES - Toulouse & Distance",
  description: "Vous avez une question ? Contactez notre équipe par téléphone, WhatsApp ou retrouvez-nous à notre institut de Toulouse.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-green selection:text-white">
      {/* BG decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-ishes-green/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      
      <ContactContent />
    </div>
  );
}
