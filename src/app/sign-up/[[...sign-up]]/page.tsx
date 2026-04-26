import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Créer un compte</h1>
          <p className="text-gray-500 font-medium">Rejoignez l'institut ISHES dès aujourd'hui</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-xl border border-gray-100 rounded-[2.5rem] p-8",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "rounded-xl border-gray-200 hover:bg-gray-50 transition-all font-bold",
              formButtonPrimary: "bg-[#008953] hover:bg-[#007044] text-white font-bold py-3 rounded-xl shadow-md transition-all h-12 uppercase tracking-widest text-xs",
              formFieldInput: "bg-gray-50 border-gray-200 rounded-xl focus:ring-[#008953]/20 focus:border-[#008953] transition-all",
              footerActionLink: "text-[#008953] font-bold hover:text-[#007044]",
              identityPreviewEditButton: "text-[#008953]",
              formFieldLabel: "font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide",
            }
          }}
        />
      </div>
    </div>
  );
}