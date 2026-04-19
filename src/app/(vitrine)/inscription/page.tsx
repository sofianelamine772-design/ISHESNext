"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Form Component wrapped in Suspense so useSearchParams doesn't break static generation
function InscriptionForm() {
  const searchParams = useSearchParams();
  const planId = searchParams?.get("plan");

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    niveau: ""
  });

  const [registrationType, setRegistrationType] = useState<"self" | "child">("self");

  // Derived Title (En vrai ça viendrait de la BDD, ici on mappe statiquement quelques IDs pour la démo)
  const getPlanName = (id: string | null) => {
    switch(id) {
      case "tajwid_intensif": return "Tajwid Intensif (Distanciel)";
      case "sciences_islamiques": return "Sciences Islamiques (Distanciel)";
      case "arabe_coran_junior": return "Arabe & Coran Junior";
      case "pack_accompagnement": return "Pack Accompagnement";
      case "tajwid_standard": return "Tajwid Standard (Présentiel)";
      default: return "";
    }
  };

  const planName = getPlanName(planId);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-center text-4xl font-black text-[#101828] mb-10 tracking-tight">
        Rejoignez l'institut.
      </h1>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-100 -z-10"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#008953] text-white flex items-center justify-center font-bold text-sm shadow-md">
              1
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#008953] uppercase">Infos</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Cours</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Important</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Paiement</span>
          </div>
        </div>

        {/* Selected Plan Banner (if a plan was passed via URL) */}
        {planName && (
           <div className="mb-10 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-between">
             <div className="text-sm">
               <span className="text-green-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Formation sélectionnée</span>
               <span className="text-gray-900 font-black">{planName}</span>
             </div>
             <Link href="/program" className="text-xs font-bold text-green-700 hover:text-green-800 underline">Modifier</Link>
           </div>
        )}

        {/* Form Content */}
        <div>
          <h2 className="text-2xl font-black text-[#101828] mb-8">Vos informations</h2>

          {/* Registration Type Selection */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={() => setRegistrationType("self")}
              className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-3 ${
                registrationType === "self"
                  ? "border-[#008953] bg-[#008953]/5 text-[#008953]"
                  : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
              }`}
            >
              <span className="text-xl">🙋‍♂️</span> Je souhaite m'inscrire
            </button>
            <button
              onClick={() => setRegistrationType("child")}
              className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-3 ${
                registrationType === "child"
                  ? "border-[#008953] bg-[#008953]/5 text-[#008953]"
                  : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
              }`}
            >
              <span className="text-xl">👶</span> Inscrire mon enfant
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prenom */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                  <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                  {registrationType === 'self' ? 'Prénom *' : "Prénom de l'enfant *"}
                </label>
                <input 
                  type="text" 
                  placeholder={registrationType === 'self' ? "Mohamed" : "Prénom de l'enfant"}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                />
              </div>

              {/* Nom */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                  <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                  {registrationType === 'self' ? 'Nom *' : "Nom de l'enfant *"}
                </label>
                <input 
                  type="text" 
                  placeholder={registrationType === 'self' ? "Dupont" : "Nom de l'enfant"}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                />
              </div>
            </div>

            {registrationType === 'child' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="md:col-span-2">
                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Informations du parent / représentant</h3>
                </div>
                {/* Prenom Représentant */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    Prénom du représentant *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Prénom"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                  />
                </div>
                {/* Nom Représentant */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    Nom du représentant *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Nom"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                <span className="w-3 h-3 border border-gray-400 rounded flex items-center justify-center text-[7px]">✉️</span>
                {registrationType === 'self' ? 'Adresse Email *' : 'Email du responsable *'}
              </label>
              <input 
                type="email" 
                placeholder="vous@exemple.fr"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
              />
            </div>

            {/* Telephone */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">📞</span>
                {registrationType === 'self' ? 'Téléphone *' : 'Téléphone du responsable *'}
              </label>
              <input 
                type="tel" 
                placeholder="+33 6 XX XX XX XX"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
              />
            </div>

            {/* Niveau */}
            <div className="space-y-2 pb-6">
              <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                <span className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[7px]">📖</span>
                Niveau Actuel de l'élève
              </label>
              <select className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]">
                <option value="">— Sélectionner son niveau —</option>
                <option value="debutant">Débutant (Ne sais pas lire l'arabe)</option>
                <option value="intermediaire">Intermédiaire (Lit lentement)</option>
                <option value="avance">Avancé (Lit avec fluidité)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#A2C4B1] hover:bg-[#8eb8a0] text-white font-bold text-lg py-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
              Continuer <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-32 pt-20 px-4 relative">
      {/* Retour navigation logic */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/program" className="text-gray-400 hover:text-gray-600 font-bold text-sm tracking-wide transition-colors">
          ← RETOUR
        </Link>
      </div>

      <Suspense fallback={
        <div className="max-w-4xl mx-auto text-center py-20 text-gray-500 font-bold">
          Chargement du formulaire d'inscription...
        </div>
      }>
        <InscriptionForm />
      </Suspense>

      {/* Floating Dark WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-50">
         <a href="#" className="flex items-center justify-center bg-[#152233] text-white px-6 py-3.5 rounded-full shadow-2xl text-[10px] font-bold tracking-[0.15em] transition-transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(21,34,51,0.3)]">
            CONTACTEZ-NOUS SUR WHATSAPP
         </a>
      </div>
    </div>
  );
}
