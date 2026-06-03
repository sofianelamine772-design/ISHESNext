import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ArabicBackground } from "@/components/ArabicBackground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription | Espace Membre ISHES",
  description: "Créez votre compte étudiant pour rejoindre l'Institut ISHES et débuter vos formations.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#FAFAFA] p-6 pt-20 overflow-hidden">
      {/* Background decorations */}
      <ArabicBackground />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#008953]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-[#c8a96e]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="relative h-16 w-48 mx-auto mb-6 bg-white p-3 rounded-2xl border border-gray-200/50 shadow-sm flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/logo-ishes-institut-arabe.png"
                alt="ISHES Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Créer un compte</h1>
          <p className="text-gray-500 font-medium text-sm">Rejoignez l'institut ISHES dès aujourd'hui</p>
        </div>

        <ClerkLoading>
          <div className="flex flex-col items-center justify-center p-12 bg-white shadow-xl border-t-4 border-[#c8a96e] border-x border-b border-gray-100 rounded-[2.5rem]">
            <Loader2 className="w-10 h-10 text-[#c8a96e] animate-spin mb-4" />
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Initialisation...</p>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-2xl border-t-4 border-[#c8a96e] border-x border-b border-gray-100/80 rounded-[2.5rem] p-8 bg-white/95 backdrop-blur-sm",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "rounded-xl border-gray-200 hover:bg-gray-50 transition-all font-bold",
                formButtonPrimary: "bg-[#c8a96e] hover:bg-[#b0935b] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#c8a96e]/10 transition-all h-12 uppercase tracking-widest text-xs",
                formFieldInput: "bg-gray-50 border-gray-200 rounded-xl focus:ring-[#c8a96e]/20 focus:border-[#c8a96e] transition-all",
                footerActionLink: "text-[#c8a96e] font-bold hover:text-[#b0935b]",
                identityPreviewEditButton: "text-[#c8a96e]",
                formFieldLabel: "font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide",
              }
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
}