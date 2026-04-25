"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, ArrowRight, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

// Form Component wrapped in Suspense so useSearchParams doesn't break static generation
function InscriptionForm() {
  const searchParams = useSearchParams();
  const planId = searchParams?.get("plan");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    niveau: "",
    parentPrenom: "",
    parentNom: ""
  });

  const [registrationType, setRegistrationType] = useState<"self" | "child">("self");
  const [childrenList, setChildrenList] = useState([{ prenom: "", nom: "", niveau: "" }]);

  const handleChildInputChange = (index: number, field: string, value: string) => {
    setChildrenList(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const childFormations = ['arabe_coran_junior', 'tarbiya_islamiya', 'tajwid_enfant'];

  useEffect(() => {
    if (planId) {
      if (childFormations.includes(planId)) {
        setRegistrationType("child");
      } else {
        setRegistrationType("self");
      }
    }
  }, [planId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const saveToSupabase = async () => {
    try {
      const { registerStudentAction } = await import("@/app/actions/students");
      
      if (registrationType === 'child') {
        for (let i = 0; i < childrenList.length; i++) {
          const child = childrenList[i];
          const childEmail = i === 0 
            ? formData.email 
            : formData.email.includes("@") 
              ? formData.email.replace("@", `+${child.prenom.toLowerCase().replace(/\s+/g, '')}@`)
              : `${formData.email}+${child.prenom.toLowerCase().replace(/\s+/g, '')}`;
              
          const result = await registerStudentAction({
            prenom: child.prenom,
            nom: child.nom,
            email: childEmail,
            telephone: formData.telephone,
            niveau: child.niveau,
            planId: planId || 'arabe_coran_junior',
            parentPrenom: formData.parentPrenom,
            parentNom: formData.parentNom
          });
          if (!result.success) {
            console.error("Error saving student:", result.error);
          }
        }
      } else {
        const result = await registerStudentAction({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          niveau: formData.niveau,
          planId: planId || 'formation_generale',
          parentPrenom: formData.parentPrenom,
          parentNom: formData.parentNom
        });
        if (!result.success) {
          console.error("Error saving student:", result.error);
        }
      }
    } catch (err) {
      console.error("Action import error:", err);
    }
  };

  const handleNextWithSave = async () => {
    if (step === 3) {
      await saveToSupabase();
    }
    nextStep();
  };

  // Derived Title
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
          <div className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer" onClick={() => setStep(1)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all ${
              step >= 1 ? "bg-[#008953] text-white" : "bg-gray-100 text-gray-400"
            }`}>
              1
            </div>
            <span className={`text-[10px] font-black tracking-widest uppercase transition-all ${
              step >= 1 ? "text-[#008953]" : "text-gray-400"
            }`}>Infos</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer" onClick={() => { if(step > 2) setStep(2) }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= 2 ? "bg-[#008953] text-white shadow-md" : "bg-gray-100 text-gray-400"
            }`}>
              2
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-all ${
              step >= 2 ? "text-[#008953]" : "text-gray-400"
            }`}>Cours</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer" onClick={() => { if(step > 3) setStep(3) }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= 3 ? "bg-[#008953] text-white shadow-md" : "bg-gray-100 text-gray-400"
            }`}>
              3
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-all ${
              step >= 3 ? "text-[#008953]" : "text-gray-400"
            }`}>Important</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= 4 ? "bg-[#008953] text-white shadow-md" : "bg-gray-100 text-gray-400"
            }`}>
              4
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-all ${
              step >= 4 ? "text-[#008953]" : "text-gray-400"
            }`}>Paiement</span>
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
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-black text-[#101828] mb-8">Vos informations</h2>

              {/* Registration Type Selection */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {(!planId || !childFormations.includes(planId)) && (
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
                )}
                {(!planId || childFormations.includes(planId)) && (
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
                )}
              </div>

              <div className="space-y-6">
                {registrationType === 'child' ? (
                  <div className="space-y-8">
                    {childrenList.map((child, index) => (
                      <div key={index} className="p-6 bg-gray-50 border border-gray-100 rounded-3xl space-y-6 relative">
                        {childrenList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setChildrenList(prev => prev.filter((_, i) => i !== index))}
                            className="absolute top-6 right-6 text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm transition-all hover:border-red-200 hover:bg-red-50/50"
                          >
                            Supprimer
                          </button>
                        )}
                        <h3 className="text-xs font-black text-[#008953] uppercase tracking-widest flex items-center gap-2">
                           <span>👶</span> ENFANT N°{index + 1}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Prenom */}
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                              <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                              Prénom de l'enfant *
                            </label>
                            <input 
                              type="text" 
                              value={child.prenom}
                              onChange={(e) => handleChildInputChange(index, 'prenom', e.target.value)}
                              placeholder="Prénom"
                              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                              required
                            />
                          </div>

                          {/* Nom */}
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                              <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                              Nom de l'enfant *
                            </label>
                            <input 
                              type="text" 
                              value={child.nom}
                              onChange={(e) => handleChildInputChange(index, 'nom', e.target.value)}
                              placeholder="Nom"
                              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                              required
                            />
                          </div>
                        </div>

                        {/* Niveau */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                            <span className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[7px]">📖</span>
                            Niveau Actuel de l'élève *
                          </label>
                          <select 
                            value={child.niveau}
                            onChange={(e) => handleChildInputChange(index, 'niveau', e.target.value)}
                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]"
                          >
                            <option value="">— Sélectionner son niveau —</option>
                            <optgroup label="Enfants - Maternel">
                              <option value="maternel_1">Maternel 1</option>
                              <option value="maternel_2">Maternel 2</option>
                            </optgroup>
                            <optgroup label="Enfants - Elémentaire">
                              <option value="elementaire_1">Elémentaire 1</option>
                              <option value="elementaire_1_plus">Elémentaire 1+</option>
                              <option value="elementaire_2">Elémentaire 2</option>
                              <option value="elementaire_2_plus">Elémentaire 2+</option>
                              <option value="elementaire_3">Elémentaire 3</option>
                              <option value="elementaire_3_plus">Elémentaire 3+</option>
                              <option value="elementaire_4">Elémentaire 4</option>
                              <option value="elementaire_5">Elémentaire 5</option>
                              <option value="elementaire_6">Elémentaire 6</option>
                              <option value="elementaire_7">Elémentaire 7</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => setChildrenList([...childrenList, { prenom: "", nom: "", niveau: "" }])}
                      className="w-full py-4 px-6 border-2 border-dashed border-gray-200 rounded-2xl text-xs font-black text-[#008953] hover:border-[#008953] hover:bg-[#008953]/5 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"
                    >
                      <span>➕</span> Inscrire un autre enfant
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Prenom */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                        <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                        Prénom *
                      </label>
                      <input 
                        type="text" 
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        placeholder="Mohamed"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                        required
                      />
                    </div>

                    {/* Nom */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                        <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                        Nom *
                      </label>
                      <input 
                        type="text" 
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="Dubair"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                        required
                      />
                    </div>

                    {/* Niveau */}
                    <div className="space-y-2 pb-6 md:col-span-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                        <span className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[7px]">📖</span>
                        Niveau Actuel
                      </label>
                      <select 
                        name="niveau"
                        value={formData.niveau}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]"
                      >
                        <option value="">— Sélectionner votre niveau —</option>
                        <optgroup label="Adultes (Femmes)">
                          <option value="femme_debutante">Femme Débutante</option>
                          <option value="femme_intermediaire">Femme Intermédiaire</option>
                        </optgroup>
                        <optgroup label="Standard (Distanciel)">
                          <option value="debutant">Débutant (Autre)</option>
                          <option value="intermediaire">Intermédiaire (Autre)</option>
                          <option value="avance">Avancé (Autre)</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                )}
                {/* Informations du parent / représentant (SI ENFANT) */}
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
                        name="parentPrenom"
                        value={formData.parentPrenom}
                        onChange={handleInputChange}
                        placeholder="Prénom"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                        required
                      />
                    </div>
                    {/* Nom Représentant */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        Nom du représentant *
                      </label>
                      <input 
                        type="text" 
                        name="parentNom"
                        value={formData.parentNom}
                        onChange={handleInputChange}
                        placeholder="Nom"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                        required
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="vous@exemple.fr"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                    required
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
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="+33 6 XX XX XX XX"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-[#008953] transition-all text-sm font-medium"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button 
                  onClick={nextStep}
                  disabled={
                    !formData.email || 
                    (registrationType === 'child' 
                      ? (!formData.parentPrenom || !formData.parentNom || childrenList.some(c => !c.prenom || !c.nom || !c.niveau)) 
                      : (!formData.prenom || !formData.nom)
                    )
                  }
                  className="w-full bg-[#008953] hover:bg-[#007044] disabled:bg-gray-200 text-white font-bold text-lg py-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Continuer <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
               <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
                  {/* Mascot Image */}
                  <div className="w-full max-w-[320px] relative">
                    <img 
                      src="/images/mascotte-ville.png" 
                      alt="Mascotte ISHES" 
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>

                  {/* Message Bubble Container */}
                  <div className="flex-1">
                    <div className="bg-[#007044] text-white p-8 md:p-10 rounded-[3rem] shadow-2xl relative">
                       {/* Speech Bubble Tail (CSS triangle) */}
                       <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#007044] rotate-45 -translate-y-1/2 hidden lg:block" />
                       
                       <div className="flex items-center gap-3 mb-6">
                         <MessageSquareText className="w-6 h-6 text-white/80" />
                         <h3 className="text-xl font-black tracking-tight underline decoration-ishes-green decoration-4 underline-offset-4">Message de la ville</h3>
                       </div>

                       <div className="space-y-4">
                         <p className="text-xl md:text-2xl font-bold leading-relaxed">
                           "Une fois payé, utilisez votre mail <span className="text-white underline decoration-2">{formData.email || 'votre email'}</span> pour vous inscrire sur <span className="underline decoration-2">ISHEECOLE</span> !"
                         </p>
                         <div className="pt-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Activation Automatique
                            </span>
                         </div>
                       </div>
                    </div>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="w-full flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={prevStep}
                    className="flex-1 bg-white border-2 border-gray-100 text-gray-500 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-gray-300 transition-all"
                  >
                    ← Retour
                  </button>
                  <button 
                    onClick={handleNextWithSave}
                    className="flex-[2] bg-[#008953] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#007044] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#008953]/20"
                  >
                    J'AI COMPRIS, PAYER <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-12">
               <div className="w-20 h-20 bg-ishes-green/10 text-ishes-green rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-3xl font-bold">{step}</span>
               </div>
               <h2 className="text-2xl font-black text-ishes-dark mb-4">Étape en cours de finalisation</h2>
               <p className="text-gray-500 mb-8 max-w-sm mx-auto">Nous préparons les détails de votre programme personnalisé.</p>
               <button 
                  onClick={nextStep}
                  className="bg-ishes-green text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#007044] transition-all"
               >
                 Passer à l'étape suivante
               </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
               <div className="mb-10">
                 <div className="w-24 h-24 bg-green-50 text-ishes-green rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                    <Suspense fallback={null}><CheckCircle2 className="w-12 h-12" /></Suspense>
                 </div>
                 <h2 className="text-3xl font-black text-ishes-dark mb-4 tracking-tight">Dernière étape !</h2>
                 <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                   Votre inscription pour <span className="text-ishes-dark font-bold">{planName}</span> est presque terminée.
                   Utilisez votre email <span className="text-ishes-green font-bold">{formData.email}</span> pour finaliser la création de votre compte.
                 </p>
               </div>

                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10 max-w-md mx-auto">
                  <div className="flex justify-between items-center mb-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
                    <span>Total à régler</span>
                    <span className="text-ishes-dark">
                      {registrationType === 'child' 
                        ? (planId === 'tarbiya_islamiya' ? 249 : 349) * childrenList.length 
                        : (planId === 'tajwid_intensif' || planId === 'sciences_islamiques' ? 150 : 150)
                      },00 €
                    </span>
                  </div>
                  <div className="h-[1px] bg-gray-200 mb-4" />
                  {registrationType === 'child' && childrenList.length > 1 && (
                    <div className="text-left text-xs font-bold text-gray-500 mb-6 bg-green-50/50 border border-green-100/50 p-4 rounded-xl">
                      <span className="text-[#008953]">Multi-inscription ({childrenList.length} enfants) :</span>
                      <ul className="mt-2 space-y-1 text-gray-600 font-medium list-disc list-inside">
                        {childrenList.map((c, i) => (
                          <li key={i}>{c.prenom} {c.nom}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed mb-8">
                    En cliquant sur le bouton ci-dessous, vous serez redirigé vers notre plateforme de paiement sécurisée puis vers la création de mot de passe.
                  </p>
                  
                  <Link 
                    href={`/sign-up?email_address=${encodeURIComponent(formData.email)}&first_name=${encodeURIComponent(registrationType === 'child' ? childrenList[0].prenom : formData.prenom)}&last_name=${encodeURIComponent(registrationType === 'child' ? childrenList[0].nom : formData.nom)}`}
                    className="w-full bg-ishes-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-ishes-dark/20"
                   >
                    Payer & Créer mon compte <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>

               <button 
                  onClick={() => setStep(3)}
                  className="text-gray-400 font-bold text-xs hover:text-gray-600 underline uppercase tracking-widest"
               >
                 Modifier mes informations
               </button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-32 pt-32 lg:pt-40 px-4 relative">
      <ArabicBackground />
      <Suspense fallback={
        <div className="max-w-4xl mx-auto text-center py-20 text-gray-500 font-bold">
          Chargement du formulaire d'inscription...
        </div>
      }>
        <InscriptionForm />
      </Suspense>
    </div>
  );
}
